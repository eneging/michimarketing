"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import Logo from "../../logo.png";
import { 
  ArrowDownTrayIcon, 
  ClipboardDocumentIcon, 
  ArrowPathIcon,

  PhotoIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from "framer-motion";

// Helper function to validate if a string is a valid URL
const isUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

export default function QrGenerator() {
  // State variables for QR code customization
  const [text, setText] = useState("https://michimarketing.com");
  const [fgColor, setFgColor] = useState("#ff6600");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(220);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("H");
  const [includeLogo, setIncludeLogo] = useState(true);
  const [logoSize, setLogoSize] = useState(12);

  // State variables for UI feedback and actions
  const [isDownloading, setIsDownloading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);
 ;
  const [activeTab, setActiveTab] = useState("basic");

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Download the generated QR code
  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      setIsDownloading(true);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `michimarketing-qr-${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
      setSuccessMessage("¡QR descargado con éxito! ✅");
    }
  };

  // Copy the QR code image to the clipboard
  const copyToClipboard = async () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      try {
        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve));
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setSuccessMessage("¡QR copiado al portapapeles! 📋");
        }
      } catch (err) {
        console.error('Error al copiar: ', err);
        setSuccessMessage("Error al copiar. Intenta descargarlo.");
      }
    }
  };

  // Reset all settings to default values
  const resetSettings = () => {
    setText("https://michimarketing.com");
    setFgColor("#ff6600");
    setBgColor("#ffffff");
    setSize(220);
    setErrorLevel("H");
    setIncludeLogo(true);
    setLogoSize(12);
    setSuccessMessage("Configuración restablecida ✨");
    setActiveTab("basic");
  };
  
  // Memoized QR code component to prevent unnecessary re-renders
  const qrCodeComponent = useMemo(() => (
    <QRCodeCanvas
      value={text}
      size={size}
      fgColor={fgColor}
      bgColor={bgColor}
      includeMargin={true}
      level={errorLevel}
      aria-label={`Código QR para: ${text}`}
    />
  ), [text, size, fgColor, bgColor, errorLevel]);

  return (
    <div className="min-h-screen   py-4 px-4 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
      
      {/* Header móvil */}
      <div className="lg:hidden w-full text-center mb-2">
        <h1 className="text-2xl font-bold text-white mb-1">
          Generador de QR
        </h1>
        <p className="text-xs text-gray-400">
          Crea códigos QR personalizados al instante
        </p>
      </div>

      {/* Contenedor principal */}
      <div className="flex flex-col-reverse lg:flex-row items-start justify-center gap-6 lg:gap-10 w-full max-w-6xl">
        
        {/* Panel de controles */}
        <div className="bg-neutral-800 p-5 rounded-2xl shadow-xl flex flex-col items-center gap-5 w-full lg:max-w-md border border-neutral-700">
          {/* Pestañas para básico/avanzado */}
          <div className="flex w-full bg-neutral-700 rounded-lg p-1">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${activeTab === "basic" ? "bg-orange-500 text-white" : "text-gray-300"}`}
              onClick={() => setActiveTab("basic")}
            >
              Básico
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${activeTab === "advanced" ? "bg-orange-500 text-white" : "text-gray-300"}`}
              onClick={() => setActiveTab("advanced")}
            >
              Avanzado
            </button>
          </div>

          {/* Input de texto con validación */}
          <div className="w-full">
            <label htmlFor="qr-text" className="block text-sm font-medium text-gray-300 mb-2">
              URL o texto
            </label>
            <input
              id="qr-text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://ejemplo.com"
              className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              aria-describedby="url-validation"
            />
            <div id="url-validation" className="text-xs mt-1 h-5">
              {text && !isUrl(text) && (
                <span className="text-amber-400 flex items-center gap-1">
                  <span role="img" aria-label="Advertencia">⚠️</span>
                  Esto no parece una URL válida
                </span>
              )}
            </div>
          </div>

          {/* Contenido de pestañas */}
          {activeTab === "basic" ? (
            <div className="w-full grid lg:grid-cols-2   gap-4">
              {/* Selector de color QR */}
              <div>
                <label htmlFor="qr-color" className="block text-sm font-medium text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="qr-color"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                    aria-label="Seleccionar color del código QR"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 px-3 py-2 w-full rounded-lg bg-neutral-700 text-white border border-neutral-600 text-xs"
                    aria-label="Valor hexadecimal del color"
                  />
                </div>
              </div>

              {/* Selector de color de fondo */}
              <div>
                <label htmlFor="bg-color" className="block text-sm font-medium text-gray-300 mb-2 ">
                  Fondo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer"
                    aria-label="Seleccionar color de fondo"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 px-3 py-2 w-full rounded-lg bg-neutral-700 text-white border border-neutral-600 text-xs"
                    aria-label="Valor hexadecimal del color de fondo"
                  />
                </div>
              </div>

              {/* Control de logo */}
              <div className="col-span-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="include-logo" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <PhotoIcon className="h-4 w-4" />
                    Incluir logo
                  </label>
                  <input
                    id="include-logo"
                    type="checkbox"
                    checked={includeLogo}
                    onChange={(e) => setIncludeLogo(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 gap-4">
              {/* Control de tamaño */}
              <div>
                <label htmlFor="qr-size" className="block text-sm font-medium text-gray-300 mb-2">
                  Tamaño: {size}px
                </label>
                <input
                  id="qr-size"
                  type="range"
                  min="100"
                  max="400"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value ))}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  aria-valuemin={100}
                  aria-valuemax={400}
                  aria-valuenow={size}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Pequeño</span>
                  <span>Grande</span>
                </div>
              </div>

              {/* Control de tamaño del logo */}
              {includeLogo && (
                <div>
                  <label htmlFor="logo-size" className="block text-sm font-medium text-gray-300 mb-2">
                    Tamaño del logo: {logoSize}px
                  </label>
                  <input
                    id="logo-size"
                    type="range"
                    min="8"
                    max="30"
                    value={logoSize}
                    onChange={(e) => setLogoSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                    disabled={!includeLogo}
                    aria-valuemin={8}
                    aria-valuemax={30}
                    aria-valuenow={logoSize}
                  />
                </div>
              )}

              {/* Nivel de corrección de error */}
              <div>
                <label htmlFor="error-level" className="block text-sm font-medium text-gray-300 mb-2">
                  Nivel de corrección
                </label>
                <select
                  id="error-level"
                  value={errorLevel}
                  onChange={(e) => setErrorLevel(e.target.value as "L" | "M" | "Q" | "H")}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="L">Bajo (L)</option>
                  <option value="M">Medio (M)</option>
                  <option value="Q">Calidad (Q)</option>
                  <option value="H">Alto (H)</option>
                </select>
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <button
              onClick={downloadQR}
              disabled={isDownloading}
              className="flex-1 px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              aria-label="Descargar código QR"
            >
              {isDownloading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Descargando...
                </>
              ) : (
                <>
                  <ArrowDownTrayIcon className="h-5 w-5" />
                  Descargar
                </>
              )}
            </button>
            <button
              onClick={copyToClipboard}
              className="flex-1 px-4 py-3 bg-neutral-700 text-white font-semibold rounded-lg shadow hover:bg-neutral-600 transition flex items-center justify-center gap-2"
              aria-label="Copiar código QR al portapapeles"
            >
              <ClipboardDocumentIcon className="h-5 w-5" />
              Copiar
            </button>
            <button
              onClick={resetSettings}
              className="px-4 py-3 bg-neutral-700 text-white font-semibold rounded-lg shadow hover:bg-neutral-600 transition flex items-center justify-center gap-2"
              aria-label="Restablecer configuración predeterminada"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Mensajes de estado */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full p-3 bg-green-800/20 text-green-400 rounded-lg text-sm text-center"
                role="status"
                aria-live="polite"
              >
                {successMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Panel de visualización del QR */}
        <div className="flex flex-col items-center justify-center gap-4 w-full lg:max-w-md">
          <div className="bg-neutral-800 p-5 rounded-2xl shadow-xl w-full border border-neutral-700">
            <h2 className="text-lg font-semibold text-white mb-4 text-center hidden lg:block">Vista previa</h2>
            
            <div ref={qrRef} className="relative bg-white p-4 rounded-2xl flex items-center justify-center w-full aspect-square max-w-sm mx-auto">
              {qrCodeComponent}

              {/* Logo en el centro */}
              {includeLogo && (
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-md overflow-hidden"
                  style={{ width: `${(size * logoSize) / 100}px`, height: `${(size * logoSize) / 100}px` }}
                >
                  <Image
                    src={Logo}
                    alt="Logo MichiMarketing"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-400 text-center mt-2 hidden lg:block">
            Escanea el código para probarlo. Personaliza colores y añade tu logo.
          </p>
        </div>
      </div>
    </div>
  );
}