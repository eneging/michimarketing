import { useState } from "react";

export default function Portfolio() {
  const projects = [
    {
      id: 1,
      title: "Landing Page Moderna",
      description: "Diseño elegante y funcional para conversión de clientes",
      category: "Landing Page",
      image: "/api/placeholder/400/300",
      technologies: ["React", "Tailwind", "Framer Motion"]
    },
    {
      id: 2,
      title: "Catálogo Digital Interactivo",
      description: "Experiencia de usuario optimizada para productos",
      category: "Catálogo Digital",
      image: "/api/placeholder/400/300",
      technologies: ["Next.js", "TypeScript", "CSS Grid"]
    },
    {
      id: 3,
      title: "Identidad de Marca Premium",
      description: "Branding completo para empresa de tecnología",
      category: "Branding",
      image: "/api/placeholder/400/300",
      technologies: ["Illustrator", "Photoshop", "Branding"]
    },
    {
      id: 4,
      title: "E-commerce Responsive",
      description: "Tienda online con panel administrativo",
      category: "E-commerce",
      image: "/api/placeholder/400/300",
      technologies: ["Next.js", "Stripe", "MongoDB"]
    },
    {
      id: 5,
      title: "App Móvil Delivery",
      description: "Aplicación de delivery con seguimiento en tiempo real",
      category: "App Móvil",
      image: "/api/placeholder/400/300",
      technologies: ["React Native", "Firebase", "Google Maps"]
    },
    {
      id: 6,
      title: "Rediseño Corporativo",
      description: "Modernización completa de identidad visual",
      category: "Branding",
      image: "/api/placeholder/400/300",
      technologies: ["Design System", "UI/UX", "Illustration"]
    }
  ];

  const categories = ["Todos", "Landing Page", "Catálogo Digital", "Branding", "E-commerce", "App Móvil"];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects = activeCategory === "Todos" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="w-full py-16 px-4 md:px-6 ">
      <div className="max-w-6xl mx-auto">
      <center> <h2 className="text-4xl font-bold mb-4 text-green-400">Nuestros Trabajos Destacados</h2>
        
        </center> 
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
          Diseños que no solo se ven bien, sino que generan resultados tangibles para tu negocio.
        </p>
        
        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-green-500 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Imagen de {project.title}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <span className="text-green-400 text-xs font-semibold tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-green-400 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
                
                <button className="mt-4 text-green-400 text-sm font-medium flex items-center group-hover:underline">
                  Ver proyecto detallado
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105">
            Ver todos los proyectos
          </button>
        </div>
      </div>
    </section>
  );
}