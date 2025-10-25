"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // detect mobile
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => router.push("/home"), 800);
  };

  const videoSrc = isMobile
    ? "https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/human-pea-muted.mp4"
    : "https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/human-pea-splash.mp4";

  return (
    <main
      className={`flex items-center justify-center h-screen w-screen overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#000" }}
    >
      <video
        key={videoSrc} // ensures correct reload when switching between mobile/desktop
        src={videoSrc}
        autoPlay
        muted={isMobile}
        playsInline
        loop
        onClick={handleClick}
        className="h-full w-full object-cover cursor-pointer transition-transform duration-500 hover:scale-105 bg-black"
        style={{ backgroundColor: "#000" }}
      />
    </main>
  );
}
