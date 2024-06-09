import { z } from "zod";

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  preview: z.string(),
});

export type Company = z.infer<typeof companySchema>;
