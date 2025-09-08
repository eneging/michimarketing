import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden rounded-3xl">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://res.cloudinary.com/dhuggiq9q/image/upload/v1756992939/main-sample.png"
          alt="Fondo principal con zapatilla moderna"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center md:object-right"
        />
        {/* Overlay suave con degradado */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Contenido central */}
      <div className="relative z-10 max-w-5xl px-6 sm:px-12 text-center text-white">
        {/* Título Principal */}
        <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          Lanza tu negocio al éxito con una{" "}
          <span className="bg-gradient-to-r from-sky-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
            Landing Page
          </span>{" "}
          de Alto Impacto
        </h1>

        {/* Subtítulo */}
        <p className="mb-12 max-w-3xl mx-auto text-lg sm:text-xl font-light opacity-90">
          Convierte visitantes en clientes ⚡️ con diseños rápidos, modernos y optimizados para generar ventas 24/7.
        </p>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <a
            href="https://wa.me/51932563713"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-400 transition-transform duration-300"
          >
            Quiero mi Landing Page Ahora
            <svg
              className="ml-3 w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold rounded-lg border border-white hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-white transition-colors duration-300"
          >
            Ver Ejemplos
          </a>
        </div>
      </div>
    </section>
  );
}
