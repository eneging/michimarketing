// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//import Script from "next/script";
import AdSense from "./components/AdSense";
import BottomNav from "./components/BottomNav";
//import AdBanner from "./components/Adbanner";

// Fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos globales (SEO + Redes sociales)
export const metadata: Metadata = {
  title: {
    default: "MichiMarketing - AI Tools Directory",
    template: "%s | MichiMarketing",
  },
  description:
    "Descubre las mejores herramientas de inteligencia artificial, apps y software para 2025. Explora categorías, reseñas y tendencias en MichiMarketing.",
  keywords: [
    "AI tools",
    "Marketing digital",
    "Inteligencia artificial",
    "Software 2025",
    "Directorio AI",
    "Productividad",
  ],
  authors: [{ name: "MichiMarketing Team" }],
  creator: "MichiMarketing",
  publisher: "MichiMarketing",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://michimarketing.com",
    siteName: "MichiMarketing",
    title: "MichiMarketing - AI Tools Directory",
    description:
      "Descubre las mejores herramientas de inteligencia artificial, apps y software para 2025.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MichiMarketing Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MichiMarketing - AI Tools Directory",
    description:
      "Explora las mejores herramientas de inteligencia artificial y marketing digital en un solo lugar.",
    images: ["/og-image.png"],
    creator: "@michimarketing",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">

<head>

  <AdSense pid="pub-9559644099127130"></AdSense>
</head>
      
      <body
      
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white font-sans`}
      >
        <Navbar></Navbar>

          

        <div 
        
        className="flex flex-col lg:flex-row max-w-screen-2xl mx-auto px-6 py-16 gap-8">
          {/* Sidebar Izquierdo (Publicidad) */}
          
 {/*  <aside className="hidden lg:block w-64">
          <div className="sticky top-28 bg-neutral-900 rounded-xl border border-neutral-800 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-neutral-200">Publicidad</h2>
              <div className="space-y-6">
                 Bloque de anuncio 1 */}

               
            {/*    
              </div>
            </div>
          </aside>

          Contenido central */}
          <main className="flex-1 min-h-screen">{children}</main>

          {/* Sidebar Derecho (Recomendados) 
          <aside className="hidden lg:block w-64">
            <div className="sticky top-28 bg-neutral-900 rounded-xl border border-neutral-800 p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-neutral-200">Recomendados</h2>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-blue-400 cursor-pointer transition-colors py-1 border-b border-neutral-800 last:border-b-0">
                  🚀 Top herramientas de IA
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors py-1 border-b border-neutral-800 last:border-b-0">
                  📊 Marketing con IA
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors py-1 border-b border-neutral-800 last:border-b-0">
                  💡 Ideas de productividad
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors py-1 border-b border-neutral-800 last:border-b-0">
                  🔥 Tendencias 2025
                </li>
              </ul>
            </div>
          </aside>*/}


        </div>
<BottomNav></BottomNav>
        <Footer></Footer>
      </body>
    </html>
  );
}