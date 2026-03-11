"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { petSchema, type PetFormData } from "./types";

export async function getUserPets(userId: string) {
  return prisma.pet.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPetById(petId: string, userId: string) {
  return prisma.pet.findFirst({
    where: { id: petId, ownerId: userId },
  });
}

export async function createPet(userId: string, data: PetFormData) {
  const parsed = petSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const pet = await prisma.pet.create({
    data: { ...parsed.data, ownerId: userId },
  });

  revalidatePath("/dashboard/pets");
  revalidatePath("/dashboard");
  return { pet };
}

export async function updatePet(userId: string, petId: string, data: PetFormData) {
  const parsed = petSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  const existing = await prisma.pet.findFirst({ where: { id: petId, ownerId: userId } });
  if (!existing) return { error: "Pet not found" };

  const pet = await prisma.pet.update({
    where: { id: petId },
    data: parsed.data,
  });

  revalidatePath("/dashboard/pets");
  revalidatePath("/dashboard");
  return { pet };
}

export async function deletePet(userId: string, petId: string) {
  const existing = await prisma.pet.findFirst({ where: { id: petId, ownerId: userId } });
  if (!existing) return { error: "Pet not found" };

  await prisma.pet.delete({ where: { id: petId } });
  revalidatePath("/dashboard/pets");
  revalidatePath("/dashboard");
  return { success: true };
}
