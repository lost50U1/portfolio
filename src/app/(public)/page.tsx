import React from "react";
import * as motion from "motion/react-client";

import HeroSection from "@/sections/home/HeroSection";
// import ContactSection from "@/sections/home/ContactSection";
// import ProjectsSection from "@/sections/home/ProjectsSection";
// import ExperienceSection from "@/sections/home/ExperienceSection";
// import SkillsSection from "@/sections/home/SkillsSection";
import AboutSection from "@/sections/home/AboutSection";
// import { getExperiences } from "@/lib/api/experience";
// import { getSkills } from "@/lib/api/skill";
// import { getProjects } from "@/lib/api/project";

export default async function Home() {
  // const [experiences, skills, projects] = await Promise.all([
  //   getExperiences(),
  //   getSkills(),
  //   getProjects(),
  // ]);

  return (
    <div className="space-y-10 py-4">
      <HeroSection />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <AboutSection />
      </motion.div>
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <SkillsSection skills={skills} />
      </motion.div> */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <ExperienceSection experiences={experiences} />
      </motion.div> */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <ProjectsSection projects={projects} />
      </motion.div> */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <ContactSection />
      </motion.div> */}
    </div>
  );
}
