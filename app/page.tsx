"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => router.push("/home"), 800); // fade duration
  };

  return (
    <main
      className={`flex items-center justify-center h-screen w-screen overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#000" }}
    >
      <video
        src="https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/splash-video.mp4"
        autoPlay
        muted
        playsInline
        loop
        onClick={handleClick}
        className="h-full w-full object-contain cursor-pointer transition-transform duration-500 hover:scale-105 bg-black"
        style={{ backgroundColor: "#000" }}
      />
    </main>
  );
}
