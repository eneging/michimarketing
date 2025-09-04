"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative rounded-3xl overflow-hidden mb-16 border border-gray-700/50 bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl shadow-black/40">
      {/* Fondo con imagen optimizada */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1400&q=80"
          alt="Fondo principal"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center opacity-30"
        />

        {/* Efecto de partículas */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20"></div>

        {/* Gradientes */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/15 to-pink-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-gray-950/80"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="relative max-w-6xl mx-auto px-6 py-32 text-center text-white z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8">
          <Sparkles size={14} />
          <span>Nuevas herramientas añadidas</span>
        </div>

        {/* Título */}
        <h1 className="block text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          Encuentra las{" "}
          <span className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            mejores herramientas
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="block text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
          MichiMarketing centraliza los recursos de{" "}
          <span className="inline-block font-medium text-white bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-1.5 py-0.5 rounded">
            marketing digital
          </span>{" "}
          y{" "}
          <span className="inline-block font-medium text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-1.5 py-0.5 rounded">
            herramientas de IA
          </span>{" "}
          en un solo lugar.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <a
            href="categories"
            className="group relative px-8 py-4 bg-white text-black font-medium rounded-full flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-white/20 hover:scale-105"
          >
            Explorar ahora
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="comunidad"
            className="px-8 py-4 bg-transparent border border-gray-600 text-white font-medium rounded-full transition-all hover:border-gray-400 hover:bg-gray-800/30 hover:shadow-lg hover:shadow-white/5"
          >
            Únete a la comunidad
          </a>
        </div>

        {/* Texto secundario */}
        <p className="block text-gray-400 text-sm mt-8">
          Totalmente gratuito • Actualizado semanalmente
        </p>
      </div>

      {/* Efecto de brillo */}
      <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-blue-500/10 blur-[80px] rounded-full"></div>
    </section>
  );
}