// app/courses/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { courses } from "../../data/coures";

interface CoursePageParams {
  slug: string;
}

interface CoursePageProps {
  params: Promise<CoursePageParams>;
}

export const dynamic = "force-static";

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;

  const course = courses.find((c) => c.slug === slug);

  if (!course) return notFound();

  // Encontrar cursos relacionados (mismos tags o mismo nivel)
  const relatedCourses = courses
    .filter((c) => c.id !== course.id && 
      (c.tags.some(tag => course.tags.includes(tag)) || c.level === course.level))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Inicio
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/cursos" className="text-gray-400 hover:text-white transition-colors">
              Cursos
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-300 truncate">{course.title}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <header className="mb-10 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 text-sm font-medium mb-6">
            {course.level} • {course.duration}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            {course.title}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {course.description}
          </p>
        </header>

        {/* Course Image */}
        <div className="relative w-full h-64 md:h-96 mb-10 rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Course Details */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Descripción del curso</h2>
              
              {/* Contenido del curso si está disponible */}
              {course.content ? (
                <div className="prose prose-lg prose-invert max-w-none" 
                  dangerouslySetInnerHTML={{ __html: course.content }} 
                />
              ) : (
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 mb-6">
                    {course.description}
                  </p>

                  <h3 className="text-xl font-semibold mt-8 mb-4 text-white">¿Qué aprenderás?</h3>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Habilidades prácticas aplicables inmediatamente</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Conocimiento profundo de los conceptos clave</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Proyectos prácticos para consolidar el aprendizaje</span>
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-8 mb-4 text-white">¿Por qué este curso?</h3>
                  <p className="text-gray-300">
                    Este curso ha sido seleccionado por su calidad de contenido, enfoque práctico y excelentes reviews por parte de estudiantes que han transformado sus carreras gracias a estos conocimientos.
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h4 className="text-lg font-medium mb-3 text-gray-400">Temas cubiertos</h4>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-sm rounded-full bg-gray-700 text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Enrollment Card */}
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-white">¡Comienza ahora!</h3>
                <p className="text-gray-300 mb-6">Accede a todo el contenido del curso y comienza tu journey de aprendizaje hoy mismo.</p>
                
                <a
                  href={course.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-purple-900 text-center font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                >
                  Ir al curso 🚀
                </a>
                
                <div className="mt-6 flex flex-col items-center space-y-3 text-sm text-gray-300">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </div>
                  
                  {course.lessons && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {course.lessons} lecciones
                    </div>
                  )}
                  
                  {course.price && (
                    <div className="flex items-center font-semibold text-white">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.price}
                    </div>
                  )}
                  
                  {course.rating && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {course.rating}/5.0
                    </div>
                  )}
                </div>
              </div>

              {/* Course Info Card */}
              <div className="bg-gray-800/50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold mb-4 text-white">Detalles del curso</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nivel:</span>
                    <span className="text-white">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duración:</span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  {course.instructor && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Instructor:</span>
                      <span className="text-white">{course.instructor}</span>
                    </div>
                  )}
                  {course.lessons && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lecciones:</span>
                      <span className="text-white">{course.lessons}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white">Cursos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCourses.map((relatedCourse) => (
                <Link 
                  key={relatedCourse.id} 
                  href={`/courses/${relatedCourse.slug}`}
                  className="block bg-gray-800/50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-40">
                    <Image
                      src={relatedCourse.image}
                      alt={relatedCourse.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold mb-2 text-white line-clamp-2">{relatedCourse.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{relatedCourse.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{relatedCourse.level}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedCourse.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Courses */}
        <div className="text-center">
          <Link
            href="/courses"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a todos los cursos
          </Link>
        </div>
      </div>
    </div>
  );
}

// Generación estática de rutas dinámicas
export async function generateStaticParams() {
  return courses.map((c) => ({
    slug: c.slug,
  }));
}