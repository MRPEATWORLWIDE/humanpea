import React from "react";
import Link from "next/link";

export default function VistaGymTestPage() {
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
          --hp-section-pad-x-lg: 1.5rem;
          --hp-header-h: 64px;
          --hp-hero-min-h: 36vh;
          --hp-hero-max-w: 920px;
          --hp-grid-gap: 1.25rem;
          --hp-card-pad: 1.25rem;
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

          <div className="flex items-center gap-4 text-xs text-black/60">
            <span>00C853 / LIMITED SERIES</span>
            <Link
              href="/pt-packages/onboarding"
              className="text-[11px] underline-offset-2 hover:underline hover:text-black"
            >
              Onboard now
            </Link>
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

          <div className="mt-5">
            <Link
              href="/pt-packages/onboarding"
              className="inline-flex items-center justify-center rounded-md border border-black/15 px-4 py-2 text-sm font-medium text-black hover:bg-black/[0.03] transition"
            >
              Onboard now
            </Link>
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

            {/* LEFT GRID */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-[var(--hp-grid-gap)]">

              {/* VISTA_01 */}
              <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
                <div>
                  <h3 className="text-lg font-semibold tracking-wide">VISTA_01</h3>
                  <p className="mt-2 text-sm text-black/75">
                    1 Session | Vista Gym | 60 Minute Training System
                  </p>
                </div>
                <div>
                  <div className="mt-6 text-2xl font-bold">£60</div>
                  <div className="mt-4">
                    <Link href="/form" className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition">
                      Buy now
                    </Link>
                  </div>
                </div>
              </article>

              {/* VISTA_02 */}
              <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
                <div>
                  <h3 className="text-lg font-semibold tracking-wide">VISTA_02</h3>
                  <p className="mt-2 text-sm text-black/75">
                    10 Sessions | Vista Gym | Transformation | Precision Coaching | Adaptive Programming | Mesocycle
                  </p>
                  <p className="mt-3 text-sm text-black/65">
                    Designed for transformation. Feedback, accountability, measurable output.
                  </p>
                </div>
                <div>
                  <div className="mt-6 text-2xl font-bold">£540</div>
                  <div className="mt-4">
                    <Link href="/form" className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition">
                      Buy now
                    </Link>
                  </div>
                </div>
              </article>

              {/* VISTA_03 */}
              <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
                <div>
                  <h3 className="text-lg font-semibold tracking-wide">VISTA_03</h3>
                  <p className="mt-2 text-sm text-black/75">
                    1 Session | Vista Gym | 30 Minute Training System
                  </p>
                </div>
                <div>
                  <div className="mt-6 text-2xl font-bold">£40</div>
                  <div className="mt-4">
                    <Link href="/form" className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition">
                      Buy now
                    </Link>
                  </div>
                </div>
              </article>

              {/* VISTA_04 */}
              <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
                <div>
                  <h3 className="text-lg font-semibold tracking-wide">VISTA_04</h3>
                  <p className="mt-2 text-sm text-black/75">
                    10 Sessions | Vista Gym | Balanced Progression | Rehabilitation | Mobility
                  </p>
                  <p className="mt-3 text-sm text-black/65">
                    Designed for light mobility exercises, injury rehabilitation, familiarity with gym environment and equipment.
                  </p>
                </div>
                <div>
                  <div className="mt-6 text-2xl font-bold">£350</div>
                  <div className="mt-4">
                    <Link href="/form" className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition">
                      Buy now
                    </Link>
                  </div>
                </div>
              </article>

            </div>

            {/* RIGHT CARD */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">VISTA_05</h3>
                <p className="mt-2 text-sm text-black/75">
                  12-Week Transformation Programme
                </p>
                <p className="mt-3 text-sm text-black/65">
                  24 Sessions (2x per week) | Structured progression | Nutrition guidance (7 days) | Priority scheduling
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for body recomposition, measurable progress on areas such as structured fat loss, strength development and SMART goals over 12 focused weeks.
                </p>
              </div>
              <div>
                <div className="mt-6 text-2xl font-bold">£1550</div>
                <div className="mt-4">
                  <Link href="/form" className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition">
                    Buy now
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
