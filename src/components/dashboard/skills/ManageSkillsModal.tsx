import React from "react";
import { UseFormReturn } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Skill } from "@/api/services/skills";
import { Loader2 } from "lucide-react";

interface ManageSkillsModalProps {
  isDialogOpen: boolean;
  onClose: () => void;
  editingSkill: Skill | null;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export const ManageSkillsModal = ({
  isDialogOpen,
  onClose,
  editingSkill,
  form,
  onSubmit,
  isSubmitting,
}: ManageSkillsModalProps) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && onClose()}>
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

            <DialogFooter className="pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                disabled={Boolean(isSubmitting)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={Boolean(isSubmitting)}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingSkill ? "Save Changes" : "Add Skill"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
