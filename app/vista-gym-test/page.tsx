import React from "react";
import Link from "next/link";

export default function VistaGymTest() {
  return (
    <main
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily:
          "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, -apple-system",
      }}
    >
      {/* Layout proportions (UNCHANGED FROM LEGACY) */}
      <style>{`
        :root {
          --hp-container-max: 1120px;
          --hp-section-pad-x: 1.25rem;
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

      {/* HERO (Legacy structure preserved) */}
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
              href="/pt-packages/onboarding"
              className="inline-flex items-center justify-center rounded-md border border-black/15 px-4 py-2 text-sm font-medium text-black hover:bg-black/[0.03] transition"
            >
              Buy now
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING GRID (3 BOX LEGACY STRUCTURE PRESERVED) */}
      <section className="py-8 sm:py-10 md:py-12 border-b border-black/10">
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "0 var(--hp-section-pad-x)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--hp-grid-gap)]">

            {/* BOX 1 — VISTA_01 + VISTA_02 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  VISTA_01
                </h3>
                <p className="mt-2 text-sm text-black/75">
                  1 Session • Vista Gym • 60 Minutes Training Systems
                </p>
                <p className="mt-3 text-sm text-black/65">
                  £60
                </p>

                <div className="mt-6 border-t border-black/10 pt-6">
                  <h3 className="text-lg font-semibold tracking-wide">
                    VISTA_02
                  </h3>
                  <p className="mt-2 text-sm text-black/75">
                    10 Sessions • Vista Gym • Transformation • Precision Coaching • Adaptive Programming • Mesocycle
                  </p>
                  <p className="mt-3 text-sm text-black/65">
                    Designed for transformation. Feedback, accountability, measurable output.
                  </p>
                  <p className="mt-3 text-sm font-semibold">
                    £540
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/form"
                  className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                >
                  Buy now
                </Link>
              </div>
            </article>

            {/* BOX 2 — VISTA_03 + VISTA_04 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  VISTA_03
                </h3>
                <p className="mt-2 text-sm text-black/75">
                  1 Session • Vista Gym • 30 Minute Training Systems
                </p>
                <p className="mt-3 text-sm text-black/65">
                  £40
                </p>

                <div className="mt-6 border-t border-black/10 pt-6">
                  <h3 className="text-lg font-semibold tracking-wide">
                    VISTA_04
                  </h3>
                  <p className="mt-2 text-sm text-black/75">
                    10 Sessions • Vista Gym • Balanced Progression • Rehabilitation • Mobility
                  </p>
                  <p className="mt-3 text-sm text-black/65">
                    Designed for light mobility exercises, injury rehabilitation, familiarity with gym environment and equipment.
                  </p>
                  <p className="mt-3 text-sm font-semibold">
                    £350
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/form"
                  className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                >
                  Buy now
                </Link>
              </div>
            </article>

            {/* BOX 3 — VISTA_05 */}
            <article
              className="relative flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  VISTA_05
                </h3>
                <p className="mt-2 text-sm text-black/75">
                  12-Week Transformation Programme
                </p>
                <p className="mt-3 text-sm text-black/65">
                  24 Sessions (2x per week) • Structured progression • Nutrition guidance (7 days) • Priority scheduling
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for body recomposition, measurable progress on structured fat loss, strength development and SMART goals over 12 focused weeks.
                </p>

                <p className="mt-6 text-lg font-bold">
                  £1550
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href="/form"
                  className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                >
                  Buy now
                </Link>
              </div>
            </article>

          </div>
        </div>
      </section>
    </main>
  );
}
