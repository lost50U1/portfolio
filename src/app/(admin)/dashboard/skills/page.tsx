"use client";

import { useState } from "react";
import { Edit, Loader2, Plus, Trash } from "lucide-react";
import { z } from "zod";
import { skillSchema } from "@/schemas/dashboard/skills.schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  createSkill,
  deleteSkill,
  fetchSkills,
  Skill,
  SkillInsert,
  updateSkill,
} from "@/api/services/skills";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Progress } from "@/components/ui/progress";
import { ManageSkillsModal } from "@/components/dashboard/skills/ManageSkillsModal";

type SkillFormData = z.infer<typeof skillSchema>;

export default function SkillsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const queryClient = useQueryClient();

  // Fetch skills data
  const {
    data: skills = [],
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  // Set up mutations
  const createMutation = useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.message("Skill added", {
        description: "Your new skill has been added successfully.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to add skill: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, skill }: { id: string; skill: SkillInsert }) =>
      updateSkill(id, skill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.message("Skill updated", {
        description: "Your skill has been updated successfully.",
      });
      setIsDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to update skill: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      toast.message("Skill deleted", {
        description: "Skill has been removed from your portfolio.",
      });
    },
    onError: (error) => {
      toast(`Failed to delete skill: ${error.message}`);
    },
  });

  // Set up the form
  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "",
    },
  });

  // Open dialog with skill data for editing
  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill);
    form.reset({
      name: skill.name,
      category: skill.category,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for adding new skill
  const openAddDialog = () => {
    setEditingSkill(null);
    form.reset({
      name: "",
      category: "",
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = (data: SkillFormData) => {
    // Ensure all required fields are present
    const skillData: SkillInsert = {
      name: data.name,
      category: data.category,
    };

    if (editingSkill) {
      // Update existing skill
      updateMutation.mutate({
        id: editingSkill.id,
        skill: skillData,
      });
    } else {
      // Add new skill
      createMutation.mutate(skillData);
    }
  };

  // Delete skill
  const handleDeleteSkill = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <div className="w-full space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Skills Management
            </h1>
            <p className="text-muted-foreground">
              Add, edit or remove your skills
            </p>
          </div>
          <div>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div>
            {skills.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-12">
                  <p className="text-muted-foreground mb-4">No skills found</p>
                  <Button onClick={openAddDialog}>Add Your First Skill</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <Card key={skill.id}>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <p className="text-muted-foreground text-sm">
                          {skill.category}
                        </p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(skill)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSkill(skill.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Skill Dialog */}
      <ManageSkillsModal<SkillFormData>
        isDialogOpen={isDialogOpen}
        editingSkill={editingSkill}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={onSubmit}
        form={form}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
}
