"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Not authenticated");
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user?.isAdmin) throw new Error("Not authorized");
  return session;
}

export async function getAllCaregiverProfiles() {
  await requireAdmin();
  return prisma.caregiverProfile.findMany({
    include: {
      user: {
        select: { id: true, name: true, email: true, image: true, createdAt: true },
      },
    },
    orderBy: [{ isVerified: "asc" }, { createdAt: "desc" }],
  });
}

export async function setCaregiversVerified(profileId: string, verified: boolean) {
  await requireAdmin();
  await prisma.caregiverProfile.update({
    where: { id: profileId },
    data: { isVerified: verified },
  });
  revalidatePath("/admin/caregivers");
  revalidatePath("/caregivers");
}
