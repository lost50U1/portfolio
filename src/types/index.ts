import { User } from "@supabase/supabase-js";

export interface UserResponse {
  user: User | null;
  error?: string;
}
