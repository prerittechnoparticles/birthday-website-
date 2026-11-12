"use client";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxEnabled: boolean = true;
  private musicEnabled: boolean = false;
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<() => void> = new Set();
  private unlockListenerAttached: boolean = false;

  private getAudio(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!this.audio) {
      this.audio = new Audio("/audio/birthday-song.m4a");
      this.audio.loop = true;
      this.audio.volume = 0.8;
      this.audio.preload = "auto";
    }
    return this.audio;
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public isSfxEnabled() {
    return this.sfxEnabled;
  }

  public isMusicEnabled() {
    return this.musicEnabled;
  }

  public setSfxEnabled(val: boolean) {
    this.sfxEnabled = val;
    this.notify();
  }

  public toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    if (this.sfxEnabled) {
      this.playClick();
    }
    this.notify();
    return this.sfxEnabled;
  }

  public async startMusic(): Promise<boolean> {
    const audio = this.getAudio();
    if (!audio) return false;

    this.musicEnabled = true;
    this.notify();

    try {
      await audio.play();
      this.notify();
      return true;
    } catch {
      // Browser autoplay policy blocked; wait for the first user interaction
      this.setupInteractionUnlock();
      return false;
    }
  }

  private setupInteractionUnlock() {
    if (typeof window === "undefined" || this.unlockListenerAttached) return;
    this.unlockListenerAttached = true;

    const unlock = () => {
      if (this.musicEnabled) {
        const audio = this.getAudio();
        if (audio) {
          audio.play().catch(() => {});
        }
      }
      this.cleanupUnlockListeners(unlock);
    };

    window.addEventListener("click", unlock, { once: true, passive: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true, passive: true });
    window.addEventListener("scroll", unlock, { once: true, passive: true });
  }

  private cleanupUnlockListeners(fn: () => void) {
    this.unlockListenerAttached = false;
    window.removeEventListener("click", fn);
    window.removeEventListener("touchstart", fn);
    window.removeEventListener("keydown", fn);
    window.removeEventListener("scroll", fn);
  }

  public pauseMusic() {
    this.musicEnabled = false;
    if (this.audio) {
      this.audio.pause();
    }
    this.notify();
  }

  public toggleMusic(): boolean {
    if (this.musicEnabled) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public playKeyTick() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(680 + Math.random() * 180, now);
    gain.gain.setValueAtTime(0.018, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.028);
  }

  public playBootBeep(stepIndex = 0) {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [440, 523.25, 659.25, 880];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freqs[stepIndex % freqs.length], now);
    gain.gain.setValueAtTime(0.035, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playClick() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  }

  public playEnterChime() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const start = now + idx * 0.055;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.045, start + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.7);
    });
  }

  public playCompileSweep() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.45);
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  public playParticleMorph() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const arp = [329.63, 392.0, 493.88, 587.33, 659.25, 783.99, 987.77];
    arp.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      const t = now + i * 0.08;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.032, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    });
  }

  public playCelebrationFanfare() {
    if (!this.sfxEnabled) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Celebratory harmonic fanfare
    const chord = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx % 2 === 0 ? "triangle" : "sine";
      const start = now + idx * 0.04;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.05, start + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 1.45);
    });
  }
}

export const soundEngine = new SoundEngine();
