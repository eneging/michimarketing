"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Tool = {
  id: number;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  category?: { id: number; name: string; slug: string };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const [results, setResults] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;

    setLoading(true);

    fetch(`${API_URL}/tools?search=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.data ?? []); // 👈 Laravel manda { data: [...] }
      })
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-6">
        Resultados para: <span className="text-blue-400">{q}</span>
      </h1>

      {loading && <p className="text-gray-400">Buscando...</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-400">No se encontraron resultados.</p>
      )}

      <ul className="space-y-4">
        {results.map((tool) => (
          <li
            key={tool.id}
            className="p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <a
              href={`/tools/${tool.slug}`}
              className="text-lg font-semibold text-blue-400"
            >
              {tool.name}
            </a>
            <p className="text-gray-400 text-sm">{tool.description}</p>
            {tool.category && (
              <p className="text-xs text-gray-500">
                Categoría: {tool.category.name}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
