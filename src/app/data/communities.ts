// /data/communities.ts
export interface Community {
  id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
  platform: "Discord" | "Telegram" | "YouTube" | "Facebook" | "Foro";
  members: string;
  affiliateUrl: string; // link de invitación o afiliado
}

export const communities: Community[] = [
  {
    id: "1",
    name: "Marketing Digital México",
    description:
      "Comunidad activa en Telegram para compartir estrategias de marketing digital, SEO, y publicidad online en español.",
    slug: "marketing-digital-mexico",
    image: "/images/communities/marketing-digital-mx.jpg",
    platform: "Telegram",
    members: "22k miembros",
    affiliateUrl: "https://t.me/marketingdigitalmexico",
  },
  {
    id: "2",
    name: "Programadores Latam",
    description:
      "Comunidad en Discord para programadores y desarrolladores en español, con canales de tecnologías como JavaScript, Python, y Machine Learning.",
    slug: "programadores-latam",
    image: "/images/communities/programadores-latam.jpg",
    platform: "Discord",
    members: "30k miembros",
    affiliateUrl: "https://discord.gg/programadoreslatam",
  },
  {
    id: "3",
    name: "SEO y Marketing Online - Jon Mircha",
    description:
      "Canal de YouTube con contenido actualizado en SEO, marketing digital y emprendimiento online impartido por Jon Mircha.",
    slug: "jon-mircha",
    image: "/images/communities/jon-mircha.jpg",
    platform: "YouTube",
    members: "250k suscriptores",
    affiliateUrl: "https://www.youtube.com/c/JonMircha",
  },
  {
    id: "4",
    name: "MoureDev Academy",
    description:
      "Canal de YouTube enfocado en desarrollo de software, nuevas tecnologías y marketing para programadores hispanohablantes.",
    slug: "mouredev-academy",
    image: "/images/communities/mouredev.jpg",
    platform: "YouTube",
    members: "350k suscriptores",
    affiliateUrl: "https://www.youtube.com/c/MoureDev",
  },
  {
    id: "5",
    name: "Foro Marketing de Guerrilla",
    description:
      "Foro especializado en estrategias de marketing innovadoras, branding y técnicas de crecimiento para pequeñas y medianas empresas.",
    slug: "marketing-de-guerrilla",
    image: "/images/communities/marketing-guerrilla.jpg",
    platform: "Foro",
    members: "5k miembros",
    affiliateUrl: "https://foro.marketingdeguerrilla.mx",
  },
  {
    id: "6",
    name: "Growth Marketing Latam",
    description:
      "Grupo de Facebook para compartir tácticas de crecimiento, analítica y automatización aplicadas al marketing digital.",
    slug: "growth-marketing-latam",
    image: "/images/communities/growth-latam.jpg",
    platform: "Facebook",
    members: "18k miembros",
    affiliateUrl: "https://www.facebook.com/groups/growthmarketinglatam",
  },
  {
    id: "7",
    name: "La Comunidad de IA en Español",
    description:
      "Telegram para interesados en inteligencia artificial aplicada a marketing, tecnologías emergentes y machine learning.",
    slug: "ia-en-espanol",
    image: "/images/communities/ia-espanol.jpg",
    platform: "Telegram",
    members: "15k miembros",
    affiliateUrl: "https://t.me/comunidadIA",
  },
];
