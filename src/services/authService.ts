// src/services/authService.ts
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Opciones comunes para las cookies (secure en prod).
 */
function cookieOptions(days = 7) {
  return {
    expires: days,
    sameSite: "Strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

/**
 * LOGIN
 */
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // leer body aunque sea error para pasar mensaje al front
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message || "Credenciales inválidas");
  }

  return body;
}

/**
 * REGISTER
 */
export async function register(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  const res = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, password_confirmation }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    // backend suele devolver errores de validación en body.errors
    throw new Error(body?.message || "Error en el registro");
  }

  return body;
}

/**
 * Guardar auth local (localStorage) + cookies (token y role para middleware).
 * @param token token de API
 * @param user objeto user retornado por backend (debe incluir role)
 */
export function saveAuth(token: string, user: any, rememberDays = 7) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  Cookies.set("token", token, cookieOptions(rememberDays));
  if (user?.role) {
    Cookies.set("role", user.role, cookieOptions(rememberDays));
  }
}

/**
 * Logout local (y opcionalmente intentar cerrar sesión en backend).
 */
export async function logout() {
  const token = getToken();
  // intentamos avisar al backend (no bloquear si falla)
  try {
    if (token) {
      await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }
  } catch  {
    // ignorar error
  }

  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  Cookies.remove("token");
  Cookies.remove("role");
}

/**
 * Obtener token (localStorage preferido, si no cookie).
 */
export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token") || Cookies.get("token") || null;
  }
  return Cookies.get("token") || null;
}

/**
 * Obtener usuario desde localStorage (cliente).
 */
export function getUser(): any | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}

/**
 * Obtener role (usa localUser si existe, si no cookie)
 */
export function getRole(): string | null {
  const user = getUser();
  if (user?.role) return user.role;
  return Cookies.get("role") || null;
}

/**
 * Wrapper para fetch que inyecta Authorization y maneja 401.
 * - `path` puede ser ruta relativa ("/api/..") o URL absoluta.
 */
export async function fetchWithAuth(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = getToken();
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;
  const headers = new Headers(init.headers || {});

  if (!headers.get("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, { ...init, headers });

  // opcional: si 401, limpiamos auth local para forzar login
  if (res.status === 401) {
    await logout();
    throw new Error("No autorizado. Por favor inicia sesión de nuevo.");
  }

  return res;
}
