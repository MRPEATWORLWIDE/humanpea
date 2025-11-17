"use client";

import React, { useMemo, useState, FormEvent } from "react";
import Link from "next/link";

type OnboardingPageProps = {
  searchParams?: {
    plan?: string;
  };
};

type ChecklistItemId =
  | "everfit"
  | "loseit"
  | "profiles"
  | "terms"
  | "book";

type ChecklistItem = {
  id: ChecklistItemId;
  title: string;
  description: string;
  actions?: { label: string; href: string }[];
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "everfit",
    title: "Step 1 — Download Everfit",
    description: "Your training plan, habit tracking and progress photos will live here.",
    actions: [
      { label: "Download on iOS", href: "#" }, // TODO: Replace with real App Store link
      { label: "Download on Android", href: "#" }, // TODO: Replace with real Play Store link
    ],
  },
  {
    id: "loseit",
    title: "Step 2 — Download Lose It",
    description: "We’ll use this to loosely track calories and protein.",
    actions: [
      { label: "Download on iOS", href: "#" },
      { label: "Download on Android", href: "#" },
    ],
  },
  {
    id: "profiles",
    title: "Step 3 — Complete Your App Profiles",
    description: "Add height, weight and a recent photo so progress can be tracked.",
  },
  {
    id: "terms",
    title: "Step 4 — Review Terms & Studio Info",
    description:
      "Please review the training terms, cancellation policy and studio directions.",
    actions: [
      { label: "View Terms", href: "/terms" }, // TODO: real links
      { label: "Studio Info", href: "/studio" },
    ],
  },
  {
    id: "book",
    title: "Step 5 — Book Your First Session",
    description: "Use the calendar below to choose a time that works for you.",
  },
];

export default function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const planFromQuery = searchParams?.plan;
  const plan = useMemo(
    () => planFromQuery || "UNSPECIFIED",
    [planFromQuery]
  );

  const [completedSteps, setCompletedSteps] = useState<Record<ChecklistItemId, boolean>>({
    everfit: false,
    loseit: false,
    profiles: false,
    terms: false,
    book: false,
  });

  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [hasConfirmedOnboarding, setHasConfirmedOnboarding] = useState(false);

  const [weightKg, setWeightKg] = useState<string>("");
  const [avgSleepHours, setAvgSleepHours] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [baselineSubmitting, setBaselineSubmitting] = useState(false);
  const [baselineSuccess, setBaselineSuccess] = useState<string | null>(null);
  const [baselineError, setBaselineError] = useState<string | null>(null);

  const handleToggleChecklist = (id: ChecklistItemId) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBaselineSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBaselineSuccess(null);
    setBaselineError(null);
    setBaselineSubmitting(true);

    try {
      const payload = {
        weightKg: weightKg ? Number(weightKg) : null,
        avgSleepHours: avgSleepHours ? Number(avgSleepHours) : null,
        notes: notes || null,
        plan,
      };

      const res = await fetch("/api/onboarding/baseline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      if (data?.success) {
        setBaselineSuccess("Baseline details submitted. Thank you!");
        setWeightKg("");
        setAvgSleepHours("");
        setNotes("");
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      console.error(err);
      setBaselineError("Something went wrong.");
    } finally {
      setBaselineSubmitting(false);
    }
  };

  const handleConfirmOnboarding = () => {
    console.log({
      onboardingConfirmed: true,
      plan,
      timestamp: Date.now(),
    });
    setHasConfirmedOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">

        {/* HERO */}
        <header className="space-y-8">
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            HumanPea / PT Packages{planFromQuery ? ` / ${planFromQuery}` : ""}
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold sm:text-4xl">PT Onboarding</h1>
              <p className="max-w-xl text-sm text-neutral-300">
                Complete these steps before your first session at the Private Studio.
              </p>
              <p className="max-w-xl text-xs text-neutral-500 sm:text-sm">
                This onboarding flow supports all PT packages.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-[#00C853]" />
              <span>Plan</span>
              <span className="font-semibold text-[#E8D7A8]">
                {planFromQuery ?? "Universal PT"}
              </span>
            </div>
          </div>

          {/* PROGRESS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Onboarding Steps</span>
              <span className="text-neutral-500">Apps · Checklist · Book · Confirm</span>
            </div>

            <div className="flex items-center gap-4">
              {["Apps", "Checklist", "Book Session", "Confirm"].map((label, i) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-[11px] font-semibold">
                    {i + 1}
                  </div>
                  <span className="text-xs text-neutral-300">{label}</span>
                  {i < 3 && <div className="h-px flex-1 bg-neutral-700" />}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* CHECKLIST */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold sm:text-2xl">Onboarding Checklist</h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKLIST_ITEMS.map((item) => {
              const checked = completedSteps[item.id];

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleChecklist(item.id)}
                  className={`group flex flex-col items-start rounded-2xl border p-4 text-left transition bg-neutral-900/60 ${
                    checked
                      ? "border-[#00C853] bg-[#00C853]/5"
                      : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <div className="mb-3 flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border text-[11px] font-semibold ${
                          checked
                            ? "border-[#00C853] bg-[#00C853]"
                            : "border-neutral-600 bg-neutral-900"
                        }`}
                      >
                        {checked ? "✓" : ""}
                      </span>
                      <h3 className="text-sm font-semibold text-[#E8D7A8]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300">{item.description}</p>

                  {item.actions && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.actions.map((a) => (
                        <Link
                          key={a.label}
                          href={a.href}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-[11px] text-neutral-200 hover:border-[#00C853] hover:text-[#00C853]"
                        >
                          {a.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* CALENDAR */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold sm:text-2xl">Book Your First Session</h2>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">

            <div className="overflow-hidden rounded-xl border border-neutral-800 bg-black">
              <iframe
                // Official Cal.com booking link
                src="https://cal.com/human-pea-28vrwm/fitness-assessment"
                title="Book your first session"
                className="h-[650px] w-full border-0"
                allow="camera; microphone; autoplay; clipboard-read; clipboard-write"
              />
            </div>

            <button
              type="button"
              onClick={() => setBookingCompleted((v) => !v)}
              className={`mt-3 text-[11px] underline ${
                bookingCompleted ? "text-[#00C853]" : "text-neutral-500"
              }`}
            >
              {bookingCompleted
                ? "Booking marked as completed (click to undo)"
                : "Click here if you've completed your booking"}
            </button>
          </div>
        </section>

        {/* BASELINE FORM */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Optional: Share a Few Baseline Details
          </h2>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
            <form onSubmit={handleBaselineSubmit} className="flex flex-col gap-4 max-w-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-neutral-200">Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-xs text-neutral-200">Average sleep</label>
                  <input
                    type="number"
                    value={avgSleepHours}
                    onChange={(e) => setAvgSleepHours(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-200">Notes</label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2"
                />
              </div>

              <button
                type="submit"
