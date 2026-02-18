"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-black/10 relative">
      <div className="mx-auto max-w-[1120px] px-5 h-16 flex items-center justify-between">

        <div className="font-semibold tracking-wide whitespace-nowrap">
          HUMANPEA® LONDON
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/">Home</Link>
          <Link href="/online-coaching">Online Coaching</Link>
          <Link href="/vista-gym">Vista Gym</Link>
          <Link href="/onboarding">Onboarding</Link>
          <Link
            href="https://form.jotform.com/252973068946371"
            target="_blank"
          >
            Enquire
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1"
          aria-label="Toggle menu"
        >
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
          <span className="w-6 h-[2px] bg-black"></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="flex flex-col px-5 py-4 gap-4 text-sm">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/online-coaching" onClick={() => setOpen(false)}>Online Coaching</Link>
            <Link href="/vista-gym" onClick={() => setOpen(false)}>Vista Gym</Link>
            <Link href="/onboarding" onClick={() => setOpen(false)}>Onboarding</Link>
            <Link
              href="https://form.jotform.com/252973068946371"
              target="_blank"
              onClick={() => setOpen(false)}
            >
              Enquire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
