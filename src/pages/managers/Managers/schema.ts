import { z } from "zod";

export const managerSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  created_at: z.string(),
  company: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type ManagerSchema = z.infer<typeof managerSchema>;
