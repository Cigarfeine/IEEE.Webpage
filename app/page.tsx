import React from "react";
import Preloader from "@/components/ui/Preloader";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import VelocityMarquee from "@/components/sections/VelocityMarquee";
import Manifesto from "@/components/sections/Manifesto";
import FlagshipWorks from "@/components/sections/FlagshipWorks";
import ExpandingReveal from "@/components/sections/ExpandingReveal";
import DirectorateTracks from "@/components/sections/DirectorateTracks";
import MembershipPlans from "@/components/sections/MembershipPlans";
import ColorMorphSection from "@/components/sections/ColorMorphSection";
import AccordionFaq from "@/components/sections/AccordionFaq";
import JoinCta from "@/components/sections/JoinCta";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-obsidian text-white selection:bg-lime selection:text-obsidian">
      {/* Signature Preloading Sequence */}
      <Preloader />

      {/* Dynamic Route & Section Page Navigation Transition */}
      <PageTransition />

      {/* Navigation Header */}
      <Navbar />

      {/* Hero with Brutalist Typography & Ascii Core */}
      <Hero />

      {/* Continuous Velocity-Skewed Marquee Ticker */}
      <VelocityMarquee />

      {/* Stacked Card 1: Warm Paper Alabaster Manifesto */}
      <Manifesto />

      {/* Stacked Card 2: Flagship Works & Gallery Showcase */}
      <FlagshipWorks />

      {/* Signature Habito Kinetic Expanding Reveal */}
      <ExpandingReveal />

      {/* Directorate Technical Tracks Breakdown */}
      <DirectorateTracks />

      {/* Interactive Sliding Pill Membership Plans */}
      <MembershipPlans />

      {/* Scrubbed Background Color Morph into Petrol Teal (#01565B) */}
      <ColorMorphSection />

      {/* Kinetic FAQ Accordion */}
      <AccordionFaq />

      {/* Ingest Application Form */}
      <JoinCta />

      {/* Monumental Branding Footer */}
      <Footer />
    </main>
  );
}
