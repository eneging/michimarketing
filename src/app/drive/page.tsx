"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function DriveFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/drive/files`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}), // 👈 solo si existe token
            },
            credentials: "include", // 👈 importante para invitados (cookies de sesión)
          }
        );

        if (!res.ok) throw new Error("No se pudieron cargar los archivos");

        const data = await res.json();
        setFiles(data.files || []);
      } catch (error) {
        console.error("Error al cargar archivos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

const handleDownload = async (fileId: number) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/drive/files/${fileId}/download`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
         credentials: "include",
      }
    );

    console.log("🔎 Status:", res.status, "URL:", res.url);

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "No se pudo descargar el archivo");
        return;
      }
      window.open(data.download_url, "_blank");
    } else {
      const text = await res.text();
      console.error("⚠️ HTML recibido:", text.slice(0, 200));
      alert("El servidor devolvió HTML en vez de JSON. Revisa logs de Laravel.");
    }
  } catch (error) {
    console.error("Error en la descarga:", error);
  }
};


  if (loading) return <p>Cargando archivos...</p>;

  return (
    <div>
      <h2>📂 Archivos disponibles</h2>
      {files.length === 0 ? (
        <p>No se encontraron archivos</p>
      ) : (
        <ul className="grid grid-cols-3 gap-5">
          {files.map((file) => (
            <li
              key={file.id}
              className="rounded-xl p-4 border border-gray-200 h-full grid gap-5"
            >
              <div>{file.name}</div>
            <Image

            src={`https://drive.google.com/uc?export=view&id=${file.file_path}`}
             alt="Descripción de la imagen"
        width={500}
        height={300}
            >
            </Image>
              <p className="text-sm text-gray-500">{file.description}</p>

              <button
              type="button"
                onClick={() => handleDownload(file.id)}
                className="bg-blue-400 p-2 rounded-xl text-center text-white"
              >
                Descargar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
