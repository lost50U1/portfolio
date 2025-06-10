"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSkillsData } from "@/data/user/mockSkillsData";

const SkillsSection = () => {
  return (
    <section className="py-20" id="skills">
      <div className="container mx-auto max-lg:px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">My Skills</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            I&apos;ve worked with a wide range of technologies in the web
            development world. Here&apos;s an overview of my technical skills
            and competencies.
          </p>
        </div>

        <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-[400px]">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="frontend" className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockSkillsData.frontend.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backend" className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockSkillsData.backend.map((skill) => (
                <SkillCard
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockSkillsData.tools.map((skill) => (
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
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-sm font-medium text-primary">{level}%</span>
        </div>
        <div className="w-full bg-foreground/10 rounded-full h-2">
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
