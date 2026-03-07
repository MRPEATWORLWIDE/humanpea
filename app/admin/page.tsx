"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

type Client = {
  id: string;
  full_name: string;
  email: string;
};

type Pack = {
  name: string;
  sessions: number;
};

export default function AdminPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [selectedPack, setSelectedPack] = useState("");
  const [deductDate, setDeductDate] = useState("");

  useEffect(() => {
    const init = async () => {
      // 🔎 DEBUG JWT
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("SESSION USER:", sessionData.session?.user);

      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.push("/login");
        return;
      }

      setEmail(userData.user.email || "");

      const { data: profile } = await supabase
        .from("pt_profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      if (!profile || profile.role !== "admin") {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("pt_profiles")
        .select("id, full_name, email")
        .order("full_name", { ascending: true });

      if (data) setClients(data);

      // LOAD PACKS FROM DATABASE
      const { data: packData } = await supabase
        .from("pt_packages")
        .select("name, sessions")
        .eq("active", true)
        .order("created_at", { ascending: true });

      if (packData) setPacks(packData);
    };

    init();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleAddPack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !selectedPack) return;

    const pack = packs.find((p) => p.name === selectedPack);
    if (!pack) return;

    const { error } = await supabase
      .from("pt_session_transactions")
      .insert({
        client_id: selectedClient,
        amount: pack.sessions,
        type: "purchase",
        note: pack.name,
        paid_at: paidDate
          ? new Date(paidDate).toISOString()
          : new Date().toISOString(),
      });

    if (error) return alert(error.message);

    alert("Pack added");
    setSelectedPack("");
    setPaidDate("");
  };

  const handleDeduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    const { error } = await supabase
      .from("pt_session_transactions")
      .insert({
        client_id: selectedClient,
        amount: -1,
        type: "usage",
        note: "Session Used",
        paid_at: deductDate
          ? new Date(deductDate).toISOString()
          : new Date().toISOString(),
      });

    if (error) return alert(error.message);

    alert("Session deducted");
    setDeductDate("");
  };

  return (
    <div className="max-w-xl mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <p className="text-sm text-gray-500">
            Logged in as: {email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="border px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <select
        className="w-full border p-2 rounded"
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <option value="">Select Client</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.full_name} ({c.email})
          </option>
        ))}
      </select>

      <form onSubmit={handleAddPack} className="space-y-4 border p-6 rounded-xl">
        <h2 className="font-semibold">Add Pack</h2>

        <select
          className="w-full border p-2 rounded"
          value={selectedPack}
          onChange={(e) => setSelectedPack(e.target.value)}
        >
          <option value="">Select Pack</option>
          {packs.map((pack) => (
            <option key={pack.name} value={pack.name}>
              {pack.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={paidDate}
          onChange={(e) => setPaidDate(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Add Pack
        </button>
      </form>

      <form onSubmit={handleDeduct} className="space-y-4 border p-6 rounded-xl">
        <h2 className="font-semibold">Deduct Single Session</h2>

        <input
          type="date"
          className="w-full border p-2 rounded"
          value={deductDate}
          onChange={(e) => setDeductDate(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded"
        >
          Deduct 1 Session
        </button>
      </form>
    </div>
  );
}