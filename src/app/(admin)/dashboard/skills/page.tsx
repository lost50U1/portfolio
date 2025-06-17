"use client";

import { useState } from "react";
import { Edit, Loader2, Plus, Trash } from "lucide-react";
import { z } from "zod";
import { skillSchema } from "@/schemas/dashboard/skills.schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@radix-ui/react-slider";
import { Input } from "@/components/ui/input";
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
import { Progress } from "@/components/ui/progress";

type SkillFormData = z.infer<typeof skillSchema>;

export default function SkillsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const queryClient = useQueryClient();

  // Fetch skills data
  const {
    data: skills = [],
    isLoading,
    error,
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
      level: 75,
      category: "",
    },
  });

  // Open dialog with skill data for editing
  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill);
    form.reset({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setIsDialogOpen(true);
  };

  // Open dialog for adding new skill
  const openAddDialog = () => {
    setEditingSkill(null);
    form.reset({
      name: "",
      level: 75,
      category: "",
    });
    setIsDialogOpen(true);
  };

  // Handle form submission
  const onSubmit = (data: SkillFormData) => {
    // Ensure all required fields are present
    const skillData: SkillInsert = {
      name: data.name,
      level: data.level,
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
                <CardContent>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Skill Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </DialogTitle>
            <DialogDescription>
              {editingSkill
                ? "Make changes to your skill here."
                : "Add details about a new skill to showcase."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 pt-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="React, TypeScript, etc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Frontend, Backend, DevOps, etc."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Proficiency Level</FormLabel>
                      <span className="text-sm">{value}%</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={100}
                        step={1}
                        value={[value]}
                        onValueChange={(vals) => onChange(vals[0])}
                        className="py-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createMutation.isPending || updateMutation.isPending
                  }
                >
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingSkill ? "Save Changes" : "Add Skill"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
