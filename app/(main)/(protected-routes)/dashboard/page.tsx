import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserProfiles } from "@/modules/profiles/actions";
import { getUserPets } from "@/modules/pets/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PawPrint, Briefcase, Search, Plus, ChevronRight } from "lucide-react";
import type { Pet } from "@/generated/prisma/client";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const [userWithProfiles, pets] = await Promise.all([
    getUserProfiles(session.user.id),
    getUserPets(session.user.id),
  ]);

  const hasCaregiverProfile = !!userWithProfiles?.caregiverProfile;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back{session.user.name ? `, ${session.user.name}` : ""}!</h1>
        <p className="text-muted-foreground mt-1">Manage your pets, profile, and discover caregivers.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="hover:border-primary/50 transition-colors">
          <Link href="/dashboard/pets">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <PawPrint className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">My Pets</p>
                <p className="text-sm text-muted-foreground">
                  {pets.length} {pets.length === 1 ? "pet" : "pets"} registered
                </p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <Link href={hasCaregiverProfile ? "/onboarding/caregiver" : "/onboarding/caregiver"}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Briefcase className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">Caregiver Profile</p>
                <p className="text-sm text-muted-foreground">
                  {hasCaregiverProfile ? "Manage your profile" : "Become a caregiver"}
                </p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <Link href="/caregivers">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Search className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">Find Caregivers</p>
                <p className="text-sm text-muted-foreground">Browse local caregivers</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground shrink-0" />
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Pets Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Pets</h2>
          <Button size="sm" asChild>
            <Link href="/dashboard/pets/new">
              <Plus className="size-4 mr-1" />
              Add Pet
            </Link>
          </Button>
        </div>

        {pets.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center space-y-3">
              <PawPrint className="size-10 text-muted-foreground mx-auto" />
              <h3 className="font-semibold">No pets yet</h3>
              <p className="text-sm text-muted-foreground">
                Add your first pet to get started with Helply.
              </p>
              <Button asChild>
                <Link href="/dashboard/pets/new">Add your first pet</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet: Pet) => (
              <Card key={pet.id} className="hover:border-primary/50 transition-colors">
                <Link href={`/dashboard/pets/${pet.id}`}>
                  <CardContent className="p-5 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{pet.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">{pet.type}</p>
                      </div>
                      {pet.breed && (
                        <Badge variant="outline" className="text-xs">
                          {pet.breed}
                        </Badge>
                      )}
                    </div>
                    {(pet.age || pet.weight) && (
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        {pet.age && <span>{pet.age} yr{pet.age !== 1 ? "s" : ""}</span>}
                        {pet.weight && <span>{pet.weight} lbs</span>}
                      </div>
                    )}
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Caregiver Status */}
      {hasCaregiverProfile && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Caregiver Profile</CardTitle>
                <CardDescription>
                  {userWithProfiles.caregiverProfile!.city},{" "}
                  {userWithProfiles.caregiverProfile!.state}
                </CardDescription>
              </div>
              <Badge variant={userWithProfiles.caregiverProfile!.isVerified ? "success" : "muted"}>
                {userWithProfiles.caregiverProfile!.isVerified ? "Verified" : "Pending Review"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userWithProfiles.caregiverProfile!.services.map((s) => (
                <Badge key={s} variant="secondary">
                  {s === "DOG_WALKING" ? "Dog Walking" : "Boarding"}
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/onboarding/caregiver">Edit Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
