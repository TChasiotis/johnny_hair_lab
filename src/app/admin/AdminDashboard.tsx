"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Edit,
  LogOut,
  Scissors,
  Package,
  X,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  createService,
  updateService,
  deleteService,
  moveService,
  createProduct,
  updateProduct,
  deleteProduct,
  moveProduct,
} from "./actions";

export default function AdminDashboard({
  initialServices,
  initialProducts,
  monthlyUploadsCount = 0,
}: any) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"services" | "products">(
    "services",
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useRemoveBg, setUseRemoveBg] = useState(true);

  const [isServiceModalOpen, setServiceModalOpen] = useState(false);
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNewCategory, setIsNewCategory] = useState(false);

  const defaultService = { name: "", nameEn: "", duration: "", price: "" };
  const [serviceForm, setServiceForm] = useState(defaultService);

  const defaultProduct = {
    name: "",
    category: "care",
    price: "",
    img: "",
    desc: "",
    descEn: "",
  };
  const [productForm, setProductForm] = useState<any>(defaultProduct);
  const [productFile, setProductFile] = useState<File | null>(null);

  const existingCategories = Array.from(
    new Set(initialProducts?.map((p: any) => p.category).filter(Boolean)),
  ) as string[];

  if (existingCategories.length === 0) {
    existingCategories.push("prep", "pomades", "waxes", "care", "cologne");
  }

  const sortedServices = [...(initialServices || [])].sort(
    (a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0),
  );
  const sortedProducts = [...(initialProducts || [])].sort(
    (a: any, b: any) => (a.sortOrder || 0) - (b.sortOrder || 0),
  );

  // --- SERVICE HANDLERS ---
  const openNewService = () => {
    setServiceForm(defaultService);
    setEditingId(null);
    setServiceModalOpen(true);
  };

  const openEditService = (service: any) => {
    setServiceForm({
      name: service.name || "",
      nameEn: service.nameEn || "",
      duration: service.duration || "",
      price: service.price || "",
    });
    setEditingId(service.id);
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateService(editingId, serviceForm);
    } else {
      await createService(serviceForm);
    }
    setServiceModalOpen(false);
    router.refresh();
  };

  // --- PRODUCT HANDLERS ---
  const openNewProduct = () => {
    setProductForm(defaultProduct);
    setProductFile(null);
    setEditingId(null);
    setIsNewCategory(false);
    setProductModalOpen(true);
  };

  const openEditProduct = (product: any) => {
    setProductForm({
      name: product.name || "",
      category: product.category || "care",
      price: product.price || "",
      img: product.img || "",
      desc: product.desc || "",
      descEn: product.descEn || "",
    });
    setProductFile(null);
    setEditingId(product.id);
    setIsNewCategory(false);
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Ξεκινάει το loading
    try {
      if (editingId) {
        await updateProduct(editingId, productForm);
      } else {
        const formData = new FormData();
        formData.append("name", productForm.name);
        formData.append("price", productForm.price);
        formData.append("category", productForm.category);
        formData.append("desc", productForm.desc);
        formData.append("descEn", productForm.descEn);
        formData.append("useRemoveBg", useRemoveBg ? "true" : "false"); // Στέλνουμε το toggle
        if (productFile) {
          formData.append("file", productFile);
        }
        await createProduct(formData);
      }
      setProductModalOpen(false);
      router.refresh();
    } finally {
      setIsSubmitting(false); // Σταματάει το loading
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex text-zinc-900 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-950 text-white flex flex-col justify-between p-6 fixed h-full z-10">
        <div>
          <div className="mb-8 border-b border-zinc-800 pb-4">
            <h1 className="text-xl font-bold tracking-tight">
              Johnny Hair Lab
            </h1>
            <p className="text-xs text-zinc-400 mt-1">Control Room v1.0</p>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "services"
                  ? "bg-white text-zinc-950"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Scissors size={18} /> Υπηρεσίες
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "products"
                  ? "bg-white text-zinc-950"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Package size={18} /> Προϊόντα
            </button>
          </nav>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
        >
          <LogOut size={18} /> Αποσύνδεση
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 pl-72 pr-8 py-8 bg-zinc-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-zinc-200 pb-5">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {activeTab === "services"
                  ? "Διαχείριση Υπηρεσιών"
                  : "Διαχείριση Προϊόντων"}
              </h2>

              {/* --- ΤΟ ΝΟΥΜΕΡΟ 2 (ΜΕΤΡΗΤΗΣ) ΜΠΑΙΝΕΙ ΕΔΩ --- */}
              {activeTab === "products" && (
                <p className="text-xs font-medium text-zinc-500 mt-1">
                  Χρήση Remove.bg αυτόν τον μήνα:{" "}
                  <span
                    className={`font-bold ${monthlyUploadsCount >= 50 ? "text-red-500" : "text-zinc-900"}`}
                  >
                    {monthlyUploadsCount} / 50
                  </span>{" "}
                  δωρεάν αφαιρέσεις φόντου.
                </p>
              )}
              {/* ------------------------------------------- */}
            </div>
            <button
              onClick={
                activeTab === "services" ? openNewService : openNewProduct
              }
              className="flex items-center gap-2 bg-zinc-950 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <Plus size={16} />
              {activeTab === "services" ? "Νέα Υπηρεσία" : "Νέο Προϊόν"}
            </button>
          </div>

          {/* TABLE SERVICES */}
          {activeTab === "services" && (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Όνομα (EL/EN)</th>
                    <th className="px-6 py-4">Διάρκεια</th>
                    <th className="px-6 py-4">Τιμή</th>
                    <th className="px-6 py-4 text-right">Ενέργειες</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm">
                  {sortedServices.map((service: any) => (
                    <tr
                      key={service.id}
                      className="hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-zinc-900">
                          {service.name}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {service.nameEn || "-"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-zinc-500">
                        {service.duration}
                      </td>
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        {service.price}
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={async () => {
                            await moveService(service.id, "up");
                            router.refresh();
                          }}
                          className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            await moveService(service.id, "down");
                            router.refresh();
                          }}
                          className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <span className="text-zinc-300">|</span>
                        <button
                          onClick={() => openEditService(service)}
                          className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            await deleteService(service.id);
                            router.refresh();
                          }}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TABLE PRODUCTS */}
          {activeTab === "products" && (
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Προϊόν</th>
                    <th className="px-6 py-4">Κατηγορία</th>
                    <th className="px-6 py-4">Τιμή</th>
                    <th className="px-6 py-4 text-right">Ενέργειες</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm">
                  {sortedProducts.map((product: any) => (
                    <tr
                      key={product.id}
                      className="hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 flex items-center gap-4">
                        <div className="w-10 h-10 bg-zinc-100 rounded-lg p-1 flex items-center justify-center overflow-hidden border border-zinc-200">
                          <img
                            src={product.img || ""}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-zinc-400 max-w-xs truncate">
                            {product.desc}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-zinc-900">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={async () => {
                            await moveProduct(product.id, "up");
                            router.refresh();
                          }}
                          className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            await moveProduct(product.id, "down");
                            router.refresh();
                          }}
                          className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <span className="text-zinc-300">|</span>
                        <button
                          onClick={() => openEditProduct(product)}
                          className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            await deleteProduct(product.id);
                            router.refresh();
                          }}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* MODAL ΥΠΗΡΕΣΙΑΣ */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h3 className="text-xl font-bold text-zinc-900">
                {editingId ? "Επεξεργασία Υπηρεσίας" : "Νέα Υπηρεσία"}
              </h3>
              <button
                onClick={() => setServiceModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-900"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveService} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Όνομα (Ελληνικά) *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.name}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Όνομα (Αγγλικά)
                  </label>
                  <input
                    type="text"
                    value={serviceForm.nameEn}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, nameEn: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Τιμή *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="π.χ. 15 €"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Διάρκεια *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="π.χ. 30 min"
                    value={serviceForm.duration}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        duration: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-5 py-2.5 text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg font-medium transition-colors"
                >
                  Αποθήκευση
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ΠΡΟΪΟΝΤΟΣ */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h3 className="text-xl font-bold text-zinc-900">
                {editingId ? "Επεξεργασία Προϊόντος" : "Νέο Προϊόν"}
              </h3>
              <button
                onClick={() => setProductModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-900"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-6">
              {/* ΓΡΑΜΜΗ 1: ΟΝΟΜΑ & ΤΙΜΗ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Μάρκα / Όνομα *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Τιμή *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="π.χ. 13 €"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                  />
                </div>
              </div>

              {/* ΓΡΑΜΜΗ 2: ΚΑΤΗΓΟΡΙΑ & ΦΩΤΟΓΡΑΦΙΑ (ΜΟΝΟ ΣΤΟ ΝΕΟ) */}
              <div className="grid grid-cols-2 gap-4">
                {/* ΔΥΝΑΜΙΚΗ ΚΑΤΗΓΟΡΙΑ ΜΕ ΕΠΙΛΟΓΗ ΓΙΑ ΝΕΑ */}
                {isNewCategory ? (
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Νέα Κατηγορία *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="π.χ. accessories"
                        value={productForm.category}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsNewCategory(false);
                          setProductForm({
                            ...productForm,
                            category: existingCategories[0] || "care",
                          });
                        }}
                        className="px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-lg text-xs font-semibold"
                      >
                        Λίστα
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Κατηγορία *
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => {
                        if (e.target.value === "__NEW__") {
                          setIsNewCategory(true);
                          setProductForm({ ...productForm, category: "" });
                        } else {
                          setProductForm({
                            ...productForm,
                            category: e.target.value,
                          });
                        }
                      }}
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
                    >
                      {existingCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option
                        value="__NEW__"
                        className="font-bold text-zinc-600"
                      >
                        + Νέα Κατηγορία...
                      </option>
                    </select>
                  </div>
                )}

                {/* FILE UPLOADER & WARNING: Εμφανίζεται ΜΟΝΟ στο νέο προϊόν */}
                {editingId === null && (
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">
                      Φωτογραφία Προϊόντος *
                    </label>
                    <input
                      type="file"
                      required
                      accept="image/*"
                      onChange={(e) =>
                        setProductFile(e.target.files?.[0] || null)
                      }
                      className="w-full px-4 py-1.5 border border-zinc-200 rounded-lg outline-none file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-zinc-950 file:text-white hover:file:bg-zinc-800 cursor-pointer"
                    />

                    {/* ΤΟ ΔΙΑΚΟΠΤΑΚΙ (TOGGLE) */}
                    <div className="mt-3 mb-1 flex items-center gap-2 bg-zinc-50 p-2 rounded border border-zinc-200">
                      <input
                        type="checkbox"
                        id="removeBgToggle"
                        checked={useRemoveBg}
                        onChange={(e) => setUseRemoveBg(e.target.checked)}
                        className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 cursor-pointer"
                      />
                      <label
                        htmlFor="removeBgToggle"
                        className="text-sm font-medium text-zinc-700 cursor-pointer select-none"
                      >
                        Αυτόματη αφαίρεση φόντου (AI)
                      </label>
                    </div>

                    {/* ΤΑ ΕΞΥΠΝΑ ΜΗΝΥΜΑΤΑ */}
                    {useRemoveBg && monthlyUploadsCount >= 50 ? (
                      <p className="text-[11px] text-amber-600 font-medium bg-amber-50 border border-amber-200 rounded p-1.5">
                        ⚠️ Έχεις συμπληρώσει τις 50 δωρεάν αφαιρέσεις. Το προϊόν
                        θα αποθηκευτεί κανονικά, αλλά η φωτογραφία θα
                        εμφανίζεται με το αρχικό της φόντο.
                      </p>
                    ) : useRemoveBg ? (
                      <p className="text-[11px] text-zinc-400">
                        ✨ Το φόντο της φωτογραφίας θα αφαιρεθεί αυτόματα και
                        δωρεάν.
                      </p>
                    ) : (
                      <p className="text-[11px] text-zinc-400">
                        ℹ️ Η φωτογραφία θα ανέβει ακριβώς όπως είναι (με το
                        φόντο της).
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* ΓΡΑΜΜΗ 3 & 4: ΠΕΡΙΓΡΑΦΕΣ (ΕΛΛΗΝΙΚΑ / ΑΓΓΛΙΚΑ) */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Περιγραφή (Ελληνικά) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={productForm.desc}
                  onChange={(e) =>
                    setProductForm({ ...productForm, desc: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Περιγραφή (Αγγλικά)
                </label>
                <textarea
                  rows={2}
                  value={productForm.descEn}
                  onChange={(e) =>
                    setProductForm({ ...productForm, descEn: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none resize-none"
                ></textarea>
              </div>

              {/* ΚΟΥΜΠΙΑ FOOTER */}
              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-5 py-2.5 text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg font-medium transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-white bg-zinc-950 hover:bg-zinc-800 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Γίνεται αποθήκευση..." : "Αποθήκευση"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
