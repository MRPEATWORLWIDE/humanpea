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
      className={`flex items-center justify-center min-h-screen bg-black transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/images/pea-human.png"
        alt="HumanPea head"
        className="w-[80vw] max-w-[500px] h-auto transition-transform duration-500 ease-out hover:scale-105 cursor-pointer select-none"
        onClick={handleClick}
        draggable={false}
      />
    </main>
  );
}
