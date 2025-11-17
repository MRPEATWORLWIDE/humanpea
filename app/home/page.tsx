import React from "react";
import Link from "next/link";

// HumanPea – Light Theme Home Page
// Internal navigation for Claim / Enquire buttons → /form

export default function HumanPeaLanding() {
  return (
    <main
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily:
          "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, -apple-system",
      }}
    >
      {/* Layout proportions */}
      <style>{`
        :root {
          --hp-container-max: 1120px;
          --hp-section-pad-x: 1.25rem;
          --hp-section-pad-x-lg: 1.5rem;
          --hp-header-h: 64px;
          --hp-hero-min-h: 36vh;
          --hp-hero-max-w: 920px;
          --hp-grid-gap: 1.25rem;
          --hp-card-min-h: 420px;
          --hp-card-pad: 1.25rem;
          --hp-card-radius: 1rem;
          --hp-footer-h: 72px;
          --hp-accent: #00C853;
          --hp-muted: #666666;
        }
      `}</style>

      {/* HEADER */}
      <header
        className="sticky top-0 z-30 border-b border-black/10 backdrop-blur supports-[backdrop-filter]:bg-white/60"
        style={{ height: "var(--hp-header-h)" }}
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

          {/* Right meta + top-right CTA */}
          <div className="flex items-center gap-4 text-xs text-black/60">
            <span>00C853 / LIMITED SERIES</span>
            <Link
              href="/pt-packages/onboarding"
              className="text-[11px] underline-offset-2 hover:underline hover:text-black"
            >
              Onboard now
            </Link>
            {/*
              TODO (plans):
              Later you can pass a plan, e.g.
              href="/pt-packages/onboarding?plan=HYBRID_01"
            */}
          </div>
        </div>
      </header>

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
            <span className="opacity-70">&apos;FUNCTIONAL&apos;</span> HYBRID TRAINING SYSTEM
          </h1>
          <p className="mt-4 max-w-prose text-sm text-black/70">
            Private Studio • Precision Coaching • Adaptive Programming
          </p>

          {/* Hero CTA — subtle button under subtitle */}
          <div className="mt-5">
            <Link
              href="/pt-packages/onboarding"
              className="inline-flex items-center justify-center rounded-md border border-black/15 px-4 py-2 text-sm font-medium text-black hover:bg-black/[0.03] transition"
            >
              Onboard now
            </Link>
            {/*
              TODO (plans):
              Swap to a specific plan later if needed:
              href="/pt-packages/onboarding?plan=HYBRID_01"
            */}
          </div>
        </div>
      </section>

      {/* PRICING GRID */}
      <section className="py-8 sm:py-10 md:py-12 border-b border-black/10">
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "0 var(--hp-section-pad-x)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--hp-grid-gap)]">
            {/* CARD 1 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              {/* Promo badge */}
              <div className="absolute right-3 top-3">
                <span className="rounded-full border border-black/15 bg-[var(--hp-accent)]/10 px-3 py-1 text-xs font-medium tracking-wide text-[var(--hp-accent)]">
                  Promo
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold tracking-wide">HYBRID_01</h3>
                <p className="mt-2 text-sm text-black/75">
                  8 Sessions / 2x Per Week / Private Studio
                </p>
                <p className="mt-3 text-sm text-black/65 max-w-prose">
                  Entry-level structure to rebuild consistency. Foundation, discipline, routine.
                </p>
              </div>

              <div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl line-through opacity-60">£450.00</span>
                  <span className="text-2xl font-bold text-[var(--hp-accent)]">£0.00</span>
                </div>
                <div className="mt-4">
                  <Link
                    href="/form"
                    className="inline-flex items-center justify-center rounded-lg border border-[var(--hp-accent)] bg-[var(--hp-accent)]/10 px-4 py-2 text-sm font-medium hover:bg-[var(--hp-accent)]/20 transition"
                  >
                    Claim
                  </Link>
                </div>
              </div>
            </article>

            {/* CARD 2 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">HYBRID_02</h3>
                <p className="mt-2 text-sm text-black/75">
                  12 Sessions / 3x Per Week / Private Studio / Balanced Progression
                </p>
                <p className="mt-3 text-sm text-black/65 max-w-prose">
                  Designed for transformation. Feedback, accountability, measurable output.
                </p>
              </div>

              <div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl font-bold">£600.00</span>
                </div>
                <div className="mt-4">
                  <Link
                    href="/form"
                    className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>

            {/* CARD 3 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">HYBRID_03</h3>
                <p className="mt-2 text-sm text-black/75">
                  16 Sessions / 4x Per Week / Private Studio / Performance Tier
                </p>
                <p className="mt-3 text-sm text-black/65 max-w-prose">
                  Precision coaching. Adaptive programming. Maximum accountability.
                </p>
              </div>

              <div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl font-bold">£750.00</span>
                </div>
                <div className="mt-4">
                  <Link
                    href="/form"
                    className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>
          </div>
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
    </main>
  );
}
