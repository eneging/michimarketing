"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getToken,
  getUser,
  login as loginService,
  logout as logoutService,
  saveAuth,
} from "@/services/authService";

interface AuthContextType {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Solo ejecutamos en cliente
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

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, login, logout }}
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
