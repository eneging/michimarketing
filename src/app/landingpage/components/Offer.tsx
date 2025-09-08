import React from 'react';

export default function Offer() {
  return (
    <section className="w-full py-16 px-4 ">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-green-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute -top-10 -left-10 w-28 h-28 bg-green-500 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-green-500 rounded-full opacity-20 blur-xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-white">
              Oferta de <span className="text-green-400">Lanzamiento</span>
            </h2>
            
            <div className="my-6 flex justify-center">
              <div className="bg-green-900/50 border border-green-700 rounded-lg px-6 py-3 inline-flex items-center">
                <span className="text-2xl md:text-3xl font-extrabold text-green-400 mr-2">20%</span>
                <span className="text-white font-semibold">DE DESCUENTO</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Obtén un <span className="font-bold text-green-400">20% de descuento</span> en tu primera 
              Landing Page durante este mes. Diseño profesional que convierte visitantes en clientes.
            </p>
            
            <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="flex items-center text-green-400">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Diseño responsive</span>
              </div>
              <div className="flex items-center text-green-400">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Optimización SEO</span>
              </div>
              <div className="flex items-center text-green-400">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Entrega rápida</span>
              </div>
            </div>
            
            <div className="mb-8 p-4 bg-black/40 rounded-lg border border-gray-800 inline-block">
              <p className="text-sm text-gray-400">Oferta válida hasta el <span className="text-green-400 font-medium">30 de noviembre</span></p>
            </div>
            
            <a
              href="https://wa.me/51932563713"
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-lg px-8 py-4 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <span className="flex items-center justify-center">
                Quiero mi descuento
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            
            <p className="mt-6 text-sm text-gray-500">
              * Aplican términos y condiciones. Oferta válida para los primeros 10 clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}