"use client";

import { FaFileInvoiceDollar, FaCalculator, FaFileAlt, FaChartLine, FaTasks } from 'react-icons/fa';

interface SidebarProps {
  activeTool: string;
  setActiveTool: (tool: string) => void;
}

const tools = [
  { name: "Facturas", icon: <FaFileInvoiceDollar /> },
  { name: "Calculadora Precio", icon: <FaCalculator /> },
  { name: "Plantillas", icon: <FaFileAlt /> },
  { name: "ROI", icon: <FaChartLine /> },
  { name: "Simulador Financiero", icon: <FaChartLine /> },
  { name: "Gestor Tareas", icon: <FaTasks /> },
];

export default function Sidebar({ activeTool, setActiveTool }: SidebarProps) {
  return (
    <aside className="w-64 shadow-lg flex flex-col">
      <h1 className="text-2xl font-bold p-6">Panel de Negocios</h1>
      <nav className="flex flex-col flex-1">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => setActiveTool(tool.name)}
            className={`w-full text-left px-6 py-3 hover:bg-green-500 
              flex items-center space-x-3 transition-colors duration-200
              ${activeTool === tool.name ? "bg-green-700 font-bold text-white" : "text-gray-300"}`}
          >
            <span className="text-xl">{tool.icon}</span>
            <span className="font-medium">{tool.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}