import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Clock, Users, Globe, Target,
  BookOpen, Briefcase, Package, Newspaper,
  Star, Search, Building2, ShieldCheck, ArrowUpRight, Sparkles,
  Award, Bell, Facebook, Instagram, Linkedin, Mail, Calendar, Truck, Heart,
  Home, User, Edit, LayoutGrid, MapPin, Activity, ArrowRight,
  Chrome, Eye, EyeOff, Lock, Filter, Stethoscope, Info
} from 'lucide-react';

// ==========================================
// COMPONENTE: ZIG-ZAG STORYTELLING
// ==========================================
const ZigZagSection = ({ title, subtitle, text, image, isReversed, icon: Icon, bgClass = "bg-white", badge, isDark = false }) => {
  return (
    <section className={`py-20 md:py-32 overflow-hidden ${bgClass} reveal-on-scroll`}>
      <div className="max-w-[1100px] mx-auto px-8 md:px-10">
        <div className={`flex flex-col gap-12 lg:gap-20 items-center ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
          
          <div className="flex-1 flex flex-col items-start text-left">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${isDark ? 'bg-white/10 text-white' : 'bg-[#2D6A6A]/10 text-[#2D6A6A]'}`}>
              <Icon className="w-7 h-7" />
            </div>
            <h3 className={`${isDark ? 'text-white/60' : 'text-[#2D6A6A]'} font-bold text-[11px] uppercase tracking-[0.2em] mb-3`}>{subtitle}</h3>
            <h2 className={`text-3xl md:text-5xl font-black mb-6 tracking-tighter font-['Montserrat'] leading-[1.1] ${isDark ? 'text-white' : 'text-[#1A3D3D]'}`}>
              {title}
            </h2>
            <p className={`${isDark ? 'text-white/70' : 'text-gray-600'} text-base md:text-lg leading-relaxed font-medium`}>
              {text}
            </p>
          </div>

          <div className="flex-1 w-full relative group mt-8 lg:mt-0">
            <div className={`absolute inset-0 bg-gradient-to-tr rounded-[40px] transform group-hover:scale-105 transition-transform duration-700 ${isDark ? 'from-black/40' : 'from-[#1A3D3D]/20'} to-transparent`}></div>
            <img 
              src={image} 
              alt={title} 
              className="w-full h-[400px] md:h-[500px] object-cover rounded-[40px] shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-700 relative z-10"
            />
            {badge && (
              <div className={`absolute ${isReversed ? '-left-6 md:-left-12' : '-right-6 md:-right-12'} -bottom-8 z-20 animate-float-delayed`}>
                {badge}
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
    <h1 className="text-5xl md:text-6xl lg:text-[64px] font-black text-[#1A3D3D] leading-[1.05] mb-6 tracking-tighter font-['Montserrat'] min-h-[110px] md:min-h-[140px]">
      {displayedText1}
      {charIndex <= text1.length && (
        <span className="inline-block w-[4px] h-[0.9em] bg-[#1A3D3D] animate-pulse ml-1 align-baseline -mb-1"></span>
      )}
      <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A3D3D] to-[#2D6A6A]">
        {displayedText2}
      </span>
      {charIndex > text1.length && (
        <span className="inline-block w-[4px] h-[0.9em] bg-[#2D6A6A] animate-pulse ml-1 align-baseline -mb-1"></span>
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
  const navigate = useNavigate();
  const footerRef = useRef(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.innerHTML = `
      .reveal-on-scroll { opacity: 0; transform: translateY(60px); transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1); }
      .reveal-on-scroll.in-view { opacity: 1; transform: translateY(0); }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      @keyframes float-delayed {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
      }
      @keyframes float-fast {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; animation-delay: 2s; }
      .animate-float-fast { animation: float-fast 4s ease-in-out infinite; animation-delay: 1s; }
      
      /* Animación suave para el cartel de cookies */
      @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    setTimeout(() => document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el)), 500);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
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

  return (
    <div className="min-h-screen bg-[#F4F7F7] font-['Inter'] text-[#333333] overflow-x-hidden relative selection:bg-[#2D6A6A] selection:text-white antialiased">
      
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.025] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-[80px] bg-white/90 backdrop-blur-lg border-b border-gray-100 flex items-center px-8 md:px-10">
        <div className="max-w-[1100px] mx-auto w-full flex justify-between items-center">
            <div className="text-[#1A3D3D] font-['Montserrat'] font-extrabold text-2xl tracking-tighter cursor-pointer" onClick={() => handleNav('landing')}>
                El Portal<span className="text-[#2D6A6A]">.</span>
            </div>

            <div className="hidden lg:flex items-center gap-10 text-gray-500 font-medium text-[13px] uppercase tracking-wider">
                <a href="#historia" className="hover:text-[#2D6A6A] transition-colors">¿Por qué unirte?</a>
                <a href="#ecosistema" className="hover:text-[#2D6A6A] transition-colors">Ecosistema</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleNav('editor')}
                className="hidden md:block bg-[#1A3D3D] text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:bg-[#2D6A6A] transition-all hover:-translate-y-0.5"
              >
                Crear mi perfil
              </button>

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
                        <button onClick={() => handleNav('landing')} className="w-full flex items-center gap-3 px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><Home className="w-4 h-4 text-gray-400 group-hover:text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Inicio</span></button>
                        <button onClick={() => handleNav('perfil')} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><User className="w-4 h-4 text-[#2D6A6A]" /><span className="text-sm font-bold text-[#1A3D3D]">Mi Perfil Público</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        <button onClick={() => handleNav('ecosistema')} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><LayoutGrid className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Ecosistema</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        <button onClick={() => handleNav('novedades')} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Novedades</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        <button onClick={() => handleNav('bolsa-de-trabajo')} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Briefcase className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Bolsa de Trabajo</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        <button onClick={() => handleNav('editor')} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Edit className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Ir al Editor</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
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
            {/* Punto focal esmeralda superior derecho (solo móvil) */}
            <div className="absolute top-[-1%] right-[-25%] w-[70vw] h-[70vw] bg-[#2D6A6A]/[0.15] rounded-full blur-[100px] mix-blend-multiply md:hidden"></div>
            
            <div className="absolute bottom-[-30%] right-[-20%] w-[100vw] md:w-[60vw] h-[100vw] md:h-[60vw] bg-[#1A3D3D]/[0.23] rounded-full blur-[150px] mix-blend-multiply"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] md:w-[45vw] h-[80vw] md:h-[45vw] bg-[#2D6A6A]/[0.23] rounded-full blur-[120px] mix-blend-multiply"></div>
            <div className="absolute bottom-[10%] right-[10%] w-[70vw] md:w-[40vw] h-[70vw] md:h-[40vw] bg-[#4DB6AC]/[0.23] rounded-full blur-[130px] mix-blend-multiply opacity-80"></div>
          </div>

          <div className="relative z-10 w-full pt-[55px] pb-16 md:pt-[70px] md:pb-24">
            <div className="max-w-[1100px] mx-auto px-8 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start reveal-on-scroll">
              
              {/* LADO IZQUIERDO: CONTENIDO */}
              <div className="flex flex-col items-start text-left lg:pt-8">
                <div className="mb-6 md:mb-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200/50 px-5 py-2.5 rounded-full shadow-sm">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#2D6A6A] animate-pulse"></span>
                  <span className="text-[#1A3D3D] font-bold text-[11px] uppercase tracking-[0.2em] leading-none">Red exclusiva de veterinarios</span>
                </div>

                <TypewriterTitle />
                
                <p className="text-base md:text-lg lg:text-xl text-gray-600 font-medium leading-relaxed mb-8 max-w-[550px]">
                  Tu perfil profesional, siempre vigente. Que clínicas y colegas te encuentren por tu talento, sin la presión de crear contenido diario.
                </p>
              </div>

              {/* LADO DERECHO: FORMULARIO DE REGISTRO */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#2D6A6A]/20 to-transparent rounded-[44px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <div className="relative bg-white/95 backdrop-blur-xl border border-white/50 rounded-[44px] p-8 md:p-10 shadow-[0_40px_80px_rgba(26,61,61,0.1)] flex flex-col items-center">
                  <h2 className="text-2xl font-black text-[#1A3D3D] mb-2 font-['Montserrat']">Crea tu cuenta, es gratis.</h2>
                  <p className="text-gray-400 text-sm font-medium mb-8">Únete a la red profesional de Argentina.</p>

                  <button className="flex items-center justify-center gap-3 w-full border border-gray-200 py-4 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700 mb-6 bg-white">
                      <Chrome className="w-5 h-5 text-red-500" /> Continuar con Google
                  </button>

                  <div className="flex items-center gap-4 w-full mb-6 text-gray-300">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">o con tu email</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>

                  <div className="w-full space-y-4 mb-8">
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Tu nombre completo" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-[#2D6A6A] focus:ring-4 focus:ring-[#2D6A6A]/5 outline-none font-medium text-sm transition-all bg-[#F9FBFA]" />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" placeholder="Tu email profesional" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:border-[#2D6A6A] focus:ring-4 focus:ring-[#2D6A6A]/5 outline-none font-medium text-sm transition-all bg-[#F9FBFA]" />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Crea una contraseña" 
                        className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-100 focus:border-[#2D6A6A] focus:ring-4 focus:ring-[#2D6A6A]/5 outline-none font-medium text-sm transition-all bg-[#F9FBFA]" 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2D6A6A] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button onClick={() => handleNav('editor')} className="w-full bg-[#2D6A6A] text-white py-5 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-[#1A3D3D] hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3">
                    Crear mi cuenta <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Pequeño texto legal en el registro */}
                  <p className="text-gray-400 text-[10px] text-center mt-5 w-full">
                    Al registrarte, aceptás nuestros <span onClick={() => handleNav('terminos')} className="underline cursor-pointer hover:text-[#2D6A6A]">Términos</span> y la <span onClick={() => handleNav('privacidad')} className="underline cursor-pointer hover:text-[#2D6A6A]">Política de Privacidad</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 1.5 MOCKUPS ÉPICOS (ESTILO LIMPIO Y PLANO) */}
        <section className="relative w-full bg-white pb-[60px] md:pb-[140px] pt-8 md:pt-16">
          <div className="max-w-[1200px] mx-auto px-8 reveal-on-scroll">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
              
              {/* Tarjeta 1: Buscador Inteligente (Plana, limpia) */}
              <div className="hidden md:block animate-float-fast">
                <div className="bg-white border border-gray-100 p-8 rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] relative overflow-hidden flex flex-col gap-6">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Filtros de Búsqueda</span>
                    <Filter className="w-4 h-4 text-gray-300" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl flex items-center gap-2 flex-1 cursor-pointer hover:bg-gray-100 transition-colors">
                      <MapPin className="w-4 h-4 text-[#2D6A6A]" />
                      <span className="text-xs font-bold text-gray-600">Capital Federal</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl flex items-center gap-2 flex-1 cursor-pointer hover:bg-gray-100 transition-colors">
                      <Stethoscope className="w-4 h-4 text-[#2D6A6A]" />
                      <span className="text-xs font-bold text-gray-600">Especialidad</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <Search className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-400 font-medium">Buscar veterinario...</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:-translate-y-1 transition-transform">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500"><Star className="w-5 h-5" /></div>
                      <div className="text-left"><p className="text-xs font-bold text-[#1A3D3D]">Neurología Clínica</p><p className="text-[10px] text-gray-400 font-medium">Dr. Pablo Rossi • A 5km</p></div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm opacity-60 cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500"><Activity className="w-5 h-5" /></div>
                      <div className="text-left"><p className="text-xs font-bold text-[#1A3D3D]">Oncología</p><p className="text-[10px] text-gray-400 font-medium">Dra. Ana Silva • Derivaciones</p></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta 2: Perfil Central (Limpia y destacada) */}
              <div className="z-20 animate-float">
                <div className="bg-white border border-gray-100 rounded-[48px] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col items-center text-center">
                  
                  <div className="relative mb-8 mt-2">
                    <div className="w-36 h-36 rounded-[40px] bg-gray-100 overflow-hidden relative z-10 border border-gray-100 shadow-md">
                      <img src="https://images.unsplash.com/photo-1594824436951-7f12bc3ac92e?auto=format&fit=crop&w=300&q=80" alt="Dra. Arenas" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-[#789A9A] p-3 rounded-2xl border-4 border-white shadow-lg text-white z-20">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-yellow-50/80 text-yellow-700 text-[10px] font-black px-5 py-2.5 rounded-full flex items-center gap-2 mb-6 border border-yellow-100 shadow-sm uppercase tracking-widest">
                      <Award className="w-4 h-4 fill-current" /> Referente Destacada
                  </div>

                  <h3 className="text-3xl font-bold text-[#1A3D3D] font-['Montserrat'] leading-tight mb-2">Dra. Mercedes Arenas</h3>
                  <p className="text-[#2D6A6A] text-sm font-black uppercase tracking-[0.2em] mb-8">Cirujana Traumatóloga</p>
                  
                  <div className="flex flex-col gap-3 w-full mb-10">
                    <div className="bg-[#F9FBFA] px-5 py-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100"><MapPin className="w-5 h-5 text-[#2D6A6A]" /></div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Zona de atención</p>
                        <p className="text-sm font-bold text-[#1A3D3D]">CABA y GBA Norte</p>
                      </div>
                    </div>
                    <div className="bg-[#F9FBFA] px-5 py-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100"><Stethoscope className="w-5 h-5 text-[#2D6A6A]" /></div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Modalidad</p>
                        <p className="text-sm font-bold text-[#1A3D3D]">Derivaciones y Quirófano</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-[#1A3D3D] text-white font-black py-5 rounded-[24px] shadow-lg hover:bg-[#2D6A6A] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                    Ver trayectoria <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tarjeta 3: Bolsa de Trabajo / Oportunidades (Sólida, sin 3D) */}
              <div className="hidden md:block animate-float-delayed">
                <div className="bg-[#1A3D3D] text-white p-8 rounded-[40px] shadow-[0_30px_80px_rgba(26,61,61,0.2)] border border-[#2D6A6A]/30 relative overflow-hidden flex flex-col gap-6">
                  
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-white/10 p-4 rounded-2xl text-white backdrop-blur-md border border-white/10"><Briefcase className="w-6 h-6" /></div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/60 leading-none">Búsquedas Activas</p>
                      </div>
                      <p className="font-bold text-xl font-['Montserrat'] leading-tight">Bolsa de Trabajo</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-[#2D6A6A]/20 border border-white/10 p-5 rounded-3xl cursor-pointer text-left">
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-xs font-bold text-white">Especialista en Diagnóstico</p>
                        <span className="bg-green-500/20 text-green-300 text-[9px] px-2.5 py-1 rounded font-bold uppercase tracking-wider">Urgente</span>
                      </div>
                      <p className="text-[11px] text-white/60 mb-4 leading-relaxed font-medium">Manejo de ecógrafo Doppler. Turnos rotativos de 6hs. Honorarios a convenir.</p>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-[10px] font-bold text-white/70 flex items-center gap-2"><MapPin className="w-3 h-3 text-[#2D6A6A]" /> Hospital Norte</span>
                        <ArrowRight className="w-4 h-4 text-white/40" />
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-5 rounded-3xl opacity-60 cursor-pointer text-left">
                       <p className="text-xs font-bold text-white mb-3">Médico de Guardia (Domingos)</p>
                       <p className="text-[11px] text-white/60 mb-4 leading-relaxed font-medium">Guardias pasivas 24hs. Excluyente: 2 años de experiencia clínica comprobable.</p>
                       <div className="flex items-center justify-between pt-4 border-t border-white/5">
                         <span className="text-[10px] font-bold text-white/70 flex items-center gap-2"><MapPin className="w-3 h-3 text-[#2D6A6A]" /> Clínica Los Alerces</span>
                         <ArrowRight className="w-4 h-4 text-white/40" />
                       </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-6 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#1A3D3D]"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#1A3D3D]"></div>
                      <div className="w-8 h-8 rounded-full bg-[#2D6A6A] border-2 border-[#1A3D3D] flex items-center justify-center text-[9px] font-bold">+12</div>
                    </div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Empresas buscando hoy</p>
                  </div>
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
            image="https://images.unsplash.com/photo-1527526029430-319f10814151?auto=format&fit=crop&w=800&q=80"
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
          />

          <ZigZagSection 
            bgClass="bg-[#1A3D3D]"
            isDark={true}
            icon={Users}
            subtitle="Comunidad"
            title="Rompé con el aislamiento del consultorio."
            text="El Portal te permite mantenerte conectado con los referentes de tu área. Encontrá fácilmente el contacto exacto que necesitás para derivar un paciente, trabajar en equipo o impulsar tu carrera. Una red sólida te abre puertas a oportunidades reales, desde nuevas alianzas hasta invitaciones para disertar en cursos de tu especialidad."
            image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
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
            title="Tu trayectoria, validada y en un solo lugar."
            text="Centralizá tu experiencia, formación y casos de éxito en una plataforma exclusiva. Tu perfil en El Portal funciona como una carta de presentación digital de máxima credibilidad. Asegurate de que, cuando una clínica o colega escuche tu nombre, encuentre un respaldo profesional que hable por tu talento."
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80"
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

        {/* 3. ECOSISTEMA BENTO GRID */}
        <section id="ecosistema" className="py-24 md:py-32 bg-[#F4F7F7] relative overflow-hidden reveal-on-scroll">
          <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10 text-center">
            
            <div className="text-center mb-16 md:mb-20">
              <h3 className="text-[#2D6A6A] font-bold text-[11px] uppercase tracking-[0.3em] mb-4 text-center">Contactos e información al instante</h3>
              <h2 className="text-3xl md:text-5xl font-black text-[#1A3D3D] font-['Montserrat'] leading-[1.1] tracking-tighter text-center">
                Espacios diseñados para<br/>agilizar tu práctica diaria.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Widget: Bolsa de trabajo */}
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

              {/* Widget: Noticias */}
              <div className="md:col-span-1 md:row-span-2 bg-[#1A3D3D] p-8 rounded-[32px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-300 flex flex-col group overflow-hidden border border-white/5 text-left">
                <div className="flex items-center gap-3 mb-4 text-left">
                  <Newspaper className="w-6 h-6 text-white" />
                  <h3 className="text-2xl font-bold font-['Montserrat'] text-white">Noticias</h3>
                </div>
                <p className="text-white/70 leading-relaxed font-medium mb-8 text-sm text-left">
                  Mantenete al día con los avances de la medicina veterinaria en Argentina. Un feed exclusivo para descubrir procedimientos innovadores y celebrar las hazañas de tus colegas.
                </p>
                <div className="mt-auto space-y-3 relative z-10 text-left">
                  <div className="bg-gray-100 p-4 rounded-2xl shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300 text-left">
                    <div className="flex gap-2 items-center mb-2 text-left">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] text-[#2D6A6A] uppercase tracking-widest font-black text-left">Tendencia</span>
                    </div>
                    <p className="font-bold text-sm leading-tight text-[#1A3D3D] text-left">Nueva técnica en cirugía de tejidos blandos.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/5 text-left transition-all duration-500">
                    <p className="font-bold text-sm leading-tight text-white/40 text-left">El Portal llega a los 10k miembros activos.</p>
                  </div>
                </div>
              </div>

              {/* Widget: Cursos */}
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

              {/* Widget: Insumos */}
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

              {/* Widget: Grandes Animales */}
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

              {/* Widget: Servicios Complementarios */}
              <div className="md:col-span-2 bg-[#2D6A6A]/5 border border-[#2D6A6A]/10 p-8 md:p-10 rounded-[32px] hover:bg-[#2D6A6A]/10 transition-all duration-300 flex flex-col md:flex-row gap-8 items-center text-left">
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-4 mb-4 text-left">
                    <Activity className="w-6 h-6 text-[#2D6A6A]" />
                    <h3 className="text-2xl font-bold font-['Montserrat'] text-[#1A3D3D]">Servicios & terapias complementarias</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium text-sm text-left">
                    Damos visibilidad a esos profesionales y servicios especializados difíciles de hallar: fisioterapia, terapias holísticas, etología clínica, rehabilitación y nutrición natural. Conectamos todo el ecosistema de bienestar.
                  </p>
                </div>
                <div className="w-full md:w-auto flex flex-wrap md:flex-col gap-3 text-left">
                  <span className="bg-white text-[#2D6A6A] px-4 py-2 rounded-xl text-xs font-bold border border-[#2D6A6A]/20 hover:bg-[#2D6A6A] hover:text-white transition-colors cursor-pointer shadow-sm text-center">Rehabilitación</span>
                  <span className="bg-white text-[#2D6A6A] px-4 py-2 rounded-xl text-xs font-bold border border-[#2D6A6A]/20 hover:bg-[#2D6A6A] hover:text-white transition-colors cursor-pointer shadow-sm text-center">Etología</span>
                  <span className="bg-white text-[#2D6A6A] px-4 py-2 rounded-xl text-xs font-bold border border-[#2D6A6A]/20 hover:bg-[#2D6A6A] hover:text-white transition-colors cursor-pointer shadow-sm text-center">Fisioterapia</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. CALL TO ACTION FINAL */}
        <section className="py-24 md:py-32 bg-[#2D6A6A] relative overflow-hidden text-center">
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

        {/* FOOTER OPTIMIZADO */}
        <footer ref={footerRef} className="w-full bg-[#1A3D3D] relative overflow-hidden pt-20 pb-12 text-left">
          <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10 text-left">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
              
              {/* Columna 1: Logo, Descripción, Redes y Legal */}
              <div className="md:col-span-1 text-left flex flex-col h-full">
                <div className="text-white font-['Montserrat'] font-bold text-2xl mb-6 text-left leading-none cursor-pointer" onClick={() => handleNav('landing')}>El Portal<span className="text-[#2D6A6A]">.</span></div>
                <p className="text-white/50 text-[13px] leading-relaxed mb-8 font-medium text-left">La red profesional exclusiva para medicina veterinaria de alta complejidad. Conectando talento con vocación.</p>
                
                <div className="mt-auto">
                  {/* Redes Sociales */}
                  <div className="flex gap-3 text-left mb-5">
                    <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Facebook className="w-4 h-4" /></a>
                    <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-4 h-4" /></a>
                    <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-4 h-4" /></a>
                  </div>
                  
                  {/* Textos Legales y Derechos (Integrado aquí) */}
                  <div className="text-white/40 text-[10px] font-medium space-y-1.5 flex flex-col items-start">
                    <p>&copy; {new Date().getFullYear()} El Portal. Todos los derechos reservados.</p>
                    <p className="flex items-center gap-2">
                      <button onClick={() => handleNav('terminos')} className="underline hover:text-white transition-colors focus:outline-none">Términos</button>
                      <span>•</span>
                      <button onClick={() => handleNav('privacidad')} className="underline hover:text-white transition-colors focus:outline-none">Privacidad</button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Columna 2 */}
              <div className="text-left">
                <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6 text-left">Navegación</h4>
                <ul className="space-y-4 text-white/40 text-sm text-left">
                  <li className="text-left"><a href="#" className="hover:text-white transition-colors font-medium text-left">Inicio</a></li>
                  <li className="text-left"><a href="#historia" className="hover:text-white transition-colors font-medium text-left">¿Por qué unirte?</a></li>
                </ul>
              </div>

              {/* Columna 3 */}
              <div className="text-left">
                <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6 text-left">Red Profesional</h4>
                <ul className="space-y-4 text-white/40 text-sm text-left">
                  <li className="text-left"><a href="#ecosistema" className="hover:text-white transition-colors font-medium text-left">Bolsa de Trabajo</a></li>
                  <li className="text-left"><a href="#ecosistema" className="hover:text-white transition-colors font-medium text-left">Cursos e Insumos</a></li>
                </ul>
              </div>

              {/* Columna 4 */}
              <div className="text-left">
                <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6 text-left">Contacto</h4>
                <ul className="space-y-4 text-white/40 text-sm leading-none text-left">
                  <li className="text-left"><a href="mailto:elportalveterinario.arg@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="w-4 h-4 shrink-0" /> <span>elportalveterinario.arg@gmail.com</span></a></li>
                  <li className="flex items-center gap-3 text-left"><Globe className="w-4 h-4 text-left" /> elportal.vet</li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-left">
              <p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.3em] text-left">creado por Belén M. Arenas</p>
              <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium flex items-center gap-1.5 group cursor-default text-left">
                <span className="text-left">Hecho con</span>
                <Heart className="w-3 h-3 text-red-400/50 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300 fill-current text-left" />
                <span className="text-left">en Argentina.</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-left">
                <ShieldCheck className="w-3.5 h-3.5 text-left" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] leading-none text-left">Única plataforma veterinaria oficial</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* CARTEL DE COOKIES (FLOTANTE ABAJO) */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-[#0a1e1e]/95 backdrop-blur-md border-t border-white/10 z-[100] py-3 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 animate-slide-up shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <div className="flex items-start md:items-center gap-3 text-white/80 text-[11px] md:text-xs font-medium max-w-[900px]">
            <Info className="w-4 h-4 text-[#2D6A6A] shrink-0 mt-0.5 md:mt-0" />
            <p>
              Utilizamos cookies para mejorar tu experiencia en El Portal. Al continuar navegando, aceptás nuestros <button onClick={() => handleNav('terminos')} className="text-white font-bold underline hover:text-[#4DB6AC] transition-colors focus:outline-none">Términos</button> y nuestra <button onClick={() => handleNav('privacidad')} className="text-white font-bold underline hover:text-[#4DB6AC] transition-colors focus:outline-none">Política de Privacidad</button>.
            </p>
          </div>
          <button 
            onClick={() => setShowCookieBanner(false)}
            className="bg-[#2D6A6A] hover:bg-white text-white hover:text-[#1A3D3D] px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shadow-md"
          >
            Entendido
          </button>
        </div>
      )}

    </div>
  );
}

// ==========================================
// EXPORTACIÓN PRINCIPAL (WRAPPER CON ROUTER)
// ==========================================
export default function LandingPage() {
  return (
    <LandingPageContent />
  );
}