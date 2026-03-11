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
  CalendarClock,
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

const AVATAR_GRADIENTS = [
  "from-orange-400 to-amber-500",
  "from-amber-400 to-yellow-500",
  "from-orange-500 to-red-400",
  "from-yellow-400 to-orange-400",
  "from-red-400 to-orange-500",
  "from-amber-500 to-orange-600",
];

function getAvatarGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

export default async function CaregiverProfilePage({ params }: CaregiverProfilePageProps) {
  const { id } = await params;
  const caregiver = await getCaregiverById(id);
  if (!caregiver) notFound();

  const displayName = caregiver.user.name ?? "Anonymous";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const gradient = getAvatarGradient(displayName);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Back */}
      <Button variant="ghost" size="sm" className="gap-1 -ml-1 text-muted-foreground hover:text-foreground" asChild>
        <Link href="/caregivers">
          <ChevronLeft className="size-4" />
          Back to caregivers
        </Link>
      </Button>

      {/* Hero Card */}
      <Card className="overflow-hidden border-2">
        {/* Gradient header strip */}
        <div className="h-28 bg-linear-to-br from-primary/20 via-amber-500/15 to-transparent relative">
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-card/60" />
        </div>

        <CardContent className="px-8 pb-8 -mt-10">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Avatar */}
            <div className="shrink-0">
              {caregiver.user.image ? (
                <img
                  src={caregiver.user.image}
                  alt={displayName}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-background shadow-lg"
                />
              ) : (
                <div
                  className={`w-20 h-20 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white font-extrabold text-2xl border-4 border-background shadow-lg`}
                >
                  {initials}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 pt-2 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold">{displayName}</h1>
                {caregiver.isVerified && (
                  <Badge variant="success" className="gap-1 font-semibold">
                    <Shield className="size-3" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  {caregiver.city}, {caregiver.state}
                </div>
                {caregiver.yearsExperience != null && (
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5 text-primary" />
                    {caregiver.yearsExperience} yr{caregiver.yearsExperience !== 1 ? "s" : ""} experience
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {caregiver.services.map((s) => (
                  <Badge key={s} variant="secondary" className="font-semibold">
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
          <h2 className="text-lg font-bold">About</h2>
          <p className="text-muted-foreground leading-relaxed text-base">{caregiver.bio}</p>
        </section>
      )}

      {/* Services & Pricing */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold">Services & Pricing</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {caregiver.services.includes("DOG_WALKING") && (
            <Card className="border-2 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-orange-500/15">
                      <Footprints className="size-5 text-orange-500" />
                    </div>
                    <span className="font-bold">Dog Walking</span>
                  </div>
                  {caregiver.walkingRate != null && (
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-primary">
                        ${caregiver.walkingRate}
                      </span>
                      <span className="text-sm text-muted-foreground">/walk</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {SERVICE_DESCRIPTIONS.DOG_WALKING}
                </p>
              </CardContent>
            </Card>
          )}

          {caregiver.services.includes("BOARDING") && (
            <Card className="border-2 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-amber-500/15">
                      <Home className="size-5 text-amber-500" />
                    </div>
                    <span className="font-bold">Pet Boarding</span>
                  </div>
                  {caregiver.boardingRate != null && (
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-primary">
                        ${caregiver.boardingRate}
                      </span>
                      <span className="text-sm text-muted-foreground">/night</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {SERVICE_DESCRIPTIONS.BOARDING}
                </p>
                {caregiver.maxBoardingDogs != null && (
                  <p className="text-xs text-muted-foreground border-t border-border pt-3">
                    Accepts up to{" "}
                    <strong className="text-foreground">{caregiver.maxBoardingDogs}</strong>{" "}
                    dog{caregiver.maxBoardingDogs !== 1 ? "s" : ""} at a time
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Trust note */}
      <Card className="border-primary/25 bg-primary/5">
        <CardContent className="p-5 flex gap-3">
          <div className="p-2 rounded-xl bg-primary/15 shrink-0 h-fit">
            <Shield className="size-4 text-primary" />
          </div>
          <div className="text-sm">
            <p className="font-bold text-foreground">Safety first</p>
            <p className="text-muted-foreground mt-1 leading-relaxed">
              All Helply caregivers go through a trust & safety review before appearing in search.
              Booking and messaging will be available soon.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button size="lg" className="flex-1 gap-2 shadow-lg shadow-primary/20" disabled>
          <CalendarClock className="size-4" />
          Request Booking — Coming Soon
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/caregivers">Browse others</Link>
        </Button>
      </div>
    </div>
  );
}
