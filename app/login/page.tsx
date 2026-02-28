"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error || !data.user) {
      // if they can't login, send them to create account
      router.push("/register");
      return;
    }

    const userId = data.user.id;

    // ✅ Fetch profile by AUTH USER ID (not email)
    const { data: profile, error: profileError } = await supabase
      .from("pt_profiles")
      .select("role, email, full_name")
      .eq("id", userId)
      .maybeSingle();

    // If profile missing, auto-create a minimal one (client by default)
    if (!profile && !profileError) {
      await supabase.from("pt_profiles").insert({
        id: userId,
        email: data.user.email,
        full_name: null,
        role: "client",
      });
    }

    const role = profile?.role || "client";

    router.push(role === "admin" ? "/admin" : "/my-sessions");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 border p-6 rounded-xl shadow-sm"
      >
        <h1 className="text-xl font-semibold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}