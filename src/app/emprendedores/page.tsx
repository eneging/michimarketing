"use client";

import { useState } from "react";
import ToolContainer from "../components/ToolContainer";
import FloatingMenu from "../components/FloatingMenu";
import Sidebar from "../components/Sidebar";

export default function ToolsPanel() {
  const [activeTool, setActiveTool] = useState<string>("Facturas");

  return (
    // Contenedor principal para la estructura de la página
    <div className="flex flex-col md:flex-row h-screen">
      
      {/* Menú flotante para móviles:
        - Se muestra solo en pantallas pequeñas (md:hidden).
      */}
      <div className="md:hidden">
        <FloatingMenu activeTool={activeTool} setActiveTool={setActiveTool} />
      </div>

      {/* Barra lateral para PC:
        - Se oculta en móviles (hidden).
        - Se muestra en pantallas de tamaño mediano en adelante (md:block).
        - Ocupa un ancho fijo en PC (w-[280px]).
      */}
      <aside className="hidden md:block w-[280px] border-r border-gray-200">
        <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      </aside>

      {/* Contenedor de la herramienta principal (PC y Móvil):
        - Ocupa todo el espacio restante (flex-1).
        - El contenido se puede desplazar (overflow-auto).
      */}
      <main className="flex-1 overflow-auto p-4">
        <ToolContainer activeTool={activeTool} />
      </main>

    </div>
  );
}