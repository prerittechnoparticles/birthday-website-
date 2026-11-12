"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Music,
  Menu,
  X,
  Sparkles,
  Terminal,
} from "lucide-react";
import { soundEngine } from "@/lib/sound";
import { FlutterCrystalIcon } from "@/components/effects/FloatingSymbols";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Decoder", href: "#decoder" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Memories", href: "#memories" },
  { label: "Wishes", href: "#wishes" },
];

export function FloatingNav() {
  const [sfxOn, setSfxOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSfxOn(soundEngine.isSfxEnabled());
    setMusicOn(soundEngine.isMusicEnabled());
    return soundEngine.subscribe(() => {
      setSfxOn(soundEngine.isSfxEnabled());
      setMusicOn(soundEngine.isMusicEnabled());
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sectionIds = [
        "home",
        "decoder",
        "journey",
        "projects",
        "memories",
        "wishes",
        "finale",
      ];
      const scrollPos = window.scrollY + 260;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(`#${id}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    soundEngine.playClick();
    setMobileOpen(false);
    setActiveSection(href);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-4 right-0 left-0 z-50 mx-auto max-w-6xl px-4">
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-label="Primary Navigation"
        className={`relative flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 md:px-6 ${
          scrolled
            ? "border-white/15 bg-[#0E0B19]/85 shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl"
            : "border-white/10 bg-[#151225]/65 backdrop-blur-md"
        }`}
      >
        {/* Subtle top rainbow highlight line */}
        <div
          className="pointer-events-none absolute inset-x-10 -top-px h-px opacity-75"
          style={{
            background:
              "linear-gradient(90deg, transparent, #A855F7, #EC4899, #22D3EE, #34D399, transparent)",
          }}
        />

        {/* Brand Identity */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#080711] shadow-inner transition-transform duration-300 group-hover:scale-105">
            <FlutterCrystalIcon className="h-5 w-5" />
            <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full bg-[#34D399] ring-2 ring-[#080711]" />
          </div>
          <div>
            <span className="font-display flex items-center gap-1.5 text-base font-extrabold tracking-wider text-white">
              YASH<span className="text-[#22D3EE]">.EXE</span>
            </span>
            <span className="hidden font-mono text-[10px] tracking-widest text-white/50 sm:block">
              BIRTHDAY PROTOCOL v2.0
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 -z-10 rounded-full border border-white/15 bg-gradient-to-r from-[#A855F7]/25 via-[#EC4899]/20 to-[#22D3EE]/25"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Audio & Finale Controls */}
        <div className="flex items-center gap-2">
          {/* Music Toggle */}
          <button
            type="button"
            onClick={() => soundEngine.toggleMusic()}
            aria-label={musicOn ? "Pause Ambient Music" : "Play Ambient Music"}
            title={musicOn ? "Ambient Synth Music: ON" : "Ambient Synth Music: OFF"}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition-all ${
              musicOn
                ? "border-[#A855F7]/60 bg-[#A855F7]/20 text-white shadow-[0_0_16px_rgba(168,85,247,0.35)]"
                : "border-white/10 bg-white/5 text-white/65 hover:border-white/25 hover:text-white"
            }`}
          >
            <Music className="h-3.5 w-3.5 text-[#A855F7]" />
            <span className="hidden sm:inline">
              {musicOn ? "MUSIC ON" : "MUSIC"}
            </span>
          </button>

          {/* Sound / SFX Toggle */}
          <button
            type="button"
            onClick={() => soundEngine.toggleSfx()}
            aria-label={sfxOn ? "Mute Sound Effects" : "Unmute Sound Effects"}
            title={sfxOn ? "Sound Effects: ON" : "Sound Effects: MUTED"}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs transition-all ${
              sfxOn
                ? "border-[#22D3EE]/50 bg-[#22D3EE]/15 text-white"
                : "border-white/10 bg-white/5 text-white/50 hover:border-white/25 hover:text-white"
            }`}
          >
            {sfxOn ? (
              <Volume2 className="h-3.5 w-3.5 text-[#22D3EE]" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-white/40" />
            )}
            <span className="hidden sm:inline">{sfxOn ? "SFX" : "MUTED"}</span>
          </button>

          {/* Replay Theater Curtain */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              window.dispatchEvent(new CustomEvent("replay-curtain"));
            }}
            aria-label="Replay Theater Curtain Opening"
            title="Replay Curtain Opening"
            className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-white/70 transition hover:border-[#EC4899]/50 hover:bg-[#EC4899]/10 hover:text-white sm:inline-flex"
          >
            <span>🎭</span>
            <span className="hidden xl:inline">CURTAIN</span>
          </button>

          {/* Quick Jump to Finale */}
          <button
            type="button"
            onClick={() => handleNavClick("#finale")}
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#22D3EE] p-[1px] text-xs font-semibold text-white transition-transform hover:scale-105 md:inline-flex"
          >
            <span className="flex items-center gap-1.5 rounded-full bg-[#080711]/90 px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#FACC15]" />
              <span>Finale</span>
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setMobileOpen((prev) => !prev);
            }}
            aria-label="Toggle Mobile Navigation"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="mt-2 overflow-hidden rounded-2xl border border-white/15 bg-[#0E0B19]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-[#22D3EE]" />
                NAVIGATION MATRIX
              </span>
              <span className="text-[#34D399]">ONLINE</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[...NAV_ITEMS, { label: "Grand Finale", href: "#finale" }].map(
                (item) => (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                      activeSection === item.href
                        ? "border-[#A855F7]/50 bg-[#A855F7]/15 text-white"
                        : "border-white/10 bg-[#151225]/60 text-white/75 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-[#22D3EE]">
                      →
                    </span>
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setMobileOpen(false);
                  window.dispatchEvent(new CustomEvent("replay-curtain"));
                }}
                className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-[#EC4899]/30 bg-[#EC4899]/10 px-3.5 py-2.5 text-center text-sm font-medium text-white transition-all hover:bg-[#EC4899]/20"
              >
                <span>🎭</span>
                <span>Replay Theater Curtain</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
