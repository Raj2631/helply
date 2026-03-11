import { getCaregivers } from "@/modules/caregivers/actions";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaregiverFilters } from "@/components/caregivers/caregiver-filters";
import { MapPin, Footprints, Home, Briefcase, ArrowRight, SearchX } from "lucide-react";

interface CaregiversPageProps {
  searchParams: Promise<{ city?: string; service?: string }>;
}

const SERVICE_LABELS: Record<string, string> = {
  DOG_WALKING: "Dog Walking",
  BOARDING: "Pet Boarding",
};

// Deterministic warm gradient per caregiver name
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

export default async function CaregiversPage({ searchParams }: CaregiversPageProps) {
  const { city, service } = await searchParams;

  const caregivers = await getCaregivers({
    city: city || undefined,
    service: service || undefined,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold">Find a Caregiver</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Browse trusted, experienced pet caregivers near you
        </p>
      </div>

      {/* Filters */}
      <CaregiverFilters currentCity={city} currentService={service} />

      {/* Empty state */}
      {caregivers.length === 0 ? (
        <div className="text-center py-24 space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
            <SearchX className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No caregivers found</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Try adjusting your filters or search in a nearby city.
          </p>
          <Button variant="outline" asChild>
            <Link href="/caregivers">Clear all filters</Link>
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm font-medium text-muted-foreground">
            {caregivers.length} caregiver{caregivers.length !== 1 ? "s" : ""} found
            {city && (
              <span className="text-foreground"> in {city}</span>
            )}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caregivers.map((caregiver) => {
              const displayName = caregiver.user.name ?? "Anonymous";
              const initials = displayName
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();
              const gradient = getAvatarGradient(displayName);

              return (
                <Card
                  key={caregiver.id}
                  className="group overflow-hidden border-2 border-transparent hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
                >
                  <CardContent className="p-0 flex flex-col h-full">
                    {/* Coloured top strip + avatar */}
                    <div className="relative h-20 bg-linear-to-br from-primary/15 to-amber-500/10">
                      <div className="absolute -bottom-7 left-6">
                        {caregiver.user.image ? (
                          <img
                            src={caregiver.user.image}
                            alt={displayName}
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-background shadow-md"
                          />
                        ) : (
                          <div
                            className={`w-14 h-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg border-2 border-background shadow-md`}
                          >
                            {initials}
                          </div>
                        )}
                      </div>
                      {caregiver.isVerified && (
                        <Badge
                          variant="success"
                          className="absolute top-3 right-4 text-xs font-semibold"
                        >
                          ✓ Verified
                        </Badge>
                      )}
                    </div>

                    {/* Body */}
                    <div className="pt-10 px-6 pb-5 flex flex-col flex-1 space-y-3">
                      <div>
                        <p className="font-bold text-base truncate">{displayName}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                          <MapPin className="size-3.5 shrink-0" />
                          <span className="truncate">
                            {caregiver.city}, {caregiver.state}
                          </span>
                        </div>
                      </div>

                      {caregiver.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {caregiver.bio}
                        </p>
                      )}

                      {/* Services */}
                      <div className="flex flex-wrap gap-1.5">
                        {caregiver.services.map((s) => (
                          <Badge key={s} variant="secondary" className="text-xs font-semibold">
                            {SERVICE_LABELS[s] ?? s}
                          </Badge>
                        ))}
                      </div>

                      {/* Pricing row */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        {caregiver.walkingRate != null && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Footprints className="size-3.5 text-primary" />
                            <span>
                              <strong className="text-foreground font-bold">
                                ${caregiver.walkingRate}
                              </strong>
                              /walk
                            </span>
                          </div>
                        )}
                        {caregiver.boardingRate != null && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Home className="size-3.5 text-primary" />
                            <span>
                              <strong className="text-foreground font-bold">
                                ${caregiver.boardingRate}
                              </strong>
                              /night
                            </span>
                          </div>
                        )}
                      </div>

                      {caregiver.yearsExperience != null && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Briefcase className="size-3.5" />
                          {caregiver.yearsExperience} yr{caregiver.yearsExperience !== 1 ? "s" : ""} experience
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-2 mt-auto">
                        <Button
                          className="w-full gap-2 shadow-sm shadow-primary/15 group-hover:shadow-md group-hover:shadow-primary/20 transition-shadow"
                          asChild
                        >
                          <Link href={`/caregivers/${caregiver.id}`}>
                            View Profile
                            <ArrowRight className="size-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
