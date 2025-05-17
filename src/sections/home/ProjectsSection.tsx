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

const ProjectsSection = () => {
  const [filter, setFilter] = useState("all");

  // Example project data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart, checkout, and payment processing.",
      image:
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "full-stack",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A Kanban-style task management application with drag-and-drop functionality and team collaboration features.",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      category: "frontend",
      technologies: ["React", "TypeScript", "Redux", "Tailwind CSS"],
      featured: true,
    },
    {
      id: 3,
      title: "Real-time Chat Application",
      description:
        "A messaging platform with real-time chat capabilities, user authentication, and message history.",
      image:
        "https://images.unsplash.com/photo-1521790361543-f645cf042ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
      category: "full-stack",
      technologies: ["React", "Firebase", "Socket.io", "Material UI"],
      featured: false,
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description:
        "A weather information dashboard with location search, forecast data, and interactive maps.",
      image:
        "https://images.unsplash.com/photo-1534794048419-48e110dca88e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
      category: "frontend",
      technologies: ["React", "OpenWeather API", "Chart.js", "Mapbox"],
      featured: false,
    },
    {
      id: 5,
      title: "API Gateway Service",
      description:
        "A microservice gateway for managing API requests, authentication, and rate limiting.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1768&q=80",
      category: "backend",
      technologies: ["Node.js", "Express", "Redis", "Docker"],
      featured: false,
    },
    {
      id: 6,
      title: "Content Management System",
      description:
        "A custom CMS with content creation tools, media management, and user permissions.",
      image:
        "https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      category: "full-stack",
      technologies: ["Next.js", "PostgreSQL", "Supabase", "TailwindCSS"],
      featured: true,
    },
  ];

  // Filter projects based on current filter
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

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
