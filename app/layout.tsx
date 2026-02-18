import "../styles/globals.css";
import Header from "../components/Header"; // we’ll create this
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">

        <Header />

        <main>{children}</main>

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
