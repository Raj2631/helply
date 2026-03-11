import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserProfiles } from "@/modules/profiles/actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { CaregiverOnboardingForm } from "@/components/caregivers/caregiver-onboarding-form";

export default async function CaregiverOnboardingPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const userWithProfiles = await getUserProfiles(session.user.id);
  const existing = userWithProfiles?.caregiverProfile ?? null;

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/dashboard">
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {existing ? "Edit Caregiver Profile" : "Become a Caregiver"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {existing
              ? "Update your services, pricing, and bio"
              : "Set up your profile to start offering pet care services"}
          </p>
        </div>
      </div>

      {!existing && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">You&apos;re in good hands.</strong> Your profile will be
          reviewed by our team before appearing in search results.
        </div>
      )}

      <CaregiverOnboardingForm existing={existing} />
    </div>
  );
}
