"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageOpen } from "lucide-react";
import Image from "next/image";

const SkillsSection = ({ skills }: { skills: Skill[] }) => {
  // Filter skills by category
  const frontendSkills = skills.filter(
    (skill) => skill.category === "Frontend",
  );
  const backendSkills = skills.filter((skill) => skill.category === "Backend");
  const toolsSkills = skills.filter((skill) => skill.category === "Tools");

  return (
    <section className="py-20" id="skills">
      <div className="container mx-auto max-lg:px-4">
        <div className="mb-12 text-center">
          <h2 className="section-title">My Skills</h2>
          <p className="text-foreground/70 mx-auto max-w-3xl text-lg">
            I&apos;ve worked with a wide range of technologies in the web
            development world. Here&apos;s an overview of my technical skills
            and competencies.
          </p>
        </div>

        <Tabs defaultValue="frontend" className="mx-auto w-full max-w-4xl">
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-[400px] grid-cols-3">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="frontend" className="animate-fadeIn">
            <SkillGrid skills={frontendSkills} />
          </TabsContent>

          <TabsContent value="backend" className="animate-fadeIn">
            <SkillGrid skills={backendSkills} />
          </TabsContent>

          <TabsContent value="tools" className="animate-fadeIn">
            <SkillGrid skills={toolsSkills} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface Skill {
  category: string;
  name: string;
  icon?: string; // assume your API returns an icon url or name
}

const SkillGrid = ({ skills }: { skills: Skill[] }) => {
  if (!skills.length) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-12 text-center">
        <PackageOpen className="text-primary mb-4 h-12 w-12" />
        <h3 className="text-lg font-semibold">No skills found</h3>
        <p className="mt-1 text-sm">
          Skills for this category will appear here once they are added.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
      ))}
    </div>
  );
};

interface SkillCardProps {
  name: string;
  icon?: string;
}

const SkillCard = ({ name, icon }: SkillCardProps) => {
  return (
    <Card className="card-hover">
      <CardContent className="flex items-center gap-4 p-6">
        {icon && (
          <Image
            src={icon}
            alt={name}
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        )}
        <h3 className="text-lg font-medium">{name}</h3>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
