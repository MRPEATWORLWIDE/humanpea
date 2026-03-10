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

const ADMIN_EMAILS = ["hello@humanpea.com", "humanpeauk@gmail.com"];

export default function AdminPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [paidDate, setPaidDate] = useState("");
  const [selectedPack, setSelectedPack] = useState("");
  const [deductDate, setDeductDate] = useState("");

  // separate notes
  const [packNote, setPackNote] = useState("");
  const [sessionNote, setSessionNote] = useState("");

  useEffect(() => {
    const init = async () => {
      console.log("---- ADMIN INIT START ----");

      const { data: userData, error: userError } = await supabase.auth.getUser();
      console.log("getUser result:", userData);
      console.log("getUser error:", userError);

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log("getSession result:", sessionData);
      console.log("getSession error:", sessionError);

      if (!userData?.user) {
        window.location.href = "/login";
        return;
      }

      const userEmail = (userData.user.email || "").toLowerCase();
      setEmail(userEmail);

      if (!ADMIN_EMAILS.includes(userEmail)) {
        window.location.href = "/login";
        return;
      }

      const { data: clientData } = await supabase
        .from("pt_profiles")
        .select("id, full_name, email")
        .order("full_name", { ascending: true });

      if (clientData) setClients(clientData);

      const { data: packData } = await supabase
        .from("pt_packages")
        .select("name, sessions")
        .eq("active", true)
        .order("created_at", { ascending: true });

      if (packData) setPacks(packData);

      console.log("---- ADMIN INIT END ----");
    };

    init();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
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
        note: packNote || pack.name,
        paid_at: paidDate
          ? new Date(paidDate).toISOString()
          : new Date().toISOString(),
      });

    if (error) {
      console.error(error);
      return alert(error.message);
    }

    alert("Pack added");
    setSelectedPack("");
    setPaidDate("");
    setPackNote("");
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
        note: sessionNote || "Session Used",
        paid_at: deductDate
          ? new Date(deductDate).toISOString()
          : new Date().toISOString(),
      });

    if (error) {
      console.error(error);
      return alert(error.message);
    }

    alert("Session deducted");
    setDeductDate("");
    setSessionNote("");
  };

  return (
    <div className="max-w-xl mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <p className="text-sm text-gray-500">Logged in as: {email}</p>
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

        <input
          type="text"
          placeholder="Pack note"
          className="w-full border p-2 rounded"
          value={packNote}
          onChange={(e) => setPackNote(e.target.value)}
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

        <input
          type="text"
          placeholder="Session note"
          className="w-full border p-2 rounded"
          value={sessionNote}
          onChange={(e) => setSessionNote(e.target.value)}
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