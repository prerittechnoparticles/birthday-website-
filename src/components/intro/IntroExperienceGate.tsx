"use client";

import { useState, useEffect } from "react";
import { TheaterCurtainIntro } from "./TheaterCurtainIntro";

export function IntroExperienceGate() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const handleReplay = () => {
      setIntroDone(false);
    };
    window.addEventListener("replay-curtain", handleReplay);
    return () => window.removeEventListener("replay-curtain", handleReplay);
  }, []);

  if (introDone) return null;

  return <TheaterCurtainIntro onComplete={() => setIntroDone(true)} />;
}

