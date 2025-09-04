// app/components/Footer.tsx
import Link from "next/link";
import { Facebook, 
  
// Twitter, 
  
  Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20 relative">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo + Descripción */}
        <div>
          <h2 className="text-2xl font-extrabold text-white">MichiMarketing 🚀</h2>
          <p className="mt-4 text-sm text-green-400 leading-relaxed">
            El directorio donde encuentras las mejores herramientas de marketing digital & IA.
          </p>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
            <li><Link href="/categories" className="hover:text-white transition-colors">Categorías</Link></li>
            <li><Link href="/tools" className="hover:text-white transition-colors">Herramientas</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
          </ul>
        </div>

        {/* Recursos */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Recursos</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
        {/*<li><a href="#" className="hover:text-white transition-colors">Publicidad</a></li>*/  }    
          </ul>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/edward.lordmoe" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
        {/*   <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-sky-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>*/}

            <a href="https://www.instagram.com/edwar_rr/" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:edwarrejasreyes@gmail.com?subject=hola quiero saber mas sobre marketing&body=estoy listo" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-500 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* 📢 Espacio Publicitario / Newsletter 
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="w-full h-28 bg-gray-800 border border-dashed border-gray-600 flex items-center justify-center rounded-lg">
          <span className="text-gray-500">[Publicidad o Newsletter aquí]</span>
        </div>
      </div>*/}

      {/* Línea final */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-green-500">
        © {new Date().getFullYear()} <span className="font-semibold">MichiMarketing</span>. Todos los derechos reservados.
      </div>
    </footer>
  );
}
