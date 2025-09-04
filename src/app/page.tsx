"use client";

import { useState, useEffect } from "react";

import Hero from "./components/Hero";
import ToolCard from "./components/ToolCard";

export default function Home() {
  const [tools, setTools] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Estados de paginación
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  // 🚀 cargar categorías
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data ?? []))
      .catch((err) => console.error(err));
  }, [API_URL]);

  // 🚀 cargar herramientas según filtros + página
  useEffect(() => {
    async function fetchTools() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString()); // 👈 incluir página

        if (searchTerm) params.append("search", searchTerm);
        if (selectedCategory) params.append("category_id", selectedCategory);
        if (selectedPrice) params.append("tag", selectedPrice);

        const res = await fetch(
          `${API_URL}/api/tools?${params.toString()}`
        );
        const data = await res.json();

        setTools(data.data ?? []);
        setPagination(data); // 👈 guardar metadata de paginación
      } catch (error) {
        console.error("Error cargando tools:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTools();
  }, [searchTerm, selectedCategory, selectedPrice, page, API_URL]);

  const featuredTools = tools.slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-4 lg:py-3 space-y-16">
      <Hero />

      {/* Filtros */}
      <section className="shadow-md rounded-xl p-6 space-y-6 ">
        <h2 className="text-2xl font-bold text-center">
          Encuentra la herramienta perfecta 🔎
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full md:w-1/2 border rounded-lg px-4 py-2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset página al filtrar
            }}
          />
          <select
            className="w-full md:w-1/4 border rounded-lg px-3 py-2"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            className="w-full md:w-1/4 border rounded-lg px-3 py-2"
            value={selectedPrice}
            onChange={(e) => {
              setSelectedPrice(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todos los planes</option>
            <option value="free">Gratis</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </section>

      {/* Resultados */}
      <section className="py-10">
        {loading ? (
          <p className="text-center">Cargando...</p>
        ) : tools.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>

            {/* 🔹 Controles de paginación */}
            {pagination && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  disabled={pagination.current_page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
                >
                  Anterior
                </button>
                <span>
                  Página {pagination.current_page} de {pagination.last_page}
                </span>
                <button
                  disabled={pagination.current_page === pagination.last_page}
                  onClick={() =>
                    setPage((prev) =>
                      Math.min(prev + 1, pagination.last_page)
                    )
                  }
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
                >
                  Siguiente 
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center">No se encontraron herramientas.</p>
        )}
      </section>



      {/* Destacados */}
      {!loading && tools.length > 0 && (
        <section className="py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Herramientas Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
