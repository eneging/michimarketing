"use client";

import { useState } from "react";

export default function CalculadoraPrecio() {
  const [costo, setCosto] = useState<number>(0);
  const [margen, setMargen] = useState<number>(20);

  const precioVenta = costo + (costo * margen) / 100;

  return (
    <div className=" p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">Calculadora de Precio</h2>
      <div className="flex flex-col gap-4">
        <label>
          Costo del producto:
          <input
            type="number"
            value={costo}
            onChange={(e) => setCosto(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </label>
        <label>
          Margen de ganancia (%):
          <input
            type="number"
            value={margen}
            onChange={(e) => setMargen(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </label>
        <div className="mt-2 p-2 bg-green-500 rounded">
          <strong>Precio de venta:</strong> S/. {precioVenta.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
