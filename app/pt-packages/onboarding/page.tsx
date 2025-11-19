// v2 build-safe
"use client";

import React, { useMemo, useState, FormEvent } from "react";
import Link from "next/link";

type ChecklistItemId = "everfit" | "loseit" | "profiles" | "terms" | "book";

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
      { label: "Download on iOS", href: "#" }, 
      { label: "Download on Android", href: "#" },
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
    description: "Please review the training terms, cancellation policy and studio directions.",
    actions: [
      { label: "View Terms", href: "/terms" },
      { label: "Studio Info", href: "/studio" },
    ],
  },
  {
    id: "book",
    title: "Step 5 — Book Your First Session",
    description: "Use the calendar below to choose a time that works for you.",
  },
];

type OnboardingPageProps = {
  searchParams?: { plan?: string };
};

export default function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const planFromQuery = searchParams?.plan;
  const plan = useMemo(() => planFromQuery || "UNSPECIFIED", [planFromQuery]);

  const [completedSteps, setCompletedSteps] = useState<Record<ChecklistItemId, boolean>>({
    everfit: false,
    loseit: false,
    profiles: false,
    terms: false,
    book: false,
  });

  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [hasConfirmedOnboarding, setHasConfirmedOnboarding] = useState(false);

  const [weightKg, setWeightKg] = useState("");
  const [avgSleepHours, setAvgSleepHours] = useState("");
  const [notes, setNotes] = useState("");

  const [baselineSubmitting, setBaselineSubmitting] = useState(false);
  const [baselineSuccess, setBaselineSuccess] = useState<string | null>(null);
  const [baselineError, setBaselineError] = useState<string | null>(null);

  const handleToggleChecklist = (id: ChecklistItemId) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
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

      const data = await res.json();
      if (!data?.success) throw new Error("Unexpected response");

      setBaselineSuccess("Baseline details submitted. Thank you!");
      setWeightKg("");
      setAvgSleepHours("");
      setNotes("");
    } catch (err) {
      console.error(err);
      setBaselineError("Something went wrong. Please try again.");
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
    <div className="min-h-screen bg-black text-white">
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
                This onboarding flow currently supports the Functional Hybrid Training System and all future PT packages.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-[#00C853]" />
              <span>Plan</span>
              <span className="font-semibold text-[#E8D7A8]">{planFromQuery ?? "Universal PT"}</span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span>Onboarding Steps</span>
              <span className="text-neutral-500">Apps · Checklist · Book Session · Confirm</span>
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
        <section className="mt-10 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold sm:text-2xl">Onboarding Checklist</h2>
              <p className="mt-1 max-w-xl text-sm text-neutral-400">
                Tick each step off as you go. These steps keep your sessions smooth and results focused.
              </p>
            </div>
            <p className="text-xs text-neutral-500">Progress is saved locally in your browser.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKLIST_ITEMS.map((item) => {
              const checked = completedSteps[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleChecklist(item.id)}
                  className={`group flex flex-col items-start rounded-2xl border p-4 text-left transition bg-neutral-900/60 shadow-sm shadow-black/40 ${
                    checked ? "border-green-500 bg-green-500/5" : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <div className="mb-3 flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-md border text-[11px] font-semibold ${
                        checked ? "bg-green-500 border-green-500" : "bg-neutral-900 border-neutral-600"
                      }`}>{checked ? "✓" : ""}</span>
                      <h3 className="text-sm font-semibold text-[#E8D7A8]">{item.title}</h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Step</span>
                  </div>

                  <p className="text-xs text-neutral-300">{item.description}</p>

                  {item.actions && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.actions.map((a) => (
                        <Link
                          key={a.label}
                          href={a.href}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-[11px] text-neutral-200 hover:border-green-500 hover:text-green-500"
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
        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold sm:text-2xl">Book Your First Session</h2>
          <p className="text-sm text-neutral-400 max-w-xl">
            Choose a time that works for you. You’ll receive an email confirmation once it’s booked.
          </p>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 shadow-sm shadow-black/40">
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="overflow-hidden rounded-xl border border-neutral-800 bg-black">
                <iframe
                  src="https://cal.com/human-pea-28vrwm/fitness-assessment"
                  title="Book your first session"
                  className="h-[650px] w-full border-0"
                  allow="camera; microphone; autoplay; clipboard-read; clipboard-write"
                />
              </div>

              <button
                type="button"
                onClick={() => setBookingCompleted((x) => !x)}
                className={`mt-1 text-[11px] underline-offset-4 ${
                  bookingCompleted ? "text-green-500" : "text-neutral-500 hover:underline"
                }`}
              >
                {bookingCompleted ? "Booking marked as completed (undo)" : "Mark booking as completed"}
              </button>
            </div>
          </div>
        </section>

        {/* BASELINE METRICS */}
        <section className="mt-10 space-y-6">
          <h2 className="text-xl font-semibold sm:text-2xl">Optional: Baseline Details</h2>
          <p className="text-sm text-neutral-400 max-w-xl">
            Helps me tailor your plan from day one.
          </p>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 shadow-sm">
            <form onSubmit={handleBaselineSubmit} className="mx-auto flex max-w-xl flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="weightKg" className="text-xs text-neutral-200">Weight (kg)</label>
                  <input
                    id="weightKg"
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2 text-sm focus:border-green-500 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="avgSleepHours" className="text-xs text-neutral-200">Average sleep (hrs)</label>
                  <input
                    id="avgSleepHours"
                    type="number"
                    step="0.1"
                    value={avgSleepHours}
                    onChange={(e) => setAvgSleepHours(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2 text-sm focus:border-green-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-xs text-neutral-200">Notes</label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Injuries, goals, schedule…"
                  className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2 text-sm focus:border-green-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={baselineSubmitting}
                className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black shadow hover:bg-green-600 disabled:opacity-60"
              >
                {baselineSubmitting ? "Submitting…" : "Submit Baseline Details"}
              </button>

              {baselineSuccess && <p className="text-xs text-green-500">{baselineSuccess}</p>}
              {baselineError && <p className="text-xs text-red-400">{baselineError}</p>}
            </form>
          </div>
        </section>

        {/* CONFIRMATION */}
        <section className="mt-10 space-y-6">
          {!hasConfirmedOnboarding ? (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 shadow-sm">
              <h2 className="text-lg font-semibold sm:text-xl">You're Ready to Start</h2>
              <p className="text-sm text-neutral-400 max-w-xl">
                After completing the checklist and booking, confirm your onboarding.
              </p>

              {!bookingCompleted && (
                <p className="text-xs text-amber-400 mt-2">
                  Hint: Book your session above before confirming.
                </p>
              )}

              <button
                type="button"
                disabled={!bookingCompleted}
                onClick={handleConfirmOnboarding}
                className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold shadow ${
                  bookingCompleted
                    ? "bg-green-500 text-black hover:bg-green-600"
                    : "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                }`}
              >
                I've Completed My Onboarding
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-green-500/40 bg-green-500/10 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-[#E8D7A8]">You're all set.</h2>
              <p className="mt-2 text-sm text-neutral-100 max-w-xl">
                You’ll see your program in the app before your first session.
              </p>
              <p className="mt-3 text-xs text-neutral-400">
                You can revisit this page anytime for terms, directions or app links.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
