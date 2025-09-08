"use client";

import Facturas from "../emprendedores/Facturas/page";
import CalculadoraPrecio from "../emprendedores/CalculadoraPrecio/page";
import Plantillas from "../emprendedores/Plantillas/page";
//import ROI from "../emprendedores/ROI/page";

import GestorTareas from "../emprendedores/GestorTareas/page";

interface ToolContainerProps {
  activeTool: string;
}

export default function ToolContainer({ activeTool }: ToolContainerProps) {
  switch (activeTool) {
    case "Facturas":
      return <Facturas />;
    case "Calculadora Precio":
      return <CalculadoraPrecio />;
    case "Plantillas":
      return <Plantillas />;
   // case "ROI":
     // return <ROI />;
  
    case "Gestor Tareas":
      return <GestorTareas />;
    default:
      return <div>Selecciona una herramienta</div>;
  }
}
