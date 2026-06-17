import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Σκούπισμα παλιών δεδομένων...");
  // Διαγράφουμε τα πάντα πριν τα ξαναβάλουμε για να μην έχουμε διπλότυπα
  await prisma.product.deleteMany();
  await prisma.service.deleteMany();

  console.log("Ξεκινάει το γέμισμα της βάσης (Seeding)...");

  // --- ΟΙ ΥΠΗΡΕΣΙΕΣ (Συμπλήρωσε τις υπόλοιπες 11 εδώ) ---
  const services = [
    { name: "Ανδρικό κούρεμα", duration: "30 λ.", price: "12 €" },
    { name: "Ανδρικό κούρεμα + Γένια", duration: "30 λ.", price: "15 €" },
    { name: "Κούρεμα ψαλίδι", duration: "1 ώ.", price: "15 €" },
    { name: "Κούρεμα ψαλίδι + Γένια", duration: "1 ώ.", price: "18 €" },
    { name: "Περιποίηση Γενειάδας", duration: "30 λ.", price: "5 €" },
    { name: "Παιδικό κούρεμα", duration: "30 λ.", price: "10 €" },
    { name: "Αποτρίχωση μύτης", duration: "15 λ.", price: "3 €" },
    { name: "Περιποίηση φρυδιών", duration: "15 λ.", price: "3 €" },
    {
      name: "Περμανάντ - Permanant",
      duration: "1 ώ., 30 λ.",
      price: "από 40 €",
    },
    { name: "Ανταύγειες Silver (Men)", duration: "2 ώ.", price: "από 35 €" },
    { name: "Silver color 🧊(Men)", duration: "2 ώ.", price: "από 45 €" },
  ];

  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }

  // --- ΤΑ ΠΡΟΪΟΝΤΑ ---
  const products = [
    // --- ΠΡΟΕΤΟΙΜΑΣΙΑ & ΟΓΚΟΣ (Prep & Volume) ---
    {
      name: "Poppin' Yang Sea Salt Spray",
      desc: "Σπρέι αλατιού για όγκο και φυσικό styling.",
      price: "15 €",
      img: "./products/poppin_yang_sea_salt_spray.png",
      category: "prep",
    },
    {
      name: "Lavish Care Hair Grooming Tonic",
      desc: "Ιδανικό για προετοιμασία styling με πιστολάκι.",
      price: "13 €",
      img: "./products/lc_care_hair_grooming_tonic.png",
      category: "prep",
    },
    {
      name: "Poppin' Yang Texture Powder",
      desc: "Πούδρα για μέγιστο όγκο στις ρίζες.",
      price: "15 €",
      img: "./products/poppin_yang_texture_powder.png",
      category: "prep",
    },

    // --- ΠΟΜΑΔΕΣ & ΠΗΛΟΙ (Pomades, Clays, Pastes) ---
    {
      name: "Lavish Care Matte Cream Paste",
      desc: "Κρέμα για φυσικό αποτέλεσμα χωρίς γυαλάδα.",
      price: "13 €",
      img: "./products/matte_cream_paste.png",
      category: "pomades",
    },
    {
      name: "Lavish Care Clay Pomade",
      desc: "Πομάδα αργίλου για δυνατό κράτημα και ματ υφή.",
      price: "13 €",
      img: "./products/lc_clay_pomade.png",
      category: "pomades",
    },
    {
      name: "Lavish Care Styling Mud",
      desc: "Λάσπη φορμαρίσματος για ελαστικό κράτημα.",
      price: "13 €",
      img: "./products/lc_styling_mud.png",
      category: "pomades",
    },
    {
      name: "Lavish Care Strong Hold Deluxe",
      desc: "Κλασική πομάδα για πολύ δυνατό κράτημα & λάμψη.",
      price: "13 €",
      img: "./products/lc_strong_hold_deluxe.png",
      category: "pomades",
    },

    // --- ΚΕΡΙΑ (Waxes) ---
    {
      name: "Innovation Detreu Cream Wax 05",
      desc: "Κρεμώδες κερί για φυσικό στυλ.",
      price: "13 €",
      img: "./products/innovation_detreu_cream_wax_05_natural_strong_soft.png",
      category: "waxes",
    },
    {
      name: "Innovation Detreu Aqua Wax 07",
      desc: "Κερί νερού για εξαιρετικά δυνατό κράτημα.",
      price: "13 €",
      img: "./products/innovation_detreu_aqua_hair_wax_07_extra_strong_crazy.png",
      category: "waxes",
    },
    {
      name: "Innovation Detreu Aqua Wax 08",
      desc: "Απόλυτος έλεγχος με εφέ δροσιάς.",
      price: "13 €",
      img: "./products/innovation_detreu_aqua_hair_wax_08_ultra_strong_cool.png",
      category: "waxes",
    },
    {
      name: "Red One Bright White Aqua Hair Wax",
      desc: "Full force maximum control, καθαρό αποτέλεσμα.",
      price: "12 €",
      img: "./products/red_one_bright_white_aqua_hair_wax_full_force_maximum_control.png",
      category: "waxes",
    },

    // --- ΚΑΘΑΡΙΣΜΟΣ & ΠΕΡΙΠΟΙΗΣΗ (Shampoos, Beard) ---
    {
      name: "Lavish Care Siberian Hunter",
      desc: "Αναζωογονητικό σαμπουάν για μαλλιά και σώμα.",
      price: "13 €",
      img: "./products/lc_siberian_hunter.png",
      category: "care",
    },
    {
      name: "Lavish Care Siberian Healer",
      desc: "Δροσιστικό σαμπουάν για βαθύ καθαρισμό.",
      price: "13 €",
      img: "./products/lc_siberian_healer.png",
      category: "care",
    },
    {
      name: "Poppin' Yang Beard Cream",
      desc: "Κρέμα για μαλακά γένια και ενυδάτωση δέρματος.",
      price: "15 €",
      img: "./products/poppin_yang_beard_cream.png",
      category: "care",
    },

    // --- AFTER SHAVE / ΚΟΛΟΝΙΕΣ ---
    {
      name: "Red One Natural Cologne Thunderbolt",
      desc: "Κολόνια για έντονη φρεσκάδα μετά το κούρεμα.",
      price: "13 €",
      img: "./products/red_one_natural_cologne_pure_by_nature_thunderbolt.png",
      category: "cologne",
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log(
    "Επιτυχία! Όλες οι υπηρεσίες και τα προϊόντα προστέθηκαν στη βάση δεδομένων.",
  );
}

main()
  .catch((e) => {
    console.error("Σφάλμα κατά το seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
