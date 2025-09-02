// app/blog/[slug]/RelatedPosts.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface RelatedPost {
  slug: string;
  title: string;
  date: string;
  featured_image?: string;
}

interface RelatedPostsProps {
  relatedPosts: RelatedPost[];
}

export default function RelatedPosts({ relatedPosts }: RelatedPostsProps) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">Artículos relacionados</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {relatedPosts.map((related) => (
          <Link 
            key={related.slug} 
            href={`/blog/${related.slug}`}
            className="block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {related.featured_image && (
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={related.featured_image}
                  alt={related.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{related.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {new Date(related.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
              <span className="inline-flex items-center text-blue-600 font-medium text-sm">
                Leer más
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}