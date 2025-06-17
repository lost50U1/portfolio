import { createClient } from "@/lib/supabase/client";
import { Database } from "@/supabase/types";

export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type SkillInsert = Omit<Skill, "id" | "created_at" | "updated_at">;

export const fetchSkills = async (): Promise<Skill[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }

  return data || [];
};

export const createSkill = async (skill: SkillInsert): Promise<Skill> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to create skills");
  }

  const { data, error } = await supabase
    .from("skills")
    .insert(skill)
    .select()
    .single();

  if (error) {
    console.error("Error creating skill:", error);
    throw error;
  }

  return data;
};

export const updateSkill = async (
  id: string,
  skill: SkillInsert,
): Promise<Skill> => {
  const supabase = createClient();
  // Ensure user is authenticated before updating
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to update skills");
  }

  const { data, error } = await supabase
    .from("skills")
    .update(skill)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating skill:", error);
    throw error;
  }

  return data;
};

export const deleteSkill = async (id: string): Promise<void> => {
  const supabase = createClient();
  // Ensure user is authenticated before deleting
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated to delete skills");
  }

  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};
