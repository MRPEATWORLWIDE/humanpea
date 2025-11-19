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

  const [completedSteps, setCompletedSteps] = useState<Record<ChecklistItemId, boolean>>({
    everfit: false,
    loseit: false,
    profiles: false,
    book: false,
  });

  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [hasConfirmedOnboarding, setHasConfirmedOnboarding] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [termsMessage, setTermsMessage] = useState<string | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  const handleToggleChecklist = (id: ChecklistItemId) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirmOnboarding = () => {
    setHasConfirmedOnboarding(true);
  };

  const handleAgreeTerms = () => {
    setBookingCompleted(true);
    setTermsMessage(
      "Thank you for agreeing to the Studio terms and conditions. A member of the team will be in touch with you soon."
    );
  };

  return (
    <main
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily:
          "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, -apple-system",
      }}
    >
      {/* Layout variables */}
      <style>{`
        :root {
          --hp-container-max: 1120px;
          --hp-section-pad-x: 1.25rem;
          --hp-card-min-h: 420px;
          --hp-card-pad: 1.25rem;
          --hp-footer-h: 72px;
          --hp-accent: #00C853;
        }
      `}</style>

      {/* HEADER */}
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
          {/* HERO */}
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
              </div>
            </div>
          </header>

          {/* CHECKLIST */}
          <section className="mt-10 space-y-6">
            <h2 className="text-xl font-semibold sm:text-2xl">Onboarding Checklist</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKLIST_ITEMS.map((item) => {
                const checked = completedSteps[item.id];

                const handleClick = () => {
                  handleToggleChecklist(item.id);
                  if (item.id === "book") {
                    setShowBookingModal(true);
                    setTermsMessage(null);
                    setShowTerms(false);
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
                    <div className="mb-3 flex w-full items-center gap-2">
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

          {/* CONFIRMATION */}
          <section className="mt-10 pb-10">
            {!hasConfirmedOnboarding ? (
              <div className="rounded-xl border border-black/10 bg-black/[0.02] p-5 shadow-sm">
                <h2 className="text-lg font-semibold sm:text-xl">
                  You’re Ready to Start
                </h2>
                <p className="text-sm text-black/65 max-w-xl mt-1">
                  After completing the checklist and booking, confirm your onboarding.
                </p>

                <button
                  type="button"
                  disabled={!completedSteps.book}
                  onClick={handleConfirmOnboarding}
                  className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold shadow ${
                    completedSteps.book
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
              </div>
            )}
          </section>
        </div>
      </section>

      {/* FOOTER */}
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

      {/* BOOKING MODAL */}
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

            <h3 className="text-lg font-semibold mb-2">Book Your First Session</h3>

            <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
              <iframe
                src="https://cal.com/human-pea-28vrwm/fitness-assessment"
                title="Book your first session"
                className="h-[500px] w-full border-0"
                allow="camera; microphone; autoplay; clipboard-read; clipboard-write"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
