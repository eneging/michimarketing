// app/deals/page.tsx
import Link from "next/link";
import { deals } from "../data/dealz";

export const dynamic = "force-static";

export default function DealsPage() {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-white">Deals</h1>
      <p className="text-gray-400 mt-2">
        Encuentra las mejores ofertas y promociones de herramientas y cursos.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => (
          <Link
            key={deal.slug}
            href={`/deals/${deal.slug}`}
            className="block bg-gray-900 border border-gray-800 rounded-xl p-5 hover:bg-gray-800/70 transition"
          >
            <h3 className="text-xl font-semibold text-white">{deal.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{deal.excerpt}</p>
            <div className="mt-3 text-xs text-gray-500">
              {new Date(deal.date).toLocaleDateString("es-PE")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
