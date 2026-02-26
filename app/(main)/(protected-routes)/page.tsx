import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold mb-8 font-sans text-[#ddd]">
          Superblog
        </h1>
        <ol className="list-decimal list-inside font-sans">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              {user.name}
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
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
