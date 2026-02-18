"use client";

import Link from "next/link";

export default function VistaGymPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">

        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Vista Gym — London
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              VISTA GYM TRAINING PACKAGES
            </h1>

            <p className="max-w-xl text-sm text-neutral-300">
              Structured personal training delivered within Vista Gym.
              Focused programming, accountability, and measurable progression.
            </p>

            <div className="pt-2">
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center rounded-full bg-[#00C853] px-5 py-2.5 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-[#00b648]"
              >
                Onboard now
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 text-right">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-[#00C853]" />
              <span>VISTA SERIES</span>

              <Link
                href="/onboarding"
                className="text-[10px] font-medium text-neutral-300 underline-offset-4 hover:text-[#00C853] hover:underline"
              >
                Onboard now
              </Link>
            </div>
          </div>

        </header>

        {/* Pricing Cards Go Here */}

      </main>
    </div>
  );
}
