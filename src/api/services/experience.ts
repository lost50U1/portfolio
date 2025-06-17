import { createClient } from "@/lib/supabase/client";
import { Database } from "@/supabase/types";

export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
export type ExperienceInsert = Omit<
  Experience,
  "id" | "created_at" | "updated_at"
>;

export const fetchExperiences = async (): Promise<Experience[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching experiences:", error);
    throw error;
  }

  return data || [];
};

export const createExperience = async (
  experience: ExperienceInsert,
): Promise<Experience> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("experiences")
    .insert(experience)
    .select()
    .single();

  if (error) {
    console.error("Error creating experience:", error);
    throw error;
  }

  return data;
};

export const updateExperience = async (
  id: string,
  experience: ExperienceInsert,
): Promise<Experience> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("experiences")
    .update(experience)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating experience:", error);
    throw error;
  }

  return data;
};

export const deleteExperience = async (id: string): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.from("experiences").delete().eq("id", id);

  if (error) {
    console.error("Error deleting experience:", error);
    throw error;
  }
};
