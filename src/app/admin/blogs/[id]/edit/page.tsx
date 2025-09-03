"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

// 🔹 Tipamos los parámetros de la ruta
type BlogParams = {
  id: string;
};

// 🔹 Interfaz para los datos del blog
interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  author_image: string;
  author_role: string;
  featured_image: string;
  read_time: number;
  tags: string[];
  category: string;
  related_posts: string[];
}

export default function EditBlogPage() {
  const { id } = useParams<BlogParams>();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    date: "",
    author: "",
    author_image: "",
    author_role: "",
    featured_image: "",
    read_time: 5,
    tags: [],
    category: "",
    related_posts: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Usar useEffect para el acceso a localStorage (solo en cliente)
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔹 Cargar blog existente
  useEffect(() => {
    async function fetchBlog() {
      if (!id || !token) return;
      
      try {
        const res = await fetch(`${API_URL}/api/blog-posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!res.ok) throw new Error("Error al cargar blog");
        
        const json = await res.json();
        const blog = json.data;
        
        setFormData({
          ...blog,
          tags: blog.tags || [],
          related_posts: blog.related_posts || [],
        });
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el blog");
      }
    }
    
    if (id && token) fetchBlog();
  }, [id, token, API_URL]);

  // 🔹 Ajustar altura del textarea automáticamente
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.content]);

  // 🔹 Generar slug
  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      if (name === "title") newFormData.slug = generateSlug(value);
      return newFormData;
    });
  }

  function handleTags(e: React.ChangeEvent<HTMLInputElement>) {
    const tags = e.target.value.split(",").map((t) => t.trim()).filter(t => t !== "");
    setFormData((prev) => ({ ...prev, tags }));
  }

  function handleRelated(e: React.ChangeEvent<HTMLInputElement>) {
    const related_posts = e.target.value.split(",").map((t) => t.trim()).filter(t => t !== "");
    setFormData((prev) => ({ ...prev, related_posts }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!token) {
      setError("No se encontró token de autenticación");
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/blog-posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al actualizar blog");
      }

      router.push("/admin/blogs");
    } catch (error: any) {
      console.error(error);
      setError(`No se pudo actualizar el blog. Razón: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Editar Blog</h1>

      {error && (
        <div className="bg-red-900 text-red-200 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-900 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg"
      >
        {/* === Inputs de edición === */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Título</label>
            <input
              id="title"
              name="title"
              placeholder="Título"
              value={formData.title || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="slug" className="block text-sm font-medium mb-1">Slug (URL)</label>
            <input
              id="slug"
              name="slug"
              placeholder="Slug (url)"
              value={formData.slug || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium mb-1">Extracto</label>
            <textarea
              id="excerpt"
              name="excerpt"
              placeholder="Extracto"
              value={formData.excerpt || ""}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">Fecha</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">Autor</label>
            <input
              id="author"
              name="author"
              placeholder="Autor"
              value={formData.author || ""}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="author_image" className="block text-sm font-medium mb-1">URL foto del autor</label>
            <input
              id="author_image"
              name="author_image"
              placeholder="URL foto del autor"
              value={formData.author_image || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="author_role" className="block text-sm font-medium mb-1">Rol del autor</label>
            <input
              id="author_role"
              name="author_role"
              placeholder="Rol del autor"
              value={formData.author_role || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="featured_image" className="block text-sm font-medium mb-1">Imagen destacada (URL)</label>
            <input
              id="featured_image"
              name="featured_image"
              placeholder="Imagen destacada (URL)"
              value={formData.featured_image || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="read_time" className="block text-sm font-medium mb-1">Tiempo de lectura (min)</label>
            <input
              id="read_time"
              name="read_time"
              type="number"
              placeholder="Tiempo de lectura (min)"
              value={formData.read_time || ""}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">Categoría</label>
            <input
              id="category"
              name="category"
              placeholder="Categoría"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (separados por coma)</label>
            <input
              id="tags"
              placeholder="Tags (separados por coma)"
              value={formData.tags.join(", ")}
              onChange={handleTags}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="related_posts" className="block text-sm font-medium mb-1">Related posts (slugs separados por coma)</label>
            <input
              id="related_posts"
              placeholder="Related posts (slugs separados por coma)"
              value={formData.related_posts.join(", ")}
              onChange={handleRelated}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contenido y previsualización en pantallas grandes */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">Contenido</label>
            <textarea
              ref={textareaRef}
              id="content"
              name="content"
              placeholder="Contenido en HTML o texto"
              value={formData.content || ""}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Previsualización</h2>
            <div
              className="prose prose-invert max-w-none prose-sm md:prose-base"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="lg:col-span-2 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white rounded-lg transition font-medium"
        >
          {loading ? "Actualizando..." : "Actualizar Blog"}
        </button>
      </form>
    </div>
  );
}