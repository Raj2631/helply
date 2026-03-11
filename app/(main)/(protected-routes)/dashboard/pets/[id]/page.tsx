import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getPetById } from "@/modules/pets/actions";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { PetForm } from "@/components/pets/pet-form";

export default async function EditPetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const pet = await getPetById(id, session.user.id);
  if (!pet) notFound();

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/dashboard/pets">
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit {pet.name}</h1>
          <p className="text-sm text-muted-foreground">Update your pet&apos;s information</p>
        </div>
      </div>
      <PetForm pet={pet} />
    </div>
  );
}
