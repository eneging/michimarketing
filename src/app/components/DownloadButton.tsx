"use client";

import { useState } from "react";
import { requestDownload } from "../lib/api";

interface DownloadButtonProps {
  productId: number;
  token: string; // token de Laravel Sanctum
}

export default function DownloadButton({ productId, token }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const data = await requestDownload(productId, token);

      if (data.success && data.download_url) {
        // Redirigir al enlace firmado
        window.location.href = data.download_url;
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? "Preparando..." : "Descargar"}
    </button>
  );
}
