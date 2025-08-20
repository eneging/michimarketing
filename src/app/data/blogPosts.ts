export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorImage?: string;
  authorRole?: string;
  featuredImage?: string;
  readTime?: number;
  tags: string[];
  category?: string;
  relatedPosts?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    title: "Las mejores AI Tools en 2025",
    slug: "mejores-ai-tools-2025",
    excerpt: "Descubre las herramientas de inteligencia artificial más potentes y cómo usarlas para aumentar tu productividad.",
    content: `
      <h2>Introducción a las AI Tools</h2>
      <p>La inteligencia artificial sigue revolucionando la forma en que trabajamos y creamos contenido. En 2025, hemos visto avances significativos en herramientas que nos ayudan a ser más productivos y creativos.</p>
      
      <h3>Herramientas destacadas</h3>
      <p>Estas son algunas de las herramientas más impactantes del momento:</p>
      <ul>
        <li><strong>ChatGPT-5</strong> - La última versión del modelo de lenguaje de OpenAI con capacidades multimodales mejoradas</li>
        <li><strong>Jasper 3.0</strong> - Ahora con mejor comprensión contextual para marketing</li>
        <li><strong>MidJourney V6</strong> - Generación de imágenes con calidad fotográfica</li>
        <li><strong>Claude Pro</strong> - Ideal para análisis de documentos largos</li>
        <li><strong>Notion AI</strong> - Integración perfecta con tu workspace</li>
      </ul>
      
      <h3>¿Cómo elegir la herramienta correcta?</h3>
      <p>La selección depende de tus necesidades específicas. Para creación de contenido, Jasper sigue siendo líder, mientras que para investigación, Claude ofrece ventajas únicas.</p>
      
      <h3>Conclusión</h3>
      <p>El ecosistema de IA está madurando rápidamente, con herramientas especializadas para cada necesidad. Lo importante es experimentar y encontrar lo que mejor se adapte a tu flujo de trabajo.</p>
    `,
    date: "2025-08-10",
    author: "María Rodríguez",
    authorImage: "/images/authors/maria-rodriguez.jpg",
    authorRole: "Especialista en IA",
    featuredImage: "https://images.unsplash.com/photo-1744640326166-433469d102f2?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: 8,
    tags: ["AI", "Herramientas", "Tendencias", "Productividad"],
    category: "Tecnología",
    relatedPosts: ["guia-seo-rankear-google", "nextjs-14-novedades"]
  },
  {
    title: "Guía SEO: cómo rankear en Google en 2025",
    slug: "guia-seo-rankear-google",
    excerpt: "Técnicas modernas de SEO que funcionan en 2025. Aprende a optimizar tu sitio para los nuevos algoritmos.",
    content: `
      <h2>El SEO en 2025: ¿Qué ha cambiado?</h2>
      <p>Con las actualizaciones de algoritmos de Google, el SEO ha evolucionado hacia una experiencia más centrada en el usuario y la calidad del contenido.</p>
      
      <h3>Factores clave de ranking</h3>
      <p>Los principales factores que Google considera en 2025 son:</p>
      <ol>
        <li>Experiencia de usuario (Core Web Vitals mejorados)</li>
        <li>Calidad y profundidad del contenido</li>
        <li>Señales de experiencia (E-E-A-T)</li>
        <li>Optimización para búsqueda vocal</li>
        <li>Marcado schema estructurado</li>
      </ol>
      
      <h3>Estrategias efectivas</h3>
      <p>Más allá de las técnicas tradicionales, enfócate en:</p>
      <ul>
        <li>Crear contenido integral que responda a todas las posibles preguntas del usuario</li>
        <li>Optimizar para featured snippets</li>
        <li>Construir una arquitectura de sitio lógica y bien interlinkeada</li>
        <li>Utilizar multimedia de calidad (imágenes, videos, infografías)</li>
      </ul>
      
      <h3>Conclusión</h3>
      <p>El SEO en 2025 requiere un enfoque holístico donde la experiencia del usuario y la calidad del contenido son primordiales. Las técnicas agresivas ya no funcionan.</p>
    `,
    date: "2025-08-15",
    author: "Carlos Méndez",
    authorImage: "/images/authors/carlos-mendez.jpg",
    authorRole: "Especialista en SEO",
    featuredImage: "https://images.unsplash.com/photo-1600469984476-c713650f1b1b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    readTime: 12,
    tags: ["SEO", "Marketing", "Google", "Optimización"],
    category: "Marketing Digital",
    relatedPosts: ["mejores-ai-tools-2025", "redes-sociales-2025"]
  },
  {
    title: "Next.js 14: Novedades y mejores prácticas",
    slug: "nextjs-14-novedades",
    excerpt: "Todo lo que necesitas saber sobre la última versión de Next.js y cómo implementar sus nuevas características.",
    content: `
      <h2>Next.js 14: Rendimiento y productividad mejorados</h2>
      <p>La última versión de Next.js trae mejoras significativas en el rendimiento y la experiencia de desarrollo.</p>
      
      <h3>Nuevas características destacadas</h3>
      <ul>
        <li><strong>Turbopack estable</strong> - Compilación hasta 5x más rápida</li>
        <li><strong>Server Actions estables</strong> - Mutaciones de datos desde componentes del servidor</li>
        <li><strong>Mejoras en App Router</strong> - Mayor estabilidad y nuevas APIs</li>
        <li><strong>Optimizaciones de imágenes</strong> - Soporte para formatos modernos</li>
      </ul>
      
      <h3>Mejores prácticas para implementación</h3>
      <p>Para aprovechar al máximo Next.js 14:</p>
      <ol>
        <li>Migra gradualmente a App Router</li>
        <li>Utiliza Server Actions para mutaciones de datos</li>
        <li>Aprovecha la carga parcial (Partial Prerendering)</li>
        <li>Optimiza bundles con output: 'standalone'</li>
      </ol>
      
      <h3>Conclusión</h3>
      <p>Next.js 14 consolida las características experimentales de versiones anteriores y ofrece una base sólida para aplicaciones de alto rendimiento.</p>
    `,
    date: "2025-08-20",
    author: "Ana López",
    authorImage: "/images/authors/ana-lopez.jpg",
    authorRole: "Desarrolladora Frontend",
    featuredImage: "/images/blog/nextjs-14.jpg",
    readTime: 10,
    tags: ["Next.js", "React", "Frontend", "Desarrollo"],
    category: "Desarrollo Web",
    relatedPosts: ["mejores-ai-tools-2025", "tailwind-css-tips"]
  }
];