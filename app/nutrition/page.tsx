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

    await supabase.from("nutrition_inputs").insert({
      user_id: userId,
      ...inputs,
    });

    const { data: assessment } = await supabase
      .from("assessments")
      .insert({ user_id: userId, version: "beta_v1" })
      .select()
      .single();

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
      .from("user_archetype")
      .select("*")
      .eq("assessment_id", assessmentId)
      .single();

    const { data: outputData } = await supabase
      .from("nutrition_outputs")
      .select("*")
      .eq("assessment_id", assessmentId)
      .single();

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

      {/* STEP 1 */}
      <div className="border p-4 space-y-4">
        <h2 className="font-semibold">Step 1: Your Details</h2>

        <input placeholder="Weight (kg)" type="number"
          onChange={(e) => setInputs({ ...inputs, weight: Number(e.target.value) })}
          className="border p-2 w-full"
        />

        <input placeholder="Height (cm)" type="number"
          onChange={(e) => setInputs({ ...inputs, height: Number(e.target.value) })}
          className="border p-2 w-full"
        />

        <input placeholder="Age" type="number"
          onChange={(e) => setInputs({ ...inputs, age: Number(e.target.value) })}
          className="border p-2 w-full"
        />

        <div>
          <label>Gender</label>
          <select onChange={(e) => setInputs({ ...inputs, sex: e.target.value })}
            className="border p-2 w-full">
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
      </div>

      {/* STEP 2 */}
      <div>
        <h2 className="font-semibold">Step 2: Behaviour Assessment</h2>

        {questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <p>{q.text}</p>
            <div className="flex gap-2">
              {[1,2,3,4,5,6,7].map((num) => (
                <button
                  key={num}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: num }))}
                  className={`px-3 py-1 border ${
                    answers[q.id] === num ? "bg-black text-white" : ""
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded">
        Generate Plan
      </button>

      {plan && (
        <div className="border p-4 mt-4">
          <h2 className="font-semibold">Recommended Plan</h2>
          <p>{plan.title}</p>
          <p>£{plan.price}</p>

          <button className="mt-3 bg-black text-white px-4 py-2 rounded">
            Unlock Plan
          </button>

          {/* 🔥 FIXED BLOCK */}
          <div className="mt-4">
            <h3 className="font-semibold">Preview (Day 1)</h3>

            {meals.length > 0 ? (
              meals.map((meal) => (
                <div key={meal.id} className="mt-2">
                  <p className="font-semibold">{meal.meal_name}</p>
                  <p>{meal.food_items}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No preview available</p>
            )}

            <button className="mt-3 bg-black text-white px-4 py-2 rounded">
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
}