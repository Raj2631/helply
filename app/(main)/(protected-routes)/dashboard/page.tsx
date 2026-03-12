import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserProfiles } from "@/modules/profiles/actions";
import { getUserPets } from "@/modules/pets/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PawPrint, Briefcase, Search, Plus, ChevronRight, Pencil, ShieldCheck } from "lucide-react";
import type { Pet } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

const PET_TYPE_EMOJI: Record<string, string> = {
  dog: "🐕",
  cat: "🐈",
  bird: "🐦",
  rabbit: "🐇",
  fish: "🐠",
};

function petEmoji(type: string) {
  return PET_TYPE_EMOJI[type.toLowerCase()] ?? "🐾";
}

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const [userWithProfiles, pets, dbUser] = await Promise.all([
    getUserProfiles(session.user.id),
    getUserPets(session.user.id),
    prisma.user.findUnique({ where: { id: session.user.id }, select: { isAdmin: true } }),
  ]);

  const hasCaregiverProfile = !!userWithProfiles?.caregiverProfile;
  const firstName = session.user.name?.split(" ")[0];
  const isAdmin = dbUser?.isAdmin ?? false;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold">
          Welcome back{firstName ? `, ${firstName}` : ""}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your pets, profile, and discover caregivers.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            href: "/dashboard/pets",
            icon: PawPrint,
            label: "My Pets",
            sub: `${pets.length} ${pets.length === 1 ? "pet" : "pets"} registered`,
            iconBg: "bg-orange-500/15",
            iconColor: "text-orange-500",
          },
          {
            href: "/onboarding/caregiver",
            icon: Briefcase,
            label: "Caregiver Profile",
            sub: hasCaregiverProfile ? "Manage your profile" : "Become a caregiver",
            iconBg: "bg-amber-500/15",
            iconColor: "text-amber-500",
          },
          {
            href: "/caregivers",
            icon: Search,
            label: "Find Caregivers",
            sub: "Browse local caregivers",
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
          },
          ...(isAdmin
            ? [
                {
                  href: "/admin/caregivers",
                  icon: ShieldCheck,
                  label: "Review Caregivers",
                  sub: "Admin — verify applications",
                  iconBg: "bg-emerald-500/15",
                  iconColor: "text-emerald-500",
                },
              ]
            : []),
        ].map((action) => (
          <Card
            key={action.href}
            className="group border-2 border-transparent hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-200"
          >
            <Link href={action.href}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${action.iconBg} shrink-0`}>
                  <action.icon className={`size-5 ${action.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{action.sub}</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Pets Section */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Pets</h2>
          <Button size="sm" className="gap-1.5 shadow-sm shadow-primary/15" asChild>
            <Link href="/dashboard/pets/new">
              <Plus className="size-3.5" />
              Add Pet
            </Link>
          </Button>
        </div>

        {pets.length === 0 ? (
          <Card className="border-2 border-dashed border-primary/20 bg-primary/5">
            <CardContent className="p-14 text-center space-y-4">
              <div className="text-5xl">🐾</div>
              <h3 className="font-bold text-lg">No pets yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Add your first pet so caregivers know who they&apos;ll be looking after.
              </p>
              <Button asChild className="shadow-sm shadow-primary/20">
                <Link href="/dashboard/pets/new">Add your first pet</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pets.map((pet: Pet) => (
              <Card
                key={pet.id}
                className="group border-2 border-transparent hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10 transition-all duration-200"
              >
                <Link href={`/dashboard/pets/${pet.id}`}>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{petEmoji(pet.type)}</span>
                        <div>
                          <p className="font-bold">{pet.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{pet.type}</p>
                        </div>
                      </div>
                      <Pencil className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {pet.breed && (
                        <Badge variant="outline" className="text-xs font-semibold">
                          {pet.breed}
                        </Badge>
                      )}
                      {pet.age != null && (
                        <Badge variant="muted" className="text-xs">
                          {pet.age} yr{pet.age !== 1 ? "s" : ""}
                        </Badge>
                      )}
                      {pet.weight != null && (
                        <Badge variant="muted" className="text-xs">
                          {pet.weight} lbs
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Caregiver Profile Status */}
      {hasCaregiverProfile && (
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base font-bold">Your Caregiver Profile</CardTitle>
                <CardDescription className="mt-0.5">
                  {userWithProfiles.caregiverProfile!.city},{" "}
                  {userWithProfiles.caregiverProfile!.state}
                </CardDescription>
              </div>
              <Badge
                variant={userWithProfiles.caregiverProfile!.isVerified ? "success" : "muted"}
                className="shrink-0 font-semibold"
              >
                {userWithProfiles.caregiverProfile!.isVerified ? "✓ Verified" : "Pending Review"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {userWithProfiles.caregiverProfile!.services.map((s) => (
                <Badge key={s} variant="secondary" className="font-semibold">
                  {s === "DOG_WALKING" ? "Dog Walking" : "Boarding"}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/onboarding/caregiver">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
