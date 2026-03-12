import { getAllCaregiverProfiles, setCaregiversVerified } from "@/modules/admin/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  MapPin,
  Footprints,
  Home,
  Briefcase,
  Mail,
  CheckCircle2,
  Clock,
  User,
  ArrowLeft,
} from "lucide-react";

const SERVICE_LABELS: Record<string, string> = {
  DOG_WALKING: "Dog Walking",
  BOARDING: "Pet Boarding",
};

export default async function AdminCaregiversPage() {
  const profiles = await getAllCaregiverProfiles();

  const pending = profiles.filter((p) => !p.isVerified);
  const verified = profiles.filter((p) => p.isVerified);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button variant="ghost" size="icon-sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="size-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-extrabold">Caregiver Review</h1>
          </div>
          <p className="text-muted-foreground ml-9">
            Approve or reject caregiver profile applications
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <div className="text-center px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <p className="text-2xl font-extrabold text-amber-500">{pending.length}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
          <div className="text-center px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-2xl font-extrabold text-emerald-500">{verified.length}</p>
            <p className="text-xs text-muted-foreground">Verified</p>
          </div>
        </div>
      </div>

      {/* Pending profiles */}
      {pending.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-amber-500" />
            <h2 className="text-lg font-bold">Pending Review ({pending.length})</h2>
          </div>

          <div className="space-y-4">
            {pending.map((profile) => (
              <CaregiverReviewCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      )}

      {pending.length === 0 && (
        <Card className="border-2 border-dashed border-emerald-500/30 bg-emerald-500/5">
          <CardContent className="p-10 text-center space-y-2">
            <CheckCircle2 className="size-10 text-emerald-500 mx-auto" />
            <p className="font-bold text-lg">All caught up!</p>
            <p className="text-sm text-muted-foreground">No caregiver profiles pending review.</p>
          </CardContent>
        </Card>
      )}

      {/* Verified profiles */}
      {verified.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <h2 className="text-lg font-bold">Verified ({verified.length})</h2>
          </div>
          <div className="space-y-3">
            {verified.map((profile) => (
              <CaregiverReviewCard key={profile.id} profile={profile} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Review card ──────────────────────────────────────────────────────────────

type Profile = Awaited<ReturnType<typeof getAllCaregiverProfiles>>[number];

function CaregiverReviewCard({ profile }: { profile: Profile }) {
  const verifyAction = setCaregiversVerified.bind(null, profile.id, true);
  const unverifyAction = setCaregiversVerified.bind(null, profile.id, false);

  return (
    <Card className={`border-2 ${profile.isVerified ? "border-emerald-500/20" : "border-amber-500/25"}`}>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Avatar */}
          <div className="shrink-0">
            {profile.user.image ? (
              <img
                src={profile.user.image}
                alt={profile.user.name ?? "Caregiver"}
                className="w-14 h-14 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {(profile.user.name ?? "?")
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-base">
                    {profile.user.name ?? "Anonymous"}
                  </p>
                  <Badge variant={profile.isVerified ? "success" : "muted"} className="text-xs font-semibold">
                    {profile.isVerified ? "✓ Verified" : "Pending"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="size-3.5" />
                    {profile.user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {profile.city}, {profile.state}
                  </span>
                  {profile.yearsExperience != null && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="size-3.5" />
                      {profile.yearsExperience} yr{profile.yearsExperience !== 1 ? "s" : ""} exp
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 shrink-0">
                {!profile.isVerified ? (
                  <form action={verifyAction}>
                    <Button type="submit" size="sm" className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                      <CheckCircle2 className="size-3.5" />
                      Verify
                    </Button>
                  </form>
                ) : (
                  <form action={unverifyAction}>
                    <Button type="submit" size="sm" variant="outline" className="gap-1.5 text-muted-foreground">
                      <User className="size-3.5" />
                      Unverify
                    </Button>
                  </form>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/caregivers/${profile.id}`} target="_blank">
                    View Profile
                  </Link>
                </Button>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 bg-muted/40 rounded-lg px-3 py-2">
                &ldquo;{profile.bio}&rdquo;
              </p>
            )}

            {/* Services + pricing */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-wrap gap-1.5">
                {profile.services.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs font-semibold">
                    {SERVICE_LABELS[s] ?? s}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {profile.walkingRate != null && (
                  <span className="flex items-center gap-1">
                    <Footprints className="size-3.5 text-primary" />
                    <strong className="text-foreground">${profile.walkingRate}</strong>/walk
                  </span>
                )}
                {profile.boardingRate != null && (
                  <span className="flex items-center gap-1">
                    <Home className="size-3.5 text-primary" />
                    <strong className="text-foreground">${profile.boardingRate}</strong>/night
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Submitted {new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
