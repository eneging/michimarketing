// src/app/data/deals.ts

export interface Deal {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  date: string;
  image?: string;
  link?: string;
  benefits?: string[];
  conditions?: string[];
  category?: string;
  tags?: string[];
}

export const deals: Deal[] = [
  {
    title: "50% de descuento en Notion Pro",
    slug: "notion-pro-50",
    excerpt: "Aprovecha esta oferta exclusiva de Notion Pro con un 50% de descuento.",
    description:
      "Notion Pro es la herramienta perfecta para organizar tu vida y proyectos. Con esta oferta, obtienes acceso completo a todas sus funcionalidades por la mitad de precio.",
    date: "2025-08-01",
    image: "/images/deals/notion-pro.jpg",
    link: "https://www.notion.so/pro-deal",
    benefits: [
      "50% de descuento",
      "Acceso completo a plantillas premium",
      "Sin límite de proyectos",
    ],
    conditions: ["Oferta válida hasta agotar stock", "Solo para nuevos usuarios"],
    category: "productivity",
    tags: ["productivity", "notion", "discount"],
  },
  {
    title: "Curso de React con 30% Off",
    slug: "react-course-30",
    excerpt: "Domina React con este curso online y obtén un 30% de descuento.",
    description:
      "Aprende React desde cero hasta nivel avanzado con este curso práctico. Incluye proyectos reales y soporte del instructor.",
    date: "2025-08-05",
    image: "/images/deals/react-course.jpg",
    link: "https://www.example.com/react-course",
    benefits: [
      "30% de descuento",
      "Acceso de por vida al contenido",
      "Certificado al finalizar",
    ],
    conditions: ["Oferta válida por tiempo limitado"],
    category: "courses",
    tags: ["react", "frontend", "discount"],
  },
  {
    title: "Template UI Kit Gratis",
    slug: "ui-kit-free",
    excerpt: "Descarga gratis este UI Kit profesional para tus proyectos.",
    description:
      "Este UI Kit incluye más de 100 componentes listos para usar, compatible con Figma y Sketch.",
    date: "2025-08-10",
    image: "/images/deals/ui-kit.jpg",
    link: "https://www.example.com/ui-kit",
    benefits: ["100+ componentes listos", "Compatible con Figma y Sketch"],
    conditions: ["Gratis solo por tiempo limitado"],
    category: "design",
    tags: ["design", "ui-kit", "free"],
  },
];
