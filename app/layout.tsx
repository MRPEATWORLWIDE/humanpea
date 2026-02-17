import "../styles/globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">

        {/* GLOBAL HEADER */}
        <header className="border-b border-black/10">
          <div className="mx-auto max-w-[1120px] px-5 h-16 flex items-center justify-between">
            <div className="font-semibold tracking-wide">
              HUMANPEA® LONDON
            </div>
            <nav className="flex gap-6 text-sm">
              <Link href="/">Home</Link>
              <Link href="/online-coaching">Online Coaching</Link>
              <Link href="/vista-gym">Vista Gym</Link>
              <Link href="/onboarding">Onboarding</Link>
              <Link href="https://form.jotform.com/252973068946371" target="_blank"> Enquire </Link>
            </nav>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* GLOBAL FOOTER */}
        <footer className="border-t border-black/10 h-16 flex items-center">
          <div className="mx-auto max-w-[1120px] px-5 text-xs text-black/60 w-full flex justify-between">
            <span>©2025 HUMANPEA FUNCTIONAL SYSTEMS</span>
            <span>ㅎㅍ</span>
          </div>
        </footer>

      </body>
    </html>
  );
}
