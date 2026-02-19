"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="border-b border-black/10">
      <div className="mx-auto max-w-[1120px] px-5 min-h-[calc(100vh-128px)] flex items-center py-12 md:py-0">
        
        <div className="grid md:grid-cols-[420px,1fr] gap-8 md:gap-12 items-center w-full">
          
          {/* LEFT IMAGE */}
          <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto md:mx-0 float-slow group">
            <Image
              src="/images/humanpea-hero.jpg"
              alt="Joshua 'Human' PT"
              fill
              className="object-cover transition duration-700 group-hover:grayscale"
              priority
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="mx-auto md:mx-0 text-center md:text-left">

            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] md:whitespace-nowrap">
              Joshua 'Human' PT
            </h1>

            <p className="mt-3 text-sm text-black/50 tracking-wide">
              Performance • Systems • Culture
            </p>

            <p className="mt-6 text-sm text-black/70">
              HUMANPEA® is the natural, efficient, human method to Personal Training and lifestyle coaching.
            </p>

            <p className="mt-4 text-sm text-black/70">
              Built on three core principles:
            </p>

            <ol className="mt-2 ml-5 list-decimal text-sm text-black/70 space-y-1">
              <li><strong>Fuel with natural foods</strong></li>
              <li><strong>Commit to longevity over aesthetics</strong></li>
              <li><strong>Prioritise function and mobility to prevent injury</strong></li>
            </ol>

            {/* CTA */}
            <Link
              href="/vista-gym"
              className="mt-10 group w-fit mx-auto md:mx-0 block"
            >
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h2 className="text-xl md:text-3xl font-semibold transition-transform duration-300 group-hover:scale-110 origin-left">
                  Lets work
                </h2>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>

              <div className="h-[2px] w-20 bg-black mt-2 transition-all duration-500 group-hover:w-36 mx-auto md:mx-0"></div>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
