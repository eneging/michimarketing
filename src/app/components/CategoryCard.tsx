import Link from "next/link";
import { Star, Wand2, Palette, Mic2, Megaphone, ArrowRight, Sparkles } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  toolCount?: number; // Nuevo prop opcional para mostrar cantidad de herramientas
}

// Map de íconos por slug con gradientes
const categoryIcons: { [key: string]: { icon: JSX.Element, gradient: string } } = {
  "ai-tools": { 
    icon: <Wand2 className="w-8 h-8" />, 
    gradient: "from-blue-500 to-cyan-500" 
  },
  "seo": { 
    icon: <Megaphone className="w-8 h-8" />, 
    gradient: "from-red-500 to-orange-500" 
  },
  "content-marketing": { 
    icon: <Palette className="w-8 h-8" />, 
    gradient: "from-purple-500 to-pink-500" 
  },
  "social-media": { 
    icon: <Mic2 className="w-8 h-8" />, 
    gradient: "from-green-500 to-emerald-500" 
  },
  "default": { 
    icon: <Star className="w-8 h-8" />, 
    gradient: "from-yellow-500 to-amber-500" 
  },
};

export default function CategoryCard({ name, slug, description, toolCount }: CategoryCardProps) {
  const categoryData = categoryIcons[slug] || categoryIcons.default;

  return (
    <Link href={`/categories/${slug}`}>
      <div className="group relative p-6 rounded-2xl border border-gray-800/50 bg-gradient-to-b from-gray-900/70 to-gray-950/70 backdrop-blur-sm shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-500 hover:-translate-y-1 hover:border-gray-700/70 overflow-hidden">
        
        {/* Efecto de brillo sutil al pasar el mouse */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        
        {/* Fondos abstractos con gradiente */}
        <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${categoryData.gradient} rounded-full opacity-10 blur-xl group-hover:opacity-15 transition-opacity duration-700`}></div>
        <div className={`absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-br ${categoryData.gradient} rounded-full opacity-10 blur-xl group-hover:opacity-15 transition-opacity duration-700`}></div>
        
        {/* Badge de contador de herramientas (si se proporciona) */}
        {toolCount !== undefined && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 text-gray-300">
              <Sparkles className="w-3 h-3 mr-1" />
              {toolCount} {toolCount === 1 ? 'herramienta' : 'herramientas'}
            </span>
          </div>
        )}

        {/* Contenido principal */}
        <div className="relative z-10">
          {/* Icono con fondo gradiente */}
          <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${categoryData.gradient} mb-5 shadow-lg`}>
            <div className="text-white">
              {categoryData.icon}
            </div>
          </div>

          {/* Título */}
          <h2 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-500">
            {name}
          </h2>

          {/* Descripción */}
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Acción explorar */}
        <div className="mt-6 flex items-center justify-between w-full relative z-10">
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300">
            Explorar categoría
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/50 border border-gray-700/30 group-hover:bg-gradient-to-r group-hover:from-blue-500/20 group-hover:to-purple-500/20 group-hover:border-blue-500/30 transition-all duration-300">
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors duration-300 transform group-hover:translate-x-0.5" />
          </div>
        </div>

        {/* Efecto de borde gradiente en hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"></div>
      </div>
    </Link>
  );
}