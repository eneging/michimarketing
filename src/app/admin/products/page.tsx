"use client";

import { useState } from "react";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { fetchWithAuth } from "@/services/authService";

export const dynamic = 'force-dynamic';

function AdminProductsContent() {
  const { token, isAuthenticated } = useAuth(); // ✅ usar el contexto
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [isDownloadable, setIsDownloadable] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isAuthenticated || !token) {
      alert("⚠️ Debes iniciar sesión como administrador.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("product_category_id", category);
      formData.append("is_offer", isOffer ? "1" : "0");
      if (isOffer && offerPrice) {
        formData.append("offer_price", offerPrice);
      }
      formData.append("is_downloadable", isDownloadable ? "1" : "0");

      if (image) formData.append("image", image);
      if (isDownloadable && file) formData.append("file", file);

      // ✅ usar fetchWithAuth que ya añade Authorization
      const res = await fetchWithAuth("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "❌ Error al crear producto");
        return;
      }

      alert("✅ Producto creado con éxito");
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setIsOffer(false);
      setOfferPrice("");
      setIsDownloadable(false);
      setImage(null);
      setFile(null);
    } catch (error) {
      console.error("Error al crear producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📦 Crear Producto</h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 border p-6 rounded-xl shadow"
      >
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="ID Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isOffer}
            onChange={(e) => setIsOffer(e.target.checked)}
          />
          ¿Es oferta?
        </label>

        {isOffer && (
          <input
            type="number"
            placeholder="Precio de oferta"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            className="border p-2 rounded"
          />
        )}

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDownloadable}
            onChange={(e) => setIsDownloadable(e.target.checked)}
          />
          ¿Es descargable?
        </label>

        <div>
          <label className="block mb-1">Imagen del producto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        {isDownloadable && (
          <div>
            <label className="block mb-1">Archivo descargable</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Subiendo..." : "Crear producto"}
        </button>
      </form>
    </div>
  );
}

export default function AdminProducts() {
  return (
    <AuthProvider>
      <AdminProductsContent />
    </AuthProvider>
  );
}
