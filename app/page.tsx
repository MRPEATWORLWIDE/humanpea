import Image from "next/image";

export default function HomePage() {
  return (
    <section className="border-b border-black/10">
      <div className="mx-auto max-w-[1120px] px-5 min-h-[calc(100vh-128px)] flex items-center py-12 md:py-0">
        
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT IMAGE */}
          <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto md:mx-0 float-slow group">
            <Image
              src="/images/humanpea-hero.jpg"
              alt="Joshua Peat"
              fill
              className="object-cover transition duration-700 group-hover:grayscale"
              priority
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="max-w-[520px] mx-auto md:mx-0 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-black/50">
              HumanPea® London
            </p>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight">
              Joshua Peat
              <span className="block mt-3 text-black/60 text-lg sm:text-xl md:text-2xl">
                Performance • Systems • Culture
              </span>
            </h1>

            <p className="mt-6 text-sm text-black/70">
              HumanPea is the personal operating system behind my work —
              performance coaching, digital systems, and structured growth.
            </p>

            {/* CTA */}
            <div className="mt-10 group cursor-pointer w-fit mx-auto md:mx-0">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h2 className="text-xl md:text-3xl font-semibold transition-transform duration-300 group-hover:scale-110 origin-left">
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

              <div className="h-[2px] w-20 bg-black mt-2 transition-all duration-500 group-hover:w-36 mx-auto md:mx-0"></div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
