import { getCaregiverById } from "@/modules/caregivers/actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Briefcase,
  Footprints,
  Home,
  Shield,
  User,
  ChevronLeft,
} from "lucide-react";

interface CaregiverProfilePageProps {
  params: Promise<{ id: string }>;
}

const SERVICE_LABELS: Record<string, string> = {
  DOG_WALKING: "Dog Walking",
  BOARDING: "Pet Boarding",
};

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  DOG_WALKING:
    "Personalized walks designed around your dog's pace and energy. Your pup gets the exercise, mental stimulation, and fresh air they deserve.",
  BOARDING:
    "Your pet stays in a warm, loving home — not a kennel. They get personal attention, a consistent routine, and plenty of affection.",
};

export default async function CaregiverProfilePage({ params }: CaregiverProfilePageProps) {
  const { id } = await params;
  const caregiver = await getCaregiverById(id);

  if (!caregiver) notFound();

  const initials = (caregiver.user.name ?? "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Back */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/caregivers">
          <ChevronLeft className="size-4 mr-1" />
          Back to caregivers
        </Link>
      </Button>

      {/* Hero Card */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0">
              {caregiver.user.image ? (
                <img
                  src={caregiver.user.image}
                  alt={caregiver.user.name ?? "Caregiver"}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="size-8" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {caregiver.user.name ?? "Anonymous"}
                </h1>
                {caregiver.isVerified && (
                  <Badge variant="success" className="gap-1">
                    <Shield className="size-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {caregiver.city}, {caregiver.state}
                </div>
                {caregiver.yearsExperience != null && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="size-4" />
                    {caregiver.yearsExperience} yr{caregiver.yearsExperience !== 1 ? "s" : ""} experience
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {caregiver.services.map((s) => (
                  <Badge key={s} variant="secondary">
                    {SERVICE_LABELS[s] ?? s}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio */}
      {caregiver.bio && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">About</h2>
          <p className="text-muted-foreground leading-relaxed">{caregiver.bio}</p>
        </section>
      )}

      {/* Services & Pricing */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Services & Pricing</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {caregiver.services.includes("DOG_WALKING") && (
            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Footprints className="size-4 text-primary" />
                    </div>
                    <span className="font-medium">Dog Walking</span>
                  </div>
                  {caregiver.walkingRate != null && (
                    <span className="text-lg font-bold text-primary">
                      ${caregiver.walkingRate}
                      <span className="text-sm font-normal text-muted-foreground">/walk</span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {SERVICE_DESCRIPTIONS.DOG_WALKING}
                </p>
              </CardContent>
            </Card>
          )}

          {caregiver.services.includes("BOARDING") && (
            <Card>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Home className="size-4 text-primary" />
                    </div>
                    <span className="font-medium">Pet Boarding</span>
                  </div>
                  {caregiver.boardingRate != null && (
                    <span className="text-lg font-bold text-primary">
                      ${caregiver.boardingRate}
                      <span className="text-sm font-normal text-muted-foreground">/night</span>
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {SERVICE_DESCRIPTIONS.BOARDING}
                </p>
                {caregiver.maxBoardingDogs != null && (
                  <p className="text-xs text-muted-foreground">
                    Accepts up to {caregiver.maxBoardingDogs} dog{caregiver.maxBoardingDogs !== 1 ? "s" : ""} at a time
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Trust note */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-5 flex gap-3">
          <Shield className="size-5 text-primary shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Safety first</p>
            <p className="text-muted-foreground mt-0.5">
              All Helply caregivers go through a trust & safety review. Booking and messaging
              will be available soon.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" className="flex-1" disabled>
          Request Booking — Coming Soon
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/caregivers">Browse others</Link>
        </Button>
      </div>
    </div>
  );
}
