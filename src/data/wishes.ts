export interface WishItem {
  id: number | string;
  name: string;
  role: string;
  message: string;
  accentColor: string;
  createdAt: string;
}

export const INITIAL_WISHES: WishItem[] = [
  {
    id: "seed-1",
    name: "Prerit & Friends",
    role: "With Warmest Love ❤️",
    message: "Happy Birthday Yash! You are truly one of a kind. May your upcoming year be packed with boundless joy, good health, and peace!",
    accentColor: "#EC4899",
    createdAt: "Pinned Tribute",
  },
  {
    id: "seed-2",
    name: "Your Closest Circle",
    role: "Friends Forever 🌟",
    message: "To the person with the biggest heart and most infectious smile—wishing you the happiest birthday ever!",
    accentColor: "#22D3EE",
    createdAt: "Pinned Tribute",
  },
  {
    id: "seed-3",
    name: "The Dreamers Squad",
    role: "Inspired by You 🚀",
    message: "Your drive, humility, and brilliance inspire all of us every day. So proud to see you conquer new heights!",
    accentColor: "#A855F7",
    createdAt: "Pinned Tribute",
  },
  {
    id: "seed-4",
    name: "Colleagues & Peers",
    role: "Always Cheering 💖",
    message: "Wishing you 365 days of pure happiness, remarkable breakthroughs, and unforgettable adventures!",
    accentColor: "#34D399",
    createdAt: "Pinned Tribute",
  },
  {
    id: "seed-5",
    name: "Partners in Fun",
    role: "Cherished Memories ✨",
    message: "Here's to endless laughter, great food, deep conversations, and celebrating another awesome year of you!",
    accentColor: "#FACC15",
    createdAt: "Pinned Tribute",
  },
  {
    id: "seed-6",
    name: "Everyone Around You",
    role: "True Inspiration 👑",
    message: "May all the positivity, kindness, and encouragement you spread return to you a hundredfold. Happy Birthday Yash!",
    accentColor: "#6366F1",
    createdAt: "Pinned Tribute",
  },
];
