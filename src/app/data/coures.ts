// app/data/courses.ts
export interface Course {
  id: string;
  slug: string; // Añade este campo
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
  tags: string[];
  affiliateUrl: string;
  content?: string; // Para la página de detalles
  instructor?: string;
  lessons?: number;
  price?: string;
  rating?: number;
}

export const courses: Course[] = [
  {
    id: "1",
    slug: "react-desde-cero", // Slug único para la URL
    title: "React desde Cero",
    description: "Aprende React con proyectos prácticos y modernos.",
    level: "Principiante",
    duration: "12 horas",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    tags: ["React", "JavaScript", "Frontend"],
    affiliateUrl: "https://ejemplo.com/react",
    content: "Contenido completo del curso de React...",
    instructor: "Ana López",
    lessons: 45,
    price: "$49.99",
    rating: 4.8
  },
  {
    id: "2",
    slug: "nextjs-avanzado",
    title: "Next.js Avanzado",
    description: "Domina el framework de React para producción.",
    level: "Intermedio",
    duration: "15 horas",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    tags: ["Next.js", "React", "SSR"],
    affiliateUrl: "https://ejemplo.com/nextjs",
    content: "Contenido completo del curso de Next.js",
    instructor: "Carlos Méndez",
    lessons: 38,
    price: "$59.99",
    rating: 4.9
  },
  // Agrega más cursos con sus slugs...
];