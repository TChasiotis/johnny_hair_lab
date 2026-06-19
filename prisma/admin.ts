import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Εδώ ορίζουμε τον κωδικό που θα πληκτρολογεί ο Γιάννης
  // Μπορείς να αλλάξεις το "johnny123" σε ό,τι άλλο θέλεις!
  const plainPassword = "johnny123";

  // Κρυπτογράφηση του κωδικού
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Δημιουργία ή Ενημέρωση του Admin
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("Επιτυχία! Ο λογαριασμός δημιουργήθηκε.");
  console.log("Username:", admin.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
