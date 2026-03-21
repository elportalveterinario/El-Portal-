import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, Home, User, LayoutGrid, Briefcase, 
  Facebook, Instagram, Linkedin, Mail, Globe, Heart, ShieldCheck, 
  Sparkles, Edit, Info
} from 'lucide-react';

export default function TerminosYCondiciones() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const footerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleScroll = () => setIsNavbarScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.head.removeChild(link);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#F4F7F7] min-h-screen font-['Inter'] antialiased relative flex flex-col">
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
              <button onClick={() => navigate('/novedades')} className="hover:text-[#1A3D3D] cursor-pointer transition-colors">Novedades</button>
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
                  <nav className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(26,61,61,0.15)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
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
                  </nav>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-8 md:px-10 py-16">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 prose-lg max-w-none">
          <h1 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A3D3D] tracking-tight !mb-4">Términos y Condiciones</h1>
          <p className="text-gray-400 text-sm !mt-0">Última actualización: {new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <p>Bienvenido a El Portal. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de El Portal, ubicado en elportal.vet.</p>
          
          <h2 className="text-[#1A3D3D]">1. Aceptación de los Términos</h2>
          <p>Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando El Portal si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.</p>
          
          <h2 className="text-[#1A3D3D]">2. Cuentas de Usuario</h2>
          <p>Cuando creas una cuenta con nosotros, debes proporcionarnos información precisa, completa y actualizada en todo momento. El incumplimiento de esta condición constituye una violación de los Términos, lo que puede resultar en la terminación inmediata de tu cuenta en nuestro Servicio.</p>
          
          <h2 className="text-[#1A3D3D]">3. Contenido</h2>
          <p>Nuestro Servicio te permite publicar, enlazar, almacenar, compartir y de otra manera poner a disposición cierta información, texto, gráficos, videos u otro material ("Contenido"). Eres responsable del Contenido que publiques en el Servicio, incluida su legalidad, fiabilidad y adecuación.</p>
          
          <h2 className="text-[#1A3D3D]">4. Propiedad Intelectual</h2>
          <p>El Servicio y su contenido original, características y funcionalidades son y seguirán siendo propiedad exclusiva de El Portal y sus licenciantes. El Servicio está protegido por derechos de autor, marcas registradas y otras leyes tanto de Argentina como de países extranjeros.</p>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </main>

      {/* FOOTER */}
      <footer ref={footerRef} className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden pt-20 pb-12 text-left print:hidden mt-auto">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
        <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <div onClick={() => navigate('/')} className="text-white font-['Montserrat'] font-bold text-2xl mb-6 leading-none cursor-pointer block hover:opacity-80 transition-opacity">El Portal<span className="text-white/40">.</span></div>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6 font-medium">La red profesional exclusiva para medicina veterinaria de alta complejidad.</p>
              <div className="flex gap-3"><button aria-label="Facebook" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Facebook className="w-4 h-4" /></button><button aria-label="Instagram" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-4 h-4" /></button><button aria-label="Linkedin" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-4 h-4" /></button></div>
              <div className="text-white/40 text-[10px] font-medium space-y-1.5 flex flex-col items-start mt-6"><p>&copy; {new Date().getFullYear()} El Portal. Todos los derechos reservados.</p><p className="flex items-center gap-2"><button onClick={() => navigate('/terminos-y-condiciones')} className="underline hover:text-white transition-colors">Términos</button><span>•</span><button onClick={() => navigate('/politica-de-privacidad')} className="underline hover:text-white transition-colors">Privacidad</button></p></div>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Navegación</h4>
              <ul className="space-y-4 text-white/40 text-sm"><li><button onClick={() => navigate('/')} className="hover:text-white transition-colors">Inicio</button></li><li><button onClick={() => navigate('/perfil')} className="hover:text-white transition-colors">Mi Perfil</button></li><li><button onClick={() => navigate('/editor')} className="hover:text-white transition-colors">Editor</button></li></ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Ecosistema</h4>
              <ul className="space-y-4 text-white/40 text-sm"><li><button onClick={() => navigate('/ecosistema')} className="hover:text-white transition-colors">Cursos</button></li><li><button onClick={() => navigate('/bolsa-de-trabajo')} className="hover:text-white transition-colors">Bolsa de Trabajo</button></li><li><button onClick={() => navigate('/novedades')} className="hover:text-white transition-colors">Novedades</button></li></ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Contacto</h4>
              <ul className="space-y-4 mb-8 text-white/40 text-sm leading-none"><li><a href="mailto:elportalveterinario.arg@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="w-4 h-4 shrink-0" /> <span>elportalveterinario.arg@gmail.com</span></a></li><li className="flex items-center gap-3"><Globe className="w-4 h-4" /> elportal.vet</li></ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.3em]">creado por Belén M. Arenas</p>
            <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium flex items-center gap-1.5 group cursor-default"><span>Hecho con</span><Heart className="w-3 h-3 text-red-400/50 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300 fill-current" /><span>en Argentina.</span></div>
            <div className="flex items-center gap-2 text-white/40"><ShieldCheck className="w-3.5 h-3.5" /><span className="text-[10px] font-bold uppercase tracking-[0.3em] leading-none">Única plataforma veterinaria oficial</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}