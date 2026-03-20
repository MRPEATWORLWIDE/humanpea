"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function NutritionPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [nutrition, setNutrition] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // form state
  const [carb, setCarb] = useState("");
  const [sugar, setSugar] = useState("");
  const [lactose, setLactose] = useState("");

  // get user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
    };
    getUser();
  }, []);

  // fetch nutrition
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      const { data } = await supabase
        .from("nutrition_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      setNutrition(data);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  // submit form
  const handleSubmit = async () => {
    if (!userId) return;

    // insert or update
    await supabase.from("nutrition_profiles").upsert({
      user_id: userId,
      carb_sensitivity: carb,
      sugar_risk: sugar,
      lactose_tolerance: lactose,
    });

    // assign archetype
    await supabase.rpc("assign_archetype", {
      p_user_id: userId,
    });

    // refetch
    const { data } = await supabase
      .from("nutrition_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    setNutrition(data);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Nutrition</h1>

      {!nutrition ? (
        // ================= FORM =================
        <div className="space-y-4 border p-4 rounded">
          <h2 className="font-semibold">Add Nutrition</h2>

          <div>
            <p>How do you feel after carbs?</p>
            <select onChange={(e) => setCarb(e.target.value)}>
              <option value="">Select</option>
              <option value="low">Energised</option>
              <option value="moderate">Normal</option>
              <option value="high">Sluggish</option>
            </select>
          </div>

          <div>
            <p>Do you crave sugar?</p>
            <select onChange={(e) => setSugar(e.target.value)}>
              <option value="">Select</option>
              <option value="low">Rarely</option>
              <option value="moderate">Sometimes</option>
              <option value="high">Often</option>
            </select>
          </div>

          <div>
            <p>Dairy tolerance?</p>
            <select onChange={(e) => setLactose(e.target.value)}>
              <option value="">Select</option>
              <option value="tolerant">No issues</option>
              <option value="low">Some discomfort</option>
              <option value="intolerant">Bloating</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Generate Plan
          </button>
        </div>
      ) : (
        // ================= RESULTS =================
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Your Results</h2>

          <p>Carb Sensitivity: {nutrition.carb_sensitivity}</p>
          <p>Sugar Risk: {nutrition.sugar_risk}</p>
          <p>Lactose: {nutrition.lactose_tolerance}</p>

          <p className="mt-3 font-bold">
            Archetype: {nutrition.archetype}
          </p>
        </div>
      )}
    </div>
  );
}