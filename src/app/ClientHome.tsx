"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  PanInfo,
} from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Star,
  Globe,
} from "lucide-react";

export default function ClientHome({
  services,
  products,
}: {
  services: any[];
  products: any[];
}) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<"el" | "en">("el");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // --- ΛΕΞΙΚΟ ΣΤΑΤΙΚΩΝ ΚΕΙΜΕΝΩΝ ---
  const t = {
    el: {
      nav: {
        about: "Σχετικά",
        gallery: "Our Work",
        services: "Υπηρεσίες",
        products: "Προϊόντα",
        book: "Κράτηση",
      },
      hero: { address: "Γ. Μπακατσέλου 3" },
      about: {
        title: "Η Φιλοσοφια Μας",
        text: "Στην καρδιά της Θεσσαλονίκης, το Johnny Hair Lab προσφέρει μια μοναδική εμπειρία κουρέματος, με έμφαση στην ποιότητα και την περιβαλλοντική συνείδηση. Δημιουργούμε στυλ που αποπνέουν αυτοπεποίθηση, φροντίζοντας κάθε πελάτη με φιλική προσέγγιση.",
      },
      gallery: { title: "Our Work" },
      services: { title: "Υπηρεσίες" },
      products: {
        title: "Προϊόντα Περιποίησης",
        sub: "Συντήρησε το αποτέλεσμα και στο σπίτι.",
      },
      reviews: {
        title: "Τι λένε οι πελάτες μας",
      },
      contact: {
        title: "Επικοινωνία & Ωράριο",
        address1: "Γ. Μπακατσέλου 3",
        address2: "Θεσσαλονίκη, 54624",
        days: "Δευ - Παρ",
        sat: "Σάββατο",
        sun: "Κυριακή",
        closed: "Κλειστά",
      },
    },
    en: {
      nav: {
        about: "About",
        gallery: "Our Work",
        services: "Services",
        products: "Products",
        book: "Book Now",
      },
      hero: { address: "3 G. Mpakatselou St." },
      about: {
        title: "Our Philosophy",
        text: "In the heart of Thessaloniki, Johnny Hair Lab offers a unique grooming experience, focusing on quality and environmental consciousness. We create styles that exude confidence, treating every client with a friendly approach.",
      },
      gallery: { title: "Our Work" },
      services: { title: "Services" },
      products: {
        title: "Grooming Products",
        sub: "Maintain the look at home.",
      },
      reviews: {
        title: "What our clients say",
      },
      contact: {
        title: "Contact & Hours",
        address1: "3 G. Mpakatselou St.",
        address2: "Thessaloniki, 54624",
        days: "Mon - Fri",
        sat: "Saturday",
        sun: "Sunday",
        closed: "Closed",
      },
    },
  };

  const currentT = t[lang];

  const galleryImages = [
    "./scshots/scshot1.png",
    "./scshots/scshot2.png",
    "./scshots/scshot3.png",
    "./scshots/scshot4.png",
    "./scshots/scshot5.png",
    "./scshots/scshot6.png",
  ];

  const reviews = [
    {
      name: "Κωνσταντίνος",
      text: {
        el: "Άνετα το καλύτερο κουρείο στην Θεσσαλονίκη πολύ φιλικό περιβάλλον και ο τζονι ο καλύτερος κουρέας ότι κούρεμα κι αν ζητήσετε θα έχετε το καλύτερο αποτέλεσμα.",
        en: "Άνετα το καλύτερο κουρείο στην Θεσσαλονίκη πολύ φιλικό περιβάλλον και ο τζονι ο καλύτερος κουρέας ότι κούρεμα κι αν ζητήσετε θα έχετε το καλύτερο αποτέλεσμα.(Easily the best barbershop in Thessaloniki, very friendly environment and Johnny is the best barber. Whatever haircut you ask for, you will get the best result.)",
      },
    },
    {
      name: "Marina Asmr",
      text: {
        el: "Amazing haircut and the barber is a lovely person!! My son was extremely happy with the result. I highly recommend it💯❤️💈 (Καταπληκτικό κούρεμα και ο κουρέας είναι υπέροχος άνθρωπος!! Ο γιος μου έμεινε εξαιρετικά ευχαριστημένος με το αποτέλεσμα. Το συνιστώ ανεπιφύλακτα💯❤️💈)",
        en: "Amazing haircut and the barber is a lovely person!! My son was extremely happy with the result. I highly recommend it💯❤️💈",
      },
    },
    {
      name: "Απόστολος ΠΑΠΑΤΣΙΜΠΑΣ",
      text: {
        el: "Ακραία και σταθερά και κουρέματα, πολύ ευγενικός και ο ίδιος ο κουρέας αξίζει χωρίς αμφιβολία!!🔥🔥",
        en: "Ακραία και σταθερά και κουρέματα, πολύ ευγενικός και ο ίδιος ο κουρέας αξίζει χωρίς αμφιβολία!!🔥🔥 (Extreme and consistent haircuts, the barber himself is very polite, totally worth it without a doubt!!🔥🔥)",
      },
    },
    {
      name: "Christian Fraedrich",
      text: {
        el: "Alles perfekt. Super nett und sehr guter Service (Όλα τέλεια. Σούπερ ευγενικός και πολύ καλή εξυπηρέτηση)",
        en: "Alles perfekt. Super nett und sehr guter Service (Everything perfect. Super nice and very good service)",
      },
    },
    {
      name: "Γιάννης Χελάς",
      text: {
        el: "Είναι ένα από τα καλύτερα κουρεία στην πόλη! Ο χώρος είναι καθαρός, ο Τζόνι πάντα εξυπηρετικός, χαμογελαστός, ευδιάθετος και φιλικός με όλους. Κάνει το κούρεμα μία ευχάριστη εμπειρία, μέσα από την κουβέντα, την περιποίηση και πάντοτε κοιτάζει να αφήσει τον κάθε πελάτη ικανοποιημένο...",
        en: "Είναι ένα από τα καλύτερα κουρεία στην πόλη! Ο χώρος είναι καθαρός, ο Τζόνι πάντα εξυπηρετικός, χαμογελαστός, ευδιάθετος και φιλικός με όλους. Κάνει το κούρεμα μία ευχάριστη εμπειρία, μέσα από την κουβέντα, την περιποίηση και πάντοτε κοιτάζει να αφήσει τον κάθε πελάτη ικανοποιημένο... (One of the best barbershops in town! The place is clean, Johnny is always helpful, smiling, cheerful, and friendly. He makes the haircut a pleasant experience through conversation and always leaves every customer satisfied...)",
      },
    },
    {
      name: "Χρηστος Σοφος",
      text: {
        el: "Great haircut. Trustworthy barber that knows what suits you. Never even had to say what haircut I wanted I just sit on the chair and let him do what he wants. (Υπέροχο κούρεμα. Αξιόπιστος κουρέας που ξέρει τι σου ταιριάζει. Δεν χρειάστηκε καν να πω τι κούρεμα ήθελα, απλά κάθομαι στην καρέκλα και τον αφήνω να κάνει ό,τι θέλει.)",
        en: "Great haircut. Trustworthy barber that knows what suits you. Never even had to say what haircut I wanted I just sit on the chair and let him do what he wants.",
      },
    },
    {
      name: "κωστας ζαραγκουλιας",
      text: {
        el: "Παρά πολύ καλός στη δουλειά του εξυπηρετικός, με το χαμόγελο πάντα και πρόθυμος να ακούσει την άποψη σου αν δεν σου αρέσει κάτι!!!",
        en: "Παρά πολύ καλός στη δουλειά του εξυπηρετικός, με το χαμόγελο πάντα και πρόθυμος να ακούσει την άποψη σου αν δεν σου αρέσει κάτι!!! (Very good at his job, helpful, always with a smile and willing to listen to your opinion if you don't like something!!!)",
      },
    },
    {
      name: "Αλέξανδρος Χαραλαμπιδης",
      text: {
        el: "Παρά πολύ όμορφα διαμορφωμένος χώρος με πολύ καλή εξυπηρέτηση. Πολύ καλή επικοινωνία, γρήγορο κούρεμα και φεύγεις γνωρίζοντας πως είσαι κουρεμένος ακριβώς όπως το ζήτησες!!!",
        en: "Παρά πολύ όμορφα διαμορφωμένος χώρος με πολύ καλή εξυπηρέτηση. Πολύ καλή επικοινωνία, γρήγορο κούρεμα και φεύγεις γνωρίζοντας πως είσαι κουρεμένος ακριβώς όπως το ζήτησες!!! (Beautifully designed space with very good service. Great communication, quick haircut, and you leave knowing you got exactly the haircut you asked for!!!)",
      },
    },
    {
      name: "Kon Kan",
      text: {
        el: "Εξαιρετικό ταλέντο στη κομμωτική τέχνη. Γρηγορη εξυπηρέτηση και αξιοπιστία. Τον συνιστώ ανεπιφύλακτα σε όλους!!!!",
        en: "Εξαιρετικό ταλέντο στη κομμωτική τέχνη. Γρηγορη εξυπηρέτηση και αξιοπιστία. Τον συνιστώ ανεπιφύλακτα σε όλους!!!! (Exceptional talent in hairdressing. Fast service and reliability. I highly recommend him to everyone!!!!)",
      },
    },
    {
      name: "eraldi dervishaj",
      text: {
        el: "Από τα καλύτερα κουρέματα που μου έχουν κάνει με λεπτομέρεια και άριστο αποτέλεσμα συνιστώ σε όλους.",
        en: "Από τα καλύτερα κουρέματα που μου έχουν κάνει με λεπτομέρεια και άριστο αποτέλεσμα συνιστώ σε όλους. (One of the best haircuts I've ever had, detailed with excellent results, I recommend it to everyone.)",
      },
    },
  ];

  const nextImage = () =>
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () =>
    setGalleryIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -50) nextImage();
    else if (info.offset.x > 50) prevImage();
  };

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 font-sans selection:bg-zinc-900 selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-zinc-900 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <img
          src="./hero_section/hero_section_johnny_portrait.png"
          alt="Hero Mobile"
          className="block sm:hidden w-full h-full object-cover object-center"
        />
        <img
          src="./hero_section/hero_section_johnny.png"
          alt="Hero Desktop"
          className="hidden sm:block w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[70]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-64 bg-white z-[80] shadow-2xl flex flex-col px-6 py-8"
            >
              {/* TOP: Header με Λογότυπο και κουμπί Κλεισίματος */}
              <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-5">
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter text-zinc-950">
                    JOHNNY HAIR LAB
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold mt-0.5">
                    Premium Barbershop
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-zinc-400 hover:text-zinc-900 p-1 -mr-2 transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              {/* CENTER: Τα Hooks Πλοήγησης (Σωστή Σειρά) */}
              <nav className="flex flex-col gap-6 text-lg font-medium text-zinc-700 flex-1">
                <a
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {currentT.nav.about}
                </a>
                <a
                  href="#gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {currentT.nav.gallery}
                </a>
                <a
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {currentT.nav.services}
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-950 transition-colors"
                >
                  {currentT.nav.products}
                </a>
              </nav>

              {/* BOTTOM: Επιλογή Γλώσσας */}
              <div className="border-t border-zinc-100 pt-6 mt-auto flex justify-between items-center">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                  Language
                </span>
                <button
                  onClick={() => setLang(lang === "el" ? "en" : "el")}
                  className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 px-4 py-2 rounded-full transition-colors"
                >
                  <Globe size={18} className="text-zinc-500" />
                  <span className="font-bold text-sm tracking-wider">
                    {lang === "el" ? "EN" : "EL"}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-zinc-100/50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between relative">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2 text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
          >
            <Menu size={28} />
          </button>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-14 md:h-16">
            <img
              src="./logo/johnny_logo_no_bg.png"
              alt="Johnny Hair Lab Logo"
              className="h-full object-contain"
            />
          </div>

          <div className="flex items-center gap-3 z-10">
            <button
              onClick={() => setLang(lang === "el" ? "en" : "el")}
              className="hidden sm:flex items-center gap-1.5 p-2 text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors text-sm font-semibold uppercase tracking-wider"
            >
              <Globe size={18} />
              <span>{lang === "el" ? "EN" : "EL"}</span>
            </button>
            <a
              href="https://www.fresha.com/el/a/johnny-hair-lab-thessaloniki-g-mpakatseloy-3-k2h0s017?pId=2559153"
              target="_blank"
              rel="noreferrer"
              className="bg-zinc-950 text-white px-5 py-2.5 rounded text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              {currentT.nav.book}
            </a>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden pt-20 z-10">
        <div className="z-10 text-center px-6 py-8 md:py-12 md:px-16 mt-16 md:mt-0 bg-white/50 backdrop-blur-md border border-white/40 rounded-3xl shadow-xl mx-4 max-w-4xl">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tighter text-zinc-900 mb-6 drop-shadow-sm"
          >
            JOHNNY <br className="md:hidden" /> HAIR LAB
          </motion.h1>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-zinc-800 font-bold flex-wrap"
          >
            <span className="flex items-center gap-2">
              <MapPin size={18} /> {currentT.hero.address}
            </span>
            <span className="hidden sm:block text-zinc-400">|</span>
            <span className="flex items-center gap-2">
              <Phone size={18} /> 2316028376
            </span>
            <span className="hidden sm:block text-zinc-400">|</span>
            <a
              href="https://www.instagram.com/johnny_hair_lab_/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-zinc-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @johnny_hair_lab_
            </a>
          </motion.div>
        </div>
      </section>

      {/* ABOUT US */}
      <section
        id="about"
        className="py-24 bg-zinc-50 relative z-20 shadow-[0_-20px_30px_-15px_rgba(0,0,0,0.05)] scroll-mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-8">
            {currentT.about.title}
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-zinc-700 font-medium">
            {currentT.about.text}
          </p>
        </motion.div>
      </section>

      {/* 3D GALLERY */}
      <section
        id="gallery"
        className="py-24 bg-zinc-100 overflow-hidden relative z-20 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            {currentT.gallery.title}
          </h2>
        </div>
        <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center max-w-5xl mx-auto px-6 cursor-grab active:cursor-grabbing">
          <AnimatePresence mode="popLayout">
            {galleryImages.map((img, index) => {
              const isActive = index === galleryIndex;
              const isPrev =
                index ===
                (galleryIndex - 1 + galleryImages.length) %
                  galleryImages.length;
              const isNext =
                index === (galleryIndex + 1) % galleryImages.length;
              if (!isActive && !isPrev && !isNext) return null;
              return (
                <motion.div
                  key={index}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1 : 0.8,
                    x: isActive ? "0%" : isPrev ? "-60%" : "60%",
                    zIndex: isActive ? 30 : 20,
                    rotateY: isActive ? 0 : isPrev ? 15 : -15,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute w-[75vw] md:w-[400px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                  style={{ perspective: 1000 }}
                >
                  <img
                    src={`./${img}`}
                    alt={`Gallery ${index}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div className="hidden md:flex absolute bottom-[-3rem] gap-6 z-40">
            <button
              onClick={prevImage}
              className="p-3 rounded-full bg-white shadow-md hover:bg-zinc-100 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="p-3 rounded-full bg-white shadow-md hover:bg-zinc-100 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="py-24 bg-white relative z-20 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-16 text-center">
            {currentT.services.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {services.map((service, index) => {
              const sName =
                lang === "el" ? service.name : service.nameEn || service.name;
              const sPrice =
                lang === "el"
                  ? service.price
                  : service.priceEn || service.price;

              const formattedDurationEl = service.duration
                ?.replace("λ.", "min")
                ?.replace("ώ.", "h");
              const sDuration =
                lang === "el"
                  ? formattedDurationEl
                  : service.durationEn || formattedDurationEl;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="flex flex-col border-b border-zinc-100 pb-4 group"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-600 transition-colors">
                      {sName}
                    </h3>
                    <span className="text-lg font-bold text-zinc-900">
                      {sPrice}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500 flex items-center gap-1">
                    <Clock size={14} /> {sDuration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS CAROUSEL */}
      <section
        id="products"
        className="py-24 bg-zinc-50 relative z-20 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              {currentT.products.title}
            </h2>
            <p className="text-zinc-500 mt-2">{currentT.products.sub}</p>
          </div>
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, index) => {
              const pDesc =
                lang === "el" ? product.desc : product.descEn || product.desc;

              return (
                <div
                  key={index}
                  className="flex-none w-[75vw] sm:w-[40vw] md:w-[280px] snap-center bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 flex flex-col items-center text-center"
                >
                  <div className="w-full h-56 bg-zinc-50 rounded-xl mb-6 p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>
                  <h3 className="font-semibold text-zinc-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-500 mb-4 flex-grow">
                    {pDesc}
                  </p>
                  <span className="text-lg font-bold text-zinc-900">
                    {product.price}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section className="py-24 bg-zinc-900 text-zinc-50 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-500 fill-yellow-500"
                  size={24}
                />
              ))}
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              {currentT.reviews.title}
            </h2>
          </div>
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-none w-[85vw] md:w-[350px] snap-center bg-zinc-800 rounded-2xl p-8 border border-zinc-700"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-500 fill-yellow-500"
                      size={16}
                    />
                  ))}
                </div>
                <p className="text-zinc-300 italic mb-6 leading-relaxed">
                  "{review.text[lang]}"
                </p>
                <p className="font-semibold text-white">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP & FOOTER */}
      <section className="bg-zinc-950 text-white relative z-20">
        <div className="grid md:grid-cols-2 min-h-[500px]">
          <div className="p-12 flex flex-col justify-center bg-zinc-950 border-t border-zinc-900">
            <h3 className="text-2xl font-bold mb-8">
              {currentT.contact.title}
            </h3>
            <div className="space-y-6 text-zinc-400">
              <div className="flex items-start gap-4">
                <MapPin className="text-white mt-1" />
                <p>
                  {currentT.contact.address1}
                  <br />
                  {currentT.contact.address2}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-white" />
                <p>2316028376</p>
              </div>
              <div className="flex items-center gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <a
                  href="https://www.instagram.com/johnny_hair_lab_/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @johnny_hair_lab_
                </a>
              </div>
              <div className="flex items-start gap-4 pt-4 border-t border-zinc-800">
                <Clock className="text-white mt-1" />
                <ul className="space-y-1 w-full max-w-[250px]">
                  <li className="flex justify-between">
                    <span>{currentT.contact.days}:</span>{" "}
                    <span className="text-white">10:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{currentT.contact.sat}:</span>{" "}
                    <span className="text-white">09:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>{currentT.contact.sun}:</span>{" "}
                    <span className="text-zinc-600">
                      {currentT.contact.closed}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full h-[400px] md:h-full md:grayscale md:hover:grayscale-0 grayscale-0 transition-all duration-500">
            <iframe
              src="https://maps.google.com/maps?q=Johnny+Hair+Lab,+Thessaloniki&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
