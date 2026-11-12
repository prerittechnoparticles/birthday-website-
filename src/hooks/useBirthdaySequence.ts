"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FLUTTER_BIRTHDAY_CODE } from "@/lib/constants";
import { soundEngine } from "@/lib/sound";
import { triggerFireworksBurst, triggerRainbowConfetti } from "@/lib/animations";

export type DecoderPhase =
  | "typing"
  | "ready"
  | "compiling"
  | "disintegrating"
  | "celebrating";

export interface TerminalLog {
  id: string;
  text: string;
  type: "command" | "info" | "success" | "protocol";
}

export function useBirthdaySequence(isInView: boolean) {
  const [phase, setPhase] = useState<DecoderPhase>("typing");
  const [typedLength, setTypedLength] = useState<number>(0);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  // Character-by-character auto-typing when in view
  useEffect(() => {
    if (!isInView || phase !== "typing") return;

    const totalLen = FLUTTER_BIRTHDAY_CODE.length;
    if (typedLength >= totalLen) {
      setPhase("ready");
      return;
    }

    // Type 2-4 characters per tick for smooth cinematic speed (~3.5s total)
    const step = Math.min(3, totalLen - typedLength);
    const delay = FLUTTER_BIRTHDAY_CODE[typedLength] === "\n" ? 38 : 14;

    const timer = setTimeout(() => {
      setTypedLength((prev) => prev + step);
      if (typedLength % 9 === 0) {
        soundEngine.playKeyTick();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, phase, typedLength]);

  const executeBirthdayProtocol = useCallback(() => {
    clearTimers();
    // Ensure full code is visible before compiling
    setTypedLength(FLUTTER_BIRTHDAY_CODE.length);
    setPhase("compiling");
    soundEngine.playCompileSweep();

    setTerminalLogs([
      {
        id: "cmd",
        text: "✨ Unlocking Special Birthday Surprise for Yash...",
        type: "command",
      },
    ]);

    const t1 = setTimeout(() => {
      soundEngine.playBootBeep(1);
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: "compile-1",
          text: "Gathering warm blessings, happiness & sweet memories...",
          type: "info",
        },
      ]);
    }, 420);

    const t2 = setTimeout(() => {
      soundEngine.playBootBeep(2);
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: "build-ok",
          text: "PREPARATION COMPLETE: Endless love & respect gathered!",
          type: "success",
        },
      ]);
    }, 950);

    const t3 = setTimeout(() => {
      soundEngine.playBootBeep(3);
      setTerminalLogs((prev) => [
        ...prev,
        {
          id: "protocol-active",
          text: "🎉 CELEBRATION UNLOCKED: Happy Birthday Yash Manghnani!",
          type: "protocol",
        },
      ]);
    }, 1400);

    const t4 = setTimeout(() => {
      setPhase("disintegrating");
      soundEngine.playParticleMorph();
    }, 1900);

    const t5 = setTimeout(() => {
      setPhase("celebrating");
      soundEngine.playCelebrationFanfare();
      triggerRainbowConfetti();
      triggerFireworksBurst();
    }, 4300);

    timersRef.current.push(t1, t2, t3, t4, t5);
  }, [clearTimers]);

  const replaySequence = useCallback(() => {
    clearTimers();
    soundEngine.playClick();
    setTerminalLogs([]);
    setTypedLength(0);
    setPhase("typing");
  }, [clearTimers]);

  const completeTypingImmediately = useCallback(() => {
    soundEngine.playClick();
    setTypedLength(FLUTTER_BIRTHDAY_CODE.length);
    setPhase("ready");
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return {
    phase,
    typedCode: FLUTTER_BIRTHDAY_CODE.slice(0, typedLength),
    fullCode: FLUTTER_BIRTHDAY_CODE,
    progress: Math.round((typedLength / FLUTTER_BIRTHDAY_CODE.length) * 100),
    terminalLogs,
    executeBirthdayProtocol,
    replaySequence,
    completeTypingImmediately,
  };
}
