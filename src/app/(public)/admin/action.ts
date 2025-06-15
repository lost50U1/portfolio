"use server";

import { createClient } from "@/lib/supabase/server";
import { UserResponse } from "@/types";

export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { error: error.message };
  }

  return { user: data.user, session: data.session };
}

export async function logout(): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: undefined };
}

export async function getUser(): Promise<UserResponse> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, error: error?.message || "User not signed in" };
  }

  return { user, error: undefined };
}
