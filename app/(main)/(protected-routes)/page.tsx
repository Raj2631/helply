import prisma from "@/lib/prisma";

export default async function Home() {
  return <div></div>;
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   return (
//     <main className="flex items-center justify-center h-screen  text-white">
//       <div className="flex gap-4">
//         <Button onClick={() => router.push("/sign-up")}>Sign Up</Button>
//         <Button onClick={() => router.push("/sign-in")} variant="secondary">
//           Sign In
//         </Button>
//       </div>
//     </main>
//   );
// }
