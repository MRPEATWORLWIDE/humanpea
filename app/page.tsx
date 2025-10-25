"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const MUTED_SRC = "https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/human-pea-muted.mp4";
const AUDIO_SRC = "https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/human-pea-splash.mp4";

export default function SplashPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoSrc, setVideoSrc] = useState(MUTED_SRC);
  const [isMuted, setIsMuted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const [titleVisible, setTitleVisible] = useState(false); // appear after 3s
  const [showKorean, setShowKorean] = useState(true);      // toggle every 3s after visible

  // Autoplay when loaded
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => {});
    v.addEventListener("loadeddata", tryPlay, { once: true });
    tryPlay();
    return () => v.removeEventListener("loadeddata", tryPlay);
  }, [videoSrc]);

  // Reveal text at 3s, then start language swap every 3s
  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!titleVisible) return;
    const id = setInterval(() => setShowKorean(prev => !prev), 3000);
    return () => clearInterval(id);
  }, [titleVisible]);

  const enterSite = () => {
    setFadeOut(true);
    setTimeout(() => router.push("/home"), 800);
  };

  const toggleMute: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    const t = v.currentTime; // keep position when swapping sources

    if (isMuted) {
      setIsMuted(false);
      v.muted = false;
      setVideoSrc(AUDIO_SRC);
      const onLoaded = () => {
        v.currentTime = Math.min(t, v.duration || t);
        v.play().catch(() => {});
        v.removeEventListener("loadeddata", onLoaded);
      };
      v.addEventListener("loadeddata", onLoaded);
    } else {
      setIsMuted(true);
      v.muted = true;
      setVideoSrc(MUTED_SRC);
      const onLoaded = () => {
        v.currentTime = Math.min(t, v.duration || t);
        v.play().catch(() => {});
        v.removeEventListener("loadeddata", onLoaded);
      };
      v.addEventListener("loadeddata", onLoaded);
    }
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
        key={videoSrc}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        playsInline
        loop
        preload="auto"
        className="max-h-screen max-w-screen w-auto h-auto object-contain bg-black cursor-default"
      />

      {/* Mute / Unmute (does not trigger navigation) */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 text-white text-xs tracking-[0.14em] bg-black/60 px-3 py-2 rounded-lg border border-white/20"
      >
        {isMuted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
      </button>

      {/* Center text overlay (click to enter). No box; subtle text-shadow for legibility */}
      <button
        onClick={enterSite}
        disabled={!titleVisible}
        className={`absolute select-none text-white tracking-[0.3em] text-base md:text-lg
          transition-opacity duration-700 ${titleVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textShadow: "0 2px 12px rgba(0,0,0,0.6)"
        }}
        aria-label="Enter site"
      >
        {showKorean ? "인간 완두콩" : "HUMAN PEA"}
      </button>
    </main>
  );
}
