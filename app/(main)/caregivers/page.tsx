import { getCaregivers } from "@/modules/caregivers/actions";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CaregiverFilters } from "@/components/caregivers/caregiver-filters";
import { MapPin, Star, Footprints, Home, User } from "lucide-react";

interface CaregiversPageProps {
  searchParams: Promise<{ city?: string; service?: string }>;
}

const SERVICE_LABELS: Record<string, string> = {
  DOG_WALKING: "Dog Walking",
  BOARDING: "Pet Boarding",
};

export default async function CaregiversPage({ searchParams }: CaregiversPageProps) {
  const { city, service } = await searchParams;

  const caregivers = await getCaregivers({
    city: city || undefined,
    service: service || undefined,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Find a Caregiver</h1>
        <p className="text-muted-foreground mt-1">
          Browse trusted, experienced pet caregivers near you
        </p>
      </div>

      {/* Filters */}
      <CaregiverFilters currentCity={city} currentService={service} />

      {/* Results */}
      {caregivers.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <p className="text-xl font-semibold">No caregivers found</p>
          <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
          <Button variant="outline" asChild>
            <Link href="/caregivers">Clear filters</Link>
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            {caregivers.length} caregiver{caregivers.length !== 1 ? "s" : ""} found
            {city && ` in ${city}`}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caregivers.map((caregiver) => (
              <Card
                key={caregiver.id}
                className="hover:border-primary/50 transition-colors overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Avatar header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                        {caregiver.user.image ? (
                          <img
                            src={caregiver.user.image}
                            alt={caregiver.user.name ?? "Caregiver"}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <User className="size-6" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold truncate">
                          {caregiver.user.name ?? "Anonymous"}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="size-3.5 shrink-0" />
                          <span className="truncate">
                            {caregiver.city}, {caregiver.state}
                          </span>
                        </div>
                        {caregiver.isVerified && (
                          <Badge variant="success" className="mt-1 text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>

                    {caregiver.bio && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                        {caregiver.bio}
                      </p>
                    )}
                  </div>

                  {/* Services + pricing */}
                  <div className="px-6 pb-4 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {caregiver.services.map((s) => (
                        <Badge key={s} variant="secondary" className="text-xs">
                          {SERVICE_LABELS[s] ?? s}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {caregiver.walkingRate != null && (
                        <div className="flex items-center gap-1">
                          <Footprints className="size-3.5" />
                          <span>${caregiver.walkingRate}/walk</span>
                        </div>
                      )}
                      {caregiver.boardingRate != null && (
                        <div className="flex items-center gap-1">
                          <Home className="size-3.5" />
                          <span>${caregiver.boardingRate}/night</span>
                        </div>
                      )}
                    </div>

                    {caregiver.yearsExperience != null && (
                      <p className="text-xs text-muted-foreground">
                        {caregiver.yearsExperience} yr{caregiver.yearsExperience !== 1 ? "s" : ""}{" "}
                        of experience
                      </p>
                    )}
                  </div>

                  <div className="px-6 pb-6">
                    <Button className="w-full" asChild>
                      <Link href={`/caregivers/${caregiver.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
