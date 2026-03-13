"use client";

import { useState } from "react";

export default function PayPage() {
  const [name, setName] = useState("");

  const reference = name
    ? `VISTA_FAMILY-${name.replace(/\s+/g, "").toUpperCase()}`
    : "VISTA_FAMILY-YOURNAME";

  const copyBankDetails = () => {
    const details = `
Account Name: Joshua Peat
Sort Code: XX-XX-XX
Account Number: XXXXXXXX
Reference: ${reference}
    `;
    navigator.clipboard.writeText(details);
    alert("Bank details copied");
  };

  const copyReference = () => {
    navigator.clipboard.writeText(reference);
    alert("Reference copied");
  };

  return (
    <main className="min-h-screen bg-white text-black px-6 py-16">
      <div className="max-w-xl mx-auto space-y-12">

        {/* HEADER */}

        <header className="text-center space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight">
            HumanPea Payment
          </h1>

          <p className="text-neutral-600 text-sm max-w-md mx-auto">
            Secure payment page for HumanPea London training session blocks.
          </p>
        </header>

        {/* SESSION BLOCK */}

        <section className="space-y-4">

          <h2 className="text-xl font-medium">
            Session Block
          </h2>

          <div className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 space-y-3">

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Product</span>
              <span className="font-medium">VISTA_FAMILY</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Sessions</span>
              <span className="font-medium">20 Sessions</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-neutral-500">Price</span>
              <span className="font-medium">£810</span>
            </div>

          </div>

        </section>

        {/* CLIENT NAME */}

        <section className="space-y-3">

          <h2 className="text-xl font-medium">
            Payment Reference
          </h2>

          <p className="text-sm text-neutral-600">
            Enter your name to generate your payment reference.
          </p>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-neutral-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black"
          />

          <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50 flex justify-between items-center text-sm">

            <span className="font-medium">{reference}</span>

            <button
              onClick={copyReference}
              className="text-xs px-3 py-1 border border-neutral-300 rounded hover:bg-neutral-100"
            >
              Copy
            </button>

          </div>

        </section>

        {/* BANK TRANSFER */}

        <section className="space-y-4">

          <h2 className="text-xl font-medium">
            Bank Transfer
          </h2>

          <p className="text-neutral-600 text-sm">
            Please include the reference above when making your transfer so your
            session block can be allocated correctly.
          </p>

          <div className="border border-neutral-200 rounded-xl p-6 bg-neutral-50 space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-neutral-500">Account Name</span>
              <span className="font-medium">Joshua Peat</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Sort Code</span>
              <span className="font-medium">XX-XX-XX</span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">Account Number</span>
              <span className="font-medium">XXXXXXXX</span>
            </div>

          </div>

          <button
            onClick={copyBankDetails}
            className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-neutral-800 transition"
          >
            Copy Bank Details
          </button>

          <p className="text-xs text-neutral-500">
            Once payment is received, your session block will be added to your account.
          </p>

        </section>

        {/* CONTACT */}

        <section className="space-y-2 text-sm text-center">

          <p className="text-neutral-600">
            Questions regarding payment or session blocks?
          </p>

          <a
            href="mailto:hello@humanpea.com"
            className="font-medium underline underline-offset-4"
          >
            hello@humanpea.com
          </a>

        </section>

        {/* FOOTER */}

        <footer className="pt-8 border-t border-neutral-200 text-center text-xs text-neutral-500">

          <p>HumanPea London</p>

          <p>Strength • Conditioning • Structured Coaching</p>

        </footer>

      </div>
    </main>
  );
}