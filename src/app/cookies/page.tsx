// app/cookies/page.tsx
export default function CookiesPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-200 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-emerald-400">
          🍪 Política de Cookies
        </h1>

        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
          En <span className="font-semibold text-emerald-400">Michi Marketing</span>, valoramos la privacidad de nuestros usuarios y queremos ser transparentes sobre el uso de cookies en nuestro sitio web. 
          Esta política explica qué son las cookies, cómo las utilizamos y cómo puedes gestionarlas.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-emerald-300">1. ¿Qué son las cookies?</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, móvil o tablet) cuando visitas un sitio web. 
          Su función principal es recordar tus preferencias y mejorar tu experiencia de navegación.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-emerald-300">2. Tipos de cookies que utilizamos</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-3 mb-6">
          <li><strong>Cookies esenciales:</strong> Necesarias para el correcto funcionamiento del sitio web.</li>
          <li><strong>Cookies de rendimiento:</strong> Nos ayudan a analizar el uso del sitio para mejorarlo constantemente.</li>
          <li><strong>Cookies de personalización:</strong> Recuerdan tus preferencias (idioma, región, etc.).</li>
          <li><strong>Cookies publicitarias:</strong> Utilizadas por Google AdSense y otros socios para mostrar anuncios relevantes según tus intereses.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-emerald-300">3. Uso de cookies de terceros</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          En <span className="font-semibold text-emerald-400">Michi Marketing</span> trabajamos con terceros como 
          <strong> Google AdSense</strong> para mostrar publicidad personalizada. 
          Estos terceros también pueden colocar cookies en tu dispositivo con el fin de medir la efectividad de los anuncios 
          y mostrarte contenido más relevante.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-emerald-300">4. Gestión de cookies</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Puedes aceptar o rechazar el uso de cookies desde la configuración de tu navegador. 
          También puedes eliminar las cookies almacenadas en cualquier momento. 
          Ten en cuenta que desactivar algunas cookies puede afectar la funcionalidad del sitio.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-emerald-300">5. Consentimiento</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Al usar nuestro sitio, aceptas el uso de cookies de acuerdo con esta política. 
          La primera vez que ingreses a nuestra web verás un aviso que te permitirá aceptar o configurar tus preferencias.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-emerald-300">6. Cambios en la política de cookies</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Podemos actualizar esta política en cualquier momento para reflejar cambios en nuestras prácticas o en la normativa legal. 
          Te recomendamos revisarla periódicamente.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-emerald-300">7. Contacto</h2>
        <p className="text-gray-400 leading-relaxed mb-6">
          Si tienes preguntas sobre nuestra política de cookies, puedes escribirnos a:{" "}
          <a href="mailto:contacto@michimarketing.com" className="text-emerald-400 underline">
            contacto@michimarketing.com
          </a>
        </p>
      </div>
    </div>
  );
}
