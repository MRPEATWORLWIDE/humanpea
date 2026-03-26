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
  const [plan, setPlan] = useState(null); // ✅ added

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

    // ✅ PLAN MATCHING
    if (outputData) {
      const { data: planData } = await supabase
        .from("nutrition_plans")
        .select("*")
        .eq("calorie_band", outputData.calorie_band)
        .eq("structure_type", outputData.structure_type)
        .maybeSingle();

      setPlan(planData);
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
          onChange={(e) => setInputs({...inputs, weight: Number(e.target.value)})}
          className="border p-2 w-full"
        />

        <input placeholder="Height (cm)" type="number"
          onChange={(e) => setInputs({...inputs, height: Number(e.target.value)})}
          className="border p-2 w-full"
        />

        <input placeholder="Age" type="number"
          onChange={(e) => setInputs({...inputs, age: Number(e.target.value)})}
          className="border p-2 w-full"
        />

        <div>
          <label>Gender</label>
          <select
            onChange={(e) => setInputs({...inputs, sex: e.target.value})}
            className="border p-2 w-full"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div>
          <label>What is your primary goal?</label>
          <select
            onChange={(e) => setInputs({...inputs, goal: e.target.value})}
            className="border p-2 w-full"
          >
            <option value="fat_loss">Fat loss</option>
            <option value="muscle_gain">Muscle gain</option>
            <option value="recomp">Recomposition</option>
            <option value="performance">Performance</option>
          </select>
        </div>

        <div>
          <label>What is your goal weight? (optional)</label>
          <input
            type="number"
            className="border p-2 w-full"
            onChange={(e) => setInputs({...inputs, goal_weight: Number(e.target.value)})}
          />
        </div>

        <div>
          <label>Activity level</label>
          <select
            onChange={(e) => setInputs({...inputs, activity_level: e.target.value})}
            className="border p-2 w-full"
          >
            <option value="desk">Desk</option>
            <option value="light">Light</option>
            <option value="active">Active</option>
            <option value="physical">Physical</option>
          </select>
        </div>

        <input
          type="number"
          placeholder="Training days"
          onChange={(e) => setInputs({...inputs, training_days: Number(e.target.value)})}
          className="border p-2 w-full"
        />
      </div>

      {/* STEP 2 */}
      <div>
        {questions.map((q) => (
          <div key={q.id}>
            <p>{q.text}</p>
            <div className="flex gap-2">
              {[1,2,3,4,5,6,7].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [q.id]: num }))
                  }
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

      <button onClick={handleSubmit}>Generate</button>

      {output && (
        <div>
          <p>Target: {output.calories_target}</p>
          <p>Plan: {output.calorie_band}</p>
        </div>
      )}

      {plan && (
        <div>
          <h3>{plan.title}</h3>
          <p>£{plan.price}</p>
        </div>
      )}
    </div>
  );
}