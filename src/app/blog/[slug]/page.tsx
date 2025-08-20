// src/app/blog/[slug]/page.tsx
import { blogPosts } from "../../data/blogPosts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type BlogPageProps = {
  params: { slug: string};
  
};




export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  const relatedPosts = post.relatedPosts
    ? blogPosts.filter((p) => post.relatedPosts?.includes(p.slug))
    : [];

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 md:px-6 bg-white">
      {/* ✅ Título y fecha */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {new Date(post.date).toLocaleDateString()}
        </p>
      </header>

      {/* ✅ Imagen */}
      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={600}
        className="rounded-xl mb-6"
      />

      {/* ✅ Contenido del post */}
      <div className="prose lg:prose-xl">{post.content}</div>

      {/* ✅ Posts relacionados */}
      {relatedPosts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Posts relacionados</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <li key={related.slug} className="border rounded-lg p-4 shadow">
                <Link href={`/blog/${related.slug}`}>
                  <h3 className="text-lg font-medium">{related.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

// ✅ Generación estática para que Vercel compile bien
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
