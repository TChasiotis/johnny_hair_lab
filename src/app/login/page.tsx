"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Καθαρίζουμε παλιά σφάλματα

    // Καλούμε το NextAuth για να μας συνδέσει
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false, // Το βάζουμε false για να χειριστούμε εμείς το τι θα γίνει μετά
    });

    if (res?.error) {
      // Αν ο κωδικός είναι λάθος, το NextAuth θα μας επιστρέψει το μήνυμα σφάλματος
      setError(res.error);
    } else {
      // Αν πετύχει η σύνδεση, πάμε στο (μελλοντικό) Admin Dashboard!
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
              className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-900 transition-shadow"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-900 transition-shadow"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-950 text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
          >
            Είσοδος
          </button>
        </form>
      </div>
    </div>
  );
}
