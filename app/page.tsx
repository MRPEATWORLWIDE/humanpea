"use client";

import React, { useMemo, useState, FormEvent } from "react";
import Link from "next/link";

type ChecklistItemId = "everfit" | "loseit" | "profiles" | "book";

type ChecklistItem = {
  id: ChecklistItemId;
  title: string;
  description: string;
  actions?: { label: string; href: string }[];
};

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "everfit",
    title: "STEP 1 — DOWNLOAD EVERFIT",
    description:
      "Your training plan, habit tracking and progress photos will live here.",
    actions: [
      {
        label: "Download on iOS",
        href: "https://apps.apple.com/us/app/everfit-client/id1508725411",
      },
      {
        label: "Download on Android",
        href: "https://play.google.com/store/apps/details?id=com.everfit.client",
      },
    ],
  },
  {
    id: "loseit",
    title: "STEP 2 — DOWNLOAD LOSE IT",
    description: "We’ll use this to loosely track calories and protein.",
    actions: [
      {
        label: "Download on iOS",
        href: "https://apps.apple.com/us/app/lose-it-calorie-counter/id297368629",
      },
      {
        label: "Download on Android",
        href: "https://play.google.com/store/apps/details?id=com.fitnow.loseit",
      },
    ],
  },
  {
    id: "profiles",
    title: "STEP 3 — COMPLETE YOUR APP PROFILES",
    description:
      "Add your details such as height, current weight, goal weight and any other important details so you can track progress.",
  },
  {
    id: "book",
    title: "STEP 5 — BOOK YOUR FIRST SESSION",
    description:
      "Use the calendar to choose a time that works for you and agree to the Studio terms.",
  },
];

type OnboardingPageProps = {
  searchParams?: {
    plan?: string;
  };
};

export default function OnboardingPage({ searchParams }: OnboardingPageProps) {
  const planFromQuery = searchParams?.plan;
  const plan = useMemo(() => planFromQuery || "UNSPECIFIED", [planFromQuery]);

  const [completedSteps, setCompletedSteps] = useState<
    Record<ChecklistItemId, boolean>
  >({
    everfit: false,
    loseit: false,
    profiles: false,
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

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showTermsDrawer, setShowTermsDrawer] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);

  const handleToggleChecklist = (id: ChecklistItemId) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openBookingModal = () => {
    setShowBookingModal(true);
    setShowTermsDrawer(false);
    setTermsChecked(false);
    setShowThankYouModal(false);
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

  const handleSubmitTerms = () => {
    if (!termsChecked) return;
    setHasAgreedTerms(true);
    setBookingCompleted(true);
    setShowTermsDrawer(false);
    setShowThankYouModal(true);
  };

  return (
    <main
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily:
          "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, -apple-system",
      }}
    >
      {/* Layout variables to match /home */}
      <style>{`
        :root {
          --hp-container-max: 1120px;
          --hp-section-pad-x: 1.25rem;
          --hp-card-min-h: 420px;
          --hp-card-pad: 1.25rem;
          --hp-footer-h: 72px;
          --hp-accent: #00C853;
          --hp-muted: #666666;
        }
      `}</style>

      {/* HEADER (same as /home) */}
      <header
        className="sticky top-0 z-30 border-b border-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        style={{ height: "64px" }}
      >
        <div
          className="mx-auto flex h-full w-full items-center justify-between"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "0 var(--hp-section-pad-x)",
          }}
        >
          <div className="text-sm tracking-[0.14em] font-semibold">
            HUMANPEA® LONDON
          </div>
          <div className="flex items-center gap-3 text-xs text-black/60">
            <span>00C853 / LIMITED SERIES</span>
            <Link
              href="/home"
              className="underline underline-offset-4 text-black/50 hover:text-black"
            >
              Back to packages
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="border-b border-black/10">
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "2.5rem var(--hp-section-pad-x) 3rem",
          }}
        >
          {/* HERO + PROGRESS */}
          <header className="space-y-8">
            <div className="text-xs uppercase tracking-[0.2em] text-black/50">
              HUMANPEA / PT PACKAGES
              {planFromQuery ? ` / ${planFromQuery}` : ""}
            </div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[650] leading-tight">
                  PT <span className="opacity-70">ONBOARDING</span>
                </h1>
                <p className="max-w-xl text-sm text-black/70">
                  Complete these steps before your first session at the Private
                  Studio.
                </p>
                <p className="max-w-xl text-xs text-black/55 sm:text-sm">
                  This onboarding flow currently supports the Functional Hybrid
                  Training System and all future PT packages.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-black/60">
                <span className="h-2 w-2 rounded-full bg-[var(--hp-accent)]" />
                <span>PLAN</span>
                <span className="font-semibold text-[var(--hp-accent)]">
                  {planFromQuery ?? "UNIVERSAL PT"}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-black/60">
                <span>Onboarding Steps</span>
                <span className="text-black/45">
                  Apps · Checklist · Book Session · Confirm
                </span>
              </div>
              <div className="flex items-center gap-4">
                {["Apps", "Checklist", "Book Session", "Confirm"].map(
                  (label, i) => (
                    <div
                      key={label}
                      className="flex flex-1 items-center gap-2"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15 bg-white text-[11px] font-semibold">
                        {i + 1}
                      </div>
                      <span className="text-xs text-black/70">{label}</span>
                      {i < 3 && (
                        <div className="h-px flex-1 bg-black/10" />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </header>

          {/* CHECKLIST */}
          <section className="mt-10 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold sm:text-2xl">
                  Onboarding Checklist
                </h2>
                <p className="mt-1 max-w-xl text-sm text-black/65">
                  Tick each step off as you go. These steps keep your sessions
                  smooth and results focused.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKLIST_ITEMS.map((item) => {
                const checked = completedSteps[item.id];

                const handleClick = () => {
                  handleToggleChecklist(item.id);
                  if (item.id === "book") {
                    openBookingModal();
                  }
                };

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={handleClick}
                    className={`group flex flex-col items-start rounded-xl border text-left transition shadow-sm ${
                      checked
                        ? "border-[var(--hp-accent)] bg-[var(--hp-accent)]/4"
                        : "border-black/10 bg-black/[0.02] hover:border-black/25"
                    }`}
                    style={{
                      minHeight: "var(--hp-card-min-h)",
                      padding: "var(--hp-card-pad)",
                    }}
                  >
                    <div className="mb-3 flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md border text-[11px] font-semibold ${
                            checked
                              ? "border-[var(--hp-accent)] bg-[var(--hp-accent)] text-white"
                              : "border-black/25 bg-white text-black/70"
                          }`}
                        >
                          {checked ? "✓" : ""}
                        </span>
                        <h3 className="text-lg font-semibold tracking-wide text-black">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-black/70">{item.description}</p>

                    {item.actions && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.actions.map((a) => (
                          <Link
                            key={a.label}
                            href={a.href}
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-full border border-black/15 bg-white px-3 py-1 text-[11px] text-black/80 hover:border-[var(--hp-accent)] hover:text-[var(--hp-accent)]"
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

          {/* BOOKING SECTION (opens modal) */}
          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Book Your First Session
            </h2>
            <p className="text-sm text-black/65 max-w-xl">
              Use the calendar to pick a time that works for you and agree to
              the Studio terms. Click STEP 5 above or the button below.
            </p>

            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-4 py-2 text-sm font-medium hover:border-black/40"
            >
              Open calendar &amp; terms
            </button>
          </section>

          {/* BASELINE METRICS */}
          <section className="mt-10 space-y-6">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Optional: Baseline Details
            </h2>
            <p className="text-sm text-black/65 max-w-xl">
              Helps me tailor your plan from day one.
            </p>

            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 shadow-sm">
              <form
                onSubmit={handleBaselineSubmit}
                className="mx-auto flex max-w-xl flex-col gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="weightKg"
                      className="text-xs text-black/80 font-medium"
                    >
                      Weight (kg)
                    </label>
                    <input
                      id="weightKg"
                      type="number"
                      step="0.1"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm focus:border-[var(--hp-accent)] outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="avgSleepHours"
                      className="text-xs text-black/80 font-medium"
                    >
                      Average sleep (hrs)
                    </label>
                    <input
                      id="avgSleepHours"
                      type="number"
                      step="0.1"
                      value={avgSleepHours}
                      onChange={(e) => setAvgSleepHours(e.target.value)}
                      className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm focus:border-[var(--hp-accent)] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="notes"
                    className="text-xs text-black/80 font-medium"
                  >
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Injuries, goals, schedule…"
                    className="w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-sm focus:border-[var(--hp-accent)] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={baselineSubmitting}
                  className="rounded-full bg-[var(--hp-accent)] px-4 py-2 text-sm font-semibold text-black shadow hover:bg-[#00b648] disabled:opacity-60"
                >
                  {baselineSubmitting
                    ? "Submitting…"
                    : "Submit Baseline Details"}
                </button>

                {baselineSuccess && (
                  <p className="text-xs text-[var(--hp-accent)]">
                    {baselineSuccess}
                  </p>
                )}
                {baselineError && (
                  <p className="text-xs text-red-500">{baselineError}</p>
                )}
              </form>
            </div>
          </section>

          {/* CONFIRMATION */}
          <section className="mt-10 space-y-6 pb-8">
            {!hasConfirmedOnboarding ? (
              <div className="rounded-xl border border-black/10 bg-black/[0.02] p-5 shadow-sm">
                <h2 className="text-lg font-semibold sm:text-xl">
                  You’re Ready to Start
                </h2>
                <p className="text-sm text-black/65 max-w-xl mt-1">
                  After completing the checklist and booking, confirm your
                  onboarding.
                </p>

                {!bookingCompleted && (
                  <p className="text-xs text-amber-600 mt-2">
                    Hint: Complete your booking and agree to the Studio terms
                    before confirming.
                  </p>
                )}

                <button
                  type="button"
                  disabled={!bookingCompleted}
                  onClick={handleConfirmOnboarding}
                  className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold shadow ${
                    bookingCompleted
                      ? "bg-[var(--hp-accent)] text-black hover:bg-[#00b648]"
                      : "bg-black/5 text-black/40 cursor-not-allowed"
                  }`}
                >
                  I’ve Completed My Onboarding
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-[var(--hp-accent)]/40 bg-[var(--hp-accent)]/10 p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-black sm:text-xl">
                  You’re all set.
                </h2>
                <p className="mt-2 text-sm text-black/75 max-w-xl">
                  You’ll see your program in the app before your first session.
                </p>
                <p className="mt-3 text-xs text-black/60">
                  You can revisit this page anytime for terms, directions or app
                  links.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>

      {/* FOOTER (same as /home) */}
      <footer
        className="flex items-center border-t border-black/10"
        style={{ height: "var(--hp-footer-h)" }}
      >
        <div
          className="mx-auto flex w-full items-center justify-between text-xs text-black/60"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "0 var(--hp-section-pad-x)",
          }}
        >
          <span>©2025 HUMANPEA FUNCTIONAL SYSTEMS</span>
          <span className="tracking-[0.18em]">ㅎㅍ</span>
        </div>
      </footer>

      {/* BOOKING MODAL (lightbox) */}
      {showBookingModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white p-4 shadow-xl">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="absolute right-3 top-3 text-xs text-black/50 hover:text-black"
            >
              Close
            </button>

            <h3 className="text-lg font-semibold mb-2">
              Book Your First Session
            </h3>
            <p className="text-xs text-black/60 mb-3">
              Select a date and time using the calendar below, then review and
              agree to the Studio terms.
            </p>

            <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
              <iframe
                src="https://cal.com/human-pea-28vrwm/fitness-assessment"
                title="Book your first session"
                className="h-[500px] w-full border-0"
                allow="camera; microphone; autoplay; clipboard-read; clipboard-write"
              />
            </div>

            {/* Open Terms Drawer */}
            <button
              type="button"
              onClick={() => {
                setShowTermsDrawer(true);
                setTermsChecked(false);
              }}
              className="mt-4 text-xs font-semibold text-[#00C853] underline underline-offset-4"
            >
              Click here to review Studio terms
            </button>

            {hasAgreedTerms && (
              <p className="mt-2 text-[11px] text-black/60">
                You’ve agreed to the Studio terms. You can still review them
                again if needed.
              </p>
            )}
          </div>
        </div>
      )}

      {/* TERMS DRAWER (slide-up modal from bottom) */}
      {showTermsDrawer && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/60 px-0 sm:px-4">
          <div className="mx-auto w-full max-w-2xl rounded-t-2xl bg-white p-4 sm:p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold">
                  Studio Terms &amp; Conditions
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-black/60">
                  Please read through the terms below. Tick the box and submit
                  to confirm your agreement.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTermsDrawer(false)}
                className="text-xs text-black/50 hover:text-black"
              >
                Close
              </button>
            </div>

            <div className="mt-3 max-h-[60vh] overflow-y-auto space-y-3 text-xs text-black/70">
              <p>
                <strong>1. Studio Location &amp; Access</strong> — All sessions
                are by appointment only at the Private Studio in Walworth, SE17.
                Entry times are linked to your confirmed booking slot.
              </p>
              <p>
                <strong>2. Cancellations &amp; Rescheduling</strong> — 24 hours’
                notice is required to cancel or reschedule any session. Late
                cancellations or no-shows may be charged in full or result in a
                session being forfeited from your package.
              </p>
              <p>
                <strong>3. Health &amp; Medical</strong> — You must inform your
                coach of any injuries, medical conditions, medication or changes
                in your health before each session. If you have ongoing
                illnesses, recent surgery, chest pain, shortness of breath or
                any other concerns, you should consult your GP or healthcare
                professional before starting personal training.
              </p>
              <p>
                <strong>4. Safety &amp; Conduct</strong> — You agree to follow
                Studio safety instructions at all times, to use equipment as
                demonstrated and to maintain a respectful, tidy training
                environment for other clients and residents.
              </p>
              <p>
                <strong>5. Packages &amp; Payments</strong> — Session packages
                are non-transferable and should be used within the agreed time
                frame unless otherwise discussed. Payment terms and any promo
                pricing will be confirmed at the start of your programme.
              </p>
              <p>
                <strong>6. Media &amp; Progress Tracking</strong> — Training may
                include progress photos or short video clips for coaching and/or
                social media. You will always be asked for consent before any
                media is shared publicly.
              </p>
              <p>
                <strong>7. Personal Responsibility</strong> — You understand
                that training carries an inherent risk. By participating you
                accept responsibility for your own body, effort and recovery,
                and you’ll communicate openly if anything doesn’t feel right.
              </p>
            </div>

            <label className="mt-4 flex items-start gap-2 text-xs text-black/80">
              <input
                type="checkbox"
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
                className="mt-[2px] h-4 w-4 rounded border-black/30"
              />
              <span>
                I have read and agree to all Studio Terms &amp; Conditions.
              </span>
            </label>

            <button
              type="button"
              onClick={handleSubmitTerms}
              disabled={!termsChecked}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#00C853] px-4 py-2 text-xs font-semibold text-black shadow hover:bg-[#00b648] disabled:opacity-60"
            >
              Submit Agreement
            </button>
          </div>
        </div>
      )}

      {/* THANK YOU MODAL (centered) */}
      {showThankYouModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h3 className="text-lg font-semibold mb-2">
              Thank you for agreeing to the terms
            </h3>
            <p className="text-sm text-black/70">
              A member of staff will be in contact with you within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setShowThankYouModal(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-black/20 bg-white px-4 py-2 text-sm font-medium hover:border-black/40"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
