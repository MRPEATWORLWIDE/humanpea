"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Autoplay when loaded
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("loadeddata", tryPlay, { once: true });
    tryPlay();
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, []);

  // Show title after 3s
  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const enterSite = () => {
    setFadeOut(true);
    setTimeout(() => router.push("/home"), 800);
  };

  const toggleMute: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <main
      className={`relative flex items-center justify-center h-screen w-screen overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "#000" }}
    >
      <video
        ref={videoRef}
        src="https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/human-pea-muted.mp4"
        autoPlay
        muted
        playsInline
        loop
        preload="auto"
        className="max-h-screen max-w-screen w-auto h-auto object-contain bg-black"
      />

      {/* Mute / Unmute */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 text-white text-xs tracking-[0.14em] bg-black/60 px-3 py-2 rounded-lg border border-white/20"
      >
        {isMuted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
      </button>

      {/* HUMAN PEA (Korean) – appears after 3s; only this is clickable to enter */}
      <button
        onClick={enterSite}
        disabled={!titleVisible}
        className={`absolute inset-x-0 mx-auto bottom-10 text-white tracking-[0.3em] text-sm md:text-base 
          transition-opacity duration-700 ${titleVisible ? "opacity-100" : "opacity-0"} 
          border border-white/20 bg-black/50 px-5 py-3 rounded-lg`}
        style={{ width: "fit-content" }}
        aria-label="Enter site"
      >
        인간 완두콩
      </button>
    </main>
  );
}
