// app/comunidad/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { communities } from "../../data/communities";

interface Props {
  params: { slug: string };
}

export default function CommunityDetailPage({ params }: Props) {
  const community = communities.find((c) => c.slug === params.slug);

  if (!community) return notFound();

  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <div className="max-w-3xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="relative w-full h-60 mb-8">
          <Image
            src={community.image}
            alt={community.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <h1 className="text-4xl font-bold mb-4">{community.name}</h1>
        <p className="text-gray-400 mb-6">{community.description}</p>

        <p className="text-sm text-gray-500 mb-6">
          Plataforma: {community.platform} • {community.members}
        </p>

        {/* Botón para unirse */}
        <a
          href={community.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition"
        >
          Unirme ahora 🚀
        </a>
      </div>
    </div>
  );
}
