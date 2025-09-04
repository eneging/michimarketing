// app/admin/tools/create/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ArrayInput from "../../../components/ArrayInput";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

interface ToolFormData {
  name: string;
  slug: string;
  category_id: string;
  description: string;
  website: string;
  logo: string;
  image: string;
  tutorial_video: string;
  screenshots: string[];
  pricing: string[];
  rating: string;
  reviews: string[];
  tags: string[];
  pros: string[];
  cons: string[];
  release_date: string;
  developer: string;
  courses: string[];
  youtube_channels: string[];
  creators: string[];
  docs: string;
  tutorials: string[];
  affiliate_link: string;
  deals: string[];
  platforms: string[];
  integrations: string[];
  alternatives: string[];
  requirements: string[];
  community_links: string[];
  faq: string[];
}

export default function CreateToolPage() {
  const router = useRouter();
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const [formData, setFormData] = useState<ToolFormData>({
    name: "",
    slug: "",
    category_id: "",
    description: "",
    website: "",
    logo: "",
    image: "",
    tutorial_video: "",
    screenshots: [],
    pricing: [],
    rating: "",
    reviews: [],
    tags: [],
    pros: [],
    cons: [],
    release_date: "",
    developer: "",
    courses: [],
    youtube_channels: [],
    creators: [],
    docs: "",
    tutorials: [],
    affiliate_link: "",
    deals: [],
    platforms: [],
    integrations: [],
    alternatives: [],
    requirements: [],
    community_links: [],
    faq: [],
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // 1. Obtener el token del localStorage y guardarlo en el estado
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(userToken);

    // Redirigir si no hay token
    if (!userToken) {
      router.push("/login");
      return;
    }

    // 2. Usar el token para la llamada a la API
    fetch(`${API_URL}/api/categories`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized. Please log in again.");
        }
        if (!res.ok) {
          throw new Error("Failed to fetch categories.");
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data || []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [API_URL, router]);

  function generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev: ToolFormData) => {
      const newFormData = { ...prev, [name]: value };
      if (name === "name") {
        newFormData.slug = generateSlug(value);
      }
      return newFormData;
    });
  }

  const handleArrayChange = (name: string, value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name as keyof ToolFormData]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    // 3. Verificar la existencia del token antes de enviar la solicitud
    if (!token) {
      setError("No authentication token found. Please log in.");
      setIsSubmitting(false);
      return;
    }

    const ratingValue = formData.rating ? Number(formData.rating) : null;
    if (ratingValue !== null && (ratingValue < 0 || ratingValue > 5)) {
        setError("El rating debe ser un valor entre 0 y 5.");
        setIsSubmitting(false);
        return;
    }

    const normalizeString = (str: string): string | null =>
      str && str.length > 0 ? str : null;

    const payload = {
      ...formData,
      category_id: formData.category_id ? Number(formData.category_id) : null,
      rating: ratingValue,
      logo: normalizeString(formData.logo),
      image: normalizeString(formData.image),
      tutorial_video: normalizeString(formData.tutorial_video),
      release_date: normalizeString(formData.release_date),
      developer: normalizeString(formData.developer),
      docs: normalizeString(formData.docs),
      affiliate_link: normalizeString(formData.affiliate_link),
    };

    console.log("Payload a enviar:", payload);

    try {
      // 4. Incluir el token en los headers de la solicitud POST
      const res = await fetch(`${API_URL}/api/tools`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ⬅️ Aquí se añade el token
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Detalles del error del servidor:", errorData);
        throw new Error(errorData.message || "Error al crear la herramienta.");
      }

      await res.json();
      setSuccessMessage("Herramienta creada exitosamente. Redirigiendo...");
      setTimeout(() => router.push("/admin/tools"), 2000);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-center py-10">Cargando...</p>;
  }

    const handleLogoUpload = (result: any) => {
    if (result.event === "success") {
      const url = result.info.secure_url;
      setFormData((prev) => ({
        ...prev,
        logo: url,
      }));
    }
  };


  const handleImageUpload = (result: any) => {
  if (result.event === "success") {
    const url = result.info.secure_url;
    setFormData((prev) => ({
      ...prev,
      image: url,
    }));
  }
};

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6 text-white text-center md:text-left">Crear Herramienta</h1>

      <form onSubmit={handleSubmit} className="space-y-8 text-white bg-gray-900 p-8 rounded-xl shadow-lg">
        {successMessage && (
          <div className="bg-emerald-500/20 text-emerald-300 p-4 rounded-lg border border-emerald-500 font-medium text-center">
            {successMessage}
          </div>
        )}
        {error && (
            <div className="bg-red-500/20 text-red-300 p-4 rounded-lg border border-red-500 font-medium text-center">
                {error}
            </div>
        )}

        {/* ... (el resto de tu formulario) */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Información Básica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
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
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full h-32 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* 2. Sección de Medios y Sitios */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Medios y Enlaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-400 mb-1">URL Sitio Web</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>



 <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Logo de la Herramienta
              </label>
              <CldUploadWidget
              uploadPreset="tools_unsigned"
                onSuccess={handleLogoUpload}
                
              >
                {({ open }) => {
                  return (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full py-2 px-4 rounded-lg bg-green-700 text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                    >
                      Subir Logo
                    </button>
                  );
                }}
              </CldUploadWidget>
              {/* 🆕 Muestra el logo subido si existe */}
              {formData.logo && (
                <div className="mt-4">
                  <Image
                    src={formData.logo}
                    alt="Logo preview"
                    width={100}
                    height={100}
                    className="rounded-full mx-auto"
                  />
                </div>
              )}
            </div>



<div>
  <label className="block text-sm font-medium text-gray-400 mb-1">
    Imagen Principal
  </label>
  <CldUploadWidget
    uploadPreset="tools_unsigned"
    onSuccess={handleImageUpload}
  >
    {({ open }) => {
      return (
        <button
          type="button"
          onClick={() => open()}
          className="w-full py-2 px-4 rounded-lg bg-green-700 text-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
        >
          Subir Imagen
        </button>
      );
    }}
  </CldUploadWidget>
  {/* Opcional: Muestra la imagen principal si ya se ha subido */}
  {formData.image && (
    <div className="mt-4">
      <Image
        src={formData.image}
        alt="Main image preview"
        width={300}
        height={200}
        className="rounded-lg object-cover"
      />
    </div>
  )}
</div>




            <div>
              <label htmlFor="tutorial_video" className="block text-sm font-medium text-gray-400 mb-1">URL Video Tutorial</label>
              <input
                type="text"
                id="tutorial_video"
                name="tutorial_video"
                value={formData.tutorial_video || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="screenshots"
                label="Capturas de Pantalla"
                value={formData.screenshots}
                onChange={handleArrayChange}
                placeholder="URL de la captura"
              />
            </div>
          </div>
        </div>

        <hr className="border-gray-700" />

        {/* 3. Sección de Detalles y Ecosistema */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Detalles y Ecosistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-400 mb-1">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating || ""}
                onChange={handleChange}
                step="0.1"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="release_date" className="block text-sm font-medium text-gray-400 mb-1">Fecha de Lanzamiento</label>
              <input
                type="date"
                id="release_date"
                name="release_date"
                value={formData.release_date || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="developer" className="block text-sm font-medium text-gray-400 mb-1">Desarrollador</label>
              <input
                type="text"
                id="developer"
                name="developer"
                value={formData.developer || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="affiliate_link" className="block text-sm font-medium text-gray-400 mb-1">Enlace de Afiliado</label>
              <input
                type="text"
                id="affiliate_link"
                name="affiliate_link"
                value={formData.affiliate_link || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="tags"
                label="Tags"
                value={formData.tags}
                onChange={handleArrayChange}
                placeholder="marketing, seo, ia"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="pricing"
                label="Precios"
                value={formData.pricing}
                onChange={handleArrayChange}
                placeholder="Gratis, Premium ($10/mes)"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="reviews"
                label="Reviews"
                value={formData.reviews}
                onChange={handleArrayChange}
                placeholder="“Increíble herramienta”, “Muy útil”"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="pros"
                label="Pros"
                value={formData.pros}
                onChange={handleArrayChange}
                placeholder="Fácil de usar, Rápido"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="cons"
                label="Contras"
                value={formData.cons}
                onChange={handleArrayChange}
                placeholder="Versión gratuita limitada, Poca documentación"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="docs" className="block text-sm font-medium text-gray-400 mb-1">URL Documentación</label>
              <input
                type="text"
                id="docs"
                name="docs"
                value={formData.docs || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="tutorials"
                label="Tutoriales"
                value={formData.tutorials}
                onChange={handleArrayChange}
                placeholder="URL de tutoriales"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="courses"
                label="Cursos"
                value={formData.courses}
                onChange={handleArrayChange}
                placeholder="Nombre del curso"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="youtube_channels"
                label="Canales de YouTube"
                value={formData.youtube_channels}
                onChange={handleArrayChange}
                placeholder="URL del canal"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="creators"
                label="Creadores"
                value={formData.creators}
                onChange={handleArrayChange}
                placeholder="Nombre del creador"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="community_links"
                label="Enlaces de Comunidad"
                value={formData.community_links}
                onChange={handleArrayChange}
                placeholder="URL de Facebook, Discord, etc."
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="deals"
                label="Ofertas"
                value={formData.deals}
                onChange={handleArrayChange}
                placeholder="10% de descuento"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="platforms"
                label="Plataformas"
                value={formData.platforms}
                onChange={handleArrayChange}
                placeholder="Web, iOS, Android"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="integrations"
                label="Integraciones"
                value={formData.integrations}
                onChange={handleArrayChange}
                placeholder="Slack, Zapier"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="alternatives"
                label="Alternativas"
                value={formData.alternatives}
                onChange={handleArrayChange}
                placeholder="Competidor1, Competidor2"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="requirements"
                label="Requisitos"
                value={formData.requirements}
                onChange={handleArrayChange}
                placeholder="Cuenta de correo, Internet"
              />
            </div>
            <div className="md:col-span-2">
              <ArrayInput
                name="faq"
                label="FAQ"
                value={formData.faq}
                onChange={handleArrayChange}
                placeholder="Pregunta,Respuesta"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isSubmitting
              ? "bg-emerald-800 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {isSubmitting ? "Creando..." : "Crear herramienta"}
        </button>
      </form>
    </div>
  );
}