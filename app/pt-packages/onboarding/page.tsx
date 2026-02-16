// app/pt-packages/onboarding/page.tsx
"use client";

import React, { useMemo, useState } from "react";
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
  searchParams?: { plan?: string };
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

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [hasConfirmedOnboarding, setHasConfirmedOnboarding] = useState(false);

  const handleToggleChecklist = (id: ChecklistItemId) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <section className="bg-white text-black py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* HERO */}
          <header className="space-y-6">
            <div className="text-xs uppercase tracking-[0.2em] text-black/50">
              HUMANPEA / PT PACKAGES
              {planFromQuery ? ` / ${planFromQuery}` : ""}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-[650] leading-tight">
              PT <span className="opacity-70">ONBOARDING</span>
            </h1>

            <p className="max-w-xl text-sm text-black/70">
              Complete these steps before your first session at the Private Studio.
            </p>
          </header>

          {/* CHECKLIST */}
          <section className="mt-12 space-y-6">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Onboarding Checklist
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CHECKLIST_ITEMS.map((item) => {
                const checked = completedSteps[item.id];

                const handleClick = () => {
                  handleToggleChecklist(item.id);
                  if (item.id === "book") {
                    setShowBookingModal(true);
                  }
                };

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={handleClick}
                    className={`flex flex-col items-start rounded-xl border p-6 text-left transition ${
                      checked
                        ? "border-[#00C853] bg-[#00C853]/5"
                        : "border-black/10 bg-black/[0.02] hover:border-black/25"
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-md border text-[11px] font-semibold ${
                          checked
                            ? "border-[#00C853] bg-[#00C853] text-white"
                            : "border-black/25 bg-white text-black/70"
                        }`}
                      >
                        {checked ? "✓" : ""}
                      </span>
                      <h3 className="text-lg font-semibold tracking-wide">
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
                            className="rounded-full border border-black/15 bg-white px-3 py-1 text-[11px] text-black/80 hover:border-[#00C853] hover:text-[#00C853]"
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
          <section className="mt-12">
            {!hasConfirmedOnboarding ? (
              <div className="rounded-xl border border-black/10 bg-black/[0.02] p-6">
                <h2 className="text-lg font-semibold sm:text-xl">
                  You’re Ready to Start
                </h2>

                <button
                  type="button"
                  disabled={!completedSteps.book}
                  onClick={() => setHasConfirmedOnboarding(true)}
                  className={`mt-4 rounded-full px-5 py-2 text-sm font-semibold ${
                    completedSteps.book
                      ? "bg-[#00C853] text-black hover:bg-[#00b648]"
                      : "bg-black/5 text-black/40 cursor-not-allowed"
                  }`}
                >
                  I’ve Completed My Onboarding
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-[#00C853]/40 bg-[#00C853]/10 p-6">
                <h2 className="text-lg font-semibold">
                  You’re all set.
                </h2>
                <p className="mt-2 text-sm text-black/75">
                  You’ll see your program in the app before your first session.
                </p>
              </div>
            )}
          </section>

        </div>
      </section>

      {/* BOOKING MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setShowBookingModal(false)}
              className="absolute right-4 top-4 text-xs text-black/50 hover:text-black"
            >
              Close
            </button>

            <h3 className="text-lg font-semibold mb-4">
              Book Your First Session
            </h3>

            <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
              <iframe
                src="https://cal.com/human-pea-28vrwm/fitness-assessment"
                title="Book your first session"
                className="h-[500px] w-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
