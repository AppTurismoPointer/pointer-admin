import { z } from "zod";

export const locationSchema = z.object({
  id: z.string(),
  name: z.string(),
  preview: z.string(),
  city: z.string(),
  state: z.string(),
});

export type Location = z.infer<typeof locationSchema>;
