"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("LOGIN RESULT:", data, error);

    if (error || !data.user) {
      alert("Login failed");
      return;
    }

    const userId = data.user.id;

    const { data: profile, error: profileError } = await supabase
      .from("pt_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    console.log("PROFILE RESULT:", profile, profileError);

    if (profile?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/my-sessions");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}