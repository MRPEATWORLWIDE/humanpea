"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function NutritionTestPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [nutrition, setNutrition] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Get logged in user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      }
    };
    getUser();
  }, []);

  // 2. Fetch data
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);

      const { data: profileData } = await supabase
        .from("client_profiles_extended")
        .select("*")
        .eq("user_id", userId)
        .single();

      const { data: nutritionData } = await supabase
        .from("nutrition_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      setProfile(profileData);
      setNutrition(nutritionData);
      setLoading(false);
    };

    fetchData();
  }, [userId]);

  // 3. Assign archetype
  const assignArchetype = async () => {
    if (!userId) return;

    await supabase.rpc("assign_archetype", {
      p_user_id: userId,
    });

    // refresh
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

      <h1 className="text-2xl font-bold">Nutrition Test</h1>

      {/* PROFILE */}
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Profile</h2>
        <p>Height: {profile?.height_cm} cm</p>
        <p>Weight: {profile?.weight_kg} kg</p>
        <p>BMI: {profile?.bmi}</p>
        <p>Goal: {profile?.goal}</p>
      </div>

      {/* NUTRITION */}
      <div className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Nutrition Insights</h2>
        <p>Carb Sensitivity: {nutrition?.carb_sensitivity}</p>
        <p>Sugar Risk: {nutrition?.sugar_risk}</p>
        <p>Lactose: {nutrition?.lactose_tolerance}</p>
        <p>Iron Priority: {nutrition?.iron_priority}</p>
        <p className="mt-2 font-bold">
          Archetype: {nutrition?.archetype || "Not Assigned"}
        </p>
      </div>

      {/* ACTION */}
      <button
        onClick={assignArchetype}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Assign Archetype
      </button>

    </div>
  );
}