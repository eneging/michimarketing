"use client";

import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ROI() {
  const [inversion, setInversion] = useState(1000);
  const [retorno, setRetorno] = useState(1200);

  const ganancia = retorno - inversion;
  const porcentaje = ((ganancia / inversion) * 100).toFixed(2);

  const data = {
    labels: ["Inversión", "Ganancia"],
    datasets: [
      {
        label: "ROI",
        data: [inversion, ganancia],
        backgroundColor: ["#FFA500", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">Calculadora de ROI</h2>
      <label>
        Inversión:
        <input
          type="number"
          value={inversion}
          onChange={(e) => setInversion(Number(e.target.value))}
          className="border p-2 rounded w-full mb-2"
        />
      </label>
      <label>
        Retorno esperado:
        <input
          type="number"
          value={retorno}
          onChange={(e) => setRetorno(Number(e.target.value))}
          className="border p-2 rounded w-full mb-4"
        />
      </label>
      <div className="mb-4">ROI: {porcentaje}%</div>
      <Pie data={data} />
    </div>
  );
}
