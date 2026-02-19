import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section
      className="flex items-center border-b border-black/10"
      style={{ height: "calc(100vh - 128px)" }}
    >
      <div className="mx-auto max-w-[1120px] px-5 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE */}
          <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto float-slow group">
            <Image
              src="/images/humanpea-hero.jpg"
              alt="Joshua Peat"
              fill
              className="object-cover transition duration-700 group-hover:grayscale"
              priority
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="max-w-[520px] ml-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              Joshua — HUMAN COACH
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Performance • Systems • Culture
            </h1>

            <p className="mt-6 text-sm text-black/70">
              HUMANPEA® is the natural, efficient and human method to Personal
              Training and lifestyle coaching. We operate from three core
              principles — fuel using natural food sources, commit for longevity
              over aesthetics, and prioritise function and mobility to prevent
              injury. The systems behind my work extend far beyond standard
              performance coaching.
            </p>

            <Link
              href="/vista-gym"
              className="mt-8 inline-block group"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-xl md:text-3xl font-bold transition-transform duration-300 group-hover:scale-105">
                  Let’s work
                </h2>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
              <div className="h-[2px] w-16 bg-black mt-2 transition-all duration-300 group-hover:w-28"></div>
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
