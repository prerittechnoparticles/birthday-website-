export interface JourneyMilestone {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "Sparkles" | "Code2" | "Cpu" | "Layers" | "Users" | "Crown";
  accentColor: string;
  secondaryColor: string;
  codeTag: string;
  optionalPhoto?: string;
}

/**
 * Centralized Tech Journey Data
 * Edit descriptions or attach optional milestone photos via `optionalPhoto`.
 * No personal career dates or credentials are fabricated.
 */
export const JOURNEY_DATA: JourneyMilestone[] = [
  {
    id: "the-learner",
    phase: "CHAPTER 01",
    title: "The Dreamer",
    subtitle: "A Spark of Curiosity & Ambition",
    description:
      "Every extraordinary journey begins with a spark of wonder. From day one, Yash's curiosity and passion to create meaningful things set him apart, turning big questions into bold beginnings.",
    iconName: "Sparkles",
    accentColor: "#22D3EE",
    secondaryColor: "#6366F1",
    codeTag: "✨ Spark of Big Dreams",
    optionalPhoto: "/images/journey/stage-01.jpg",
  },
  {
    id: "the-developer",
    phase: "CHAPTER 02",
    title: "The Creator",
    subtitle: "Pouring Heart into Every Craft",
    description:
      "Whatever Yash sets his mind to, he builds with unyielding passion and artistry. Every project is crafted not just with skill, but with soul and genuine love for creating happiness.",
    iconName: "Code2",
    accentColor: "#A855F7",
    secondaryColor: "#EC4899",
    codeTag: "🎨 Passion in Every Detail",
    optionalPhoto: "/images/journey/stage-02.jpg",
  },
  {
    id: "the-problem-solver",
    phase: "CHAPTER 03",
    title: "The Mastermind",
    subtitle: "Calm Composure & Sharp Mind",
    description:
      "Faced with tough challenges, Yash brings calm clarity and brilliant perspective. Where others see roadblocks, he spots possibilities and navigates smoothly with a reassuring smile.",
    iconName: "Cpu",
    accentColor: "#EC4899",
    secondaryColor: "#FACC15",
    codeTag: "🧠 Brilliance & Composure",
    optionalPhoto: "/images/journey/stage-03.jpg",
  },
  {
    id: "the-product-builder",
    phase: "CHAPTER 04",
    title: "The Visionary Builder",
    subtitle: "Turning Ideas into Reality",
    description:
      "Looking far beyond the ordinary, Yash creates experiences that touch real people's lives—combining deep empathy, elegance, and foresight into products that truly matter.",
    iconName: "Layers",
    accentColor: "#34D399",
    secondaryColor: "#22D3EE",
    codeTag: "🚀 Turning Ideas Into Reality",
    optionalPhoto: "/images/journey/stage-04.jpg",
  },
  {
    id: "the-mentor",
    phase: "CHAPTER 05",
    title: "The Pillar & Friend",
    subtitle: "Lifting Everyone Around Him",
    description:
      "With an open heart and generous spirit, Yash is the friend and guide everyone wishes they had. He shares wisdom freely, celebrates others' wins, and brings out the best in his people.",
    iconName: "Users",
    accentColor: "#FACC15",
    secondaryColor: "#34D399",
    codeTag: "🤝 Always Lifting Others",
    optionalPhoto: "/images/journey/stage-05.jpg",
  },
  {
    id: "the-leader",
    phase: "CHAPTER 06",
    title: "The Inspiring Leader",
    subtitle: "Leading with Vision & Pure Heart",
    description:
      "A leader who inspires not through words alone, but through character, humility, and warmth. He champions daring ideas and turns collective dreams into triumphant achievements.",
    iconName: "Crown",
    accentColor: "#6366F1",
    secondaryColor: "#A855F7",
    codeTag: "👑 Vision, Warmth & Heart",
    optionalPhoto: "/images/journey/stage-06.jpg",
  },
];
