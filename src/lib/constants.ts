export const BRAND = {
  name: "Happy Birthday Yash",
  personName: "Yash Manghnani",
  subtitle: "Celebrating an Extraordinary Mind, Leader & Friend",
  heroTagline: "The Visionary Mind. The Heart of a True Leader.",
  heroDescription:
    "Today we celebrate Yash Manghnani—his infectious positive energy, brilliant creativity, and the kindness that inspires everyone around him.",
} as const;

export const COLORS = {
  bgPrimary: "#080711",
  bgSecondary: "#0E0B19",
  bgCard: "#151225",
  purple: "#A855F7",
  pink: "#EC4899",
  cyan: "#22D3EE",
  blue: "#6366F1",
  green: "#34D399",
  yellow: "#FACC15",
  white: "#FFFFFF",
} as const;

export const NEON_PALETTE = [
  COLORS.purple,
  COLORS.pink,
  COLORS.cyan,
  COLORS.blue,
  COLORS.green,
  COLORS.yellow,
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Surprise", href: "#decoder" },
  { label: "Journey", href: "#journey" },
  { label: "Projects", href: "#projects" },
  { label: "Memories", href: "#memories" },
  { label: "Wishes", href: "#wishes" },
  { label: "Finale", href: "#finale" },
] as const;

export const BOOT_MESSAGES = [
  { text: "Gathering Sweet Memories...", status: "READY", color: "#22D3EE" },
  { text: "Baking Birthday Smiles...", status: "READY", color: "#A855F7" },
  { text: "Lighting Birthday Candles...", status: "CELEBRATE", color: "#EC4899" },
  { text: "Unfolding Grand Wishes...", status: "SURPRISE", color: "#34D399" },
] as const;

export const FLUTTER_BIRTHDAY_CODE = `// A Special Birthday Tribute for Yash Manghnani
void main() {
  celebrateBirthday(
    name: "Yash Manghnani",
    wishes: [
      "Endless happiness & peace 🌟",
      "Monumental success & breakthroughs 🚀",
      "Laughter with cherished friends ❤️",
      "A healthy, adventurous year ahead 🎂",
    ],
  );
}

class BirthdayTribute {
  final String hero = "Yash Manghnani";
  final String status = "Forever inspiring, brilliant & kind";

  Widget revealCelebration() {
    return HeartfeltWishes(
      message: "Happy Birthday Yash! You are truly one of a kind.",
    );
  }
}`;
