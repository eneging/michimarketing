import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

// --- INTERFAZ DE DATOS ---
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  category?: string;
  author: string;
  date: string;
}

// --- ICONOS (Sin cambios) ---
const IconCalendar = () => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const IconUser = () => (
  <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

// --- COMPONENTE DE CARGA (SKELETON) ---
// ✅ **MEJORA UX: Se muestra mientras se cargan los datos**
const BlogSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
    {/* Skeleton Post Destacado */}
    <div className="lg:col-span-2 rounded-2xl bg-gray-900/80 border border-gray-800 p-6 flex flex-col sm:flex-row gap-6 h-[288px] sm:h-auto">
      <div className="bg-gray-800 rounded-lg w-full sm:w-1/2 h-48 sm:h-full"></div>
      <div className="w-full sm:w-1/2 flex flex-col justify-center">
        <div className="h-4 bg-gray-800 rounded w-1/4"></div>
        <div className="h-8 bg-gray-800 rounded w-full mt-4"></div>
        <div className="h-5 bg-gray-800 rounded w-3/4 mt-1"></div>
        <div className="h-12 bg-gray-800 rounded w-full mt-4"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2 mt-5"></div>
      </div>
    </div>
    {/* Skeleton Post Normal */}
    <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-5 flex flex-col">
      <div className="bg-gray-800 rounded-lg w-full h-40"></div>
      <div className="h-4 bg-gray-800 rounded w-1/3 mt-5"></div>
      <div className="h-6 bg-gray-800 rounded w-full mt-3"></div>
      <div className="h-10 bg-gray-800 rounded w-full mt-3"></div>
    </div>
  </div>
);


// --- COMPONENTE QUE OBTIENE Y MUESTRA LOS POSTS ---
async function BlogPosts() {

 const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  
  
  let blogPosts: BlogPost[] = [];

  try {
    const res = await fetch(`${API_URL}/api/blog-posts`, {
  next: { tags: ['blog-posts'] }, // se regenera cada hora
});
     if (!res.ok) {
      throw new Error('Fallo al obtener los datos de la API');
    }


    
    const json = await res.json();
console.log("Respuesta API:", json);
    blogPosts = Array.isArray(json?.data?.data) ? json.data.data : [];
  } catch (error) {
    console.error("Error cargando posts:", error);
    // ✅ **MEJORA UX: Muestra un error claro en la UI**



    return (
      <div className="text-center col-span-1 lg:col-span-3 py-12 bg-gray-900/50 rounded-2xl border border-red-500/30">
        <h3 className="text-2xl font-bold text-red-400">¡Oh, no! Algo salió mal</h3>
        <p className="text-gray-400 mt-2">No pudimos cargar los artículos del blog. Por favor, intenta de nuevo más tarde.</p>
      </div>
    );
  }

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="text-center col-span-1 lg:col-span-3 py-12 bg-gray-900/50 rounded-2xl">
        <h3 className="text-2xl font-bold text-emerald-400">Próximamente...</h3>
        <p className="text-gray-400 mt-2">Aún estamos preparando contenido increíble. ¡Vuelve pronto!</p>
      </div>
    );
  }

  const [featuredPost, ...otherPosts] = blogPosts;

  const getImageUrl = (path?: string) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${API_URL}${path}`;
  };
  
  const featuredImageUrl = getImageUrl(featuredPost.featured_image);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Post Destacado */}
      <Link
        href={`/blog/${featuredPost.slug}`}
        className="group block lg:col-span-2 rounded-2xl overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-emerald-400/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1"
      >
        <div className="flex flex-col sm:flex-row h-full">
          <div className="relative w-full sm:w-1/2 h-64 sm:h-auto">
            {featuredImageUrl ? (
              <Image src={featuredImageUrl} alt={featuredPost.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                 <span className="text-gray-600">🐱</span>
              </div>
            )}
          </div>
          <div className="p-6 sm:p-8 flex flex-col justify-center sm:w-1/2">
            <span className="text-xs uppercase text-emerald-400 font-semibold tracking-wider">{featuredPost.category || "Destacado"}</span>
            <h3 className="mt-2 text-2xl font-bold group-hover:text-emerald-300 transition-colors">{featuredPost.title}</h3>
            <p className="text-gray-400 text-sm mt-3 line-clamp-3">{featuredPost.excerpt}</p>
            <div className="mt-5 flex items-center text-xs text-gray-500">
              <span className="flex items-center"><IconCalendar /> {new Date(featuredPost.date).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="mx-2">•</span>
              <span className="flex items-center"><IconUser /> {featuredPost.author}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Otros Posts */}
      {otherPosts.map((post) => {
        const postImageUrl = getImageUrl(post.featured_image);
        return (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group rounded-2xl overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-emerald-400/50 transition-all duration-300 shadow-lg flex flex-col hover:shadow-emerald-500/10 hover:-translate-y-1">
            <div className="relative w-full h-48">
              {postImageUrl ? (
                <Image src={postImageUrl} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                 <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-600">🐱</span>
                 </div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-xs uppercase text-emerald-400 font-semibold tracking-wider">{post.category || "Marketing"}</span>
              <h3 className="mt-2 text-xl font-bold group-hover:text-emerald-300 transition-colors">{post.title}</h3>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2 flex-grow">{post.excerpt}</p>
              <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center"><IconCalendar /> {new Date(post.date).toLocaleDateString("es-PE")}</span>
                <span className="flex items-center"><IconUser /> {post.author}</span>
              </div>
              <div className="mt-4 text-emerald-400 text-sm font-semibold flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Leer más <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}


// --- PAGINA PRINCIPAL ---
export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* HERO */}
      <section className="relative bg-gray-900/50 text-center py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500">
            MichiMarketing Blog 🐱
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Estrategias, herramientas y creatividad para que tu negocio despegue en el mundo digital.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">
          Últimos artículos
        </h2>
        {/* ✅ **MEJORA UX: Suspense muestra un 'fallback' (el skeleton) mientras el contenido se carga** */}
        <Suspense fallback={<BlogSkeleton />}>
          <BlogPosts />
        </Suspense>
      </main>
    </div>
  );
}
