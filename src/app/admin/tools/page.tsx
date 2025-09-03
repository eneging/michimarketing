"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // Importar Image de Next.js

// Definición de las interfaces para el tipado
interface Category {
  id: number;
  name: string;
}

interface Tool {
  id: number;
  name: string;
  slug: string;
  category?: Category;
  website: string;
  logo: string;
  rating: number;
}

// Definición de la interfaz de propiedades para el modal de confirmación
interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
}

// Componente del modal de confirmación
const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4">
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <p className="text-lg font-medium mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ToolsAdminPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toolToDeleteId, setToolToDeleteId] = useState<number | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirección con JavaScript estándar
      window.location.href = "/login";
      return;
    }

    fetch(`${API_URL}/api/tools`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            window.location.href = "/login";
            throw new Error("Unauthorized");
          }
          throw new Error("Failed to fetch tools.");
        }
        return res.json();
      })
      .then((data) => {
        setTools(data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching tools:", err);
        setError("Error al cargar las herramientas. Por favor, inténtalo de nuevo.");
      })
      .finally(() => setLoading(false));
  }, [API_URL]);

  // Manejador para abrir el modal
  const handleOpenDeleteModal = (id: number) => {
    setToolToDeleteId(id);
    setIsModalOpen(true);
  };

  // Manejador para cerrar el modal
  const handleCloseDeleteModal = () => {
    setIsModalOpen(false);
    setToolToDeleteId(null);
  };

  // Lógica de eliminación que se ejecuta tras la confirmación
  const confirmDelete = async () => {
    if (toolToDeleteId === null) return;

    handleCloseDeleteModal(); // Cierra el modal antes de la eliminación
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/tools/${toolToDeleteId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to delete tool.");
      }

      setTools((prev) => prev.filter((t) => t.id !== toolToDeleteId));
      setSuccessMessage("Herramienta eliminada correctamente.");
    } catch (err) {
      console.error("Error deleting tool:", err);
      setError("Error al eliminar la herramienta. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
          Gestión de Herramientas
        </h1>
        {/* Usamos una etiqueta 'a' en lugar de Link para compatibilidad */}
        <a
          href="/admin/tools/create"
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-emerald-700 transition-colors duration-300"
        >
          + Nuevo Tool
        </a>
      </div>

      {loading && <p className="text-center text-lg text-emerald-400">Cargando tools...</p>}
      
      {successMessage && (
        <div className="bg-green-500/20 text-green-300 p-4 rounded-lg mb-6 border border-green-500 font-medium text-center">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-6 border border-red-500 font-medium text-center">
          {error}
        </div>
      )}

      {!loading && tools.length > 0 && (
        <>
          {/* Vista de tabla para pantallas grandes */}
          <div className="hidden md:block overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
            <table className="min-w-full text-left text-sm text-gray-300 rounded-xl">
              <thead className="bg-gray-700 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Logo</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Website</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-4 py-3">
                      {tool.logo ? (
                        <div className="w-10 h-10 relative">
                          <Image
                            src={tool.logo}
                            alt={tool.name}
                            fill
                            className="rounded-full object-cover"
                            sizes="40px"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-gray-400">
                          {tool.name.charAt(0)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{tool.name}</td>
                    <td className="px-4 py-3 text-gray-400">{tool.category?.name || "—"}</td>
                    <td className="px-4 py-3">
                      <a
                        href={tool.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline"
                      >
                        {tool.website ? new URL(tool.website).hostname : '—'}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {tool.rating ? (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.961a1 1 0 00.95.691h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.54 1.118l-3.37-2.455a1 1 0 00-1.176 0l-3.37 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.094 9.389c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.691l1.286-3.961z" />
                          </svg>
                          {tool.rating.toFixed(1)}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="px-4 py-3 space-x-2 text-right">
                      {/* Usamos una etiqueta 'a' en lugar de Link para compatibilidad */}
                      <a
                        href={`/admin/tools/${tool.id}/edit`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors"
                      >
                        Editar
                      </a>
                      <button
                        onClick={() => handleOpenDeleteModal(tool.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vista de tarjetas para pantallas móviles */}
          <div className="md:hidden space-y-4">
            {tools.map((tool) => (
              <div key={tool.id} className="bg-gray-800 rounded-xl shadow-lg p-5 border border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  {tool.logo ? (
                    <div className="w-12 h-12 relative">
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-gray-400 text-2xl font-bold">
                      {tool.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                </div>
                
                <div className="space-y-2 text-gray-400">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Categoría:</span>
                    <span>{tool.category?.name || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Website:</span>
                    <a
                      href={tool.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline truncate max-w-[150px]"
                    >
                      {tool.website ? new URL(tool.website).hostname : '—'}
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Rating:</span>
                    {tool.rating ? (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.961a1 1 0 00.95.691h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.364 1.118l1.287 3.962c.3.921-.755 1.688-1.54 1.118l-3.37-2.455a1 1 0 00-1.176 0l-3.37 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.962a1 1 0 00-.364-1.118L2.094 9.389c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.691l1.286-3.961z" />
                        </svg>
                        <span className="text-white">{tool.rating.toFixed(1)}</span>
                      </div>
                    ) : (
                      '—'
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end gap-2 border-t border-gray-700 pt-4">
                  {/* Usamos una etiqueta 'a' en lugar de Link para compatibilidad */}
                  <a
                    href={`/admin/tools/${tool.id}/edit`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    Editar
                  </a>
                  <button
                    onClick={() => handleOpenDeleteModal(tool.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tools.length === 0 && !loading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-400">No hay tools registrados.</p>
          <p className="mt-2 text-gray-500">Haz clic en + Nuevo Tool para empezar.</p>
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        message="¿Estás seguro de que quieres eliminar esta herramienta? Esta acción no se puede deshacer."
      />
    </div>
  );
}