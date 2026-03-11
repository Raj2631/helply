import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserPets } from "@/modules/pets/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PawPrint, Plus, Pencil } from "lucide-react";

export default async function PetsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const pets = await getUserPets(session.user.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Pets</h1>
          <p className="text-muted-foreground mt-1">Manage your pets' profiles</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/pets/new">
            <Plus className="size-4 mr-1" />
            Add Pet
          </Link>
        </Button>
      </div>

      {pets.length === 0 ? (
        <Card>
          <CardContent className="p-16 text-center space-y-4">
            <PawPrint className="size-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">No pets yet</h3>
            <p className="text-muted-foreground">
              Add your pets so caregivers know who they&apos;ll be caring for.
            </p>
            <Button asChild>
              <Link href="/dashboard/pets/new">Add your first pet</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {pets.map((pet) => (
            <Card key={pet.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{pet.type}</p>
                  </div>
                  <Button variant="ghost" size="icon-sm" asChild>
                    <Link href={`/dashboard/pets/${pet.id}`}>
                      <Pencil className="size-4" />
                    </Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {pet.breed && <Badge variant="outline">{pet.breed}</Badge>}
                  {pet.age != null && (
                    <Badge variant="muted">{pet.age} yr{pet.age !== 1 ? "s" : ""} old</Badge>
                  )}
                  {pet.weight != null && (
                    <Badge variant="muted">{pet.weight} lbs</Badge>
                  )}
                </div>

                {pet.notes && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{pet.notes}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
