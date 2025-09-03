"use client";

import AdminLayout from "../components/AdminLayout";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { Wrench, LayoutGrid, Users } from "lucide-react";

import { AuthProvider } from "../context/AuthContext";



export default function AdminPage() {
  return (
    <AuthProvider>
    <AdminLayout>
      <PageHeader
        title="Panel de Administración"
        subtitle="Aquí podrás gestionar herramientas, categorías y usuarios."
      />

      {/* Grid de Estadísticas */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Herramientas Totales"
          value="1,250"
          icon={<Wrench className="h-6 w-6 text-neutral-400" />}
          description="Número total de herramientas en el sistema."
        />
        <StatCard
          title="Categorías Activas"
          value="48"
          icon={<LayoutGrid className="h-6 w-6 text-neutral-400" />}
          description="Categorías con al menos una herramienta activa."
        />
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
