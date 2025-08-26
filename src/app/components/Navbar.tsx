"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search, Sparkles, ChevronDown, MoreHorizontal } from "lucide-react";

// ------------------------------------------------
// Definición de tipos
// ------------------------------------------------

type Tool = {
  slug: string;
  name: string;
  logo?: string;
  description?: string;
  category?: string;
  tags?: string[];
};

type Category = {
  slug: string;
  name: string;
  description?: string;
};

type Suggestion =
  | ({ kind: "tool" } & Tool)
  | ({ kind: "category" } & Category);

// Datos de ejemplo (deberías reemplazarlos con tus imports reales)
const tools: Tool[] = [
  { slug: "tool-1", name: "Google Analytics", description: "Herramienta de analítica web", category: "Analítica" },
  { slug: "tool-2", name: "Ahrefs", description: "Herramienta de SEO", category: "SEO" },
  { slug: "tool-3", name: "Mailchimp", description: "Plataforma de email marketing", category: "Email Marketing" },
];

const categories: Category[] = [
  { slug: "seo", name: "SEO", description: "Herramientas de optimización para motores de búsqueda" },
  { slug: "analitica", name: "Analítica", description: "Herramientas de análisis de datos" },
  { slug: "social-media", name: "Social Media", description: "Herramientas para redes sociales" },
];

// Modal para enlaces adicionales
function MoreLinksModal({ isOpen, onClose, links }: { 
  isOpen: boolean; 
  onClose: () => void; 
  links: { href: string; label: string }[];
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Cerrar modal al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="bg-gray-900 border border-gray-700/50 rounded-xl p-6 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Más enlaces</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-2">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block px-4 py-3 text-gray-300 hover:bg-gray-800/60 rounded-lg transition-colors"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <button 
          onClick={onClose}
          className="mt-6 w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

// Tooltip para enlaces adicionales
function MoreLinksTooltip({ isOpen, onClose, links }: { 
  isOpen: boolean; 
  onClose: () => void;
  links: { href: string; label: string }[];
}) {
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Cerrar tooltip al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={tooltipRef}
      className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-700/50 rounded-xl shadow-xl z-50 overflow-hidden"
    >
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="block px-4 py-3 text-gray-300 hover:bg-gray-800/60 transition-colors text-sm border-b border-gray-800/30 last:border-b-0"
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

// ------------------------------------------------
// Componente principal: Navbar
// ------------------------------------------------

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [moreLinksOpen, setMoreLinksOpen] = useState(false);
  const [useModal, setUseModal] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  
  const router = useRouter();

  // Definir enlaces principales y adicionales
  const mainLinks = [
    { href: "/", label: "Inicio", id: "home" },
    { href: "/tools", label: "Todas las Herramientas", id: "tools" },
    { href: "/comparativas", label: "Comparativas", id: "comparativas" },
  ];

  const additionalLinks = [
    { href: "/deals", label: "Ofertas" },
    { href: "/blog", label: "Blog" },
    { href: "/cursos", label: "Cursos" },
    { href: "/comunidad", label: "Comunidad" },
  ];

  // Determinar si usar modal basado en el ancho de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      setUseModal(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Cerrar menú de enlaces adicionales al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreButtonRef.current && !moreButtonRef.current.contains(event.target as Node)) {
        setMoreLinksOpen(false);
      }
    }

    if (moreLinksOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreLinksOpen]);

  // ------------------------------------------------
  // Función para manejar la búsqueda
  // ------------------------------------------------
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
    setFocused(false);
    setMenuOpen(false);
    setActiveIndex(-1);
  };

  // ------------------------------------------------
  // Generar sugerencias
  // ------------------------------------------------
  const allSuggestions: Suggestion[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const catMatches: Suggestion[] = categories
      .filter(
        (c) =>
          (c.name?.toLowerCase() || "").includes(q) ||
          (c.description?.toLowerCase() || "").includes(q)
      )
      .map((c) => ({ kind: "category" as const, ...c }));

    const toolMatches: Suggestion[] = tools
      .filter(
        (t) =>
          (t.name?.toLowerCase() || "").includes(q) ||
          (t.description?.toLowerCase() || "").includes(q) ||
          t.tags?.some((tag: string) => (tag?.toLowerCase() || "").includes(q))
      )
      .map((t) => ({
        kind: "tool" as const,
        slug: t.slug,
        name: t.name || "Sin nombre",
        logo: t.logo,
        description: t.description,
        category: t.category,
      }));

    return [...catMatches.slice(0, 3), ...toolMatches.slice(0, 7)].slice(0, 8);
  }, [query]);

  // ------------------------------------------------
  // Navegar a la sugerencia seleccionada
  // ------------------------------------------------
  const goToSuggestion = (s: Suggestion) => {
    const href = s.kind === "tool" ? `/tools/${s.slug}` : `/categories/${s.slug}`;
    router.push(href);
    setFocused(false);
    setMenuOpen(false);
    setActiveIndex(-1);
  };

  // ------------------------------------------------
  // Manejo de teclas para selección de sugerencias
  // ------------------------------------------------
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!allSuggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % allSuggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + allSuggestions.length) % allSuggestions.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        e.preventDefault();
        goToSuggestion(allSuggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setFocused(false);
      setActiveIndex(-1);
    }
  };

  // ------------------------------------------------
  // Resaltar texto coincidente en sugerencias
  // ------------------------------------------------
  const highlight = (text: string = "", q: string) => {
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i === -1) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark className="bg-blue-400/20 rounded px-0.5 text-white border border-blue-400/30">
          {text.slice(i, i + q.length)}
        </mark>
        {text.slice(i + q.length)}
      </>
    );
  };

  // ------------------------------------------------
  // Sub-componente para la lista de sugerencias
  // ------------------------------------------------
  const SuggestionList = () => (
    <>
      {focused && query && allSuggestions.length > 0 && (
        <div
          className={`absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 shadow-2xl shadow-black/40 rounded-xl z-50 overflow-hidden`}
          role="listbox"
          aria-label="Sugerencias de búsqueda"
        >
          <div className="p-2 border-b border-gray-700/50">
            <p className="text-xs text-gray-400 px-2 py-1">Resultados para `{query}`</p>
          </div>
          {allSuggestions.map((s, idx) => (
            <button
              key={`${s.kind}-${s.slug}-${idx}`}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                goToSuggestion(s);
              }}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-800/50 transition-all duration-200 ${
                idx === activeIndex ? "bg-gray-800/50" : ""
              } ${idx < allSuggestions.length - 1 ? "border-b border-gray-800/30" : ""}`}
              role="option"
              aria-selected={idx === activeIndex}
            >
              {/* Avatar / icono */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden border border-gray-700/50">
                {s.kind === "tool" && s.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="text-xs text-gray-400 font-semibold">
                    {s.kind === "tool" ? "TL" : "CAT"}
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-white truncate">
                  {highlight(s.name, query)}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {s.kind === "tool"
                    ? s.category
                      ? `Herramienta • ${s.category}`
                      : "Herramienta"
                    : "Categoría"}
                </div>
              </div>
              <div className="text-gray-500 text-xs font-medium px-2 py-1 rounded bg-gray-800/50">
                {s.kind === "tool" ? "Herramienta" : "Categoría"}
              </div>
            </button>
          ))}

          <div className="border-t border-gray-700/50 p-2 bg-gray-900">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="w-full text-left px-4 py-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center justify-between group"
            >
              <span>Ver todos los resultados para `{query}`</span>
              <div className="px-2 py-1 bg-blue-500/10 rounded text-blue-400 text-xs group-hover:bg-blue-500/20 transition-colors">
                Enter
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );

  // ------------------------------------------------
  // Renderizado principal del Navbar
  // ------------------------------------------------
  return (
    <>
      <nav className="w-full bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 sticky top-0 z-40 shadow-lg shadow-black/10">
        <div className="max-w-9xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 hover:from-blue-300 hover:to-purple-300 flex items-center"
            onMouseEnter={() => setHoveredLink("logo")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <div className="relative">
              <h1 className="text-white">MichiMarketing</h1>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </div>
            <span className="text-xs font-normal text-gray-400 ml-2 bg-gray-800/50 px-2 py-1 rounded-full border border-gray-700/50">
              Directorio
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex flex-grow items-center justify-end space-x-4">
            {/* Links principales */}
            <div className="flex items-center space-x-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-800/30 transition-all duration-300 relative group"
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-3 right-3 h-0.5 bg-blue-400 transition-all duration-300 ${
                      hoveredLink === link.id ? "opacity-100" : "opacity-0"
                    }`}
                  ></span>
                </Link>
              ))}

              {/* Categorías con dropdown dinámico */}
              <div
                className="relative"
                onMouseEnter={() => setHoveredLink("categories")}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button className="flex items-center text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-800/30 transition-all duration-300 relative group">
                  Categorías
                  <ChevronDown size={14} className="ml-1 opacity-60" />
                  <span
                    className={`absolute -bottom-1 left-3 right-3 h-0.5 bg-purple-400 transition-all duration-300 ${
                      hoveredLink === "categories" ? "opacity-100" : "opacity-0"
                    }`}
                  ></span>
                </button>

                {hoveredLink === "categories" && (
                  <div className="absolute left-0 mt-2 w-72 bg-gray-900 border border-gray-700/50 rounded-xl shadow-xl overflow-hidden z-50">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="block px-4 py-3 text-gray-300 hover:bg-gray-800/60 transition-colors text-sm"
                        onClick={() => setMenuOpen(false)}
                      >
                        <div className="font-medium">{cat.name}</div>
                        <p className="text-xs text-gray-500 truncate">{cat.description}</p>
                      </Link>
                    ))}
                    <div className="border-t border-gray-800/50">
                      <Link
                        href="/categories"
                        className="block px-4 py-3 text-blue-400 hover:bg-blue-500/10 text-sm font-medium"
                        onClick={() => setMenuOpen(false)}
                      >
                        Ver todas las categorías →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Botón para enlaces adicionales */}
              <div className="relative">
                <button 
                  ref={moreButtonRef}
                  className="flex items-center text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-800/30 transition-all duration-300 relative group"
                  onClick={() => setMoreLinksOpen(!moreLinksOpen)}
                >
                  Más
                  <MoreHorizontal size={16} className="ml-1 opacity-60" />
                  <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-green-400 transition-all duration-300 opacity-0 group-hover:opacity-100"></span>
                </button>

                {!useModal && (
                  <MoreLinksTooltip 
                    isOpen={moreLinksOpen} 
                    onClose={() => setMoreLinksOpen(false)}
                    links={additionalLinks} 
                  />
                )}
              </div>
            </div>

            {/* Buscador + CTA */}
            <div className="flex items-center space-x-3">
              <div className="relative w-full max-w-xs">
                <form
                  onSubmit={handleSearch}
                  className={`flex items-center bg-gray-900/50 rounded-full px-4 py-2.5 border transition-all duration-300 ${
                    focused ? "border-blue-500/50 shadow-lg shadow-blue-500/10" : "border-gray-700/50 hover:border-gray-600"
                  }`}
                >
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Buscar herramientas..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActiveIndex(-1);
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 120)}
                    onKeyDown={onKeyDown}
                    className="bg-transparent outline-none flex-grow text-gray-200 placeholder-gray-500 text-sm"
                    role="combobox"
                    aria-expanded={focused && allSuggestions.length > 0}
                    aria-autocomplete="list"
                    aria-controls="suggestions"
                  />
                </form>
                <SuggestionList />
              </div>

              <Link
                href="/pro-plan"
                className="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-2 px-4 rounded-full border border-blue-500/30 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 group"
              >
                <Sparkles className="w-4 h-4 mr-1.5" /> suscribete
              </Link>
            </div>
          </div>

          {/* Botón Mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 text-gray-300 hover:bg-gray-800/30 rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menú Mobile */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-lg px-6 py-4 border-t border-gray-800/50 space-y-4">
            <div className="relative">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-gray-800/50 rounded-full px-4 py-2.5 border border-gray-700/50 focus-within:border-blue-500/50 transition-all duration-300"
              >
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Buscar herramientas..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(-1);
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 120)}
                  onKeyDown={onKeyDown}
                  className="bg-transparent outline-none flex-grow text-gray-200 placeholder-gray-500 text-sm"
                />
              </form>
              <SuggestionList />
            </div>

            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-300 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                Inicio
              </Link>

              {/* Categorías en mobile */}
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer px-4 py-2.5 text-gray-300 font-medium rounded-lg hover:bg-gray-800/50">
                  Categorías
                  <ChevronDown size={14} className="ml-1 opacity-60 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-4 mt-2 space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="block text-gray-400 text-sm py-1.5 hover:text-gray-200 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link
                    href="/categories"
                    onClick={() => setMenuOpen(false)}
                    className="block text-blue-400 text-sm py-1.5 hover:text-blue-300"
                  >
                    Ver todas →
                  </Link>
                </div>
              </details>

              <Link
                href="/tools"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-300 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
              >
                Todas las Herramientas
              </Link>
              
              {additionalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-300 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-800/50 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/pro-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 mt-4 shadow-lg shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4 mr-2" /> Premium
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Modal para enlaces adicionales (en móvil) */}
      <MoreLinksModal 
        isOpen={useModal && moreLinksOpen} 
        onClose={() => setMoreLinksOpen(false)} 
        links={additionalLinks}
      />
    </>
  );
}