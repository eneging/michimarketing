"use client";

import { useMemo, useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ExternalLink,
  PlayCircle,
  ChevronRight,
  Tag,
  Heart,
  Bookmark,
} from "lucide-react";

type PricingPlan = { plan: string; price: string; features?: string[] };

interface ToolCardProps {
  slug: string;
  name: string;
  description: string;

  // Nuevos (opcionales para no romper nada)
  website?: string;
  logo?: string;
  image?: string;
  rating?: number; // 0–5
  tags?: string[];
  pricing?: PricingPlan[];
  reviews?: { user: string; comment: string; rating: number }[];
  videoTutorial?: string; // YouTube/Vimeo/MP4
  badge?: string; // "Nuevo", "Gratis", etc.
}

export default function ToolCard({
  slug,
  name,
  description,
  website,
  logo,
  //image,
  rating,
  tags,
  pricing,
  reviews,
  videoTutorial,
  badge,
}: ToolCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const reviewsCount = reviews?.length ?? 0;

const priceLabel = useMemo(() => {
  if (!pricing || pricing.length === 0) return undefined;

  // Verificar si hay un plan gratuito
  const freePlan = pricing.find(
    (p) =>
      p?.price?.toLowerCase().includes("free") ||
      p?.price?.toLowerCase().includes("gratis")
  );
  if (freePlan) return "Gratis";

  // Toma el primer plan válido
  const cheaper = pricing.find((p) => p?.plan && p?.price);
  return cheaper ? `${cheaper.plan}: ${cheaper.price}` : undefined;
}, [pricing]);


  const handleOpenVideo = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowVideo(true);
  };

  const handleVisitSite = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (website) window.open(website, "_blank", "noopener,noreferrer");
  };

  const toggleBookmark = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const toggleLike = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Render estrellas (round al entero más cercano)
  const Stars = ({ value = 0 }: { value?: number }) => {
    const rounded = Math.round(value);
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < rounded ? "text-yellow-400" : "text-gray-600"
            }`}
            // fill para las llenas
            fill={i < rounded ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  // 👇 MOVIDA: Convierte URLs comunes de YouTube/Vimeo a formato embebible
  function toEmbedUrl(url: string) {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) {
        const id = u.searchParams.get("v");
        return `https://www.youtube.com/embed/${id ?? ""}`;
      }
      if (u.hostname === "youtu.be") {
        const id = u.pathname.replace("/", "");
        return `https://www.youtube.com/embed/${id}`;
      }
      if (u.hostname.includes("vimeo.com")) {
        const id = u.pathname.split("/").filter(Boolean).pop();
        return `https://player.vimeo.com/video/${id ?? ""}`;
      }
      return url;
    } catch {
      return url;
    }
  }

  return (
    <Link
      href={`/tools/${slug}`}
      className="group block rounded-2xl border border-gray-800/50 bg-gradient-to-b from-gray-900/70 to-gray-950/70 backdrop-blur-sm shadow-lg shadow-black/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 hover:border-gray-700/70 relative overflow-hidden"
    >
      {/* Efecto de brillo sutil al pasar el mouse */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

      {/* Media (imagen o placeholder) */}
      <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
        {logo && !imageError ? (
          <Image
            src={logo}
            alt={name}
         width={400}
  height={200}

            className="object-cover transition-transform duration-700 group-hover:scale-110"
            priority={false}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-900/40 via-blue-900/40 to-cyan-900/40 flex items-center justify-center">
            <span className="text-gray-500 text-sm font-medium">{name.charAt(0).toUpperCase()}</span>
          </div>
        )}

        {/* Overlay de imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>

        {/* Badge */}
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-blue-500/20">
            {badge}
          </span>
        )}

        {/* Logo chip */}
        {logo && !logoError && (
          <div className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/80 backdrop-blur-sm shadow-lg">
            <Image
              src={logo}
              alt={`${name} logo`}
              width={48}
              height={48}
              className="object-contain p-1.5"
              onError={() => setLogoError(true)}
            />
          </div>
        )}

        {/* Acciones rápidas en la imagen */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={toggleBookmark}
            className="p-1.5 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:bg-blue-500/20 hover:border-blue-500/30 transition-colors"
            aria-label={isBookmarked ? "Quitar de guardados" : "Guardar herramienta"}
          >
            <Bookmark 
              className="h-4 w-4" 
              fill={isBookmarked ? "currentColor" : "none"} 
              color={isBookmarked ? "#3b82f6" : "#9ca3af"} 
            />
          </button>
          
          <button
            onClick={toggleLike}
            className="p-1.5 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:bg-pink-500/20 hover:border-pink-500/30 transition-colors"
            aria-label={isLiked ? "Quitar like" : "Dar like"}
          >
            <Heart 
              className="h-4 w-4" 
              fill={isLiked ? "currentColor" : "none"} 
              color={isLiked ? "#ec4899" : "#9ca3af"} 
            />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 relative z-10">
        {/* Título + rating */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
            {name}
          </h3>

          {typeof rating === "number" && (
            <div className="flex items-center gap-1.5 bg-gray-800/50 rounded-full px-2.5 py-1 border border-gray-700/30">
              <Stars value={rating} />
              <span className="text-xs font-medium text-gray-300">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Descripción */}
        <p className="line-clamp-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {description}
        </p>

        {/* Tags (máx 3) */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full bg-gray-800/50 border border-gray-700/30 px-2.5 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm"
              >
                <Tag className="h-3 w-3" />
                {t}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="rounded-full bg-gray-800/30 px-2.5 py-1 text-xs text-gray-500 border border-gray-700/20">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Pricing / Reviews */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {priceLabel && (
            <span className="rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-2.5 py-1.5 font-medium text-blue-300">
              {priceLabel}
            </span>
          )}
          {reviewsCount > 0 && (
            <span className="text-gray-500">{reviewsCount} reseñas</span>
          )}
        </div>

        {/* Acciones rápidas */}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {website && (
              <button
                onClick={handleVisitSite}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-800/50 border border-gray-700/30 px-3 py-1.5 text-xs font-semibold text-gray-300 transition-all hover:bg-gray-700/50 hover:text-white hover:border-gray-600/50 backdrop-blur-sm"
                aria-label="Visitar sitio web"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Sitio
              </button>
            )}
            {videoTutorial && (
              <button
                onClick={handleOpenVideo}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-semibold text-blue-300 transition-all hover:from-blue-500/20 hover:to-purple-500/20 hover:text-white hover:border-blue-400/30 backdrop-blur-sm"
                aria-label="Ver video tutorial"
              >
                <PlayCircle className="h-3.5 w-3.5" />
                Tutorial
              </button>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
            Ver detalle
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      {/* Modal de video (simple y sin dependencias) */}
      {showVideo && videoTutorial && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-lg p-4"
          onClick={() => setShowVideo(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-black border border-gray-700/50 shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cerrar */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute right-3 top-3 z-10 rounded-md bg-gray-800/80 backdrop-blur-sm px-3 py-1.5 text-sm text-white border border-gray-700/50 hover:bg-gray-700/80 transition-colors"
            >
              Cerrar ✕
            </button>

            {/* Iframe responsivo */}
            <div className="relative aspect-video w-full">
              {videoTutorial.includes("youtube.com") ||
              videoTutorial.includes("youtu.be") ||
              videoTutorial.includes("vimeo.com") ? (
                <iframe
                  src={toEmbedUrl(videoTutorial)}
                  title={`${name} tutorial`}
                  className="absolute left-0 top-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={videoTutorial}
                  controls
                  className="absolute left-0 top-0 h-full w-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}