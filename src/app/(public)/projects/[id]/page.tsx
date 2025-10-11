import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { mockProjectsData } from "@/data/user/mockProjectsData";
import { getProjects } from "@/lib/api/project";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projectId = parseInt(id || "0", 10);

  const [projects] = await Promise.all([getProjects()]);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="py-4">
        <p className="text-center text-red-500">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <Link
              href="/#projects"
              className="text-primary mb-6 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Projects
            </Link>
            <h1 className="mb-6 text-center text-4xl font-bold md:text-5xl">
              {project.title}
            </h1>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="rounded-xl shadow-lg">
            <Image
              src={project.image}
              alt={project.title}
              className="h-auto w-full rounded-lg object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-2xl font-semibold">Project Overview</h2>
              <p className="mb-8 text-lg">{project.longDescription}</p>

              <h2 className="mb-6 text-2xl font-semibold">Features</h2>
              <ul className="mb-8 list-disc space-y-2 pl-6">
                {project.features.map((feature, index) => (
                  <li key={index} className="text-foreground/80">
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Challenges</h2>
                  <p>{project.challenges}</p>
                </div>
                <div>
                  <h2 className="mb-4 text-xl font-semibold">Solution</h2>
                  <p>{project.solution}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="border-border rounded-xl border p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold">Project Details</h3>

                <div className="mb-6 space-y-4">
                  <div>
                    <h4 className="text-foreground/60 text-sm font-medium">
                      PROJECT TYPE
                    </h4>
                    <p className="capitalize">{project.category}</p>
                  </div>
                  <div>
                    <h4 className="text-foreground/60 text-sm font-medium">
                      TECHNOLOGIES
                    </h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full">View Live Demo</Button>
                  </Link>
                  <Link
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full">
                      View Source Code
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="border-border mt-8 rounded-xl border p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold">
                  Need Something Similar?
                </h3>
                <p className="mb-6">
                  I can help you build a similar project tailored to your needs.
                </p>
                <Link href="/#contact">
                  <Button className="w-full">Contact Me</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
