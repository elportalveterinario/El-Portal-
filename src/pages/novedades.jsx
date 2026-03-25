import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Home, User, LayoutGrid, Briefcase, 
  Facebook, Instagram, Linkedin, Mail, Globe, Heart, ShieldCheck, 
  Sparkles, Edit, Info,
  Building, Truck
} from 'lucide-react';

// ==========================================
// COMPONENTE WIDGET DE ACCESIBILIDAD INTEGRADO
// ==========================================
const AccessibilityWidget = () => {
  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <button 
        className="bg-[#2D6A6A] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#1A3D3D] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        title="Opciones de Accesibilidad"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-pulse">
          <circle cx="12" cy="5" r="2"/>
          <path d="m3 10 4-1 5 2 5-2 4 1"/>
          <path d="m12 16-3 6"/>
          <path d="m12 16 3 6"/>
          <path d="M12 11v5"/>
        </svg>
      </button>
    </div>
  );
};

export default function Novedades() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const navigate = useNavigate();

  // Configuración de fuentes, estilos y observadores
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    const handleScroll = () => setIsNavbarScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
      window.removeEventListener('scroll', handleScroll);
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return (
    <div className="bg-[#F4F7F7] min-h-screen font-['Inter'] antialiased relative flex flex-col">
      
      {/* WIDGET DE ACCESIBILIDAD */}
      <div className={`transition-all duration-300 ease-in-out ${isFooterVisible ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <AccessibilityWidget />
      </div>

      {/* NAVBAR */}
      <nav className={`sticky top-0 w-full z-50 h-[80px] flex items-center px-8 md:px-10 transition-all duration-300 print:hidden ${isNavbarScrolled ? 'bg-white/85 backdrop-blur-md shadow-md border-b border-gray-200' : 'bg-white border-b border-gray-100 shadow-sm'}`}>
        <div className="max-w-[1100px] mx-auto w-full flex justify-between items-center">
          <div onClick={() => navigate('/')} className="text-[#1A3D3D] font-['Montserrat'] font-black text-2xl tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
            El Portal<span className="text-[#2D6A6A]">.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-10 text-[11px] font-black text-gray-400 uppercase tracking-widest">
              <button onClick={() => navigate('/ecosistema')} className="hover:text-[#1A3D3D] cursor-pointer transition-colors">Ecosistema</button>
              <button onClick={() => navigate('/bolsa-de-trabajo')} className="hover:text-[#1A3D3D] cursor-pointer transition-colors">Empleos</button>
              <button onClick={() => navigate('/novedades')} className="text-[#1A3D3D] border-b-2 border-[#2D6A6A] pb-1 cursor-pointer transition-colors">Novedades</button>
              <button onClick={() => navigate('/editor')} className="bg-[#1A3D3D] text-white px-8 py-3 rounded-full hover:bg-[#2D6A6A] transition-all">Publicar</button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                aria-label={isMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
                className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-[#1A3D3D] hover:bg-[#F4F7F7] transition-all active:scale-95"
              >
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
                      <button onClick={() => { navigate('/ecosistema'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><LayoutGrid className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Repertorio Clínico</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/novedades'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Novedades</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/bolsa-de-trabajo'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Briefcase className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Bolsa de Trabajo</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>

                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 py-3 border-b border-gray-50 mb-2 mt-2 text-left">Perfiles</p>
                      <button onClick={() => { navigate('/perfil-clinica'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Building className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Perfil Clínica</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/perfil-proveedor'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Truck className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Perfil Proveedor</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 py-3 border-b border-gray-50 mb-2 mt-2 text-left">Editores</p>
                      <button onClick={() => { navigate('/editor-clinica'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Edit className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Editor Clínica</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                      <button onClick={() => { navigate('/editor-insumos'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Edit className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Editor Insumos</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL: PRÓXIMAMENTE */}
      <main className="flex-grow flex items-center justify-center px-8 md:px-10 py-20 relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2D6A6A] opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-[#1A3D3D] opacity-5 rounded-full blur-[80px] pointer-events-none hidden md:block"></div>
        
        <div className="max-w-[700px] w-full bg-white rounded-[40px] p-10 md:p-16 text-center border border-gray-100 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-700">
          
          <div className="w-20 h-20 bg-[#1A3D3D] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#1A3D3D]/20 transform rotate-12 hover:rotate-0 transition-all duration-500">
            <Sparkles className="w-10 h-10 text-[#4DB6AC]" />
          </div>

          <p className="font-['Montserrat'] text-[#2D6A6A] font-black text-xs md:text-sm uppercase tracking-[0.3em] mb-4">
            Espacio en construcción
          </p>

          <h1 className="text-4xl md:text-5xl font-black font-['Montserrat'] text-[#1A3D3D] tracking-tighter uppercase leading-tight mb-6">
            Novedades y Casos Clínicos
          </h1>

          <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-lg mx-auto mb-10">
            Muy pronto habilitaremos esta sección para compartir artículos, noticias y casos destacados de la comunidad veterinaria.
          </p>

          <div className="bg-[#F4F7F7] rounded-[24px] p-6 md:p-8 flex flex-col items-center border border-gray-100">
            <h3 className="text-[#1A3D3D] font-bold text-base mb-2">
              ¿Tenés algo interesante para compartir?
            </h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm">
              Si querés publicar un artículo o caso clínico cuando lancemos la sección, escribinos.
            </p>
            
            <a 
              href="mailto:elportalveterinario.arg@gmail.com?subject=Quiero%20publicar%20un%20artículo%20en%20El%20Portal"
              className="bg-[#1A3D3D] text-white py-3.5 px-8 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#2D6A6A] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Mail className="w-4 h-4" /> ¿Te gustaría publicar acá?
            </a>
          </div>

        </div>
      </main>

      {/* FOOTER COMPACTO (Definitivo) */}
      <footer ref={footerRef} className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden pt-12 pb-8 text-left print:hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
        <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10 text-left">
          
          {/* BLOQUE DE CONTENIDO SUPERIOR */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-8 mb-6 text-left">
            
            {/* COLUMNA 1: Branding */}
            <div className="md:col-span-1 text-left">
              <button onClick={() => navigate('/')} className="text-white font-['Montserrat'] font-bold text-2xl mb-4 text-left leading-none cursor-pointer block hover:opacity-80 transition-opacity">
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
                <li><button onClick={() => navigate('/ecosistema')} className="hover:text-white transition-colors">Cursos y Seminarios</button></li>
                <li><button onClick={() => navigate('/ecosistema')} className="hover:text-white transition-colors">Insumos</button></li>
              </ul>
            </div>

            {/* COLUMNA 3: Comunidad */}
            <div>
              <h4 className="text-white font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-4">Comunidad</h4>
              <ul className="space-y-2 text-white/40 text-sm">
                <li><button onClick={() => navigate('/bolsa-de-trabajo')} className="hover:text-white transition-colors">Bolsa de Trabajo</button></li>
                <li><button onClick={() => navigate('/inicio')} className="hover:text-white transition-colors">Foro de Discusión</button></li>
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