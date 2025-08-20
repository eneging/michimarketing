// app/tools/page.tsx
import { tools } from "../data/tools";
import ToolCard from "../components/ToolCard";

export default function ToolsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Encabezado */}
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-neutral-200 mb-4">
          Todas las Herramientas
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
          Explora nuestra colección completa de herramientas digitales para
          marketing, productividad y más.
        </p>
      </header>

      {/* Grid de herramientas */}
      {tools.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.slug}
              name={tool.name}
              slug={tool.slug}
              description={tool.description}
              logo={tool.logo}
              rating={tool.rating}
              tags={tool.tags}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-16 border border-neutral-800 rounded-xl bg-neutral-900">
          <p className="text-neutral-400">No hay herramientas disponibles por ahora.</p>
        </div>
      )}
    </main>
  );
}