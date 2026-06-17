"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Star,
} from "lucide-react";

export default function Home() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const galleryImages = [
    "scshot1.png",
    "scshot2.png",
    "scshot3.png",
    "scshot4.png",
    "scshot5.png",
    "scshot6.png",
  ];

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

  const products = [
    {
      name: "Lavish Care Matte Paste",
      desc: "Δυνατό κράτημα & ματ υφή.",
      price: "14 €",
      img: "cs_product_1.png",
    },
    {
      name: "Lavish Care Sea Salt Spray",
      desc: "Όγκος και φυσικό styling.",
      price: "12 €",
      img: "cs_product_2.png",
    },
    {
      name: "Lavish Care Beard Oil",
      desc: "Ενυδάτωση & λάμψη για τα γένια.",
      price: "15 €",
      img: "cs_product_3.png",
    },
    {
      name: "Lavish Care Hair Powder",
      desc: "Πούδρα για έξτρα όγκο.",
      price: "13 €",
      img: "cs_product_4.png",
    },
  ];

  const reviews = [
    {
      name: "Γιώργος Π.",
      text: "Το καλύτερο σβήσιμο στην πόλη. Καθαρός χώρος και φοβερά παιδιά.",
    },
    {
      name: "Νίκος Κ.",
      text: "Επαγγελματίας με τα όλα του. Δίνει προσοχή στη λεπτομέρεια. Προτείνεται ανεπιφύλακτα!",
    },
    {
      name: "Δημήτρης Α.",
      text: "Άψογη εξυπηρέτηση και το μαγαζί τα σπάει από αισθητική. 5 αστέρια με κλειστά μάτια.",
    },
    {
      name: "Κώστας Μ.",
      text: "Ο Γιάννης είναι καλλιτέχνης. Επιτέλους βρήκα τον μπαρμπέρη μου.",
    },
  ];

  const nextImage = () =>
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () =>
    setGalleryIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );

  const handleDragEnd = (event: any, info: any) => {
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
          src="./hero_section_johnny_portrait.png"
          alt="Hero Mobile"
          className="block sm:hidden w-full h-full object-cover object-center"
        />
        <img
          src="./hero_section_johnny.png"
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
              <button
                onClick={() => setIsMenuOpen(false)}
                className="self-end mb-8 text-zinc-500 hover:text-zinc-900"
              >
                <X size={28} />
              </button>
              <div className="flex flex-col gap-6 text-lg font-medium text-zinc-700">
                <a
                  href="#about"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-950 transition-colors"
                >
                  Σχετικά
                </a>
                <a
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-950 transition-colors"
                >
                  Υπηρεσίες
                </a>
                <a
                  href="#gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-950 transition-colors"
                >
                  Έργα
                </a>
                <a
                  href="#products"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-zinc-950 transition-colors"
                >
                  Προϊόντα
                </a>
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
              src="./johnny_logo_no_bg.png"
              alt="Johnny Hair Lab Logo"
              className="h-full object-contain"
            />
          </div>
          <a
            href="https://www.fresha.com/el/a/johnny-hair-lab-thessaloniki-g-mpakatseloy-3-k2h0s017?pId=2559153"
            target="_blank"
            rel="noreferrer"
            className="bg-zinc-950 text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-zinc-800 transition-colors z-10"
          >
            Κράτηση
          </a>
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
            JOHNNY
            <br className="md:hidden" /> HAIR LAB
          </motion.h1>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-zinc-800 font-bold flex-wrap"
          >
            <span className="flex items-center gap-2">
              <MapPin size={18} /> Γ. Μπακατσέλου 3
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
        className="py-24 bg-zinc-50 relative z-20 shadow-[0_-20px_30px_-15px_rgba(0,0,0,0.05)]"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-8">
            Η Φιλοσοφια Μας
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-zinc-700 font-medium">
            Στην καρδιά της Θεσσαλονίκης, το{" "}
            <span className="text-zinc-950 font-bold">Johnny Hair Lab</span>{" "}
            προσφέρει μια μοναδική εμπειρία κουρέματος, με έμφαση στην ποιότητα
            και την περιβαλλοντική συνείδηση. Δημιουργούμε στυλ που αποπνέουν
            αυτοπεποίθηση, φροντίζοντας κάθε πελάτη με φιλική προσέγγιση.
            Επιλέγοντας φυσικά προϊόντα, συνδυάζουμε τη μόδα με την οικολογική
            υπευθυνότητα.
          </p>
        </motion.div>
      </section>

      {/* 3D GALLERY */}
      <section
        id="gallery"
        className="py-24 bg-zinc-100 overflow-hidden relative z-20"
      >
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
            Το Αποτέλεσμα
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
      <section id="services" className="py-24 bg-white relative z-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-16 text-center">
            Υπηρεσίες
          </h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {services.map((service, index) => (
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
                    {service.name}
                  </h3>
                  <span className="text-lg font-bold text-zinc-900">
                    {service.price}
                  </span>
                </div>
                <span className="text-sm text-zinc-500 flex items-center gap-1">
                  <Clock size={14} /> {service.duration}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS CAROUSEL */}
      <section id="products" className="py-24 bg-zinc-50 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Προϊόντα Περιποίησης
            </h2>
            <p className="text-zinc-500 mt-2">
              Συντήρησε το αποτέλεσμα και στο σπίτι.
            </p>
          </div>
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `::-webkit-scrollbar { display: none; }`,
              }}
            />
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-none w-[75vw] sm:w-[40vw] md:w-[280px] snap-center bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 flex flex-col items-center text-center"
              >
                <div className="w-full aspect-square bg-zinc-50 rounded-xl mb-6 p-4 flex items-center justify-center">
                  <img
                    src={`./${product.img}`}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-500 mb-4 flex-grow">
                  {product.desc}
                </p>
                <span className="text-lg font-bold text-zinc-900">
                  {product.price}
                </span>
              </div>
            ))}
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
              Τι λένε οι πελάτες μας
            </h2>
            <p className="text-zinc-400 mt-2">
              121 κριτικές · 5.0 Αστέρια στο Google
            </p>
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
                  "{review.text}"
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
            <h3 className="text-2xl font-bold mb-8">Επικοινωνία & Ωράριο</h3>
            <div className="space-y-6 text-zinc-400">
              <div className="flex items-start gap-4">
                <MapPin className="text-white mt-1" />
                <p>
                  Γ. Μπακατσέλου 3<br />
                  Θεσσαλονίκη, 54624
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
                    <span>Δευ - Παρ:</span>{" "}
                    <span className="text-white">10:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Σάββατο:</span>{" "}
                    <span className="text-white">09:00 - 18:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Κυριακή:</span>{" "}
                    <span className="text-zinc-600">Κλειστά</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-[400px] md:h-full grayscale hover:grayscale-0 transition-all duration-700">
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
