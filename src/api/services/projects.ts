import { createClient } from "@/lib/supabase/client";
import { Database } from "@/supabase/types";

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Omit<Project, "id" | "created_at" | "updated_at">;

export const fetchProjects = async (): Promise<Project[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  return data || [];
};

export const fetchProject = async (id: string): Promise<Project | null> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching project:", error);
    throw error;
  }

  return data;
};

export const createProject = async (
  project: ProjectInsert,
): Promise<Project> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return data;
};

export const updateProject = async (
  id: string,
  project: ProjectInsert,
): Promise<Project> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    throw error;
  }

  return data;
};

export const deleteProject = async (id: string): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
