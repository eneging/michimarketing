"use client";

import { useState, useEffect } from "react";
import CategoryCard from "./components/CategoryCard";
import Hero from "./components/Hero";
import ToolCard from "./components/ToolCard";
import { categories } from "./data/Categories";
import { tools as allTools } from "./data/tools";
import Newsletter from "./components/Newsletter";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [filteredTools, setFilteredTools] = useState(allTools);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const results = allTools.filter((tool) => {
      const matchesSearch =
        !searchTerm ||
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.tags &&
          tool.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ));

      const matchesCategory = !selectedCategory || tool.category === selectedCategory;

      const matchesPrice =
        !selectedPrice ||
        tool.pricing?.some((p) => {
          if (selectedPrice === "free") return p.plan === "free" || p.plan === "freemium";
          return p.plan === selectedPrice;
        });

      return matchesSearch && matchesCategory && matchesPrice;
    });

    setFilteredTools(results);
    setHasSearched(!!(searchTerm || selectedCategory || selectedPrice));
  }, [searchTerm, selectedCategory, selectedPrice]);

  const featuredTools = allTools.slice(0, 3);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* 🚀 HERO */}
      <Hero />
      {/* 🔍 Filtros y búsqueda */}
      <section className="shadow-md rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Encuentra la herramienta perfecta 🔎</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o tags..."
            className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
          <select
            className="w-full md:w-1/4 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">Todos los planes</option>
            <option value="free">Gratis</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </section>

      {/* 🎯 Resultados o categorías */}
      <section>
        {hasSearched ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">Resultados de tu búsqueda</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.length > 0 ? filteredTools.map((tool) => (
                <ToolCard key={tool.slug} {...tool} />
              )) : (
                <p className="text-center col-span-full">No se encontraron herramientas que coincidan con los filtros.</p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-8 text-center">Categorías Destacadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <CategoryCard key={cat.slug} {...cat} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* 🔥 Herramientas populares */}
      {!hasSearched && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Herramientas Populares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} {...tool} />
            ))}
          </div>
        </section>
      )}

      <Newsletter />
    </main>
  );
}
