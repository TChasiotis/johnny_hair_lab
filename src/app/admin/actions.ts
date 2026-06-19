"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { put, del } from "@vercel/blob";

// --- ΥΠΗΡΕΣΙΕΣ (SERVICES) ---

export async function createService(data: any) {
  const maxService = await prisma.service.findFirst({
    orderBy: { sortOrder: "desc" },
  });
  const nextOrder = (maxService?.sortOrder || 0) + 1;

  await prisma.service.create({
    data: {
      name: data.name,
      nameEn: data.nameEn,
      price: data.price,
      duration: data.duration,
      sortOrder: nextOrder,
    },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateService(id: string, data: any) {
  await prisma.service.update({
    where: { id },
    data: {
      name: data.name,
      nameEn: data.nameEn,
      price: data.price,
      duration: data.duration,
    },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  await prisma.service.delete({
    where: { id },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function moveService(id: string, direction: "up" | "down") {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return;

  if (direction === "up" && index > 0) {
    const current = services[index];
    const prev = services[index - 1];
    const currentOrder = current.sortOrder;
    const prevOrder =
      prev.sortOrder === currentOrder ? currentOrder - 1 : prev.sortOrder;

    await prisma.service.update({
      where: { id: current.id },
      data: { sortOrder: prevOrder },
    });
    await prisma.service.update({
      where: { id: prev.id },
      data: { sortOrder: currentOrder },
    });
  } else if (direction === "down" && index < services.length - 1) {
    const current = services[index];
    const next = services[index + 1];
    const currentOrder = current.sortOrder;
    const nextOrder =
      next.sortOrder === currentOrder ? currentOrder + 1 : next.sortOrder;

    await prisma.service.update({
      where: { id: current.id },
      data: { sortOrder: nextOrder },
    });
    await prisma.service.update({
      where: { id: next.id },
      data: { sortOrder: currentOrder },
    });
  }
  revalidatePath("/admin");
  revalidatePath("/");
}

// --- ΠΡΟΪΟΝΤΑ (PRODUCTS) ---

export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const desc = formData.get("desc") as string;
    const descEn = formData.get("descEn") as string;
    const category = formData.get("category") as string;
    const file = formData.get("file") as File;
    const useRemoveBg = formData.get("useRemoveBg") === "true";

    console.log("--> [1/4] Ξεκίνησε η δημιουργία προϊόντος:", name);

    let imgPath = "./products/default.png";
    let apiUsed = false;

    if (file && file.size > 0) {
      console.log(
        `--> Βρέθηκε αρχείο: ${file.name} | Μέγεθος: ${file.size} bytes`,
      );

      let finalData: File | ArrayBuffer = file;
      let fileNameToSave = file.name;
      const apiKey = process.env.REMOVE_BG_API_KEY;

      if (useRemoveBg && apiKey) {
        console.log("--> [2/4] Γίνεται κλήση στο Remove.bg...");
        const apiFormData = new FormData();
        apiFormData.append("image_file", file);
        apiFormData.append("size", "preview");

        const apiResponse = await fetch("https://api.remove.bg/v1.0/removebg", {
          method: "POST",
          headers: { "X-Api-Key": apiKey },
          body: apiFormData,
        });

        if (apiResponse.ok) {
          console.log("--> Το Remove.bg πέτυχε!");
          finalData = await apiResponse.arrayBuffer();
          fileNameToSave = `nobg_${file.name}.png`;
          apiUsed = true;
        } else {
          console.error("--> Σφάλμα από Remove.bg:", await apiResponse.text());
        }
      }

      console.log("--> [3/4] Ανέβασμα στο Vercel Blob...");
      const uniqueFilename = `${Date.now()}-${fileNameToSave.replace(/\s+/g, "_")}`;

      const blobResponse = await put(uniqueFilename, finalData, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      console.log("--> Το Blob ανέβηκε επιτυχώς:", blobResponse.url);
      imgPath = blobResponse.url;
    }

    console.log("--> [4/4] Αποθήκευση στη βάση δεδομένων...");
    const maxProduct = await prisma.product.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    const nextOrder = (maxProduct?.sortOrder || 0) + 1;

    await prisma.product.create({
      data: {
        name,
        price,
        img: imgPath,
        desc,
        descEn,
        category: category || "care",
        sortOrder: nextOrder,
      },
    });

    // <--- Η ΔΙΟΡΘΩΣΗ: Προστέθηκε το { data: {} } για να μην "σκάει" το Prisma
    if (apiUsed) {
      await prisma.apiLog.create({ data: {} });
    }

    console.log("--> [ΕΠΙΤΥΧΙΑ] Το προϊόν αποθηκεύτηκε! Γίνεται refresh...");
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error: any) {
    console.error("!!! ΚΡΙΣΙΜΟ ΣΦΑΛΜΑ ΣΤΟ CREATE PRODUCT !!!", error);
    throw new Error("Αποτυχία δημιουργίας προϊόντος. Δες τα Vercel Logs.");
  }
}

export async function updateProduct(id: string, data: any) {
  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      price: data.price,
      desc: data.desc,
      descEn: data.descEn,
      category: data.category,
    },
  });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  try {
    // 1. Βρίσκουμε το προϊόν για να πάρουμε το URL της εικόνας του
    const product = await prisma.product.findUnique({
      where: { id },
    });

    // 2. Αν υπάρχει εικόνα ΚΑΙ είναι ανεβασμένη στο Vercel Blob, τη διαγράφουμε
    if (product?.img && product.img.includes("vercel-storage.com")) {
      console.log("--> Διαγραφή αρχείου από Vercel Blob:", product.img);
      await del(product.img, {
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
    }

    // 3. Διαγράφουμε το προϊόν από τη βάση (Neon)
    await prisma.product.delete({
      where: { id },
    });

    console.log("--> Το προϊόν διαγράφηκε επιτυχώς!");
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    console.error("Σφάλμα κατά τη διαγραφή προϊόντος:", error);
    throw new Error("Αποτυχία διαγραφής προϊόντος.");
  }
}

export async function moveProduct(id: string, direction: "up" | "down") {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return;

  if (direction === "up" && index > 0) {
    const current = products[index];
    const prev = products[index - 1];
    const currentOrder = current.sortOrder;
    const prevOrder =
      prev.sortOrder === currentOrder ? currentOrder - 1 : prev.sortOrder;

    await prisma.product.update({
      where: { id: current.id },
      data: { sortOrder: prevOrder },
    });
    await prisma.product.update({
      where: { id: prev.id },
      data: { sortOrder: currentOrder },
    });
  } else if (direction === "down" && index < products.length - 1) {
    const current = products[index];
    const next = products[index + 1];
    const currentOrder = current.sortOrder;
    const nextOrder =
      next.sortOrder === currentOrder ? currentOrder + 1 : next.sortOrder;

    await prisma.product.update({
      where: { id: current.id },
      data: { sortOrder: nextOrder },
    });
    await prisma.product.update({
      where: { id: next.id },
      data: { sortOrder: currentOrder },
    });
  }
  revalidatePath("/admin");
  revalidatePath("/");
}

// Πρόσθεσε αυτό το import στην κορυφή του actions.ts αν δεν υπάρχει:
import bcrypt from "bcryptjs";

export async function updateAdminSettings(formData: FormData) {
  try {
    const newUsername = formData.get("username") as string;
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;

    if (!newUsername || !oldPassword) {
      return {
        success: false,
        error: "Το όνομα χρήστη και ο παλαιός κωδικός είναι υποχρεωτικά πεδία.",
      };
    }

    // Επειδή έχουμε μόνο έναν Admin στο σύστημα, παίρνουμε τον πρώτο χρήστη που βρίσκουμε
    // (Αν το μοντέλο σου στο schema.prisma λέγεται 'admin' αντί για 'user', άλλαξέ το σε prisma.admin)
    const adminUser = await prisma.user.findFirst();

    if (!adminUser) {
      return {
        success: false,
        error: "Δεν βρέθηκε ο λογαριασμός διαχειριστή στη βάση.",
      };
    }

    // Έλεγχος: Ταιριάζει ο παλιός κωδικός με αυτόν της βάσης;
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      adminUser.password,
    );
    if (!isPasswordValid) {
      return {
        success: false,
        error: "Ο παλαιός κωδικός που πληκτρολογήσατε είναι λάθος.",
      };
    }

    // Φτιάχνουμε το αντικείμενο με τα δεδομένα που θα γίνουν update
    const updateData: any = {
      username: newUsername,
    };

    let passwordChanged = false;

    // Αν ο χρήστης συμπλήρωσε ΚΑΙ νέο κωδικό, τον κρυπτογραφούμε πριν τον σώσουμε
    if (newPassword && newPassword.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
      updateData.password = hashedNewPassword;
      passwordChanged = true;
    }

    // Ενημέρωση στη βάση (Neon)
    await prisma.user.update({
      where: { id: adminUser.id },
      data: updateData,
    });

    // Καθαρισμός cache για να ανανεωθούν τα πάντα αμέσως
    revalidatePath("/admin");

    return {
      success: true,
      message: "Οι αλλαγές αποθηκεύτηκαν επιτυχώς!",
      passwordChanged,
    };
  } catch (error: any) {
    console.error("Σφάλμα κατά την αλλαγή στοιχείων admin:", error);
    return { success: false, error: "Κάτι πήγε στραβά. Δοκιμάστε ξανά." };
  }
}
