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

  // ✅ NEW INPUT STATE
  const [inputs, setInputs] = useState({
    weight: "",
    height: "",
    age: "",
    sex: "M",
    goal: "muscle_gain",
    goal_weight: "",
    activity_level: "light",
    training_days: 3,
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id);
    });
  }, []);

  const mapLikert = (value) => {
    return (value - 4) * 2;
  };

  const handleSubmit = async () => {
    if (!userId) return;

    // ✅ INPUT VALIDATION
    if (!inputs.weight || !inputs.height || !inputs.age) {
      alert("Please complete your details");
      return;
    }

    // questionnaire validation
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions");
      return;
    }

    // ✅ INSERT INPUTS
    await supabase.from("nutrition_inputs").insert({
      user_id: userId,
      weight: Number(inputs.weight),
      height: Number(inputs.height),
      age: Number(inputs.age),
      sex: inputs.sex,
      goal: inputs.goal,
      goal_weight: Number(inputs.goal_weight),
      activity_level: inputs.activity_level,
      training_days: Number(inputs.training_days),
    });

    // existing flow
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

    const { error } = await supabase
      .from("nutrition_responses")
      .insert(responseRows);

    if (error) {
      console.error("Insert error:", error);
      return;
    }

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

    setIdentity(identityData);
    setOutput(outputData);
  };

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Nutrition Assessment</h1>

      {/* ✅ NEW INPUT BLOCK */}
      <div className="border p-4 space-y-4">
        <h2 className="font-semibold">Your Details</h2>

        <input placeholder="Weight (kg)" type="number"
          onChange={(e) => setInputs({...inputs, weight: e.target.value})}
          className="border p-2 w-full"
        />

        <input placeholder="Height (cm)" type="number"
          onChange={(e) => setInputs({...inputs, height: e.target.value})}
          className="border p-2 w-full"
        />

        <input placeholder="Age" type="number"
          onChange={(e) => setInputs({...inputs, age: e.target.value})}
          className="border p-2 w-full"
        />

        <select
          onChange={(e) => setInputs({...inputs, sex: e.target.value})}
          className="border p-2 w-full"
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <select
          onChange={(e) => setInputs({...inputs, goal: e.target.value})}
          className="border p-2 w-full"
        >
          <option value="fat_loss">Fat loss</option>
          <option value="muscle_gain">Muscle gain</option>
          <option value="recomp">Recomposition</option>
          <option value="performance">Performance</option>
        </select>

        <input placeholder="Goal weight (kg)" type="number"
          onChange={(e) => setInputs({...inputs, goal_weight: e.target.value})}
          className="border p-2 w-full"
        />

        <select
          onChange={(e) => setInputs({...inputs, activity_level: e.target.value})}
          className="border p-2 w-full"
        >
          <option value="desk">Desk-based (mostly sitting)</option>
          <option value="light">Light movement</option>
          <option value="active">Active</option>
          <option value="physical">Physically demanding</option>
        </select>

        <input placeholder="Training days per week" type="number"
          onChange={(e) => setInputs({...inputs, training_days: Number(e.target.value)})}
          className="border p-2 w-full"
        />
      </div>

      {/* EXISTING QUESTIONS */}
      {questions.map((q) => (
        <div key={q.id} className="space-y-2">
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

      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Generate Plan
      </button>

      {identity && (
        <div className="border p-4 mt-4 space-y-2">
          <h2 className="font-semibold text-lg">Your Profile</h2>

          <p>Type: {identity.type}</p>
          <p>Archetype: {identity.archetype}</p>
          <p>Variant: {identity.variant}</p>
          <p>Code: {identity.archetype}-{identity.variant}</p>

          <p className="mt-2 text-sm text-gray-600">
            {archetypeDescriptions[identity.archetype]}
          </p>
        </div>
      )}

      {output && (
        <div className="border p-4 mt-4">
          <h2 className="font-semibold">Your Plan</h2>

          <p>Calories: {output.calories}</p>
          <p>Protein: {output.protein}</p>
          <p>Carbs: {output.carbs}</p>
          <p>Fats: {output.fats}</p>

          <p className="mt-2">{output.diet_route}</p>
          <p>{output.meal_structure}</p>
        </div>
      )}
    </div>
  );
}