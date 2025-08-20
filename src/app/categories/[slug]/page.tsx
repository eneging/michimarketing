// app/categories/[slug]/page.tsx
import { categories } from "../../data/Categories";
import { tools } from "../../data/tools";
import ToolCard from "../../components/ToolCard";
import { Wand2, Megaphone, Palette, Mic2, Star } from "lucide-react";
import Link from "next/link";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-static";

// Íconos dinámicos para categorías
const categoryIcons: { [key: string]: JSX.Element } = {
  "ai-tools": <Wand2 className="w-12 h-12 text-blue-500" />,
  seo: <Megaphone className="w-12 h-12 text-red-500" />,
  "content-marketing": <Palette className="w-12 h-12 text-purple-500" />,
  "social-media": <Mic2 className="w-12 h-12 text-green-500" />,
  default: <Star className="w-12 h-12 text-yellow-500" />,
};

// Función para normalizar strings (minúsculas y reemplazo de espacios)
const normalize = (str: string | undefined) =>
  (str || "").toLowerCase().replace(/\s+/g, "-");

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => normalize(c.slug) === normalize(params.slug));

  if (!category) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-10 text-center">
        <h1 className="text-2xl font-bold mt-10 text-red-600">
          Category not found
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  // Filtramos herramientas usando normalize
  const categoryTools = tools.filter(
    (t) => normalize(t.category) === normalize(category.slug)
  );
  const icon = categoryIcons[normalize(category.slug)] || categoryIcons.default;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Header de categoría */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 p-10 mb-12 shadow-md">
        <div className="flex items-center gap-6">
          <div className="bg-white shadow-md p-4 rounded-2xl">{icon}</div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>
      </section>

      {/* Herramientas */}
      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard
              key={tool.slug}
              slug={tool.slug}
              name={tool.name}
              description={tool.description}
              logo={tool.logo}
              tags={tool.tags}
              rating={tool.rating}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Star className="w-12 h-12 mb-3 text-gray-400" />
          <p className="text-lg font-medium mb-4">
            No tools available in this category yet.
          </p>
          <Link
            href="/categories"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explore All Categories
          </Link>
        </div>
      )}
    </main>
  );
}
