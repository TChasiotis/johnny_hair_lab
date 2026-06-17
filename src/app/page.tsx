import prisma from "./lib/prisma";
import ClientHome from "./ClientHome";

export default async function Home() {
  // 1. Τραβάμε τα δεδομένα από την PostgreSQL
  const services = await prisma.service.findMany();
  const products = await prisma.product.findMany();

  // 2. Τα περνάμε στο Client Component που έχει το UI
  return <ClientHome services={services} products={products} />;
}
