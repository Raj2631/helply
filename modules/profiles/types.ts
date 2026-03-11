import { z } from "zod";

export const clientProfileSchema = z.object({
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

export type ClientProfileFormData = z.infer<typeof clientProfileSchema>;

export const caregiverProfileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters").optional(),
  yearsExperience: z.number().int().min(0).max(50).optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  walkingRate: z.number().min(0).optional(),
  boardingRate: z.number().min(0).optional(),
  maxBoardingDogs: z.number().int().min(1).max(20).optional(),
  services: z.array(z.string()).min(1, "Select at least one service"),
});

export type CaregiverProfileFormData = z.infer<typeof caregiverProfileSchema>;
