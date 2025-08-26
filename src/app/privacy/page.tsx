// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-extrabold text-center text-mint-400 mb-8">
          🔒 Política de Privacidad
        </h1>

        <p className="text-gray-400 text-lg text-center mb-12">
          En <span className="text-mint-400 font-semibold">Michi Marketing</span> 
          valoramos tu confianza. Esta política explica cómo recopilamos, usamos 
          y protegemos tu información cuando utilizas nuestro directorio de 
          herramientas y contenidos creados para mejorar tu presencia digital.
        </p>

        <div className="space-y-10">
          {/* Información que recolectamos */}
          <section>
            <h2 className="text-2xl font-bold text-mint-300 mb-3">
              📌 Información que recolectamos
            </h2>
            <p className="text-gray-400">
              Solo recopilamos la información necesaria para brindarte un mejor 
              servicio, como tu nombre, correo electrónico y datos relacionados 
              con tu interacción en nuestra web. Nunca pediremos información 
              innecesaria ni compartiremos tus datos sin tu consentimiento.
            </p>
          </section>

          {/* Uso de la información */}
          <section>
            <h2 className="text-2xl font-bold text-mint-300 mb-3">
              🎯 Uso de la información
            </h2>
            <p className="text-gray-400">
              Los datos se utilizan para personalizar tu experiencia, enviarte 
              actualizaciones relevantes y mejorar nuestros contenidos y 
              herramientas. También podríamos usarlos para fines estadísticos 
              que nos permitan crecer como comunidad.
            </p>
          </section>

          {/* Protección de tus datos */}
          <section>
            <h2 className="text-2xl font-bold text-mint-300 mb-3">
              🛡️ Protección de tus datos
            </h2>
            <p className="text-gray-400">
              Implementamos medidas de seguridad técnicas y organizativas para 
              proteger tu información. Tu privacidad es una prioridad, y nos 
              esforzamos por garantizar que tus datos estén seguros.
            </p>
          </section>

          {/* Derechos del usuario */}
          <section>
            <h2 className="text-2xl font-bold text-mint-300 mb-3">
              🙋 Tus derechos
            </h2>
            <p className="text-gray-400">
              Puedes solicitar en cualquier momento acceder, corregir o eliminar 
              tus datos personales. Escríbenos si deseas ejercer tus derechos de 
              privacidad y estaremos encantados de ayudarte.
            </p>
          </section>

          {/* Contacto */}
          <section>
            <h2 className="text-2xl font-bold text-mint-300 mb-3">
              📬 Contacto
            </h2>
            <p className="text-gray-400">
              Si tienes dudas sobre esta política, puedes comunicarte con 
              <span className="text-mint-400 font-semibold"> Edwar Rejas Reyes</span>, 
              creador de Michi Marketing, al correo:{" "}
              <a
                href="mailto:contacto@michimarketing.com"
                className="text-mint-400 underline"
              >
                contacto@michimarketing.com
              </a>
            </p>
          </section>
        </div>

        <p className="text-center text-gray-500 text-sm mt-12">
          © {new Date().getFullYear()} Michi Marketing. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
