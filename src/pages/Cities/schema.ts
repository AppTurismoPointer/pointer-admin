import { z } from "zod";

export const citySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type City = z.infer<typeof citySchema>;
