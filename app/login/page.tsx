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

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        alert(authError.message);
        return;
      }

      const userId = authData.user?.id;
      if (!userId) {
        alert("Login failed: no user returned.");
        return;
      }

      // IMPORTANT: look up role by ID (not by email) so it's always exact.
      const { data: profile, error: profileError } = await supabase
        .from("pt_profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Profile lookup error:", profileError);
        alert("Profile not found");
        return;
      }

      if (profile?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/my-sessions");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-white px-5">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 border border-black/10 p-6 rounded-xl shadow-sm"
      >
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="text-sm text-black/60">
            Access your sessions and account.
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-black/15 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-black/15 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-black/50">
          Don’t have an account? Use your direct registration link.
        </p>
      </form>
    </div>
  );
}