"use client";

import { useState } from "react";
import jsPDF from "jspdf";

export default function Facturas() {
  const [cliente, setCliente] = useState("");
  const [items, setItems] = useState([{ descripcion: "", cantidad: 1, precio: 0 }]);

  const agregarItem = () => setItems([...items, { descripcion: "", cantidad: 1, precio: 0 }]);
  const actualizarItem = (index: number, field: string, value: any) => {
    const nuevosItems = [...items];
    nuevosItems[index][field] = value;
    setItems(nuevosItems);
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.text(`Factura para: ${cliente}`, 10, 10);
    items.forEach((item, i) => {
      doc.text(
        `${i + 1}. ${item.descripcion} - Cantidad: ${item.cantidad} - Precio: S/. ${item.precio}`,
        10,
        20 + i * 10
      );
    });
    doc.save("factura.pdf");
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">Generador de Facturas PDF</h2>
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="border p-2 rounded-md w-full mb-4 focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Contenedor de items */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          // Contenedor de cada fila de item
          <div key={idx} className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Descripción"
              value={item.descripcion}
              onChange={(e) => actualizarItem(idx, "descripcion", e.target.value)}
              className="border p-2 rounded-md w-full md:flex-1"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={item.cantidad}
              onChange={(e) => actualizarItem(idx, "cantidad", Number(e.target.value))}
              className="border p-2 rounded-md w-full md:w-24 text-center"
            />
            <input
              type="number"
              placeholder="Precio"
              value={item.precio}
              onChange={(e) => actualizarItem(idx, "precio", Number(e.target.value))}
              className="border p-2 rounded-md w-full md:w-32 text-center"
            />
          </div>
        ))}
      </div>

      {/* Contenedor de botones */}
      <div className="flex flex-col md:flex-row gap-2 mt-6">
        <button
          onClick={agregarItem}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors w-full md:w-auto"
        >
          Agregar Item
        </button>
        <button
          onClick={generarPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors w-full md:w-auto"
        >
          Generar PDF
        </button>
      </div>
    </div>
  );
}