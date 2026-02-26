"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardPage() {
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

  const { user } = session;

  console.log(user);
  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-4 ">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ModeToggle />
      <p>Welcome, {user.name || "User"}!</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => signOut()}
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
    </main>
  );
}
