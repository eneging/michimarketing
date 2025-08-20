// app/courses/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { courses } from "../../data/coures"; // typo corregido

interface CoursePageParams {
  slug: string;
}

interface CoursePageProps {
  params: Promise<CoursePageParams>; // ahora es Promise
}

export const dynamic = "force-static";

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params; // await para obtener slug

  const course = courses.find((c) => c.slug === slug);

  if (!course) return notFound();

  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
          <p className="text-gray-400 text-sm">
             • {course.level} • {course.duration}
          </p>
        </header>

        {/* Imagen */}
        <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Contenido principal */}
        <div className="prose prose-lg prose-invert max-w-none mb-12">
          <p>{course.description}</p>

          <h2>¿Por qué este curso?</h2>
          

        </div>

        {/* Botón afiliado */}
        <div className="text-center">
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-600 text-white text-lg px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Ir al curso 🚀
          </a>
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
