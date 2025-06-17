"use client";

import { fetchSkills } from "@/api/services/skills";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

const SkillsSection = () => {
  // Fetch skills data
  const {
    data: skills = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {frontendSkills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backend" className="animate-fadeIn">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {backendSkills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="animate-fadeIn">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {toolsSkills.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface SkillCardProps {
  name: string;
  level: number;
}

const SkillCard = ({ name, level }: SkillCardProps) => {
  return (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-primary text-sm font-medium">{level}%</span>
        </div>
        <div className="bg-foreground/10 h-2 w-full rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
