import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, X, Heart, Facebook, Instagram, Linkedin, Mail, Globe, Info, ShieldCheck,
  Home, User, LayoutGrid, Sparkles, Briefcase, Edit, ChevronRight,
  Building, Truck
} from 'lucide-react';

export default function Inicio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@300;400;500;600;700&display=swap';
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

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7F7] font-['Inter'] text-[#333333] flex flex-col relative antialiased selection:bg-[#2D6A6A] selection:text-white">
      
      {/* Capa de textura de grano */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.025] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* NAVBAR: Manteniendo tu estilo original */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-[80px] bg-white/90 backdrop-blur-lg border-b border-gray-100 flex items-center px-8 md:px-10">
        <div className="max-w-[1100px] mx-auto w-full flex justify-between items-center">
            <div className="text-[#1A3D3D] font-['Montserrat'] font-extrabold text-2xl tracking-tighter cursor-pointer">
                El Portal<span className="text-[#2D6A6A]">.</span>
            </div>

            <div className="hidden lg:flex items-center gap-10 text-gray-500 font-medium text-[13px] uppercase tracking-wider">
                <span className="opacity-40 cursor-default">¿Por qué unirte?</span>
                <span className="opacity-40 cursor-default">Ecosistema</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-12 h-12 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-[#1A3D3D]">
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
                    </nav>
                  </>
                )}
              </div>
            </div>
        </div>
      </nav>

      {/* SECCIÓN CENTRAL: Ahora con min-height para evitar que se peguen los elementos */}
      <main className="flex-grow flex items-center justify-center pt-[80px] min-h-[60vh]">
        <div className="relative z-10 text-center py-20">
          <h1 className="text-xl md:text-2xl font-black text-[#1A3D3D] tracking-[0.2em] font-['Montserrat'] uppercase opacity-60">
            Sitio en <span className="text-[#2D6A6A]">construcción</span>
          </h1>
          <div className="mt-4 h-[2px] w-10 bg-[#2D6A6A]/40 mx-auto rounded-full"></div>
        </div>
      </main>

      {/* FOOTER: Manteniendo tu estilo original */}
      <footer className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden pt-20 pb-12 text-left print:hidden mt-auto">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
        <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-1">
              <div onClick={() => navigate('/')} className="text-white font-['Montserrat'] font-bold text-2xl mb-6 leading-none cursor-pointer block hover:opacity-80 transition-opacity">
                El Portal<span className="text-white/40">.</span>
              </div>
              <p className="text-white/50 text-[13px] leading-relaxed mb-6 font-medium">La red profesional exclusiva para medicina veterinaria de alta complejidad. Conectando talento con vocación.</p>
              <div className="flex gap-3">
                <button aria-label="Facebook de El Portal" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Facebook className="w-4 h-4" /></button>
                <button aria-label="Instagram de El Portal" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-4 h-4" /></button>
                <button aria-label="Linkedin de El Portal" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-4 h-4" /></button>
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
                <li><button onClick={() => navigate('/')} className="hover:text-white transition-colors">Inicio</button></li>
                <li><button onClick={() => navigate('/perfil')} className="hover:text-white transition-colors">Mi Perfil</button></li>
                <li><button onClick={() => navigate('/editor')} className="hover:text-white transition-colors">Editor de Perfil</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-6">Ecosistema</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><button onClick={() => navigate('/ecosistema')} className="hover:text-white transition-colors">Cursos y Seminarios</button></li>
                <li><button onClick={() => navigate('/bolsa-de-trabajo')} className="hover:text-white transition-colors">Bolsa de Trabajo</button></li>
                <li><button onClick={() => navigate('/novedades')} className="hover:text-white transition-colors">Novedades</button></li>
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

      {/* BANNER DE COOKIES */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 w-full bg-[#0a1e1e]/95 backdrop-blur-md border-t border-white/10 z-[100] py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-slide-up shadow-2xl">
          <div className="flex items-center gap-3 text-white/60 text-[11px] font-medium">
            <Info size={14} className="text-[#2D6A6A]" />
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