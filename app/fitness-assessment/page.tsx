export const dynamic = "force-dynamic";

import React from "react";

export default function FitnessAssessmentPage() {
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
            30-Min <span className="opacity-70">&apos;FITNESS&apos;</span> ASSESSMENT
          </h1>

          <p className="mt-4 max-w-prose text-sm text-black/70">
            A focused 1-1 session to assess your current level, movement patterns and training direction.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-10 border-b border-black/10">
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "0 var(--hp-section-pad-x)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--hp-grid-gap)]">

            {/* LEFT SIDE (KEPT AS CARD) */}
            <article className="rounded-xl border border-black/10 bg-black/5 p-[var(--hp-card-pad)]">
              <h3 className="text-lg font-semibold tracking-wide">
                ASSESSMENT OVERVIEW
              </h3>

              <ul className="mt-4 text-sm text-black/75 space-y-2">
                <li>• Movement & mobility assessment</li>
                <li>• Strength baseline</li>
                <li>• Goal clarification</li>
                <li>• Personalised training direction</li>
              </ul>

              <p className="mt-4 text-sm text-black/65">
                Designed for individuals looking to build structure, improve performance and gain clarity on their training approach.
              </p>

              {/* CTA */}
              <a
                href="mailto:hello@humanpea.com"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-[#00C853] px-4 py-2 text-sm font-medium text-black hover:bg-[#00C853]/10 transition"
              >
                Enquire
              </a>
            </article>

            {/* RIGHT SIDE (NO CARD) */}
            <div>
              <iframe
                src="https://cal.com/human-pea-28vrwm/fitness-assessment?embed=true"
                width="100%"
                height="600"
                frameBorder="0"
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}