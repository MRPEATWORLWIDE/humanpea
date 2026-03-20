"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const questions = [
  { id: "q1", text: "My energy levels remain steady throughout the day", variable: "ES" },
  { id: "q2", text: "I experience energy crashes during the day", variable: "ES", reverse: true },

  { id: "q3", text: "I feel energised after eating carbs", variable: "CH" },
  { id: "q4", text: "Carbs make me feel sluggish", variable: "CH", reverse: true },

  { id: "q5", text: "I feel in control of my eating", variable: "AR" },
  { id: "q6", text: "I struggle with cravings", variable: "AR", reverse: true },
];

export default function NutritionPage() {
  const [userId, setUserId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUserId(data.user.id);
    });
  }, []);

  const mapLikert = (value, reverse = false) => {
    let score = value - 4; // converts 1–7 → -3 to +3
    return reverse ? -score : score;
  };

  const handleSubmit = async () => {
    if (!userId) return;

    // 1. Create assessment
    const { data: assessment } = await supabase
      .from("assessments")
      .insert({ user_id: userId, version: "beta_v1" })
      .select()
      .single();

    const assessmentId = assessment.id;

    // 2. Build responses
    const responseRows = questions.map((q) => ({
      assessment_id: assessmentId,
      user_id: userId,
      question_key: q.id,
      variable: q.variable,
      value: mapLikert(answers[q.id] || 4, q.reverse),
    }));

    await supabase.from("nutrition_responses").insert(responseRows);

    // 3–5 pipeline
    await supabase.rpc("calculate_user_scores", { p_assessment_id: assessmentId });
    await supabase.rpc("assign_archetype_v2", { p_assessment_id: assessmentId });
    await supabase.rpc("generate_nutrition_output", { p_assessment_id: assessmentId });

    // 6. fetch output
    const { data } = await supabase
      .from("nutrition_outputs")
      .select("*")
      .eq("assessment_id", assessmentId)
      .single();

    setResult(data);
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

      {result && (
        <div className="border p-4 mt-4">
          <h2 className="font-semibold">Your Plan</h2>
          <p>Calories: {result.calories}</p>
          <p>Protein: {result.protein}</p>
          <p>Carbs: {result.carbs}</p>
          <p>Fats: {result.fats}</p>
          <p>{result.diet_route}</p>
        </div>
      )}
    </div>
  );
}