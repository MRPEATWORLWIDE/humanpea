import React from "react";

// HumanPea – Proportions-Match Landing Template (Tailwind version)
// -------------------------------------------------
// - Tailwind utilities
// - Section proportions via CSS variables
// - 3 pricing cards, promo badge top-right on HYBRID_01
// - Jotform links on buttons

export default function HumanPeaLanding() {
  return (
    <main
      className="min-h-screen bg-black text-white"
      style={{
        fontFamily:
          "Helvetica Neue, Helvetica, Arial, ui-sans-serif, system-ui, -apple-system",
      }}
    >
      {/* Layout proportions as CSS variables to keep the same feel across breakpoints */}
      <style>{`
        :root {
          --hp-container-max: 1120px;
          --hp-section-pad-x: 1.25rem;
          --hp-header-h: 64px;
          --hp-hero-min-h: 36vh;
          --hp-hero-max-w: 920px;
          --hp-grid-gap: 1.25rem;
          --hp-card-min-h: 420px;
          --hp-card-pad: 1.25rem;
          --hp-footer-h: 72px;
          --hp-accent: #00C853;
        }

        @media (min-width: 1024px) {
          :root {
            --hp-hero-min-h: 42vh;
            --hp-card-min-h: 460px;
          }
        }
      `}</style>

      {/* HEADER */}
      <head
