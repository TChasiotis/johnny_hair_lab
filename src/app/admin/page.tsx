import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Βρίσκουμε την 1η μέρα του τρέχοντος μήνα (π.χ. 2026-06-01)
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Μετράμε πόσα προϊόντα δημιουργήθηκαν αυτόν τον μήνα
  const monthlyUploadsCount = await prisma.product.count({
    where: {
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <AdminDashboard
      initialServices={services}
      initialProducts={products}
      monthlyUploadsCount={monthlyUploadsCount} // Στέλνουμε τον μετρητή στο UI
    />
  );
}
