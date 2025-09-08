"use client";

import { useState } from "react";
import { FaBars, FaFileInvoiceDollar, FaCalculator, FaFileAlt, FaChartLine, FaTasks } from 'react-icons/fa';

interface FloatingMenuProps {
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

export default function FloatingMenu({ activeTool, setActiveTool }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToolClick = (toolName: string) => {
    setActiveTool(toolName);
    setIsOpen(false); // Cierra el menú después de seleccionar
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Botón de hamburguesa */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-700 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none"
      >
        <FaBars size={24} />
      </button>

      {/* Menú de opciones */}
      <div 
        className={`absolute bottom-20 right-0 transform transition-all duration-300 ease-in-out 
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          flex flex-col items-center space-y-4`}
      >
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={() => handleToolClick(tool.name)}
            className={`
              p-4 rounded-full shadow-md transition-all duration-300 
              ${activeTool === tool.name ? "bg-green-700 text-white scale-110" : "bg-white text-green-700 hover:bg-gray-200"}
              hover:shadow-lg focus:outline-none
            `}
            style={{ transitionDelay: `${isOpen ? tools.indexOf(tool) * 50 : 0}ms` }}
          >
            {tool.icon}
          </button>
        ))}
      </div>
    </div>
  );
}