"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Loader2, Plus, Trash } from "lucide-react";
import {
  createExperience,
  deleteExperience,
  Experience,
  ExperienceInsert,
  fetchExperiences,
  updateExperience,
} from "@/api/services/experience";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { experienceSchema } from "@/schemas/dashboard/experience.schema";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ManageExperienceModal } from "@/components/dashboard/experience/ManageExperienceModal";

type ExperienceFormData = z.infer<typeof experienceSchema>;

export default function page() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );
  const queryClient = useQueryClient();

  // Fetch experiences data
  const {
    data: experiences = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });

  // Set up mutations
  const createMutation = useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast("Experience added", {
        description: "Your new experience has been added successfully.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to add experience: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      experience,
    }: {
      id: string;
      experience: ExperienceInsert;
    }) => updateExperience(id, experience),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast("Experience updated", {
        description: "Your experience has been updated successfully.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update experience: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      toast("Experience deleted", {
        description: "Experience has been removed from your portfolio.",
      });
    },
    onError: (error) => {
      toast.error(`Failed to delete experience: ${error.message}`);
    },
  });

  // Set up the form
  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      period: "",
      description: "",
    },
  });

  // Open dialog with experience data for editing
  const openEditDialog = (experience: Experience) => {
    setEditingExperience(experience);
    form.reset({
      title: experience.title,
      company: experience.company,
      location: experience.location,
      period: experience.period,
      description: experience.description,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for adding new experience
  const openAddDialog = () => {
    setEditingExperience(null);
    form.reset({
      title: "",
      company: "",
      location: "",
      period: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = (data: ExperienceFormData) => {
    // Ensure all required fields are present
    const experienceData: ExperienceInsert = {
      title: data.title,
      company: data.company,
      location: data.location,
      period: data.period,
      description: data.description,
    };

    if (editingExperience) {
      // Update existing experience
      updateMutation.mutate({
        id: editingExperience.id,
        experience: experienceData,
      });
    } else {
      // Add new experience
      createMutation.mutate(experienceData);
    }
  };

  // Delete experience
  const handleDeleteExperience = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Experience Management
            </h1>
            <p className="text-muted-foreground">
              Add, edit or remove your work experience
            </p>
          </div>
          <div>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" /> Add Experience
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <p className="text-muted-foreground mb-4">
                    No experiences found
                  </p>
                  <Button onClick={openAddDialog}>
                    Add Your First Experience
                  </Button>
                </CardContent>
              </Card>
            ) : (
              experiences.map((exp) => (
                <Card key={exp.id} className="overflow-hidden">
                  <CardHeader className="bg-card/50 flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle>{exp.title}</CardTitle>
                      <div className="text-muted-foreground text-sm">
                        {exp.company} • {exp.location}
                      </div>
                      <div className="text-primary mt-1 text-sm font-medium">
                        {exp.period}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(exp)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteExperience(exp.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm">{exp.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
      {/* Add/Edit Experience Dialog */}
      <ManageExperienceModal
        isDialogOpen={isDialogOpen}
        editingExperience={editingExperience}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSubmit}
        form={form}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
