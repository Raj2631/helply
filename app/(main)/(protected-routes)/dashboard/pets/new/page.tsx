import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { PetForm } from "@/components/pets/pet-form";

export default function NewPetPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/dashboard/pets">
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add a Pet</h1>
          <p className="text-sm text-muted-foreground">Tell caregivers about your furry friend</p>
        </div>
      </div>
      <PetForm />
    </div>
  );
}
