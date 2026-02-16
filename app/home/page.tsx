import React from "react";
import Link from "next/link";

export default function HumanPeaLanding() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-black/10 py-16">
        <div className="mx-auto max-w-[1120px] px-5">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight max-w-[920px]">
            <span className="opacity-70">'FUNCTIONAL'</span> HYBRID TRAINING SYSTEM
          </h1>

          <p className="mt-4 text-sm text-black/70">
            Private Studio • Precision Coaching • Adaptive Programming
          </p>

          <div className="mt-6">
            <Link
              href="/pt-packages/onboarding"
              className="inline-flex items-center justify-center rounded-md border border-black/15 px-4 py-2 text-sm font-medium hover:bg-black/[0.03]"
            >
              Onboard now
            </Link>
          </div>
        </div>
      </section>

      {/* PRICING GRID */}
      <section className="py-12 border-b border-black/10">
        <div className="mx-auto max-w-[1120px] px-5 grid md:grid-cols-3 gap-5">
          
          <article className="rounded-xl border border-black/10 bg-black/5 p-5">
            <h3 className="text-lg font-semibold">HYBRID_01</h3>
            <p className="mt-2 text-sm text-black/75">
              8 Sessions / 2x Per Week
            </p>
            <div className="mt-6">
              <Link href="/form" className="text-[#00C853] underline">
                Claim
              </Link>
            </div>
          </article>

          <article className="rounded-xl border border-black/10 bg-black/5 p-5">
            <h3 className="text-lg font-semibold">HYBRID_02</h3>
            <p className="mt-2 text-sm text-black/75">
              12 Sessions / 3x Per Week
            </p>
            <div className="mt-6">
              <Link href="/form" className="underline">
                Enquire
              </Link>
            </div>
          </article>

          <article className="rounded-xl border border-black/10 bg-black/5 p-5">
            <h3 className="text-lg font-semibold">HYBRID_03</h3>
            <p className="mt-2 text-sm text-black/75">
              16 Sessions / 4x Per Week
            </p>
            <div className="mt-6">
              <Link href="/form" className="underline">
                Enquire
              </Link>
            </div>
          </article>

        </div>
      </section>
    </>
  );
}
