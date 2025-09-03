// src/services/authService.ts
import Cookies from "js-cookie";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

// 🔐 LOGIN
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales inválidas");
  return await res.json();
}

// 🔐 REGISTER
export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });

  if (!res.ok) throw new Error("Error en el registro");
  return await res.json();
}

// ✅ Guardar autenticación
export function saveAuth(token: string, user: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  Cookies.set("token", token, { expires: 7, sameSite: "Strict" });
}

// 🚪 Cerrar sesión
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  Cookies.remove("token");
}

// 🎫 Obtener token
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || Cookies.get("token") || null;
  }
  return Cookies.get("token") || null;
}

// 👤 Obtener usuario
export function getUser() {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}
