import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Pet type is required"),
  breed: z.string().optional(),
  age: z.number().int().min(0).max(30).optional(),
  weight: z.number().min(0).max(500).optional(),
  notes: z.string().optional(),
});

export type PetFormData = z.infer<typeof petSchema>;
