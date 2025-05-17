import React from "react";
import HeroSection from "@/sections/home/HeroSection";
import ContactSection from "@/sections/home/ContactSection";
import ProjectsSection from "@/sections/home/ProjectsSection";

export default function Home() {
  return (
    <div className="py-4 space-y-10">
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
