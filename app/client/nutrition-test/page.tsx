"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function NutritionPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // profile inputs
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState("");
  const [activity, setActivity] = useState("");

  // nutrition inputs
  const [carb, setCarb] = useState("");
  const [sugar, setSugar] = useState("");
  const [lactose, setLactose] = useState("");

  // TEMP result (not saved)
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSubmit = async () => {
    if (!userId) return;

    // save temp to DB (still needed for RPC to work)
    await supabase.from("nutrition_profiles").upsert({
      user_id: userId,
      carb_sensitivity: carb,
      sugar_risk: sugar,
      lactose_tolerance: lactose,
    });

    await supabase.from("client_profiles_extended").upsert({
      user_id: userId,
      height_cm: Number(height),
      weight_kg: Number(weight),
      age: Number(age),
      goal: goal,
      activity_level: activity,
    });

    // run archetype
    await supabase.rpc("assign_archetype", {
      p_user_id: userId,
    });

    // fetch result (TEMP ONLY)
    const { data } = await supabase
      .from("nutrition_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    setResult(data);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Nutrition</h1>

      {/* ALWAYS SHOW FORM */}
      <div className="space-y-6 border p-4 rounded">

        {/* PROFILE */}
        <div>
          <h2 className="font-semibold mb-2">Profile</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="Height (cm)"
              onChange={(e) => setHeight(e.target.value)}
              className="border p-2"
            />
            <input
              placeholder="Weight (kg)"
              onChange={(e) => setWeight(e.target.value)}
              className="border p-2"
            />
            <input
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              className="border p-2"
            />
          </div>
        </div>

        {/* GOALS */}
        <div>
          <h2 className="font-semibold mb-2">Goals</h2>

          <select onChange={(e) => setGoal(e.target.value)}>
            <option value="">Select Goal</option>
            <option value="fat_loss">Fat Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
            <option value="recomp">Recomposition</option>
          </select>

          <select onChange={(e) => setActivity(e.target.value)}>
            <option value="">Activity Level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* NUTRITION */}
        <div>
          <h2 className="font-semibold mb-2">Nutrition Behaviour</h2>

          <p>How do you feel after carbs?</p>
          <select onChange={(e) => setCarb(e.target.value)}>
            <option value="">Select</option>
            <option value="low">Energised</option>
            <option value="moderate">Normal</option>
            <option value="high">Sluggish</option>
          </select>

          <p>Do you crave sugar?</p>
          <select onChange={(e) => setSugar(e.target.value)}>
            <option value="">Select</option>
            <option value="low">Rarely</option>
            <option value="moderate">Sometimes</option>
            <option value="high">Often</option>
          </select>

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

      {/* RESULTS (TEMP DISPLAY) */}
      {result && (
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-2">Your Results</h2>

          <p>Carb Sensitivity: {result.carb_sensitivity}</p>
          <p>Sugar Risk: {result.sugar_risk}</p>
          <p>Lactose: {result.lactose_tolerance}</p>

          <p className="mt-3 font-bold">
            Archetype: {result.archetype}
          </p>
        </div>
      )}
    </div>
  );
}