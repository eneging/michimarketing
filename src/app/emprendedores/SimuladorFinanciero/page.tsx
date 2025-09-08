"use client";

import { useState, useEffect, useRef } from "react";

// Función para generar un gráfico SVG simple y rápido
const createSVGChart = (data, labels) => {
  const width = 300;
  const height = 150;
  const padding = 20;

  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(" ");

  return (
    `<svg viewBox="0 0 ${width} ${height}" class="w-full h-auto">
      <polyline
        fill="none"
        stroke="#3b82f6"
        stroke-width="2"
        points="${points}"
      />
      <path
        fill="rgba(59, 130, 246, 0.3)"
        d="M ${padding},${height - padding} ${points} L ${width - padding},${height - padding} Z"
      />
      ${data.map((val, i) => {
        const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding);
        return `<circle cx="${x}" cy="${y}" r="2" fill="#3b82f6" />`;
      }).join("")}
    </svg>`
  );
};

export default function SimuladorFinanciero() {
  const [monto, setMonto] = useState(1000);
  const [interes, setInteres] = useState(5);
  const [meses, setMeses] = useState(12);
  const [tipo, setTipo] = useState("simple");
  const [ahorroMensual, setAhorroMensual] = useState(0);
  const [gastosMensuales, setGastosMensuales] = useState(0);
  const chartRef = useRef(null);

  const calculateResults = () => {
    const capitalMensual = [];
    let capital = monto;
    for (let i = 1; i <= meses; i++) {
      if (tipo === "simple") {
        capital += (monto * interes) / 100 / 12 + ahorroMensual - gastosMensuales;
      } else {
        capital = capital * (1 + interes / 100 / 12) + ahorroMensual - gastosMensuales;
      }
      capitalMensual.push(capital);
    }
    return {
      capitalMensual,
      total: capital,
      interesesGanados: capital - monto - ahorroMensual * meses + gastosMensuales * meses,
      aporteTotal: monto + ahorroMensual * meses,
      ahorroNeto: capital - gastosMensuales * meses,
    };
  };

  const { capitalMensual, total, interesesGanados, aporteTotal, ahorroNeto } = calculateResults();

  useEffect(() => {
    if (chartRef.current) {
      const labels = Array.from({ length: meses }, (_, i) => `Mes ${i + 1}`);
      const svg = createSVGChart(capitalMensual, labels);
      chartRef.current.innerHTML = svg;
    }
  }, [monto, interes, meses, tipo, ahorroMensual, gastosMensuales, capitalMensual]);

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-8 max-w-4xl mx-auto rounded-2xl shadow-2xl bg-white text-gray-800 font-sans">
      <div className="md:w-1/2 p-4 md:p-6 bg-gray-50 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-700">
          Simulador Financiero 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">Monto inicial (S/.)</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">Ahorro mensual (S/.)</label>
            <input
              type="number"
              value={ahorroMensual}
              onChange={(e) => setAhorroMensual(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">Interés anual (%)</label>
            <input
              type="number"
              value={interes}
              onChange={(e) => setInteres(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-gray-600">Plazo (meses)</label>
            <input
              type="number"
              value={meses}
              onChange={(e) => setMeses(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex flex-col space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Tipo de interés</label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="tipoInteres"
                  value="simple"
                  checked={tipo === "simple"}
                  onChange={() => setTipo("simple")}
                  className="form-radio text-indigo-600"
                />
                <span className="text-gray-700">Simple</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="tipoInteres"
                  value="compuesto"
                  checked={tipo === "compuesto"}
                  onChange={() => setTipo("compuesto")}
                  className="form-radio text-indigo-600"
                />
                <span className="text-gray-700">Compuesto</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Gastos mensuales (S/.)</label>
            <input
              type="number"
              value={gastosMensuales}
              onChange={(e) => setGastosMensuales(Number(e.target.value))}
              className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="md:w-1/2 p-4 md:p-6 mt-6 md:mt-0 md:ml-6 flex flex-col justify-between">
        <div className="bg-indigo-50 p-6 rounded-2xl shadow-md">
          <h3 className="text-lg md:text-xl font-bold text-indigo-700 mb-4">Resumen de Proyección</h3>
          <div className="space-y-3 text-lg font-semibold">
            <div className="flex justify-between items-center text-gray-900">
              <span className="text-gray-600">Capital final:</span>
              <strong className="text-indigo-600 text-2xl">S/. {total.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Intereses generados:</span>
              <span>S/. {interesesGanados.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Aporte total:</span>
              <span>S/. {aporteTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Ahorro neto:</span>
              <span>S/. {ahorroNeto.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex-grow">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Evolución del Capital</h3>
          <div ref={chartRef} className="w-full h-40 bg-gray-100 rounded-lg p-2 flex items-center justify-center">
            {/* El gráfico SVG se renderizará aquí */}
          </div>
        </div>
      </div>
    </div>
  );
}