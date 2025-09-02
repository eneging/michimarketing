"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function CreateBlogPage() {
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
  const [token, setToken] = useState<string | null>(null);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 🔹 Obtener token solo en el cliente
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // 🔹 Ajustar altura del textarea automáticamente
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.content]);

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function isValidUrl(string: string): boolean {
    try {
      new URL(string);
      return true;
    } catch (e) {
       console.error("URL inválida:", e);
      return false;
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev, [name]: value };
      if (name === "title") {
        newFormData.slug = generateSlug(value);
      }
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

  // Función para insertar contenido en el textarea
  function handleInsert(content: string, wrapSelection: boolean = false) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let newText = "";
    if (wrapSelection && selectedText) {
      newText = 
        textarea.value.substring(0, start) +
        content.replace("SELECTED_TEXT", selectedText) +
        textarea.value.substring(end);
    } else {
      newText = 
        textarea.value.substring(0, start) +
        content +
        textarea.value.substring(end);
    }

    setFormData((prev) => ({ ...prev, content: newText }));
    
    // Enfocar y restaurar posición del cursor después de la actualización
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const newPosition = start + content.length;
        textareaRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  }

  // Función para insertar código con resaltado de sintaxis
  function insertCode(language: string = "") {
    const codeBlock = `\n\`\`\`${language}\n// Escribe tu código aquí\n\`\`\`\n`;
    handleInsert(codeBlock);
  }

  // Función para insertar una tabla
  function insertTable() {
    const table = `
<table>
  <thead>
    <tr>
      <th>Encabezado 1</th>
      <th>Encabezado 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Celda 1</td>
      <td>Celda 2</td>
    </tr>
    <tr>
      <td>Celda 3</td>
      <td>Celda 4</td>
    </tr>
  </tbody>
</table>
`;
    handleInsert(table);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!token) {
      setError("No se encontró token de autenticación");
      return;
    }
    
    setLoading(true);
    setError(null);

    const imageUrls = [formData.featured_image, formData.author_image];
    for (const url of imageUrls) {
      if (url && !isValidUrl(url)) {
        setError(`La URL de la imagen "${url}" no es válida. Por favor, revisa el formato.`);
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch(`${API_URL}/api/blog-posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear blog");
      }

      router.push("/admin/blogs");
    } catch (error: any) {
      console.error(error);
      setError(`No se pudo crear el blog. Razón: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Crear nuevo Blog</h1>

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
              value={formData.title}
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
              value={formData.slug}
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
              value={formData.excerpt}
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
              value={formData.date}
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
              value={formData.author}
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
              value={formData.author_image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="author_role" className="block text-sm font-medium mb-1">Rol del autor</label>
            <input
              id="author_role"
              name="author_role"
              placeholder="Rol del autor"
              value={formData.author_role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="featured_image" className="block text-sm font-medium mb-1">Imagen destacada (URL)</label>
            <input
              id="featured_image"
              name="featured_image"
              placeholder="Imagen destacada (URL)"
              value={formData.featured_image}
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
              value={formData.read_time}
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
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags (separados por coma)</label>
            <input
              id="tags"
              placeholder="Tags (separados por coma)"
              onChange={handleTags}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="related_posts" className="block text-sm font-medium mb-1">Related posts (slugs separados por coma)</label>
            <input
              id="related_posts"
              placeholder="Related posts (slugs separados por coma)"
              onChange={handleRelated}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contenido y previsualización en pantallas grandes */}
        <div className="lg:col-span-2 space-y-4">
          {/* BARRA DE HERRAMIENTAS MEJORADA */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-300">Herramientas de formato</h3>
              <button 
                type="button" 
                onClick={() => setShowMoreTools(!showMoreTools)}
                className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
              >
                {showMoreTools ? 'Menos' : 'Más'} herramientas
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {/* Formato de texto básico */}
              <button
                type="button"
                onClick={() => handleInsert("**SELECTED_TEXT**", true)}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Negrita"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                onClick={() => handleInsert("*SELECTED_TEXT*", true)}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Cursiva"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onClick={() => handleInsert("~~SELECTED_TEXT~~", true)}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Tachado"
              >
                <s>S</s>
              </button>
              
              {/* Encabezados */}
              <button
                type="button"
                onClick={() => handleInsert("\n# SELECTED_TEXT\n", true)}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Encabezado 1"
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => handleInsert("\n## SELECTED_TEXT\n", true)}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Encabezado 2"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() => handleInsert("\n### SELECTED_TEXT\n", true)}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Encabezado 3"
              >
                H3
              </button>
              
              {/* Listas */}
              <button
                type="button"
                onClick={() => handleInsert("\n- Elemento de lista\n- Elemento de lista\n")}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Lista no ordenada"
              >
                <span>•</span>
              </button>
              <button
                type="button"
                onClick={() => handleInsert("\n1. Elemento de lista\n2. Elemento de lista\n")}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Lista ordenada"
              >
                <span>1.</span>
              </button>
              
              {/* Enlace e imagen */}
              <button
                type="button"
                onClick={() => handleInsert("[Texto del enlace](https://ejemplo.com)")}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Insertar enlace"
              >
                🔗
              </button>
              <button
                type="button"
                onClick={() => handleInsert("![Texto alternativo](https://ejemplo.com/imagen.jpg)")}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Insertar imagen"
              >
                🖼️
              </button>
              
              {/* Cita y código */}
              <button
                type="button"
                onClick={() => handleInsert("\n> Cita de texto\n")}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Cita"
              >
                ❝
              </button>
              <button
                type="button"
                onClick={() => insertCode()}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Bloque de código"
              >
                {"</>"}
              </button>
              
              {/* Línea horizontal */}
              <button
                type="button"
                onClick={() => handleInsert("\n---\n")}
                className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                title="Línea horizontal"
              >
                ―
              </button>
            </div>
            
            {/* Herramientas adicionales */}
            {showMoreTools && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => insertCode("javascript")}
                    className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    title="Código JavaScript"
                  >
                    JS
                  </button>
                  <button
                    type="button"
                    onClick={() => insertCode("html")}
                    className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    title="Código HTML"
                  >
                    HTML
                  </button>
                  <button
                    type="button"
                    onClick={() => insertCode("css")}
                    className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    title="Código CSS"
                  >
                    CSS
                  </button>
                  <button
                    type="button"
                    onClick={() => insertCode("python")}
                    className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    title="Código Python"
                  >
                    Py
                  </button>
                  <button
                    type="button"
                    onClick={insertTable}
                    className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    title="Insertar tabla"
                  >
                    Table
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsert('| Columna 1 | Columna 2 |\n|-----------|-----------|\n| Celda 1   | Celda 2   |\n')}
                    className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    title="Tabla Markdown"
                  >
                    MD Table
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsert(':::info\nInformación importante\n:::')}
                    className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    title="Panel de información"
                  >
                    Info
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsert(':::warning\nAdvertencia\n:::')}
                    className="px-3 py-1.5 text-sm bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    title="Panel de advertencia"
                  >
                    ⚠️
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">Contenido (soporta Markdown)</label>
            <textarea
              ref={textareaRef}
              id="content"
              name="content"
              placeholder="Escribe tu contenido aquí. Puedes usar Markdown para formatear el texto."
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            />
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Previsualización</h2>
            <div
              className="prose prose-invert max-w-none prose-sm md:prose-base"
              dangerouslySetInnerHTML={{ __html: formData.content || "<p class='text-gray-500'>El contenido aparecerá aquí...</p>" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="lg:col-span-2 w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white rounded-lg transition font-medium"
        >
          {loading ? "Creando..." : "Crear Blog"}
        </button>
      </form>
    </div>
  );
}