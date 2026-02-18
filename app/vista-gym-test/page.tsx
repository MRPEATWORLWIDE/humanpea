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
      {/* Layout Variables */}
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

          <div className="flex items-center gap-4 text-xs text-black/60">
            <span>VISTA SERIES</span>
            <Link
              href="/form"
              className="text-[11px] underline-offset-2 hover:underline hover:text-black"
            >
              Buy now
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
            VISTA GYM TRAINING SYSTEM
          </h1>
          <p className="mt-4 max-w-prose text-sm text-black/70">
            Structured • Progressive • Performance Focused
          </p>

          <div className="mt-5">
            <Link
              href="/form"
              className="inline-flex items-center justify-center rounded-md border border-black/15 px-4 py-2 text-sm font-medium text-black hover:bg-black/[0.03] transition"
            >
              Buy now
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

            {/* CARD 1 — VISTA_01 + VISTA_02 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div className="space-y-6">

                <div>
                  <h3 className="text-lg font-semibold tracking-wide">VISTA_01</h3>
                  <p className="mt-2 text-sm text-black/75">
                    1 Session | Vista Gym | 60 Minute Training Systems
                  </p>
                  <div className="mt-3 text-2xl font-bold">£60.00</div>
                  <Link
                    href="/form"
                    className="mt-3 inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                  >
                    Buy Now
                  </Link>
                </div>

                <hr className="border-black/10" />

                <div>
                  <h3 className="text-lg font-semibold tracking-wide">VISTA_02</h3>
                  <p className="mt-2 text-sm text-black/75">
                    10 Sessions | Vista Gym | Transformation | Precision Coaching | Adaptive Programming | Mesocycle
                  </p>
                  <p className="mt-2 text-sm text-black/65">
                    Designed for transformation. Feedback, accountability, measurable output.
                  </p>
                  <div className="mt-3 text-2xl font-bold text-[var(--hp-accent)]">
                    £540.00
                  </div>
                  <Link
                    href="/form"
                    className="mt-3 inline-flex items-center justify-center rounded-lg border border-[var(--hp-accent)] bg-[var(--hp-accent)]/10 px-4 py-2 text-sm font-medium hover:bg-[var(--hp-accent)]/20 transition"
                  >
                    Buy Now
                  </Link>
                </div>

              </div>
            </article>

            {/* CARD 2 — VISTA_03 + VISTA_04 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div className="space-y-6">

                <div>
                  <h3 className="text-lg font-semibold tracking-wide">VISTA_03</h3>
                  <p className="mt-2 text-sm text-black/75">
                    1 Session | Vista Gym | 30 Minute Training Systems
                  </p>
                  <div className="mt-3 text-2xl font-bold">£40.00</div>
                  <Link
                    href="/form"
                    className="mt-3 inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                  >
                    Buy Now
                  </Link>
                </div>

                <hr className="border-black/10" />

                <div>
                  <h3 className="text-lg font-semibold tracking-wide">VISTA_04</h3>
                  <p className="mt-2 text-sm text-black/75">
                    10 Sessions | Vista Gym | Balanced Progression | Rehabilitation | Mobility
                  </p>
                  <p className="mt-2 text-sm text-black/65">
                    Designed for light mobility exercises, injury rehabilitation, familiarity with gym environment and equipment.
                  </p>
                  <div className="mt-3 text-2xl font-bold">£350.00</div>
                  <Link
                    href="/form"
                    className="mt-3 inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                  >
                    Buy Now
                  </Link>
                </div>

              </div>
            </article>

            {/* CARD 3 — VISTA_05 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">VISTA_05</h3>
                <p className="mt-2 text-sm text-black/75">
                  12-Week Transformation Programme
                </p>
                <p className="mt-2 text-sm text-black/75">
                  24 Sessions (2x per week) | Structured Progression | Nutrition Guidance (7 Days) | Priority Scheduling
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for body recomposition, measurable progress on structured fat loss, strength development and SMART goals over 12 focused weeks.
                </p>
              </div>

              <div>
                <div className="mt-6 text-2xl font-bold text-[var(--hp-accent)]">
                  £1550.00
                </div>
                <div className="mt-4">
                  <Link
                    href="/form"
                    className="inline-flex items-center justify-center rounded-lg border border-[var(--hp-accent)] bg-[var(--hp-accent)]/10 px-4 py-2 text-sm font-medium hover:bg-[var(--hp-accent)]/20 transition"
                  >
                    Buy Now
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
