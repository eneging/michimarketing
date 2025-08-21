// app/courses/page.tsx
import Image from "next/image";
import Link from "next/link";
import { courses } from "../data/coures";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header mejorado */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            📚 Cursos Recomendados
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Descubre los mejores cursos seleccionados cuidadosamente para impulsar tu aprendizaje y carrera profesional.
          </p>
        </header>

        {/* Filtros para desktop */}
        <div className="hidden md:flex justify-center mb-10 gap-4">
          <button className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
            Todos
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
            Principiante
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
            Intermedio
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors">
            Avanzado
          </button>
        </div>

        {/* Selector de filtros para móvil */}
        <div className="md:hidden mb-6">
          <select className="w-full p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700">
            <option>Todos los niveles</option>
            <option>Principiante</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
          </select>
        </div>

        {/* Grid de cursos mejorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-700"
            >
              {/* Imagen con efecto overlay al hover */}
              <Link href={`/cursos/${course.slug}`}>
                <div className="relative w-full h-48 md:h-52 cursor-pointer overflow-hidden group">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 bg-purple-600 text-xs text-white px-2 py-1 rounded-full">
                    {course.level}
                  </div>
                </div>
              </Link>

              {/* Contenido de la tarjeta */}
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <Link href={`/cursos/${course.slug}`}>
                  <h2 className="text-lg md:text-xl font-semibold mb-2 hover:text-purple-400 cursor-pointer transition-colors line-clamp-2">
                    {course.title}
                  </h2>
                </Link>
                
                <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex items-center text-gray-500 text-xs mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.duration}</span>
                </div>

                {/* Tags mejorados */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                  {course.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                      +{course.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-700">
                  {/* Botón para ver detalles */}
                  <Link
                    href={`/cursos/${course.slug}`}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors flex items-center"
                  >
                    Más información
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  {/* Botón Afiliado mejorado */}
                  <a
                    href={course.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    Ir al curso
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación o carga más (opcional) */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-700">
            Cargar más cursos
          </button>
        </div>

        {/* Newsletter section */}
        <div className="mt-16 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Suscríbete a nuestra newsletter y recibe recomendaciones personalizadas de cursos cada semana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-grow px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium">
              Suscribirme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}