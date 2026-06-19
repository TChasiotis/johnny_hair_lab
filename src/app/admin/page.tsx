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

  // Μηδενισμός στις 19 κάθε μήνα
  const now = new Date();
  const resetDay = 19;
  let startOfBillingCycle;

  if (now.getDate() >= resetDay) {
    startOfBillingCycle = new Date(now.getFullYear(), now.getMonth(), resetDay);
  } else {
    startOfBillingCycle = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      resetDay,
    );
  }

  const monthlyUploadsCount = await prisma.product.count({
    where: {
      createdAt: {
        gte: startOfBillingCycle,
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
      monthlyUploadsCount={monthlyUploadsCount}
    />
  );
}
