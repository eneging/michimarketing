"use client";
import { useState, useCallback, useEffect } from "react";

// Tipos para los servicios disponibles
type ServiceType = "Landing" | "Catalogo" | "Ecommerce" | "Otro";

// Configuración de servicios con mensajes personalizados
const SERVICES = {
  Landing: {
    name: "Landing Page",
    message: "Me interesa una Landing Page profesional para mi negocio."
  },
  Catalogo: {
    name: "Catálogo Digital",
    message: "Estoy interesado en un Catálogo Digital para mostrar mis productos."
  },
  Ecommerce: {
    name: "Tienda Online",
    message: "Quiero una Tienda Online para vender mis productos en internet."
  },
  Otro: {
    name: "Otro servicio",
    message: "Me interesa un servicio personalizado para mi negocio."
  }
};

export default function ContactForm() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    whatsapp: "", 
    service: "" as ServiceType | ""
  });
  const [customService, setCustomService] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Validaciones mejoradas
  const validateField = useCallback((name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "El nombre es obligatorio";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
        return "";
      case "email":
        if (!value) return "El email es obligatorio";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Ingresa un email válido";
        return "";
      case "whatsapp":
        if (!value) return "El WhatsApp es obligatorio";
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 10) return "WhatsApp debe tener al menos 10 dígitos";
        return "";
      case "service":
        if (!value) return "Por favor selecciona un servicio";
        return "";
      case "customService":
        if (form.service === "Otro" && !value.trim()) return "Por favor describe tu servicio";
        return "";
      default:
        return "";
    }
  }, [form.service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "service") {
      setForm(prev => ({ ...prev, [name]: value as ServiceType | "" }));
      
      // Limpiar error del servicio personalizado al cambiar opción
      if (value !== "Otro" && errors.customService) {
        const newErrors = { ...errors };
        delete newErrors.customService;
        setErrors(newErrors);
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
    
    // Validación en tiempo real después de cambiar un campo
    if (errors[name]) {
      const error = validateField(name, value);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
      } else {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
  };

  const handleCustomServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomService(value);
    
    // Validación en tiempo real
    if (errors.customService) {
      const error = validateField("customService", value);
      if (error) {
        setErrors(prev => ({ ...prev, customService: error }));
      } else {
        const newErrors = { ...errors };
        delete newErrors.customService;
        setErrors(newErrors);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validar todos los campos antes de enviar
    const newErrors: Record<string, string> = {};
    
    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    
    // Validar servicio personalizado si es necesario
    if (form.service === "Otro") {
      const error = validateField("customService", customService);
      if (error) newErrors.customService = error;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      // Scroll al primer error
      const firstError = Object.keys(newErrors)[0];
      const errorElement = document.querySelector(`[name="${firstError}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      }
      return;
    }
    
    try {
      // Construir mensaje para WhatsApp
      const serviceMessage = form.service === "Otro" 
        ? `Me interesa: ${customService}` 
        : SERVICES[form.service as ServiceType].message;
      
      const whatsappMessage = `Hola, mi nombre es ${form.name}. ${serviceMessage} Mi email es ${form.email}.`;
      
      // Número de WhatsApp (reemplaza con tu número)
      const whatsappNumber = "51932563713"; // Ejemplo: 1234567890 (sin el +)
      
      // Codificar mensaje para URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Redirigir a WhatsApp
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
      
      // Simular envío exitoso (solo para mostrar feedback)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return (
      <section className="w-full min-h-screen  flex items-center justify-center p-4">
        <div className="animate-pulse rounded-xl p-8 w-full max-w-lg">
          <div className="h-8  rounded w-3/4 mx-auto mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-12  rounded"></div>
            ))}
            <div className="h-12 bg-gray-700 rounded mt-6"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full min-h-screen  flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
          Cuéntanos sobre tu negocio 🚀
        </h2>
        
        <p className="text-gray-400 text-center mb-6">
          Completa el formulario y te contactaremos por WhatsApp
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Tu nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-3 w-full rounded-lg transition-all duration-200 bg-gray-800 text-white placeholder-gray-500 
                focus:ring-2 focus:ring-green-500 focus:border-transparent border ${
                errors.name ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="Ej: María González"
              disabled={isSubmitting}
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Tu email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-3 w-full rounded-lg transition-all duration-200 bg-gray-800 text-white placeholder-gray-500 
                focus:ring-2 focus:ring-green-500 focus:border-transparent border ${
                errors.email ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="ejemplo@email.com"
              disabled={isSubmitting}
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">
              Tu WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-3 w-full rounded-lg transition-all duration-200 bg-gray-800 text-white placeholder-gray-500 
                focus:ring-2 focus:ring-green-500 focus:border-transparent border ${
                errors.whatsapp ? "border-red-500" : "border-gray-700"
              }`}
              placeholder="+34 123 456 789"
              disabled={isSubmitting}
            />
            {errors.whatsapp && <p className="mt-1 text-sm text-red-400">{errors.whatsapp}</p>}
          </div>
          
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
              Servicio de interés
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`p-3 w-full rounded-lg transition-all duration-200 bg-gray-800 text-white 
                focus:ring-2 focus:ring-green-500 focus:border-transparent border ${
                errors.service ? "border-red-500" : "border-gray-700"
              }`}
              disabled={isSubmitting}
            >
              <option value="" className="bg-gray-800">Selecciona un servicio</option>
              <option value="Landing" className="bg-gray-800">Landing Page</option>
              <option value="Catalogo" className="bg-gray-800">Catálogo Digital</option>
              <option value="Ecommerce" className="bg-gray-800">Tienda Online</option>
              <option value="Otro" className="bg-gray-800">Otro</option>
            </select>
            {errors.service && <p className="mt-1 text-sm text-red-400">{errors.service}</p>}
          </div>
          
          {form.service === "Otro" && (
            <div>
              <label htmlFor="customService" className="block text-sm font-medium text-gray-300 mb-1">
                Describe tu servicio
              </label>
              <input
                type="text"
                id="customService"
                name="customService"
                value={customService}
                onChange={handleCustomServiceChange}
                className={`p-3 w-full rounded-lg transition-all duration-200 bg-gray-800 text-white placeholder-gray-500 
                  focus:ring-2 focus:ring-green-500 focus:border-transparent border ${
                  errors.customService ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="¿Qué servicio necesitas?"
                disabled={isSubmitting}
              />
              {errors.customService && <p className="mt-1 text-sm text-red-400">{errors.customService}</p>}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 
            transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed 
            flex items-center justify-center gap-2 mt-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Redirigiendo...
              </>
            ) : (
              "Enviar por WhatsApp"
            )}
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center text-gray-500">
          Al enviar, serás redirigido a WhatsApp para completar la conversación
        </p>
      </div>
    </section>
  );
}