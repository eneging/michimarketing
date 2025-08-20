import { blogPosts } from "../../data/blogPosts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface BlogPageProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  const relatedPosts = post.relatedPosts
    ? blogPosts.filter((p) => post.relatedPosts?.includes(p.slug))
    : [];

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 md:px-6 bg-white">
      {/* Encabezado */}
      <header className="mb-10">
        {post.category && (
          <div className="flex justify-center mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900">
          {post.title}
        </h1>

        <p className="text-xl text-gray-800 text-center mb-8 max-w-3xl mx-auto">
          {post.excerpt}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center">
            {post.authorImage && (
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900">{post.author}</p>
              {post.authorRole && (
                <p className="text-sm text-gray-900">{post.authorRole}</p>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-800">
            <span>
              {new Date(post.date).toLocaleDateString("es-PE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.readTime && (
              <>
                <span className="mx-2">•</span>
                <span>{post.readTime} min de lectura</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Imagen destacada */}
      {post.featuredImage && (
        <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={post.featuredImage}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Contenido del artículo */}
      <div
        className="prose prose-lg max-w-none mb-12 text-gray-950"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Etiquetas */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Etiquetas</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Posts relacionados */}
      {relatedPosts.length > 0 && (
        <div className="border-t pt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Artículos relacionados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-lg mb-2 text-gray-900">
                  {relatedPost.title}
                </h4>
                <p className="text-gray-800 text-sm mb-3">
                  {relatedPost.excerpt}
                </p>
                <span className="text-blue-600 text-sm font-medium">
                  Leer más →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Compartir */}
      <div className="mt-12 pt-8 border-t">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Compartir este artículo
        </h3>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            <span>Facebook</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg text-sm">
            <span>Twitter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">
            <span>LinkedIn</span>
          </button>
        </div>
      </div>
    </article>
  );
}
