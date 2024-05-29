import { z } from "zod";

export const spotSchema = z.object({
  id: z.string(),
  name: z.string(),
  preview: z.string(),
  city: z.string(),
  state: z.string(),
});

export type Spot = z.infer<typeof spotSchema>;
