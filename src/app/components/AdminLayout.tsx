"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, logout, getUser } from "../../services/authService";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const user = getUser();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra superior */}
      <header className="bg-gray-800  p-4 flex justify-between">
        <span>👨‍💻 Bienvenido, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </header>

      {/* Contenido */}
      <main className="flex-1 p-6 ">{children}</main>
    </div>
  );
}
