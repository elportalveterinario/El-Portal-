import React, { useState, useEffect, useRef } from 'react';
// Simulación interna de navigate para evitar errores de contexto <Router>
import { 
  Star, Clock, ChevronLeft, Filter, Search, ShieldCheck,
  FileText, CircleCheck, PlayCircle, Plus, MessageCircle, Menu, ExternalLink, ChevronRight, Monitor, MapPin, Check, Info,
  Award, BookOpen, Users, Globe, Share2, Tag,
  Facebook, Instagram, Linkedin, Mail, Heart,
  Home, User, Edit3, LayoutGrid, X, Briefcase as BriefcaseIcon,
  UploadCloud, Save, Loader2, Trash2, Download, Activity, AlertCircle, Sparkles, Building,
  Truck, Settings2, Shield, Smartphone, Send, CreditCard, Lock, Package
} from 'lucide-react';

// ==========================================
// DATOS
// ==========================================
const CATEGORIAS = ["Cirugía General", "Diagnóstico por Imágenes", "Gestión Veterinaria", "Clínica de Pequeños", "Dermatología", "Anestesiología"];
const MODALIDADES = ["Online", "Presencial", "Híbrido"];

const SEMINARIOS = [
  {
    id: 1,
    titulo: "Cirugía de Tejidos Blandos: Procedimientos Avanzados",
    marca: "Acare Veterinaria",
    logoMarca: "https://api.dicebear.com/7.x/initials/svg?seed=AV&backgroundColor=1A3D3D",
    imagen: "https://images.unsplash.com/photo-1576089238240-749e77163c44?auto=format&fit=crop&w=800&q=80",
    descripcion: "Técnicas innovadoras para resolución de patologías complejas en cavidad abdominal. Aprenderás desde la planificación pre-quirúrgica hasta el manejo post-operatorio crítico.",
    instructor: "Dr. Julián Martínez",
    nivel: "Intermedio",
    duracion: "12h 30m",
    modalidad: "Online",
    precio: 45000,
    precioOriginal: 55000,
    badge: "Más Vendido",
    categoria: "Cirugía General",
    rating: 4.8,
    reviews: 124,
    incluye: ["Certificado de validez nacional", "Material de estudio descargable", "Acceso de por vida"]
  },
  {
    id: 2,
    titulo: "Dermatología Clínica: De la Atopia a la Citología",
    marca: "VetLab Pro",
    logoMarca: "https://api.dicebear.com/7.x/initials/svg?seed=VP&backgroundColor=2D6A6A",
    imagen: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    descripcion: "Diagnóstico citológico y manejo terapéutico de las alergias más comunes. Un enfoque práctico para el consultorio diario.",
    instructor: "Dra. Sofía Galván",
    nivel: "Principiante",
    duracion: "8h 15m",
    modalidad: "Presencial",
    precio: 32000,
    precioOriginal: 38000,
    badge: "Nuevo",
    categoria: "Dermatología",
    rating: 5.0,
    reviews: 18,
    incluye: ["Kit de bienvenida", "Práctica en laboratorio", "Certificado físico"]
  }
];

const CATEGORIAS_INSUMOS = ["Ecografía y Diagnóstico", "Equipamiento Quirófano", "Instrumental y Descartables", "Software y Gestión", "Nutrición Clínica"];

const PROVEEDORES = [
  {
    id: 'p1',
    marca: "Distribuidora MedVet",
    logoMarca: "https://api.dicebear.com/7.x/initials/svg?seed=DM&backgroundColor=2D6A6A",
    imagenPortada: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    descripcionCorta: "Equipamiento de alta gama para diagnóstico por imágenes, ecógrafos portátiles e internación.",
    categorias: ["Ecografía y Diagnóstico", "Equipamiento Quirófano"],
    isPremium: true,
    ubicacion: "Buenos Aires, CABA",
    sitioWeb: "www.medvet.com.ar"
  },
  {
    id: 'p2',
    marca: "VetTech Anestesia",
    logoMarca: "https://api.dicebear.com/7.x/initials/svg?seed=VT&backgroundColor=1A3D3D",
    imagenPortada: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
    descripcionCorta: "Especialistas en monitores multiparamétricos, bombas de infusión y máquinas de anestesia veterinaria.",
    categorias: ["Equipamiento Quirófano"],
    isPremium: true,
    ubicacion: "Córdoba, Capital",
    sitioWeb: "www.vettech.com"
  },
  {
    id: 'p3',
    marca: "Insumos Sur",
    logoMarca: "https://api.dicebear.com/7.x/initials/svg?seed=IS&backgroundColor=475569",
    imagenPortada: "https://images.unsplash.com/photo-1576089238240-749e77163c44?auto=format&fit=crop&w=800&q=80",
    descripcionCorta: "Instrumental quirúrgico de acero alemán, descartables, suturas y ropa médica de alta durabilidad.",
    categorias: ["Instrumental y Descartables"],
    isPremium: false,
    ubicacion: "Rosario, Santa Fe",
    sitioWeb: "www.insumossur.com.ar"
  },
  {
    id: 'p4',
    marca: "SoftVet Cloud",
    logoMarca: "https://api.dicebear.com/7.x/initials/svg?seed=SV&backgroundColor=2D6A6A",
    imagenPortada: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    descripcionCorta: "Software de gestión integral en la nube. Historias clínicas, turnos y facturación automatizada.",
    categorias: ["Software y Gestión"],
    isPremium: false,
    ubicacion: "CABA, Buenos Aires",
    sitioWeb: "www.softvet.io"
  },
  {
    id: 'p5',
    marca: "NutriVet Pro",
    logoMarca: "https://api.dicebear.com/7.x/initials/svg?seed=NV&backgroundColor=eab308",
    imagenPortada: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80",
    descripcionCorta: "Dietas de prescripción veterinaria, suplementos y alimentación premium para casos clínicos complejos.",
    categorias: ["Nutrición Clínica"],
    isPremium: false,
    ubicacion: "Mendoza, Capital",
    sitioWeb: "www.nutrivet.com"
  }
];

export default function App() {
  const navigate = (path) => console.log('Mock navigate:', path);
  
  // Vistas principales
  const [view, setView] = useState('main'); // 'main' | 'detail'
  
  // Sistema de Tabs para la vista principal
  const [activeTab, setActiveTab] = useState('cursos'); // 'cursos' | 'proveedores'
  
  // Estados para Cursos
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState(null);
  const [modalidadesSeleccionadas, setModalidadesSeleccionadas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCourses, setVisibleCourses] = useState(6);
  
  // Estados para Proveedores
  const [proveedorSearchTerm, setProveedorSearchTerm] = useState('');
  const [proveedorFiltroCategoria, setProveedorFiltroCategoria] = useState(null);
  const [visibleProviders, setVisibleProviders] = useState(6);

  // Favoritos
  const [favoritos, setFavoritos] = useState([]);

  // UI States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bannerRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => { setIsNavbarScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (bannerRef.current) {
      const rect = bannerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const toggleModalidad = (mod) => {
    if (modalidadesSeleccionadas.includes(mod)) {
      setModalidadesSeleccionadas(modalidadesSeleccionadas.filter(m => m !== mod));
    } else {
      setModalidadesSeleccionadas([...modalidadesSeleccionadas, mod]);
    }
    // Resetear páginación al filtrar
    setVisibleCourses(6);
  };

  const handleCategoryFilter = (cat) => {
    setFiltroCategoria(cat);
    setVisibleCourses(6);
  }

  const handleProveedorCategoryFilter = (cat) => {
    setProveedorFiltroCategoria(cat);
    setVisibleProviders(6);
  }

  const handleCourseClick = (curso) => {
    setSelectedCourse(curso);
    setView('detail');
    window.scrollTo(0,0);
  };

  const toggleFavorito = (e, id) => {
    e.stopPropagation(); // Evita que se dispare el click de la tarjeta
    if (favoritos.includes(id)) {
      setFavoritos(favoritos.filter(favId => favId !== id));
    } else {
      setFavoritos([...favoritos, id]);
    }
  };

  // Filtrados
  const cursosFiltrados = SEMINARIOS.filter(curso => {
    const matchCategoria = !filtroCategoria || curso.categoria === filtroCategoria;
    const matchModalidad = modalidadesSeleccionadas.length === 0 || modalidadesSeleccionadas.includes(curso.modalidad);
    const matchBusqueda = !searchTerm || curso.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategoria && matchModalidad && matchBusqueda;
  });

  const proveedoresFiltrados = PROVEEDORES.filter(prov => {
    const matchCategoria = !proveedorFiltroCategoria || prov.categorias.includes(proveedorFiltroCategoria);
    const matchBusqueda = !proveedorSearchTerm || 
                          prov.marca.toLowerCase().includes(proveedorSearchTerm.toLowerCase()) || 
                          prov.descripcionCorta.toLowerCase().includes(proveedorSearchTerm.toLowerCase());
    return matchCategoria && matchBusqueda;
  }).sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return a.marca.localeCompare(b.marca);
  });

  const cursosMostrados = cursosFiltrados.slice(0, visibleCourses);
  const proveedoresMostrados = proveedoresFiltrados.slice(0, visibleProviders);

  // =========================================================================
  // COMPONENTES DE FILTROS (ASIDE IZQUIERDO)
  // =========================================================================
  const renderCursosFilters = () => (
    <div className="bg-white rounded-[32px] p-6 lg:p-8 border border-gray-100 shadow-sm sticky top-[100px] animate-in slide-in-from-left-4 duration-500">
      <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-[10px] uppercase tracking-[0.2em] mb-5 flex items-center gap-2 border-b border-gray-50 pb-2">
        <Filter className="w-3.5 h-3.5 text-[#2D6A6A]" /> Especialidades
      </h3>
      <ul className="space-y-3.5 mb-8">
        <li onClick={() => handleCategoryFilter(null)} className={`text-[13px] font-black font-['Montserrat'] tracking-tight cursor-pointer transition-colors ${!filtroCategoria ? 'text-[#2D6A6A]' : 'text-gray-300 hover:text-[#1A3D3D]'}`}>
          Todas
        </li>
        {CATEGORIAS.map(cat => (
          <li key={cat} onClick={() => handleCategoryFilter(cat)} className={`text-[13px] font-semibold cursor-pointer transition-colors ${filtroCategoria === cat ? 'text-[#2D6A6A]' : 'text-gray-400 hover:text-[#1A3D3D]'}`}>
            {cat}
          </li>
        ))}
      </ul>

      <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-[10px] uppercase tracking-[0.2em] mb-5 flex items-center gap-2 border-b border-gray-50 pb-2">
        <Monitor className="w-3.5 h-3.5 text-[#2D6A6A]" /> Modalidad
      </h3>
      <div className="space-y-3.5">
        {MODALIDADES.map(mod => (
          <div key={mod} onClick={() => toggleModalidad(mod)} className="flex items-center gap-3 group cursor-pointer">
            <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${modalidadesSeleccionadas.includes(mod) ? 'bg-[#2D6A6A] border-[#2D6A6A]' : 'border-gray-200 group-hover:border-[#2D6A6A]'}`}>
              {modalidadesSeleccionadas.includes(mod) && <Check className="w-3 h-3 text-white stroke-[4px]" />}
            </div>
            <span className={`text-[13px] font-semibold transition-colors ${modalidadesSeleccionadas.includes(mod) ? 'text-[#1A3D3D]' : 'text-gray-400 group-hover:text-[#1A3D3D]'}`}>
              {mod}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProveedoresFilters = () => (
    <div className="bg-white rounded-[32px] p-6 lg:p-8 border border-gray-100 shadow-sm sticky top-[100px] animate-in slide-in-from-left-4 duration-500">
      <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-[10px] uppercase tracking-[0.2em] mb-5 flex items-center gap-2 border-b border-gray-50 pb-2">
        <Filter className="w-3.5 h-3.5 text-[#2D6A6A]" /> Rubros de Insumos
      </h3>
      <ul className="space-y-3.5 mb-8">
        <li 
          onClick={() => handleProveedorCategoryFilter(null)}
          className={`text-[13px] font-black font-['Montserrat'] tracking-tight cursor-pointer transition-colors ${!proveedorFiltroCategoria ? 'text-[#2D6A6A]' : 'text-gray-300 hover:text-[#1A3D3D]'}`}
        >
          Todos los rubros
        </li>
        {CATEGORIAS_INSUMOS.map(cat => (
          <li 
            key={cat} 
            onClick={() => handleProveedorCategoryFilter(cat)}
            className={`text-[13px] font-semibold cursor-pointer transition-colors ${proveedorFiltroCategoria === cat ? 'text-[#2D6A6A]' : 'text-gray-400 hover:text-[#1A3D3D]'}`}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );

  // =========================================================================
  // COMPONENTES DE CONTENIDO (MAIN)
  // =========================================================================
  const renderCursosContent = () => (
    <div className="flex flex-col gap-5 md:gap-6 animate-in fade-in duration-500 w-full">
      
      {/* Buscador (Ancho Completo) */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" aria-hidden="true" />
        <input 
          type="search" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="¿Qué quieres aprender hoy? (ej. Cirugía, Dermatología...)" 
          className="bg-white border border-gray-100 rounded-full pl-11 pr-6 py-3.5 text-base md:text-sm font-medium focus:outline-none focus:border-[#2D6A6A] w-full shadow-sm placeholder:text-gray-400 transition-all" 
        />
      </div>

      {/* Banner Fino Publicitario (Ancho Completo) */}
      <article 
        ref={bannerRef}
        onMouseMove={handleMouseMove}
        className="bg-[#1A3D3D] px-5 py-4 md:px-8 md:py-5 rounded-[20px] md:rounded-[24px] text-left relative overflow-hidden group shadow-md flex flex-row items-center justify-between gap-3 md:gap-6 border border-white/5"
      >
        <div 
          className="absolute pointer-events-none transition-transform duration-300 ease-out bg-white opacity-5 rounded-full blur-3xl"
          style={{ width: '300px', height: '300px', left: mousePos.x - 150, top: mousePos.y - 150 }}
        />
        <div className="relative z-10 flex flex-col items-start gap-1">
          <h2 className="text-white font-['Montserrat'] font-black text-[13px] md:text-lg uppercase leading-none tracking-tight">
            ¿Querés publicitar tu marca?
          </h2>
          <p className="text-white/50 text-[10px] md:text-xs font-medium italic hidden sm:block mt-0.5">
            Llegá a miles de profesionales de todo el país
          </p>
        </div>
        <button 
          onClick={() => console.log('Ir a formulario de pauta')}
          className="bg-[#2D6A6A] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[10px] font-bold uppercase tracking-widest relative z-10 shadow-lg hover:bg-[#3d8b8b] transition-all whitespace-nowrap"
        >
          <span className="md:hidden">Más info</span>
          <span className="hidden md:inline">Más información</span>
        </button>
      </article>

      {/* Grid Interno: División entre Cursos e Insumos Destacados */}
      <div className="flex flex-col lg:grid lg:grid-cols-9 gap-5 lg:gap-8 w-full mt-2">
        
        {/* Grilla de Cursos (6 columnas) */}
        <div className="lg:col-span-6 flex flex-col gap-5 md:gap-6">
          {cursosMostrados.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {cursosMostrados.map(curso => (
                  <article key={curso.id} className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full relative">
                    <div className="h-36 md:h-40 relative overflow-hidden cursor-pointer shrink-0" onClick={() => handleCourseClick(curso)}>
                      <img src={curso.imagen} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={curso.titulo} />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-[#1A3D3D] text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                          {curso.badge}
                        </span>
                      </div>
                    </div>
                    
                    {/* Botón Favorito Flotante */}
                    <button 
                      onClick={(e) => toggleFavorito(e, `curso-${curso.id}`)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all z-10"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${favoritos.includes(`curso-${curso.id}`) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                    </button>

                    <div className="p-4 md:p-5 flex flex-col flex-grow text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <img src={curso.logoMarca} className="w-5 h-5 rounded-full border border-gray-100" alt={`${curso.marca} logo`} />
                        <span className="text-[9px] font-bold text-[#2D6A6A] uppercase tracking-widest truncate">{curso.marca}</span>
                      </div>
                      <h3 
                        onClick={() => handleCourseClick(curso)}
                        className="font-['Montserrat'] font-black text-[#1A3D3D] text-[13px] md:text-sm leading-tight mb-1 group-hover:text-[#2D6A6A] transition-colors line-clamp-2 cursor-pointer"
                      >
                        {curso.titulo}
                      </h3>
                      
                      {/* Reseñas (Estrellas) */}
                      <div className="flex items-center gap-1.5 mb-4">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-[11px] font-bold text-gray-700">{curso.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-[10px] font-medium text-gray-400">({curso.reviews})</span>
                      </div>
                      
                      {/* Metadatos (Modalidad y Duración) */}
                      <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold mb-4 mt-auto">
                        <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> {curso.modalidad}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {curso.duracion}</span>
                      </div>

                      <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-lg font-black text-[#1A3D3D] tracking-tight">${curso.precio.toLocaleString('es-AR')}</span>
                        <button aria-label="Ver detalles del curso" onClick={() => handleCourseClick(curso)} className="bg-[#1A3D3D] text-white p-2.5 rounded-xl hover:bg-[#2D6A6A] transition-all">
                          <ChevronRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Botón Cargar Más Cursos */}
              {cursosFiltrados.length > visibleCourses && (
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => setVisibleCourses(prev => prev + 6)}
                    className="px-6 py-3 bg-white border border-gray-200 text-[#1A3D3D] text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
                  >
                    Cargar más resultados <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-[32px] border border-gray-100 p-12 text-center flex flex-col items-center justify-center w-full h-full">
              <Search className="w-10 h-10 text-gray-200 mb-4" />
              <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-lg mb-2">No encontramos seminarios</h3>
              <p className="text-gray-500 text-sm">Prueba ajustando los filtros de búsqueda.</p>
            </div>
          )}
        </div>

        {/* ASIDE DERECHO: Insumos Destacados (3 columnas) */}
        <aside className="lg:col-span-3 flex flex-col gap-5 md:gap-6 animate-in fade-in duration-500">
          <div className="flex flex-col gap-1">
            <h2 className="font-['Montserrat'] font-black text-gray-400 text-[11px] md:text-xs uppercase tracking-[0.2em]">Insumos Destacados</h2>
            <button 
              onClick={() => { setActiveTab('proveedores'); window.scrollTo(0,0); }} 
              className="text-[#2D6A6A] font-bold text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1 w-fit mt-1 group"
            >
              Ver Directorio <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {PROVEEDORES.slice(0, 2).map(prov => (
              <article 
                key={prov.id} 
                className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-lg transition-all flex flex-col relative" 
                onClick={() => alert(`En el futuro esto abrirá el perfil de: ${prov.marca}`)}
              >
                <div className="h-24 relative bg-gray-50 border-b border-gray-100 shrink-0">
                  {prov.isPremium && (
                    <div className="absolute top-2 left-2 z-10">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-current drop-shadow-sm" />
                    </div>
                  )}
                  <img src={prov.imagenPortada} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={prov.marca} />
                  
                  {/* Logo superpuesto */}
                  <div className="absolute -bottom-4 left-3 z-20">
                    <img src={prov.logoMarca} className="w-10 h-10 rounded-[10px] bg-white border border-gray-100 shadow-sm object-cover" alt={`Logo ${prov.marca}`} />
                  </div>
                </div>

                {/* Botón Favorito Flotante */}
                <button 
                  onClick={(e) => toggleFavorito(e, `prov-${prov.id}`)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all z-20"
                >
                  <Heart className={`w-3.5 h-3.5 transition-colors ${favoritos.includes(`prov-${prov.id}`) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                </button>
                
                <div className="pt-6 px-4 pb-4 text-left flex flex-col flex-grow">
                  <h4 className="font-['Montserrat'] font-black text-[#1A3D3D] text-xs mb-1 uppercase leading-tight line-clamp-1">{prov.marca}</h4>
                  <span className="text-[8px] font-bold text-[#2D6A6A] uppercase tracking-[0.2em] block mb-2 truncate">
                    {prov.categorias[0]}
                  </span>
                  
                  <button className="mt-auto w-full py-2.5 bg-gray-50 text-[#1A3D3D] rounded-[10px] text-[9px] font-bold uppercase tracking-[0.2em] group-hover:bg-[#1A3D3D] group-hover:text-white transition-all flex items-center justify-center gap-1">
                    Ver Perfil
                  </button>
                </div>
              </article>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );

  const renderProveedoresContent = () => (
    <div className="flex flex-col gap-5 md:gap-6 animate-in fade-in duration-500 w-full">
      
      {/* Buscador */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-4 h-4" aria-hidden="true" />
        <input 
          type="search" 
          value={proveedorSearchTerm}
          onChange={(e) => setProveedorSearchTerm(e.target.value)}
          placeholder="Buscar marcas, equipamiento, software..." 
          className="bg-white border border-gray-100 rounded-full pl-11 pr-6 py-3.5 text-base md:text-sm font-medium focus:outline-none focus:border-[#2D6A6A] w-full shadow-sm placeholder:text-gray-400 transition-all" 
        />
      </div>

      {/* Banner Fino Publicitario (Versión Proveedores) */}
      <article 
        className="bg-[#1A3D3D] px-5 py-4 md:px-8 md:py-5 rounded-[20px] md:rounded-[24px] text-left relative overflow-hidden group shadow-md flex flex-row items-center justify-between gap-3 md:gap-6 border border-white/5"
      >
        <div className="relative z-10 flex flex-col items-start gap-1">
          <h2 className="text-white font-['Montserrat'] font-black text-[13px] md:text-lg uppercase leading-none tracking-tight">
            ¿Querés sumar tu empresa?
          </h2>
          <p className="text-white/50 text-[10px] md:text-xs font-medium italic hidden sm:block mt-0.5">
            Destacá tu marca en nuestro ecosistema veterinario.
          </p>
        </div>
        <button 
          onClick={() => console.log('Ir a formulario de contacto para empresas')}
          className="bg-[#2D6A6A] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[10px] font-bold uppercase tracking-widest relative z-10 shadow-lg hover:bg-[#3d8b8b] transition-all whitespace-nowrap"
        >
          <span className="md:hidden">Más info</span>
          <span className="hidden md:inline">Más información</span>
        </button>
      </article>

      {/* Grilla de Proveedores */}
      {proveedoresMostrados.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-2">
            {proveedoresMostrados.map(proveedor => (
              <article 
                key={proveedor.id} 
                onClick={() => alert(`En el futuro esto abrirá el perfil de: ${proveedor.marca}.`)}
                className={`bg-white rounded-[24px] overflow-hidden shadow-sm border flex flex-col h-full hover:shadow-xl transition-all cursor-pointer relative group ${
                  proveedor.isPremium ? 'border-[#2D6A6A]/30 ring-1 ring-[#2D6A6A]/10' : 'border-gray-100'
                }`}
              >
                {/* Etiqueta Premium */}
                {proveedor.isPremium && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#1A3D3D] text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 fill-current" /> Destacado
                    </span>
                  </div>
                )}

                {/* Botón Favorito Flotante */}
                <button 
                  onClick={(e) => toggleFavorito(e, `prov-${proveedor.id}`)}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all z-20"
                >
                  <Heart className={`w-4 h-4 transition-colors ${favoritos.includes(`prov-${proveedor.id}`) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                </button>

                {/* Imagen de Portada */}
                <div className="h-28 md:h-32 relative bg-gray-50 shrink-0">
                  <img src={proveedor.imagenPortada} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`Portada de ${proveedor.marca}`} />
                  {/* Logo */}
                  <div className="absolute -bottom-6 left-5 z-20">
                    <img 
                      src={proveedor.logoMarca} 
                      className="w-14 h-14 rounded-[12px] bg-white border-2 border-white shadow-md object-cover" 
                      alt={`Logo ${proveedor.marca}`} 
                    />
                  </div>
                </div>

                {/* Información del Perfil */}
                <div className="pt-10 px-5 pb-5 flex flex-col flex-grow text-left">
                  <h4 className="font-['Montserrat'] font-black text-[#1A3D3D] text-sm mb-1 uppercase leading-tight line-clamp-1 group-hover:text-[#2D6A6A] transition-colors">
                    {proveedor.marca}
                  </h4>
                  
                  {/* Categorías (Rubros) */}
                  <span className="text-[9px] font-bold text-[#2D6A6A] uppercase tracking-[0.2em] block mb-3 line-clamp-1">
                    {proveedor.categorias.join(' • ')}
                  </span>
                  
                  <p className="text-gray-500 text-xs font-medium leading-relaxed line-clamp-2 flex-grow mb-4">
                    {proveedor.descripcionCorta}
                  </p>
                  
                  {/* Meta Info: Ubicación */}
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold mb-5 border-t border-gray-50 pt-4 mt-auto">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {proveedor.ubicacion.split(',')[0]}</span>
                  </div>

                  <button className={`w-full py-3 rounded-[12px] text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    proveedor.isPremium 
                    ? 'bg-[#1A3D3D] text-white hover:bg-[#2D6A6A] shadow-md' 
                    : 'bg-gray-50 text-[#1A3D3D] border border-gray-200 group-hover:bg-[#1A3D3D] group-hover:text-white group-hover:border-[#1A3D3D]'
                  }`}>
                    Ver Perfil
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Botón Cargar Más Proveedores */}
          {proveedoresFiltrados.length > visibleProviders && (
            <div className="mt-4 flex justify-center">
              <button 
                onClick={() => setVisibleProviders(prev => prev + 6)}
                className="px-6 py-3 bg-white border border-gray-200 text-[#1A3D3D] text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
              >
                Cargar más resultados <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-[32px] border border-gray-100 p-12 text-center flex flex-col items-center justify-center w-full mt-2">
          <Building className="w-10 h-10 text-gray-200 mb-4" />
          <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-lg mb-2">No encontramos proveedores</h3>
          <p className="text-gray-500 text-sm">Intentá cambiar el rubro o el término de búsqueda.</p>
        </div>
      )}
    </div>
  );

  // =========================================================================
  // VISTA PRINCIPAL (TABS + CONTENIDO)
  // =========================================================================
  const renderMain = () => (
    <div className="flex flex-col pb-24">
      {/* ENCABEZADO Y TABS */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5 md:mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black font-['Montserrat'] text-[#1A3D3D] tracking-tight uppercase leading-none">
            Repertorio Clínico
          </h1>
          <p className="text-[#2D6A6A] text-[11px] md:text-[10px] font-bold uppercase tracking-[0.2em] mt-1.5">
            Ecosistema Veterinario
          </p>
        </div>

        {/* CONTROLES DE PESTAÑAS (TABS) */}
        <div className="flex bg-white p-1.5 rounded-[16px] md:rounded-full border border-gray-100 shadow-sm w-full md:w-auto overflow-x-auto">
          <button 
            onClick={() => setActiveTab('cursos')} 
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 md:py-3 rounded-[12px] md:rounded-full text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === 'cursos' ? 'bg-[#2D6A6A] text-white shadow-md' : 'text-gray-400 hover:text-[#1A3D3D] hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Seminarios
          </button>
          <button 
            onClick={() => setActiveTab('proveedores')} 
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 md:py-3 rounded-[12px] md:rounded-full text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === 'proveedores' ? 'bg-[#2D6A6A] text-white shadow-md' : 'text-gray-400 hover:text-[#1A3D3D] hover:bg-gray-50'
            }`}
          >
            <Building className="w-4 h-4" /> Marcas y Proveedores
          </button>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <div className="w-full flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-8">
        
        {/* ASIDE IZQUIERDO (3 Columnas) */}
        <aside className="hidden lg:flex lg:col-span-3 flex-col gap-6">
          {activeTab === 'cursos' ? renderCursosFilters() : renderProveedoresFilters()}
        </aside>

        {/* CONTENIDO CENTRAL (9 Columnas siempre, el grid interno se encarga de la división) */}
        <section className="lg:col-span-9 flex flex-col gap-6 w-full">
          {activeTab === 'cursos' ? renderCursosContent() : renderProveedoresContent()}
        </section>
        
      </div>
    </div>
  );

  // =========================================================================
  // VISTA DE DETALLE DE CURSO (Pantalla completa cuando seleccionas uno)
  // =========================================================================
  const renderDetail = () => {
    if (!selectedCourse) return null;
    return (
      <div className="max-w-[1000px] mx-auto animate-in fade-in duration-500 pb-24 text-center py-20">
         <button onClick={() => setView('main')} className="mx-auto flex items-center gap-2 text-[#2D6A6A] font-bold text-xs uppercase tracking-widest mb-4 hover:underline">
          <ChevronLeft className="w-4 h-4" /> Volver al ecosistema
         </button>
         <h1 className="text-4xl font-black text-[#1A3D3D] font-['Montserrat']">{selectedCourse.titulo}</h1>
         <p className="mt-4 text-gray-500 max-w-lg mx-auto">{selectedCourse.descripcion}</p>
      </div>
    )
  }

  return (
    <div className="bg-[#F4F7F7] min-h-screen font-['Inter'] antialiased relative">
      <nav className={`sticky top-0 w-full z-50 h-[80px] flex items-center px-6 md:px-12 lg:px-24 transition-all duration-300 print:hidden ${isNavbarScrolled ? 'bg-white/85 backdrop-blur-md shadow-md border-b border-gray-200' : 'bg-white border-b border-gray-100 shadow-sm'}`}>
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
          <button onClick={() => navigate('/')} className="text-[#1A3D3D] font-['Montserrat'] font-black text-2xl tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
            El Portal<span className="text-[#2D6A6A]">.</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-10 text-[11px] font-black text-gray-400 uppercase tracking-widest">
              <button className="text-[#1A3D3D] border-b-2 border-[#2D6A6A] pb-1 cursor-pointer" onClick={() => { setView('main'); window.scrollTo(0,0); }}>Ecosistema</button>
              <button onClick={() => navigate('/bolsa-de-trabajo')} className="hover:text-[#1A3D3D] cursor-pointer transition-colors">Empleos</button>
              <button onClick={() => navigate('/novedades')} className="hover:text-[#1A3D3D] cursor-pointer transition-colors">Novedades</button>
            </div>

            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-[#1A3D3D] hover:bg-[#F4F7F7] transition-all">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)}></div>
                  <nav className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(26,61,61,0.15)] border border-gray-100 overflow-hidden animate-in fade-in">
                    <div className="p-3">
                      <button onClick={() => { setView('main'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl"><LayoutGrid className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Repertorio Clínico</span></button>
                    </div>
                  </nav>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Paddings superiores achicados (pt-4 en lugar de pt-8) */}
      <main id="main-content" className="max-w-[1440px] mx-auto pt-5 px-6 md:px-12 lg:px-24">
        {view === 'main' ? renderMain() : renderDetail()}
      </main>
    </div>
  );
}