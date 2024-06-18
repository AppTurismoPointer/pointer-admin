import { z } from "zod";

export const stateSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type State = z.infer<typeof stateSchema>;
