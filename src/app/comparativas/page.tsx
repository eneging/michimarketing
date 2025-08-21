import Link from "next/link";

import { getComparativas } from "../lib/comparativadata";

export const dynamic = "force-static";

export default async function ComparativasPage() {
  const comparativas = await getComparativas();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header con estilo Vercel */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Comparativas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Herramientas</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Análisis detallados y objetivos de las principales plataformas y frameworks 
            para ayudarte a elegir la mejor opción según tus necesidades específicas.
          </p>
        </div>

        {/* Filtros y búsqueda (placeholder para funcionalidad futura) */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar comparativas..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-gray-900"
              disabled
            />
            <svg className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            className="w-full sm:w-auto px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            disabled
          >
            <option>Todas las categorías</option>
            <option>Frameworks</option>
            <option>Plataformas</option>
            <option>Herramientas</option>
          </select>
        </div>

        {/* Grid de comparativas con diseño estilo Vercel */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comparativas.map((c) => (
            <Link
              key={c.slug}
              href={`/comparativas/${c.slug}`}
              className="group block bg-white rounded-xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Imagen destacada (placeholder si no hay imagen) */}
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {c.title}
                  </h2>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {c.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.tools.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-full font-medium transition-colors group-hover:bg-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                  {c.tools.length > 3 && (
                    <span className="px-3 py-1.5 text-xs bg-gray-100 text-gray-500 rounded-full font-medium">
                      +{c.tools.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Leer análisis</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state (si no hay comparativas) */}
        {comparativas.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay comparativas aún</h3>
            <p className="text-gray-600">Pronto agregaremos análisis detallados de herramientas.</p>
          </div>
        )}

        {/* Newsletter signup (estilo Vercel) */}
        <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ¿No encuentras lo que necesitas?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Suscríbete para recibir notificaciones cuando agreguemos nuevas comparativas 
            y análisis de herramientas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-grow px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium whitespace-nowrap">
              Suscribirme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}