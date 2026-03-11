import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Star,
  Clock,
  Heart,
  PawPrint,
  Footprints,
  Home,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    icon: Footprints,
    title: "Dog Walking",
    description:
      "Daily walks tailored to your dog's needs. Our experienced walkers keep your pup active, socialized, and happy.",
    badge: "Most Popular",
    gradientHover: "from-orange-500/15 to-amber-400/10",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-500/15",
  },
  {
    icon: Home,
    title: "Pet Boarding",
    description:
      "Your pet stays in a warm, caring home — not a cold kennel. They get love, attention, and a consistent routine.",
    badge: "Top Rated",
    gradientHover: "from-amber-500/15 to-yellow-400/10",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/15",
  },
];

const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Caregivers",
    description: "Every caregiver goes through our trust & safety review before listing.",
    iconClass: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: Star,
    title: "Detailed Profiles",
    description: "Browse bios, experience, pricing, and location before reaching out.",
    iconClass: "bg-amber-500/10 text-amber-500",
  },
  {
    icon: Clock,
    title: "Consistent Care",
    description: "Find caregivers who match your schedule and your pet's personality.",
    iconClass: "bg-orange-400/10 text-orange-400",
  },
  {
    icon: Heart,
    title: "Pet-First Platform",
    description: "Built for owners who want more than a last-minute sitter.",
    iconClass: "bg-red-500/10 text-red-400",
  },
];

const steps = [
  { step: "01", title: "Browse caregivers", desc: "Filter by city, service type, and availability." },
  { step: "02", title: "View full profiles", desc: "Read bios, experience, pricing, and reviews." },
  { step: "03", title: "Book with confidence", desc: "Secure booking with caregiver accountability." },
];

const stats = [
  { value: "500+", label: "Verified caregivers" },
  { value: "50+", label: "Cities covered" },
  { value: "2,000+", label: "Happy pets" },
  { value: "4.9★", label: "Average rating" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative px-4 py-28 sm:py-36 text-center">
        {/* Decorative blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -top-20 -right-25 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-175 h-40 bg-primary/8 blur-2xl" />
        </div>

        <div className="max-w-3xl mx-auto space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <PawPrint className="size-3.5" />
            Trusted pet care, on your terms
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
            Find care your{" "}
            <span className="relative inline-block text-primary">
              pet deserves
              <svg
                className="absolute -bottom-1 left-0 w-full overflow-visible"
                viewBox="0 0 300 10"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8C60 3 130 1 180 4C230 7 270 6 298 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary/40"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Connect with experienced, verified pet caregivers in your area.
            Dog walking, boarding — handled by people who truly love animals.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" className="gap-2 text-base px-8 shadow-lg shadow-primary/25" asChild>
              <Link href="/caregivers">
                Find a Caregiver
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <Link href="/sign-up">Become a Caregiver</Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-5 pt-1">
            {["No commitment", "Verified profiles", "Real reviews"].map((label) => (
              <div key={label} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section className="border-y border-border bg-card/80">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-4">
              <p className="text-3xl font-extrabold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section className="px-4 py-24 max-w-6xl mx-auto w-full">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-3 font-semibold">Services</Badge>
          <h2 className="text-4xl font-extrabold">Everything your pet needs</h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-lg mx-auto">
            Quality care tailored to your schedule and your pet&apos;s personality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className={`group relative overflow-hidden border-2 border-transparent hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10`}
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${service.gradientHover} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <CardContent className="relative p-8">
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3.5 rounded-2xl ${service.iconBg}`}>
                    <service.icon className={`size-7 ${service.iconColor}`} />
                  </div>
                  <Badge variant="secondary" className="font-semibold">
                    {service.badge}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <div className="mt-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 -ml-2 text-primary hover:text-primary hover:bg-primary/10"
                    asChild
                  >
                    <Link href="/caregivers">
                      Browse caregivers <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-4 py-24 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-3 font-semibold">How it works</Badge>
            <h2 className="text-4xl font-extrabold">Up and running in minutes</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-10 relative">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center space-y-4">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-7 left-[62%] w-[76%] border-t-2 border-dashed border-border/60" />
                )}
                <div className="relative mx-auto w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-lg shadow-lg shadow-primary/30">
                  {s.step}
                </div>
                <h3 className="font-bold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Helply ── */}
      <section className="px-4 py-24 max-w-6xl mx-auto w-full">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-3 font-semibold">Why Helply</Badge>
          <h2 className="text-4xl font-extrabold">Built around trust</h2>
          <p className="text-muted-foreground mt-3 text-lg max-w-lg mx-auto">
            We know leaving your pet with someone new is a big deal.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustFeatures.map((feature) => (
            <Card
              key={feature.title}
              className="group border-2 border-transparent hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <CardContent className="p-6 text-center space-y-3">
                <div
                  className={`mx-auto w-12 h-12 rounded-2xl flex items-center justify-center ${feature.iconClass}`}
                >
                  <feature.icon className="size-6" />
                </div>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-4 pb-24">
        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center shadow-2xl shadow-primary/30">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-black/10 blur-2xl pointer-events-none" />
          <div className="relative space-y-5">
            <PawPrint className="size-10 mx-auto text-primary-foreground/80" />
            <h2 className="text-4xl font-extrabold text-primary-foreground">
              Ready to find the perfect match?
            </h2>
            <p className="text-primary-foreground/75 text-lg max-w-xl mx-auto">
              Browse profiles, check pricing, and connect with caregivers in your city today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold px-8 shadow-lg"
                asChild
              >
                <Link href="/caregivers">Browse Caregivers</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-primary-foreground hover:bg-white/10 px-8"
                asChild
              >
                <Link href="/sign-up">Create an Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
