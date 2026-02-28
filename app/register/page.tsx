"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1️⃣ Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Signup error:", error);
      alert(error.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      console.error("No user returned from signup");
      alert("User creation failed. Please try again.");
      setLoading(false);
      return;
    }

    console.log("User created:", data.user);

    // 2️⃣ Insert profile row
    const { error: profileError } = await supabase
      .from("pt_profiles")
      .insert({
        id: data.user.id,
        email: email,
        full_name: fullName,
        role: "client",
      });

    if (profileError) {
      console.log("Profile insert error FULL:", JSON.stringify(profileError, null, 2));
      alert("Account created but profile setup failed.");
      setLoading(false);
      return;
    }

    // 3️⃣ Redirect
    router.push("/my-sessions");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm space-y-4 border p-6 rounded-xl shadow-sm"
      >
        <h1 className="text-xl font-semibold">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

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
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}