// app/deals/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { deals } from "../../data/dealz";

interface DealPageParams {
  slug: string;
}

interface DealPageProps {
  params: Promise<DealPageParams>; // Next.js 15: params es Promise
}

export const dynamic = "force-static";

export default async function DealDetailPage({ params }: DealPageProps) {
  const { slug } = await params;

  const deal = deals.find((d) => d.slug === slug);
  if (!deal) return notFound();

  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4">{deal.title}</h1>
          <p className="text-gray-400 text-sm">{new Date(deal.date).toLocaleDateString("es-PE")}</p>
        </header>

        {/* Imagen destacada */}
        {deal.image && (
          <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
            <Image
              src={deal.image}
              alt={deal.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Descripción */}
        <div className="prose prose-lg prose-invert max-w-none mb-12">
          <p>{deal.description}</p>
          {deal.benefits && deal.benefits.length > 0 && (
            <>
              <h2>Beneficios</h2>
              <ul>
                {deal.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          )}

          {deal.conditions && deal.conditions.length > 0 && (
            <>
              <h2>Condiciones</h2>
              <ul>
                {deal.conditions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Botón de acción */}
        {deal.link && (
          <div className="text-center">
            <a
              href={deal.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white text-lg px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
            >
              Obtener Deal 🚀
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Generación estática de rutas dinámicas
export async function generateStaticParams() {
  return deals.map((d) => ({
    slug: d.slug,
  }));
}
