import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="min-h-screen bg-white text-black"
      style={{
        fontFamily:
          "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, -apple-system",
      }}
    >
      {/* Layout variables aligned with your /home page */}
      <style>{`
        :root {
          --hp-container-max: 1120px;
          --hp-section-pad-x: 1.25rem;
          --hp-section-pad-x-lg: 1.5rem;
          --hp-header-h: 64px;
          --hp-hero-max-w: 920px;
          --hp-grid-gap: 1.25rem;
          --hp-card-pad: 1.25rem;
          --hp-card-radius: 1rem;
          --hp-footer-h: 72px;
          --hp-accent: #00C853;
          --hp-muted: #666666;
          --hp-beige: #E8D7A8;
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
            <nav className="hidden sm:flex items-center gap-4">
              <Link className="hover:underline underline-offset-4" href="/home">
                Packages
              </Link>
              <Link
                className="hover:underline underline-offset-4"
                href="/pt-packages/onboarding"
              >
                Onboarding
              </Link>
              <Link className="hover:underline underline-offset-4" href="/form">
                Enquire
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-black/10">
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "3rem var(--hp-section-pad-x)",
          }}
        >
          <div className="max-w-[var(--hp-hero-max-w)]">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              Private Studio • London
            </p>

            <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[650] leading-tight">
              HUMAN PEA LONDON
              <span className="block mt-2 text-black/60">
                Strength • Conditioning • Precision Coaching
              </span>
            </h1>

            <p className="mt-5 max-w-prose text-sm text-black/70">
              I’m Josh — a coach focused on building capable bodies: stronger,
              more athletic, and resilient. HumanPea is a private training studio
              built around structure, accountability, and measurable progress.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/home"
                className="inline-flex items-center justify-center rounded-lg border border-black/15 bg-black/[0.02] px-5 py-2.5 text-sm font-medium hover:border-black/30 transition"
              >
                View Packages
              </Link>

              <Link
                href="/pt-packages/onboarding"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--hp-accent)] bg-[var(--hp-accent)]/10 px-5 py-2.5 text-sm font-medium hover:bg-[var(--hp-accent)]/20 transition"
              >
                Start Onboarding
              </Link>

              <Link
                href="/form"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--hp-accent)] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#00b648] transition"
              >
                Enquire
              </Link>
            </div>

            {/* TODO: Add a short “studio address” line once you want it public */}
            <p className="mt-5 text-xs text-black/50">
              {/* Studio location intentionally minimal for now. */}
              By appointment only • Private studio training
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT / WHAT YOU GET */}
      <section className="border-b border-black/10">
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "2.5rem var(--hp-section-pad-x)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--hp-grid-gap)]">
            <article
              className="rounded-xl border border-black/10 bg-black/[0.02]"
              style={{ padding: "var(--hp-card-pad)" }}
            >
              <h3 className="text-lg font-semibold tracking-wide">
                Private Studio
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Focused sessions. No crowds. Coaching quality stays high.
              </p>
            </article>

            <article
              className="rounded-xl border border-black/10 bg-black/[0.02]"
              style={{ padding: "var(--hp-card-pad)" }}
            >
              <h3 className="text-lg font-semibold tracking-wide">
                Structure &amp; Accountability
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Clear programming, simple targets, and consistent follow-through.
              </p>
            </article>

            <article
              className="rounded-xl border border-black/10 bg-black/[0.02]"
              style={{ padding: "var(--hp-card-pad)" }}
            >
              <h3 className="text-lg font-semibold tracking-wide">
                Measurable Progress
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Strength markers, photos, habits, and performance tracked over time.
              </p>
            </article>
          </div>

          {/* Signature strip */}
          <div className="mt-6 rounded-xl border border-black/10 bg-[var(--hp-beige)]/35 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-black/60">
              The HumanPea standard
            </p>
            <p className="mt-2 text-sm text-black/80 max-w-3xl">
              Train like an athlete, even if you’re starting from zero: build
              strength, conditioning, mobility, and confidence — without noise.
            </p>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section>
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "var(--hp-container-max)",
            padding: "2.5rem var(--hp-section-pad-x) 3rem",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold">
            How to Start
          </h2>
          <p className="mt-2 text-sm text-black/70 max-w-prose">
            If you’re ready, the flow is simple.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-[var(--hp-grid-gap)]">
            <article
              className="rounded-xl border border-black/10 bg-black/[0.02]"
              style={{ padding: "var(--hp-card-pad)" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                Step 01
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-wide">
                Choose a Package
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Pick the tier that matches your schedule and target.
              </p>
              <Link
                href="/home"
                className="mt-4 inline-flex text-sm font-medium underline underline-offset-4 text-black/70 hover:text-black"
              >
                View packages
              </Link>
            </article>

            <article
              className="rounded-xl border border-black/10 bg-black/[0.02]"
              style={{ padding: "var(--hp-card-pad)" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                Step 02
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-wide">
                Complete Onboarding
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Apps, setup, and booking. Keeps your first session smooth.
              </p>
              <Link
                href="/pt-packages/onboarding"
                className="mt-4 inline-flex text-sm font-medium underline underline-offset-4 text-black/70 hover:text-black"
              >
                Start onboarding
              </Link>
            </article>

            <article
              className="rounded-xl border border-black/10 bg-black/[0.02]"
              style={{ padding: "var(--hp-card-pad)" }}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                Step 03
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-wide">
                Enquire / Confirm
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Send your details and we’ll lock in your start point.
              </p>
              <Link
                href="/form"
                className="mt-4 inline-flex text-sm font-semibold text-black bg-[var(--hp-accent)] px-4 py-2 rounded-lg hover:bg-[#00b648] transition"
              >
                Enquire
              </Link>
            </article>
          </div>

          <p className="mt-8 text-xs text-black/50">
            {/* TODO: If you want, add social proof here (client quote, before/after policy, etc.) */}
            Built in London • Private sessions • Limited capacity
          </p>
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
