import { z } from "zod";

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.number().min(1).max(100),
  category: z.string().min(1, "Category is required"),
});
