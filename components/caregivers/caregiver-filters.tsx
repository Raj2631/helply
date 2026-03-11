"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";

const SERVICES = [
  { value: "DOG_WALKING", label: "Dog Walking" },
  { value: "BOARDING", label: "Pet Boarding" },
];

interface CaregiverFiltersProps {
  currentCity?: string;
  currentService?: string;
}

export function CaregiverFilters({ currentCity, currentService }: CaregiverFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [city, setCity] = useState(currentCity ?? "");

  function applyFilters(newCity: string, newService?: string) {
    const params = new URLSearchParams();
    if (newCity.trim()) params.set("city", newCity.trim());
    if (newService) params.set("service", newService);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function clearFilters() {
    setCity("");
    startTransition(() => {
      router.push(pathname);
    });
  }

  const hasFilters = !!currentCity || !!currentService;

  return (
    <div className="space-y-3">
      {/* City search */}
      <div className="flex gap-2 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters(city, currentService)}
            placeholder="Search by city…"
            className="pl-9"
          />
        </div>
        <Button
          onClick={() => applyFilters(city, currentService)}
          disabled={isPending}
          size="sm"
        >
          Search
        </Button>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="size-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Service filter */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground self-center">Service:</span>
        {SERVICES.map((s) => (
          <button
            key={s.value}
            onClick={() =>
              applyFilters(city, currentService === s.value ? undefined : s.value)
            }
            className="transition-all"
          >
            <Badge
              variant={currentService === s.value ? "default" : "outline"}
              className="cursor-pointer hover:border-primary"
            >
              {s.label}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
}
