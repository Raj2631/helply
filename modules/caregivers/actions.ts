"use server";

import prisma from "@/lib/prisma";
import type { CaregiverFilters } from "./types";

export async function getCaregivers(filters?: CaregiverFilters) {
  return prisma.caregiverProfile.findMany({
    where: {
      ...(filters?.city && {
        city: { contains: filters.city, mode: "insensitive" },
      }),
      ...(filters?.service && {
        services: { has: filters.service },
      }),
    },
    include: {
      user: {
        select: { id: true, name: true, image: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCaregiverById(id: string) {
  return prisma.caregiverProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, image: true, email: true },
      },
    },
  });
}
