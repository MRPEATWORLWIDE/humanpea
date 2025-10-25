"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure autoplay starts when loaded
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("loadeddata", tryPlay, { once: true });
    tryPlay();
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

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
        ref={videoRef}
        src="https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/human-pea-muted.mp4"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        onClick={handleClick}
        className="max-h-screen max-w-screen w-auto h-auto object-contain cursor-pointer bg-black"
      />
    </main>
  );
}
