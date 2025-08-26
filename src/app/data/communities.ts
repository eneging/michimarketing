// /data/communities.ts
export interface Community {
  id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  platform: "Discord" | "Telegram" | "Facebook" | "Foro";
  members: string;
  affiliateUrl: string; // link de invitación o afiliado
}

export const communities: Community[] = [
  {
    id: "1",
    name: "SEO Latam",
    description:
      "Comunidad enfocada en estrategias de posicionamiento web, intercambio de herramientas y estudios de caso en español.",
    slug: "seo-latam",
    image: "/images/communities/seo-latam.jpg",
    platform: "Telegram",
    members: "5.2k miembros",
    affiliateUrl: "https://t.me/seo_latam", // ejemplo
  },
  {
    id: "2",
    name: "Growth Hackers en Español",
    description:
      "Grupo donde marketers y emprendedores comparten tácticas de crecimiento, funnels y automatización.",
    slug: "growth-hackers-es",
    image: "/images/communities/growth.jpg",
    platform: "Facebook",
    members: "12k miembros",
    affiliateUrl: "https://facebook.com/groups/growthhackersES", // ejemplo
  },
  {
    id: "3",
    name: "Emprendedores Digitales",
    description:
      "Espacio de networking para quienes inician negocios online, marketing de afiliados y e-commerce.",
    slug: "emprendedores-digitales",
    image: "/images/communities/emprendedores.jpg",
    platform: "Discord",
    members: "3.8k miembros",
    affiliateUrl: "https://discord.gg/emprendedores", // ejemplo
  },
  {
    id: "4",
    name: "Foro SEO Warriors",
    description:
      "Foro especializado en SEO técnico, link building y estrategias avanzadas para dominar Google.",
    slug: "seo-warriors",
    image: "/images/communities/warriors.jpg",
    platform: "Foro",
    members: "9.4k miembros",
    affiliateUrl: "https://seowarriors.com/foro", // ejemplo
  },
  {
    id: "5",
    name: "Marketeros Unidos",
    description:
      "Canal abierto en Telegram para discutir tendencias, IA en marketing, email marketing y casos reales.",
    slug: "marketeros-unidos",
    image: "/images/communities/marketeros.jpg",
    platform: "Telegram",
    members: "7.1k miembros",
    affiliateUrl: "https://t.me/marketeros_unidos", // ejemplo
  },
];
