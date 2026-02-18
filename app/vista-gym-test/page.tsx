import React from "react";
import Link from "next/link";

export default function VistaGymTest() {
  return (
    <main
      className="bg-white text-black"
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
          --hp-hero-min-h: 36vh;
          --hp-hero-max-w: 920px;
          --hp-grid-gap: 1.25rem;
          --hp-card-min-h: 420px;
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
          className="mx-auto flex flex-col justify-center"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "3rem var(--hp-section-pad-x)",
          }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight max-w-[var(--hp-hero-max-w)]">
            VISTA GYM TRAINING SERIES
          </h1>
          <p className="mt-4 text-sm text-black/70">
            Structured • Progressive • Performance-Focused
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
            <article
              className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  10 Session Pack
                </h3>
                <p className="mt-2 text-sm text-black/70">
                  Structured progression at Vista Gym.
                </p>
              </div>

              <div>
                <div className="mt-6 text-2xl font-bold">
                  £540.00
                </div>
                <div className="mt-4">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center justify-center rounded-lg border border-[var(--hp-accent)] bg-[var(--hp-accent)]/10 px-4 py-2 text-sm font-medium hover:bg-[var(--hp-accent)]/20 transition"
                  >
                    Start
                  </Link>
                </div>
              </div>
            </article>

            <article
              className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  Single Session
                </h3>
                <p className="mt-2 text-sm text-black/70">
                  Individual Vista Gym session.
                </p>
              </div>

              <div>
                <div className="mt-6 text-2xl font-bold">
                  £60.00
                </div>
                <div className="mt-4">
                  <Link
                    href="/onboarding"
                    className="inline-flex items-center justify-center rounded-lg border border-black/20 px-4 py-2 text-sm font-medium hover:border-black/40 transition"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            </article>

            <article
              className="flex flex-col justify-between rounded-xl border border-black/10 bg-black/5"
              style={{
                minHeight: "var(--hp-card-min-h)",
                padding: "var(--hp-card-pad)",
              }}
            >
              <div>
                <h3 className="text-lg font-semibold tracking-wide">
                  30 Min Sessions
                </h3>
                <p className="mt-2 text-sm text-black/70">
                  Short-format, high-intensity blocks.
                </p>
              </div>

              <div>
                <div className="mt-6 text-2xl font-bold">
                  £35.00
                </div>
                <div className="mt-4">
                  <Link
                    href="/onboarding"
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
    </main>
  );
}
