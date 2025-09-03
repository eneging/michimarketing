"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditToolPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<any>({});
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Efecto para obtener la herramienta y las categorías
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    // Utilizamos Promise.all para esperar a que ambas peticiones se completen
    Promise.all([
      fetch(`${API_URL}/api/tools/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        if (!res.ok) throw new Error("No se pudo obtener la herramienta.");
        return res.json();
      }),
      fetch(`${API_URL}/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        if (!res.ok) throw new Error("No se pudieron obtener las categorías.");
        return res.json();
      })
    ])
    .then(([toolData, categoriesData]) => {
      // Procesa los datos de la herramienta
console.log(toolData);
    
      if (toolData) {
        const tool = toolData;
          setFormData({
          ...tool,
          screenshots: tool.screenshots?.join(", ") || "",
          pricing: tool.pricing?.join(", ") || "",
          reviews: tool.reviews?.join(", ") || "",
          tags: tool.tags?.join(", ") || "",
          pros: tool.pros?.join(", ") || "",
          cons: tool.cons?.join(", ") || "",
          courses: tool.courses?.join(", ") || "",
          youtube_channels: tool.youtube_channels?.join(", ") || "",
          creators: tool.creators?.join(", ") || "",
          tutorials: tool.tutorials?.join(", ") || "",
          deals: tool.deals?.join(", ") || "",
          platforms: tool.platforms?.join(", ") || "",
          integrations: tool.integrations?.join(", ") || "",
          alternatives: tool.alternatives?.join(", ") || "",
          requirements: tool.requirements?.join(", ") || "",
          community_links: tool.community_links?.join(", ") || "",
          faq: tool.faq?.join(", ") || "",
          logo: tool.logo || "",
          image: tool.image || "",
          tutorial_video: tool.tutorial_video || "",
          developer: tool.developer || "",
          docs: tool.docs || "",
          affiliate_link: tool.affiliate_link || "",
        });
      }
      
      // Procesa los datos de las categorías
      setCategories(categoriesData || []);
    })
    .catch((err) => {
      console.error("Error al cargar datos:", err);
      setError(err.message || "Error al cargar los datos. Intenta de nuevo.");
    })
    .finally(() => setLoading(false));

  }, [id, API_URL]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formatArray = (str: string) =>
      str ? str.split(",").map((item) => item.trim()).filter((item) => item.length > 0) : [];

    const payload = {
      ...formData,
      screenshots: formatArray(formData.screenshots),
      pricing: formatArray(formData.pricing),
      reviews: formatArray(formData.reviews),
      tags: formatArray(formData.tags),
      pros: formatArray(formData.pros),
      cons: formatArray(formData.cons),
      courses: formatArray(formData.courses),
      youtube_channels: formatArray(formData.youtube_channels),
      creators: formatArray(formData.creators),
      tutorials: formatArray(formData.tutorials),
      deals: formatArray(formData.deals),
      platforms: formatArray(formData.platforms),
      integrations: formatArray(formData.integrations),
      alternatives: formatArray(formData.alternatives),
      requirements: formatArray(formData.requirements),
      community_links: formatArray(formData.community_links),
      faq: formatArray(formData.faq),
      logo: formData.logo || null,
      image: formData.image || null,
      tutorial_video: formData.tutorial_video || null,
      developer: formData.developer || null,
      docs: formData.docs || null,
      affiliate_link: formData.affiliate_link || null,
      rating: formData.rating ? parseFloat(formData.rating) : null,
      release_date: formData.release_date || null,
    };

    fetch(`${API_URL}/api/tools/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(errorData => {
            throw new Error(errorData.message || "Error al guardar los cambios.");
          });
        }
        return res.json();
      })
      .then(() => {
        router.push("/admin/tools");
      })
      .catch((err) => {
        console.error("Error al actualizar la herramienta:", err);
        setError(err.message || "Error al guardar los cambios. Intenta de nuevo.");
      });
  }

  if (loading) {
    return <p className="text-center py-10">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Editar Tool</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-xl">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">Información General</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
            <input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-400 mb-1">Slug</label>
            <input
              id="slug"
              name="slug"
              value={formData.slug || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-gray-400 mb-1">Categoría</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Selecciona categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}  </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full h-32 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-1">Website</label>
            <input
              id="website"
              name="website"
              value={formData.website || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">Medios y Enlaces</h2>
          <div>
            <label htmlFor="logo" className="block text-sm font-medium text-gray-400 mb-1">URL del Logo</label>
            <input
              id="logo"
              name="logo"
              value={formData.logo || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-400 mb-1">URL de la Imagen Principal</label>
            <input
              id="image"
              name="image"
              value={formData.image || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="tutorial_video" className="block text-sm font-medium text-gray-400 mb-1">URL del Video Tutorial</label>
            <input
              id="tutorial_video"
              name="tutorial_video"
              value={formData.tutorial_video || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="screenshots" className="block text-sm font-medium text-gray-400 mb-1">Capturas de Pantalla (URLs separadas por coma)</label>
            <textarea
              id="screenshots"
              name="screenshots"
              value={formData.screenshots || ""}
              onChange={handleChange}
              placeholder="url1, url2, url3"
              className="w-full h-24 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">Detalles y Características</h2>
          <div>
            <label htmlFor="pricing" className="block text-sm font-medium text-gray-400 mb-1">Opciones de Precios (separadas por coma)</label>
            <input
              id="pricing"
              name="pricing"
              value={formData.pricing || ""}
              onChange={handleChange}
              placeholder="Free, Freemium, Paid"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-400 mb-1">Rating</label>
            <input
              id="rating"
              type="number"
              step="0.1"
              name="rating"
              value={formData.rating || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="reviews" className="block text-sm font-medium text-gray-400 mb-1">Reseñas (separadas por coma)</label>
            <textarea
              id="reviews"
              name="reviews"
              value={formData.reviews || ""}
              onChange={handleChange}
              placeholder="Reseña 1, Reseña 2"
              className="w-full h-24 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-400 mb-1">Tags (separados por coma)</label>
            <input
              id="tags"
              name="tags"
              value={formData.tags || ""}
              onChange={handleChange}
              placeholder="tag1, tag2, tag3"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="pros" className="block text-sm font-medium text-gray-400 mb-1">Pros (separados por coma)</label>
            <input
              id="pros"
              name="pros"
              value={formData.pros || ""}
              onChange={handleChange}
              placeholder="pro1, pro2"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="cons" className="block text-sm font-medium text-gray-400 mb-1">Contras (separados por coma)</label>
            <input
              id="cons"
              name="cons"
              value={formData.cons || ""}
              onChange={handleChange}
              placeholder="con1, con2"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="release_date" className="block text-sm font-medium text-gray-400 mb-1">Fecha de lanzamiento</label>
            <input
              id="release_date"
              type="date"
              name="release_date"
              value={formData.release_date || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="developer" className="block text-sm font-medium text-gray-400 mb-1">Desarrollador</label>
            <input
              id="developer"
              name="developer"
              value={formData.developer || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">Recursos Adicionales</h2>
          <div>
            <label htmlFor="courses" className="block text-sm font-medium text-gray-400 mb-1">Cursos (separados por coma)</label>
            <input
              id="courses"
              name="courses"
              value={formData.courses || ""}
              onChange={handleChange}
              placeholder="link-curso1, link-curso2"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="youtube_channels" className="block text-sm font-medium text-gray-400 mb-1">Canales de YouTube (separados por coma)</label>
            <input
              id="youtube_channels"
              name="youtube_channels"
              value={formData.youtube_channels || ""}
              onChange={handleChange}
              placeholder="url-canal1, url-canal2"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="creators" className="block text-sm font-medium text-gray-400 mb-1">Creadores (separados por coma)</label>
            <input
              id="creators"
              name="creators"
              value={formData.creators || ""}
              onChange={handleChange}
              placeholder="nombre1, nombre2"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="docs" className="block text-sm font-medium text-gray-400 mb-1">URL de Documentación</label>
            <input
              id="docs"
              name="docs"
              value={formData.docs || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="tutorials" className="block text-sm font-medium text-gray-400 mb-1">Tutoriales (URLs separadas por coma)</label>
            <textarea
              id="tutorials"
              name="tutorials"
              value={formData.tutorials || ""}
              onChange={handleChange}
              placeholder="url-tutorial1, url-tutorial2"
              className="w-full h-24 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">Ecosistema y Conexiones</h2>
          <div>
            <label htmlFor="affiliate_link" className="block text-sm font-medium text-gray-400 mb-1">Enlace de Afiliado</label>
            <input
              id="affiliate_link"
              name="affiliate_link"
              value={formData.affiliate_link || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="deals" className="block text-sm font-medium text-gray-400 mb-1">Ofertas y Descuentos (separados por coma)</label>
            <input
              id="deals"
              name="deals"
              value={formData.deals || ""}
              onChange={handleChange}
              placeholder="oferta1, oferta2"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="platforms" className="block text-sm font-medium text-gray-400 mb-1">Plataformas (separadas por coma)</label>
            <input
              id="platforms"
              name="platforms"
              value={formData.platforms || ""}
              onChange={handleChange}
              placeholder="Web, iOS, Android"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="integrations" className="block text-sm font-medium text-gray-400 mb-1">Integraciones (separadas por coma)</label>
            <input
              id="integrations"
              name="integrations"
              value={formData.integrations || ""}
              onChange={handleChange}
              placeholder="Slack, Google Drive"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="alternatives" className="block text-sm font-medium text-gray-400 mb-1">Alternativas (separadas por coma)</label>
            <input
              id="alternatives"
              name="alternatives"
              value={formData.alternatives || ""}
              onChange={handleChange}
              placeholder="Tool A, Tool B"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-400 mb-1">Requisitos (separados por coma)</label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements || ""}
              onChange={handleChange}
              placeholder="CPU 2Ghz, RAM 4GB"
              className="w-full h-24 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="community_links" className="block text-sm font-medium text-gray-400 mb-1">Enlaces de la Comunidad (separados por coma)</label>
            <textarea
              id="community_links"
              name="community_links"
              value={formData.community_links || ""}
              onChange={handleChange}
              placeholder="url-reddit, url-discord"
              className="w-full h-24 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="faq" className="block text-sm font-medium text-gray-400 mb-1">Preguntas Frecuentes (separadas por coma)</label>
            <textarea
              id="faq"
              name="faq"
              value={formData.faq || ""}
              onChange={handleChange}
              placeholder="¿Qué es...?, ¿Cómo se usa...?"
              className="w-full h-24 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}