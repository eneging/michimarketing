// app/terms/page.tsx
export default function TermsPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto py-16 px-6 sm:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mb-2">
            📜 Términos y Condiciones — Michi Marketing
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Estos Términos y Condiciones regulan el uso del sitio web y los servicios
            de <span className="text-emerald-400 font-semibold">Michi Marketing</span>, un directorio
            de herramientas y recursos creado para ayudar a creadores y emprendedores a mejorar
            sus contenidos y presencia digital. El creador y responsable del sitio es
            <span className="text-emerald-400 font-semibold"> Edwar Rejas Reyes</span>.
          </p>
        </header>

        <article className="space-y-8 text-sm sm:text-base leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">1. Aceptación de los Términos</h2>
            <p className="text-gray-300">
              Al acceder o utilizar este sitio web (michimarketing.com) y sus servicios relacionados,
              aceptas cumplir y quedar sujeto a estos Términos y Condiciones y a nuestra Política de Privacidad.
              Si no estás de acuerdo con alguno de estos términos, por favor no uses el sitio.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">2. Definición del Servicio</h2>
            <p className="text-gray-300">
              Michi Marketing ofrece un <strong>directorio de herramientas</strong>, guías, artículos,
              reseñas y recursos educativos destinados a ayudar a emprendedores y creadores de contenido.
              Podremos ofrecer funcionalidades adicionales (pago, suscripciones, listas promocionadas, etc.)
              que estarán descritas y reguladas adicionalmente cuando proceda.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">3. Elegibilidad</h2>
            <p className="text-gray-300">
              Para usar ciertos servicios podrías necesitar crear una cuenta y confirmar que tienes
              la capacidad legal para celebrar contratos. No empleamos ni permitimos el uso por menores
              sin la autorización de sus representantes legales.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">4. Registro y Cuentas</h2>
            <ul className="list-disc ml-5 text-gray-300 space-y-2">
              <li>
                <strong>Responsabilidad del usuario:</strong> eres responsable de mantener la confidencialidad
                de tu cuenta y clave, y de toda actividad que ocurra bajo la misma.
              </li>
              <li>
                <strong>Exactitud:</strong> aceptas proporcionar información veraz y actualizada.
              </li>
              <li>
                <strong>Suspensión y cancelación:</strong> podemos suspender o eliminar cuentas que violen estos términos.
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">5. Contenido del Usuario</h2>
            <p className="text-gray-300">
              Si subes contenido (comentarios, reseñas, guías, imágenes, etc.), concedes a Michi Marketing
              una licencia no exclusiva, mundial, libre de regalías para usar, reproducir, adaptar y mostrar
              ese contenido con el fin de operar y promocionar el servicio. No subir contenido que infrinja
              derechos de terceros, que sea ilegal, difamatorio o que viole la privacidad de otros.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">6. Propiedad Intelectual</h2>
            <p className="text-gray-300">
              Todo el contenido original de Michi Marketing (textos, diseño, código, imágenes que no estén
              marcadas como de terceros) es propiedad del sitio o de sus licenciantes y está protegido por
              las leyes de propiedad intelectual. No puedes copiar, reproducir o distribuir este contenido
              sin autorización expresa, salvo para uso personal y no comercial con la atribución correspondiente.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">7. Enlaces y Contenido de Terceros</h2>
            <p className="text-gray-300">
              Michi Marketing puede incluir enlaces o referencias a herramientas y servicios de terceros.
              Esos terceros son responsables de sus propios términos y prácticas. La inclusión de enlaces
              no implica aval ni garantía por parte de Michi Marketing. Debes revisar las políticas de esos
              servicios antes de usarlos.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">8. Pagos, Suscripciones y Reembolsos</h2>
            <p className="text-gray-300">
              Cuando un servicio implique pago (por ejemplo, listado destacado, suscripción premium, cursos),
              se informarán claramente los precios, la periodicidad y la política de cancelación. A menos que
              se indique lo contrario, los pagos no son reembolsables. Nos reservamos el derecho de modificar
              precios y planes con previo aviso.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">9. Garantías y Descargo de Responsabilidad</h2>
            <p className="text-gray-300">
              EL SERVICIO SE OFRECE TAL CUAL Y SEGÚN DISPONIBILIDAD. EN LA MEDIDA PERMITIDA POR LA LEY,
              MICHI MARKETING NO GARANTIZA RESULTADOS ESPECÍFICOS, NI QUE EL SERVICIO SEA ININTERRUMPIDO
              O LIBRE DE ERRORES. LAS RECOMENDACIONES, GUÍAS Y ENLACES A HERRAMIENTAS SON ORIENTATIVAS;
              CADA USUARIO DEBE REALIZAR SU PROPIA DILIGENCIA.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">10. Limitación de Responsabilidad</h2>
            <p className="text-gray-300">
              EN NINGÚN CASO MICHI MARKETING, SUS AFILIADOS O REPRESENTANTES SERÁN RESPONSABLES POR DAÑOS
              INDIRECTOS, INCIDENTALES, ESPECIALES O PUNITIVOS DERIVADOS DEL USO DEL SITIO. LA RESPONSABILIDAD
              TOTAL AGREGADA SE LIMITARÁ, EN LA MEDIDA PERMITIDA POR LA LEY, AL MONTO PAGADO POR EL USUARIO
              EN LOS ÚLTIMOS 12 MESES O A CIEN DÓLARES (USD), LO QUE SEA MENOR.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">11. Indemnización</h2>
            <p className="text-gray-300">
              ACEPTAS INDEMNIZAR Y DEFENDER A MICHI MARKETING Y SUS REPRESENTANTES CONTRA RECLAMACIONES,
              PÉRDIDAS, RESPONSABILIDADES Y GASTOS (INCLUIDOS HONORARIOS LEGALES) DERIVADOS DE TU USO
              DEL SITIO O VIOLACIÓN DE ESTOS TÉRMINOS.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">12. Terminación</h2>
            <p className="text-gray-300">
              Podemos suspender o terminar tu acceso al servicio por violaciones a estos términos o por
              actividad que consideremos dañina. Tras la terminación podrás seguir siendo responsable por
              obligaciones acumuladas y por el uso de tu contenido según la licencia otorgada.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">13. Privacidad y Cookies</h2>
            <p className="text-gray-300">
              El tratamiento de datos personales se rige por nuestra Política de Privacidad. Usamos cookies
              y tecnologías similares para mejorar la experiencia; puedes gestionar tus preferencias desde
              el navegador o desde las herramientas del sitio.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">14. Cambios a los Términos</h2>
            <p className="text-gray-300">
              Nos reservamos el derecho de modificar estos Términos y Condiciones. Publicaremos la versión
              actualizada en esta página con la fecha de vigencia. Si realizamos cambios importantes, te
              notificaremos con la mayor antelación posible.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">15. Ley Aplicable y Jurisdicción</h2>
            <p className="text-gray-300">
              Estos Términos se regirán e interpretarán de acuerdo con las leyes aplicables. Para evitar
              ambigüedades tiene sentido especificar la jurisdicción que prefieras (por ejemplo: Perú). Si
              no estás seguro, consulta con un abogado para definir la jurisdicción que más convenga a tu proyecto.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">16. Separabilidad</h2>
            <p className="text-gray-300">
              Si alguna disposición de estos Términos se considera inválida o inaplicable, las demás disposiciones
              permanecerán vigentes y aplicables.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">17. Contacto</h2>
            <p className="text-gray-300">
              Para consultas legales o relacionadas con estos términos, puedes contactar a:
            </p>
            <p className="text-gray-300 mt-2">
              <strong>Edwar Rejas Reyes</strong><br />
              Michi Marketing<br />
              Correo: <a className="text-emerald-400 underline" href="mailto:contacto@michimarketing.com">contacto@michimarketing.com</a>
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="text-xl font-semibold text-emerald-400 mb-2">18. Aceptación expresa</h2>
            <p className="text-gray-300">
              Al usar Michi Marketing confirmas que has leído, entendido y aceptado estos Términos y Condiciones.
            </p>
          </section>

          {/* Legal reminder */}
          <section>
            <h2 className="text-lg font-semibold text-yellow-400 mb-2">Aviso importante</h2>
            <p className="text-gray-300">
              Esta plantilla de Términos y Condiciones está diseñada para ser completa y práctica,
              pero no constituye asesoría legal. Para minimizar riesgos legales y adaptar el texto
              a tu país, productos y funcionalidades (por ejemplo: comercio electrónico, suscripciones,
              protección de datos específica como GDPR/LPDP), te recomiendo <strong>consultar con un abogado</strong>
              que revise y personalice estas condiciones.
            </p>
          </section>
        </article>

        <footer className="text-center mt-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} Michi Marketing — Creado por Edwar Rejas Reyes.
        </footer>
      </div>
    </div>
  );
}
