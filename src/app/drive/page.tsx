"use client";
import { useEffect, useState } from "react";

export default function DriveFiles() {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFiles() {
      const folderId = "106B230UsI1wB_mGGgQjsLUtsIsTpmQHI"; // tu carpeta
      const apiKey = "AIzaSyDYFQy8JxUXRJLI8SRPo8KCu--NMEiJw6I"; // tu API Key

      try {
        const res = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`
        );
        const data = await res.json();
        console.log("Archivos desde la API:", data); // 🔍 Debug
        setFiles(data.files || []);
      } catch (error) {
        console.error("Error al cargar archivos:", error);
      }
    }
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>📂 Archivos disponibles</h2>
      {files.length === 0 ? (
        <p>No se encontraron archivos en la carpeta</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id}>
              {file.name}{" "}
              <a
                href={`https://drive.google.com/uc?export=download&id=${file.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
