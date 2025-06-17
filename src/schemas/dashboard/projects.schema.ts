import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Must be a valid URL").or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  technologies: z.string().min(1, "At least one technology is required"),
  featured: z.boolean().default(false),
});
