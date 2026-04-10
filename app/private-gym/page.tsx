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
      <section className="border-b border-black/10" style={{ minHeight: "var(--hp-hero-min-h)" }}>
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
            1-1 PT sessions from a private garage-based training studio. Structured coaching, progressive training, and transformation-focused support.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--hp-grid-gap)]">

            {/* STARTER_30 */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">STARTER_30</h3>
                <p className="mt-2 text-sm text-black/75">
                  5 Sessions | 30 Minutes | Private Gym | Technique | Baseline
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed to build initial momentum, improve movement quality, and establish a strong training foundation. Ideal for those starting out or returning to training.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£150</div>
                <div className="mt-3">
                  <Link
                    href="https://buy.stripe.com/7sY3cvaDc5qC9q52MX67S0a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
                    Buy now
                  </Link>
                </div>
              </div>
            </article>

            {/* CONSISTENCY_45 */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">CONSISTENCY_45</h3>
                <p className="mt-2 text-sm text-black/75">
                  10 Sessions | 45 Minutes | Private Gym | Structured Progression | Coaching
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for building consistency through structured training and progressive overload. Includes light nutrition guidance with simple calorie ranges, protein targets, and key habits to support your training.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£375</div>
                <div className="mt-3">
                  <Link
                    href="https://buy.stripe.com/aFa7sL26GcT4gSxgDN67S09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
                    Buy now
                  </Link>
                </div>
              </div>
            </article>

            {/* TRANSFORMATION_60 */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">TRANSFORMATION_60</h3>
                <p className="mt-2 text-sm text-black/75">
                  20 Sessions | 60 Minutes | Private Gym | Transformation | Precision Coaching | Nutrition System
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for measurable body composition change. Includes a full nutrition plan with exact calorie targets, macros, structured meal setup, weekly check-ins, and ongoing adjustments to ensure consistent progress.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£560</div>
                <div className="mt-3">
                  <Link
                    href="https://buy.stripe.com/28EbJ1fXw4my6dT2MX67S08"
                    target="_blank"
                    rel="noopener noreferrer"
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