"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const MUTED_SRC  = "https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/human-pea-muted.mp4";
const AUDIO_SRC  = "https://pub-60eb47fd560a457198614015a4c2a5a0.r2.dev/human-pea-splash.mp4";

export default function SplashPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(MUTED_SRC);
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
  }, [videoSrc]);

  // Show title after 3s
  useEffect(() => {
    const t = setTimeout(() => setTitleVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const enterSite = () => {
    setFadeOut(true);
    setTimeout(() => router.push("/home"), 800);
  };

  const toggleMute: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    const t = v.currentTime; // remember position

    if (isMuted) {
      // Switch to audio version
      setIsMuted(false);
      v.muted = false;
      setVideoSrc(AUDIO_SRC);
      // when new src is ready, jump to same time and play
      const onLoaded = () => {
        v.currentTime = Math.min(t, (v.duration || t));
        v.play().catch(() => {});
        v.removeEventListener("loadeddata", onLoaded);
      };
      v.addEventListener("loadeddata", onLoaded);
    } else {
      // Switch back to muted version (for mobile-friendly autoplay)
      setIsMuted(true);
      v.muted = true;
      setVideoSrc(MUTED_SRC);
      const onLoaded = () => {
        v.currentTime = Math.min(t, (v.duration || t));
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
        key={videoSrc}                 // force reload on src change
        src={videoSrc}
        autoPlay
        muted={isMuted}               // muted for autoplay; unmuted when toggled
        playsInline
        loop
        preload="auto"
        className="max-h-screen max-w-screen w-auto h-auto object-contain bg-black cursor-default"
      />

      {/* Mute / Unmute (doesn't trigger navigation) */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 text-white text-xs tracking-[0.14em] bg-black/60 px-3 py-2 rounded-lg border border-white/20"
      >
        {isMuted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
      </button>

      {/* HUMAN PEA (Korean) – appears after 3s; only this enters the site */}
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
