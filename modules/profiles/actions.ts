"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  clientProfileSchema,
  caregiverProfileSchema,
  type ClientProfileFormData,
  type CaregiverProfileFormData,
} from "./types";

export async function getUserProfiles(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      clientProfile: true,
      caregiverProfile: true,
    },
  });
  return user;
}

export async function createClientProfile(userId: string, data: ClientProfileFormData) {
  const parsed = clientProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const existing = await prisma.clientProfile.findUnique({ where: { userId } });
  if (existing) return { error: "Client profile already exists" };

  const profile = await prisma.clientProfile.create({
    data: { ...parsed.data, userId },
  });

  revalidatePath("/dashboard");
  return { profile };
}

export async function createCaregiverProfile(userId: string, data: CaregiverProfileFormData) {
  const parsed = caregiverProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const existing = await prisma.caregiverProfile.findUnique({ where: { userId } });
  if (existing) return { error: "Caregiver profile already exists" };

  const profile = await prisma.caregiverProfile.create({
    data: { ...parsed.data, userId },
  });

  revalidatePath("/dashboard");
  revalidatePath("/caregivers");
  return { profile };
}

export async function updateCaregiverProfile(userId: string, data: CaregiverProfileFormData) {
  const parsed = caregiverProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const profile = await prisma.caregiverProfile.upsert({
    where: { userId },
    update: parsed.data,
    create: { ...parsed.data, userId },
  });

  revalidatePath("/dashboard");
  revalidatePath("/caregivers");
  return { profile };
}
