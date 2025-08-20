"use client";

import { useState, useEffect } from "react";
import CategoryCard from "./components/CategoryCard";
import Hero from "./components/Hero";
import ToolCard from "./components/ToolCard";
import { categories } from "./data/Categories";
import { tools as allTools } from "./data/tools";
import Newsletter from "./components/Newsletter";

export default function Home({
  params,
}: {
  params: { locale: string };
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [filteredTools, setFilteredTools] = useState(allTools);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Definimos los filtros
    const results = allTools.filter((tool) => {
      const matchesSearch =
        !searchTerm ||
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesCategory = !selectedCategory || tool.category === selectedCategory;

      const matchesPrice = !selectedPrice || tool.pricing?.some(p => {
        if (selectedPrice === "free") {
          return p.plan === "free" || p.plan === "freemium";
        }
        return p.plan === selectedPrice;
      });

      return matchesSearch && matchesCategory && matchesPrice;
    });

    setFilteredTools(results);

    // Actualizamos el estado de búsqueda
    setHasSearched(!!(searchTerm || selectedCategory || selectedPrice));
  }, [searchTerm, selectedCategory, selectedPrice]);

  // Herramientas destacadas (un subconjunto del total)
  const featuredTools = allTools.slice(0, 3);

  return (
    <main
    
    className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* 🚀 HERO PRINCIPAL */}
      <section
      
      className="text-center space-y-6 ">
        <Hero />
        <div className="mt-8">
          <div className="w-full h-32 bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">[Publicidad Banner 728x90]</span>
          </div>
        </div>
      </section>

      {/* 🔍 BUSCADOR + FILTROS */}
      <section className=" shadow-md rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold  text-center">
          Encuentra la herramienta perfecta 🔎
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Buscador */}
          <input
            type="text"
            placeholder="Buscar por nombre, descripción o tags..."
            className="w-full md:w-1/2 border  rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Filtro Categoría */}
          <select
            className="w-full md:w-1/4 border  rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value=""  className="text-black">Todas las categorías</option>
            {categories.map((cat) => (
              <option className="text-black" key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          {/* Filtro Precio */}
          <select
            className="w-full md:w-1/4 border  rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="" className="text-black">Todos los planes</option>
            <option value="free" className="text-black">Gratis</option>
            <option value="premium" className="text-black">Premium</option>
          </select>
        </div>
      </section>

      {/* 🎯 SECCIÓN DINÁMICA DE RESULTADOS */}
      <section>
        {hasSearched ? (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center">
              Resultados de tu búsqueda
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} {...tool} />
                ))
              ) : (
                <p className="text-center  col-span-full">
                  No se encontraron herramientas que coincidan con los filtros.
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold  mb-8 text-center">
              Categorías Destacadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  name={cat.name}
                  slug={cat.slug}
                  description={cat.description}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* 📢 PUBLICIDAD ENTRE SECCIONES */}
      <section className="flex justify-center">
        <div className="w-full max-w-4xl h-40 bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center rounded-xl">
          <span className="text-gray-500">[Espacio Publicitario 970x250]</span>
        </div>
      </section>

      {/* 🔥 HERRAMIENTAS POPULARES */}
      {!hasSearched && (
        <section>
          <h2 className="text-3xl font-bold  mb-6 text-center">
            Herramientas Populares
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Las herramientas más usadas por nuestra comunidad para crecer tu
            negocio.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} {...tool} />
            ))}
          </div>
        </section>
      )}

      {/* 📢 SIDEBAR O FOOTER PUBLICIDAD */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 text-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold  mb-4">
              Últimas Noticias de Marketing
            </h3>
            <p className="text-gray-600">
              Aquí podrías poner un blog, artículos, o integrar un feed de
              noticias de marketing y tecnología.
            </p>
          </div>
          <div className="bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center rounded-xl h-64">
            <span className="text-gray-500">[Publicidad Skyscraper 300x600]</span>
          </div>
        </div>
      </section>

     <Newsletter></Newsletter>
    </main>
  );
}