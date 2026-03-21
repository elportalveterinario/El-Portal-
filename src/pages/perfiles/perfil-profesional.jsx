import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, MessageCircle, Star, Award, MapPin, 
  ChevronRight, GraduationCap, Briefcase, Stethoscope, 
  Syringe, Send, Phone, Building2, ExternalLink, Home, ChevronDown, 
  Instagram, Linkedin, Facebook, Mail, Globe, PlusCircle, Heart, Info,
  Menu, X, Edit, LayoutGrid, User, Sparkles, Briefcase as BriefcaseIcon,
  ChevronLeft
} from 'lucide-react';

// ==========================================
// DATOS DEL PERFIL
// ==========================================
const data = {
  profesional: {
    nombre: "Dra. Mercedes Arenas",
    especialidad: "Cirujana Traumatóloga",
    matricula: "MP 12345",
    foto: "https://i.postimg.cc/RFZzWJ7f/PXL-20251017-155150033-(1).jpg",
    bio: "Especialista en cirugía de tejidos blandos y traumatología con más de 12 años de experiencia. Mi enfoque se centra en técnicas mínimamente invasivas para garantizar una recuperación rápida y un postoperatorio sin dolor para mis pacientes.",
    provincia: "Buenos Aires, Argentina",
    atiendeDomicilio: true,
    redes: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      facebook: "https://facebook.com"
    }
  },
  logros: [
    { id: 1, titulo: "Especialidad en Cirugía", desc: "Universidad de Buenos Aires (UBA) - 2015" },
    { id: 2, titulo: "Diplomatura en Traumatología", desc: "Asociación Veterinaria Argentina - 2018" },
    { id: 3, titulo: "Jefa de Cirugía", desc: "Hospital Veterinario Central (2019 - Presente)" },
    { id: 4, titulo: "Posgrado en Anestesiología", desc: "Universidad Nacional de La Plata - 2021" }, 
  ],
  servicios: [
    { id: 1, icono: "Syringe", titulo: "Cirugía Avanzada", desc: "Implementación de nuevas técnicas quirúrgicas para recuperación rápida en caninos de edad avanzada." },
    { id: 2, icono: "Briefcase", titulo: "Consultoría Senior", desc: "Asesoramiento a clínicas emergentes en la optimización de procesos médicos y gestión de equipos." },
    { id: 3, icono: "GraduationCap", titulo: "Docencia Universitaria", desc: "Formando a la próxima generación de profesionales en la UBA desde hace 5 años." }
  ],
  casos: [
    { id: 1, nombre: "Luna", patologia: "Cirugía de Cadera", desc: "Luna llegó con una de las displasias más severas registradas. Tras una intervención quirúrgica compleja y 3 meses de rehabilitación intensa, hoy corre feliz.", foto: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80" },
    { id: 2, nombre: "Simba", patologia: "Tratamiento Dermatológico", desc: "Control de alergia crónica y recuperación total del pelaje en tiempo récord mediante protocolos biológicos.", foto: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80" },
    { id: 3, nombre: "Milo", patologia: "Odontología Preventiva", desc: "Limpieza profunda y extracción de piezas dañadas para mejorar su calidad de vida y prevenir infecciones sistémicas.", foto: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80" }
  ],
  zonas: [
    { id: 1, nombre: "Zona Oeste", clinicas: ["Veterinaria Patitos (Rivadavia 123)", "Clínica San Roque (Belgrano 45)", "Centro Vet Morón (Brown 999)", "Hospital Oeste (Perón 12)"] }, 
    { id: 2, nombre: "Zona Norte", clinicas: ["Clínica Norte (Av. Maipú 456)", "Centro Integral (Calle Falsa 123)"] }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [mostrarTodosLogros, setMostrarTodosLogros] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const footerRef = useRef(null);

  const renderIcon = (iconName, className) => {
    const IconMap = { Syringe, Briefcase, GraduationCap, Stethoscope };
    const IconComponent = IconMap[iconName] || Star;
    return <IconComponent className={className} />;
  };

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = "data:image/svg+xml,%3Csvg viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 18 85 V 45 A 32 32 0 0 1 82 45 V 85' stroke='%231A3D3D' stroke-width='12' stroke-linecap='round' fill='none'/%3E%3Cpath d='M 38 85 V 55 A 12 12 0 0 1 62 55 V 85' stroke='%232D6A6A' stroke-width='12' stroke-linecap='round' fill='none'/%3E%3C/svg%3E";
    document.head.appendChild(favicon);

    const style = document.createElement('style');
    style.innerHTML = `
      .group.active-mobile { transition-duration: 0.5s; }
      html, body { overflow-x: hidden; width: 100%; position: relative; }
    `;
    document.head.appendChild(style);

    const mobileHoverObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active-mobile');
        else entry.target.classList.remove('active-mobile');
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

    setTimeout(() => document.querySelectorAll('.group').forEach(el => mobileHoverObserver.observe(el)), 500);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(favicon)) document.head.removeChild(favicon);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="font-['Inter'] antialiased min-h-screen flex justify-center bg-gray-200 md:bg-[#F4F7F7] overflow-x-hidden w-full">
      
      {/* =========================================================================
          VERSIÓN MÓVIL (APP STYLE) - Solo visible en pantallas pequeñas (md:hidden)
          ========================================================================= */}
      <div className="w-full max-w-[412px] bg-[#F4F7F7] min-h-screen relative shadow-2xl flex flex-col md:hidden shrink-0 overflow-x-hidden">
        
        {/* NAVBAR FIJO */}
        <nav className="sticky top-0 z-50 h-[60px] bg-white/95 backdrop-blur-md border-b border-gray-100 flex items-center px-5 justify-between shrink-0">
          <button className="text-[#1A3D3D]" onClick={() => navigate(-1)}><ChevronLeft size={22} /></button>
          <div className="text-[#1A3D3D] font-['Montserrat'] font-extrabold text-lg tracking-tighter" onClick={() => navigate('/')}>
            El Portal<span className="text-[#2D6A6A]">.</span>
          </div>
          <div className="w-[22px]"></div>
        </nav>

        {/* HERO */}
        <section className="bg-[#1A3D3D] px-6 py-8 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center gap-5 text-center">
            <div className="relative">
              <div className="w-36 h-36 rounded-[32px] overflow-hidden border-4 border-white/20 shadow-xl">
                <img src={data.profesional.foto} className="w-full h-full object-cover" alt={data.profesional.nombre} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#2D6A6A] p-2 rounded-2xl border-4 border-[#1A3D3D]">
                <ShieldCheck className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-[24px] font-extrabold font-['Montserrat'] text-white tracking-tight uppercase leading-tight mb-2">{data.profesional.nombre}</h1>
              <h2 className="text-[12px] font-black text-[#F4F7F7] uppercase tracking-[0.1em] opacity-80">{data.profesional.especialidad}</h2>
              <div className="mt-3 text-white/30 font-bold text-[9px] uppercase tracking-[0.3em]">{data.profesional.matricula}</div>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="bg-white border-b border-gray-100 flex justify-between px-2 shrink-0">
          {['perfil', 'especialidad', 'casos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-[9px] font-bold uppercase tracking-[0.2em] relative transition-colors ${activeTab === tab ? 'text-[#1A3D3D]' : 'text-gray-400'}`}
            >
              {tab === 'perfil' ? 'Sobre Mí' : tab === 'especialidad' ? 'Carrera' : 'Casos'}
              {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2D6A6A] rounded-t-full"></span>}
            </button>
          ))}
        </div>

        {/* CONTENIDO PRINCIPAL MÓVIL */}
        <div className="p-4 flex-1">
          {activeTab === 'perfil' && (
            <div className="space-y-5">
              <div className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-50 text-center">
                <p className="text-gray-500 text-[12px] leading-relaxed font-medium italic">"{data.profesional.bio}"</p>
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-50">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F7F7] flex items-center justify-center text-[#2D6A6A]"><MapPin size={16} /></div>
                    <p className="font-bold text-[#1A3D3D] text-[9px] uppercase tracking-wide">{data.profesional.provincia}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Home size={16} /></div>
                    <p className="font-bold text-[#1A3D3D] text-[9px] uppercase tracking-wide">A Domicilio</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-extrabold text-[12px] text-[#1A3D3D] font-['Montserrat'] uppercase tracking-widest pl-2 mt-2 text-left">Zonas de Atención</h3>
                {data.zonas.map((zona) => (
                  <div key={zona.id} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm text-left">
                    <h4 className="font-bold text-[11px] text-[#1A3D3D] font-['Montserrat'] uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Building2 size={14} className="text-[#2D6A6A]" /> {zona.nombre}
                    </h4>
                    <ul className="space-y-2.5 text-gray-500 font-medium text-[10.5px]">
                      {zona.clinicas.map((c, idx) => (
                        <li key={idx} className="flex gap-2.5 leading-tight">
                          <div className="w-1 h-1 bg-[#2D6A6A]/50 rounded-full mt-1.5 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'especialidad' && (
            <div className="space-y-8">
              <div>
                <h3 className="font-extrabold text-[12px] text-[#1A3D3D] font-['Montserrat'] uppercase tracking-widest mb-3 pl-2 text-left">Actualmente</h3>
                <div className="space-y-3">
                  {data.servicios.map((s) => (
                    <div key={s.id} className="bg-white p-4 rounded-2xl border border-gray-50 flex gap-4 items-center text-left">
                      <div className="w-11 h-11 bg-[#F4F7F7] rounded-xl flex items-center justify-center text-[#2D6A6A] shrink-0">{renderIcon(s.icono, "w-5 h-5")}</div>
                      <div>
                        <h4 className="font-bold font-['Montserrat'] text-[11px] text-[#1A3D3D] uppercase mb-0.5">{s.titulo}</h4>
                        <p className="text-gray-400 text-[10px] leading-snug">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-[12px] text-[#1A3D3D] font-['Montserrat'] uppercase tracking-widest mb-3 pl-2 text-left">Trayectoria</h3>
                <div className="bg-white p-5 rounded-[24px] border border-gray-50 shadow-sm text-left">
                  <div className="relative">
                    <div className="absolute left-[13px] top-2 bottom-2 w-[1.5px] bg-gray-100"></div>
                    <div className="space-y-6 relative">
                      {(mostrarTodosLogros ? data.logros : data.logros.slice(0, 3)).map((logro) => (
                        <div key={logro.id} className="flex gap-4 items-start">
                          <div className="w-7 h-7 rounded-full bg-white border-[3px] border-[#F4F7F7] flex items-center justify-center relative z-10 shadow-sm shrink-0">
                            <div className="w-2 h-2 rounded-full bg-[#1A3D3D]"></div>
                          </div>
                          <div className="pt-1 pb-1">
                            <h4 className="font-bold text-[#1A3D3D] text-[11px] mb-1 font-['Montserrat'] uppercase tracking-tight leading-tight">{logro.titulo}</h4>
                            <p className="text-gray-400 text-[10px] leading-snug">{logro.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {data.logros.length > 3 && (
                      <div className="mt-6 ml-[44px]">
                        <button 
                          onClick={() => setMostrarTodosLogros(!mostrarTodosLogros)} 
                          className="text-[#2D6A6A] font-bold text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 focus:outline-none"
                        >
                          {mostrarTodosLogros ? 'Ver menos' : `Ver todo (+${data.logros.length - 3})`}
                          <ChevronDown size={12} className={`transition-transform duration-300 ${mostrarTodosLogros ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'casos' && (
            <div className="space-y-4">
              {data.casos.map((c) => (
                <div key={c.id} className="bg-white rounded-3xl overflow-hidden border border-gray-50 text-left shadow-sm">
                  <div className="relative h-44">
                    <img src={c.foto} className="w-full h-full object-cover" alt="Caso Clínico" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-[#2D6A6A] text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm">
                      {c.patologia}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="text-[#1A3D3D] font-bold font-['Montserrat'] text-[14px] uppercase mb-1.5">{c.nombre}</h4>
                    <p className="text-gray-500 text-[11px] leading-relaxed mb-4">{c.desc}</p>
                    <button className="text-[9px] font-bold uppercase tracking-widest text-[#2D6A6A] flex items-center gap-1">Evolución <ChevronRight size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOTONES DE CONTACTO MÓVIL */}
        <div className="px-4 py-6 bg-[#F4F7F7] shrink-0 border-t border-gray-100">
          <div className="flex gap-2">
            <button className="flex flex-col items-center justify-center bg-white border border-gray-200 text-[#1A3D3D] rounded-xl w-14 h-14 shrink-0 shadow-sm hover:bg-gray-50 transition-colors">
              <Mail size={18} />
              <span className="text-[7px] font-black uppercase mt-1 tracking-wider">Mail</span>
            </button>
            <button className="flex-1 bg-[#25D366] text-white font-bold rounded-xl flex items-center justify-center gap-2.5 tracking-[0.15em] text-[11px] uppercase shadow-lg shadow-[#25D366]/20 hover:bg-[#20b858] transition-colors">
              <Phone size={18} /> Contactar WhatsApp
            </button>
          </div>
        </div>

        {/* FOOTER MÓVIL */}
        <footer className="w-full bg-[#1A3D3D] pt-12 pb-8 px-8 text-left shrink-0 overflow-x-hidden">
          <div className="mb-10">
            <div className="text-white font-['Montserrat'] font-extrabold text-[26px] tracking-tight mb-5 leading-none cursor-pointer" onClick={() => navigate('/')}>
              El Portal<span className="text-[#3b7979]">.</span>
            </div>
            <p className="text-[#8BA4A4] text-[13.5px] leading-[1.6] mb-6 font-medium pr-2">
              La red profesional exclusiva para medicina veterinaria de alta complejidad. Conectando talento con vocación.
            </p>
            <div className="flex gap-3.5 mb-8">
              <a href={data.profesional.redes.facebook} target="_blank" rel="noreferrer" className="w-[42px] h-[42px] bg-[#224A4A] rounded-2xl flex items-center justify-center text-[#8BA4A4] hover:bg-white hover:text-[#1A3D3D] transition-all"><Facebook className="w-5 h-5" /></a>
              <a href={data.profesional.redes.instagram} target="_blank" rel="noreferrer" className="w-[42px] h-[42px] bg-[#224A4A] rounded-2xl flex items-center justify-center text-[#8BA4A4] hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-5 h-5" /></a>
              <a href={data.profesional.redes.linkedin} target="_blank" rel="noreferrer" className="w-[42px] h-[42px] bg-[#224A4A] rounded-2xl flex items-center justify-center text-[#8BA4A4] hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-5 h-5" /></a>
            </div>
            <div className="text-[#658888] text-[11px] font-medium space-y-2">
              <p>&copy; {new Date().getFullYear()} El Portal. Todos los derechos reservados.</p>
              <p className="flex items-center gap-2">
                <button onClick={() => navigate('/terminos-y-condiciones')} className="underline underline-offset-2 hover:text-[#8BA4A4] transition-colors focus:outline-none">Términos</button>
                <span className="text-[#658888] text-[8px]">•</span>
                <button onClick={() => navigate('/politica-de-privacidad')} className="underline underline-offset-2 hover:text-[#8BA4A4] transition-colors focus:outline-none">Privacidad</button>
              </p>
            </div>
          </div>
          <div className="mb-8">
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-[0.25em] mb-5">Navegación</h4>
            <ul className="space-y-4 text-[#8BA4A4] text-[15px] font-medium">
              <li><button onClick={() => navigate('/')} className="hover:text-white transition-colors focus:outline-none">Inicio</button></li>
              <li><button onClick={() => navigate('/unirte')} className="hover:text-white transition-colors focus:outline-none">¿Por qué unirte?</button></li>
            </ul>
          </div>
          <div className="mb-8">
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-[0.25em] mb-5">Red Profesional</h4>
            <ul className="space-y-4 text-[#8BA4A4] text-[15px] font-medium">
              <li><button onClick={() => navigate('/bolsa')} className="hover:text-white transition-colors focus:outline-none">Bolsa de Trabajo</button></li>
              <li><button onClick={() => navigate('/cursos')} className="hover:text-white transition-colors focus:outline-none">Cursos e Insumos</button></li>
            </ul>
          </div>
          <div className="mb-12">
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-[0.25em] mb-5">Contacto</h4>
            <ul className="space-y-4 text-[#8BA4A4] text-[15px] font-medium">
              <li><a href="mailto:elportalveterinario.arg@gmail.com" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="w-5 h-5 shrink-0 opacity-80" strokeWidth={1.5} /> <span>elportalveterinario.arg@gmail.com</span></a></li>
              <li><a href="https://elportal.vet" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors"><Globe className="w-5 h-5 shrink-0 opacity-80" strokeWidth={1.5} /> <span>elportal.vet</span></a></li>
            </ul>
          </div>
          <div className="w-full h-px bg-[#264D4D] mb-8"></div>
          <div className="flex flex-col items-center justify-center gap-3 pb-4">
            <p className="text-[#658888] font-bold text-[10px] uppercase tracking-[0.25em] text-center">Creado por Belén M. Arenas</p>
            <p className="text-[#658888] font-bold text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-1.5 group cursor-default">
              Hecho con <Heart className="w-3.5 h-3.5 text-[#C96B6B] fill-[#C96B6B] group-hover:scale-110 transition-all duration-300" /> en Argentina.
            </p>
            <div className="flex items-center gap-2 text-[#658888] mt-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] leading-none text-center">Única plataforma veterinaria oficial</span>
            </div>
          </div>
        </footer>
      </div>


      {/* =========================================================================
          VERSIÓN ESCRITORIO (PC STYLE) - Solo visible en pantallas medianas o grandes (hidden md:block)
          ========================================================================= */}
      <div className="hidden md:block w-full relative scroll-smooth text-left">
        {/* Textura de ruido */}
        <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.025] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        {/* NAVBAR UNIFICADA CON MENÚ HAMBURGUESA */}
        <nav className="sticky top-0 z-40 h-[80px] bg-white/80 backdrop-blur-lg border-b border-gray-100 flex items-center px-8 md:px-10 w-full">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
              
              <div className="text-[#1A3D3D] font-['Montserrat'] font-extrabold text-2xl tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
                  El Portal<span className="text-[#2D6A6A]">.</span>
              </div>

              {/* LINKS DE ESCRITORIO (Internos del perfil) */}
              <div className="hidden lg:flex items-center gap-10 text-gray-500 font-medium text-[15px]">
                  <a href="#perfil" className="hover:text-[#2D6A6A] transition-colors">La Profesional</a>
                  <a href="#casos" className="hover:text-[#2D6A6A] transition-colors">Casos</a>
                  <a href="#zonas" className="hover:text-[#2D6A6A] transition-colors">Zonas</a>
              </div>
              
              <div className="flex items-center gap-4">
                <a href="#contacto" className="hidden md:block bg-[#1A3D3D] text-white rounded-full px-8 py-3 font-semibold shadow-lg hover:bg-[#2D6A6A] transition-all hover:-translate-y-0.5 text-sm">
                  Contactar
                </a>

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
                          
                          {/* SECCIÓN INTERCAMBIADA: NOTICIAS PRIMERO, SERVICIOS (ÚLTIMA CAJITA) */}
                          <button onClick={() => { navigate('/novedades'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Sparkles className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Novedades</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                          <button onClick={() => { navigate('/bolsa-de-trabajo'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><BriefcaseIcon className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Bolsa de Trabajo</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                          <button onClick={() => { navigate('/ecosistema'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><LayoutGrid className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Repertorio Clínico</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                          
                          <button onClick={() => { navigate('/editor'); setIsMenuOpen(false); }} className="w-full flex items-center justify-between px-4 py-4 hover:bg-[#F4F7F7] rounded-2xl transition-colors group"><div className="flex items-center gap-3"><Edit className="w-4 h-4 text-[#1A3D3D]" /><span className="text-sm font-bold text-[#1A3D3D]">Ir al Editor</span></div><ChevronRight className="w-4 h-4 text-gray-300" /></button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
          </div>
        </nav>

        <main className="max-w-[1000px] mx-auto px-8 md:px-10 relative z-10 pt-8 flex flex-col items-center">
          
          {/* CONTENEDOR MAESTRO */}
          <div className="w-full bg-white rounded-[44px] shadow-[0_30px_80px_rgba(26,61,61,0.12)] overflow-hidden border border-gray-100 mb-12 relative">
            
            {/* REDES SOCIALES */}
            <div className="absolute right-6 top-[104px] -translate-y-1/2 md:top-[168px] md:translate-y-0 z-20 flex flex-col gap-3">
              {data.profesional.redes?.instagram && (
                <a href={data.profesional.redes.instagram} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white p-2.5 bg-white/5 rounded-xl border border-white/20 hover:scale-110 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {data.profesional.redes?.linkedin && (
                <a href={data.profesional.redes.linkedin} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white p-2.5 bg-white/5 rounded-xl border border-white/20 hover:scale-110 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {data.profesional.redes?.facebook && (
                <a href={data.profesional.redes.facebook} target="_blank" rel="noreferrer" className="text-white/40 hover:text-white p-2.5 bg-white/5 rounded-xl border border-white/20 hover:scale-110 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* SECCIÓN 1: IDENTIDAD */}
            <div id="perfil" className="bg-[#1A3D3D] pt-10 px-10 pb-24 md:pt-14 md:px-14 md:pb-32 flex flex-col items-center text-center relative">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
              
              <div className="relative mb-8 z-10">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img src={data.profesional.foto} className="w-full h-full object-cover" alt={data.profesional.nombre} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#2D6A6A] p-3 rounded-2xl border-4 border-[#1A3D3D] shadow-xl">
                  <ShieldCheck className="text-white w-5 h-5" />
                </div>
              </div>
              
              <div className="z-10 w-full flex flex-col items-center">
                <h1 className="text-2xl md:text-3xl font-extrabold font-['Montserrat'] text-white tracking-tight mb-2 uppercase leading-tight">
                  {data.profesional.nombre}
                </h1>
                <h2 className="text-base md:text-xl font-black text-[#F4F7F7] mb-4 uppercase tracking-widest opacity-90">
                  {data.profesional.especialidad}
                </h2>
                <p className="text-white/30 font-semibold text-[9px] uppercase tracking-[0.5em] mb-10">
                  Matrícula Profesional: {data.profesional.matricula}
                </p>
              </div>
              
              <div className="w-full max-w-[280px] z-10 mb-8">
                <a href="#zonas" className="w-full bg-white text-[#1A3D3D] font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:-translate-y-1 transition-all text-[10px] uppercase tracking-[0.2em]">
                  <MapPin className="w-4 h-4" /> Donde encontrarme
                </a>
              </div>
            </div>

            {/* SECCIÓN 2: BIOGRAFÍA */}
            <div className="relative z-20 -mt-16 md:-mt-20 bg-white px-10 pb-10 pt-12 md:px-16 md:pb-16 md:pt-16 text-center shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
              <div className="mb-14">
                <h2 className="text-xl md:text-2xl font-extrabold text-[#1A3D3D] font-['Montserrat'] mb-6 uppercase tracking-tight">Sobre mí</h2>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium italic max-w-2xl mx-auto">
                  "{data.profesional.bio}"
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-gray-50">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4F7F7] flex items-center justify-center text-[#2D6A6A] shadow-inner"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2 leading-none">Ubicación Base</p>
                    <p className="font-bold text-[#1A3D3D] text-[12px] uppercase tracking-wide">{data.profesional.provincia}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center text-yellow-600 border border-yellow-100"><Award className="w-5 h-5" /></div>
                  <div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2 leading-none">Reconocimiento</p>
                    <p className="font-bold text-[#1A3D3D] text-[12px] uppercase tracking-wide">Especialista Destacada</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100"><Home className="w-5 h-5" /></div>
                  <div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-2 leading-none">Modalidad</p>
                    <p className="font-bold text-[#1A3D3D] text-[12px] uppercase tracking-wide">Voy a domicilio</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: ACTUALMENTE */}
            <div id="actualmente" className="bg-[#F4F7F7]/60 p-10 md:p-16 border-t border-b border-gray-50">
              <div className="mb-10 text-left">
                <h2 className="text-xl font-extrabold text-[#1A3D3D] font-['Montserrat'] mb-2 uppercase tracking-tight">Actualmente</h2>
                <p className="text-gray-400 text-[13px] font-bold uppercase tracking-[0.2em] opacity-80 leading-none">¿En qué me especializo hoy en día?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.servicios.map((servicio) => (
                  <div key={servicio.id} className="bg-white p-8 rounded-[36px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 group-[.active-mobile]:shadow-xl group-[.active-mobile]:-translate-y-1 transition-all group">
                    <div className="w-12 h-12 bg-[#F4F7F7] rounded-2xl flex items-center justify-center text-[#2D6A6A] mb-6 group-hover:bg-[#1A3D3D] group-hover:text-white group-[.active-mobile]:bg-[#1A3D3D] group-[.active-mobile]:text-white transition-colors">
                      {renderIcon(servicio.icono, "w-6 h-6")}
                    </div>
                    <h4 className="font-bold font-['Montserrat'] text-[14px] text-[#1A3D3D] mb-3 uppercase tracking-wider">{servicio.titulo}</h4>
                    <p className="text-gray-400 font-medium text-[12px] leading-relaxed">{servicio.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN 4: TRAYECTORIA ACADÉMICA */}
            <div id="trayectoria" className="p-10 md:p-16 text-left bg-white">
              <div className="mb-12">
                <h2 className="text-xl font-extrabold text-[#1A3D3D] font-['Montserrat'] mb-2 uppercase tracking-tight">Trayectoria Académica</h2>
                <p className="text-gray-400 text-[13px] font-bold uppercase tracking-[0.2em] opacity-80 leading-none">Formación y Logros</p>
              </div>

              <div className="relative">
                <div className="absolute left-[20px] md:left-[23px] top-6 bottom-6 w-[1.5px] bg-gray-100"></div>
                <div className="space-y-12 relative">
                  {(mostrarTodosLogros ? data.logros : data.logros.slice(0, 3)).map((logro) => (
                    <div key={logro.id} className="flex gap-10 items-start group">
                      <div className="w-10 h-10 rounded-full bg-white border-[4px] border-[#F4F7F7] flex items-center justify-center relative z-10 mt-1 shadow-sm flex-shrink-0 group-[.active-mobile]:border-[#2D6A6A]/20 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-[#1A3D3D] group-hover:bg-[#2D6A6A] group-[.active-mobile]:bg-[#2D6A6A] transition-colors"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#1A3D3D] text-[15px] mb-2 font-['Montserrat'] uppercase tracking-tight">{logro.titulo}</h4>
                        <p className="text-gray-400 text-sm font-medium">{logro.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {data.logros.length > 3 && (
                  <div className="mt-12 ml-[54px] md:ml-[63px]">
                    <button onClick={() => setMostrarTodosLogros(!mostrarTodosLogros)} className="bg-[#1A3D3D] text-white px-7 py-3 rounded-full font-bold text-[9px] uppercase tracking-[0.3em] flex items-center gap-2 hover:-translate-y-1 shadow-lg transition-all">
                      {mostrarTodosLogros ? 'Reducir' : `Ver trayectoria completa (+${data.logros.length - 3})`}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mostrarTodosLogros ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SECCIÓN 5: CASOS CLÍNICOS */}
            <div id="casos" className="bg-[#F4F7F7]/40 p-10 md:p-16 border-t border-gray-50">
              <div className="flex flex-col items-start mb-12 text-left">
                <h2 className="text-2xl font-extrabold text-[#1A3D3D] font-['Montserrat'] uppercase tracking-tight">Casos Clínicos</h2>
                <div className="w-14 h-1 bg-[#2D6A6A] rounded-full mt-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {data.casos.map((caso) => (
                  <div key={caso.id} className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 group-[.active-mobile]:shadow-2xl transition-all group cursor-pointer">
                    <div className="h-64 relative overflow-hidden">
                      <img src={caso.foto} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={caso.nombre} />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-md text-[#2D6A6A] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
                          {caso.patologia}
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black font-['Montserrat'] text-[#1A3D3D] mb-3">{caso.nombre}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                        {caso.desc}
                      </p>
                      <span className="text-[#2D6A6A] font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                        Ver Evolución <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN 6: ZONAS DE ATENCIÓN */}
            <div id="zonas" className="p-10 md:p-16 bg-white rounded-b-[44px]">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-extrabold text-[#1A3D3D] font-['Montserrat'] uppercase tracking-tight mb-4">Lugares de Atención</h2>
                <p className="text-gray-400 font-medium text-sm">Dónde encontrarme para consultas y cirugías</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.zonas.map((zona) => (
                  <div key={zona.id} className="bg-[#F4F7F7] p-8 rounded-[32px] border border-gray-100 hover:border-[#2D6A6A]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#2D6A6A] shadow-sm border border-gray-100">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg text-[#1A3D3D] uppercase tracking-wide">{zona.nombre}</h3>
                    </div>
                    <ul className="space-y-4">
                      {zona.clinicas.map((clinica, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A6A] mt-2 shrink-0"></div>
                          <span>{clinica}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>

        {/* FOOTER DESKTOP */}
        <footer className="w-full bg-[#1A3D3D] pt-20 pb-12 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
          <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              
              <div className="md:col-span-1">
                <div onClick={() => navigate('/')} className="text-white font-['Montserrat'] font-bold text-2xl mb-6 leading-none cursor-pointer block hover:opacity-80 transition-opacity">
                  El Portal<span className="text-white/40">.</span>
                </div>
                <p className="text-white/50 text-[13px] leading-relaxed mb-6 font-medium">La red profesional exclusiva para medicina veterinaria de alta complejidad.</p>
                <div className="flex gap-3">
                  {data.profesional.redes?.instagram && (
                    <a href={data.profesional.redes.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-4 h-4" /></a>
                  )}
                  {data.profesional.redes?.linkedin && (
                    <a href={data.profesional.redes.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-4 h-4" /></a>
                  )}
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
                  {/* SECCIÓN INTERCAMBIADA: NOVEDADES PRIMERO, REPERTORIO (SERVICIOS) ÚLTIMO */}
                  <li><button onClick={() => navigate('/novedades')} className="hover:text-white transition-colors">Novedades</button></li>
                  <li><button onClick={() => navigate('/bolsa-de-trabajo')} className="hover:text-white transition-colors">Bolsa de Trabajo</button></li>
                  <li><button onClick={() => navigate('/ecosistema')} className="hover:text-white transition-colors">Repertorio Clínico</button></li>
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
    </div>
  );
}

export default App;