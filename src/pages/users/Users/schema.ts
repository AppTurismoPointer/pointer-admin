import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  created_at: z.string(),
});

export type User = z.infer<typeof userSchema>;
