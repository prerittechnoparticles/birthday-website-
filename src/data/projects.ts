export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  gradientFrom: string;
  gradientTo: string;
  accentHex: string;
  borderGradient: string;
  projectUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

/**
 * Editable Project Showcase Configuration
 * Update `description`, `techStack`, `projectUrl`, `githubUrl`, and `thumbnail`
 * with production links and screenshots as needed.
 */
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "beta-buddy",
    index: "CREATION 01",
    name: "Beta Buddy",
    tagline: "Empowering Beta Testing & Feedback",
    description:
      "A thoughtfully crafted platform designed to bring creators and real testers together—making feedback effortless, smooth, and friendly for everyone.",
    thumbnail: "/images/projects/beta-buddy.png",
    techStack: ["User Experience", "Mobile Platform", "Community Focus", "Clean Design"],
    gradientFrom: "#A855F7",
    gradientTo: "#EC4899",
    accentHex: "#A855F7",
    borderGradient: "from-[#A855F7] via-[#EC4899] to-[#6366F1]",
    projectUrl: "#projects",
    githubUrl: "#projects",
    highlights: [
      "Intuitive & friendly user experience",
      "Seamless and fluid interactions",
      "Empowering creators and testers",
    ],
  },
  {
    id: "lino",
    index: "CREATION 02",
    name: "Lino",
    tagline: "Joyful AI Companion Experience",
    description:
      "An enchanting companion experience crafted to bring warmth and intelligence together with delightful, responsive interactions that make technology feel human.",
    thumbnail: "/images/projects/lino.png",
    techStack: ["Delightful UI", "Smart Companion", "Modern Motion", "Creative Craft"],
    gradientFrom: "#22D3EE",
    gradientTo: "#6366F1",
    accentHex: "#22D3EE",
    borderGradient: "from-[#22D3EE] via-[#6366F1] to-[#A855F7]",
    projectUrl: "#projects",
    githubUrl: "#projects",
    highlights: [
      "Playful, charming animations",
      "Easy and natural conversations",
      "Designed to bring a smile to your day",
    ],
  },
  {
    id: "starup-invo",
    index: "CREATION 03",
    name: "StartupInvo",
    tagline: "Connecting Dreamers & Founders",
    description:
      "A complete ecosystem app built to unite founders, investors, and mentors—helping passionate entrepreneurs turn their boldest ideas into reality.",
    thumbnail: "/images/projects/starup-invo.png",
    techStack: ["Startup Ecosystem", "Founder Community", "iOS & Android", "High Impact"],
    gradientFrom: "#34D399",
    gradientTo: "#FACC15",
    accentHex: "#34D399",
    borderGradient: "from-[#34D399] via-[#22D3EE] to-[#FACC15]",
    projectUrl: "#projects",
    githubUrl: "#projects",
    highlights: [
      "Connecting passionate founders with investors",
      "Vibrant mentorship & startup events",
      "Beautiful, polished mobile design",
    ],
  },
];
