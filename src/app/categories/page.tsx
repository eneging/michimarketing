"use client";

import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import {
  Wand2,
  Megaphone,
  Palette,
  Mic2,
  Star,
  BarChart3,
  MessageSquare,
  Camera,
  Code,
  DollarSign,
  Mail,
} from "lucide-react";
import { ReactNode } from "react";

// --- Tipos ---
interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface Tool {
  id: number;
  name: string;
  slug: string;
  description?: string;
  category?: string;
  rating?: number;
}

// --- Íconos por slug ---
const customIcons: Record<string, ReactNode> = {
  "ai-tools": <Wand2 className="w-8 h-8" />,
  seo: <Megaphone className="w-8 h-8" />,
  "content-marketing": <Palette className="w-8 h-8" />,
  "social-media": <Mic2 className="w-8 h-8" />,
  analytics: <BarChart3 className="w-8 h-8" />,
  "customer-support": <MessageSquare className="w-8 h-8" />,
  "video-photo": <Camera className="w-8 h-8" />,
  development: <Code className="w-8 h-8" />,
  finance: <DollarSign className="w-8 h-8" />,
  email: <Mail className="w-8 h-8" />,
  default: <Star className="w-8 h-8" />,
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, toolsRes] = await Promise.all([
          fetch(`${API_URL}/categories`),
          fetch(`${API_URL}/tools`),
        ]);

        if (!catRes.ok || !toolsRes.ok) throw new Error("Error en la API");

        const catData = await catRes.json();
        const toolsData = await toolsRes.json();



        setCategories(catData.data || catData);
        setTools(toolsData.data || toolsData);
      
      } catch (err) {
        console.error("Error cargando categorías o herramientas:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL]);

  // función para contar herramientas por categoría (CORREGIDA)
  function countToolsByCategory(categoryName: string): number {
    return tools.filter(
      (tool) =>
        typeof tool.category === 'string' && 
        tool.category.toLowerCase() === categoryName.toLowerCase()
    ).length;
  }

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-center text-neutral-400">Cargando categorías...</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Encabezado */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-200 mb-4">
          Explora Categorías
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          Encuentra herramientas organizadas por categoría para potenciar tu
          productividad, marketing y creatividad.
        </p>
      </header>

      {/* Grid de categorías */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const toolCount = countToolsByCategory(category.name);

          return (
            <CategoryCard
              key={category.slug}
              name={category.name}
              slug={category.slug}
              description={category.description}
              icon={customIcons[category.slug] || customIcons.default}
              toolCount={toolCount}
            />
          );
        })}
      </section>

      {/* Estadísticas */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl px-8 py-6">
          <div>
            <div className="text-3xl font-bold text-neutral-200">
              {categories.length}
            </div>
            <div className="text-neutral-400 text-sm">Categorías</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neutral-200">
              {tools.length}
            </div>
            <div className="text-neutral-400 text-sm">Herramientas</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neutral-200">
              {tools.length > 0
                ? Math.round(
                    (tools.reduce((acc, tool) => acc + (tool.rating || 0), 0) /
                      tools.length) *
                      10
                  ) / 10
                : 0}
            </div>
            <div className="text-neutral-400 text-sm">Rating Promedio</div>
          </div>
        </div>
      </div>
    </main>
  );
}