import React from "react";
import Link from "next/link";

export default function PrivateGymPage() {
  return (
    <main
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

      {/* HERO */}
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
            <span className="opacity-70">&apos;FUNCTIONAL&apos;</span> PRIVATE GYM TRAINING SYSTEM
          </h1>
          <p className="mt-4 max-w-prose text-sm text-black/70">
            1-1 PT sessions from my private garage gym. Structured coaching, progressive training, and transformation-focused support.
          </p>
        </div>
      </section>

      {/* PRICING GRID */}
      <section className="py-10 border-b border-black/10">
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "0 var(--hp-section-pad-x)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-[var(--hp-grid-gap)]">
            {/* STARTER */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">STARTER</h3>
                <p className="mt-2 text-sm text-black/75">
                  5 Sessions | Private Gym | Technique | Baseline | Entry-Level Structure
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for those looking to build momentum, improve form, and establish a strong training foundation.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£200</div>
                <div className="mt-3">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
                    Buy now
                  </Link>
                </div>
              </div>
            </article>

            {/* CONSISTENCY */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">CONSISTENCY</h3>
                <p className="mt-2 text-sm text-black/75">
                  10 Sessions | Private Gym | Structured Progression | Coaching | Accountability
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for building consistency through structured training, improved movement quality, and light nutrition guidance.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£375</div>
                <div className="mt-3">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
                    Buy now
                  </Link>
                </div>
              </div>
            </article>

            {/* TRANSFORMATION */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">TRANSFORMATION</h3>
                <p className="mt-2 text-sm text-black/75">
                  20 Sessions | Private Gym | Transformation | Precision Coaching | Nutrition Plan
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for measurable body composition change, progressive training, full nutrition setup, weekly check-ins, and progress tracking.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£560</div>
                <div className="mt-3">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
                    Buy now
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}