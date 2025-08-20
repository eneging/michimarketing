import { notFound } from "next/navigation";
import Image from "next/image";
import { courses } from "../../data/coures";

interface Props {
  params: { slug: string };
}

export default function CourseDetailPage({ params }: Props) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) return notFound();

  return (
    <div className="bg-gray-950 min-h-screen text-gray-200">
      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold mb-4">{course.title}</h1>
          <p className="text-gray-400 text-sm">
            {course.platform} • {course.level} • {course.duration}
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
          <ul>
            {course.benefits?.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>

          {course.disadvantages && course.disadvantages.length > 0 && (
            <>
              <h2>Lo que podría mejorar</h2>
              <ul>
                {course.disadvantages.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Botón afiliado */}
        <div className="text-center">
          <a
            href={course.affiliateLink}
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
