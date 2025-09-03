"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteBlog } from "@/services/blogService";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  featured_image?: string;
  category?: string;
  author: string;
  author_image?: string;
  author_role?: string;
  date: string;
  tags?: string[];
  read_time?: number;
}

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL 

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${API_URL}/api/blog-posts?per_page=100`);
        const json = await res.json();
        setBlogs(json.data.data || []); // 👈 tu API tiene data.data
      } catch (error) {
        console.error("Error cargando blogs", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [API_URL]);

  if (loading) {
    return <p className="text-center text-gray-400 py-10">Cargando blogs...</p>;
  }



  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Panel de Blogs</h1>
        <Link
          href="/admin/blogs/create"
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl shadow hover:bg-emerald-700 transition"
        >
          ➕ Crear nuevo
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-400">No hay blogs aún.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {post.featured_image && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.featured_image.startsWith("http") ? post.featured_image : `${API_URL}${post.featured_image}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold line-clamp-2">{post.title}</h2>
                <p className="text-sm text-gray-400 mt-2 line-clamp-3">{post.excerpt}</p>

                <div className="mt-3 text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString("es-ES")}
                  {" · "}
                  {post.read_time || 5} min
                </div>

                {/* Botones Admin */}
                <div className="mt-4 flex justify-between items-center gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="px-3 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                  >
                    👀 Ver
                  </Link>
                  <Link
                   href={`/admin/blogs/${post.id}/edit`}
  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition"

                 
                  >
                    ✏️ Editar
                  </Link>
                  <button
                    onClick={async () => {
    if (confirm("¿Seguro que quieres eliminar este blog?")) {
      try {
        await deleteBlog(post.id);
        setBlogs((prev) => prev.filter((b) => b.id !== post.id));
      } catch (error) {
        console.error(error); // 👈 esto ayuda a debuggear
  alert("Error al eliminar el blog")
      }
    }
  }}
                    className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
