import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Clock, Users, Globe, Target,
  BookOpen, Briefcase, Package, Newspaper,
  Star, Search, Building2, ShieldCheck, ArrowUpRight, Sparkles,
  Award, Bell, Facebook, Instagram, Linkedin, Mail, Calendar, Heart,
  Building, Truck, Home, User, Edit, LayoutGrid, MapPin, Activity, ArrowRight,
  Chrome, Eye, EyeOff, Lock, Filter, Stethoscope, Info, Tag, ShoppingCart,
  CheckCircle2, PlusCircle
} from 'lucide-react';

// ==========================================
// COMPONENTE: ZIG-ZAG STORYTELLING
// ==========================================
const ZigZagSection = ({ title, subtitle, text, image, isReversed, icon: Icon, bgClass = "bg-white", badge, isDark = false, mobileMockup }) => {
  return (
    <section className={`py-12 md:py-20 overflow-hidden ${bgClass}`}>
      <div className="max-w-[1100px] mx-auto px-8 md:px-10">
        <div className={`flex flex-col gap-8 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          
          <div className="flex-1 flex flex-col items-start text-left">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center mb-5 md:mb-6 shadow-sm ${isDark ? 'bg-white/10 text-white' : 'bg-[#2D6A6A]/10 text-[#2D6A6A]'}`}>
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <h3 className={`${isDark ? 'text-white/60' : 'text-[#2D6A6A]'} font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-3`}>{subtitle}</h3>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tighter font-['Montserrat'] leading-[1.1] ${isDark ? 'text-white' : 'text-[#1A3D3D]'}`}>
              {title}
            </h2>
            <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} text-[15px] md:text-base leading-relaxed font-medium`}>
              {text}
            </p>
          </div>

          <div className="flex-1 w-full relative group mt-4 lg:mt-0 flex justify-center">
            {/* --- IMAGEN --- */}
            <div className={`relative w-full ${mobileMockup ? 'hidden md:block' : 'block'}`}>
              <div className={`absolute inset-0 bg-gradient-to-tr rounded-[32px] md:rounded-[40px] transform group-hover:scale-105 transition-transform duration-700 ${isDark ? 'from-black/40' : 'from-[#1A3D3D]/20'} to-transparent`}></div>
              <img 
                src={image} 
                alt={title} 
                className="w-full h-[320px] md:h-[380px] object-cover rounded-[32px] md:rounded-[40px] shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-700 relative z-10"
              />
              {badge && (
                <div className={`absolute ${isReversed ? '-left-4 md:-left-8' : '-right-4 md:-right-8'} -bottom-6 z-20 animate-float-delayed`}>
                  {badge}
                </div>
              )}
            </div>

            {/* --- MOCKUP MÓVIL --- */}
            {mobileMockup && (
              <div className="block md:hidden w-full max-w-[360px]">
                {mobileMockup}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// COMPONENTE: TÍTULO MÁQUINA DE ESCRIBIR
// ==========================================
const TypewriterTitle = () => {
  const [charIndex, setCharIndex] = useState(0);
  const text1 = "Enfocate en curar.";
  const text2 = "Nosotros en conectarte.";
  const totalChars = text1.length + text2.length;

  useEffect(() => {
    const initialDelay = charIndex === 0 ? 400 : 0;
    
    if (charIndex < totalChars) {
      const timeout = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, initialDelay || 45); 
      return () => clearTimeout(timeout);
    }
  }, [charIndex, totalChars]);

  const displayedText1 = text1.slice(0, charIndex);
  const displayedText2 = charIndex > text1.length ? text2.slice(0, charIndex - text1.length) : "";
  
  return (
    <h1 className="text-[42px] sm:text-[46px] md:text-[52px] lg:text-[69px] font-black text-[#1A3D3D] leading-[1.05] mb-4 tracking-tighter font-['Montserrat'] min-h-[100px] md:min-h-[125px]">
      {displayedText1}
      {charIndex <= text1.length && (
        <span className="inline-block w-[3px] h-[0.9em] bg-[#1A3D3D] animate-pulse ml-1 align-baseline -mb-1"></span>
      )}
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3D3D] to-[#2D6A6A]">
        {displayedText2}
      </span>
      {charIndex > text1.length && (
        <span className="inline-block w-[3px] h-[0.9em] bg-[#2D6A6A] animate-pulse ml-1 align-baseline -mb-1"></span>
      )}
    </h1>
  );
};

// ==========================================
// COMPONENTE DE CONTENIDO: LANDING PAGE
// ==========================================
function LandingPageContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [activeRole, setActiveRole] = useState('profesional');
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const navigate = useNavigate();
  const footerRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; animation-delay: 2s; }
      .animate-float-fast { animation: float-fast 4s ease-in-out infinite; animation-delay: 1s; }
      
      @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    `;
    document.head.appendChild(style);

    // Lógica para que las cookies no "pisen" el footer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } 
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  const handleNav = (page) => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let path;
    switch (page) {
      case 'landing':
        path = '/';
        break;
      case 'ecosistema':
        path = '/ecosistema';
        break;
      case 'terminos':
        path = '/terminos-y-condiciones';
        break;
      case 'privacidad':
        path = '/politica-de-privacidad';
        break;
      default:
        path = `/${page}`;
    }
    navigate(path);
  };

  const getRoleSubtext = () => {
    if (activeRole === 'clinica') return "Mostrá tu infraestructura y recibí derivaciones.";
    if (activeRole === 'proveedor') return "Conectá tu catálogo directo con los profesionales.";
    return "Únete a la red profesional de Argentina.";
  };

  return (
    <div className="min-h-screen bg-[#F4F7F7] font-['Inter'] text-[#333333] overflow-x-hidden relative selection:bg-[#2D6A6A] selection:text-white antialiased">
      
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.025] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-[72px] bg-white/90 backdrop-blur-lg border-b border-gray-100 flex items-center px-8 md:px-10">
        <div className="max-w-[1100px] mx-auto w-full flex justify-between items-center">
            <div className="text-[#1A3D3D] font-['Montserrat'] font-extrabold text-2xl tracking-tighter cursor-pointer" onClick={() => handleNav('landing')}>
                El Portal<span className="text-[#2D6A6A]">.</span>
            </div>

            <div className="hidden lg:flex items-center gap-8 text-gray-500 font-medium text-[12px] uppercase tracking-wider">
                <a href="#historia" className="hover:text-[#2D6A6A] transition-colors">¿Por qué unirte?</a>
                <a href="#ecosistema" className="hover:text-[#2D6A6A] transition-colors">Ecosistema</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleNav('editor')}
                className="hidden md:block bg-[#1A3D3D] text-white rounded-full px-7 py-2.5 text-[13px] font-semibold shadow-lg hover:bg-[#2D6A6A] transition-all hover:-translate-y-0.5"
              >
                Crear mi perfil
              </button>

              <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-[#1A3D3D] hover:bg-[#F4F7F7] transition-all active:scale-95">
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)}></div>
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-[24px] shadow-[0_20px_50px_rgba(26,61,61,0.15)] border border-gray-100 overflow-y-auto max-h-[80vh] animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 py-3 border-b border-gray-50 mb-2 text-left">Navegación</p>
                        <button onClick={() => handleNav('inicio')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><Home className="w-4 h-4 text-gray-400 group-hover:text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Inicio</span></button>
                        <button onClick={() => handleNav('landing')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><Info className="w-4 h-4 text-gray-400 group-hover:text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Entrada</span></button>
                        <button onClick={() => handleNav('ecosistema')} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><div className="flex items-center gap-3"><LayoutGrid className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Repertorio Clínico</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        <button onClick={() => handleNav('novedades')} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><div className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Novedades</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        <button onClick={() => handleNav('bolsa-de-trabajo')} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><div className="flex items-center gap-3"><Briefcase className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Bolsa de Trabajo</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 py-3 border-b border-gray-50 mb-2 mt-2 text-left">Perfiles</p>
                        <button onClick={() => handleNav('perfil-clinica')} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><div className="flex items-center gap-3"><Building className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Perfil Clínica</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        <button onClick={() => handleNav('perfil-proveedor')} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><div className="flex items-center gap-3"><Truck className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Perfil Proveedor</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 py-3 border-b border-gray-50 mb-2 mt-2 text-left">Editores</p>
                        <button onClick={() => handleNav('editor-clinica')} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><div className="flex items-center gap-3"><Edit className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Editor Clínica</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        <button onClick={() => handleNav('editor-insumos')} className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#F4F7F7] rounded-xl transition-colors group"><div className="flex items-center gap-3"><Edit className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Editor Insumos</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
        </div>
      </nav>

      <div>
        {/* 1. HERO SECTION */}
        <main className="relative w-full bg-white overflow-hidden">
          
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-white"></div>
            <div className="absolute top-[-1%] right-[-25%] w-[70vw] h-[70vw] bg-[#2D6A6A]/[0.15] rounded-full blur-[100px] mix-blend-multiply md:hidden"></div>
            <div className="absolute bottom-[-30%] right-[-20%] w-[100vw] md:w-[60vw] h-[100vw] md:h-[60vw] bg-[#1A3D3D]/[0.23] rounded-full blur-[150px] mix-blend-multiply"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] md:w-[45vw] h-[80vw] md:h-[45vw] bg-[#2D6A6A]/[0.23] rounded-full blur-[120px] mix-blend-multiply"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] bg-[#4DB6AC]/[0.23] rounded-full blur-[130px] mix-blend-multiply opacity-80"></div>
          </div>

          <div className="relative z-10 w-full pt-[96px] pb-10 md:pt-[100px] md:pb-12">
            <div className="max-w-[1100px] mx-auto px-8 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-12 items-center">
              
              {/* LADO IZQUIERDO: CONTENIDO */}
              <div className="flex flex-col items-start text-left lg:pt-2">
                <div className="mb-4 inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200/50 px-3 py-1.5 rounded-full shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-[#2D6A6A] animate-pulse"></span>
                  <span className="text-[#1A3D3D] font-bold text-[10px] md:text-[10px] uppercase tracking-[0.2em] leading-none">Red exclusiva de veterinarixs argentinxs</span>
                </div>

                <TypewriterTitle />
                
                <p className="text-[15px] md:text-[15px] lg:text-[17px] text-gray-600 font-medium leading-relaxed mb-2 lg:mb-6 max-w-[500px]">
                  Tu perfil profesional, siempre vigente. Que clínicas y colegas te encuentren por tu talento, sin la presión de crear contenido diario.
                </p>

                <div className="hidden lg:flex items-center gap-3 text-[10px] md:text-[11px] font-bold text-[#2D6A6A] uppercase tracking-widest cursor-pointer group">
                  <a href="#ecosistema-completo" className="flex items-center gap-2 group-hover:text-[#1A3D3D] transition-colors">
                    Conocer más sobre Clínicas y Empresas <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* LADO DERECHO: FORMULARIO DE REGISTRO */}
              <div className="relative group max-w-[420px] mx-auto w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#2D6A6A]/20 to-transparent rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-white/95 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 md:px-8 md:py-7 shadow-[0_30px_60px_rgba(26,61,61,0.08)] flex flex-col items-center">
                  
                  <h2 className="text-[22px] md:text-[22px] font-black text-[#1A3D3D] mb-1 font-['Montserrat'] text-center leading-tight">Crea tu cuenta, es gratis.</h2>
                  <p className="text-gray-400 text-[13px] md:text-[13px] font-medium mb-4 text-center transition-all duration-300">{getRoleSubtext()}</p>

                  {/* Selector de Perfil */}
                  <div className="w-full bg-[#F4F7F7] p-1 rounded-[14px] flex items-center mb-4 border border-gray-100">
                    <button 
                      onClick={() => setActiveRole('profesional')}
                      className={`flex-1 py-1.5 text-[10px] md:text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${activeRole === 'profesional' ? 'bg-white text-[#1A3D3D] shadow-sm' : 'text-gray-400 hover:text-[#1A3D3D]'}`}
                    >
                      <User className="w-3 h-3 inline-block mr-1 -mt-0.5" /> Profesional
                    </button>
                    <button 
                      onClick={() => setActiveRole('clinica')}
                      className={`flex-1 py-1.5 text-[10px] md:text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${activeRole === 'clinica' ? 'bg-white text-[#1A3D3D] shadow-sm' : 'text-gray-400 hover:text-[#1A3D3D]'}`}
                    >
                      <Building2 className="w-3 h-3 inline-block mr-1 -mt-0.5" /> Clínica
                    </button>
                    <button 
                      onClick={() => setActiveRole('proveedor')}
                      className={`flex-1 py-1.5 text-[10px] md:text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${activeRole === 'proveedor' ? 'bg-white text-[#1A3D3D] shadow-sm' : 'text-gray-400 hover:text-[#1A3D3D]'}`}
                    >
                      <Package className="w-3 h-3 inline-block mr-1 -mt-0.5" /> Empresa
                    </button>
                  </div>

                  {!isFormExpanded && (
                    <button 
                      onClick={() => setIsFormExpanded(true)}
                      className="md:hidden w-full bg-[#2D6A6A] text-white py-3 rounded-xl font-black uppercase tracking-[0.2em] text-[12px] shadow-lg hover:bg-[#1A3D3D] active:scale-95 transition-all flex items-center justify-center gap-2 mt-1"
                    >
                      Continuar registro <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  <div className={`w-full grid transition-all duration-500 ease-in-out ${isFormExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:grid-rows-[1fr] md:opacity-100'}`}>
                    <div className="overflow-hidden w-full flex flex-col items-center">
                      <div className="w-full pt-1">
                        
                        <button className="flex items-center justify-center gap-2.5 w-full border border-gray-200 py-2.5 rounded-[12px] hover:bg-gray-50 transition-all font-bold text-[14px] text-gray-700 mb-4 bg-white">
                            <Chrome className="w-4 h-4 text-red-500" /> Continuar con Google
                        </button>

                        <div className="flex items-center gap-3 w-full mb-4 text-gray-300">
                          <div className="h-px bg-gray-200 flex-1"></div>
                          <span className="text-[9px] font-bold uppercase tracking-widest">o con tu email</span>
                          <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                        <div className="w-full space-y-2.5 mb-5">
                          <div className="relative">
                            <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                              type="text" 
                              placeholder={activeRole === 'profesional' ? "Tu nombre completo" : "Nombre de la institución/empresa"} 
                              className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-100 focus:border-[#2D6A6A] focus:ring-4 focus:ring-[#2D6A6A]/5 outline-none font-medium text-[14px] transition-all bg-[#F9FBFA]" 
                            />
                          </div>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                              type="email" 
                              placeholder={activeRole === 'profesional' ? "Tu email profesional" : "Email de contacto"} 
                              className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-gray-100 focus:border-[#2D6A6A] focus:ring-4 focus:ring-[#2D6A6A]/5 outline-none font-medium text-[14px] transition-all bg-[#F9FBFA]" 
                            />
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Crea una contraseña" 
                              className="w-full pl-10 pr-10 py-2.5 rounded-[12px] border border-gray-100 focus:border-[#2D6A6A] focus:ring-4 focus:ring-[#2D6A6A]/5 outline-none font-medium text-[14px] transition-all bg-[#F9FBFA]" 
                            />
                            <button 
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D6A6A] transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <button 
                          onClick={() => handleNav(activeRole === 'profesional' ? 'editor' : activeRole === 'clinica' ? 'editor-clinica' : 'editor-insumos')} 
                          className="w-full bg-[#2D6A6A] text-white py-3 md:py-3.5 rounded-[12px] font-black uppercase tracking-[0.2em] text-[11px] md:text-[11px] shadow-xl hover:bg-[#1A3D3D] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          Crear cuenta de {activeRole} <ChevronRight className="w-4 h-4" />
                        </button>
                        
                        <p className="text-gray-400 text-[10px] md:text-[10px] text-center mt-3 w-full">
                          Al registrarte, aceptás nuestros <span onClick={() => navigate('/terminos-y-condiciones')} className="underline cursor-pointer hover:text-[#2D6A6A]">Términos</span> y la <span onClick={() => navigate('/politica-de-privacidad')} className="underline cursor-pointer hover:text-[#2D6A6A]">Política de Privacidad</span>.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </main>

        {/* 1.5 MOCKUPS ÉPICOS (Solo PC) */}
        <section className="relative w-full bg-[#F4F7F7] py-12 md:py-12 hidden md:block">
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent"></div>
          <div className="max-w-[1050px] mx-auto px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              
              {/* Tarjeta 1 (Izquierda): CLÍNICAS */}
              <div className="animate-float-fast h-full">
                <div className="bg-white border border-gray-100 p-6 md:p-6 rounded-[32px] shadow-[0_15px_30px_rgba(45,106,106,0.05)] h-full relative flex flex-col">
                  
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-bold text-[#2D6A6A] uppercase tracking-widest flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" /> Para Clínicas
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A3D3D] font-['Montserrat'] leading-tight mb-4">
                    Buscador de<br/>Derivaciones
                  </h3>

                  <div className="flex flex-col gap-2.5 mb-5">
                    <div className="flex items-center gap-2 bg-[#F9FBFA] p-3 rounded-xl border border-gray-200">
                      <Search className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-[12px] text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Buscar: "Tomógrafo", "Cardiólogo"...</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><Activity className="w-3 h-3" /> Guardia 24hs</span>
                      <span className="bg-gray-50 text-gray-600 border border-gray-200 text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><MapPin className="w-3 h-3" /> GBA Norte</span>
                    </div>
                  </div>

                  <div className="mt-auto bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden group hover:border-green-200 transition-colors">
                    <div className="p-3 bg-green-50/50 flex items-start gap-2.5 border-b border-green-100/50">
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-green-600 shrink-0"><Building className="w-4 h-4" /></div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-[12px] font-bold text-[#1A3D3D]">Hospital San Marcos</p>
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                        </div>
                        <p className="text-[9px] text-gray-500 font-medium leading-tight">Equipamiento: Tomógrafo, Quirófano, UTI.</p>
                      </div>
                    </div>
                    <div className="p-2 bg-white">
                      <button className="w-full bg-white border border-gray-200 text-[#1A3D3D] font-bold py-2 rounded-lg text-[10px] uppercase tracking-widest hover:bg-[#F9FBFA] transition-colors flex items-center justify-center gap-1.5">
                        Derivar Paciente <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Tarjeta 2 (Centro): PROFESIONALES */}
              <div className="z-20 animate-float h-full">
                <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-6 shadow-[0_15px_30px_rgba(45,106,106,0.05)] h-full relative flex flex-col items-center text-center">
                  
                  <div className="w-full flex items-center justify-start mb-5">
                    <span className="text-[10px] font-bold text-[#2D6A6A] uppercase tracking-widest flex items-center gap-2">
                      <User className="w-3.5 h-3.5" /> Profesionales
                    </span>
                  </div>

                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-[20px] bg-gray-100 overflow-hidden relative z-10 border border-gray-100 shadow-sm mx-auto">
                      <img src="https://images.unsplash.com/photo-1594824436951-7f12bc3ac92e?auto=format&fit=crop&w=300&q=80" alt="Dra. Arenas" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-[#789A9A] p-1.5 rounded-lg border-[3px] border-white shadow-sm text-white z-20">
                      <ShieldCheck className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="bg-yellow-50/80 text-yellow-700 text-[8px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 mb-2.5 border border-yellow-100 uppercase tracking-widest mx-auto">
                      <Award className="w-3 h-3 fill-current" /> Referente Destacada
                  </div>

                  <h3 className="text-lg font-bold text-[#1A3D3D] font-['Montserrat'] leading-tight mb-1">Dra. Mercedes Arenas</h3>
                  <p className="text-[#2D6A6A] text-[9px] font-black uppercase tracking-[0.2em] mb-4">Cirujana Traumatóloga</p>
                  
                  <div className="flex flex-col gap-2 w-full mt-auto mb-4">
                    <div className="bg-[#F9FBFA] px-3 py-2 rounded-xl border border-gray-100 flex items-center gap-2.5">
                      <div className="p-1.5 bg-white rounded-md shadow-sm border border-gray-50"><MapPin className="w-3.5 h-3.5 text-[#2D6A6A]" /></div>
                      <div className="text-left">
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">Zona de atención</p>
                        <p className="text-[11px] font-bold text-[#1A3D3D] leading-none">CABA y GBA Norte</p>
                      </div>
                    </div>
                    <div className="bg-[#F9FBFA] px-3 py-2 rounded-xl border border-gray-100 flex items-center gap-2.5">
                      <div className="p-1.5 bg-white rounded-md shadow-sm border border-gray-50"><Stethoscope className="w-3.5 h-3.5 text-[#2D6A6A]" /></div>
                      <div className="text-left">
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-0.5">Modalidad</p>
                        <p className="text-[11px] font-bold text-[#1A3D3D] leading-none">Derivaciones y Quirófano</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#1A3D3D] text-white font-black py-2.5 rounded-xl shadow-sm hover:bg-[#2D6A6A] transition-all flex items-center justify-center gap-1.5 uppercase tracking-widest text-[9px]">
                    Ver trayectoria <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Tarjeta 3 (Derecha): PROVEEDORES */}
              <div className="animate-float-delayed h-full">
                <div className="bg-white border border-gray-100 p-6 md:p-6 rounded-[32px] shadow-[0_15px_30px_rgba(45,106,106,0.05)] h-full relative flex flex-col">
                  
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-bold text-[#2D6A6A] uppercase tracking-widest flex items-center gap-2">
                      <Package className="w-3.5 h-3.5" /> Proveedores
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A3D3D] font-['Montserrat'] leading-tight mb-5">
                    Catálogo Mayorista<br/>B2B
                  </h3>

                  <div className="bg-[#F9FBFA] rounded-xl p-3 relative border border-gray-200 mb-5 text-left">
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">Oferta</div>
                    <div className="w-full h-16 bg-white rounded-lg mb-2.5 flex items-center justify-center border border-gray-100 shadow-sm">
                       <ShoppingCart className="w-5 h-5 text-gray-300" />
                    </div>
                    <span className="text-[8px] font-bold text-[#2D6A6A] uppercase tracking-widest">Aparatología</span>
                    <h4 className="text-[#1A3D3D] font-bold font-['Montserrat'] text-[12px] mt-1 leading-tight">Ecógrafo Doppler Mindray</h4>
                    <p className="text-[#2D6A6A] text-[9px] font-black mt-1">Consultar precio matriculado</p>
                  </div>

                  <div className="space-y-2 mt-auto mb-4">
                    <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
                      <Tag className="w-3 h-3 text-[#2D6A6A]" />
                      <span className="text-[10px] font-bold text-gray-600">Venta directa de fábrica</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm">
                      <Truck className="w-3 h-3 text-[#2D6A6A]" />
                      <span className="text-[10px] font-bold text-gray-600">Envíos a todo el país</span>
                    </div>
                  </div>

                  <button className="w-full bg-[#F4F7F7] border border-gray-200 text-[#1A3D3D] font-bold py-2.5 rounded-xl text-[9px] uppercase tracking-widest hover:bg-[#1A3D3D] hover:text-white transition-colors flex items-center justify-center gap-1.5">
                    Contactar Distribuidor
                  </button>
                  
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. STORYTELLING ZIG-ZAG */}
        <div id="historia">
          <ZigZagSection 
            bgClass="bg-white"
            icon={Clock}
            subtitle="Atemporalidad"
            title="Foco en tu vocación, no en el algoritmo."
            text="El Portal está diseñado para que no pierdas tiempo en redes sociales que exigen creación constante y no están pensadas para profesionales de la salud. Aquí, tu perfil es atemporal: trabaja por vos 24/7. No necesitás publicar historias para que te deriven pacientes; si un colega o un tutor busca tu especialidad, te encuentra al instante, sin esfuerzo ni mantenimiento de tu parte."
            image="/1.%20profesion.jpg"
            isReversed={false}
            badge={
              <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
                <div className="w-10 h-10 bg-[#2D6A6A]/10 rounded-full flex items-center justify-center text-[#2D6A6A]">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Presencia 24/7</p>
                  <p className="text-sm font-black text-[#1A3D3D]">Sin depender del algoritmo</p>
                </div>
              </div>
            }
            mobileMockup={
              <div className="z-20 animate-float">
                <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col items-center text-center w-full">
                  
                  <div className="relative mb-5 mt-1">
                    <div className="w-28 h-28 rounded-[28px] bg-gray-100 overflow-hidden relative z-10 border border-gray-100 shadow-md">
                      <img src="https://images.unsplash.com/photo-1594824436951-7f12bc3ac92e?auto=format&fit=crop&w=300&q=80" alt="Dra. Arenas" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-3 -right-3 bg-[#789A9A] p-2 rounded-xl border-[3px] border-white shadow-lg text-white z-20">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-yellow-50/80 text-yellow-700 text-[9px] font-black px-4 py-1.5 rounded-full flex items-center gap-1.5 mb-4 border border-yellow-100 shadow-sm uppercase tracking-widest">
                      <Award className="w-3.5 h-3.5 fill-current" /> Referente Destacada
                  </div>

                  <h3 className="text-2xl font-bold text-[#1A3D3D] font-['Montserrat'] leading-tight mb-1">Dra. Mercedes Arenas</h3>
                  <p className="text-[#2D6A6A] text-xs font-black uppercase tracking-[0.2em] mb-5">Cirujana Traumatóloga</p>
                  
                  <div className="flex flex-col gap-2 w-full mb-6">
                    <div className="bg-[#F9FBFA] px-4 py-3 rounded-[20px] border border-gray-100 flex items-center gap-3">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-100"><MapPin className="w-4 h-4 text-[#2D6A6A]" /></div>
                      <div className="text-left">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Zona de atención</p>
                        <p className="text-xs font-bold text-[#1A3D3D]">CABA y GBA Norte</p>
                      </div>
                    </div>
                    <div className="bg-[#F9FBFA] px-4 py-3 rounded-[20px] border border-gray-100 flex items-center gap-3">
                      <div className="p-1.5 bg-white rounded-lg shadow-sm border border-gray-100"><Stethoscope className="w-4 h-4 text-[#2D6A6A]" /></div>
                      <div className="text-left">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Modalidad</p>
                        <p className="text-xs font-bold text-[#1A3D3D]">Derivaciones y Quirófano</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#1A3D3D] text-white font-black py-4 rounded-[20px] shadow-lg hover:bg-[#2D6A6A] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-[10px]">
                    Ver trayectoria <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            }
          />

          <ZigZagSection 
            bgClass="bg-[#1A3D3D]"
            isDark={true}
            icon={Users}
            subtitle="Comunidad"
            title="Rompé con el aislamiento del consultorio."
            text="El Portal te permite mantenerte conectado con los referentes de tu área. Encontrá fácilmente el contacto exacto que necesitás para derivar un paciente, trabajar en equipo o impulsar tu carrera. Una red sólida te abre puertas a oportunidades reales, desde nuevas alianzas hasta invitaciones para disertar en cursos de tu especialidad."
            image="/2.consultorio.png"
            isReversed={true}
            badge={
              <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-white/10 text-left">
                <div className="flex -space-x-3">
                  <img className="w-8 h-8 rounded-full border-2 border-[#1A3D3D] object-cover" src="https://images.unsplash.com/photo-1594824436951-7f12bc3ac92e?auto=format&fit=crop&w=100&q=80" alt="avatar doctora" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#1A3D3D] object-cover" src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80" alt="avatar doctora" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#1A3D3D] bg-[#2D6A6A] flex items-center justify-center text-[10px] font-bold text-white">+5</div>
                </div>
                <div className="pr-2">
                  <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest leading-none mb-1">Networking</p>
                  <p className="text-sm font-black text-white leading-tight">Nueva propuesta</p>
                </div>
              </div>
            }
          />

          <ZigZagSection 
            bgClass="bg-white"
            icon={Star}
            subtitle="Presencia Virtual"
            title="Tu trayectoria, verificada y en un solo lugar."
            text="Centralizá tu experiencia, formación y casos de éxito en una plataforma exclusiva. Tu perfil en El Portal funciona como una carta de presentación digital de máxima credibilidad. Asegurate de que, cuando una clínica o colega escuche tu nombre, encuentre un respaldo profesional que hable por tu talento."
            image="/3.perfil-verificado.png"
            isReversed={false}
            badge={
              <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 text-left">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Prestigio Médico</p>
                  <p className="text-sm font-black text-[#1A3D3D]">Trayectoria validada</p>
                </div>
              </div>
            }
          />
        </div>

        {/* 2.5 SECCIÓN SPLIT SCREEN (Fondo Oscuro y Compacto) */}
        <section id="ecosistema-completo" className="py-10 md:py-16 bg-[#1A3D3D] relative overflow-hidden border-t border-white/5">
          
          <div className="max-w-[1200px] mx-auto px-8 md:px-10 relative z-10 text-center mb-8 md:mb-10">
            <h3 className="text-[#4DB6AC] font-bold text-[11px] uppercase tracking-[0.3em] mb-3 text-center">Socios Estratégicos</h3>
            <h2 className="text-3xl md:text-5xl font-black text-white font-['Montserrat'] leading-[1.1] tracking-tighter text-center">
              Un ecosistema donde<br/>todos crecen.
            </h2>
          </div>

          <div className="max-w-[1000px] mx-auto px-8 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10">
            
            {/* Split Izquierdo: Clínicas */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-all duration-300 group flex flex-col items-start text-left relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 shadow-sm border border-white/5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white font-['Montserrat'] mb-3">Centros Veterinarios</h3>
              <p className="text-white/70 text-sm leading-relaxed font-medium mb-8 flex-1">
                Visibilidad institucional inteligente. Mostrá tu infraestructura, capacidad de internación y equipamiento tecnológico para captar derivaciones de casos complejos. Encontrá y reclutá a los mejores especialistas directamente desde nuestra Bolsa de Trabajo.
              </p>
              <button onClick={() => navigate('/editor-clinica')} className="bg-transparent border border-white/40 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-white hover:text-[#1A3D3D] transition-colors flex items-center gap-2 shadow-sm w-full md:w-auto justify-center">
                Unir mi clínica <ArrowRight className="w-4 h-4" />
              </button>

              {/* MOCKUP CLÍNICAS (SOLO MÓVIL) */}
              <div className="block md:hidden w-full mt-8 animate-slide-up">
                <div className="bg-white rounded-[24px] p-5 shadow-xl relative text-left w-full border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-[#2D6A6A] uppercase tracking-widest flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5" /> Buscador
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-2 bg-[#F9FBFA] p-2.5 rounded-xl border border-gray-200">
                      <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Buscar: "Tomógrafo"...</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-green-100 shadow-sm overflow-hidden">
                    <div className="p-3 bg-green-50/50 flex items-start gap-2 border-b border-green-100/50">
                      <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-green-600 shrink-0"><Building className="w-3.5 h-3.5" /></div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-[11px] font-bold text-[#1A3D3D]">Hospital San Marcos</p>
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                        </div>
                        <p className="text-[8px] text-gray-500 font-medium leading-tight">Equipamiento: Tomógrafo, Quirófano, UTI.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Split Derecho: Proveedores */}
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[32px] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-all duration-300 group flex flex-col items-start text-left relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 shadow-sm border border-white/5">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white font-['Montserrat'] mb-3">Proveedores B2B</h3>
              <p className="text-white/70 text-sm leading-relaxed font-medium mb-8 flex-1">
                Tu catálogo en el lugar correcto. Dejá de invertir en publicidad masiva; conectá directamente con los directores médicos y profesionales matriculados que toman las decisiones de compra en los quirófanos y consultorios del país.
              </p>
              <button onClick={() => navigate('/editor-insumos')} className="bg-[#4DB6AC] text-[#1A3D3D] px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all flex items-center gap-2 shadow-lg hover:-translate-y-0.5 w-full md:w-auto justify-center">
                Unir mi empresa <ArrowRight className="w-4 h-4" />
              </button>

              {/* MOCKUP PROVEEDORES (SOLO MÓVIL) */}
              <div className="block md:hidden w-full mt-8 animate-slide-up">
                <div className="bg-white rounded-[24px] p-5 shadow-xl relative text-left w-full border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-[#2D6A6A] uppercase tracking-widest flex items-center gap-2">
                      <Package className="w-3.5 h-3.5" /> Catálogo
                    </span>
                  </div>
                  <div className="bg-[#F9FBFA] rounded-xl p-3 relative border border-gray-200 text-left">
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">Oferta</div>
                    <div className="w-full h-12 bg-white rounded-lg mb-2 flex items-center justify-center border border-gray-100 shadow-sm">
                       <ShoppingCart className="w-4 h-4 text-gray-300" />
                    </div>
                    <span className="text-[8px] font-bold text-[#2D6A6A] uppercase tracking-widest">Aparatología</span>
                    <h4 className="text-[#1A3D3D] font-bold font-['Montserrat'] text-[11px] mt-1 leading-tight">Ecógrafo Doppler Mindray</h4>
                  </div>
                  <div className="mt-3 flex items-center gap-2 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                    <Tag className="w-3 h-3 text-[#2D6A6A]" />
                    <span className="text-[9px] font-bold text-gray-600">Venta directa de fábrica</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. ECOSISTEMA BENTO GRID */}
        <section id="ecosistema" className="py-16 md:py-24 bg-[#F4F7F7] relative overflow-hidden">
          <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10 text-center">
            
            <div className="text-center mb-10 md:mb-16">
              <h3 className="text-[#2D6A6A] font-bold text-[11px] uppercase tracking-[0.3em] mb-4 text-center">Contactos e información al instante</h3>
              <h2 className="text-3xl md:text-5xl font-black text-[#1A3D3D] font-['Montserrat'] leading-[1.1] tracking-tighter text-center">
                Espacios diseñados para<br/>agilizar tu práctica diaria.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Widget 1: Bolsa de trabajo */}
              <div className="md:col-span-2 bg-white border border-gray-100 p-8 md:p-10 rounded-[32px] hover:shadow-[0_20px_40px_rgba(26,61,61,0.06)] transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4 text-left">
                    <Briefcase className="w-6 h-6 text-[#2D6A6A]" />
                    <h3 className="text-2xl font-bold font-['Montserrat'] text-[#1A3D3D]">Bolsa de Trabajo</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium mb-8 text-sm max-w-lg text-left">
                    Accedé a oportunidades laborales de primer nivel. Conectamos talento con centros veterinarios que buscan especialidades específicas, simplificando el reclutamiento y garantizando el match perfecto para tu crecimiento.
                  </p>
                </div>
                <div className="bg-[#F4F7F7] border border-gray-100 rounded-2xl p-6 w-full md:w-[85%] transform group-hover:-translate-y-2 transition-transform duration-300 relative text-left">
                  <div className="flex justify-between items-start mb-6 text-left">
                    <div className="flex gap-3 items-center text-left">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-left"><Building2 className="w-5 h-5 text-[#2D6A6A]" /></div>
                      <div className="text-left">
                        <p className="font-bold text-sm text-[#1A3D3D]">Clínica San Marcos</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Busca Especialista</p>
                      </div>
                    </div>
                    <span className="bg-[#2D6A6A] text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider text-left">NUEVO</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-end gap-4 text-left">
                    <div className="flex gap-2 text-left">
                      <span className="bg-white border border-gray-200 text-[11px] px-3 py-1 rounded-full text-gray-600 font-bold text-left">Cardiología</span>
                      <span className="bg-white border border-gray-200 text-[11px] px-3 py-1 rounded-full text-gray-600 font-bold text-left">Part-Time</span>
                    </div>
                    <button className="bg-white border-2 border-[#1A3D3D] text-[#1A3D3D] px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-[#1A3D3D] hover:text-white transition-all transform active:scale-95 whitespace-nowrap text-left">
                      Postularme
                    </button>
                  </div>
                </div>
              </div>

              {/* Widget 2: Servicios Complementarios */}
              <div className="md:col-span-1 md:row-span-2 bg-[#2D6A6A]/5 border border-[#2D6A6A]/10 p-8 rounded-[32px] hover:bg-[#2D6A6A]/10 transition-all duration-300 flex flex-col group overflow-hidden text-left">
                <div className="flex items-center gap-3 mb-4 text-left">
                  <Activity className="w-6 h-6 text-[#2D6A6A]" />
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-[#1A3D3D] leading-tight">Servicios & Terapias holísticas</h3>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium text-sm text-left mb-8">
                  Damos visibilidad a profesionales y servicios especializados difíciles de hallar: fisioterapia, terapias holísticas, etología y nutrición natural. Conectamos todo el ecosistema de bienestar.
                </p>
                <div className="mt-auto flex flex-col gap-3 relative z-10 text-left">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#2D6A6A]/10 hover:shadow-md transition-all group-hover:-translate-y-1 transform duration-300 flex justify-between items-center cursor-pointer">
                    <span className="text-[#2D6A6A] font-bold text-sm">Rehabilitación</span>
                    <ChevronRight className="w-4 h-4 text-[#2D6A6A]/50" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#2D6A6A]/10 hover:shadow-md transition-all group-hover:-translate-y-1 transform duration-300 flex justify-between items-center cursor-pointer delay-75">
                    <span className="text-[#2D6A6A] font-bold text-sm">Etología Clínica</span>
                    <ChevronRight className="w-4 h-4 text-[#2D6A6A]/50" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#2D6A6A]/10 hover:shadow-md transition-all group-hover:-translate-y-1 transform duration-300 flex justify-between items-center cursor-pointer delay-150">
                    <span className="text-[#2D6A6A] font-bold text-sm">Fisioterapia</span>
                    <ChevronRight className="w-4 h-4 text-[#2D6A6A]/50" />
                  </div>
                </div>
              </div>

              {/* Widget 3: Cursos */}
              <div className="md:col-span-1 bg-white border border-gray-100 p-8 rounded-[32px] hover:shadow-[0_20px_40px_rgba(26,61,61,0.06)] transition-all duration-300 group text-left">
                <div className="flex items-center gap-3 mb-4 text-left">
                  <BookOpen className="w-6 h-6 text-[#2D6A6A]" />
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-[#1A3D3D]">Cursos</h3>
                </div>
                
                <div className="w-full bg-[#F4F7F7] rounded-2xl p-4 mb-6 border border-gray-100 transform group-hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden text-left">
                  <div className="absolute top-0 right-0 p-2 opacity-10"><Bell className="w-12 h-12 text-[#1A3D3D]" /></div>
                  <div className="flex items-center gap-2 mb-2 text-left">
                    <span className="bg-[#2D6A6A] text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest animate-pulse text-left">Disponible</span>
                  </div>
                  <p className="text-[#1A3D3D] font-bold text-xs leading-tight mb-1 text-left">Ecografía Doppler Avanzada</p>
                  <p className="text-gray-400 text-[10px] font-medium italic text-left">Inicia el 15 de Abril</p>
                </div>

                <p className="text-gray-600 leading-relaxed font-medium text-sm text-left">
                  Mantenete al tanto de las ultimas novedades sobre cursos y charlas. Encontrá fácilmente quién dicta el próximo seminario, fechas y modalidades.
                </p>
              </div>

              {/* Widget 4: Insumos */}
              <div className="md:col-span-1 bg-white border border-gray-100 p-8 rounded-[32px] hover:shadow-[0_20px_40px_rgba(26,61,61,0.06)] transition-all duration-300 group text-left">
                <div className="flex items-center gap-3 mb-4 text-left">
                  <Package className="w-6 h-6 text-[#2D6A6A]" />
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-[#1A3D3D]">Insumos</h3>
                </div>
                <div className="bg-[#F4F7F7] rounded-2xl p-4 mb-6 border border-gray-100 flex items-center gap-4 text-left">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-[#2D6A6A]"><Truck className="w-5 h-5" /></div>
                  <div className="flex-1 text-left">
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div className="h-full w-[70%] bg-[#2D6A6A]"></div>
                    </div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-left">En camino • Prótesis</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed font-medium text-sm text-left">
                  Directorio optimizado para contactar proveedores verificados de insumos médicos complejos y aparatología.
                </p>
              </div>

              {/* Widget 5: Grandes Animales */}
              <div className="md:col-span-1 bg-[#1A3D3D] border border-white/5 p-8 rounded-[32px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 group flex flex-col justify-between text-left">
                <div className="text-left">
                  <div className="flex items-center gap-3 mb-4 text-left">
                    <Globe className="w-6 h-6 text-white" />
                    <h3 className="text-2xl font-bold font-['Montserrat'] text-white">Grandes Animales</h3>
                  </div>
                  <p className="text-white/60 leading-relaxed font-medium text-sm text-left">
                    Encontrá especialistas en medicina rural, equinos y bovinos. Conectamos talento equipado para el trabajo en campo donde la distancia ya no es un límite.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 text-left">
                  <span className="bg-white/10 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-white/5">Rural</span>
                  <span className="bg-white/10 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-white/5">Equinos</span>
                </div>
              </div>

              {/* Widget 6: Noticias */}
              <div className="md:col-span-2 bg-[#1A3D3D] p-8 md:p-10 rounded-[32px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col md:flex-row gap-8 items-center border border-white/5 text-left overflow-hidden group">
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-3 mb-4 text-left">
                    <Newspaper className="w-6 h-6 text-white" />
                    <h3 className="text-2xl font-bold font-['Montserrat'] text-white">Noticias</h3>
                  </div>
                  <p className="text-white/70 leading-relaxed font-medium text-sm text-left">
                    Mantenete al día con los avances de la medicina veterinaria en Argentina. Un feed exclusivo para descubrir procedimientos innovadores y celebrar las hazañas de tus colegas.
                  </p>
                </div>
                <div className="w-full md:w-[50%] flex flex-col gap-4 relative z-10 text-left mt-2 md:mt-0">
                  <div className="bg-white p-5 rounded-2xl shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300 text-left w-full">
                    <div className="flex gap-2 items-center mb-2 text-left">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] text-[#2D6A6A] uppercase tracking-widest font-black text-left">Tendencia</span>
                    </div>
                    <p className="font-bold text-[15px] leading-tight text-[#1A3D3D] text-left">Nueva técnica en cirugía de tejidos blandos. Casos de éxito.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5 text-left transition-all duration-500 w-full flex items-center justify-between cursor-pointer hover:bg-white/20">
                    <p className="font-medium text-sm leading-tight text-white/80 text-left">El Portal llega a los 10k miembros activos.</p>
                    <ArrowRight className="w-4 h-4 text-white/40 shrink-0 ml-4" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. CALL TO ACTION FINAL */}
        <section className="py-16 md:py-32 bg-[#2D6A6A] relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
          <div className="max-w-[800px] mx-auto px-8 md:px-10 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-['Montserrat'] tracking-tight">
              ¿Listo para darle a tu perfil el prestigio que merece?
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto text-center">
              Formá parte de la primera cartilla veterinaria que potencia tu visibilidad mientras vos te enfocás en tu profesion.
            </p>
            <button onClick={() => handleNav('editor')} className="bg-[#1A3D3D] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-white hover:text-[#1A3D3D] hover:-translate-y-1 transition-all mx-auto">
              Empeza acá
            </button>
          </div>
        </section>

        {/* FOOTER COMPACTO (Definitivo) */}
        <footer ref={footerRef} className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden pt-12 pb-8 text-left print:hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
          <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10 text-left">
            
            {/* BLOQUE DE CONTENIDO SUPERIOR */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8 mb-6 text-left">
              
              {/* COLUMNA 1: Branding */}
              <div className="md:col-span-1 text-left">
                <button onClick={() => handleNav('landing')} className="text-white font-['Montserrat'] font-bold text-2xl mb-4 text-left leading-none cursor-pointer block hover:opacity-80 transition-opacity">
                  El Portal<span className="text-white/40">.</span>
                </button>
                <p className="text-white/50 text-sm md:text-[13px] leading-relaxed font-medium text-left">
                  La red profesional exclusiva para medicina veterinaria de alta complejidad. Conectando talento con vocación.
                </p>
              </div>

              {/* COLUMNA 2: Repertorio */}
              <div>
                <h4 className="text-white font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-4">Repertorio</h4>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li><button onClick={() => handleNav('ecosistema')} className="hover:text-white transition-colors">Cursos y Seminarios</button></li>
                  <li><button onClick={() => handleNav('ecosistema')} className="hover:text-white transition-colors">Insumos</button></li>
                </ul>
              </div>

              {/* COLUMNA 3: Comunidad */}
              <div>
                <h4 className="text-white font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-4">Comunidad</h4>
                <ul className="space-y-2 text-white/40 text-sm">
                  <li><button onClick={() => handleNav('bolsa-de-trabajo')} className="hover:text-white transition-colors">Bolsa de Trabajo</button></li>
                  <li><button onClick={() => handleNav('inicio')} className="hover:text-white transition-colors">Foro de Discusión</button></li>
                </ul>
              </div>

              {/* COLUMNA 4: Contacto */}
              <div>
                <h4 className="text-white font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-4">Contacto</h4>
                <ul className="space-y-2 text-white/40 text-sm leading-none">
                  <li>
                    <a href="mailto:elportalveterinario.arg@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors">
                      <Mail className="w-4 h-4 shrink-0" /> 
                      <span className="truncate">elportalveterinario.arg@gmail.com</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Globe className="w-4 h-4" /> elportal.vet
                  </li>
                </ul>
              </div>
            </div>

            {/* FILA DE CRÉDITOS UNIFICADA */}
            <div className="flex flex-row items-center justify-center gap-x-8 mb-10 pt-4">
              
              {/* Iconos Redes */}
              <div className="flex gap-3 shrink-0">
                <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Linkedin" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
              
              {/* Copyright */}
              <div className="text-white/40 text-[11px] md:text-xs font-medium leading-relaxed whitespace-nowrap shrink-0">
                <p>&copy; {new Date().getFullYear()} El Portal. Todos los derechos reservados.</p>
              </div>

              {/* Legales */}
              <div className="text-white/40 text-[11px] md:text-xs font-medium flex items-center gap-2 shrink-0">
                <button onClick={() => navigate('/terminos-y-condiciones')} className="underline hover:text-white transition-colors">Términos</button>
                <span className="opacity-20">•</span>
                <button onClick={() => navigate('/politica-de-privacidad')} className="underline hover:text-white transition-colors">Privacidad</button>
              </div>
            </div>

            {/* BARRA INFERIOR FINAL - Letras en blanco */}
            <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em]">creado por Belén M. Arenas</p>
              <div className="text-white text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-medium flex items-center gap-1.5 group cursor-default">
                <span>Hecho con</span>
                <Heart className="w-3 h-3 text-red-400/80 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300 fill-current" aria-hidden="true" />
                <span>en Argentina.</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-[11px] md:text-[10px] font-bold uppercase tracking-[0.3em] leading-none">Única plataforma veterinaria oficial</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* BANNER DE COOKIES */}
      {showCookieBanner && !isFooterVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-[#0a1e1e]/95 backdrop-blur-md border-t border-white/10 z-[100] py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-slide-up shadow-2xl">
          <div className="flex items-center gap-3 text-white/60 text-[11px] font-medium text-center md:text-left">
            <Info size={14} className="text-[#2D6A6A] shrink-0" />
            <p>Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptás nuestros términos.</p>
          </div>
          <button 
            onClick={() => setShowCookieBanner(false)}
            className="bg-[#2D6A6A] hover:bg-white text-white hover:text-[#1A3D3D] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
          >
            Entendido
          </button>
        </div>
      )}

    </div>
  );
}

export default function LandingPage() {
  return (
    <LandingPageContent />
  );
}