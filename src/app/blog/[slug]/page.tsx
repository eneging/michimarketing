import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ScrollToTop } from "./ScrollToTop";

// --- Interfaces ---
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category?: string;
  author: string;
  author_image?: string;
  author_role?: string;
  date: string;
  tags?: string[];
  read_time?: number;
  relatedPosts?: string[];
}

interface BlogPageParams {
  slug: string;
}

interface BlogPageProps {
  params: Promise<BlogPageParams>; // 👈 nuevo estándar Next.js
}

export const dynamic = "force-static";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
// --- API helpers ---
async function getAllPosts(): Promise<BlogPost[]> {
  
  try {
    const res = await fetch(`${API_URL}/api/blog-posts`, { 


next: { tags: ['blog-posts'] },

    });
    if (!res.ok) return [];
    const json = await res.json();

    return Array.isArray(json?.data?.data) ? json.data.data : [];
  } catch {
    return [];
  }
}

async function getPostAndRelated(slug: string): Promise<{ post: BlogPost | null; related: BlogPost[] }> {
  const allPosts = await getAllPosts();
  const post = allPosts.find((p) => p.slug === slug) || null;
  const related = post?.relatedPosts ? allPosts.filter((p) => post.relatedPosts?.includes(p.slug)) : [];
  return { post, related };
}

// --- Metadata ---
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPostAndRelated(slug);

  if (!post) return { title: "Post no encontrado" };

 
  const image = post.featured_image
    ? post.featured_image.startsWith("http")
      ? post.featured_image
      : `${API_URL}${post.featured_image}`
    : "https://placehold.co/1200x630/0a0a0a/10b981?text=Blog";

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://michimarketing.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

// --- Page ---
export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const { post, related } = await getPostAndRelated(slug);

  if (!post) return notFound();

  return (
    <article className="max-w-4xl mx-auto py-12">
      {/* --- HERO --- */}
      {post.featured_image && (
        <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* --- HEADER --- */}
      <header className="mt-8 mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">{post.title}</h1>
        <p className="text-gray-400 mt-2">{post.excerpt}</p>

        <div className="flex items-center gap-4 mt-4">
          {post.author_image && (
            <Image
              src={post.author_image}
              alt={post.author}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium">{post.author}</p>
            {post.author_role && <p className="text-sm text-gray-500">{post.author_role}</p>}
            <p className="text-xs text-gray-400">
              {new Date(post.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })} ·{" "}
              {post.read_time || 5} min lectura
            </p>
          </div>
        </div>
      </header>

      {/* --- CONTENT --- */}
      <div className="blog-content prose prose-invert lg:prose-lg max-w-none mt-8">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* --- TAGS --- */}
      {post.tags && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-sm bg-emerald-900/50 rounded-full">
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

       
      

      {/* --- RELATED POSTS --- */}
{related.length > 0 && (
  <section className="mt-12">
    <h2 className="text-2xl font-bold mb-6">También te puede interesar</h2>
    <div className="grid gap-6 sm:grid-cols-2">
      {related.map((r) => (
        <Link
          key={r.slug}
          href={`/blog/${r.slug}`}
          className="p-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition"
        >
          {r.featured_image && (
            <Image
              src={r.featured_image}
              alt={r.title}
              width={400}
              height={200}
              className="rounded-lg mb-3 object-cover"
            />
          )}
          <h3 className="text-lg font-semibold">{r.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{r.excerpt}</p>
        </Link>
      ))}
    </div>
  </section>
)}

    </article>


  );
  
}




// --- Static Params ---
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
