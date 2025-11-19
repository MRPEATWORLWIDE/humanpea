// FIXED: corrected CSS import path
import "../styles/globals.css";

// REMOVED: Vercel Analytics / Speed Insights imports
// import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "HumanPea — Functional Hybrid Training",
  description: "Private Studio • Precision Coaching • Adaptive Programming",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* REMOVED: Vercel Analytics & Speed Insights */}
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
