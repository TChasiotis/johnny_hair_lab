"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // <-- Προστέθηκαν τα εικονίδια

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // --- ΝΕΑ STATES ---
  const [isLoading, setIsLoading] = useState(false); // Για το φόρτωμα
  const [showPassword, setShowPassword] = useState(false); // Για το ματάκι

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Καθαρίζουμε παλιά σφάλματα
    setIsLoading(true); // Ξεκινάει το loading με το που πατήσεις το κουμπί

    // Καλούμε το NextAuth για να μας συνδέσει
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false, // Το βάζουμε false για να χειριστούμε εμείς το τι θα γίνει μετά
    });

    if (res?.error) {
      // Αν ο κωδικός είναι λάθος, σταματάμε το loading και δείχνουμε το σφάλμα
      setError(res.error);
      setIsLoading(false);
    } else {
      // Αν πετύχει, ΠΑΡΑΜΕΝΕΙ το loading (ώστε να μην αναβοσβήσει το κουμπί) μέχρι να αλλάξει η σελίδα
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-zinc-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-zinc-900">Admin Login</h1>
          <p className="text-zinc-500 mt-2">
            Σύστημα Διαχείρισης Johnny Hair Lab
          </p>
        </div>

        {/* Εδώ εμφανίζεται το κόκκινο μήνυμα αν γίνει λάθος */}
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-900 transition-shadow disabled:bg-zinc-50 disabled:text-zinc-400"
              required
              disabled={isLoading} // Κλειδώνει όσο φορτώνει
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Password
            </label>
            {/* Wrapper για να μπει το ματάκι μέσα στο input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-900 transition-shadow disabled:bg-zinc-50 disabled:text-zinc-400"
                required
                disabled={isLoading} // Κλειδώνει όσο φορτώνει
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-zinc-950 text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Σύνδεση...
              </>
            ) : (
              "Είσοδος"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
