// app/pt-packages/hybrid/page.tsx
"use client";

import Link from "next/link";
// ... any other imports

export default function HybridPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        {/* Top section */}
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Functional Hybrid Training System
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              FUNCTIONAL HYBRID TRAINING SYSTEM
            </h1>
            <p className="max-w-xl text-sm text-neutral-300">
              {/* Existing subtitle text */}
              A blended system combining in-studio training with structured programming and
              accountability.
            </p>

            {/* CTA 1 — main button under subtitle (left side) */}
            <div className="pt-2">
              <Link
                href="/pt-packages/onboarding"
                className="inline-flex items-center justify-center rounded-full bg-[#00C853] px-5 py-2.5 text-sm font-semibold text-black shadow-sm shadow-black/40 transition hover:bg-[#00b648]"
              >
                Onboard now
              </Link>
              {/* 
                TODO: Later, you can pass a specific plan ID like:
                href="/pt-packages/onboarding?plan=HYBRID_01"
                or derive it dynamically based on which package the user selects.
              */}
            </div>
          </div>

          {/* Right-hand meta block, including LIMITED SERIES + CTA 2 */}
          <div className="flex flex-col items-end gap-2 text-right">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-[#00C853]" />
              <span>00C853 / LIMITED SERIES</span>

              {/* CTA 2 — small text link top-right */}
              <Link
                href="/pt-packages/onboarding"
                className="text-[10px] font-medium text-neutral-300 underline-offset-4 hover:text-[#00C853] hover:underline"
              >
                Onboard now
              </Link>
              {/* 
                TODO: To target a specific plan from here later, use:
                href="/pt-packages/onboarding?plan=HYBRID_01"
                or HYBRID_02 / HYBRID_03 depending on the context.
              */}
            </div>

            {/* Existing price / badge / summary content */} 
            {/* ... keep your current layout here */}
          </div>
        </header>

        {/* Rest of the HYBRID page content (HYBRID_01 / HYBRID_02 / HYBRID_03 cards, etc.) */}
        {/* ... */}
      </main>
    </div>
  );
}
