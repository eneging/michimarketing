import React from 'react';

export default function Benefits() {
  const benefits = [
    { 
      icon: "⚡", 
      title: "Entrega Rápida", 
      desc: "Lanzamos tu página profesional en solo unos días para que empieces a vender de inmediato." 
    },
    { 
      icon: "💰", 
      title: "Inversión Inteligente", 
      desc: "Ofrecemos precios justos y accesibles, diseñados para impulsar tu negocio sin desequilibrar tus finanzas." 
    },
    { 
      icon: "🎨", 
      title: "Diseño Estratégico", 
      desc: "Nuestros diseños no solo se ven bien; están creados para captar la atención y convertir visitantes en clientes leales." 
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
      {/* Título principal con un enfoque más directo */}
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-green-500 mb-12">
        Beneficios de trabajar con nosotros
      </h2>
      
      {/* Contenedor de las tarjetas con un grid más robusto */}
      <div className="grid md:grid-cols-3 gap-10">
        {benefits.map((b, i) => (
          <div 
            key={i} 
            className="group flex flex-col items-center p-8 rounded-3xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            {/* Ícono más grande con fondo circular */}
            <div className="text-5xl mb-4 p-4 rounded-full bg-green-100 text-green-600 transition-colors duration-300 group-hover:bg-green-200">
              {b.icon}
            </div>
            {/* Título más descriptivo */}
            <h3 className="text-2xl font-semibold mt-4 text-green-500">
              {b.title}
            </h3>
            {/* Descripción mejorada */}
            <p className="mt-3 text-lg  leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}