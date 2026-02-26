"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoutesLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending) return <p className="text-center mt-8 ">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 ">Redirecting...</p>;

  return <div>{children}</div>;
};

export default ProtectedRoutesLayout;
