"use client";

import AdminLayout from "../components/AdminLayout";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { Wrench, LayoutGrid, Users } from "lucide-react";

import { AuthProvider } from "../context/AuthContext";
import { useEffect, useState } from "react";
import AdminProducts from "./products/page";

interface Category {
  id: number;
  name: string;
}

interface Tool {
  id: number;
  name: string;
  slug: string;
  category?: Category;
  website: string;
  logo: string;
  rating: number;
}




export default function AdminPage() {

    const [tools, setTools] = useState<Tool[]>([]);
    
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
 

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

useEffect(() => {
    async function fetchData() {
      try {
        const [catRes, toolsRes] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/tools`),
        ]);

        if (!catRes.ok || !toolsRes.ok) throw new Error("Error en la API");

        const catData = await catRes.json();
        const toolsData = await toolsRes.json();


        setCategories(catData.data || catData);
        setTools(toolsData.data || toolsData);
      
      } catch (error) {
        console.error("Error cargando categorías o herramientas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [API_URL]);



    
  return (
    <AuthProvider>
    <AdminLayout>
      <PageHeader
        title="Panel de Administración"
        subtitle="Aquí podrás gestionar herramientas, categorías y usuarios."
      />
      <AdminProducts></AdminProducts>

      {/* Grid de Estadísticas */}
     <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

{loading ? (
  <StatCard
    title="Herramientas Totales"
    value="Cargando..."
    icon={<Wrench className="h-6 w-6 text-neutral-400" />}
    description="Número total de herramientas en el sistema."
  />
) : (
  <StatCard
    title="Herramientas Totales"
    value={tools.length}
    icon={<Wrench className="h-6 w-6 text-neutral-400" />}
    description="Número total de herramientas en el sistema."
  />
)}


{loading ? (
  <StatCard
    title="Categorías Activas"
    value="Cargando..."
   icon={<LayoutGrid className="h-6 w-6 text-neutral-400" />}
    description="Categorías con al menos una herramienta activa."
  />
) : (
  <StatCard
    title="Categorías Activas"
    value={categories.length}
   icon={<LayoutGrid className="h-6 w-6 text-neutral-400" />}
    description="Categorías con al menos una herramienta activa."
  />
)}

        <StatCard
          title="Usuarios Registrados"
          value="8,721"
          icon={<Users className="h-6 w-6 text-neutral-400" />}
          description="Total de usuarios con acceso a la plataforma."
        />
      </div>

      {/* Aquí podrías añadir más componentes como tablas o gráficos */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white">Todos los elementos para editar en la paginas</h2>
        <div className="mt-4  rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          

  <div className="flex gap-4">
<a href="/admin/blogs" className=" bg-green-500 font-bold text-white rounded-xl p-4  ">

panel blogs

</a>

<a href="/admin/tools" className=" bg-blue-500 font-bold text-white rounded-xl p-4  ">

panel Tools 

</a>
</div>
        
        </div>
      </div>
      
    </AdminLayout>
    </AuthProvider>
  );
}
