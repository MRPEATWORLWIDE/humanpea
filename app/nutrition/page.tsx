"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const questions = [
  { id: "q1", text: "My energy levels remain stable throughout the day", variable: "ES" },
  { id: "q2", text: "I experience energy crashes during the day", variable: "ES" },
  { id: "q3", text: "I feel energised after eating carbs", variable: "CH" },
  { id: "q4", text: "Carbs make me feel sluggish", variable: "CH" },
  { id: "q5", text: "I feel in control of my eating", variable: "AR" },
  { id: "q6", text: "I struggle with cravings", variable: "AR" },
  { id: "q7", text: "I can go hours without thinking about food", variable: "AR" },
  { id: "q8", text: "Stress does not affect my eating", variable: "SS" },
  { id: "q9", text: "I eat more when stressed", variable: "SS" },
];

const archetypeDescriptions = {
  RFU: "Your system struggles with carbohydrate regulation, leading to energy crashes and reactive hunger.",
  AE: "You are metabolically flexible and can handle a wide range of foods with stable energy output.",
  EP: "Your body stores energy efficiently, meaning fat loss requires tighter structure and consistency.",
  CR: "Your nutrition is heavily influenced by stress, requiring structure and stability.",
  MF: "You tend to under-eat relative to your needs, which impacts recovery and performance.",
  OD: "You have high output demands and require consistent fuelling to maintain performance.",
};

export default function NutritionPage() {
  const [userId, setUserId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [identity, setIdentity] = useState(null);
  const [plan, setPlan] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const [inputs, setInputs] = useState({
    weight: 0, height: 0, age: 0, sex: "M",
    goal: "muscle_gain", goal_weight: 0,
    activity_level: "light", training_days: 0,
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id);
    });
  }, []);

  const mapLikert = (value) => (value - 4) * 2;

  const handleSubscribe = async () => {
    const priceId = plan?.stripe_product_id;
    if (!priceId) { alert("No Stripe price linked to this plan"); return; }
    setIsSubscribing(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, userId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(`Stripe Error: ${data.error}. Check your Vercel Environment Variables.`);
        setIsSubscribing(false);
      }
    } catch (err) {
      alert("Connection error. Try again.");
      setIsSubscribing(false);
    }
  };

  const handleSubmit = async () => {
    if (!userId) { alert("Please login first"); return; }
    if (!inputs.weight || !inputs.height || !inputs.age) { alert("Please complete Step 1"); return; }
    if (Object.keys(answers).length !== questions.length) { alert("Please answer all questions in Step 2"); return; }

    setIsCalculating(true);

    try {
      await supabase.from("nutrition_inputs").insert({ user_id: userId, ...inputs });
      const { data: assessment } = await supabase.from("assessments").insert({ user_id: userId, version: "beta_v1" }).select().single();
      
      const responseRows = questions.map((q) => ({
        assessment_id: assessment.id, user_id: userId, question_key: q.id, variable: q.variable, value: mapLikert(answers[q.id]),
      }));

      await supabase.from("nutrition_responses").insert(responseRows);
      
      // Run Calculations
      await supabase.rpc("calculate_user_scores", { p_assessment_id: assessment.id });
      await supabase.rpc("assign_archetype_v3", { p_assessment_id: assessment.id });
      await supabase.rpc("generate_nutrition_output", { p_assessment_id: assessment.id });

      // Retry Logic: Wait for DB to catch up
      let attempts = 0;
      let identityData = null;
      let outputData = null;

      while (attempts < 3 && !identityData) {
        await new Promise(r => setTimeout(r, 1000)); // Wait 1 second
        const { data: idD } = await supabase.from("user_archetype").select("*").eq("assessment_id", assessment.id).maybeSingle();
        const { data: outD } = await supabase.from("nutrition_outputs").select("*").eq("assessment_id", assessment.id).maybeSingle();
        identityData = idD;
        outputData = outD;
        attempts++;
      }

      if (outputData) {
        const { data: planData } = await supabase.from("nutrition_plans")
          .select("*").eq("calorie_band", outputData.calorie_band).eq("structure_type", outputData.structure_type).maybeSingle();

        setPlan(planData);
        if (planData) {
          const { data: mealsData } = await supabase.from("nutrition_plan_meals")
            .select("*").eq("plan_id", planData.id).eq("day", 1).in("meal_number", [1, 2]).order("meal_number", { ascending: true });
          setMeals(mealsData || []);
        }
      }
      setIdentity(identityData);
    } catch (e) {
      alert("Calculation timed out. Please refresh and try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Nutrition Assessment</h1>

      <div className="border p-4 space-y-4 rounded-lg bg-white">
        <h2 className="font-semibold text-lg border-b pb-2">Step 1: Your Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Weight (kg)" type="number" onChange={(e) => setInputs({ ...inputs, weight: Number(e.target.value) })} className="border p-2 rounded" />
          <input placeholder="Height (cm)" type="number" onChange={(e) => setInputs({ ...inputs, height: Number(e.target.value) })} className="border p-2 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Age" type="number" onChange={(e) => setInputs({ ...inputs, age: Number(e.target.value) })} className="border p-2 rounded" />
          <input placeholder="Goal Weight (kg)" type="number" onChange={(e) => setInputs({ ...inputs, goal_weight: Number(e.target.value) })} className="border p-2 rounded" />
        </div>
        <div className="grid grid-cols-1 gap-4">
            <select onChange={(e) => setInputs({ ...inputs, sex: e.target.value })} className="border p-2 rounded bg-white">
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            <select onChange={(e) => setInputs({ ...inputs, goal: e.target.value })} className="border p-2 rounded bg-white">
                <option value="fat_loss">Fat Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
            </select>
            <select onChange={(e) => setInputs({ ...inputs, activity_level: e.target.value })} className="border p-2 rounded bg-white">
                <option value="sedentary">Sedentary</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="very_active">Very Active</option>
            </select>
            <input placeholder="Training Days (0-7)" type="number" onChange={(e) => setInputs({ ...inputs, training_days: Number(e.target.value) })} className="border p-2 rounded" />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-semibold text-lg">Step 2: Behaviour Assessment</h2>
        {questions.map((q) => (
          <div key={q.id} className="p-4 border rounded-lg bg-white">
            <p className="text-sm font-medium mb-3">{q.text}</p>
            <div className="flex justify-between">
              {[1,2,3,4,5,6,7].map((num) => (
                <button key={num} onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: num }))}
                  className={`w-10 h-10 border rounded-full transition ${answers[q.id] === num ? "bg-black text-white" : "bg-gray-50"}`}>
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={isCalculating} className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg disabled:bg-gray-400">
        {isCalculating ? "Calculating Your Archetype..." : "Generate My Plan"}
      </button>

      {identity && (
        <div className="mt-8 space-y-6 animate-in fade-in duration-500">
          <div className="p-6 bg-blue-600 text-white rounded-xl shadow-lg">
            <h2 className="text-sm uppercase tracking-widest opacity-80">Your Archetype</h2>
            <p className="text-3xl font-black">{identity.archetype_code}</p>
            <p className="mt-3 text-sm leading-relaxed opacity-90">
                {archetypeDescriptions[identity.archetype_code] || "Analysis complete. View your plan below."}
            </p>
          </div>

          {plan && (
            <div className="border p-6 rounded-xl bg-white shadow-xl border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recommended Plan</p>
              <h2 className="text-2xl font-black mt-1 uppercase italic">{plan.title.replace(/_/g, ' ')}</h2>
              <p className="text-2xl text-green-600 font-black mt-1">£{plan.price}</p>

              <div className="mt-6 space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase">Day 1 Preview</p>
                {meals.map((meal) => (
                  <div key={meal.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="font-black text-[10px] text-gray-400 uppercase">{meal.meal_name}</p>
                    <p className="text-sm font-medium text-gray-800">{meal.food_items}</p>
                  </div>
                ))}
              </div>

              <button onClick={handleSubscribe} disabled={isSubscribing}
                className="mt-8 w-full py-4 bg-black text-white rounded-xl font-black uppercase tracking-tighter hover:scale-[1.02] transition-transform disabled:bg-gray-400">
                {isSubscribing ? "Opening Secure Checkout..." : "Unlock Full 12-Week Plan"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}