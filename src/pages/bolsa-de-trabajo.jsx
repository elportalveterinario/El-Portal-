import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ShieldCheck, CheckCircle2, Plus, MessageCircle, Menu, 
  ChevronRight, MapPin, Check, Award, Briefcase, Info, AlertTriangle, 
  Send, Stethoscope, GraduationCap, X, PersonStanding, RotateCcw, 
  ZoomIn, ZoomOut, Contrast, Palette, Type, Activity, Home, User, Sparkles,
  LayoutGrid, Edit3, Trash2, Mail, Loader2, ChevronLeft, Facebook, 
  Instagram, Linkedin, Globe, Heart, Filter, Clock, ChevronDown,
  CalendarDays, UserCheck, Building
} from 'lucide-react';

// ==========================================
// DATOS ESTÁTICOS (Bolsa de Trabajo)
// ==========================================
const PROVINCIAS = ["Buenos Aires", "CABA", "Córdoba", "Santa Fe", "Mendoza", "Neuquén", "Río Negro", "Tucumán", "Salta", "Entre Ríos", "Otra"];
const PUESTOS_TRABAJO = ["Clínico General", "Guardia / Urgencias", "Especialista (Interconsulta)", "Cirujano", "Ecografista", "Enfermero / Asistente", "Pasantía / Estudiante", "Laboratorio / Comercial", "Otro"];
const EXPERIENCIA_REQUERIDA = ["Sin experiencia (Estudiantes/Junior)", "1 a 3 años (Semi-Senior)", "Más de 3 años (Senior)", "Especialista Certificado"];

const OFERTAS_EMPLEO = [
  {
    id: 1,
    puesto: "Cirujano Tejidos Blandos (Interconsultas)",
    clinica: "Hospital Veterinario Norte",
    logoClinica: "https://api.dicebear.com/7.x/initials/svg?seed=HVN&backgroundColor=1A3D3D",
    provincia: "Buenos Aires",
    ciudad: "San Isidro",
    experiencia: "Más de 3 años (Senior)",
    tipoContacto: ["whatsapp"],
    contacto: "+5491112345678",
    fechaPublicacion: "Hace 2 días",
    diasRestantes: 28,
    descripcion: "Buscamos cirujano especializado en tejidos blandos para cubrir interconsultas programadas y urgencias quirúrgicas en nuestro hospital. Modalidad a convenir (porcentaje por cirugía o guardia pasiva). Contamos con un volumen alto de casos derivados.",
    requisitos: ["Matrícula provincial activa", "Experiencia comprobable en cirugías abdominales y torácicas", "Movilidad propia (excluyente)", "Disponibilidad para urgencias (deseable)"],
    equipamiento: ["Quirófano totalmente equipado", "Anestesia inhalatoria (Isofluorano)", "Monitor multiparamétrico", "Electrobisturí", "Bomba de infusión", "Personal de asistencia capacitado"],
    cursoRecomendado: {
      titulo: "Ecografía Abdominal Básica",
      modalidad: "Online",
      nivel: "Principiante",
      imagen: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
    }
  }
];

const PROFESIONALES_DISPONIBLES = [
  {
    id: 101,
    nombre: "Dr. Juan Pérez",
    especialidad: "Clínico General",
    provincia: "CABA",
    experiencia: "3 años",
    tiempo: "Part-time",
    momentoDia: "Mañana / Tarde",
    servicios: ["Guardias activas", "A domicilio"],
    buscando: "Busco cubrir turnos fijos en clínica de pequeños animales, 2 o 3 veces por semana.",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=150",
    diasRestantes: 5
  },
  {
    id: 102,
    nombre: "Dra. Ana López",
    especialidad: "Ecografista",
    provincia: "Buenos Aires",
    experiencia: "Especialista (+5 años)",
    tiempo: "Por turnos",
    momentoDia: "A convenir",
    servicios: ["Interconsultas programadas"],
    buscando: "Ofrezco servicio de ecografías (abdominal y cardio). Dispongo de equipo propio para trasladarme.",
    avatar: "https://images.unsplash.com/photo-1594824436998-df40ec5a1dc8?auto=format&fit=crop&q=80&w=150",
    diasRestantes: 12
  },
  {
    id: 103,
    nombre: "Vet. Carlos Gómez",
    especialidad: "Enfermero / Asistente",
    provincia: "Córdoba",
    experiencia: "1 año",
    tiempo: "Full-time",
    momentoDia: "Nocturno",
    servicios: ["Guardias nocturnas", "Internación"],
    buscando: "Busco puesto fijo para atención de internación y asistencia en quirófano de noche. Mucha predisposición.",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150",
    diasRestantes: 29
  }
];

// ==========================================
// COMPONENTE PRINCIPAL: BOLSA DE TRABAJO
// ==========================================
export default function BolsaTrabajo() {
  const [view, setView] = useState('list'); // 'list', 'detail', 'publish_job', 'publish_prof'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  
  // Estados de la lista, filtros y acordeones
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobSearchTerm, setJobSearchTerm] = useState('');
  const [searchTarget, setSearchTarget] = useState('ambos'); // 'ambos', 'ofertas', 'profesionales'
  const [provinciasSel, setProvinciasSel] = useState([]);
  const [puestosSel, setPuestosSel] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedProfId, setExpandedProfId] = useState(null); 
  
  // Estados de formularios
  const [jobFormStep, setJobFormStep] = useState(1);
  const [profFormStep, setProfFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [jobForm, setJobForm] = useState({
    clinica: '', provincia: 'Buenos Aires', ciudad: '', puesto: 'Clínico General', experiencia: 'Sin experiencia (Estudiantes/Junior)',
    descripcion: '', requisitos: [''], equipamiento: [''], tipoContacto: [], contactoEmail: '', contactoWhatsapp: ''
  });
  const [profForm, setProfForm] = useState({
    especialidad: 'Clínico General', experiencia: 'Sin experiencia (Estudiantes/Junior)', provincia: 'Buenos Aires',
    tiempo: 'Part-time', momentoDia: 'A convenir', servicios: [''], buscando: ''
  });

  const navigate = useNavigate();
  const footerRef = useRef(null);

  // Configuración de fuentes y scroll
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsNavbarScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funciones de filtrado
  const jobsFiltrados = OFERTAS_EMPLEO.filter(job => {
    const matchProvincia = provinciasSel.length === 0 || provinciasSel.includes(job.provincia);
    const matchPuesto = puestosSel.length === 0 || puestosSel.some(p => job.puesto.includes(p));
    const matchBusqueda = !jobSearchTerm || job.puesto.toLowerCase().includes(jobSearchTerm.toLowerCase()) || job.clinica.toLowerCase().includes(jobSearchTerm.toLowerCase());
    return matchProvincia && matchPuesto && matchBusqueda;
  });

  const profesionalesFiltrados = PROFESIONALES_DISPONIBLES.filter(prof => {
    const matchProvincia = provinciasSel.length === 0 || provinciasSel.includes(prof.provincia);
    const matchPuesto = puestosSel.length === 0 || puestosSel.some(p => prof.especialidad.includes(p));
    const matchBusqueda = !jobSearchTerm || prof.especialidad.toLowerCase().includes(jobSearchTerm.toLowerCase()) || prof.nombre.toLowerCase().includes(jobSearchTerm.toLowerCase());
    return matchProvincia && matchPuesto && matchBusqueda;
  });

  const toggleFilterArray = (setStateAction, value) => {
    setStateAction(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const handleJobClick = (job) => { setSelectedJob(job); setView('detail'); window.scrollTo(0,0); };

  // Funciones Formulario Clínica
  const handleJobFormChange = (field, value) => { setJobForm(prev => ({ ...prev, [field]: value })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: null })); };
  const toggleTipoContacto = (tipo) => {
    const current = [...jobForm.tipoContacto];
    if (current.includes(tipo)) handleJobFormChange('tipoContacto', current.filter(t => t !== tipo));
    else handleJobFormChange('tipoContacto', [...current, tipo]);
  };
  const updateArrayItem = (field, index, value) => { const newArray = [...jobForm[field]]; newArray[index] = value; handleJobFormChange(field, newArray); };
  const addArrayItem = (field) => handleJobFormChange(field, [...jobForm[field], '']);
  const removeArrayItem = (field, index) => handleJobFormChange(field, jobForm[field].filter((_, i) => i !== index));

  const validateJobStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!jobForm.clinica.trim()) newErrors.clinica = 'El nombre de la clínica es obligatorio.';
      if (!jobForm.ciudad.trim()) newErrors.ciudad = 'La ciudad/localidad es obligatoria.';
    }
    if (step === 2) {
      if (!jobForm.descripcion.trim()) newErrors.descripcion = 'La descripción de la oferta es obligatoria.';
      if (jobForm.requisitos.filter(i => i.trim()).length === 0) newErrors.requisitos = 'Agregá al menos un requisito.';
    }
    if (step === 3) {
      if (jobForm.tipoContacto.length === 0) newErrors.tipoContacto = 'Debés seleccionar al menos un método de contacto.';
      if (jobForm.tipoContacto.includes('email') && !jobForm.contactoEmail.trim()) newErrors.contactoEmail = 'Ingresá el email de contacto.';
      if (jobForm.tipoContacto.includes('whatsapp') && !jobForm.contactoWhatsapp.trim()) newErrors.contactoWhatsapp = 'Ingresá el número de WhatsApp.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitJobForm = () => {
    if (!validateJobStep(3)) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Tu oferta de empleo fue enviada a revisión! Se publicará por 30 días.");
      setView('list'); setJobFormStep(1); window.scrollTo(0,0);
    }, 2000);
  };

  // Funciones Formulario Profesional
  const handleProfFormChange = (field, value) => { setProfForm(prev => ({ ...prev, [field]: value })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: null })); };
  const updateProfArrayItem = (index, value) => { const newArray = [...profForm.servicios]; newArray[index] = value; handleProfFormChange('servicios', newArray); };
  const addProfArrayItem = () => handleProfFormChange('servicios', [...profForm.servicios, '']);
  const removeProfArrayItem = (index) => handleProfFormChange('servicios', profForm.servicios.filter((_, i) => i !== index));

  const validateProfStep = (step) => {
    const newErrors = {};
    if (step === 2) {
      if (!profForm.buscando.trim()) newErrors.buscando = 'Contanos brevemente qué estás buscando.';
      if (profForm.servicios.filter(i => i.trim()).length === 0) newErrors.servicios = 'Agregá al menos un servicio/disposición.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitProfForm = () => {
    if (!validateProfStep(2)) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Tu perfil de disponibilidad ya está visible para las clínicas! Expirará en 30 días si no lo renovás.");
      setView('list'); setProfFormStep(1); window.scrollTo(0,0);
    }, 2000);
  };

  // =========================================================
  // RENDER: 1. LISTA DE EMPLEOS
  // =========================================================
  const renderList = () => (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500 pb-24">
      
      {/* Header con Gradiente Escuro */}
      <header className="bg-gradient-to-br from-[#1A3D3D] via-[#1A3D3D] to-[#2D6A6A] rounded-[32px] p-8 md:p-14 text-center relative overflow-hidden shadow-xl border border-white/5">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#4DB6AC] opacity-10 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5 border border-white/10 shadow-sm">
            <Briefcase className="w-8 h-8 text-[#4DB6AC]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-['Montserrat'] text-white tracking-tighter uppercase leading-none mb-4">
            Bolsa de Trabajo
          </h1>
          <p className="text-white/70 text-sm md:text-base font-medium mb-8 max-w-lg mx-auto leading-relaxed">
            La red de empleo exclusiva para profesionales veterinarios. Conectá con tu próximo desafío o encontrá al especialista ideal para tu clínica.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <button 
              onClick={() => { setView('publish_job'); window.scrollTo(0,0); }}
              className="w-full sm:w-auto bg-[#4DB6AC] text-[#1A3D3D] px-6 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <Building className="w-4 h-4" /> Publicar Oferta de Clínica
            </button>
            <button 
              onClick={() => { setView('publish_prof'); window.scrollTo(0,0); }}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> Marcarme como Disponible
            </button>
          </div>
        </div>
      </header>

      {/* Barra de Búsqueda Flotante ("Píldora") con Selector de Búsqueda */}
      <div className="max-w-3xl mx-auto w-full relative z-20 -mt-12 px-4">
        <div className="bg-white rounded-[24px] p-2 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col md:flex-row items-center gap-2 relative z-30">
          
          {/* Selector Contextual */}
          <div className="w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-100 pr-2">
            <select 
              value={searchTarget} 
              onChange={(e) => setSearchTarget(e.target.value)}
              className="w-full bg-transparent border-none py-2.5 px-3 text-xs font-bold text-[#1A3D3D] focus:outline-none focus:ring-0 uppercase tracking-wider cursor-pointer"
            >
              <option value="ambos">Buscar en todo</option>
              <option value="ofertas">Ofertas de Clínicas</option>
              <option value="profesionales">Profesionales Disponibles</option>
            </select>
          </div>

          <div className="flex-1 w-full relative flex items-center">
            <Search className="absolute left-3 text-gray-300 w-4 h-4" />
            <input 
              type="search" 
              value={jobSearchTerm}
              onChange={(e) => setJobSearchTerm(e.target.value)}
              placeholder="Buscar especialidad, provincia o clínica..." 
              className="w-full bg-transparent border-none pl-10 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-0 text-[#1A3D3D] placeholder:text-gray-400" 
            />
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${showFilters ? 'bg-[#1A3D3D] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
          >
            <Filter className="w-3.5 h-3.5" /> Filtros {provinciasSel.length + puestosSel.length > 0 && `(${provinciasSel.length + puestosSel.length})`}
          </button>
        </div>

        {/* Panel Desplegable de Filtros */}
        {showFilters && (
          <div className="absolute top-full left-4 right-4 mt-4 bg-white rounded-[24px] p-6 border border-gray-100 shadow-xl z-20 animate-in fade-in slide-in-from-top-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-gray-50 pb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#2D6A6A]" /> Provincias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PROVINCIAS.map(p => (
                    <label key={p} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl border transition-all ${provinciasSel.includes(p) ? 'bg-[#2D6A6A]/10 border-[#2D6A6A]/30' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
                      <input type="checkbox" checked={provinciasSel.includes(p)} onChange={() => toggleFilterArray(setProvinciasSel, p)} className="w-3.5 h-3.5 accent-[#2D6A6A]" />
                      <span className={`text-xs font-semibold ${provinciasSel.includes(p) ? 'text-[#1A3D3D]' : 'text-gray-600'}`}>{p}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-[10px] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-gray-50 pb-2">
                  <Stethoscope className="w-3.5 h-3.5 text-[#2D6A6A]" /> Especialidad / Área
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PUESTOS_TRABAJO.map(p => (
                    <label key={p} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-xl border transition-all ${puestosSel.includes(p) ? 'bg-[#2D6A6A]/10 border-[#2D6A6A]/30' : 'bg-gray-50 border-gray-100 hover:bg-gray-100'}`}>
                      <input type="checkbox" checked={puestosSel.includes(p)} onChange={() => toggleFilterArray(setPuestosSel, p)} className="w-3.5 h-3.5 accent-[#2D6A6A]" />
                      <span className={`text-xs font-semibold ${puestosSel.includes(p) ? 'text-[#1A3D3D]' : 'text-gray-600'}`}>{p}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
               <button onClick={() => { setProvinciasSel([]); setPuestosSel([]); }} className="text-gray-400 hover:text-[#1A3D3D] font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5">
                 <RotateCcw className="w-3 h-3" /> Limpiar Filtros
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Grid Dinámica según el Target */}
      <div className={`grid gap-8 lg:gap-10 mt-6 relative z-10 ${searchTarget === 'ambos' ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto w-full'}`}>
        
        {/* Columna Izquierda: Instituciones Buscando */}
        {(searchTarget === 'ambos' || searchTarget === 'ofertas') && (
          <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="font-['Montserrat'] font-black text-[#1A3D3D] text-lg uppercase tracking-widest flex items-center gap-2">
                 <Building className="w-5 h-5 text-[#2D6A6A] hidden sm:block" /> Ofertas de Clínicas
              </h2>
              <span className="bg-gray-100 text-[#1A3D3D] text-[10px] font-bold px-2.5 py-1 rounded-md">{jobsFiltrados.length}</span>
            </div>
            
            {jobsFiltrados.length > 0 ? jobsFiltrados.map(job => (
              <article key={job.id} onClick={() => handleJobClick(job)} className="bg-white rounded-[20px] p-5 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#2D6A6A]/50 transition-all cursor-pointer flex gap-5 group">
                <div className="w-14 h-14 rounded-xl bg-gray-50 border border-gray-100 p-2 shrink-0 hidden sm:block">
                  <img src={job.logoClinica} alt={job.clinica} className="w-full h-full object-contain rounded-lg" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-[#E0F2F1] text-[#2D6A6A] text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">{job.fechaPublicacion}</span>
                    <span className="text-gray-400 text-[10px] font-bold flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.provincia}</span>
                  </div>
                  <h3 className="font-black text-[#1A3D3D] text-base group-hover:text-[#2D6A6A] transition-colors leading-tight mb-1">{job.puesto}</h3>
                  <p className="text-gray-500 text-xs font-medium mb-3">{job.clinica}</p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-3 border-t border-gray-50">
                    <div className="flex gap-2">
                      <span className="bg-gray-50 border border-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-md flex items-center gap-1.5"><GraduationCap className="w-3 h-3" /> {job.experiencia}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                   <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#2D6A6A] group-hover:translate-x-1 transition-all" />
                </div>
              </article>
            )) : (
              <div className="bg-white border border-gray-200 rounded-[20px] p-10 text-center flex flex-col items-center justify-center">
                 <Building className="w-8 h-8 text-gray-300 mb-3" />
                 <p className="text-gray-500 text-sm font-medium">No hay ofertas de clínicas que coincidan.</p>
              </div>
            )}
          </section>
        )}

        {/* Columna Derecha: Profesionales Disponibles */}
        {(searchTarget === 'ambos' || searchTarget === 'profesionales') && (
          <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="font-['Montserrat'] font-black text-[#2D6A6A] text-lg uppercase tracking-widest flex items-center gap-2">
                 <UserCheck className="w-5 h-5 text-[#1A3D3D] hidden sm:block" /> Profesionales Disponibles
              </h2>
              <span className="bg-[#E0F2F1] text-[#2D6A6A] text-[10px] font-bold px-2.5 py-1 rounded-md">{profesionalesFiltrados.length}</span>
            </div>

            {profesionalesFiltrados.length > 0 ? profesionalesFiltrados.map(prof => {
              const isExpanded = expandedProfId === prof.id;
              
              return (
              <article 
                key={prof.id} 
                onClick={() => setExpandedProfId(isExpanded ? null : prof.id)}
                className={`bg-white rounded-[20px] p-5 border transition-all cursor-pointer group ${isExpanded ? 'border-[#2D6A6A] shadow-md ring-2 ring-[#2D6A6A]/5' : 'border-gray-200 shadow-sm hover:shadow-md hover:border-[#2D6A6A]/40'}`}
              >
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-white shadow-sm shrink-0 overflow-hidden relative">
                    <img src={prof.avatar} alt={prof.nombre} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-10" title="Disponible"></div>
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-black text-[#1A3D3D] text-base leading-tight">{prof.nombre}</h3>
                      <span className="text-gray-400 text-[10px] font-bold flex items-center gap-1 shrink-0"><MapPin className="w-3 h-3" /> {prof.provincia}</span>
                    </div>
                    <p className="text-[#2D6A6A] text-xs font-bold mb-2.5">{prof.especialidad} • <span className="text-gray-500 font-medium">{prof.experiencia}</span></p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex gap-3 text-[10px] font-bold text-gray-500">
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {prof.tiempo}</span>
                        <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {prof.momentoDia}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido Expandible (Acordeón) */}
                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                   <div className="overflow-hidden">
                     <div className="bg-gray-50 rounded-[16px] p-4 border border-gray-100 pt-5">
                        <p className="text-[#1A3D3D] text-xs font-bold mb-3 flex items-center gap-1.5 uppercase tracking-widest"><Activity className="w-4 h-4 text-[#4DB6AC]"/> Servicios Ofrecidos</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {prof.servicios.map((s, idx) => (
                            <span key={idx} className="bg-white border border-gray-200 text-gray-600 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A6A]" /> {s}
                            </span>
                          ))}
                        </div>
                        
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D6A6A] rounded-full"></div>
                          <p className="text-gray-600 text-xs italic bg-white p-3.5 rounded-lg border border-gray-100 pl-4 shadow-sm">"{prof.buscando}"</p>
                        </div>
                     </div>
                     
                     {/* Botón hacia el Perfil */}
                     <button 
                       onClick={(e) => { e.stopPropagation(); alert(`Redirigiendo al perfil público verificado de ${prof.nombre}...`); }}
                       className="w-full mt-3 bg-white border border-[#2D6A6A] text-[#2D6A6A] py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#2D6A6A] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2 group/btn"
                     >
                       <User className="w-4 h-4" /> Ver perfil profesional <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                   </div>
                </div>
                
                <div className={`flex justify-center transition-all duration-300 ${isExpanded ? 'mt-3 border-t border-gray-100 pt-2' : 'mt-2'}`}>
                   <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#2D6A6A]' : 'group-hover:text-[#2D6A6A]'}`} />
                </div>
              </article>
              );
            }) : (
              <div className="bg-white border border-gray-200 rounded-[20px] p-10 text-center flex flex-col items-center justify-center">
                 <UserCheck className="w-8 h-8 text-gray-300 mb-3" />
                 <p className="text-gray-500 text-sm font-medium">No hay profesionales disponibles que coincidan.</p>
              </div>
            )}
          </section>
        )}
      </div>

    </div>
  );

  // =========================================================
  // RENDER: 2. DETALLE DE EMPLEO
  // =========================================================
  const renderDetail = () => {
    if (!selectedJob) return null;

    return (
      <article className="max-w-[1000px] mx-auto animate-in fade-in duration-500 pb-24">
        <button 
          onClick={() => setView('list')} 
          className="flex items-center gap-2 text-gray-400 hover:text-[#1A3D3D] font-bold text-[10px] uppercase tracking-[0.3em] mb-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver a la Bolsa de Trabajo
        </button>

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden mb-12 relative">
          <div className="bg-gray-50/50 p-8 md:p-12 border-b border-gray-100 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#2D6A6A]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
             <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl border border-gray-100 shadow-sm p-2 shrink-0 z-10">
               <img src={selectedJob.logoClinica} alt={selectedJob.clinica} className="w-full h-full object-contain rounded-xl" />
             </div>
             <div className="flex-1 z-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#E0F2F1] text-[#2D6A6A] text-[9px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest">{selectedJob.fechaPublicacion}</span>
                  <span className="text-gray-500 text-[10px] font-bold flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {selectedJob.ciudad}, {selectedJob.provincia}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A3D3D] leading-[1.1] mb-2 tracking-tight">
                  {selectedJob.puesto}
                </h1>
                <p className="text-lg text-gray-500 font-medium mb-6">{selectedJob.clinica}</p>
                
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold text-gray-700 shadow-sm">
                    <GraduationCap className="w-4 h-4 text-[#2D6A6A]" /> {selectedJob.experiencia}
                  </div>
                  {selectedJob.requisitos.some(r => r.toLowerCase().includes('matrícula')) && (
                    <div className="bg-[#2D6A6A]/10 px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-semibold text-[#1A3D3D]">
                      <CheckCircle2 className="w-4 h-4 text-[#2D6A6A]" /> Requiere Matrícula Activa
                    </div>
                  )}
                </div>
             </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-10">
              <section>
                <h3 className="text-xl font-black font-['Montserrat'] text-[#1A3D3D] mb-4">Descripción del puesto</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed font-medium whitespace-pre-line">
                  {selectedJob.descripcion}
                </p>
              </section>

              <section>
                <h3 className="text-xl font-black font-['Montserrat'] text-[#1A3D3D] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#4DB6AC]" /> Requisitos excluyentes
                </h3>
                <ul className="space-y-3">
                  {selectedJob.requisitos.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A3D3D] mt-2 shrink-0"></span>
                      <span className="text-[14px] text-gray-600 font-medium leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {selectedJob.equipamiento.length > 0 && selectedJob.equipamiento[0] !== '' && (
                <section className="bg-gray-50 p-6 rounded-[24px] border border-gray-100">
                  <h3 className="text-lg font-black font-['Montserrat'] text-[#1A3D3D] mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-[#2D6A6A]" /> Equipamiento disponible en clínica
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.equipamiento.map((eq, idx) => (
                      <span key={idx} className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                        {eq}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="lg:w-[320px] shrink-0">
              <div className="bg-[#1A3D3D] p-6 rounded-[24px] shadow-lg text-center relative overflow-hidden sticky top-28">
                 <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white opacity-5 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2"></div>
                 <h3 className="font-['Montserrat'] font-black text-white text-xl mb-2 relative z-10">Postularme ahora</h3>
                 <p className="text-white/70 text-xs font-medium mb-6 relative z-10">La clínica prefiere que la contacten mediante:</p>
                 
                 <div className="space-y-3 relative z-10">
                   {selectedJob.tipoContacto.includes('whatsapp') && (
                     <button className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2">
                       <MessageCircle className="w-5 h-5" /> Enviar WhatsApp
                     </button>
                   )}
                   {selectedJob.tipoContacto.includes('email') && (
                     <button className="w-full bg-white text-[#1A3D3D] py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                       <Send className="w-4 h-4" /> Enviar CV por Mail
                     </button>
                   )}
                 </div>

                 <div className="mt-6 pt-5 border-t border-white/10 text-left">
                   <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-bold mb-2 flex items-center gap-1.5">
                     <Info className="w-3 h-3" /> Condiciones de contratación
                   </p>
                   <p className="text-white/80 text-xs font-medium">Las condiciones económicas (porcentaje, sueldo fijo, viáticos) y contractuales se arreglan directamente por privado entre el profesional y la clínica.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-6 rounded-[20px] flex items-start gap-4 mb-12 text-gray-500 text-xs font-medium">
          <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
          <p>
            <strong className="text-gray-700">Aviso Legal:</strong> El Portal actúa exclusivamente como un canal de difusión gratuito para ofertas laborales de terceros. No intervenimos en el proceso de selección, contratación, negociación salarial ni somos responsables de las condiciones laborales acordadas. Toda postulación se realiza bajo la exclusiva responsabilidad del profesional y la institución oferente.
          </p>
        </div>
      </article>
    );
  };

  // =========================================================
  // RENDER: 3. FORMULARIO DE PUBLICACIÓN DE EMPLEO (CLÍNICA)
  // =========================================================
  const renderPublishJobForm = () => (
    <section className="max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <button 
          onClick={() => { setView('list'); setJobFormStep(1); setErrors({}); }} 
          className="flex items-center gap-2 text-gray-400 hover:text-[#1A3D3D] font-bold text-[10px] uppercase tracking-[0.3em] transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Cancelar publicación
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A3D3D] tracking-tight mb-3">Publicar Oferta Laboral</h1>
        <p className="text-gray-500 font-medium text-sm max-w-lg mx-auto">La difusión en El Portal es <strong className="text-[#2D6A6A]">100% gratuita</strong> para instituciones veterinarias con cuenta validada.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 p-6 flex items-center justify-between relative">
          <div className="absolute top-1/2 left-10 right-10 h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0 hidden md:block">
            <div className="h-full bg-[#4DB6AC] rounded-full transition-all duration-500" style={{ width: `${((jobFormStep - 1) / 2) * 100}%` }}></div>
          </div>
          {[1, 2, 3].map((step) => (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                jobFormStep === step ? 'bg-[#1A3D3D] text-[#4DB6AC] shadow-lg scale-110' : 
                jobFormStep > step ? 'bg-[#4DB6AC] text-[#1A3D3D]' : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}>
                {jobFormStep > step ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step}
              </div>
              <span className={`text-[8px] md:text-[10px] uppercase tracking-widest font-bold hidden md:block ${jobFormStep >= step ? 'text-[#1A3D3D]' : 'text-gray-400'}`}>
                {step === 1 ? 'Clínica' : step === 2 ? 'Puesto' : 'Contacto'}
              </span>
            </div>
          ))}
        </div>

        <div className="p-6 md:p-10">
          {jobFormStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-1">Datos de la Institución</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="clinica">Nombre de la Clínica / Hospital *</label>
                  <input id="clinica" type="text" value={jobForm.clinica} onChange={(e) => handleJobFormChange('clinica', e.target.value)} placeholder="Ej: Hospital Veterinario Norte" className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:bg-white text-[#1A3D3D] ${errors.clinica ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#2D6A6A]'}`} />
                  {errors.clinica && <p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.clinica}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Provincia *</label>
                    <select value={jobForm.provincia} onChange={(e) => handleJobFormChange('provincia', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A] focus:bg-white text-[#1A3D3D]">
                      {PROVINCIAS.filter(p=>p!=='Todas').map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2" htmlFor="ciudad">Ciudad / Zona *</label>
                    <input id="ciudad" type="text" value={jobForm.ciudad} onChange={(e) => handleJobFormChange('ciudad', e.target.value)} placeholder="Ej: San Isidro / Zona Norte" className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:bg-white text-[#1A3D3D] ${errors.ciudad ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#2D6A6A]'}`} />
                    {errors.ciudad && <p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.ciudad}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {jobFormStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-1">Detalles de la Búsqueda</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Puesto o Área *</label>
                    <select value={jobForm.puesto} onChange={(e) => handleJobFormChange('puesto', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A] focus:bg-white text-[#1A3D3D]">
                      {PUESTOS_TRABAJO.filter(p=>p!=='Todos').map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Experiencia Requerida *</label>
                    <select value={jobForm.experiencia} onChange={(e) => handleJobFormChange('experiencia', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A] focus:bg-white text-[#1A3D3D]">
                      {EXPERIENCIA_REQUERIDA.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Descripción del Puesto *</label>
                  <textarea value={jobForm.descripcion} onChange={(e) => handleJobFormChange('descripcion', e.target.value)} rows="3" className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:bg-white text-[#1A3D3D] resize-none ${errors.descripcion ? 'border-red-400' : 'border-gray-200'}`}></textarea>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Requisitos Excluyentes *</label>
                  <div className="space-y-3">
                    {jobForm.requisitos.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input type="text" value={item} onChange={(e) => updateArrayItem('requisitos', index, e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2D6A6A]" />
                        {jobForm.requisitos.length > 1 && <button onClick={() => removeArrayItem('requisitos', index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="w-5 h-5" /></button>}
                      </div>
                    ))}
                    <button onClick={() => addArrayItem('requisitos')} className="text-[#2D6A6A] font-bold text-xs uppercase tracking-widest mt-2 hover:bg-[#2D6A6A]/10 px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" /> Agregar requisito</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">Equipamiento <span className="text-gray-300 font-normal lowercase tracking-normal">(Opcional)</span></label>
                  <div className="space-y-3">
                    {jobForm.equipamiento.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input type="text" value={item} onChange={(e) => updateArrayItem('equipamiento', index, e.target.value)} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2D6A6A]" />
                        {jobForm.equipamiento.length > 1 && <button onClick={() => removeArrayItem('equipamiento', index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="w-5 h-5" /></button>}
                      </div>
                    ))}
                    <button onClick={() => addArrayItem('equipamiento')} className="text-[#2D6A6A] font-bold text-xs uppercase tracking-widest mt-2 hover:bg-[#2D6A6A]/10 px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" /> Agregar equipo</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {jobFormStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
               <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-1">Contacto y Condiciones</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Canal preferido de contacto *</label>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <button onClick={() => toggleTipoContacto('whatsapp')} className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${jobForm.tipoContacto.includes('whatsapp') ? 'border-[#25D366] bg-[#25D366]/5 text-[#1A3D3D]' : 'border-gray-100 text-gray-400'}`}>
                      <MessageCircle className={`w-8 h-8 ${jobForm.tipoContacto.includes('whatsapp') ? 'text-[#25D366]' : ''}`} /> <span className="font-bold text-sm">WhatsApp</span>
                    </button>
                    <button onClick={() => toggleTipoContacto('email')} className={`flex-1 p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${jobForm.tipoContacto.includes('email') ? 'border-[#2D6A6A] bg-[#2D6A6A]/5 text-[#1A3D3D]' : 'border-gray-100 text-gray-400'}`}>
                      <Mail className={`w-8 h-8 ${jobForm.tipoContacto.includes('email') ? 'text-[#2D6A6A]' : ''}`} /> <span className="font-bold text-sm">Email</span>
                    </button>
                  </div>
                  {errors.tipoContacto && <p className="text-red-500 text-[10px] font-bold mt-1.5 text-center">{errors.tipoContacto}</p>}
                </div>
                <div className="space-y-4">
                  {jobForm.tipoContacto.includes('whatsapp') && (
                    <div className="animate-in slide-in-from-top-2">
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Número de WhatsApp *</label>
                      <input type="text" value={jobForm.contactoWhatsapp} onChange={(e) => handleJobFormChange('contactoWhatsapp', e.target.value)} placeholder="Ej: +54 9 11 1234 5678" className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none text-[#1A3D3D] ${errors.contactoWhatsapp ? 'border-red-400' : 'border-gray-200'}`} />
                    </div>
                  )}
                  {jobForm.tipoContacto.includes('email') && (
                    <div className="animate-in slide-in-from-top-2">
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email *</label>
                      <input type="email" value={jobForm.contactoEmail} onChange={(e) => handleJobFormChange('contactoEmail', e.target.value)} placeholder="rrhh@tuclinica.com" className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-sm focus:outline-none text-[#1A3D3D] ${errors.contactoEmail ? 'border-red-400' : 'border-gray-200'}`} />
                    </div>
                  )}
                </div>
                
                {/* Expiration Notice */}
                <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-[16px] flex items-start gap-3 mt-8">
                  <CalendarDays className="w-5 h-5 text-yellow-600 shrink-0" />
                  <div>
                    <h4 className="text-yellow-800 text-xs font-bold mb-1">Duración de la publicación</h4>
                    <p className="text-yellow-800 text-xs font-medium leading-relaxed">
                      La oferta estará visible en la red por <strong className="font-bold">30 días</strong>. Al acercarse la fecha, te enviaremos un correo para renovarla o darla de baja si ya cubriste la posición.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 border-t border-gray-100 p-6 flex items-center justify-between">
          {jobFormStep > 1 ? <button onClick={() => { setJobFormStep(prev => prev - 1); setErrors({}); window.scrollTo(0,0); }} className="px-6 py-3.5 text-[#1A3D3D] font-bold text-[11px] uppercase tracking-widest hover:bg-gray-200 rounded-xl transition-all">Anterior</button> : <div></div>}
          {jobFormStep < 3 ? <button onClick={() => { if(validateJobStep(jobFormStep)){ setJobFormStep(prev=>prev+1); window.scrollTo(0,0); } }} className="px-8 py-3.5 bg-[#1A3D3D] text-[#4DB6AC] font-black text-[11px] uppercase tracking-widest hover:bg-[#2D6A6A] hover:text-white rounded-xl transition-all shadow-lg flex items-center gap-2">Siguiente <ChevronRight className="w-4 h-4" /></button> : 
            <button onClick={submitJobForm} disabled={isSubmitting} className="px-8 py-3.5 bg-[#4DB6AC] text-[#1A3D3D] font-black text-[11px] uppercase tracking-widest hover:bg-white border hover:border-[#4DB6AC] rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Procesando...</> : <><Send className="w-4 h-4" /> Publicar Oferta</>}
            </button>
          }
        </div>
      </div>
    </section>
  );

  // =========================================================
  // RENDER: 4. FORMULARIO DE PROFESIONAL (OFRECER SERVICIOS)
  // =========================================================
  const renderPublishProfForm = () => (
    <section className="max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <button 
          onClick={() => { setView('list'); setProfFormStep(1); setErrors({}); }} 
          className="flex items-center gap-2 text-gray-400 hover:text-[#1A3D3D] font-bold text-[10px] uppercase tracking-[0.3em] transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Cancelar
        </button>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A3D3D] tracking-tight mb-3">Marcar Disponibilidad</h1>
        <p className="text-gray-500 font-medium text-sm max-w-lg mx-auto">Completá esta mini-ficha para que las clínicas puedan encontrarte y contactarte. Tu perfil debe estar validado con matrícula vigente.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 p-6 flex items-center justify-between relative">
          <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0 hidden md:block">
            <div className="h-full bg-[#4DB6AC] rounded-full transition-all duration-500" style={{ width: `${((profFormStep - 1) / 1) * 100}%` }}></div>
          </div>
          {[1, 2].map((step) => (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2 mx-auto">
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                profFormStep === step ? 'bg-[#1A3D3D] text-[#4DB6AC] shadow-lg scale-110' : 
                profFormStep > step ? 'bg-[#4DB6AC] text-[#1A3D3D]' : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}>
                {profFormStep > step ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : step}
              </div>
              <span className={`text-[8px] md:text-[10px] uppercase tracking-widest font-bold hidden md:block ${profFormStep >= step ? 'text-[#1A3D3D]' : 'text-gray-400'}`}>
                {step === 1 ? 'Perfil Básico' : 'Disponibilidad'}
              </span>
            </div>
          ))}
        </div>

        <div className="p-6 md:p-10">
          {profFormStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-1">Tu perfil</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Especialidad *</label>
                    <select value={profForm.especialidad} onChange={(e) => handleProfFormChange('especialidad', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A]">
                      {PUESTOS_TRABAJO.filter(p=>p!=='Todos').map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Experiencia *</label>
                    <select value={profForm.experiencia} onChange={(e) => handleProfFormChange('experiencia', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A]">
                      {EXPERIENCIA_REQUERIDA.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Provincia de residencia/trabajo *</label>
                  <select value={profForm.provincia} onChange={(e) => handleProfFormChange('provincia', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A]">
                    {PROVINCIAS.filter(p=>p!=='Todas').map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {profFormStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-1">Tu Disponibilidad</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tiempo / Modalidad *</label>
                    <select value={profForm.tiempo} onChange={(e) => handleProfFormChange('tiempo', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A]">
                      <option value="Part-time">Part-time (Algunos días)</option>
                      <option value="Full-time">Full-time (Lunes a Viernes)</option>
                      <option value="Por turnos">Por turnos / Interconsultas</option>
                      <option value="Solo fines de semana">Solo fines de semana</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Franja Horaria *</label>
                    <select value={profForm.momentoDia} onChange={(e) => handleProfFormChange('momentoDia', e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A]">
                      <option value="Mañana">Mañana</option>
                      <option value="Tarde">Tarde</option>
                      <option value="Mañana / Tarde">Día Completo</option>
                      <option value="Nocturno">Guardia Nocturna</option>
                      <option value="A convenir">Horarios flexibles</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">¿Qué servicios ofreces específicamente? *</label>
                  <div className="space-y-3">
                    {profForm.servicios.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input type="text" value={item} onChange={(e) => updateProfArrayItem(index, e.target.value)} placeholder="Ej: Guardias activas, cirugías programadas, a domicilio..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2D6A6A]" />
                        {profForm.servicios.length > 1 && <button onClick={() => removeProfArrayItem(index)} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="w-5 h-5" /></button>}
                      </div>
                    ))}
                    <button onClick={addProfArrayItem} className="text-[#2D6A6A] font-bold text-xs uppercase tracking-widest mt-2 hover:bg-[#2D6A6A]/10 px-4 py-2 rounded-lg flex items-center gap-2"><Plus className="w-4 h-4" /> Agregar servicio</button>
                    {errors.servicios && <p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.servicios}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Contanos qué estás buscando (Tu "Pitch") *</label>
                  <textarea value={profForm.buscando} onChange={(e) => handleProfFormChange('buscando', e.target.value)} placeholder="Ej: Busco cubrir turnos fijos en clínica de pequeños animales, idealmente zona norte..." rows="3" className={`w-full bg-gray-50 border rounded-xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:bg-white resize-none ${errors.buscando ? 'border-red-400' : 'border-gray-200'}`}></textarea>
                  {errors.buscando && <p className="text-red-500 text-[10px] font-bold mt-1.5">{errors.buscando}</p>}
                </div>

                {/* Expiration Notice */}
                <div className="bg-blue-50 border border-blue-200 p-5 rounded-[16px] flex items-start gap-3 mt-8">
                  <CalendarDays className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="text-blue-800 text-xs font-bold mb-1">Renovación de Disponibilidad</h4>
                    <p className="text-blue-800 text-xs font-medium leading-relaxed">
                      Para asegurar que las clínicas vean datos reales, tu estado "Disponible" dura <strong className="font-bold">30 días</strong>. Pasado ese tiempo, tu tarjeta se ocultará automáticamente a menos que decidas renovarla con un clic.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 border-t border-gray-100 p-6 flex items-center justify-between">
          {profFormStep > 1 ? <button onClick={() => { setProfFormStep(prev => prev - 1); setErrors({}); window.scrollTo(0,0); }} className="px-6 py-3.5 text-[#1A3D3D] font-bold text-[11px] uppercase tracking-widest hover:bg-gray-200 rounded-xl transition-all">Anterior</button> : <div></div>}
          {profFormStep < 2 ? <button onClick={() => { setProfFormStep(prev=>prev+1); window.scrollTo(0,0); }} className="px-8 py-3.5 bg-[#1A3D3D] text-[#4DB6AC] font-black text-[11px] uppercase tracking-widest hover:bg-[#2D6A6A] hover:text-white rounded-xl transition-all shadow-lg flex items-center gap-2">Siguiente <ChevronRight className="w-4 h-4" /></button> : 
            <button onClick={submitProfForm} disabled={isSubmitting} className="px-8 py-3.5 bg-[#4DB6AC] text-[#1A3D3D] font-black text-[11px] uppercase tracking-widest hover:bg-white border hover:border-[#4DB6AC] rounded-xl transition-all shadow-lg flex items-center gap-2 disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Procesando...</> : <><Send className="w-4 h-4" /> Marcarme Disponible</>}
            </button>
          }
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-[#F4F7F7] min-h-screen font-['Inter'] antialiased relative">
      
      {/* NAVBAR */}
      <nav className={`sticky top-0 w-full z-50 h-[80px] flex items-center px-6 md:px-12 lg:px-24 transition-all duration-300 print:hidden ${isNavbarScrolled ? 'bg-white/85 backdrop-blur-md shadow-md border-b border-gray-200' : 'bg-white border-b border-gray-100 shadow-sm'}`}>
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
          <button onClick={() => navigate('/')} className="text-[#1A3D3D] font-['Montserrat'] font-black text-2xl tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
            El Portal<span className="text-[#2D6A6A]">.</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-10 text-[11px] font-black text-gray-400 uppercase tracking-widest">
              <button onClick={() => navigate('/ecosistema')} className="hover:text-[#1A3D3D] cursor-pointer transition-colors">Cursos</button>
              <button className="text-[#1A3D3D] border-b-2 border-[#2D6A6A] pb-1 cursor-pointer transition-colors" onClick={() => { setView('list'); window.scrollTo(0,0); }}>Empleos</button>
              <button onClick={() => { setView('publish_job'); window.scrollTo(0,0); }} className="bg-[#1A3D3D] text-white px-8 py-3 rounded-full hover:bg-[#2D6A6A] transition-all">Publicar</button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                aria-label={isMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
                aria-expanded={isMenuOpen}
                className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-[#1A3D3D] hover:bg-[#F4F7F7] transition-all active:scale-95"
              >
                {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(26,61,61,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-3">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 py-3 border-b border-gray-50 mb-2 text-left">Navegación</p>
                      <button onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><Home className="w-4 h-4 text-gray-400 group-hover:text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Inicio</span></button>
                      <button onClick={() => { navigate('/perfil'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><User className="w-4 h-4 text-[#2D6A6A]" /><span className="text-sm font-bold text-[#1A3D3D]">Mi Perfil Público</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/ecosistema'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><LayoutGrid className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Ecosistema</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/novedades'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Novedades</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { setView('list'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Briefcase className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Bolsa de Trabajo</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/editor'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Edit3 className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Ir al Editor</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* RENDERIZADO DEL MÓDULO */}
      <main id="main-content" className="max-w-[1440px] mx-auto pt-6 px-6 md:px-12 lg:px-24">
        {view === 'list' && renderList()}
        {view === 'detail' && renderDetail()}
        {view === 'publish_job' && renderPublishJobForm()}
        {view === 'publish_prof' && renderPublishProfForm()}
      </main>

      {/* FOOTER */}
      <footer ref={footerRef} className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden mt-12 pt-20 pb-12 text-left print:hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
        <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
            <div className="md:col-span-1 text-left">
              <button onClick={() => navigate('/')} className="text-white font-['Montserrat'] font-bold text-2xl mb-6 text-left leading-none cursor-pointer block hover:opacity-80 transition-opacity">El Portal<span className="text-white/40">.</span></button>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6 font-medium text-left">La red profesional exclusiva para medicina veterinaria de alta complejidad. Conectando talento con vocación.</p>
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook de El Portal" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Facebook className="w-4 h-4" /></a>
                <a href="#" aria-label="Instagram de El Portal" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-4 h-4" /></a>
                <a href="#" aria-label="Linkedin de El Portal" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-4 h-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Navegación</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><button onClick={() => navigate('/')} className="hover:text-white transition-colors text-left">Inicio</button></li>
                <li><button onClick={() => navigate('/perfil')} className="hover:text-white transition-colors text-left">Mi Perfil</button></li>
                <li><button onClick={() => navigate('/editor')} className="hover:text-white transition-colors text-left">Editor de Perfil</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Ecosistema</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><button onClick={() => navigate('/ecosistema')} className="hover:text-white transition-colors text-left">Cursos y Seminarios</button></li>
                <li><button onClick={() => navigate('/bolsa-de-trabajo')} className="hover:text-white transition-colors text-left">Bolsa de Trabajo</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Contacto</h4>
              <ul className="space-y-4 mb-8 text-white/40 text-sm leading-none">
                <li><a href="mailto:elportalveterinario.arg@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="w-4 h-4 shrink-0" /> <span>elportalveterinario.arg@gmail.com</span></a></li>
                <li className="flex items-center gap-3"><Globe className="w-4 h-4" /> elportal.vet</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.3em]">creado por Belén M. Arenas</p>
            <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium flex items-center gap-1.5 group cursor-default">
              <span>Hecho con</span>
              <Heart className="w-3 h-3 text-red-400/50 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300 fill-current" aria-hidden="true" />
              <span>en Argentina.</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] leading-none">Única plataforma veterinaria oficial</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}