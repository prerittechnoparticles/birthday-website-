export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  rotation: number;
  aspectClass: string;
  accentColor: string;
  fileHint: string;
}

/**
 * Replaceable Personal Photo Gallery Configuration
 * Drop real photographs into `public/images/gallery/` with matching filenames
 * or update the `src` paths below.
 */
export const GALLERY_DATA: GalleryPhoto[] = [
  {
    id: "memory-01",
    src: "/images/gallery/memory-01.png",
    title: "Focus & Passion",
    caption: "In his element, turning brilliant concepts into reality with quiet dedication and a calm smile.",
    tag: "INSPIRATION",
    rotation: -1.8,
    aspectClass: "aspect-[3/4]",
    accentColor: "#A855F7",
    fileHint: "Cherished Moment",
  },
  {
    id: "memory-02",
    src: "/images/gallery/memory-02.png",
    title: "Joyful Celebrations",
    caption: "Sharing laughter, triumphs, and high-fives with cherished colleagues and friends.",
    tag: "HAPPINESS",
    rotation: 1.5,
    aspectClass: "aspect-[3/4]",
    accentColor: "#EC4899",
    fileHint: "Cherished Moment",
  },
  {
    id: "memory-03",
    src: "/images/gallery/memory-03.png",
    title: "The Midnight Spark",
    caption: "When an exciting idea sparks late at night and the journey becomes pure joy and wonder.",
    tag: "CREATIVITY",
    rotation: -1.2,
    aspectClass: "aspect-[3/4]",
    accentColor: "#22D3EE",
    fileHint: "Cherished Moment",
  },
  {
    id: "memory-04",
    src: "/images/gallery/memory-04.png",
    title: "Warmth & Camaraderie",
    caption: "Guiding, listening, and sharing wisdom with friends who look up to him.",
    tag: "FRIENDSHIP",
    rotation: 2.0,
    aspectClass: "aspect-[4/3]",
    accentColor: "#6366F1",
    fileHint: "Cherished Moment",
  },
  {
    id: "memory-05",
    src: "/images/gallery/memory-05.png",
    title: "Beyond the Screen",
    caption: "Golden memories filled with genuine warmth, humor, and effortless connection.",
    tag: "CHERISHED",
    rotation: -1.6,
    aspectClass: "aspect-[3/4]",
    accentColor: "#34D399",
    fileHint: "Cherished Moment",
  },
  {
    id: "memory-06",
    src: "/images/gallery/memory-06.png",
    title: "Bright Future Ahead",
    caption: "Stepping into a brand new year of happiness, bigger dreams, and triumphant milestones.",
    tag: "CELEBRATION",
    rotation: 1.4,
    aspectClass: "aspect-[3/4]",
    accentColor: "#FACC15",
    fileHint: "Cherished Moment",
  },
];
