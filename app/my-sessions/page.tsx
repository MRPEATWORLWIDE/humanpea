"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

type Transaction = {
  id: string;
  amount: number;
  type: string;
  note: string;
  created_at: string;
  paid_at: string | null;
};

export default function MySessionsPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.push("/login");
        return;
      }

      setEmail(userData.user.email || "");

      const userId = userData.user.id;

      const { data, error } = await supabase
        .from("pt_session_transactions")
        .select("*")
        .eq("client_id", userId)
        .order("paid_at", { ascending: false });

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setTransactions(data || []);

      const total = (data || []).reduce(
        (sum, tx) => sum + tx.amount,
        0
      );

      setSessions(total);
      setLoading(false);
    };

    loadData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">My Sessions</h1>
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

      <div className="mb-8 p-6 border rounded-xl">
        <p className="text-lg">Sessions Remaining:</p>
        <p className="text-3xl font-bold">{sessions}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Session History</h2>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="p-4 border rounded-lg flex justify-between"
          >
            <div>
              <p className="font-medium">{tx.note}</p>
              <p className="text-sm text-gray-500">
                {new Date(tx.paid_at || tx.created_at).toLocaleDateString()}
              </p>
            </div>
            <div
              className={
                tx.amount > 0 ? "text-green-600" : "text-red-600"
              }
            >
              {tx.amount > 0 ? `+${tx.amount}` : tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}