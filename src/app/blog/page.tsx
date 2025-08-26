import Link from "next/link";
import Image from "next/image";
// Asegúrate que la ruta de importación sea correcta para tu proyecto.
import { blogPosts, BlogPost } from "../data/blogPosts";

export const dynamic = "force-static";

// --- COMPONENTES DE ICONOS MEJORADOS PARA ACCESIBILIDAD ---
const IconCalendar = () => (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);
const IconUser = () => (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default function BlogPage() {
    // --- VALIDACIÓN ANTI-ERRORES: Comprobar si hay posts ---
    if (!blogPosts || blogPosts.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl font-bold text-emerald-400">Nuestro Blog</h1>
                <p className="mt-4 text-lg text-gray-400">Aún estamos preparando contenido increíble. ¡Vuelve pronto!</p>
            </div>
        );
    }

    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Hero Section con la nueva paleta de colores */}
            <section className="relative bg-gray-900/50 text-center py-20 sm:py-24 lg:py-32">
                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500 animate-fade-in-down">
                        MichiMarketing Blog 🐱
                    </h1>
                    <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up [animation-delay:0.2s]">
                        Estrategias, herramientas y creatividad para que tu negocio despegue en el mundo digital.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-20 text-[#0a0a0a]" style={{ transform: 'translateY(1px)' }}>
                    <svg fill="currentColor" viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,50 C360,110 720,0 1080,50 C1440,100 1440,100 1440,100 L1440,100 L0,100 Z"></path>
                    </svg>
                </div>
            </section>

            {/* Contenedor de Posts */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-10 text-center sm:text-left">Últimos artículos</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Featured Post */}
                    <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="group block lg:col-span-2 rounded-2xl overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-emerald-400/50 hover:-translate-y-2 transition-all duration-300 shadow-lg"
                        aria-label={`Leer artículo destacado: ${featuredPost.title}`}
                    >
                        <div className="flex flex-col sm:flex-row h-full">
                            <div className="relative w-full sm:w-1/2 h-64 sm:h-auto">
                                {featuredPost.featuredImage ? (
                                    <Image
                                        src={featuredPost.featuredImage}
                                        alt={featuredPost.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
                                )}
                            </div>
                            <div className="p-6 sm:p-8 flex flex-col justify-center sm:w-1/2">
                                <span className="text-xs uppercase text-emerald-400 font-semibold tracking-wider">
                                    {featuredPost.category || "Destacado"}
                                </span>
                                <h3 className="mt-2 text-2xl font-bold group-hover:text-emerald-400 transition-colors">
                                    {featuredPost.title}
                                </h3>
                                <p className="text-gray-400 text-sm mt-3 line-clamp-3">{featuredPost.excerpt}</p>
                                <div className="mt-5 flex items-center text-xs text-gray-500">
                                    <span className="flex items-center"><IconCalendar /> {new Date(featuredPost.date).toLocaleDateString("es-PE", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    <span className="mx-2">•</span>
                                    <span className="flex items-center"><IconUser /> {featuredPost.author}</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Otros Posts */}
                    {otherPosts.map((post: BlogPost) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block rounded-2xl overflow-hidden bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-emerald-400/50 hover:-translate-y-2 transition-all duration-300 shadow-lg flex flex-col"
                            aria-label={`Leer artículo: ${post.title}`}
                        >
                            <div className="relative w-full h-48">
                                {post.featuredImage ? (
                                    <Image
                                        src={post.featuredImage}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
                                )}
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <span className="text-xs uppercase text-emerald-400 font-semibold tracking-wider">
                                    {post.category || "Marketing"}
                                </span>
                                <h3 className="mt-2 text-xl font-bold group-hover:text-emerald-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-2 flex-grow">{post.excerpt}</p>
                                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                                    <span className="flex items-center"><IconCalendar /> {new Date(post.date).toLocaleDateString("es-PE")}</span>
                                    <span className="flex items-center"><IconUser /> {post.author}</span>
                                </div>
                                <span className="mt-4 text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Leer más →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}