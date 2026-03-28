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

export default function NutritionPage() {
  const [userId, setUserId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [identity, setIdentity] = useState(null);
  const [output, setOutput] = useState(null);
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
        alert(`Checkout Error: ${data.error}`);
        setIsSubscribing(false);
      }
    } catch (err) {
      alert("Checkout failed. Please check your connection.");
      setIsSubscribing(false);
    }
  };

  const handleSubmit = async () => {
    if (!userId) { alert("Please login first"); return; }
    setIsCalculating(true);

    try {
      await supabase.from("nutrition_inputs").insert({ user_id: userId, ...inputs });
      const { data: assessment } = await supabase.from("assessments").insert({ user_id: userId, version: "beta_v1" }).select().single();
      
      const responseRows = questions.map((q) => ({
        assessment_id: assessment.id, user_id: userId, question_key: q.id, variable: q.variable, value: mapLikert(answers[q.id]),
      }));

      await supabase.from("nutrition_responses").insert(responseRows);
      
      await supabase.rpc("calculate_user_scores", { p_assessment_id: assessment.id });
      await supabase.rpc("assign_archetype_v3", { p_assessment_id: assessment.id });
      await supabase.rpc("generate_nutrition_output", { p_assessment_id: assessment.id });

      // Fetch Results with Retry
      let attempts = 0;
      let idD = null;
      let outD = null;

      while (attempts < 3 && !idD) {
        await new Promise(r => setTimeout(r, 1200));
        const { data: i } = await supabase.from("user_archetype").select("*").eq("assessment_id", assessment.id).maybeSingle();
        const { data: o } = await supabase.from("nutrition_outputs").select("*").eq("assessment_id", assessment.id).maybeSingle();
        idD = i;
        outD = o;
        attempts++;
      }

      setIdentity(idD);
      setOutput(outD);

      if (outD) {
        const { data: planData } = await supabase.from("nutrition_plans")
          .select("*").eq("calorie_band", outD.calorie_band).eq("structure_type", outD.structure_type).maybeSingle();

        setPlan(planData);
        if (planData) {
          const { data: mD } = await supabase.from("nutrition_plan_meals")
            .select("*").eq("plan_id", planData.id).eq("day", 1).in("meal_number", [1, 2]).order("meal_number", { ascending: true });
          setMeals(mD || []);
        }
      }
    } catch (e) {
      alert("Error generating output.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-black italic uppercase tracking-tighter">Nutrition Assessment</h1>

      {/* STEP 1 */}
      <div className="border p-6 space-y-4 rounded-2xl bg-white shadow-sm">
        <h2 className="font-bold text-lg uppercase tracking-tight border-b pb-2">1. Physical Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Weight (kg)" type="number" onChange={(e) => setInputs({ ...inputs, weight: Number(e.target.value) })} className="border p-3 rounded-xl bg-gray-50" />
          <input placeholder="Height (cm)" type="number" onChange={(e) => setInputs({ ...inputs, height: Number(e.target.value) })} className="border p-3 rounded-xl bg-gray-50" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Age" type="number" onChange={(e) => setInputs({ ...inputs, age: Number(e.target.value) })} className="border p-3 rounded-xl bg-gray-50" />
          <input placeholder="Goal Weight (kg)" type="number" onChange={(e) => setInputs({ ...inputs, goal_weight: Number(e.target.value) })} className="border p-3 rounded-xl bg-gray-50" />
        </div>
        <select onChange={(e) => setInputs({ ...inputs, sex: e.target.value })} className="border p-3 w-full rounded-xl bg-gray-50">
            <option value="M">Male</option>
            <option value="F">Female</option>
        </select>
        <select onChange={(e) => setInputs({ ...inputs, goal: e.target.value })} className="border p-3 w-full rounded-xl bg-gray-50">
            <option value="fat_loss">Fat Loss</option>
            <option value="muscle_gain">Muscle Gain</option>
        </select>
        <select onChange={(e) => setInputs({ ...inputs, activity_level: e.target.value })} className="border p-3 w-full rounded-xl bg-gray-50">
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="very_active">Very Active</option>
        </select>
        <input placeholder="Training Days (0-7)" type="number" onChange={(e) => setInputs({ ...inputs, training_days: Number(e.target.value) })} className="border p-3 w-full rounded-xl bg-gray-50" />
      </div>

      {/* STEP 2 */}
      <div className="space-y-4">
        <h2 className="font-bold text-lg uppercase tracking-tight">2. Behaviour</h2>
        {questions.map((q) => (
          <div key={q.id} className="p-4 border rounded-2xl bg-white shadow-sm">
            <p className="text-sm font-bold mb-4">{q.text}</p>
            <div className="flex justify-between">
              {[1,2,3,4,5,6,7].map((num) => (
                <button key={num} onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: num }))}
                  className={`w-10 h-10 border rounded-full font-bold transition-all ${answers[q.id] === num ? "bg-black text-white scale-110" : "bg-gray-100 text-gray-400"}`}>
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} disabled={isCalculating} className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest disabled:bg-gray-400 shadow-xl">
        {isCalculating ? "Calculating..." : "Generate My Nutrition Plan"}
      </button>

      {/* RESULTS BLOCK */}
      {identity && output && (
        <div className="mt-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* ARCHETYPE DISPLAY */}
          <div className="p-6 bg-black text-white rounded-3xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Result Identification</p>
            <h2 className="text-4xl font-black italic uppercase">{identity.archetype}-{identity.variant}</h2>
            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-bold uppercase">
                <div className="bg-white/10 p-2 rounded">Type: {identity.type}</div>
                <div className="bg-white/10 p-2 rounded">Arch: {identity.archetype}</div>
                <div className="bg-white/10 p-2 rounded">Var: {identity.variant}</div>
            </div>
          </div>

          {/* NUTRITION OUTPUTS */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Target Calories</p>
                <p className="text-2xl font-black">{output.target_calories} kcal</p>
            </div>
            <div className="p-4 bg-white border rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Protein</p>
                <p className="text-2xl font-black">{output.protein}g</p>
            </div>
            <div className="p-4 bg-white border rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Carbs</p>
                <p className="text-2xl font-black">{output.carbs}g</p>
            </div>
            <div className="p-4 bg-white border rounded-2xl shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Fats</p>
                <p className="text-2xl font-black">{output.fats}g</p>
            </div>
          </div>

          {/* PLAN BLOCK */}
          {plan && (
            <div className="border-4 border-black p-8 rounded-3xl bg-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 text-[10px] font-black uppercase">Recommended</div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Recommended Plan</p>
              <h2 className="text-3xl font-black mt-2 uppercase italic leading-none">{plan.title.replace(/_/g, ' ')}</h2>
              <p className="text-3xl text-green-600 font-black mt-2">£{plan.price}</p>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between border-b pb-2 text-sm">
                    <span className="font-bold text-gray-400 uppercase">Diet Route</span>
                    <span className="font-black italic uppercase">{output.diet_route}</span>
                </div>
                <div className="flex justify-between border-b pb-2 text-sm">
                    <span className="font-bold text-gray-400 uppercase">Structure</span>
                    <span className="font-black italic uppercase">{output.meal_structure}</span>
                </div>
              </div>

              {/* MEAL PREVIEW */}
              <div className="mt-8 space-y-3">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Day 1 Preview</p>
                {meals.length > 0 ? (
                    meals.map((meal) => (
                    <div key={meal.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="font-black text-[10px] text-gray-400 uppercase tracking-tighter">{meal.meal_name}</p>
                        <p className="text-sm font-bold text-gray-900 mt-1 uppercase leading-tight">{meal.food_items}</p>
                    </div>
                    ))
                ) : (
                    <p className="text-xs text-gray-400 italic">Plan preview loading...</p>
                )}
              </div>

              <button onClick={handleSubscribe} disabled={isSubscribing}
                className="mt-10 w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 transition-all shadow-xl active:scale-95 disabled:bg-gray-400">
                {isSubscribing ? "Securing Checkout..." : "Unlock Full 12-Week Plan"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}