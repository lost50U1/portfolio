import React from "react";
import HeroSection from "@/sections/home/HeroSection";
import AboutSection from "@/sections/home/AboutSection";

export default function Home() {
  return (
    <div className="py-4 space-y-10">
      <HeroSection />
      <AboutSection />
    </div>
  );
}
