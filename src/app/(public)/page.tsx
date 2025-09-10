import React from "react";
import HeroSection from "@/sections/home/HeroSection";
import ContactSection from "@/sections/home/ContactSection";
import ProjectsSection from "@/sections/home/ProjectsSection";
import ExperienceSection from "@/sections/home/ExperienceSection";
import SkillsSection from "@/sections/home/SkillsSection";
import AboutSection from "@/sections/home/AboutSection";
import { getExperiences } from "@/lib/api/experience";
import { getSkills } from "@/lib/api/skill";

export default async function Home() {
  const [experiences, skills] = await Promise.all([
    getExperiences(),
    getSkills(),
  ]);

  return (
    <div className="space-y-10 py-4">
      <HeroSection />
      <AboutSection />
      <SkillsSection skills={skills} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
