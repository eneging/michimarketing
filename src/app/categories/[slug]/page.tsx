// app/categories/[slug]/page.tsx
import { Wand2, Megaphone, Palette, BarChart3, Users, MessageSquare, Camera, Code, DollarSign, Mail } from "lucide-react";
import { tools } from "../../data/tools";
import { categories } from "../../data/Categories";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

// Definimos el tipo para el icono como React.ReactNode
import type { ReactNode } from 'react';

// Íconos dinámicos para categorías
const categoryIcons: { [key: string]: ReactNode } = {
  "ai-tools": <Wand2 className="w-12 h-12 text-blue-500" />,
  seo: <Megaphone className="w-12 h-12 text-red-500" />,
  "content-marketing": <Palette className="w-12 h-12 text-purple-500" />,
  analytics: <BarChart3 className="w-12 h-12 text-green-500" />,
  "social-media": <Users className="w-12 h-12 text-pink-500" />,
  "customer-support": <MessageSquare className="w-12 h-12 text-yellow-500" />,
  "video-photo": <Camera className="w-12 h-12 text-indigo-500" />,
  development: <Code className="w-12 h-12 text-orange-500" />,
  finance: <DollarSign className="w-12 h-12 text-emerald-500" />,
  email: <Mail className="w-12 h-12 text-cyan-500" />,
};

// Tipos para los parámetros
interface CategoryPageParams {
  slug: string;
}

interface CategoryPageProps {
  params: Promise<CategoryPageParams>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Encontrar la categoría
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }
  
  // Filtrar herramientas por categoría
  const categoryTools = tools.filter((tool) => tool.category === category.name);
  
  // Obtener el icono para la categoría o usar uno por defecto
  const categoryIcon = categoryIcons[slug] || <Wand2 className="w-12 h-12 text-gray-500" />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header de la categoría */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gray-900 rounded-2xl border border-gray-800">
            {categoryIcon}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {category.description}
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">{categoryTools.length}</div>
          <div className="text-gray-400">Herramientas</div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            {Math.round(categoryTools.reduce((acc, tool) => acc + (tool.rating || 0), 0) / categoryTools.length || 0)}
          </div>
          <div className="text-gray-400">Rating Promedio</div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">
            {new Set(categoryTools.flatMap(tool => tool.tags || [])).size}
          </div>
          <div className="text-gray-400">Tags Únicos</div>
        </div>
      </div>

      {/* Lista de herramientas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:bg-gray-900 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-4">
              {tool.logo && (
                <div className="w-12 h-12 bg-gray-800 rounded-xl border border-gray-700 flex items-center justify-center">
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                  />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {tool.name}
                </h3>
                {tool.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <div className="text-yellow-400 text-sm">★</div>
                    <span className="text-gray-400 text-sm">{tool.rating}</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-sm line-clamp-2">
              {tool.description}
            </p>
            {tool.tags && tool.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-4">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
                {tool.tags.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{tool.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Mensaje si no hay herramientas */}
      {categoryTools.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No hay herramientas en esta categoría todavía.
          </div>
          <Link
            href="/tools"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Ver todas las herramientas →
          </Link>
        </div>
      )}
    </div>
  );
}

// Generación estática de rutas
export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Metadata para SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  
  return {
    title: category ? `${category.name} - Herramientas de Marketing` : "Categoría no encontrada",
    description: category?.description || "Explora herramientas de marketing digital",
  };
}