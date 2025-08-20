// app/comunidad/page.tsx
import Image from "next/image";
import Link from "next/link";
import { communities } from "../data/communities";

export default function ComunidadPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          🤝 Únete a la Comunidad
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg hover:scale-[1.02] transition-transform"
            >
              {/* Imagen */}
              <div className="relative w-full h-48">
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2">
                  {community.name}
                </h2>
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {community.description}
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  Plataforma: {community.platform} • {community.members}
                </p>

                <Link
                  href={`/comunidad/${community.slug}`}
                  className="mt-auto inline-block text-center bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg transition"
                >
                  Ver más 👀
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
