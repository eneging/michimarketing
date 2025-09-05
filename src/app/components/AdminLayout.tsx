"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, logout, getUser } from "../../services/authService";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    // Cargar usuario desde localStorage o authService en cliente
    const u = getUser();
    setUser(u);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra superior */}
      <header className="bg-green-600  rounded-2xl p-4 flex justify-between">
        <span className="text-xl font-bold">
          👨‍💻 Bienvenido, {user ? user.name : "Cargando..."}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </header>

      {/* Contenido */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
