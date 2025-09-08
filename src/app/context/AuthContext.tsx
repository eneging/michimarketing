"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getToken,
  getUser,
  login as loginService,
  logout as logoutService,
  saveAuth,
  fetchWithAuth,
} from "@/services/authService";

interface User {
  id: number;
  name: string;
  email: string;
  role: "free" | "registered" | "premium" | "admin";
  downloads_today?: number;
  last_download_at?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  isFree: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  downloadProduct: (productId: number) => Promise<string | null>; // retorna URL si todo ok
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = getToken();
      const storedUser = getUser();
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);
    if (data.token && data.user) {
      saveAuth(data.token, data.user);
      setToken(data.token);
      setUser(data.user);
    }
  };

  const logout = () => {
    logoutService();
    setToken(null);
    setUser(null);
  };

  // 🔄 Refrescar datos de usuario desde backend
  const refreshUser = async () => {
    try {
      const res = await fetchWithAuth("/api/me"); // debes crear este endpoint en Laravel
      if (res.ok) {
        const data = await res.json();
        saveAuth(token!, data.user);
        setUser(data.user);
      }
    } catch (e) {
      console.error("Error al refrescar usuario", e);
    }
  };

  // ⬇️ Descargar producto (y actualizar contador en el front)
  const downloadProduct = async (productId: number): Promise<string | null> => {
    try {
      const res = await fetchWithAuth(`/api/products/${productId}/download`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "No se pudo descargar");
      }

      // actualizamos contador en el estado
      if (user) {
        const updatedUser = {
          ...user,
          downloads_today: data.downloads_today,
          last_download_at: data.last_download_at,
        };
        saveAuth(token!, updatedUser);
        setUser(updatedUser);
      }

      return data.download_url; // URL firmada de S3 o storage
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isAdmin: user?.role === "admin",
        isPremium: user?.role === "premium",
        isFree: user?.role === "free",
        login,
        logout,
        refreshUser,
        downloadProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
