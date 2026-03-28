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
  const [output, setOutput] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [plan, setPlan] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const [inputs, setInputs] = useState({
    weight: 0,
    height: 0,
    age: 0,
    sex: "M",
    goal: "muscle_gain",
    goal_weight: 0,
    activity_level: "light",
    training_days: 0,
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id);
    });
  }, []);

  const mapLikert = (value) => (value - 4) * 2;

  const handleSubscribe = async () => {
    const priceId = plan?.stripe_product_id;
    if (!priceId) {
      alert("No Stripe price linked to this plan");
      return;
    }

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
        alert("Checkout failed: " + (data.error || "Unknown error"));
        setIsSubscribing(false);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
      setIsSubscribing(false);
    }
  };

  const handleSubmit = async () => {
    if (!userId) return;
    if (!inputs.weight || !inputs.height || !inputs.age) {
      alert("Please complete your details");
      return;
    }
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions");
      return;
    }

    await supabase.from("nutrition_inputs").insert({ user_id: userId, ...inputs });

    const { data: assessment } = await supabase
      .from("assessments")
      .insert({ user_id: userId, version: "beta_v1" })
      .select().single();

    const assessmentId = assessment.id;
    const responseRows = questions.map((q) => ({
      assessment_id: assessmentId,
      user_id: userId,
      question_key: q.id,
      variable: q.variable,
      value: mapLikert(answers[q.id]),
    }));

    await supabase.from("nutrition_responses").insert(responseRows);
    await supabase.rpc("calculate_user_scores", { p_assessment_id: assessmentId });
    await supabase.rpc("assign_archetype_v3", { p_assessment_id: assessmentId });
    await supabase.rpc("generate_nutrition_output", { p_assessment_id: assessmentId });

    const { data: identityData } = await supabase
      .from("user_archetype").select("*").eq("assessment_id", assessmentId).single();

    const { data: outputData } = await supabase
      .from("nutrition_outputs").select("*").eq("assessment_id", assessmentId).single();

    if (outputData) {
      const { data: planData } = await supabase
        .from("nutrition_plans")
        .select("*")
        .eq("calorie_band", outputData.calorie_band)
        .eq("structure_type", outputData.structure_type)
        .maybeSingle();

      setPlan(planData);

      if (planData) {
        const { data: mealsData } = await supabase
          .from("nutrition_plan_meals")
          .select("*")
          .eq("plan_id", planData.id)
          .eq("day", 1)
          .in("meal_number", [1, 2])
          .order("meal_number", { ascending: true });

        setMeals(mealsData || []);
      }
    }

    setIdentity(identityData);
    setOutput(outputData);
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Nutrition Assessment</h1>

      {/* STEP 1: Details */}
      <div className="border p-4 space-y-4">
        <h2 className="font-semibold text-lg">Step 1: Your Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Weight (kg)" type="number"
            onChange={(e) => setInputs({ ...inputs, weight: Number(e.target.value) })}
            className="border p-2 rounded"
          />
          <input placeholder="Height (cm)" type="number"
            onChange={(e) => setInputs({ ...inputs, height: Number(e.target.value) })}
            className="border p-2 rounded"
          />
        </div>
        <input placeholder="Age" type="number"
          onChange={(e) => setInputs({ ...inputs, age: Number(e.target.value) })}
          className="border p-2 w-full rounded"
        />
        <div>
          <label className="text-sm text-gray-500">Gender</label>
          <select onChange={(e) => setInputs({ ...inputs, sex: e.target.value })}
            className="border p-2 w-full rounded bg-white">
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      {/* STEP 2: Assessment */}
      <div>
        <h2 className="font-semibold text-lg">Step 2: Behaviour Assessment</h2>
        {questions.map((q) => (
          <div key={q.id} className="mt-6">
            <p className="text-sm font-medium mb-2">{q.text}</p>
            <div className="flex justify-between">
              {[1,2,3,4,5,6,7].map((num) => (
                <button key={num}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: num }))}
                  className={`w-10 h-10 border rounded transition ${
                    answers[q.id] === num ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="w-full bg-black text-white py-3 rounded-lg font-bold">
        Generate My Profile
      </button>

      {/* RESULTS DISPLAY */}
      {identity && (
        <div className="mt-8 space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="font-bold text-blue-900">Your Result: {identity.archetype_code}</h2>
            <p className="text-sm text-blue-800 mt-1">
              {archetypeDescriptions[identity.archetype_code]}
            </p>
          </div>

          {plan && (
            <div className="border p-6 rounded-xl bg-white shadow-sm border-gray-200">
              <h2 className="font-semibold text-gray-500 text-sm uppercase tracking-wider">Recommended Plan</h2>
              <p className="text-2xl font-bold mt-1">{plan.title}</p>
              <p className="text-xl text-green-600 font-semibold">£{plan.price}</p>

              <div className="mt-6">
                <h3 className="font-bold text-sm">Preview (Day 1)</h3>
                <div className="space-y-2 mt-2">
                  {meals.map((meal) => (
                    <div key={meal.id} className="p-3 bg-gray-50 rounded border border-gray-100">
                      <p className="font-bold text-xs uppercase text-gray-500">{meal.meal_name}</p>
                      <p className="text-sm mt-1">{meal.food_items}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSubscribe} 
                disabled={isSubscribing}
                className={`mt-8 w-full py-4 rounded-xl font-bold text-white transition ${
                  isSubscribing ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"
                }`}
              >
                {isSubscribing ? "Setting up checkout..." : "Subscribe & Unlock Full Plan"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}