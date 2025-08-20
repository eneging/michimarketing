// app/categories/page.tsx
import { categories } from "../data/Categories";
import CategoryCard from "../components/CategoryCard";

export default function CategoriesPage() {
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
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            name={category.name}
            slug={category.slug}
            description={category.description}
            icon={category.icon} // Asegúrate de pasar el icono si está disponible
            toolCount={category.tools?.length} // Pasa el conteo de herramientas si está disponible
          />
        ))}
      </section>
    </main>
  );
}