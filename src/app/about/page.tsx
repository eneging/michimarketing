// app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        
        {/* Encabezado */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-emerald-400">
          🌟 Sobre Michi Marketing
        </h1>
        <p className="text-center text-lg text-gray-400 max-w-3xl mx-auto mb-12">
          Un <span className="text-emerald-400 font-semibold">directorio de herramientas</span> creado para ayudar a emprendedores, creadores de contenido y pequeñas empresas a resolver los desafíos del marketing digital y mejorar su presencia online.
        </p>

        {/* Imagen + Texto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative w-full h-72 md:h-96">
            <Image
              src="/images/michi-marketing.png" // 👈 reemplaza con tu imagen/logo
              alt="Michi Marketing"
              fill
              className="object-contain rounded-2xl"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">
              🚀 Nuestra Misión
            </h2>
            <p className="text-gray-300 leading-relaxed">
              En Michi Marketing creemos que todas las empresas y creadores deben tener acceso a herramientas claras, simples y efectivas.  
              Por eso reunimos en un solo lugar recursos que te ayudarán a crecer en redes sociales, optimizar tus contenidos y potenciar tu marca digital.
            </p>
          </div>
        </div>

        {/* Sección sobre el creador */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4 text-emerald-400">
            👨‍💻 El Creador
          </h2>
          <div className="flex flex-col items-center">
            <Image
              src="/images/edwar-rejas.jpg" // 👈 pon tu foto aquí
              alt="Edwar Rejas Reyes"
              width={120}
              height={120}
              className="rounded-full border-4 border-emerald-400 shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Edwar Rejas Reyes</h3>
            <p className="text-gray-400 max-w-xl mt-3">
              Fundador de <span className="text-emerald-400 font-semibold">Michi Marketing</span>.  
              Apasionado por el marketing digital, la tecnología y ayudar a los negocios a crecer en el mundo online.  
              Este proyecto nace con la visión de crear una comunidad donde todos puedan acceder a las mejores herramientas de forma práctica y sencilla.
            </p>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">
            💡 Sé parte de la comunidad
          </h2>
          <p className="text-gray-400 mb-6">
            Únete a nuestra comunidad y descubre nuevas formas de hacer crecer tu negocio con creatividad y estrategia.
          </p>
          <a href="comunidad"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Unirme ahora 🚀
          </a>
        </div>
      </div>
    </div>
  );
}
