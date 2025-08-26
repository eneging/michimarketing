// app/blog/[slug]/page.tsx
import { blogPosts } from "../../data/blogPosts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ScrollToTop from "../[slug]/ScrollToTop";
import RelatedPosts from "../[slug]/RelatedPosts";

interface BlogPageParams {
  slug: string;
}

interface BlogPageProps {
  params: Promise<BlogPageParams>;
}

export const dynamic = "force-static";

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const relatedPosts = post.relatedPosts
    ? blogPosts.filter((p) => post.relatedPosts?.includes(p.slug))
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 rounded-3xl">
     
      
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-blue-600 transition-colors duration-200">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate max-w-xs md:max-w-md inline-block align-middle">
            {post.title}
          </span>
        </nav>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          <header className="p-6 md:p-8 pb-4 md:pb-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
              <span>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="hidden sm:inline">•</span>
              <span>{Math.ceil(post.content.split(' ').length / 200)} min de lectura</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 break-words">
              {post.title}
            </h1>
            
            {post.author && (
              <div className="flex items-center mt-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-semibold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{post.author}</p>
                  {post.authorRole && <p className="text-sm text-gray-600 truncate">{post.authorRole}</p>}
                </div>
              </div>
            )}
          </header>

          {post.featuredImage && (
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-8 md:pt-6">
            <div 
              className="blog-content text-gray-800 max-w-none overflow-hidden"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="px-6 md:px-8 pb-6 md:pb-8">
            {post.tags && (
              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 text-gray-900 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 break-words"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-200 gap-4">
              <Link 
                href="/blog"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium order-2 sm:order-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al blog
              </Link>
              
              <div className="order-1 sm:order-2">
                <ScrollToTop />
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <RelatedPosts relatedPosts={relatedPosts} />
        )}
      </div>
    </div>
  );
}

// Generación estática
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}