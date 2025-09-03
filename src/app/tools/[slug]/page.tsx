// app/tools/[slug]/page.tsx
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolCard from "../../components/ToolCard";
import RatingStars from "../../components/RatingStars";
import TagList from "../../components/TagList";
import CommentsList from "../../components/CommentsList";
import { getYoutubeEmbed } from "../../lib/getYoutubeEmbed";
// Tipos de datos para las herramientas
interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  category?: string;
  category_id?: number;
  rating?: number;
  tags?: string[];
  logo?: string;
  website?: string;
  tutorial_video?: string;
  pricing?: Array<{
    plan: string;
    price: string;
    features?: string[];
  }>;
  reviews?: Array<{
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  // Nuevos campos
  image?: string;
  screenshots?: string[];
  pros?: string[];
  cons?: string[];
  release_date?: string;
  developer?: string;
  courses?: string[];
  youtube_channels?: string[];
  creators?: string[];
  docs?: string;
  tutorials?: string[];
  affiliate_link?: string;
  deals?: string[];
  platforms?: string[];
  integrations?: string[];
  alternatives?: string[];
  requirements?: string[];
  community_links?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}
interface ToolPageParams {
  slug: string;
}
interface ToolPageProps {
  params: Promise<ToolPageParams>;
}
// URL de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL!;
// ----------------- ToolMainContent -----------------
function ToolMainContent({ tool }: { tool: Tool }) {
  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {tool.logo && (
          <div className="p-2 bg-neutral-900 rounded-xl border border-neutral-800">
            <Image
              src={tool.logo}
              alt={tool.name}
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
            />
          </div>
        )}
        <div>
          <h1 className="text-4xl font-bold text-neutral-200">{tool.name}</h1>
          {tool.rating && <RatingStars rating={tool.rating} />}
        </div>
      </div>
      {/* Descripción */}
      <p className="text-neutral-400 mb-6 leading-relaxed">{tool.description}</p>
      {/* Enlaces y otros datos */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-neutral-400">
        {tool.website && (
          <Link href={tool.website} className="hover:text-blue-500 transition-colors">
            🌐 Website
          </Link>
        )}
        {tool.docs && (
          <Link href={tool.docs} className="hover:text-blue-500 transition-colors">
            📄 Docs
          </Link>
        )}
        {tool.affiliate_link && (
          <Link href={tool.affiliate_link} className="hover:text-blue-500 transition-colors">
            🔗 Affiliate Link
          </Link>
        )}
        {tool.developer && (
          <span>🧑‍💻 Developer: {tool.developer}</span>
        )}
        {tool.release_date && (
          <span>📅 Released: {tool.release_date}</span>
        )}
      </div>
      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <section className="mb-6">
          <TagList tags={tool.tags} />
        </section>
      )}
      {/* Screenshots */}
      {tool.screenshots && tool.screenshots.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">Screenshots</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tool.screenshots.map((src, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-neutral-800">
                <Image
                  src={src}
                  alt={`${tool.name} screenshot ${idx + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Pros & Cons */}
      {(tool.pros && tool.pros.length > 0) || (tool.cons && tool.cons.length > 0) && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">Pros & Cons</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {tool.pros && tool.pros.length > 0 && (
              <div className="p-4 border border-green-500/20 rounded-xl bg-green-900/10">
                <h3 className="font-bold text-lg text-green-400 mb-2">👍 Pros</h3>
                <ul className="list-disc list-inside text-sm text-neutral-300">
                  {tool.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
            )}
            {tool.cons && tool.cons.length > 0 && (
              <div className="p-4 border border-red-500/20 rounded-xl bg-red-900/10">
                <h3 className="font-bold text-lg text-red-400 mb-2">👎 Cons</h3>
                <ul className="list-disc list-inside text-sm text-neutral-300">
                  {tool.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
      {/* Pricing */}
      {tool.pricing && tool.pricing.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">Pricing</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {tool.pricing.map((plan, idx) => (
              <div
                key={idx}
                className="p-4 border border-neutral-800 rounded-xl bg-neutral-900 hover-lift"
              >
                <h3 className="font-bold text-lg text-neutral-200">{plan.plan}</h3>
                <p className="text-neutral-400 mb-2">{plan.price}</p>
                {plan.features && (
                  <ul className="list-disc list-inside text-sm text-neutral-400">
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Tutorial Video - Solo se muestra si existe */}
      {tool.tutorial_video && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">Tutorial</h2>
          <div className="aspect-video rounded-xl overflow-hidden border border-neutral-800">
            <iframe
              src={getYoutubeEmbed(tool.tutorial_video)}
              title={`${tool.name} tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
      {/* Plataforms and Integrations */}
      {(tool.platforms || tool.integrations || tool.community_links) && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">Compatibility & Integrations</h2>
          <div className="space-y-4">
            {tool.platforms && tool.platforms.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-neutral-300">Platforms</h3>
                <p className="text-neutral-400">{tool.platforms.join(", ")}</p>
              </div>
            )}
            {tool.integrations && tool.integrations.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-neutral-300">Integrations</h3>
                <p className="text-neutral-400">{tool.integrations.join(", ")}</p>
              </div>
            )}


            {/*tool.community_links && tool.community_links.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-neutral-300">Community</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  {tool.community_links.map((link, idx) => (
                    <Link key={idx} href={link} className="text-blue-400 hover:underline">
                      Link {idx + 1}
                    </Link>
                  ))}
                </div>
            </div>
            )*/}
          </div>
        </section>
      )}


      {/* FAQ */}
      {tool.faq && tool.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">FAQ</h2>
          <div className="space-y-4">
            {tool.faq.map((item, idx) => (
              <div key={idx} className="p-4 border border-neutral-800 rounded-xl bg-neutral-900">
                <h3 className="font-semibold text-neutral-200">{item.question}</h3>
                <p className="text-neutral-400 mt-1">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Reviews */}
      {tool.reviews && tool.reviews.length > 0 && (
        <CommentsList comments={tool.reviews} />
      )}
    </>
  );
}
// ----------------- RelatedToolsSection -----------------
async function RelatedToolsSection({ toolId, categoryId }: { toolId: number, categoryId?: number }) {
  if (!categoryId) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">No related tools available</p>
      </div>
    );
  }
  const relatedTools: Tool[] = await fetchRelatedTools(toolId, categoryId);
  if (relatedTools.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">No related tools found</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {relatedTools.map((t) => (
        <ToolCard
          key={t.slug}
          slug={t.slug}
          name={t.name}
          description={t.description}
          logo={t.logo}
          rating={t.rating}
          tags={t.tags}
        />
      ))}
    </div>
  );
}
// ----------------- Data Fetching Functions -----------------
async function fetchToolBySlug(slug: string): Promise<Tool | null> {
  try {
    const res = await fetch(`${API_URL}/api/tools/by-slug/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      console.error(`Error fetching tool: ${res.statusText}`);
      return null;
    }
    const tool = await res.json();
    console.log(tool);
    return tool;
  } catch (error) {
    console.error(`Error fetching tool with slug ${slug}:`, error);
    return null;
  }
}
async function fetchAllToolSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/tools`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch tools");
    }
    const data = await res.json();
    const tools = data.data || data;
    return (tools || []).map((tool: Tool) => tool.slug);
  } catch (error) {
    console.error("Error fetching all tool slugs:", error);
    return [];
  }
}
async function fetchRelatedTools(toolId: number, categoryId: number): Promise<Tool[]> {
  try {
    const res = await fetch(`${API_URL}/api/tools/${toolId}/related`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const relatedTools = await res.json();
      return relatedTools;
    }
    console.log("Related endpoint not available, using fallback method");
    const allToolsRes = await fetch(`${API_URL}/api/tools`, {
      next: { revalidate: 3600 },
    });
    if (!allToolsRes.ok) {
      console.error(`Failed to fetch tools: ${allToolsRes.statusText}`);
      return [];
    }
    const data = await allToolsRes.json();
    const allTools: Tool[] = data.data || data || [];
    const filteredTools = allTools
      .filter((tool) => tool.category_id === categoryId && tool.id !== toolId)
      .slice(0, 3);
    return filteredTools;
  } catch (error) {
    console.error("Error fetching related tools:", error);
    return [];
  }
}
// ----------------- Página principal -----------------
export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await fetchToolBySlug(slug);
  if (!tool) {
    notFound();
  }
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <ToolMainContent tool={tool} />
      <div className="my-10 border-t border-neutral-800"></div>
      <h2 className="text-2xl font-semibold mb-6 text-neutral-200">
        Related Tools
      </h2>
      <Suspense fallback={<div className="py-8 text-center">Loading related tools...</div>}>
        <RelatedToolsSection toolId={tool.id} categoryId={tool.category_id} />
      </Suspense>
    </main>
  );
}
// ----------------- Static params -----------------
export async function generateStaticParams() {
  const slugs = await fetchAllToolSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}