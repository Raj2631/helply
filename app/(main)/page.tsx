import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Star, Clock, Heart, PawPrint, Footprints, Home } from "lucide-react";

const services = [
  {
    icon: Footprints,
    title: "Dog Walking",
    description:
      "Daily walks tailored to your dog's needs. Our experienced walkers keep your pup active, socialized, and happy.",
    badge: "Popular",
  },
  {
    icon: Home,
    title: "Pet Boarding",
    description:
      "Your pet stays in a warm, caring home while you're away — not a cold kennel. They get love, attention, and routine.",
    badge: "Top Rated",
  },
];

const trustFeatures = [
  {
    icon: Shield,
    title: "Verified Caregivers",
    description: "Every caregiver goes through our trust & safety review before being listed.",
  },
  {
    icon: Star,
    title: "Detailed Profiles",
    description: "Browse bios, experience, pricing, and location before reaching out.",
  },
  {
    icon: Clock,
    title: "Consistent Care",
    description: "Find caregivers who match your schedule and your pet's personality.",
  },
  {
    icon: Heart,
    title: "Pet-First Platform",
    description: "We're built for pet owners who want more than a last-minute sitter.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative px-4 py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
            <PawPrint className="size-3.5" />
            Pet Care Marketplace
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Trusted care for your{" "}
            <span className="text-primary">beloved pets</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Connect with experienced, verified pet caregivers in your area.
            Dog walking, boarding — handled by people who truly love animals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button size="lg" asChild>
              <Link href="/caregivers">Find a Caregiver</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/sign-up">Become a Caregiver</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-20 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Services we offer</h2>
          <p className="text-muted-foreground mt-2">
            Quality pet care, tailored to your needs
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="relative overflow-hidden hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <service.icon className="size-6 text-primary" />
                  </div>
                  <Badge variant="secondary">{service.badge}</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust Features */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Helply?</h2>
            <p className="text-muted-foreground mt-2">
              We know leaving your pet with someone new is a big deal
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature) => (
              <div key={feature.title} className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl font-bold">Ready to find the perfect caregiver?</h2>
          <p className="text-muted-foreground">
            Browse profiles, check pricing, and connect with caregivers in your city today.
          </p>
          <Button size="lg" asChild>
            <Link href="/caregivers">Browse Caregivers</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
