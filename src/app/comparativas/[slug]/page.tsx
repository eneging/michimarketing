import { notFound } from "next/navigation";
import { getComparativas } from "../../lib/comparativadata";
import Link from "next/link";
import { ChevronLeftIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

export const dynamic = "force-static";

export default async function ComparativaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const comparativas = await getComparativas();
  const comparativa = comparativas.find((c) => c.slug === slug);

  if (!comparativa) return notFound();

  // Relacionadas: misma categoría, diferentes slugs
  const relacionadas = comparativas.filter(
    (c) => c.category === comparativa.category && c.slug !== comparativa.slug
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link 
              href="/comparativas" 
              className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" />
              Volver a comparativas
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">{comparativa.category}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            {comparativa.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">{comparativa.excerpt}</p>
        </div>

        {/* Tabla comparativa */}
        <div className="mb-12">
          <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">
                    Característica
                  </th>
                  {comparativa.tools.map((tool) => (
                    <th
                      key={tool}
                      className="text-left py-4 px-6 font-semibold text-gray-700 text-sm"
                    >
                      {tool}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparativa.features.map((f, index) => (
                  <tr 
                    key={f.name} 
                    className={`transition-colors hover:bg-gray-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {f.name}
                    </td>
                    {comparativa.tools.map((tool) => (
                      <td key={tool} className="py-4 px-6 text-gray-600">
                        {typeof f.values[tool] === 'boolean' ? (
                          f.values[tool] ? (
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            </div>
                          )
                        ) : (
                          f.values[tool]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contenido largo */}
        {comparativa.content && (
          <div className="mb-12">
            <div 
              className="prose text-black prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-table:overflow-hidden prose-table:border prose-table:border-gray-200 prose-table:shadow-sm prose-th:bg-gray-50/50 prose-th:font-semibold prose-th:text-gray-700 prose-td:text-gray-600 prose-td:border-t prose-td:border-gray-100"
              dangerouslySetInnerHTML={{ __html: comparativa.content }}
            />
          </div>
        )}

        {/* Relacionadas */}
        {relacionadas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
              Comparativas relacionadas
            </h2>
            <div className="grid gap-5 md:grid-cols-2">
              {relacionadas.map((c) => (
                <Link
                  key={c.slug}
                  href={`/comparativas/${c.slug}`}
                  className="group block bg-white rounded-lg border border-gray-200 p-5 transition-all hover:border-gray-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {c.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{c.excerpt}</p>
                    </div>
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-1 ml-2 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}