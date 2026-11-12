"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareHeart,
  Send,
  Sparkles,
  Database,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { INITIAL_WISHES, WishItem } from "@/data/wishes";
import { NEON_PALETTE } from "@/lib/constants";
import { soundEngine } from "@/lib/sound";
import { triggerRainbowConfetti } from "@/lib/animations";

export function WishesSection() {
  const [wishes, setWishes] = useState<WishItem[]>(INITIAL_WISHES);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>(NEON_PALETTE[0]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [storageMode, setStorageMode] = useState<"postgresql" | "local-demo">(
    "postgresql"
  );

  useEffect(() => {
    let mounted = true;
    fetch("/api/wishes")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data.wishes) && data.wishes.length > 0) {
          setWishes(data.wishes);
        }
        if (data.mode === "local-demo") {
          setStorageMode("local-demo");
        } else {
          setStorageMode("postgresql");
        }
      })
      .catch(() => {
        if (mounted) setStorageMode("local-demo");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setErrorMsg("Please enter your name (at least 2 characters).");
      return;
    }
    if (trimmedMessage.length < 4) {
      setErrorMsg("Please write a birthday message (at least 4 characters).");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          role: role.trim() || "Colleague & Friend",
          message: trimmedMessage,
          accentColor: selectedColor,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.error || "Could not submit wish. Please try again.");
      } else if (data.wish) {
        setWishes((prev) => [data.wish, ...prev]);
        setName("");
        setRole("");
        setMessage("");
        setStorageMode(data.mode === "local-demo" ? "local-demo" : "postgresql");
        setSuccessMsg(
          data.mode === "postgresql"
            ? "Birthday wish saved to the live tribute wall!"
            : "Birthday wish added to your local demonstration session!"
        );
        soundEngine.playCelebrationFanfare();
        triggerRainbowConfetti();
      }
    } catch {
      const fallbackWish: WishItem = {
        id: `local-${Date.now()}`,
        name: trimmedName,
        role: role.trim() || "Colleague & Friend",
        message: trimmedMessage,
        accentColor: selectedColor,
        createdAt: "Local Session",
      };
      setWishes((prev) => [fallbackWish, ...prev]);
      setName("");
      setRole("");
      setMessage("");
      setStorageMode("local-demo");
      setSuccessMsg(
        "Added in Local Demonstration Mode (stored in current browser session)."
      );
      soundEngine.playCelebrationFanfare();
      triggerRainbowConfetti();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="wishes"
      className="relative mx-auto max-w-7xl px-4 py-24 md:px-8"
    >
      {/* Section Header */}
      <div className="mb-14 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FACC15]/30 bg-[#151225]/80 px-4 py-1.5 font-mono text-xs tracking-widest text-[#FACC15]">
          <MessageSquareHeart className="h-3.5 w-3.5" />
          <span>💌 BIRTHDAY BLESSINGS // COMMUNITY WALL</span>
        </div>
        <h2 className="font-display mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          &ldquo;A Little Appreciation for{" "}
          <span className="bg-gradient-to-r from-[#FACC15] via-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
            Someone Extraordinary
          </span>
          &rdquo;
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
          Share your heartfelt birthday message, warm congratulations, or a favorite memory for Yash Manghnani.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
        {/* Left Column: Wish Submission Console */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#151225]/95 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{
                background:
                  "linear-gradient(90deg, #A855F7, #EC4899, #22D3EE, #34D399, #FACC15)",
              }}
            />

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  Post a Birthday Wish
                </h3>
                <p className="mt-0.5 text-xs text-white/60">
                  Add your card to Yash&apos;s celebration wall
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EC4899]/40 bg-[#EC4899]/10 px-2.5 py-1 font-mono text-[10px] text-[#EC4899]">
                <Sparkles className="h-3 w-3 text-[#FACC15]" />
                <span>LIVE TRIBUTE WALL</span>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="wish-name"
                  className="mb-1.5 block font-mono text-xs text-white/80"
                >
                  YOUR NAME *
                </label>
                <input
                  id="wish-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Aarav Sharma"
                  maxLength={60}
                  className="w-full rounded-xl border border-white/15 bg-[#080711]/90 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-[#22D3EE] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="wish-role"
                  className="mb-1.5 block font-mono text-xs text-white/80"
                >
                  ROLE / TEAM (OPTIONAL)
                </label>
                <input
                  id="wish-role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Flutter Developer / Friend"
                  maxLength={50}
                  className="w-full rounded-xl border border-white/15 bg-[#080711]/90 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-[#A855F7] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="wish-message"
                  className="mb-1.5 block font-mono text-xs text-white/80"
                >
                  BIRTHDAY MESSAGE *
                </label>
                <textarea
                  id="wish-message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your birthday wish for Yash..."
                  maxLength={360}
                  className="w-full resize-none rounded-xl border border-white/15 bg-[#080711]/90 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-[#EC4899] focus:outline-none"
                />
                <div className="mt-1 text-right font-mono text-[10px] text-white/40">
                  {message.length}/360
                </div>
              </div>

              {/* Neon Card Accent Picker */}
              <div>
                <span className="mb-2 block font-mono text-xs text-white/80">
                  CARD NEON GLOW
                </span>
                <div className="flex items-center gap-2.5">
                  {NEON_PALETTE.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedColor(hex);
                      }}
                      aria-label={`Select neon color ${hex}`}
                      className={`h-7 w-7 rounded-full border-2 transition-transform ${
                        selectedColor === hex
                          ? "scale-115 border-white"
                          : "border-transparent opacity-65 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor: hex,
                        boxShadow:
                          selectedColor === hex ? `0 0 14px ${hex}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Validation Error / Success Feedback */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-[#EC4899]/50 bg-[#EC4899]/10 px-3.5 py-2.5 text-xs text-[#EC4899]"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-[#34D399]/50 bg-[#34D399]/10 px-3.5 py-2.5 text-xs text-[#34D399]"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{successMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={submitting}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#A855F7] via-[#EC4899] to-[#22D3EE] py-3.5 font-mono text-xs font-bold tracking-wider text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] transition hover:scale-[1.01] disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                <span>
                  {submitting ? "SENDING YOUR WISH..." : "SEND BIRTHDAY WISH 💖"}
                </span>
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Column: Floating Wishes Wall */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
          <AnimatePresence initial={false}>
            {wishes.map((wish, idx) => (
              <motion.div
                key={wish.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, idx % 2 === 0 ? -5 : 5, 0],
                }}
                transition={{
                  opacity: { duration: 0.35 },
                  scale: { duration: 0.35 },
                  y: {
                    duration: 5 + (idx % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative flex flex-col justify-between rounded-2xl border bg-[#151225]/90 p-5 backdrop-blur-xl"
                style={{
                  borderColor: `${wish.accentColor}45`,
                  boxShadow: `0 12px 32px -12px ${wish.accentColor}28`,
                }}
              >
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <Sparkles
                      className="h-4 w-4"
                      style={{ color: wish.accentColor }}
                    />
                    <span className="font-mono text-[10px] text-white/40">
                      {wish.createdAt}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-3.5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-[#080711]"
                    style={{ backgroundColor: wish.accentColor }}
                  >
                    {wish.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-white">
                      {wish.name}
                    </div>
                    <div className="font-mono text-[11px] text-white/55">
                      {wish.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
