"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, type PetFormData } from "@/modules/pets/types";
import { createPet, updatePet, deletePet } from "@/modules/pets/actions";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { Pet } from "@/generated/prisma/client";

interface PetFormProps {
  pet?: Pet;
}

export function PetForm({ pet }: PetFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
    defaultValues: pet
      ? {
          name: pet.name,
          type: pet.type,
          breed: pet.breed ?? "",
          age: pet.age ?? undefined,
          weight: pet.weight ?? undefined,
          notes: pet.notes ?? "",
        }
      : undefined,
  });

  async function onSubmit(data: PetFormData) {
    if (!session?.user) return;
    setServerError(null);

    const result = pet
      ? await updatePet(session.user.id, pet.id, data)
      : await createPet(session.user.id, data);

    if ("error" in result && result.error) {
      setServerError(result.error);
      return;
    }

    router.push("/dashboard/pets");
    router.refresh();
  }

  async function handleDelete() {
    if (!session?.user || !pet) return;
    setIsDeleting(true);
    await deletePet(session.user.id, pet.id);
    router.push("/dashboard/pets");
    router.refresh();
  }

  return (
    <Card>
      <CardContent className="p-6">
        {serverError && (
          <div className="mb-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive p-3 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Pet Name *</label>
              <Input {...register("name")} placeholder="Buddy" />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Type *</label>
              <Input {...register("type")} placeholder="Dog, Cat, Bird…" />
              {errors.type && <p className="text-xs text-destructive">{errors.type.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Breed</label>
              <Input {...register("breed")} placeholder="Golden Retriever" />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Age (years)</label>
              <Input {...register("age", { valueAsNumber: true })} type="number" min="0" placeholder="3" />
              {errors.age && <p className="text-xs text-destructive">{errors.age.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Weight (lbs)</label>
              <Input {...register("weight", { valueAsNumber: true })} type="number" min="0" step="0.1" placeholder="45" />
              {errors.weight && <p className="text-xs text-destructive">{errors.weight.message}</p>}
            </div>

            <div className="col-span-2 space-y-1.5">
              <label className="text-sm font-medium">Notes for caregivers</label>
              <Textarea
                {...register("notes")}
                placeholder="Any special needs, dietary restrictions, medications, or behaviors caregivers should know about…"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Saving…" : pet ? "Save Changes" : "Add Pet"}
            </Button>
            {pet && (
              <Button
                type="button"
                variant="destructive"
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? "Deleting…" : "Delete"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
