// app/tools/[slug]/page.tsx
import { tools } from "../../data/tools";

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";


import ToolCard from "../../components/ToolCard";
import RatingStars from "../../components/RatingStars";
import TagList from "../../components/TagList";
import CommentsList from "../../components/CommentsList";
import { getYoutubeEmbed } from "../../lib/getYoutubeEmbed";

interface ToolPageParams {
  slug: string;
}

interface ToolPageProps {
  params: Promise<ToolPageParams>;
}

export const dynamic = "force-static";

// ----------------- ToolMainContent -----------------
async function ToolMainContent({ slug }: { slug: string }) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const adaptedReviews = tool.reviews as Array<{
    user: string;
    rating: number;
    comment: string;
    date: string;
  }> | undefined;

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

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && <TagList tags={tool.tags} />}

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

      {/* Tutorial Video */}
      {tool.tutorialVideo && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">Tutorial</h2>
          <div className="aspect-video rounded-xl overflow-hidden border border-neutral-800">
            <iframe
              src={getYoutubeEmbed(tool.tutorialVideo)}
              title={`${tool.name} tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Reviews */}
      {adaptedReviews && adaptedReviews.length > 0 && (
        <CommentsList comments={adaptedReviews} />
      )}
    </>
  );
}

// ----------------- RelatedToolsSection -----------------
async function RelatedToolsSection({ slug }: { slug: string }) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return null;

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {related.map((t) => (
        <ToolCard
          key={t.slug}
          slug={t.slug}
          name={t.name}
          description={t.description}
          website={t.website}
          logo={t.logo}
        
          rating={t.rating}
          tags={t.tags}
          pricing={t.pricing}
          videoTutorial={t.tutorialVideo}
         
        />
      ))}
    </div>
  );
}

// ----------------- Página principal -----------------
export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Suspense fallback={<div>Loading main content...</div>}>
        <ToolMainContent slug={slug} />
      </Suspense>

      <div className="my-10 border-t border-neutral-800"></div>

      <h2 className="text-2xl font-semibold mb-6 text-neutral-200">
        Related Tools
      </h2>

      <Suspense fallback={<div>Loading related tools...</div>}>
        <RelatedToolsSection slug={slug} />
      </Suspense>
    </main>
  );
}

// ----------------- Static params -----------------
export async function generateStaticParams() {
  return tools.map((t) => ({
    slug: t.slug,
  }));
}
