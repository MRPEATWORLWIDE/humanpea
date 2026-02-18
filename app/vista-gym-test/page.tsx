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
          --hp-container-max: 1320px;
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
            <span className="opacity-70">'FUNCTIONAL'</span> IN-PERSON TRAINING SYSTEM
          </h1>
          <p className="mt-4 max-w-prose text-sm text-black/70">
            1-1 PT Sessions for Vista Residents only. For sessions away from Vista please click here.
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

            {/* VISTA_01 */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">VISTA_01</h3>
                <p className="mt-2 text-sm text-black/75">
                  1 Session | 60 minute Training System
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£60</div>
                <div className="mt-3">
                  <Link
                    href="/form"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
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
                  10 Sessions | 60 minutes | Transformation | Precision Coaching | Adaptive Programming | Mesocycle
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for transformation. Feedback, accountability, measurable output.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£540</div>
                <div className="mt-3">
                  <Link
                    href="/form"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
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
                  1 Session | 30 minute Training System
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£40</div>
                <div className="mt-3">
                  <Link
                    href="/form"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
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
                  10 Sessions | 30 minutes | Balanced Progression | Rehabilitation | Mobility
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for light mobility exercises, injury rehabilitation,
                  familiarity with gym environment and equipment.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£350</div>
                <div className="mt-3">
                  <Link
                    href="/form"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
                    Buy now
                  </Link>
                </div>
              </div>
            </article>

            {/* VISTA_05 */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">VISTA_05</h3>
                <p className="mt-2 text-sm text-black/75">
                  12-Week Transformation Programme
                </p>
                <p className="mt-2 text-sm text-black/75">
                  24 Sessions | Structured progression | Nutrition guidance [7 days] | Priority scheduling
                </p>
                <p className="mt-3 text-sm text-black/65">
                  Designed for body recomposition, measurable progress on structured fat loss,
                  strength development and SMART goals over 12 focused weeks.
                </p>
              </div>
              <div className="mt-6">
                <div className="text-2xl font-bold">£1550</div>
                <div className="mt-3">
                  <Link
                    href="/form"
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
