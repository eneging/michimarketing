import { tools } from "../../data/tools";
import Link from "next/link";
import RatingStars from "../../components/RatingStars";
import TagList from "../../components/TagList";
import CommentsList from "../../components/CommentsList";
import RelatedTools from "../../components/RelatedTools";
import { getYoutubeEmbed } from "../../lib/getYoutubeEmbed";

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-static";

export default async function ToolPage({ params }: ToolPageProps) {
  const tool = tools.find((t) => t.slug === params.slug);

  if (!tool) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-center text-2xl font-bold mt-10 text-red-400">
          Tool not found
        </h1>
        <div className="text-center mt-6">
          <Link
            href="/"
            className="px-6 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const related = tools
    .filter((t) => t.category === tool.category && t.slug !== tool.slug)
    .slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {tool.logo && (
          <div className="p-2 bg-neutral-900 rounded-xl border border-neutral-800">
            <img
              src={tool.logo}
              alt={tool.name}
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

      {/* Categoría */}
      {tool.category && (
        <div className="mb-6">
          <span className="text-sm text-neutral-500">Category:</span>{" "}
          <Link
            href={`/categories/${tool.category}`}
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            {tool.category}
          </Link>
        </div>
      )}

      {/* Pricing */}
      {tool.pricing && (
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
                <ul className="list-disc list-inside text-sm text-neutral-400">
                  {plan.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
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
            ></iframe>
          </div>
        </div>
      )}

      {/* Cursos */}
      {tool.courses && tool.courses.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">Recommended Courses</h2>
          <ul className="space-y-3">
            {tool.courses.map((c, i) => (
              <li
                key={i}
                className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover-lift transition-all"
              >
                <a
                  href={c.affiliate || c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 font-medium hover:text-blue-300 transition-colors"
                >
                  {c.title}
                </a>{" "}
                <span className="text-sm text-neutral-500">({c.platform})</span>
                {c.price && (
                  <p className="text-sm text-neutral-400 mt-1">{c.price}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Canales de YouTube */}
      {tool.youtubeChannels && tool.youtubeChannels.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">YouTube Channels</h2>
          <ul className="space-y-2">
            {tool.youtubeChannels.map((ch, i) => (
              <li key={i} className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mr-2"></div>
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {ch.name}
                </a>{" "}
                {ch.language && (
                  <span className="text-sm text-neutral-500 ml-2">
                    ({ch.language})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Creadores */}
      {tool.creators && tool.creators.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">
            Content Creators to Follow
          </h2>
          <ul className="space-y-2">
            {tool.creators.map((cr, i) => (
              <li key={i} className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mr-2"></div>
                <a
                  href={cr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {cr.name}
                </a>{" "}
                <span className="text-sm text-neutral-500 ml-2">({cr.platform})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Comunidad */}
      {tool.communityLinks && tool.communityLinks.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">Community</h2>
          <ul className="space-y-2">
            {tool.communityLinks.map((c, i) => (
              <li key={i} className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 mr-2"></div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* FAQ */}
      {tool.faq && tool.faq.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-3 text-neutral-200">FAQ</h2>
          <div className="space-y-4">
            {tool.faq.map((q, i) => (
              <div
                key={i}
                className="p-4 bg-neutral-900 rounded-xl border border-neutral-800 hover-lift transition-all"
              >
                <p className="font-semibold text-neutral-200">{q.question}</p>
                <p className="text-neutral-400 mt-2">{q.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      {tool.reviews && <CommentsList comments={tool.reviews} />}

      {/* Website / Affiliate link */}
      {tool.affiliateLink || tool.website ? (
        <a
          href={tool.affiliateLink || tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Visit Website
        </a>
      ) : null}

      {/* Related */}
      {related.length > 0 && <RelatedTools tools={related} />}
    </main>
  );
}