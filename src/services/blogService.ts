// src/services/blogService.ts
import { getToken } from "./authService";

const API_URL = "http://127.0.0.1:8000/api";

export async function deleteBlog(id: number) {
  const token = getToken();
  const res = await fetch(`${API_URL}/blog-posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Error eliminando blog");
  return await res.json();
}

export async function updateBlog(id: number, data: any) {
  const token = getToken();
  const res = await fetch(`${API_URL}/blog-posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error actualizando blog");
  return await res.json();
}
