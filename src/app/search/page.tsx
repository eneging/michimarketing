"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { tools } from "../../data/tools";
import { categories } from "../../data/Categories";

// Función para resaltar coincidencias
function highlight(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Si no hay query mostrar mensaje
  if (!query) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <p className="text-gray-500">
          Type something in the search bar above to find categories or tools.
        </p>
      </div>
    );
  }

  // Filtro de herramientas y categorías
  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.tags?.some((tag) => tag.toLowerCase().includes(query))
  );

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(query) ||
      cat.description.toLowerCase().includes(query)
  );

  const totalResults = filteredCategories.length + filteredTools.length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">
        Search results for:{" "}
        <span className="text-blue-600">“{query}”</span>
      </h1>
      <p className="text-gray-500 mb-10">{totalResults} results found</p>

      {/* Categorías */}
      {filteredCategories.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition"
              >
                <h3
                  className="font-bold text-lg mb-2"
                  dangerouslySetInnerHTML={{
                    __html: highlight(cat.name, query),
                  }}
                />
                <p
                  className="text-sm text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: highlight(cat.description, query),
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Herramientas */}
      {filteredTools.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition flex flex-col"
              >
                <h3
                  className="font-bold text-lg mb-2"
                  dangerouslySetInnerHTML={{
                    __html: highlight(tool.name, query),
                  }}
                />
                <p
                  className="text-sm text-gray-600 mb-3"
                  dangerouslySetInnerHTML={{
                    __html: highlight(tool.description, query),
                  }}
                />
                {/* Categoría */}
                {tool.category && (
                  <span className="text-xs text-blue-600 font-medium mb-2">
                    {tool.category}
                  </span>
                )}
                {/* Tags */}
                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
}
