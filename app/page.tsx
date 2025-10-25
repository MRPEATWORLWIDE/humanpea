"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  const handleClick = () => {
    setFadeOut(true);
    setTimeout(() => router.push("/home"), 800);
  };

  return (
    <main
      className={`flex items-center justify-center min-h-screen bg-white transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        src="/videos/splash-video.mp4"
        autoPlay
        muted
        playsInline
        className="w-[90vw] max-w-[600px] rounded-lg cursor-pointer transition-transform duration-500 hover:scale-105"
        onClick={handleClick}
      />
    </main>
  );
}
