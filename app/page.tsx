import Image from "next/image";

export default function HomePage() {
  return (
    <section
      className="flex items-center border-b border-black/10"
      style={{ height: "calc(100vh - 128px)" }}
    >
      <div className="mx-auto max-w-[1120px] px-5 w-full">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT TEXT */}
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
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto float-slow group">
            <Image
              src="/josh.jpg" // replace with your image
              alt="Joshua Peat"
              fill
              className="object-cover transition duration-700 group-hover:grayscale"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
