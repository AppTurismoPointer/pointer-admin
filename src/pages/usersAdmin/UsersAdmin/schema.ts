import { z } from "zod";

export const userAdminSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  created_at: z.string(),
});

export type UserAdmin = z.infer<typeof userAdminSchema>;
