import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    where: {
      // published: true,
    },
    include: {
      author: true,
    },
  });
  console.log(posts);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 text-[#333333]">
      <h1 className="text-4xl font-bold mb-8 font-sans">Posts</h1>
      <ul className="font-sans max-w-2xl space-y-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <span className="font-semibold">{post.title}</span>
            <span className="text-sm text-gray-600 ml-2">
              by {post.author.name}
            </span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
