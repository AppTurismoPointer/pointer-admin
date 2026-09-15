import { z } from "zod";

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  preview: z.string(),
  accept_reservation: z.boolean(),
  accept_scheduling: z.boolean(),
});

export type Company = z.infer<typeof companySchema>;
