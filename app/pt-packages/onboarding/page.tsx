// app/pt-packages/onboarding/page.tsx
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
      { label: "Download on iOS", href: "#" }, // TODO: Replace with real App Store link
      { label: "Download on Android", href: "#" }, // TODO: Replace with real Play Store link
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
      { label: "View Terms", href: "/terms" }, // TODO: Confirm T&Cs route
      { label: "Studio Info", href: "/studio" }, // TODO: Confirm studio info route/address
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
    () => planFromQuery || "UNSPECIFIED", // TODO: You can switch this default later, e.g. "HYBRID_01"
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit baseline details.");
      }

      const data = await res.json();
      if (data?.success) {
        setBaselineSuccess("Baseline details submitted. Thank you!");
        setWeightKg("");
        setAvgSleepHours("");
        setNotes("");
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error: any) {
      console.error(error);
      setBaselineError("Something went wrong. Please try again.");
    } finally {
      setBaselineSubmitting(false);
    }
  };

  const handleConfirmOnboarding = () => {
    // Replace this console.log with real tracking later (Supabase/CRM/etc.)
    console.log({
      onboardingConfirmed: true,
      plan,
      timestamp: Date.now(),
    });
    setHasConfirmedOnboarding(true);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* Hero / Progress */}
        <header className="space-y-8">
          {/* Simple breadcrumb / context */}
          <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            HumanPea / PT Packages{planFromQuery ? ` / ${planFromQuery}` : ""}
          </div>

          {/* Hero content */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                PT Onboarding
              </h1>
              <p className="max-w-xl text-sm text-neutral-300 sm:text-base">
                Complete these steps before your first session at the Private Studio.
              </p>
              <p className="max-w-xl text-xs text-neutral-500 sm:text-sm">
                This onboarding flow currently supports the{" "}
                <span className="font-medium text-[#00C853]">
                  Functional Hybrid Training System
                </span>{" "}
                and all future PT packages.
              </p>
            </div>

            {/* Current plan pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-[#00C853]" />
              <span>Plan</span>
              <span className="font-semibold text-[#E8D7A8]">
                {planFromQuery ?? "Universal PT"}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-neutral-400">
              <span>Onboarding Steps</span>
              <span className="text-neutral-500">Apps · Checklist · Book Session · Confirm</span>
            </div>
            <div className="flex items-center gap-4">
              {["Apps", "Checklist", "Book Session", "Confirm"].map((label, index) => (
                <div key={label} className="flex flex-1 items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-[11px] font-semibold">
                    {index + 1}
                  </div>
                  <span className="text-xs text-neutral-300">{label}</span>
                  {index < 3 && (
                    <div className="h-px flex-1 bg-gradient-to-r from-neutral-700/80 to-neutral-800" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Checklist section */}
        <section aria-labelledby="onboarding-checklist" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="onboarding-checklist"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Onboarding Checklist
              </h2>
              <p className="mt-1 max-w-xl text-sm text-neutral-400">
                Tick each step off as you go. These steps keep your sessions smooth and results
                focused.
              </p>
            </div>
            <p className="text-xs text-neutral-500">
              Progress is saved locally in your browser only.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHECKLIST_ITEMS.map((item) => {
              const checked = completedSteps[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleToggleChecklist(item.id)}
                  className={[
                    "group flex flex-col items-start rounded-2xl border p-4 text-left transition",
                    "bg-neutral-900/60 shadow-sm shadow-black/40 backdrop-blur",
                    checked
                      ? "border-[#00C853] bg-[#00C853]/5"
                      : "border-neutral-800 hover:border-neutral-600",
                  ].join(" ")}
                >
                  <div className="mb-3 flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={[
                          "flex h-5 w-5 items-center justify-center rounded-md border text-[11px] font-semibold transition",
                          checked
                            ? "border-[#00C853] bg-[#00C853]"
                            : "border-neutral-600 bg-neutral-900",
                        ].join(" ")}
                      >
                        {checked ? "✓" : ""}
                      </span>
                      <h3 className="text-sm font-semibold text-[#E8D7A8]">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                      Step
                    </span>
                  </div>

                  <p className="mb-4 text-xs text-neutral-300">{item.description}</p>

                  {item.actions && (
                    <div className="mt-auto flex flex-wrap gap-2">
                      {item.actions.map((action) => (
                        <Link
                          key={action.label}
                          href={action.href}
                          className="rounded-full border border-neutral-700/80 bg-neutral-900/80 px-3 py-1 text-[11px] font-medium text-neutral-200 transition hover:border-[#00C853]/80 hover:text-[#00C853]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {action.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Calendar section */}
        <section aria-labelledby="book-session" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="book-session"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Book Your First Session
              </h2>
              <p className="mt-1 max-w-xl text-sm text-neutral-400">
                Choose a time that works for you. You’ll receive an email confirmation once it’s
                booked.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 shadow-sm shadow-black/40">
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="rounded-xl border border-neutral-800 bg-black/60 p-2 text-xs text-neutral-500">
                {/* 
                  TODO: Replace iframe src with your actual Cal.com URL, e.g.:
                  https://cal.com/your-handle/pt-onboarding
                  
                  If you switch to the Cal.com React component later, you can wire
                  its "onBookingSuccessful" (or similar) callback to setBookingCompleted(true).
                */}
                <p>
                  The scheduler below is powered by Cal.com. If it doesn’t load, please refresh or
                  open it in a separate tab.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-neutral-800 bg-black">
                <iframe
                  // TODO: Insert Cal.com URL here
                  src="https://cal.com/your-handle/pt-onboarding"
                  title="Book your first session"
                  className="h-[650px] w-full border-0"
                  allow="camera; microphone; autoplay; clipboard-read; clipboard-write"
                />
              </div>

              <div className="text-xs text-neutral-500">
                {/* 
                  If you later use a Cal.com React component:
                  - Use its success callback to call setBookingCompleted(true)
                  Example:
                    <CalCom
                      ...
                      onBookingSuccessful={() => setBookingCompleted(true)}
                    />
                */}
                <p>
                  Once your booking is confirmed, I’ll receive a notification and your program will
                  be prepared in advance.
                </p>
              </div>

              {/* Temporary manual switch to mark booking as done (optional helper) */}
              <button
                type="button"
                onClick={() => setBookingCompleted((prev) => !prev)}
                className={[
                  "text-[11px] underline-offset-4",
                  bookingCompleted
                    ? "text-[#00C853]"
                    : "text-neutral-500 hover:text-neutral-300",
                ].join(" ")}
              >
                {bookingCompleted
                  ? "Booking marked as completed (click to undo)"
                  : "Click here if you’ve completed your booking (temporary toggle)"}
              </button>
            </div>
          </div>
        </section>

        {/* Baseline metrics form */}
        <section aria-labelledby="baseline-metrics" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="baseline-metrics"
                className="text-xl font-semibold tracking-tight sm:text-2xl"
              >
                Optional: Share a Few Baseline Details
              </h2>
              <p className="mt-1 max-w-xl text-sm text-neutral-400">
                This is completely optional, but it helps me personalise your plan from day one.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 shadow-sm shadow-black/40">
            <form
              onSubmit={handleBaselineSubmit}
              className="mx-auto flex max-w-xl flex-col gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="weightKg"
                    className="text-xs font-medium text-neutral-200"
                  >
                    Weight (kg)
                  </label>
                  <input
                    id="weightKg"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2 text-sm text-neutral-50 outline-none ring-0 transition focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="avgSleepHours"
                    className="text-xs font-medium text-neutral-200"
                  >
                    Average sleep (hours per night)
                  </label>
                  <input
                    id="avgSleepHours"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    value={avgSleepHours}
                    onChange={(e) => setAvgSleepHours(e.target.value)}
                    className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2 text-sm text-neutral-50 outline-none ring-0 transition focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="notes"
                  className="text-xs font-medium text-neutral-200"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything I should know before we start? Injuries, schedule, goals, etc."
                  className="w-full rounded-xl border border-neutral-700 bg-black px-3 py-2 text-sm text-neutral-50 outline-none ring-0 transition focus:border-[#00C853] focus:ring-1 focus:ring-[#00C853]"
                />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={baselineSubmitting}
                  className="inline-flex items-center justify-center rounded-full bg-[#00C853] px-4 py-2 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-[#00b648] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {baselineSubmitting ? "Submitting..." : "Submit Baseline Details"}
                </button>

                <p className="text-[11px] text-neutral-500">
                  This is stored securely and used only to personalise your training.
                </p>
              </div>

              {baselineSuccess && (
                <p className="text-xs font-medium text-[#00C853]">
                  {baselineSuccess}
                </p>
              )}
              {baselineError && (
                <p className="text-xs font-medium text-red-400">{baselineError}</p>
              )}
            </form>
          </div>
        </section>

        {/* Final confirmation block */}
        <section aria-labelledby="final-confirmation" className="space-y-6">
          {!hasConfirmedOnboarding ? (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-5 shadow-sm shadow-black/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <h2
                    id="final-confirmation"
                    className="text-lg font-semibold tracking-tight sm:text-xl"
                  >
                    You’re Ready to Start
                  </h2>
                  <p className="max-w-xl text-sm text-neutral-400">
                    Once you’ve completed the checklist and booked your first session, confirm below
                    so I know you’re fully onboarded.
                  </p>
                  {!bookingCompleted && (
                    <p className="text-xs text-amber-400">
                      Hint: Please book your first session above before confirming.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  disabled={!bookingCompleted}
                  onClick={handleConfirmOnboarding}
                  className={[
                    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm shadow-black/40 transition",
                    bookingCompleted
                      ? "bg-[#00C853] text-black hover:bg-[#00b648]"
                      : "cursor-not-allowed bg-neutral-800 text-neutral-500",
                  ].join(" ")}
                >
                  I’ve Completed My Onboarding
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#00C853]/40 bg-[#00C853]/10 p-5 shadow-sm shadow-black/40">
              <h2 className="text-lg font-semibold tracking-tight text-[#E8D7A8] sm:text-xl">
                You’re all set.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-neutral-100">
                You’ll see your program in the app before your first session. If anything changes
                with your schedule or goals, just message me directly.
              </p>
              <p className="mt-3 text-xs text-neutral-400">
                You can always revisit this page to review the studio info, terms and app links.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

