"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const questions = [
  { id: "q1", text: "My energy levels remain stable throughout the day", variable: "ES" },
  { id: "q2", text: "I experience noticeable energy crashes", variable: "ES", reverse: true },
  { id: "q3", text: "I feel energised after eating carbs", variable: "CH" },
  { id: "q4", text: "Carbohydrates make me feel sluggish or bloated", variable: "CH", reverse: true },
  { id: "q5", text: "I feel in control of my hunger", variable: "AR" },
  { id: "q6", text: "I struggle with cravings for sugar or snacks", variable: "AR", reverse: true },
  { id: "q7", text: "I can go several hours without thinking about food", variable: "AR" },
  { id: "q8", text: "I often feel hungry even after eating", variable: "AR", reverse: true },
  { id: "q9", text: "Stress does not affect my eating habits", variable: "SS" },
  { id: "q10", text: "I eat more when I am stressed", variable: "SS", reverse: true },
  { id: "q11", text: "I can maintain structure even under pressure", variable: "SS" },
  { id: "q12", text: "My eating habits become inconsistent when stressed", variable: "SS", reverse: true },
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

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id);
    });
  }, []);

  // ✅ UPDATED (stronger scoring)
  const mapLikert = (value, reverse = false) => {
    let score = (value - 4) * 2;
    return reverse ? -score : score;
  };

  const handleSubmit = async () => {
    if (!userId) return;

    // validation
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions");
      return;
    }

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
      value: mapLikert(answers[q.id], q.reverse),
    }));

    await supabase.from("nutrition_responses").insert(responseRows);

    await supabase.rpc("calculate_user_scores", { p_assessment_id: assessmentId });
    await supabase.rpc("assign_archetype_v2", { p_assessment_id: assessmentId });
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