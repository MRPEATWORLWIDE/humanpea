"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setSessionReady(true);
      }

      setLoading(false);
    };

    checkSession();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert("Error updating password.");
      return;
    }

    alert("Password updated successfully.");
    router.push("/login");
  };

  if (loading) return <div className="p-8">Loading...</div>;

  if (!sessionReady)
    return (
      <div className="p-8 text-center">
        Invalid or expired reset link.
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleUpdatePassword}
        className="w-full max-w-sm space-y-4 border p-6 rounded-xl shadow-sm"
      >
        <h1 className="text-xl font-semibold">Set New Password</h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}