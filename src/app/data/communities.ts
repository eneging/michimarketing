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
    name: "Amantes del Cacao",
    description:
      "Una comunidad vibrante de chocolateros artesanales donde se comparten tips, recetas y oportunidades.",
    slug: "amantes-del-cacao",
    image: "/images/communities/cacao.jpg",
    platform: "Discord",
    members: "2.5k miembros",
    affiliateUrl: "https://discord.gg/ejemplo", // tu link
  },
  {
    id: "2",
    name: "Repostería Creativa Perú",
    description:
      "Grupo dedicado a la repostería peruana moderna, comparte tus creaciones y aprende nuevas técnicas.",
    slug: "reposteria-creativa-peru",
    image: "/images/communities/peru.jpg",
    platform: "Facebook",
    members: "8k miembros",
    affiliateUrl: "https://facebook.com/groups/ejemplo", // tu link
  },
];
