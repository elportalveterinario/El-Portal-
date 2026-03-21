import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, MapPin, ChevronRight, ChevronLeft, Building2, 
  Phone, Globe, Mail, Heart, Menu, X, Instagram, Linkedin, Facebook,
  Truck, Box, CreditCard, Clock, Award, Check, Sparkles, PackageSearch,
  ExternalLink, ArrowUpRight, Search, Shield
} from 'lucide-react';

// ==========================================
// DATOS DEL PROVEEDOR
// ==========================================
const PROVEEDOR = {
  nombre: "VetSur Insumos",
  categoria: "Distribuidor Oficial Nacional",
  cuit: "CUIT 30-71234567-8",
  verificado: true,
  fotoPortada: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  logo: "https://api.dicebear.com/7.x/initials/svg?seed=VS&backgroundColor=1A3D3D",
  bioCorta: "Más de 15 años equipando quirófanos y consultorios veterinarios en toda la Argentina con tecnología de punta y soporte técnico directo.",
  bioLarga: "Entendemos que el equipamiento de tu clínica es el corazón de tus diagnósticos y cirugías. Por eso, en VetSur no solo somos distribuidores, somos socios estratégicos del profesional veterinario. Contamos con un equipo de bioingenieros para servicio técnico oficial y garantizamos la trazabilidad de todos nuestros insumos importados.",
  provincia: "Buenos Aires, Argentina (Base Operativa)",
  contacto: {
    whatsapp: "+5491112345678",
    email: "ventas@vetsur.com.ar",
    web: "vetsur.com.ar",
    linkWeb: "https://vetsur.com.ar"
  },
  redes: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  },
  condiciones: {
    minimo: "$50.000 final",
    publico: "Venta exclusiva a matriculados",
    pagos: "Transferencia, Cheque a 30 días, Tarjetas"
  },
  estadisticas: [
    { valor: "+2500", label: "Clínicas Equipadas" },
    { valor: "24hs", label: "Tiempo de Despacho" },
    { valor: "100%", label: "Soporte Oficial" }
  ],
  marcas: [
    { id: 1, nombre: "Bayer", logo: "https://placehold.co/300x150/ffffff/1A3D3D?text=BAYER&font=montserrat" },
    { id: 2, nombre: "Zoetis", logo: "https://placehold.co/300x150/ffffff/1A3D3D?text=ZOETIS&font=montserrat" },
    { id: 3, nombre: "Mindray", logo: "https://placehold.co/300x150/ffffff/1A3D3D?text=MINDRAY&font=montserrat" },
    { id: 4, nombre: "Brouwer", logo: "https://placehold.co/300x150/ffffff/1A3D3D?text=BROUWER&font=montserrat" }
  ],
  productosDestacados: [
    { id: 1, titulo: "Ecógrafo Portátil Mindray V1", categoria: "Imágenes", precio: "2.500.000", imagen: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=500&q=80" },
    { id: 2, titulo: "Monitor Multiparamétrico Vet", categoria: "Quirófano", precio: "850.000", imagen: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=500&q=80" }
  ]
};

export default function PerfilProveedor() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('empresa');

  // Efecto para tipografías (como en tu ecosistema)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // Efecto para scroll del Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#F4F7F7] min-h-screen font-['Inter'] antialiased relative selection:bg-[#2D6A6A] selection:text-white">
      
      {/* ==========================================
          NAVBAR (Estilo Ecosistema)
          ========================================== */}
      <nav className={`fixed top-0 w-full z-50 h-[80px] flex items-center px-6 md:px-12 lg:px-24 transition-all duration-300 ${isNavbarScrolled ? 'bg-white/85 backdrop-blur-md shadow-md border-b border-gray-200 py-0' : 'bg-transparent py-2'}`}>
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
          <button onClick={() => navigate('/')} className={`font-['Montserrat'] font-black text-2xl tracking-tighter cursor-pointer transition-colors ${isNavbarScrolled ? 'text-[#1A3D3D]' : 'text-white drop-shadow-md'}`}>
            El Portal<span className={isNavbarScrolled ? 'text-[#2D6A6A]' : 'text-[#4DB6AC]'}>.</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className={`hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest transition-colors ${isNavbarScrolled ? 'text-gray-400' : 'text-white/80 drop-shadow-sm'}`}>
              <button onClick={() => navigate('/repertorio')} className={`hover:text-[#2D6A6A] transition-colors ${isNavbarScrolled ? 'hover:text-[#1A3D3D]' : 'hover:text-white'}`}>Repertorio</button>
              <button className={`border-b-2 pb-1 ${isNavbarScrolled ? 'border-[#2D6A6A] text-[#1A3D3D]' : 'border-white text-white'}`}>Perfil Empresa</button>
            </div>

            {/* Menu Hamburguesa */}
            <div className="relative md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`w-12 h-12 rounded-2xl border shadow-sm flex items-center justify-center transition-all active:scale-95 ${isNavbarScrolled ? 'bg-white border-gray-100 text-[#1A3D3D]' : 'bg-white/10 backdrop-blur-sm border-white/20 text-white'}`}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)}></div>
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 p-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-4 py-3 border-b border-gray-50 mb-2">Navegación</p>
                    <button onClick={() => navigate('/')} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group">
                      <span className="text-sm font-bold text-[#1A3D3D]">Inicio</span><ChevronRight className="w-4 h-4 text-gray-300" />
                    </button>
                    <button onClick={() => navigate('/repertorio')} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group">
                      <span className="text-sm font-bold text-[#1A3D3D]">Repertorio Clínico</span><ChevronRight className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ==========================================
          HERO SECTION (B2B Vibe)
          ========================================== */}
      <section className="relative pt-[120px] pb-32 md:pb-48 px-6 md:px-12 lg:px-24 bg-[#1A3D3D] overflow-hidden">
        {/* Imagen de fondo con overlay para que el texto resalte */}
        <div className="absolute inset-0 z-0">
          <img src={PROVEEDOR.fotoPortada} alt="Fondo Empresa" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3D3D] via-[#1A3D3D]/80 to-transparent"></div>
          {/* Orbes de luz al estilo El Portal */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2D6A6A]/30 rounded-full blur-[100px] mix-blend-screen translate-x-1/3 -translate-y-1/3"></div>
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white font-bold text-xs md:text-[10px] uppercase tracking-[0.3em] mb-8 transition-colors group w-fit">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver
          </button>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end">
            <div className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-[32px] p-3 shadow-2xl shrink-0 border border-white/10 relative group">
              <img src={PROVEEDOR.logo} alt={PROVEEDOR.nombre} className="w-full h-full object-cover rounded-[20px]" />
              {PROVEEDOR.verificado && (
                <div className="absolute -bottom-3 -right-3 bg-[#4DB6AC] text-white p-2.5 rounded-xl shadow-lg border-2 border-white/20 tooltip-trigger group">
                  <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                  {/* Tooltip personalizado */}
                  <span className="absolute bottom-full mb-2 right-0 bg-white text-[#1A3D3D] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
                    Proveedor Verificado
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 pb-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
                <span className="flex h-2 w-2 rounded-full bg-[#4DB6AC] animate-pulse"></span>
                <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em] leading-none">{PROVEEDOR.categoria}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white font-['Montserrat'] leading-[1.1] tracking-tighter mb-4">
                {PROVEEDOR.nombre}
              </h1>
              <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                {PROVEEDOR.bioCorta}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN CONTENT (Layout dividido)
          ========================================== */}
      <main className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-24 relative z-20 -mt-16 md:-mt-24 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* COLUMNA IZQUIERDA (Info Empresa) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Nav interna (Tabs) */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-2 flex flex-wrap gap-2 md:gap-4 justify-between md:justify-start">
              {['empresa', 'catalogo', 'marcas'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-6 py-3.5 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all rounded-[16px] ${activeTab === tab ? 'bg-[#1A3D3D] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50 hover:text-[#1A3D3D]'}`}
                >
                  {tab === 'empresa' ? 'La Empresa' : tab === 'catalogo' ? 'Catálogo Rápido' : 'Marcas Oficiales'}
                </button>
              ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* TAB: EMPRESA */}
              {activeTab === 'empresa' && (
                <div className="space-y-8">
                  {/* Tarjeta Historia/Bio */}
                  <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-4">Sobre Nosotros</h2>
                    <p className="text-gray-500 font-medium text-[15px] leading-relaxed mb-8">
                      {PROVEEDOR.bioLarga}
                    </p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-50">
                      {PROVEEDOR.estadisticas.map((stat, idx) => (
                        <div key={idx} className="bg-[#F4F7F7] rounded-[20px] p-6 text-center border border-gray-100 hover:border-[#2D6A6A]/30 transition-colors">
                          <span className="block text-3xl font-black font-['Montserrat'] text-[#2D6A6A] mb-1">{stat.valor}</span>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BENTO BOX: Logística y Condiciones */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black font-['Montserrat'] text-[#1A3D3D] mb-2">Logística Integral</h3>
                        <p className="text-gray-500 text-sm font-medium mb-4">Envíos asegurados a todo el territorio nacional con seguimiento en tiempo real.</p>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-[#2D6A6A] uppercase tracking-widest bg-blue-50/50 w-fit px-3 py-1.5 rounded-lg border border-blue-100">
                          <MapPin className="w-3.5 h-3.5" /> {PROVEEDOR.provincia}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col gap-6">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                        <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black font-['Montserrat'] text-[#1A3D3D] mb-2">Condiciones B2B</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2 text-sm font-medium text-gray-500">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Mínimo: {PROVEEDOR.condiciones.minimo}
                          </li>
                          <li className="flex items-start gap-2 text-sm font-medium text-gray-500">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {PROVEEDOR.condiciones.publico}
                          </li>
                          <li className="flex items-start gap-2 text-sm font-medium text-gray-500">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {PROVEEDOR.condiciones.pagos}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: CATÁLOGO RÁPIDO */}
              {activeTab === 'catalogo' && (
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-2">Productos Destacados</h2>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Lo más buscado en la red</p>
                    </div>
                    <button onClick={() => navigate('/repertorio')} className="hidden md:flex items-center gap-2 text-[#2D6A6A] font-bold text-[10px] uppercase tracking-widest hover:underline">
                      Ver repertorio completo <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROVEEDOR.productosDestacados.map(prod => (
                      <article key={prod.id} className="bg-[#F4F7F7] rounded-[24px] p-4 border border-gray-100 hover:border-[#2D6A6A]/30 transition-all group flex flex-col">
                        <div className="w-full h-40 bg-white rounded-[16px] mb-4 p-4 flex items-center justify-center relative overflow-hidden">
                          <span className="absolute top-3 left-3 bg-[#1A3D3D] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md z-10">
                            {prod.categoria}
                          </span>
                          <img src={prod.imagen} alt={prod.titulo} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-sm mb-2 line-clamp-2 leading-tight">
                          {prod.titulo}
                        </h3>
                        <div className="mt-auto flex items-end justify-between pt-2">
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-0.5">Ref. ARS</span>
                            <span className="font-black text-[#2D6A6A] text-lg">${prod.precio}</span>
                          </div>
                          <button className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-[#1A3D3D] group-hover:bg-[#1A3D3D] group-hover:text-white transition-colors shadow-sm">
                            <ArrowUpRight className="w-5 h-5" />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                  
                  <button onClick={() => navigate('/repertorio')} className="md:hidden mt-6 w-full py-4 bg-gray-50 border border-gray-200 text-[#1A3D3D] font-bold text-[10px] uppercase tracking-widest rounded-[16px] flex items-center justify-center gap-2">
                    Ver todos en repertorio <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* TAB: MARCAS */}
              {activeTab === 'marcas' && (
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
                  <div className="text-center mb-10">
                    <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-2">Distribuidores Oficiales</h2>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Garantía y respaldo internacional</p>
                  </div>
                  
                  {/* Grilla B2B (Mismo concepto que usé antes) */}
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {PROVEEDOR.marcas.map((marca) => (
                      <div 
                        key={marca.id} 
                        className="bg-[#F4F7F7] rounded-[24px] border border-gray-100 p-8 flex items-center justify-center aspect-[3/2] shadow-sm hover:shadow-md transition-all group cursor-default"
                      >
                        <img 
                          src={marca.logo} 
                          alt={marca.nombre} 
                          className="w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA (Sticky Contact & CTA) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-[104px] space-y-6">
              
              {/* Main Contact Card */}
              <div className="bg-white p-8 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-6">
                <div className="text-center border-b border-gray-50 pb-6">
                  <div className="w-16 h-16 bg-[#F4F7F7] rounded-full flex items-center justify-center text-[#2D6A6A] mx-auto mb-4">
                    <PackageSearch className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-lg mb-1">Solicitar Cotización</h3>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Asesoramiento comercial experto</p>
                </div>

                <div className="space-y-3">
                  <a href={`https://wa.me/${PROVEEDOR.contacto.whatsapp}`} target="_blank" rel="noreferrer" className="w-full py-4 bg-[#25D366] text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#20b858] transition-all shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2 active:scale-95">
                    <Phone className="w-4 h-4" /> Vía WhatsApp
                  </a>
                  <a href={`mailto:${PROVEEDOR.contacto.email}`} className="w-full py-4 bg-gray-50 text-[#1A3D3D] border border-gray-200 rounded-[20px] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-all flex items-center justify-center gap-2 active:scale-95">
                    <Mail className="w-4 h-4 text-gray-400" /> Enviar Correo
                  </a>
                </div>
              </div>

              {/* Extra Info Card */}
              <div className="bg-[#1A3D3D] p-8 rounded-[32px] shadow-lg border border-[#1A3D3D] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rounded-full blur-[40px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="relative z-10">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4DB6AC] mb-6 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Presencia Digital
                  </h4>
                  <ul className="space-y-4">
                    <li>
                      <a href={PROVEEDOR.contacto.linkWeb} target="_blank" rel="noreferrer" className="flex items-center justify-between group">
                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">Visitar Catálogo Web</span>
                        <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-[#4DB6AC] transition-colors" />
                      </a>
                    </li>
                    <li className="w-full h-px bg-white/10"></li>
                    <li>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-white/80 mr-auto">Redes Sociales</span>
                        <a href={PROVEEDOR.redes.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4DB6AC] transition-colors"><Instagram className="w-4 h-4" /></a>
                        <a href={PROVEEDOR.redes.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4DB6AC] transition-colors"><Linkedin className="w-4 h-4" /></a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </main>

      {/* ==========================================
          FOOTER (Idéntico a Repertorio)
          ========================================== */}
      <footer className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden pt-20 pb-12 text-left">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
        <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-left">
            <div className="md:col-span-1 text-left">
              <button onClick={() => navigate('/')} className="text-white font-['Montserrat'] font-bold text-2xl mb-6 text-left leading-none cursor-pointer block hover:opacity-80 transition-opacity">El Portal<span className="text-white/40">.</span></button>
              <p className="text-white/50 text-sm md:text-[13px] leading-relaxed mb-6 font-medium text-left">La red profesional exclusiva para medicina veterinaria de alta complejidad. Conectando talento con vocación.</p>
              <div className="flex gap-4">
                <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-4 h-4" /></a>
                <a href="#" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-4 h-4" /></a>
              </div>
              <div className="text-white/40 text-[11px] md:text-[10px] font-medium space-y-1.5 flex flex-col items-start mt-6">
                <p>&copy; {new Date().getFullYear()} El Portal. Todos los derechos reservados.</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-6">Repertorio</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><button onClick={() => navigate('/repertorio')} className="hover:text-white transition-colors">Cursos y Seminarios</button></li>
                <li><button onClick={() => navigate('/repertorio')} className="hover:text-white transition-colors">Insumos</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-6">Comunidad</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><button onClick={() => navigate('/bolsa-de-trabajo')} className="hover:text-white transition-colors">Bolsa de Trabajo</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em] mb-6">Contacto</h4>
              <ul className="space-y-4 mb-8 text-white/40 text-sm leading-none">
                <li><a href="mailto:elportalveterinario.arg@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="w-4 h-4 shrink-0" /> <span>elportalveterinario.arg@gmail.com</span></a></li>
                <li className="flex items-center gap-3"><Globe className="w-4 h-4" /> elportal.vet</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 font-bold text-[11px] md:text-[10px] uppercase tracking-[0.3em]">creado por Belén M. Arenas</p>
            <div className="text-white/40 text-[11px] md:text-[10px] uppercase tracking-[0.3em] font-medium flex items-center gap-1.5 cursor-default">
              <span>Hecho con</span>
              <Heart className="w-3 h-3 text-red-400/50 hover:text-red-400 hover:scale-110 transition-all duration-300 fill-current" />
              <span>en Argentina.</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[11px] md:text-[10px] font-bold uppercase tracking-[0.3em] leading-none">Única plataforma veterinaria oficial</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}