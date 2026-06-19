"use server";

import prisma from "../lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

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
  const name = formData.get("name") as string;
  const price = formData.get("price") as string;
  const desc = formData.get("desc") as string;
  const descEn = formData.get("descEn") as string;
  const category = formData.get("category") as string;
  const file = formData.get("file") as File;
  const useRemoveBg = formData.get("useRemoveBg") === "true"; // Πιάνουμε το toggle

  let imgPath = "./products/default.png";

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    let finalBuffer = buffer;
    const apiKey = process.env.REMOVE_BG_API_KEY;

    // Τρέχει το API ΜΟΝΟ αν το toggle είναι ανοιχτό ΚΑΙ υπάρχει API Key
    if (useRemoveBg && apiKey) {
      try {
        const apiFormData = new FormData();
        const blob = new Blob([buffer], { type: file.type });
        apiFormData.append("image_file", blob, file.name);
        apiFormData.append("size", "preview");

        const apiResponse = await fetch("https://api.remove.bg/v1.0/removebg", {
          method: "POST",
          headers: { "X-Api-Key": apiKey },
          body: apiFormData,
        });

        if (apiResponse.ok) {
          const arrayBuffer = await apiResponse.arrayBuffer();
          finalBuffer = Buffer.from(arrayBuffer);
        } else {
          console.error(
            "Σφάλμα από το Remove.bg API:",
            await apiResponse.text(),
          );
        }
      } catch (err) {
        console.error("Αποτυχία σύνδεσης με το Remove.bg API:", err);
      }
    }

    const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const publicProductsDir = path.join(process.cwd(), "public", "products");

    if (!fs.existsSync(publicProductsDir)) {
      fs.mkdirSync(publicProductsDir, { recursive: true });
    }

    const fullPath = path.join(publicProductsDir, filename);
    fs.writeFileSync(fullPath, finalBuffer);
    imgPath = `./products/${filename}`;
  }

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

  revalidatePath("/admin");
  revalidatePath("/");
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
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath("/admin");
  revalidatePath("/");
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
