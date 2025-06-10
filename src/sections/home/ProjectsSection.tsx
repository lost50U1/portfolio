"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { mockProjectsData } from "@/data/user/mockProjectsData";

const ProjectsSection = () => {
  const [filter, setFilter] = useState("all");

  // Filter projects based on current filter
  const filteredProjects =
    filter === "all"
      ? mockProjectsData
      : mockProjectsData.filter((project) => project.category === filter);

  return (
    <section className="py-20 max-sm:px-4" id="projects">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">My Projects</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Here are some of my recent projects. Each one presented unique
            challenges and opportunities for growth.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <div className="flex justify-center mb-10">
            <TabsList className="grid grid-cols-4 w-[500px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="full-stack">Full Stack</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={filter} className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface ProjectProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    featured: boolean;
  };
}

const ProjectCard = ({ project }: ProjectProps) => {
  return (
    <Card className="overflow-hidden card-hover pt-0">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          width={1770}
          height={1180}
        />
        {project.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary hover:bg-primary">Featured</Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/projects/${project.id}`}>
          <Button variant="outline">View Details</Button>
        </Link>
        <a href="#" className="text-primary hover:text-primary/80 font-medium">
          Live Demo
        </a>
      </CardFooter>
    </Card>
  );
};

export default ProjectsSection;
