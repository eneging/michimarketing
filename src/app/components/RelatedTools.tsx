import Link from "next/link";
import { Tool } from "../types";
import Image from "next/image";

interface RelatedToolsProps {
  related: Tool[];
}

export default function RelatedTools({ related }: RelatedToolsProps) {
  if (!related || related.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-semibold mb-4">You may also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {related.map((r) => (
          <Link
            key={r.slug}
            href={`/tools/${r.slug}`}
            className="block p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            {r.logo && (
              <Image
                src={r.logo}
                alt={r.name}
                width={48}
                height={48}
                className="object-contain mb-3"
              />
            )}
            <h3 className="text-lg font-semibold">{r.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {r.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
