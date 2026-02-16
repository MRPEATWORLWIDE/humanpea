import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1120px] px-5 py-12">
          <div className="max-w-[920px]">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              Private Studio • London
            </p>

            <h1 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
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
                href="/hybrid-pt"
                className="inline-flex items-center justify-center rounded-lg border border-black/15 bg-black/[0.02] px-5 py-2.5 text-sm font-medium hover:border-black/30 transition"
              >
                View Packages
              </Link>

              <Link
                href="/pt-packages/onboarding"
                className="inline-flex items-center justify-center rounded-lg border border-[#00C853] bg-[#00C853]/10 px-5 py-2.5 text-sm font-medium hover:bg-[#00C853]/20 transition"
              >
                Start Onboarding
              </Link>

              <Link
                href="/form"
                className="inline-flex items-center justify-center rounded-lg bg-[#00C853] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#00b648] transition"
              >
                Enquire
              </Link>
            </div>

            <p className="mt-5 text-xs text-black/50">
              By appointment only • Private studio training
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-[1120px] px-5 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="rounded-xl border border-black/10 bg-black/[0.02] p-5">
              <h3 className="text-lg font-semibold tracking-wide">
                Private Studio
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Focused sessions. No crowds. Coaching quality stays high.
              </p>
            </article>

            <article className="rounded-xl border border-black/10 bg-black/[0.02] p-5">
              <h3 className="text-lg font-semibold tracking-wide">
                Structure & Accountability
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Clear programming, simple targets, and consistent follow-through.
              </p>
            </article>

            <article className="rounded-xl border border-black/10 bg-black/[0.02] p-5">
              <h3 className="text-lg font-semibold tracking-wide">
                Measurable Progress
              </h3>
              <p className="mt-2 text-sm text-black/70">
                Strength markers, photos, habits, and performance tracked over time.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
