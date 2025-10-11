"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MoreVertical, Plus, Search } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  fetchProjects,
  Project,
  ProjectInsert,
  updateProject,
} from "@/api/services/projects";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/schemas/dashboard/projects.schema";
import { z } from "zod";
import Image from "next/image";

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Fetch projects data
  const {
    data: projects = [],
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  // Set up mutations
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast("Project added", {
        description: "Your new project has been added successfully.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to add project: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, project }: { id: string; project: ProjectInsert }) =>
      updateProject(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast("Project updated", {
        description: "Your project has been updated successfully.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update project: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast("Project deleted", {
        description: "Project has been removed from your portfolio.",
      });
    },
    onError: (error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });

  // Set up the form
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "full-stack",
      technologies: "",
      featured: false,
    },
  });

  // Open dialog with project data for editing
  const openEditDialog = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
      technologies: project.technologies.join(", "),
      featured: project.featured,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for adding new project
  const openAddDialog = () => {
    setEditingProject(null);
    form.reset({
      title: "",
      description: "",
      image: "",
      category: "full-stack",
      technologies: "",
      featured: false,
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = (data: ProjectFormData) => {
    const formattedTechnologies = data.technologies
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech !== "");

    if (editingProject) {
      // Update existing project
      updateMutation.mutate({
        id: editingProject.id,
        project: {
          title: data.title,
          description: data.description,
          image:
            data.image ||
            "https://via.placeholder.com/800x600?text=Project+Image",
          category: data.category,
          technologies: formattedTechnologies,
          featured: data.featured,
        },
      });
    } else {
      // Add new project
      createMutation.mutate({
        title: data.title,
        description: data.description,
        image:
          data.image ||
          "https://via.placeholder.com/800x600?text=Project+Image",
        category: data.category,
        technologies: formattedTechnologies,
        featured: data.featured,
      });
    }
  };

  const toggleFeatured = (id: string, currentStatus: boolean) => {
    updateMutation.mutate({
      id,
      project: {
        title: projects.find((p) => p.id === id)?.title || "",
        description: projects.find((p) => p.id === id)?.description || "",
        image: projects.find((p) => p.id === id)?.image || "",
        category: projects.find((p) => p.id === id)?.category || "",
        technologies: projects.find((p) => p.id === id)?.technologies || [],
        featured: !currentStatus,
      },
    });
  };

  const handleDeleteProject = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Filter projects based on search term and category
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter
      ? project.category === categoryFilter
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Projects
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your portfolio projects here
            </p>
          </div>
          <Button
            onClick={openAddDialog}
            size="sm"
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                <Button
                  variant={categoryFilter === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(null)}
                  className="shrink-0 text-xs"
                >
                  All
                </Button>
                <Button
                  variant={
                    categoryFilter === "full-stack" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setCategoryFilter("full-stack")}
                  className="shrink-0 text-xs"
                >
                  Full Stack
                </Button>
                <Button
                  variant={
                    categoryFilter === "frontend" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setCategoryFilter("frontend")}
                  className="shrink-0 text-xs"
                >
                  Frontend
                </Button>
                <Button
                  variant={categoryFilter === "backend" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter("backend")}
                  className="shrink-0 text-xs"
                >
                  Backend
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="text-primary h-8 w-8 animate-spin" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8 md:p-12">
                <p className="text-muted-foreground mb-4 text-center">
                  No projects found
                </p>
                <Button onClick={openAddDialog}>Add New Project</Button>
              </CardContent>
            </Card>
          ) : (
            filteredProjects.map((project) => (
              <div key={project.id} className="w-full">
                <Card className="w-full overflow-hidden">
                  <div className="flex flex-col">
                    <div className="h-48 w-full overflow-hidden sm:h-32">
                      <Image
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-full min-w-0 p-4 md:p-6">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h2 className="min-w-0 flex-1 truncate text-lg leading-tight font-semibold md:text-xl">
                          {project.title}
                        </h2>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 shrink-0 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openEditDialog(project)}
                            >
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                toggleFeatured(project.id, project.featured)
                              }
                            >
                              {project.featured
                                ? "Unmark as Featured"
                                : "Mark as Featured"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              Delete Project
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Badge className="text-xs capitalize">
                          {project.category}
                        </Badge>
                        {project.featured && (
                          <Badge variant="secondary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>

        {/* Add/Edit Project Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="mx-auto max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg">
                {editingProject ? "Edit Project" : "Add New Project"}
              </DialogTitle>
              <DialogDescription className="text-sm">
                {editingProject
                  ? "Make changes to your project here."
                  : "Fill in the details for your new project."}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Project title"
                          className="text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Project description"
                          className="resize-none text-sm"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Image URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com/image.jpg"
                          className="text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Category</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="full-stack">Full Stack</option>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-3 rounded-md border p-3">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Featured Project
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">
                        Technologies (comma separated)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="React, TypeScript, Node.js"
                          className="text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="flex flex-col gap-2 pt-4 sm:flex-row">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                    className="w-full sm:w-auto"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                    className="w-full sm:w-auto"
                    size="sm"
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {editingProject ? "Save Changes" : "Add Project"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
