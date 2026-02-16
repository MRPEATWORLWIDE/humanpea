// app/pt-packages/hybrid/page.tsx
"use client";

import Link from "next/link";

export default function HybridPage() {
  return (
    <>
      <section className="bg-black text-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

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
                A blended system combining in-studio training with structured programming and accountability.
              </p>

              <div className="pt-2">
                <Link
                  href="/pt-packages/onboarding"
                  className="inline-flex items-center justify-center rounded-full bg-[#00C853] px-5 py-2.5 text-sm font-semibold text-black shadow-sm transition hover:bg-[#00b648]"
                >
                  Onboard now
                </Link>
              </div>
            </div>

            {/* Right-hand meta */}
            <div className="flex flex-col items-end gap-2 text-right">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
                <span className="h-2 w-2 rounded-full bg-[#00C853]" />
                <span>00C853 / LIMITED SERIES</span>

                <Link
                  href="/pt-packages/onboarding"
                  className="text-[10px] font-medium text-neutral-300 underline-offset-4 hover:text-[#00C853] hover:underline"
                >
                  Onboard now
                </Link>
              </div>
            </div>

          </header>

          {/* Keep your HYBRID_01 / 02 / 03 content here */}

        </div>
      </section>
    </>
  );
}
