export interface Comparativa {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tools: string[];
  features: {
    name: string;
    values: Record<string, string | number | boolean>;
  }[];
  content?: string;
}

export const comparativas: Comparativa[] = [
  {
    slug: "vercel-vs-netlify",
    title: "Vercel vs Netlify",
    excerpt: "¿Cuál es la mejor plataforma para desplegar aplicaciones modernas?",
    category: "deploy",
    tools: ["Vercel", "Netlify"],
    features: [
      {
        name: "Facilidad de uso",
        values: {
          Vercel: "⭐⭐⭐⭐⭐",
          Netlify: "⭐⭐⭐⭐",
        },
      },
      {
        name: "Velocidad de despliegue",
        values: {
          Vercel: "Muy rápida",
          Netlify: "Rápida",
        },
      },
      {
        name: "Free Tier",
        values: {
          Vercel: "100 GB / mes",
          Netlify: "125 GB / mes",
        },
      },
      {
        name: "Integración con Git",
        values: {
          Vercel: "Automática",
          Netlify: "Automática",
        },
      },
      {
        name: "Pricing",
        values: {
          Vercel: "Desde $20/mes",
          Netlify: "Desde $19/mes",
        },
      },
    ],
    content: `
      <p>Vercel es excelente para proyectos con Next.js, ofreciendo integración
      nativa y despliegues instantáneos. Netlify, por otro lado, destaca por su
      simplicidad y un generoso plan gratuito.</p>
      <p>Si tu stack está basado en React/Next.js, probablemente Vercel sea la mejor opción.
      Si buscas algo rápido y simple para JAMStack, Netlify sigue siendo muy competitivo.</p>
    `,
  },
  {
    slug: "supabase-vs-firebase",
    title: "Supabase vs Firebase",
    excerpt: "Bases de datos en tiempo real, autenticación y almacenamiento.",
    category: "backend",
    tools: ["Supabase", "Firebase"],
    features: [
      {
        name: "Base de datos",
        values: {
          Supabase: "Postgres",
          Firebase: "Firestore (NoSQL)",
        },
      },
      {
        name: "Realtime",
        values: {
          Supabase: "Sí",
          Firebase: "Sí",
        },
      },
      {
        name: "Open Source",
        values: {
          Supabase: "Sí",
          Firebase: "No",
        },
      },
      {
        name: "Pricing",
        values: {
          Supabase: "Free Tier + escalable",
          Firebase: "Free Tier + pago por uso",
        },
      },
    ],
    content: `
      <p>Supabase ha emergido como la alternativa open source más cercana a Firebase,
      ofreciendo una base de datos SQL robusta (Postgres) y todas las features modernas
      como autenticación, storage y realtime.</p>
      <p>Firebase sigue siendo más maduro y con mejor infraestructura global,
      pero para proyectos open source o con necesidad de SQL, Supabase es ideal.</p>
    `,
  },
  {
    slug: "next-vs-remix",
    title: "Next.js vs Remix",
    excerpt: "Comparativa entre dos de los frameworks más populares de React.",
    category: "frontend",
    tools: ["Next.js", "Remix"],
    features: [
      {
        name: "Data Fetching",
        values: {
          "Next.js": "SSR, SSG, ISR",
          Remix: "Loaders (server-first)",
        },
      },
      {
        name: "Routing",
        values: {
          "Next.js": "File-based",
          Remix: "Nested Routes",
        },
      },
      {
        name: "Learning Curve",
        values: {
          "Next.js": "Media",
          Remix: "Alta al inicio",
        },
      },
      {
        name: "SSR Performance",
        values: {
          "Next.js": "Muy buena",
          Remix: "Excelente",
        },
      },
    ],
    content: `
      <p>Next.js ha dominado el ecosistema React con un soporte robusto para SSR,
      Static y server components en su nueva versión. Remix, en cambio, apuesta por
      un enfoque "web standards first" con loaders y acciones muy bien pensadas.</p>
      <p>Si buscas estabilidad y ecosistema, Next.js es el estándar. Si quieres
      explorar un enfoque diferente, Remix ofrece un UX muy atractivo.</p>
    `,
  },
];
