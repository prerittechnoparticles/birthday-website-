import { SmoothScrollProvider } from "@/components/effects/SmoothScrollProvider";
import { MouseGlow } from "@/components/effects/MouseGlow";
import { FloatingSymbols } from "@/components/effects/FloatingSymbols";
import { ScrollMemoriesPopup } from "@/components/effects/ScrollMemoriesPopup";
import { IntroExperienceGate } from "@/components/intro/IntroExperienceGate";
import { TopTaglineBar } from "@/components/navigation/TopTaglineBar";
import { HeroSection } from "@/components/hero/HeroSection";
import { FlutterDecoderSection } from "@/components/decoder/FlutterDecoderSection";
import { JourneySection } from "@/components/journey/JourneySection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { GallerySection } from "@/components/gallery/GallerySection";
import { WishesSection } from "@/components/wishes/WishesSection";
import { FinaleSection } from "@/components/finale/FinaleSection";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#080711] text-white">
        {/* Cinematic Boot Sequence Overlay */}
        <IntroExperienceGate />

        {/* Atmospheric Background Effects */}
        <MouseGlow />
        <FloatingSymbols />
        <ScrollMemoriesPopup />

        {/* Floating Glassmorphic Top Tagline Bar */}
        <TopTaglineBar />

        {/* Main Experience Sections */}
        <main className="relative z-10">
          {/* 1. Hero Section */}
          <HeroSection />

          {/* Section Divider */}
          <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#A855F7]/35 to-transparent" />

          {/* 2. Signature Feature: Flutter Code to Birthday Message Decoder */}
          <FlutterDecoderSection />

          {/* Section Divider */}
          <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#22D3EE]/35 to-transparent" />

          {/* 3. His Tech Journey */}
          <JourneySection />

          {/* Section Divider */}
          <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#EC4899]/35 to-transparent" />

          {/* 4. Project Universe Showcase */}
          <ProjectsSection />

          {/* Section Divider */}
          <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#34D399]/35 to-transparent" />

          {/* 5. Personal Photo Gallery */}
          <GallerySection />

          {/* Section Divider */}
          <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#FACC15]/35 to-transparent" />

          {/* 6. Interactive Birthday Wishes Wall */}
          <WishesSection />

          {/* Section Divider */}
          <div className="mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-[#A855F7]/45 to-transparent" />

          {/* 7. Grand Birthday Finale */}
          <FinaleSection />
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
