// app/courses/page.tsx
import Image from "next/image";
import Link from "next/link";
import { courses } from "../data/coures";

export default function CoursesPage() {
  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          📚 Cursos recomendados
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg hover:scale-[1.02] transition-transform"
            >
              {/* Imagen con enlace */}
              <Link href={`/courses/${course.slug}`}>
                <div className="relative w-full h-48 cursor-pointer">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Contenido */}
              <div className="p-6 flex flex-col flex-grow">
                <Link href={`/courses/${course.slug}`}>
                  <h2 className="text-xl font-semibold mb-2 hover:text-purple-400 cursor-pointer transition-colors">
                    {course.title}
                  </h2>
                </Link>
                
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {course.description}
                </p>
                
                <p className="text-gray-500 text-xs mb-4">
                  Nivel: {course.level} • Duración: {course.duration}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  {/* Botón para ver detalles */}
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                  >
                    Ver detalles →
                  </Link>
                  
                  {/* Botón Afiliado */}
                  <a
                    href={course.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition"
                  >
                    Ir al curso
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}