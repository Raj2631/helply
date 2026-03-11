"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { caregiverProfileSchema, type CaregiverProfileFormData } from "@/modules/profiles/types";
import { createCaregiverProfile, updateCaregiverProfile } from "@/modules/profiles/actions";
import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CaregiverProfile } from "@/generated/prisma/client";

const SERVICES = [
  { value: "DOG_WALKING", label: "Dog Walking" },
  { value: "BOARDING", label: "Pet Boarding" },
];

interface CaregiverOnboardingFormProps {
  existing?: CaregiverProfile | null;
}

export function CaregiverOnboardingForm({ existing }: CaregiverOnboardingFormProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CaregiverProfileFormData>({
    resolver: zodResolver(caregiverProfileSchema),
    defaultValues: existing
      ? {
          bio: existing.bio ?? "",
          yearsExperience: existing.yearsExperience ?? undefined,
          city: existing.city,
          state: existing.state,
          walkingRate: existing.walkingRate ?? undefined,
          boardingRate: existing.boardingRate ?? undefined,
          maxBoardingDogs: existing.maxBoardingDogs ?? undefined,
          services: existing.services,
        }
      : { services: [] },
  });

  const selectedServices = watch("services") || [];

  async function onSubmit(data: CaregiverProfileFormData) {
    if (!session?.user) return;
    setServerError(null);

    const result = existing
      ? await updateCaregiverProfile(session.user.id, data)
      : await createCaregiverProfile(session.user.id, data);

    if ("error" in result && result.error) {
      setServerError(result.error);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <Card>
      <CardContent className="p-6">
        {serverError && (
          <div className="mb-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive p-3 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">About You</label>
            <Textarea
              {...register("bio")}
              placeholder="Tell pet owners about your experience, why you love animals, and what makes you a great caregiver…"
              className="min-h-[120px]"
            />
            {errors.bio && <p className="text-xs text-destructive">{errors.bio.message}</p>}
          </div>

          {/* Experience + Location */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Years of Experience</label>
              <Input {...register("yearsExperience", { valueAsNumber: true })} type="number" min="0" placeholder="3" />
              {errors.yearsExperience && (
                <p className="text-xs text-destructive">{errors.yearsExperience.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">City *</label>
              <Input {...register("city")} placeholder="San Francisco" />
              {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">State *</label>
              <Input {...register("state")} placeholder="CA" maxLength={2} />
              {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Services Offered *</label>
            <Controller
              name="services"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-3">
                  {SERVICES.map((service) => {
                    const selected = field.value?.includes(service.value);
                    return (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => {
                          const current = field.value || [];
                          field.onChange(
                            selected
                              ? current.filter((v) => v !== service.value)
                              : [...current, service.value]
                          );
                        }}
                        className="transition-all"
                      >
                        <Badge
                          variant={selected ? "default" : "outline"}
                          className="cursor-pointer px-4 py-1.5 text-sm hover:border-primary"
                        >
                          {service.label}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.services && (
              <p className="text-xs text-destructive">{errors.services.message}</p>
            )}
          </div>

          {/* Pricing */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Pricing</label>
            <div className="grid grid-cols-2 gap-4">
              {selectedServices.includes("DOG_WALKING") && (
                <div className="space-y-1.5">
                  <label className="text-xs text-muted-foreground">Dog Walking rate ($/walk)</label>
                  <Input
                    {...register("walkingRate", { valueAsNumber: true })}
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="25"
                  />
                  {errors.walkingRate && (
                    <p className="text-xs text-destructive">{errors.walkingRate.message}</p>
                  )}
                </div>
              )}

              {selectedServices.includes("BOARDING") && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Boarding rate ($/night)</label>
                    <Input
                      {...register("boardingRate", { valueAsNumber: true })}
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="50"
                    />
                    {errors.boardingRate && (
                      <p className="text-xs text-destructive">{errors.boardingRate.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Max dogs at once</label>
                    <Input
                      {...register("maxBoardingDogs", { valueAsNumber: true })}
                      type="number"
                      min="1"
                      placeholder="2"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
            {isSubmitting
              ? "Saving…"
              : existing
              ? "Update Profile"
              : "Create Caregiver Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
