import React from "react";
import Link from "next/link";

export default function MarchPromoPage() {

  if (new Date() >= new Date("2026-04-02")) {
    if (typeof window !== "undefined") {
      window.location.href = "https://humanpea.com/vista-gym";
    }
  }

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

      {/* PROMO BANNER */}
      <section className="bg-[#00C853] text-black text-center py-2 text-sm font-medium">
        LIMITED MARCH OFFER — VISTA RESIDENTS ONLY
      </section>

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
            MARCH TRAINING PROMOTION (VISTA RESIDENTS)
          </h1>

          <p className="mt-4 max-w-prose text-sm text-black/70">
            Limited March promotion for Vista residents. Structured training
            with exclusive introductory offers.
          </p>
        </div>
      </section>

      {/* PROMO GRID */}
      <section className="py-10 border-b border-black/10">
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "0 var(--hp-section-pad-x)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-[var(--hp-grid-gap)]">

            {/* MARCH_STARTER */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  MARCH_STARTER
                </h3>

                <p className="mt-2 text-sm text-black/75">
                  5 Sessions | Vista Gym | Training Foundation | Precision Coaching | Progressive Structure | Baseline Development
                </p>

                <p className="mt-3 text-sm text-black/65">
                  Designed for residents starting their training journey.
                  Structured sessions, measurable progress, clear starting point.
                </p>
              </div>

              <div className="mt-6">
                <div className="text-2xl font-bold">£270</div>

                <div className="mt-3 flex gap-3 flex-wrap">

                  <Link
                    href="https://buy.stripe.com/5kQaEXfXwcT459P0EP67S06"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
                    Buy now
                  </Link>

                  <span className="inline-flex items-center rounded-lg border border-red-500 text-red-500 px-4 py-2 text-xs">
                    Ends March 31st 2026
                  </span>

                </div>
              </div>
            </article>

            {/* MARCH_45 */}
            <article className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  MARCH_45
                </h3>

                <p className="mt-2 text-sm text-black/75">
                  10 Sessions | Vista Gym | Flexible Format | Precision Coaching | Adaptive Programming | Time-Efficient Training
                </p>

                <p className="mt-3 text-sm text-black/65">
                  Designed for residents with demanding schedules who want
                  structured training that fits efficiently into their day.
                </p>
              </div>

              <div className="mt-6">
                <div className="text-2xl font-bold">£459</div>

                <div className="mt-3 flex gap-3 flex-wrap">

                  <Link
                    href="https://buy.stripe.com/9B67sL3aK2eq59P3R167S07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
                  >
                    Buy now
                  </Link>

                  <span className="inline-flex items-center rounded-lg border border-red-500 text-red-500 px-4 py-2 text-xs">
                    Ends March 31st 2026
                  </span>

                </div>
              </div>
            </article>

          </div>
        </div>
      </section>
    </main>
  );
}