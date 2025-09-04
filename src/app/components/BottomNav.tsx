"use client";

import Link from "next/link";
import { Home, Search, Users, Sparkles, QrCode
     //Layers
     } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-800/70 md:hidden z-50">
      <div className="flex justify-around items-center h-16 px-2">
        <Link
          href="/"
          className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition"
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px]">Inicio</span>
        </Link>

        <Link
          href="/tools"
          className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition"
        >
          <Search className="w-5 h-5" />
          <span className="text-[11px]">Buscar</span>
        </Link>

        <Link
          href="/generadorQR"
          className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition"
        >
          <QrCode className="w-5 h-5" />
          <span className="text-[11px]">Generador QR</span>
        </Link>


        <Link
          href="/comunidad"
          className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition"
        >
          <Users className="w-5 h-5" />
          <span className="text-[11px]">Comunidad</span>
        </Link>

        <Link
          href="/blog"
          className="flex flex-col items-center text-purple-400 hover:text-purple-300 transition"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[11px]">Blog</span>
        </Link>
      </div>
    </nav>
  );
}
