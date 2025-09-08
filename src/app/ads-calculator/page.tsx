"use client";
import { useState } from "react";
import { benchmarksByCountry } from "../data/benchmarks";
import {
  FaDollarSign,
  FaMousePointer,
  FaEye,
  FaChartLine,
  FaReceipt,
  FaBolt,
  FaQuestionCircle,
  FaInfoCircle,
  FaGlobeAmericas,
 
} from "react-icons/fa";

// Interfaces para los datos de benchmarks
interface PlatformData {
  cpc: number;
  cpm: number;
}

interface CountryData {
  facebook: PlatformData;
  tiktok: PlatformData;
}

// Tipado de los datos de benchmarks
const typedBenchmarksByCountry: Record<string, CountryData> = benchmarksByCountry;

// ---

// Props para el componente InfoTooltip
interface InfoTooltipProps {
  text: string;
}

// Componente para tooltips informativos
const InfoTooltip = ({ text }: InfoTooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block ml-2">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="text-gray-400 hover:text-white focus:outline-none"
        aria-label="Más información"
      >
        <FaQuestionCircle size={14} />
      </button>
      {showTooltip && (
        <div className="absolute z-10 left-0 bottom-full mb-2 w-64 p-3 bg-gray-700 rounded-lg shadow-lg text-sm">
          {text}
          <div className="absolute top-full left-4 border-8 border-transparent border-t-gray-700"></div>
        </div>
      )}
    </div>
  );
};

// ---

// Props para el componente ResultCard
interface ResultCardProps {
  title: string;
  value: string | number;
  icon: any;
  description: string;
}

// Componente para una tarjeta de resultado
const ResultCard = ({ title, value, icon, description }: ResultCardProps) => (
  <div className="bg-gray-800 p-5 rounded-xl flex flex-col items-start gap-2 transition-all hover:bg-gray-750">
    <div className="flex items-center gap-2 mb-1">
      <div className="text-blue-400 text-xl">{icon}</div>
      <p className="text-sm font-medium text-gray-300">{title}</p>
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    {description && (
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    )}
  </div>
);

// ---

// Tipos para el estado de la calculadora
type PlatformType = "facebook" | "tiktok";
type CountryType = keyof typeof benchmarksByCountry;

// Componente principal de la calculadora
export default function AdCalculator() {
  const [platform, setPlatform] = useState<PlatformType>("facebook");
  const [budget, setBudget] = useState<number>(100);
  const [country, setCountry] = useState<CountryType>("global");
  const [ticket, setTicket] = useState<number>(50);
  const [conversionRate, setConversionRate] = useState<number>(2);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const data = typedBenchmarksByCountry[country][platform];
  const effectiveCPC = data.cpc;
  const effectiveCPM = data.cpm;

  // Cálculos de métricas
  const clicks = budget / effectiveCPC;
  const impressions = (budget / effectiveCPM) * 1000;
  const conversions = (clicks * conversionRate) / 100;
  const expectedRevenue = conversions * ticket;
  const roas = expectedRevenue / budget;
  const profit = expectedRevenue - budget;

  // Determinar color según el ROAS
  const getRoasColor = (): string => {
    if (roas >= 4) return "text-green-400";
    if (roas >= 2) return "text-yellow-400";
    if (roas >= 1) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <main className="bg-gray-900 min-h-screen text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <FaChartLine className="text-blue-400" /> Calculadora de Publicidad Digital
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Calcula el rendimiento esperado de tus campañas publicitarias. Simula diferentes escenarios ajustando los parámetros.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Panel de Configuración */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaGlobeAmericas className="text-blue-400" /> Configura tu campaña
              </h2>
              <p className="text-gray-400 text-sm">
                Ajusta los parámetros según tu estrategia publicitaria. Los resultados se actualizarán automáticamente.
              </p>
            </div>

            <div className="space-y-6">
              {/* Selector de País */}
              <div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-300 font-medium">País de targeting</label>
                  <InfoTooltip text="Selecciona el país donde se mostrarán tus anuncios. Los costos varían según la ubicación." />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(typedBenchmarksByCountry) as CountryType[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setCountry(c)}
                      className={`px-3 py-2 rounded-lg transition-all font-medium text-sm ${
                        country === c
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {c === "global" ? "Global" : c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Plataforma */}
              <div>
                <div className="flex items-center mb-2">
                  <label className="text-gray-300 font-medium">Plataforma</label>
                  <InfoTooltip text="Selecciona la plataforma donde publicarás tus anuncios. Cada plataforma tiene costos diferentes." />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPlatform("facebook")}
                    className={`flex-1 px-4 py-3 rounded-lg transition-all font-medium flex items-center justify-center gap-2 ${
                      platform === "facebook"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <span>Facebook/Instagram</span>
                  </button>
                  <button
                    onClick={() => setPlatform("tiktok")}
                    className={`flex-1 px-4 py-3 rounded-lg transition-all font-medium flex items-center justify-center gap-2 ${
                      platform === "tiktok"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <span>TikTok</span>
                  </button>
                </div>
              </div>

              {/* Presupuesto */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <label className="text-gray-300 font-medium">Presupuesto diario</label>
                    <InfoTooltip text="El monto que planeas gastar por día en publicidad. Ajusta según tu capacidad de inversión." />
                  </div>
                  <span className="text-white font-bold">${budget.toFixed(0)} USD</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="10000"
                  step="10"
                  value={budget}
                  onChange={(e) => setBudget(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$10</span>
                  <span>$10,000</span>
                </div>
              </div>

              {/* Ticket promedio */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <label className="text-gray-300 font-medium">Valor promedio por venta</label>
                    <InfoTooltip text="El valor promedio de cada venta/conversión que esperas obtener de tu campaña." />
                  </div>
                  <span className="text-white font-bold">${ticket.toFixed(0)} USD</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="5"
                  value={ticket}
                  onChange={(e) => setTicket(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$10</span>
                  <span>$1,000</span>
                </div>
              </div>

              {/* Tasa de conversión */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <label className="text-gray-300 font-medium">Tasa de conversión</label>
                    <InfoTooltip text="El porcentaje de clics que se convertirán en ventas/objetivos. Basado en tu experiencia previa o promedios del sector." />
                  </div>
                  <span className="text-white font-bold">{conversionRate.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0.1%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Resultados */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Resultados estimados</h2>
              <p className="text-gray-400 text-sm">
                Basado en promedios de la industria para {platform} en {country}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <ResultCard
                title="Costo por clic (CPC)"
                value={`$${effectiveCPC.toFixed(2)}`}
                icon={<FaMousePointer />}
                description="Precio promedio por cada clic en tus anuncios"
              />
              <ResultCard
                title="Costo por mil impresiones (CPM)"
                value={`$${effectiveCPM.toFixed(2)}`}
                icon={<FaEye />}
                description="Precio promedio por cada 1000 visualizaciones"
              />
              <ResultCard
                title="Clics estimados"
                value={Math.round(clicks).toLocaleString()}
                icon={<FaBolt />}
                description="Cantidad de clics que podrías obtener"
              />
              <ResultCard
                title="Impresiones estimadas"
                value={Math.round(impressions).toLocaleString()}
                icon={<FaChartLine />}
                description="Número de veces que se mostrará tu anuncio"
              />
              <ResultCard
                title="Conversiones"
                value={Math.round(conversions).toLocaleString()}
                icon={<FaReceipt />}
                description="Ventas o conversiones estimadas"
              />
              <ResultCard
                title="Ingresos esperados"
                value={`$${expectedRevenue.toFixed(0)}`}
                icon={<FaDollarSign />}
                description="Ingresos totales generados por la campaña"
              />
            </div>

            {/* ROI y Resultados financieros */}
            <div className="pt-4 border-t border-gray-700">
              <h3 className="text-lg font-bold mb-4">Rentabilidad de la campaña</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-750 p-4 rounded-xl">
                  <p className="text-sm text-gray-400 mb-1">Retorno de inversión (ROAS)</p>
                  <p className={`text-2xl font-bold ${getRoasColor()}`}>{roas.toFixed(2)}x</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {roas >= 4 && "¡Excelente! Tu campaña es muy rentable"}
                    {roas >= 2 && roas < 4 && "Buen retorno de inversión"}
                    {roas >= 1 && roas < 2 && "Campaña rentable pero con margen de mejora"}
                    {roas < 1 && "Campaña no rentable - Revisa tu estrategia"}
                  </p>
                </div>
                
                <div className="bg-gray-750 p-4 rounded-xl">
                  <p className="text-sm text-gray-400 mb-1">Beneficio estimado</p>
                  <p className={`text-2xl font-bold ${profit >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {profit >= 0 ? `$${profit.toFixed(0)} Ganancia` : `$${Math.abs(profit).toFixed(0)} Pérdida`}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Después de descontar la inversión publicitaria
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                className="text-xs text-gray-500 hover:text-gray-300 flex items-center justify-center gap-1 mx-auto"
                onClick={() => setActiveTooltip(activeTooltip === "metrics" ? null : "metrics")}
              >
                <FaInfoCircle /> ¿Cómo se calculan estas métricas?
              </button>
              
              {activeTooltip === "metrics" && (
                <div className="mt-3 p-3 bg-gray-750 rounded-lg text-xs text-gray-400 text-left">
                  <p><strong>Clics estimados:</strong> Presupuesto / CPC</p>
                  <p><strong>Impresiones estimadas:</strong> (Presupuesto / CPM) * 1000</p>
                  <p><strong>Conversiones:</strong> Clics * (Tasa de conversión / 100)</p>
                  <p><strong>Ingresos esperados:</strong> Conversiones * Valor por venta</p>
                  <p><strong>ROAS:</strong> Ingresos esperados / Presupuesto</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}