import { NextResponse } from "next/server";
import prisma from "../../lib/prisma"; // Σιγουρέψου ότι οι τελείες δείχνουν σωστά στο lib/prisma
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// --- ΠΡΟΣΘΗΚΗ ΝΕΑΣ ΥΠΗΡΕΣΙΑΣ ---
export async function POST(req: Request) {
  // Ασφάλεια: Ελέγχουμε αν αυτός που κάνει το αίτημα είναι συνδεδεμένος Admin
  const session = await getServerSession(authOptions);
  if (!session)
    return new NextResponse("Μη εξουσιοδοτημένη πρόσβαση", { status: 401 });

  try {
    const body = await req.json();
    const { name, duration, price } = body;

    // Εγγραφή στη βάση δεδομένων (Prisma)
    const newService = await prisma.service.create({
      data: { name, duration, price },
    });

    return NextResponse.json(newService);
  } catch (error) {
    console.error("Σφάλμα POST:", error);
    return new NextResponse("Σφάλμα κατά τη δημιουργία", { status: 500 });
  }
}

// --- ΔΙΑΓΡΑΦΗ ΥΠΗΡΕΣΙΑΣ ---
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new NextResponse("Μη εξουσιοδοτημένη πρόσβαση", { status: 401 });

  try {
    // Παίρνουμε το ID από το URL (π.χ. /api/services?id=123)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return new NextResponse("Λείπει το ID της υπηρεσίας", { status: 400 });

    // Διαγραφή από τη βάση δεδομένων
    await prisma.service.delete({
      where: { id },
    });

    return new NextResponse("Η υπηρεσία διαγράφηκε", { status: 200 });
  } catch (error) {
    console.error("Σφάλμα DELETE:", error);
    return new NextResponse("Σφάλμα κατά τη διαγραφή", { status: 500 });
  }
}
