import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, Info, AlertCircle, Save, X, Plus, Trash2, 
  ArrowUp, ArrowDown, MapPin, ShieldCheck, Check, Image as ImageIcon, ArrowLeft,
  Smartphone, Home, Mail, Award, ChevronDown, 
  ArrowRight, ChevronRight, Sparkles, Crop, Facebook, Instagram, Linkedin, Globe, ExternalLink, Heart,
  Menu, User, LayoutGrid, Edit, Briefcase
} from 'lucide-react';

// ==========================================
// COMPONENTES DE UI REUTILIZABLES
// ==========================================

const Tooltip = ({ text, isSection = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="group relative inline-flex items-center ml-2 cursor-help z-50"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsVisible(!isVisible); }}
    >
      {/* Icono unificado para todos */}
      <div className="bg-[#2D6A6A]/10 p-1 rounded-full border border-[#2D6A6A]/20 group-hover:bg-[#2D6A6A] transition-colors duration-300">
        <Info className="w-3 h-3 text-[#2D6A6A] group-hover:text-white transition-colors" />
      </div>

      <div className={`transition-all duration-300 absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 text-left leading-relaxed transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        {isSection ? (
           // Diseño "Insight Card" para secciones (Sin flecha, estilo tarjeta profesional)
           <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] relative">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A6A]"></div>
                <span className="text-[10px] font-black text-[#2D6A6A] tracking-wide">Importante</span>
             </div>
             <p className="text-sm text-gray-600 font-medium leading-relaxed">{text}</p>
           </div>
        ) : (
           // Diseño estándar oscuro para inputs
           <div className="bg-[#1A3D3D] text-white text-xs p-3 rounded-xl shadow-2xl relative">
             {text}
             <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A3D3D]"></div>
           </div>
        )}
      </div>
    </div>
  );
};

const InputGroup = ({ label, id, type = "text", placeholder, value, onChange, tooltip, error, required, maxLength, disabled, canTest }) => (
  <div className="mb-5 w-full">
    <label htmlFor={id} className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">
      {label} {required && <span className="text-red-400 ml-1">*</span>}
      {tooltip && <Tooltip text={tooltip} />}
    </label>
    <div className="relative">
      {type === "textarea" ? (
        <textarea
          id={id} value={value} onChange={onChange} placeholder={placeholder} maxLength={maxLength} rows="4" disabled={disabled}
          className={`w-full bg-gray-50/50 border ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#2D6A6A]'} rounded-2xl px-5 py-4 text-base font-medium focus:outline-none transition-all resize-none text-[#1A3D3D] disabled:opacity-50`}
        />
      ) : (
        <input
          id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
          className={`w-full bg-gray-50/50 border ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#2D6A6A]'} rounded-2xl px-5 py-3.5 text-base font-medium focus:outline-none transition-all text-[#1A3D3D] disabled:opacity-50 ${canTest && value ? 'pr-12' : ''}`}
        />
      )}
      {error && <AlertCircle className="w-4 h-4 text-red-400 absolute right-4 top-4" />}
      
      {canTest && (
        <a 
          href={value ? (value.startsWith('http') ? value : `https://${value}`) : '#'} 
          target="_blank" 
          rel="noreferrer"
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg border transition-all shadow-sm z-10 ${value ? 'bg-white border-gray-200 text-gray-400 hover:text-[#2D6A6A] hover:border-[#2D6A6A] cursor-pointer' : 'bg-gray-50 border-gray-100 text-gray-300 pointer-events-none'}`}
          title="Probar que el enlace funciona"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
    {error && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{error}</p>}
  </div>
);

const ToggleSwitch = ({ label, checked, onChange, tooltip }) => (
  <div className="flex items-center justify-between gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
    <div className="flex items-center flex-1">
      <span className="text-sm font-bold text-[#1A3D3D]">{label}</span>
      {tooltip && <Tooltip text={tooltip} />}
    </div>
    <button
      type="button" onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${checked ? 'bg-[#25D366]' : 'bg-gray-300'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

const Accordion = ({ title, children, defaultOpen = false, tooltip }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-[24px] mb-6 bg-white shadow-sm transition-all duration-300 group group-[.active-mobile]:border-[#2D6A6A]/30 group-[.active-mobile]:shadow-md">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-5 flex justify-between items-center bg-gray-50/30 hover:bg-gray-50 transition-colors rounded-[24px]">
        <div className="flex items-center text-left">
          <h3 className="font-bold text-[#1A3D3D] text-sm uppercase tracking-wider">{title}</h3>
          {tooltip && <Tooltip text={tooltip} isSection />}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default function Editor() { // <--- CORRECCIÓN: Cambiado de App a Editor
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "Dra. Clara Valdez",
    especialidad: "Cirugía de Tejidos Blandos",
    matricula: "12345",
    provincia: "Buenos Aires",
    bio: "Especialista en cirugía de tejidos blandos y traumatología con más de 12 años de experiencia. Mi enfoque se centra en técnicas mínimamente invasivas para garantizar una recuperación rápida.",
    foto: "https://images.unsplash.com/photo-1594824436998-ef22cc372134?auto=format&fit=crop&w=400&q=80",
    fotosPerfil: ["https://images.unsplash.com/photo-1594824436998-ef22cc372134?auto=format&fit=crop&w=400&q=80"],
    atiendeDomicilio: true,
    emailContacto: "contacto@claravaldez.com",
    instagram: "",
    linkedin: "",
    facebook: "",
    whatsappActivo: false,
    whatsappNum: "",
    trayectoria: [
      { id: 1, titulo: "Especialidad en Cirugía", desc: "UBA - 2015", extra: "Graduada con Diploma de Honor" }
    ],
    servicios: [
      { id: 1, titulo: "Cirugía Avanzada", desc: "Recuperación rápida en caninos." }
    ],
    casos: [
      { id: 1, nombre: "Luna", patologia: "Cirugía de Cadera", desc: "Recuperación exitosa de displasia severa.", fotos: ["https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80"] }
    ],
    zonas: [
      { 
        id: 1, 
        nombre: "Zona Oeste", 
        clinicas: [
          { id: 101, nombre: "Veterinaria Patitos", direccion: "Morón, Centro", linkMaps: "https://maps.google.com" }
        ] 
      }
    ]
  });

  const [errors, setErrors] = useState({});
  const [cropModal, setCropModal] = useState({ isOpen: false, imageSrc: null, target: null, caseId: null });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const footerRef = useRef(null);

  const provincias = ["Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"];

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'matricula') {
      const onlyNumbers = value.replace(/[^0-9-]/g, '');
      setFormData(prev => ({ ...prev, [id]: onlyNumbers }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: null }));
  };

  const handleFileSelect = (e, target, caseId = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCropModal({ isOpen: true, imageSrc: e.target.result, target, caseId });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = null; 
  };

  const saveCroppedImage = () => {
    if (cropModal.target === 'perfil') {
      setFormData(prev => ({ 
        ...prev, 
        foto: cropModal.imageSrc,
        fotosPerfil: prev.fotosPerfil.includes(cropModal.imageSrc) ? prev.fotosPerfil : [...prev.fotosPerfil, cropModal.imageSrc]
      }));
    } else if (cropModal.target === 'caso') {
      setFormData(prev => ({
        ...prev,
        casos: prev.casos.map(c => c.id === cropModal.caseId ? { ...c, fotos: [...c.fotos, cropModal.imageSrc] } : c)
      }));
    }
    setCropModal({ isOpen: false, imageSrc: null, target: null, caseId: null });
  };

  const deleteProfilePhoto = (photoUrl, e) => {
    e.stopPropagation();
    setFormData(prev => {
      const newHistory = prev.fotosPerfil.filter(p => p !== photoUrl);
      let newCurrent = prev.foto;
      if (prev.foto === photoUrl) {
        newCurrent = newHistory.length > 0 ? newHistory[newHistory.length - 1] : "";
      }
      return { ...prev, fotosPerfil: newHistory, foto: newCurrent };
    });
  };

  const handleArrayAdd = (listName, defaultObj) => {
    setFormData(prev => ({ ...prev, [listName]: [...prev[listName], { id: Date.now(), ...defaultObj }] }));
  };

  const handleArrayUpdate = (listName, id, field, value) => {
    setFormData(prev => ({ ...prev, [listName]: prev[listName].map(item => item.id === id ? { ...item, [field]: value } : item) }));
  };

  const handleArrayRemove = (listName, id) => {
    setFormData(prev => ({ ...prev, [listName]: prev[listName].filter(item => item.id !== id) }));
  };

  const handleArrayMove = (listName, index, direction) => {
    const newArr = [...formData[listName]];
    if (direction === 'up' && index > 0) {
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    } else if (direction === 'down' && index < newArr.length - 1) {
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    }
    setFormData(prev => ({ ...prev, [listName]: newArr }));
  };

  const removeCasoFoto = (casoId, fotoIndex) => {
    setFormData(prev => ({
      ...prev,
      casos: prev.casos.map(c => c.id === casoId ? { ...c, fotos: c.fotos.filter((_, i) => i !== fotoIndex) } : c)
    }));
  };

  const moveCasoFoto = (casoId, fotoIndex, direction) => {
    setFormData(prev => {
      const newCasos = [...prev.casos];
      const caso = newCasos.find(c => c.id === casoId);
      if (!caso) return prev;
      
      const newFotos = [...caso.fotos];
      if (direction === 'left' && fotoIndex > 0) {
        [newFotos[fotoIndex - 1], newFotos[fotoIndex]] = [newFotos[fotoIndex], newFotos[fotoIndex - 1]];
      } else if (direction === 'right' && fotoIndex < newFotos.length - 1) {
        [newFotos[fotoIndex + 1], newFotos[fotoIndex]] = [newFotos[fotoIndex], newFotos[fotoIndex + 1]];
      }
      
      caso.fotos = newFotos;
      return { ...prev, casos: newCasos };
    });
  };

  const addClinicaToZona = (zonaId) => {
    setFormData(prev => ({
      ...prev,
      zonas: prev.zonas.map(z => z.id === zonaId ? {
        ...z, clinicas: [...z.clinicas, { id: Date.now(), nombre: "", direccion: "", linkMaps: "" }]
      } : z)
    }));
  };

  const updateClinica = (zonaId, clinicaId, field, value) => {
    setFormData(prev => ({
      ...prev,
      zonas: prev.zonas.map(z => z.id === zonaId ? {
        ...z, clinicas: z.clinicas.map(c => c.id === clinicaId ? { ...c, [field]: value } : c)
      } : z)
    }));
  };

  const removeClinica = (zonaId, clinicaId) => {
    setFormData(prev => ({
      ...prev,
      zonas: prev.zonas.map(z => z.id === zonaId ? {
        ...z, clinicas: z.clinicas.filter(c => c.id !== clinicaId)
      } : z)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.especialidad.trim()) newErrors.especialidad = "La especialidad es requerida.";
    if (!formData.matricula.trim()) newErrors.matricula = "La matrícula es requerida.";
    if (!formData.emailContacto.trim()) newErrors.emailContacto = "El email es requerido.";
    if (formData.whatsappActivo && !formData.whatsappNum.trim()) newErrors.whatsappNum = "Debes ingresar tu número si activas WhatsApp.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Sanitización de URLs: Si falta el protocolo, agregamos https://
      const sanitizeUrl = (url) => {
        if (!url) return "";
        return url.startsWith('http') ? url : `https://${url}`;
      };

      setFormData(prev => ({
        ...prev,
        instagram: sanitizeUrl(prev.instagram),
        linkedin: sanitizeUrl(prev.linkedin),
        facebook: sanitizeUrl(prev.facebook)
      }));

      alert("¡Perfil guardado con éxito! (Simulación)");
    }
  };

  const charsLeft = 350 - formData.bio.length;
  const isBioWarning = charsLeft <= 15;

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Inyectar Favicon (Escudo Verde)
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 18 85 V 45 A 32 32 0 0 1 82 45 V 85' stroke='%231A3D3D' stroke-width='12' stroke-linecap='round' fill='none'/%3E%3Cpath d='M 38 85 V 55 A 12 12 0 0 1 62 55 V 85' stroke='%232D6A6A' stroke-width='12' stroke-linecap='round' fill='none'/%3E%3C/svg%3E";
    document.head.appendChild(favicon);
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(favicon);
    };
  }, []);

  return (
    <div className="bg-[#F4F7F7] min-h-screen font-['Inter'] antialiased text-left text-[#1A3D3D] selection:bg-[#2D6A6A] selection:text-white relative">
      {/* MODAL DE RECORTE (Crop Overlay) */}
      {cropModal.isOpen && (
        <div className="fixed inset-0 bg-[#1A3D3D]/90 z-[99999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold font-['Montserrat'] text-xl text-[#1A3D3D]">Encuadre de Imagen</h3>
                <p className="text-xs text-gray-500 mt-1">Ajusta tu foto antes de publicarla.</p>
              </div>
              <button onClick={() => setCropModal({ isOpen: false, imageSrc: null, target: null, caseId: null })} className="p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-[#F4F7F7] p-8 flex justify-center items-center relative overflow-hidden h-[400px]">
              <img src={cropModal.imageSrc} alt="Para recortar" className="max-w-full max-h-full object-contain opacity-50" />
              <div className={`absolute border-2 border-dashed border-[#2D6A6A] shadow-[0_0_0_9999px_rgba(0,0,0,0.4)] ${cropModal.target === 'perfil' ? 'w-48 h-48 rounded-full' : 'w-64 h-48 rounded-xl'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Crop className="w-8 h-8 text-white opacity-50 drop-shadow-md" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white flex justify-end gap-3">
              <button onClick={() => setCropModal({ isOpen: false, imageSrc: null, target: null, caseId: null })} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm">Cancelar</button>
              <button onClick={saveCroppedImage} className="px-8 py-3 rounded-xl font-bold bg-[#1A3D3D] text-white hover:bg-[#2D6A6A] transition-colors shadow-lg text-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> Aplicar Recorte
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR EDITOR */}
      <nav className="fixed top-0 w-full z-40 h-[70px] bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center px-8 md:px-10 shadow-sm">
        <div className="max-w-[1100px] w-full mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A3D3D] rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div className="font-['Montserrat'] font-extrabold text-lg tracking-tight">
              Editor<span className="text-[#2D6A6A]">.</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-gray-400 hidden sm:block">Guardado auto</span>
            <Check className="w-4 h-4 text-[#25D366] hidden sm:block" />

            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-[#1A3D3D] hover:bg-[#F4F7F7] transition-all active:scale-95">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(26,61,61,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-3">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 py-3 border-b border-gray-50 mb-2 text-left">Navegación</p>
                      <button onClick={() => { navigate('/inicio'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><Home className="w-4 h-4 text-gray-400 group-hover:text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Inicio</span></button>
                      <button onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><Info className="w-4 h-4 text-gray-400 group-hover:text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Entrada</span></button>
                      <button onClick={() => { navigate('/perfil'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><User className="w-4 h-4 text-[#2D6A6A]" /><span className="text-sm font-bold text-[#1A3D3D]">Mi Perfil Público</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/ecosistema'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><LayoutGrid className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Repertorio Clínico</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/novedades'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Novedades</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/bolsa-de-trabajo'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Briefcase className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Bolsa de Trabajo</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/editor'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Edit className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Ir al Editor</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* AJUSTE DE PADDING: pt-8 en lugar de pt-[100px] porque ahora es sticky */}
      <div className="pt-[100px] max-w-[1100px] mx-auto px-8 md:px-10 flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* ========================================== */}
        {/* COLUMNA IZQUIERDA: FORMULARIO MAESTRO */}
        {/* ========================================== */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6 relative z-10">
          
          <div className="mb-2">
            <h1 className="text-3xl font-black font-['Montserrat'] uppercase tracking-tight mb-2 text-[#1A3D3D]">Configurar Perfil</h1>
            <p className="text-sm text-gray-500">Actualizá tu información para que te encuentren en El Portal.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* 1. FOTO Y DATOS PERSONALES */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 relative overflow-visible group group-[.active-mobile]:shadow-md group-[.active-mobile]:border-[#2D6A6A]/20 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1A3D3D] to-[#2D6A6A]"></div>
              <h2 className="font-black text-sm uppercase tracking-[0.2em] text-[#1A3D3D] mb-6">Identidad Profesional</h2>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8">
                <div className="relative group cursor-pointer flex-shrink-0">
                  <label htmlFor="perfil-upload" className={`w-32 h-32 rounded-[28px] overflow-hidden border-2 border-dashed ${formData.foto ? 'border-transparent' : 'border-gray-200 group-hover:border-[#2D6A6A]'} transition-all flex items-center justify-center bg-gray-50 relative block cursor-pointer`}>
                    {formData.foto ? (
                      <>
                        <img src={formData.foto} alt="Preview" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                          <Crop className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-gray-400 group-hover:text-[#2D6A6A]">
                        <Camera className="w-8 h-8 mb-2" />
                <span className="text-xs font-bold uppercase tracking-widest">Subir</span>
                      </div>
                    )}
                  </label>
                  <input type="file" id="perfil-upload" className="hidden" onChange={(e) => handleFileSelect(e, 'perfil')} accept="image/*" />
                </div>
                <div className="flex-1 text-center sm:text-left pt-2">
                  <h3 className="text-sm font-bold text-[#1A3D3D] mb-2 uppercase tracking-wide flex items-center justify-center sm:justify-start">
                    Fotografía <span className="text-red-400 ml-1">*</span>
                    <Tooltip text="Usa una foto vertical o cuadrada. Una buena iluminación transmite más confianza a los tutores y colegas." />
                  </h3>
          <p className="text-sm text-gray-500 mb-4 leading-relaxed">Sube una imagen frontal, iluminada y profesional. (Formato JPG o PNG).</p>
                  
                  {/* Mini Galería de Fotos de Perfil */}
                  {formData.fotosPerfil && formData.fotosPerfil.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-2">
                      {formData.fotosPerfil.map((url, idx) => (
                        <div 
                          key={idx} 
                          className={`relative w-12 h-12 rounded-lg overflow-hidden cursor-pointer border-2 transition-all group ${formData.foto === url ? 'border-[#2D6A6A] ring-2 ring-[#2D6A6A]/20' : 'border-gray-200 hover:border-gray-300'}`}
                          onClick={() => setFormData(prev => ({ ...prev, foto: url }))}
                        >
                          <img src={url} alt="Historial" className="w-full h-full object-cover" />
                          <button 
                            onClick={(e) => deleteProfilePhoto(url, e)}
                            className="absolute top-0.5 right-0.5 bg-white/90 text-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
                            title="Eliminar foto"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <InputGroup label="Nombre Completo" id="nombre" value={formData.nombre} onChange={handleChange} placeholder="Ej: Dra. Clara Valdez" required error={errors.nombre} tooltip="Asegúrate de usar correctamente las mayúsculas al inicio de tu nombre y apellido." />
                <InputGroup label="Especialidad" id="especialidad" value={formData.especialidad} onChange={handleChange} placeholder="Ej: Cirugía General" required error={errors.especialidad} tooltip="Escribe tu título principal. Es lo primero que verán los usuarios bajo tu nombre." />
                <InputGroup label="Matrícula" type="text" id="matricula" value={formData.matricula} onChange={handleChange} placeholder="Ej: 12345" tooltip="Ingresa únicamente los números de tu matrícula profesional." error={errors.matricula} required />
                
                <div className="mb-5">
                  <label htmlFor="provincia" className="flex items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1">Provincia Base <span className="text-red-400 ml-1">*</span></label>
                  <select id="provincia" value={formData.provincia} onChange={handleChange} className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-[#2D6A6A] transition-all text-[#1A3D3D] appearance-none cursor-pointer">
                    <option value="" disabled>Seleccionar provincia...</option>
                    {provincias.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* 2. SOBRE MÍ */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 group group-[.active-mobile]:shadow-md group-[.active-mobile]:border-[#2D6A6A]/20 transition-all">
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-black text-sm uppercase tracking-[0.2em] text-[#1A3D3D] flex items-center">
                  Sobre Mí
                  <Tooltip text="Resume tu experiencia y pasión. Tienes 350 caracteres para contar qué te hace especial en tu rubro." isSection />
                </h2>
                <span className={`text-xs font-bold ${isBioWarning ? 'text-red-500 animate-pulse' : 'text-gray-400'}`}>
                  {formData.bio.length} / 350
                </span>
              </div>
              <InputGroup type="textarea" label="Resumen Profesional" id="bio" value={formData.bio} onChange={handleChange} maxLength={350} placeholder="Cuenta brevemente tu experiencia..." />
            </div>

            {/* 3. TRAYECTORIA ACADÉMICA */}
            <Accordion title="Títulos y Trayectoria" defaultOpen={false} tooltip="Los títulos que agregues se mostrarán en formato de línea de tiempo en tu perfil público.">
              <p className="text-sm text-gray-500 mb-6 font-medium">Añade tus especializaciones. Usa las flechas para reordenar la importancia.</p>
              <div className="space-y-4">
                {formData.trayectoria.map((item, index) => (
                  <div key={item.id} className="flex gap-3 items-start bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group transition-all group-[.active-mobile]:bg-white group-[.active-mobile]:shadow-sm">
                    <div className="flex flex-col gap-1 mt-1">
                      <button type="button" onClick={() => handleArrayMove('trayectoria', index, 'up')} disabled={index === 0} className="p-1 text-gray-300 hover:text-[#1A3D3D] disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                      <button type="button" onClick={() => handleArrayMove('trayectoria', index, 'down')} disabled={index === formData.trayectoria.length - 1} className="p-1 text-gray-300 hover:text-[#1A3D3D] disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input type="text" placeholder="Ej: Posgrado en Cirugía" value={item.titulo} onChange={(e) => handleArrayUpdate('trayectoria', item.id, 'titulo', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:border-[#2D6A6A] outline-none font-bold text-[#1A3D3D]" />
                        <input type="text" placeholder="Institución y Año (Ej: UBA - 2020)" value={item.desc} onChange={(e) => handleArrayUpdate('trayectoria', item.id, 'desc', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:border-[#2D6A6A] outline-none" />
                      </div>
                      <input type="text" placeholder="Información adicional opcional (Ej: Graduada con Honores)" value={item.extra || ""} onChange={(e) => handleArrayUpdate('trayectoria', item.id, 'extra', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-500 focus:border-[#2D6A6A] outline-none italic" />
                    </div>
                    <button type="button" onClick={() => handleArrayRemove('trayectoria', item.id)} className="mt-1 p-2 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => handleArrayAdd('trayectoria', { titulo: "", desc: "", extra: "" })} className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2D6A6A] hover:bg-gray-50 py-2.5 px-4 rounded-xl transition-colors border border-[#2D6A6A]/20 border-dashed">
                <Plus className="w-4 h-4" /> Agregar Diploma
              </button>
            </Accordion>

            {/* 4. ACTUALMENTE (SERVICIOS) */}
            <Accordion title="Servicios Actuales" defaultOpen={false}>
              <p className="text-sm text-gray-500 mb-6 font-medium">¿Qué servicios médicos o consultorías ofreces hoy?</p>
              <div className="space-y-4">
                {formData.servicios.map((item, index) => (
                  <div key={item.id} className="flex gap-3 items-start bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group transition-all group-[.active-mobile]:bg-white group-[.active-mobile]:shadow-sm">
                    <div className="flex flex-col gap-1 mt-1">
                      <button type="button" onClick={() => handleArrayMove('servicios', index, 'up')} disabled={index === 0} className="p-1 text-gray-300 hover:text-[#1A3D3D] disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                      <button type="button" onClick={() => handleArrayMove('servicios', index, 'down')} disabled={index === formData.servicios.length - 1} className="p-1 text-gray-300 hover:text-[#1A3D3D] disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                      <input type="text" placeholder="Nombre del servicio (Ej: Cirugía Preventiva)" value={item.titulo} onChange={(e) => handleArrayUpdate('servicios', item.id, 'titulo', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:border-[#2D6A6A] outline-none font-bold text-[#1A3D3D]" />
                      <textarea placeholder="Breve descripción del servicio..." value={item.desc} onChange={(e) => handleArrayUpdate('servicios', item.id, 'desc', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base focus:border-[#2D6A6A] outline-none resize-none" rows="2" />
                    </div>
                    <button type="button" onClick={() => handleArrayRemove('servicios', item.id)} className="mt-1 p-2 text-gray-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => handleArrayAdd('servicios', { titulo: "", desc: "" })} className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2D6A6A] hover:bg-gray-50 py-2.5 px-4 rounded-xl transition-colors border border-[#2D6A6A]/20 border-dashed">
                <Plus className="w-4 h-4" /> Agregar Actividad
              </button>
            </Accordion>

            {/* 5. CASOS DE ÉXITO (Múltiples Fotos) */}
            <Accordion title="Casos de Éxito" defaultOpen={false} tooltip="Los casos reales con fotos del antes y después generan muchísima confianza. Puedes subir varias fotos por caso.">
              <p className="text-sm text-gray-500 mb-6 font-medium">Sube fotos clínicas y describe el desafío. (Máximo 500 caracteres).</p>
              <div className="space-y-6">
                {formData.casos.map((caso, index) => (
                  <div key={caso.id} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 flex flex-col gap-4 relative group transition-all group-[.active-mobile]:bg-white group-[.active-mobile]:shadow-sm">
                    <div className="flex justify-between items-center border-b border-gray-200/50 pb-3 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Caso #{index + 1}</span>
                      <button type="button" onClick={() => handleArrayRemove('casos', caso.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-5">
                      <div className="w-full md:w-40 flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Galería Visual</label>
                        <div className="flex flex-wrap gap-2">
                          {caso.fotos.map((imgUrl, fIdx) => (
                            <div key={fIdx} className="w-12 h-12 bg-white rounded-lg border border-gray-200 overflow-hidden relative group">
                              <img src={imgUrl} className="w-full h-full object-cover" alt="Thumb" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                <button type="button" onClick={() => removeCasoFoto(caso.id, fIdx)} className="text-red-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                                <div className="flex gap-1">
                                  <button type="button" onClick={() => moveCasoFoto(caso.id, fIdx, 'left')} disabled={fIdx === 0} className="text-white disabled:opacity-30">
                                    <ArrowLeft className="w-3 h-3" />
                                  </button>
                                  <button type="button" onClick={() => moveCasoFoto(caso.id, fIdx, 'right')} disabled={fIdx === caso.fotos.length - 1} className="text-white disabled:opacity-30"><ArrowRight className="w-3 h-3" /></button>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <label htmlFor={`file-caso-${caso.id}`} className="w-12 h-12 bg-white rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#2D6A6A] hover:border-[#2D6A6A] cursor-pointer transition-colors">
                            <Plus className="w-5 h-5" />
                          </label>
                          <input type="file" id={`file-caso-${caso.id}`} className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'caso', caso.id)} />
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex gap-3">
                          <input type="text" placeholder="Nombre (Ej: Luna)" value={caso.nombre} onChange={(e) => handleArrayUpdate('casos', caso.id, 'nombre', e.target.value)} className="w-1/3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#2D6A6A] outline-none font-bold" />
                          <input type="text" placeholder="Tag Médico (Ej: Displasia)" value={caso.patologia} onChange={(e) => handleArrayUpdate('casos', caso.id, 'patologia', e.target.value)} className="w-2/3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#2D6A6A] outline-none text-[#2D6A6A]" />
                        </div>
                        <div className="relative">
                          <textarea placeholder="Describe el desafío médico y cómo lo resolviste..." maxLength={500} value={caso.desc} onChange={(e) => handleArrayUpdate('casos', caso.id, 'desc', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-[#2D6A6A] outline-none resize-none pb-6" rows="3" />
                          <span className="absolute bottom-2 right-3 text-[10px] font-bold text-gray-400">{caso.desc.length}/500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => handleArrayAdd('casos', { nombre: "", patologia: "", desc: "", fotos: [] })} className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2D6A6A] hover:bg-gray-50 py-2.5 px-4 rounded-xl transition-colors border border-[#2D6A6A]/20 border-dashed">
                <Plus className="w-4 h-4" /> Agregar Caso Clínico
              </button>
            </Accordion>

            {/* 6. LUGARES DE ATENCIÓN (ZONAS ESTRUCTURADAS) */}
            <Accordion title="Lugares de Atención (Zonas)" defaultOpen={false} tooltip="Permite que los tutores encuentren tu clínica en Google Maps rápidamente. Organízalas por zonas geográficas.">
              <p className="text-xs text-gray-500 mb-6 font-medium">Agrupa tus clínicas por zona. Añade la dirección exacta para generar el mapa.</p>
              <div className="space-y-6">
                {formData.zonas.map((zona) => (
                  <div key={zona.id} className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 relative pt-10 group transition-all group-[.active-mobile]:bg-white group-[.active-mobile]:shadow-sm">
                    <button type="button" onClick={() => handleArrayRemove('zonas', zona.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    
                    <div className="mb-4">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1 block">Nombre de la Zona</label>
                      <input type="text" placeholder="Ej: Zona Oeste, o Capital Federal" value={zona.nombre} onChange={(e) => handleArrayUpdate('zonas', zona.id, 'nombre', e.target.value)} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none font-black text-[#1A3D3D]" />
                    </div>

                    <div className="pl-4 border-l-2 border-[#2D6A6A]/20 space-y-4">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clínicas en esta zona</label>
                      
                      {zona.clinicas.map((clinica, cIdx) => (
                        <div key={clinica.id} className="bg-white p-4 rounded-xl border border-gray-200 relative group">
                          <button type="button" onClick={() => removeClinica(zona.id, clinica.id)} className="absolute top-2 right-2 text-gray-300 hover:text-red-500"><X className="w-4 h-4" /></button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 pr-6">
                            <input type="text" placeholder="Nombre (Ej: Hospital Patitos)" value={clinica.nombre} onChange={(e) => updateClinica(zona.id, clinica.id, 'nombre', e.target.value)} className="w-full border-b border-gray-100 px-2 py-1.5 text-sm focus:border-[#2D6A6A] outline-none font-bold text-[#1A3D3D]" />
                            <input type="text" placeholder="Barrio/Dirección corta" value={clinica.direccion} onChange={(e) => updateClinica(zona.id, clinica.id, 'direccion', e.target.value)} className="w-full border-b border-gray-100 px-2 py-1.5 text-sm focus:border-[#2D6A6A] outline-none text-gray-600" />
                          </div>
                          <div className="relative">
                            <MapPin className="w-4 h-4 absolute left-2 top-2 text-gray-400" />
                            <input type="url" placeholder="Pega el link de Google Maps aquí..." value={clinica.linkMaps} onChange={(e) => updateClinica(zona.id, clinica.id, 'linkMaps', e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-8 pr-3 py-2 text-xs focus:border-[#2D6A6A] outline-none" />
                          </div>
                        </div>
                      ))}

                      <button type="button" onClick={() => addClinicaToZona(zona.id)} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#2D6A6A] transition-colors mt-2">
                        <Plus className="w-3 h-3" /> Añadir Clínica a {zona.nombre || "esta zona"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => handleArrayAdd('zonas', { nombre: "", clinicas: [] })} className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white bg-[#1A3D3D] hover:bg-[#2D6A6A] py-2.5 px-4 rounded-xl transition-colors shadow-sm">
                <Plus className="w-4 h-4" /> Crear Nueva Zona
              </button>
            </Accordion>

            {/* 7. CONTACTO Y DISPONIBILIDAD */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 group group-[.active-mobile]:shadow-md group-[.active-mobile]:border-[#2D6A6A]/20 transition-all">
              <h2 className="font-black text-sm uppercase tracking-[0.2em] text-[#1A3D3D] mb-6">Contacto & Modalidad</h2>
              
              <InputGroup label="Email de Contacto Profesional" id="emailContacto" type="email" value={formData.emailContacto} onChange={handleChange} placeholder="Ej: dr@clinica.com" required error={errors.emailContacto} tooltip="Aquí llegarán los emails que te envíen desde el formulario de contacto." />
              
              <div className="flex items-center gap-2 mb-4 mt-6 border-t border-gray-100 pt-6">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Redes Sociales (Opcional)</h3>
                <Tooltip text="Entra a tu perfil, copia el link (URL) y pégalo aquí. O usa la opción 'Compartir perfil' de la app para obtener el enlace." />
              </div>
              
              <InputGroup label="Instagram" id="instagram" value={formData.instagram} onChange={handleChange} placeholder="Ej: https://instagram.com/dra.clara" canTest />
              <InputGroup label="LinkedIn" id="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="Ej: https://linkedin.com/in/clara-valdez" canTest />
              <InputGroup label="Facebook" id="facebook" value={formData.facebook} onChange={handleChange} placeholder="Ej: https://facebook.com/draclara" canTest />

              <div className="w-full h-px bg-gray-100 my-6"></div>

              <div className="mb-6">
                <ToggleSwitch label="Hago visitas a domicilio" checked={formData.atiendeDomicilio} onChange={(val) => setFormData(prev => ({...prev, atiendeDomicilio: val}))} tooltip="Añadirá un distintivo (badge) especial en tu perfil público." />
              </div>

              <div className="mb-6">
                  <ToggleSwitch label="Habilitar botón de WhatsApp" checked={formData.whatsappActivo} onChange={(val) => {
                    setFormData(prev => ({...prev, whatsappActivo: val}));
                    if (!val) setErrors(prev => ({...prev, whatsappNum: null})); 
                  }} tooltip="Si lo activas, aparecerá un gran botón verde en tu perfil para chats rápidos." />
                
                <div className={`transition-all duration-300 overflow-hidden ${formData.whatsappActivo ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <InputGroup label="Número (con código de país, sin +)" id="whatsappNum" type="tel" value={formData.whatsappNum} onChange={handleChange} placeholder="Ej: 5491122334455" error={errors.whatsappNum} required={formData.whatsappActivo} />
                </div>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-6 border-t border-gray-200 mt-4">
              <button type="button" onClick={() => window.location.reload()} className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors px-4 py-3">
                Descartar Cambios
              </button>
              
              <button type="submit" className="w-full sm:w-auto bg-[#1A3D3D] text-white px-10 py-4 rounded-[20px] font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-[#2D6A6A] hover:-translate-y-1 transition-all flex items-center justify-center gap-2 active:scale-95">
                <Save className="w-4 h-4" /> Publicar Perfil
              </button>
            </div>
            
            <button type="button" onClick={() => navigate('/perfil')} className="text-center block w-full text-[#2D6A6A] font-bold text-xs uppercase tracking-widest mt-6 hover:text-[#1A3D3D] transition-colors flex items-center justify-center gap-2 group">
              VER MI PERFIL PROFESIONAL <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="h-10"></div>
          </form>
        </div>

        {/* ========================================== */}
        {/* COLUMNA DERECHA: LIVE PREVIEW STICKY */}
        {/* ========================================== */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-[90px] mb-12 lg:mb-0 z-0">
          <div className="mb-4 flex items-center justify-between px-2">
            <h2 className="text-[11px] font-black text-[#1A3D3D] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span> Vista Previa en Vivo
            </h2>
            <p className="text-[10px] text-gray-400 font-medium">Actualización automática</p>
          </div>

          <div className="bg-white rounded-[40px] shadow-[0_30px_60px_rgba(26,61,61,0.12)] overflow-hidden border border-gray-100 transform transition-all duration-300 relative">
            
            <div className="bg-[#1A3D3D] p-10 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              
              {/* REDES SOCIALES PREVIEW (Solo aparecen si hay datos) */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                {formData.instagram && (
                  <div className="text-white/40 p-1.5 bg-white/5 rounded-lg border border-white/10">
                    <Instagram className="w-3 h-3" />
                  </div>
                )}
                {formData.linkedin && (
                  <div className="text-white/40 p-1.5 bg-white/5 rounded-lg border border-white/10">
                    <Linkedin className="w-3 h-3" />
                  </div>
                )}
                {formData.facebook && (
                  <div className="text-white/40 p-1.5 bg-white/5 rounded-lg border border-white/10">
                    <Facebook className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div className="relative mb-6 z-10">
                <div className="w-32 h-32 rounded-[24px] overflow-hidden border-4 border-white/20 shadow-2xl bg-gray-100">
                  {formData.foto && <img src={formData.foto} className="w-full h-full object-cover" alt="Preview" />}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#2D6A6A] p-2.5 rounded-xl shadow-xl border-2 border-[#1A3D3D]">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="z-10 flex flex-col items-center w-full">
                <h3 className="text-2xl font-black font-['Montserrat'] text-white leading-tight mb-2">
                  {formData.nombre || "Tu Nombre"}
                </h3>
                <p className="text-[#2D6A6A] bg-[#2D6A6A]/10 px-3 py-1 rounded-full border border-[#2D6A6A]/20 font-bold text-[11px] uppercase tracking-wider mb-2">
                  {formData.especialidad || "Tu Especialidad"}
                </p>
                {formData.matricula && (
                  <p className="text-white/40 text-[9px] uppercase tracking-[0.2em]">Mat: {formData.matricula}</p>
                )}
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-500 text-sm leading-relaxed italic line-clamp-3 mb-8 text-center">
                "{formData.bio || "Tu biografía profesional aparecerá aquí para que los clientes te conozcan..."}"
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-[#F4F7F7] p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-2 border border-gray-50">
                  <MapPin className="w-5 h-5 text-[#2D6A6A]" />
                  <span className="text-[10px] font-bold text-[#1A3D3D] uppercase tracking-wider leading-tight">{formData.provincia || "Ubicación"}</span>
                </div>
                {formData.atiendeDomicilio ? (
                  <div className="bg-blue-50 p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-2 border border-blue-100">
                    <Home className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider leading-tight">A Domicilio</span>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-3 rounded-2xl flex flex-col items-center text-center justify-center gap-2 border border-yellow-100">
                    <Award className="w-5 h-5 text-yellow-600" />
                    <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider leading-tight">Destacado</span>
                  </div>
                )}
              </div>

              {/* Botón Dinámico Live */}
              {formData.whatsappActivo ? (
                <div className="w-full bg-[#25D366] text-white py-4 rounded-[16px] font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg opacity-90 cursor-not-allowed">
                  <Smartphone className="w-4 h-4" /> Contactar por WhatsApp
                </div>
              ) : (
                <div className="w-full bg-[#1A3D3D] text-white py-4 rounded-[16px] font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg opacity-90 cursor-not-allowed">
                  <Mail className="w-4 h-4" /> Enviar email
                </div>
              )}
            </div>
          </div>
          
        </div>

      </div>

      {/* FOOTER */}
      <footer ref={footerRef} className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden mt-12 pt-20 pb-12 text-left">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
        <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
            <div className="md:col-span-1 text-left">
              <div className="text-white font-['Montserrat'] font-bold text-2xl mb-6 text-left leading-none cursor-pointer" onClick={() => navigate('/')}>El Portal<span className="text-white/40">.</span></div>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6 font-medium text-left">La red profesional exclusiva para medicina veterinaria de alta complejidad. Conectando talento con vocación.</p>
              <div className="flex gap-4">
                <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-4 h-4" /></a>
              </div>
              <div className="text-white/40 text-[10px] font-medium space-y-1.5 flex flex-col items-start mt-6">
                <p>&copy; {new Date().getFullYear()} El Portal. Todos los derechos reservados.</p>
                <p className="flex items-center gap-2">
                  <button onClick={() => navigate('/terminos-y-condiciones')} className="underline hover:text-white transition-colors focus:outline-none">Términos</button>
                  <span>•</span>
                  <button onClick={() => navigate('/politica-de-privacidad')} className="underline hover:text-white transition-colors focus:outline-none">Privacidad</button>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Navegación</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Beneficios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Red Profesional</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Bolsa de Trabajo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Insumos Médicos</a></li>
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
              <Heart className="w-3 h-3 text-red-400/50 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300 fill-current" />
              <span>en Argentina.</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] leading-none">Única plataforma veterinaria oficial</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}