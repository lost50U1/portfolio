import { z } from "zod";

export const experienceSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  period: z.string().min(1, "Period is required"),
  description: z.string().min(1, "Description is required"),
});
