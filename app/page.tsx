import Image from "next/image";

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
          <div className="max-w-[520px]">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              HumanPea® London
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              Joshua Peat
              <span className="block mt-3 text-black/60 text-xl md:text-2xl">
                Performance • Systems • Culture
              </span>
            </h1>

            <p className="mt-6 text-sm text-black/70">
              HumanPea is the personal operating system behind my work —
              performance coaching, digital systems, and structured growth.
            </p>

            {/* CTA */}
            <div className="mt-10 group cursor-pointer w-fit">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-semibold transition-transform duration-300 group-hover:scale-110 origin-left">
                  Enter
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

              <div className="h-[2px] w-20 bg-black mt-2 transition-all duration-500 group-hover:w-36"></div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
