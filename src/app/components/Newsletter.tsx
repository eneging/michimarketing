import React from 'react'

function Newsletter() {
  return (
    <div> {/* 📩 NEWSLETTER */}
      <section className="bg-indigo-600 text-white py-16 px-6 rounded-2xl shadow-md text-center space-y-6">
        <h2 className="text-3xl font-bold">
          Suscríbete y recibe las mejores herramientas cada semana 🚀
        </h2>
        <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
          No te pierdas las últimas novedades de marketing digital, inteligencia artificial y herramientas que están revolucionando el mercado.
        </p>
        <form className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="w-full md:flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md transition"
          >
            Suscribirme
          </button>
        </form>
        <p className="text-sm text-indigo-200 mt-4">
          Prometemos no hacer spam 💌. Solo lo mejor del mundo digital.
        </p>
      </section></div>
  )
}

export default Newsletter