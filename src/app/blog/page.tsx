// src/app/blog/page.tsx
import Link from "next/link";
import Image from "next/image";
import { blogPosts, BlogPost } from "../data/blogPosts";

export const dynamic = "force-static";

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-white">Blog</h1>
      <p className="text-gray-400 mt-2">
        Artículos, guías y comparativas sobre herramientas digitales.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post: BlogPost) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:bg-gray-800/70 transition"
            aria-label={`Leer artículo: ${post.title}`}
          >
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{post.excerpt}</p>
            {post.featuredImage && (
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={400}
                height={200}
                className="rounded-lg mt-3"
              />
            )}
            <div className="mt-3 text-xs text-gray-500">
              {new Date(post.date).toLocaleDateString("es-PE")} • {post.author}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
