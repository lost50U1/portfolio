import React from "react";
import HeroSection from "@/sections/home/HeroSection";
import ContactSection from "@/sections/home/ContactSection";
import ProjectsSection from "@/sections/home/ProjectsSection";
import ExperienceSection from "@/sections/home/ExperienceSection";
import SkillsSection from "@/sections/home/SkillsSection";
import AboutSection from "@/sections/home/AboutSection";

export default function Home() {
  return (
    <div className="py-4 space-y-10">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
