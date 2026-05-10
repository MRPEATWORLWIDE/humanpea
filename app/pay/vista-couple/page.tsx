"use client";

import React from "react";

export default function PayPage() {
  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily:
          "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, -apple-system",
      }}
    >
      <style>{`
        :root {
          --hp-container-max: 1120px;
          --hp-section-pad-x: 1.25rem;
          --hp-hero-min-h: 36vh;
          --hp-hero-max-w: 920px;
          --hp-grid-gap: 1.25rem;
          --hp-card-pad: 1.25rem;
          --hp-card-radius: 1rem;
          --hp-accent: #00C853;
        }
      `}</style>

      <section
        className="border-b border-black/10"
        style={{ minHeight: "var(--hp-hero-min-h)" }}
      >
        <div
          className="mx-auto flex h-full w-full flex-col justify-center"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "3rem var(--hp-section-pad-x)",
          }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[650] leading-tight max-w-[var(--hp-hero-max-w)]">
            VISTA_COUPLE
          </h1>

          <p className="mt-4 max-w-prose text-sm text-black/70">
            Structured partner training for Vista residents.
          </p>
        </div>
      </section>

      <section className="py-10 border-b border-black/10">
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "0 var(--hp-section-pad-x)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--hp-grid-gap)]">
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  VISTA_COUPLE_45
                </h3>

                <p className="mt-2 text-sm text-black/75">
                  10 Sessions | Vista Gym | Precision Coaching | Adaptive Programming | Mesocycle
                </p>

                <p className="mt-3 text-sm text-black/65">
                  45-minute couple training system designed for focused shared
                  sessions, consistent progression and structured coaching within
                  a shorter training format.
                </p>
              </div>

              <div className="mt-6">
                <div className="text-2xl font-bold">£620</div>
              </div>
            </article>

            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  VISTA_COUPLE_60
                </h3>

                <p className="mt-2 text-sm text-black/75">
                  10 Sessions | Vista Gym | Precision Coaching | Adaptive Programming | Mesocycle
                </p>

                <p className="mt-3 text-sm text-black/65">
                  60-minute couple training system designed for deeper coaching,
                  shared accountability and structured progression within the
                  same training session.
                </p>
              </div>

              <div className="mt-6">
                <div className="text-2xl font-bold">£720</div>
              </div>
            </article>

            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  Bank Transfer
                </h3>

                <p className="mt-2 text-sm text-black/75">
                  Please include the reference below when making your transfer so
                  your session block can be allocated correctly.
                </p>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black/60">Account Name</span>
                    <span className="font-medium">Joshua Peat</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-black/60">Sort Code</span>
                    <span className="font-medium">04-00-03</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-black/60">Account Number</span>
                    <span className="font-medium">68509836</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-black/60">Reference</span>
                    <span className="font-medium">COUPLE BLOCK</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => navigator.clipboard.writeText("COUPLE BLOCK")}
                  className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                >
                  Copy Payment Reference
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}