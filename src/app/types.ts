export type Tool = {
  name: string;
  slug: string;
  category: string;
  description: string;
  website: string;
  logo?: string;
  tutorialVideo?: string;
  screenshots?: string[];
  pricing?: {
    plan: string;
    price: string;
    features: string[];
  }[];
  rating?: number;
  reviews?: {
    user: string;
    comment: string;
    rating: number;
  }[];
  tags?: string[];
  pros?: string[];
  cons?: string[];
  releaseDate?: string;
  developer?: string;

  // 🔥 Nuevos campos
  courses?: {
    title: string;
    url: string;
    platform: string;
    price?: string;
    affiliate?: string; // enlace afiliado
  }[];

  youtubeChannels?: {
    name: string;
    url: string;
    language?: string;
  }[];

  creators?: {
    name: string;
    platform: string; // YouTube, Blog, Twitter
    url: string;
  }[];

  docs?: string;
  tutorials?: { title: string; url: string }[];

  affiliateLink?: string;
  deals?: { description: string; url: string; validUntil?: string }[];

  platforms?: string[];
  integrations?: string[];
  alternatives?: string[];
  requirements?: string[];

  communityLinks?: { name: string; url: string }[];
  faq?: { question: string; answer: string }[];
};


