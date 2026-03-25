import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Stethoscope, 
  Instagram, 
  Globe, 
  CircleCheck,
  Share2,
  Navigation,
  MessageCircle,
  AlertCircle,
  Users,
  Facebook,
  Linkedin,
  Mail,
  Heart,
  ShieldCheck
} from 'lucide-react';

export default function PerfilClinicaPublico() {
  // Simulamos los datos que vendrían de la base de datos (lo que la clínica llenó en el editor)
  const clinica = {
    nombre: "Centro Veterinario El Portal",
    slogan: "Cuidado integral para tu mejor amigo",
    descripcion: "Somos un centro médico dedicado al bienestar animal con más de 15 años de experiencia. Nuestro equipo multidisciplinario trabaja con pasión y tecnología de última generación para brindar el mejor diagnóstico y tratamiento a tu mascota.",
    direccion: "Av. Rivadavia 1234, CABA",
    whatsapp: "+5491123456789",
    instagram: "elportal.vet",
    guardia24h: true,
    directorMedico: "Dr. Juan Pérez (MP 12345)",
    especialidades: ['Cardiología', 'Dermatología', 'Medicina Felina', 'Traumatología'],
    servicios: ['Quirófano Equipado', 'Rayos X Digital', 'Ecografía', 'Laboratorio Propio', 'Internación'],
    comercial: ['Pet Shop', 'Farmacia Veterinaria']
  };

  const navigate = useNavigate();
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter'] pb-12">
      
      {/* 1. HEADER HERO (La primera impresión) */}
      <div className="bg-[#1A3D3D] relative overflow-hidden">
        {/* Patrón de fondo sutil */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-24 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
            
            {/* Logo Circular */}
            <div className="w-32 h-32 bg-white rounded-full p-2 shadow-xl shrink-0">
              <div className="w-full h-full rounded-full border border-gray-100 flex items-center justify-center bg-gray-50 text-emerald-800 font-bold text-xl font-['Montserrat']">
                EP
              </div>
            </div>

            {/* Info Principal */}
            <div className="flex-1 mt-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-white font-['Montserrat'] font-bold text-3xl md:text-4xl tracking-tight">
                  {clinica.nombre}
                </h1>
                {/* Badge de Verificación (Le da confianza al tutor) */}
                <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-medium border border-emerald-500/30 flex items-center gap-1">
                  <CircleCheck size={12} /> Clínica Verificada
                </span>
              </div>
              <p className="text-emerald-100 text-lg mb-4">{clinica.slogan}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-emerald-50/80 text-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  <span>{clinica.direccion}</span>
                </div>
                {clinica.guardia24h && (
                  <div className="flex items-center gap-1.5 text-red-300 font-semibold bg-red-500/10 px-2 py-0.5 rounded-md">
                    <AlertCircle size={16} />
                    <span>Guardia 24hs</span>
                  </div>
                )}
              </div>
            </div>

            {/* Botones de Acción Rápida (Desktop) */}
            <div className="hidden md:flex flex-col gap-3 min-w-[200px] mt-4">
              <a href={`https://wa.me/${clinica.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" 
                 className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 w-full">
                <MessageCircle size={20} /> Solicitar Turno
              </a>
              <button className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all w-full backdrop-blur-sm border border-white/10">
                <Navigation size={18} /> Cómo llegar
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL (Cards solapadas) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-12 relative z-20 space-y-6">
        
        {/* Acciones Rápidas (Mobile) - Solo se ve en celulares */}
        <div className="md:hidden flex gap-3 mb-6">
          <a href={`https://wa.me/${clinica.whatsapp.replace(/\D/g,'')}`} 
             className="flex-1 bg-green-500 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg">
            <MessageCircle size={20} /> Turno
          </a>
          <button className="flex-1 bg-white text-[#1A3D3D] py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg border border-gray-100">
            <Navigation size={20} /> Mapa
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* COLUMNA IZQUIERDA (Info principal) */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Sobre Nosotros */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-xl mb-4">Sobre el centro</h2>
              <p className="text-gray-600 leading-relaxed">
                {clinica.descripcion}
              </p>
              
              {/* Director Médico */}
              <div className="mt-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#2D6A6A] rounded-full flex items-center justify-center text-white shrink-0">
                  <Stethoscope size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-0.5">Dirección Médica</p>
                  <p className="font-medium text-gray-900">{clinica.directorMedico}</p>
                </div>
              </div>
            </div>

            {/* Especialidades (Lo que busca el tutor) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-xl mb-6 flex items-center gap-2">
                <Stethoscope className="text-[#2D6A6A]" /> Especialidades Médicas
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {clinica.especialidades.map((esp, i) => (
                  <span key={i} className="bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:border-[#2D6A6A] hover:text-[#2D6A6A] transition-colors cursor-default">
                    {esp}
                  </span>
                ))}
              </div>
            </div>

            {/* Infraestructura (Importante para colegas y confianza del tutor) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-xl mb-6">Instalaciones y Servicios</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {clinica.servicios.map((srv, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CircleCheck size={18} className="text-emerald-500 shrink-0" />
                    <span className="text-gray-700 font-medium">{srv}</span>
                  </div>
                ))}
              </div>
              
              {/* Servicios Comerciales */}
              {clinica.comercial.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">También ofrecemos</p>
                  <div className="flex flex-wrap gap-3">
                    {clinica.comercial.map((com, i) => (
                      <span key={i} className="bg-orange-50 text-orange-800 px-3 py-1.5 rounded-lg text-sm font-medium">
                        {com}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SECCIÓN FUTURA: Staff Médico */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 border-dashed">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-['Montserrat'] font-bold text-gray-400 text-xl flex items-center gap-2">
                  <Users className="text-gray-400" /> Nuestro Equipo
                </h2>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-medium uppercase">Próximamente</span>
              </div>
              <p className="text-gray-400 text-sm">
                Aquí los tutores podrán ver los perfiles de los profesionales veterinarios que forman parte de este centro médico.
              </p>
            </div>

          </div>

          {/* COLUMNA DERECHA (Contacto y Horarios) */}
          <div className="space-y-6">
            
            {/* Tarjeta de Horarios */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg mb-4 flex items-center gap-2">
                <Clock className="text-[#2D6A6A]" size={20} /> Horarios
              </h3>
              
              {clinica.guardia24h ? (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
                  <AlertCircle className="text-red-500 mx-auto mb-2" size={24} />
                  <p className="font-bold text-red-900">Abierto 24 Horas</p>
                  <p className="text-red-700 text-sm mt-1">Guardia permanente todos los días del año.</p>
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-500">Lunes a Viernes</span>
                    <span className="font-medium text-gray-900">09:00 a 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sábados</span>
                    <span className="font-medium text-gray-900">09:00 a 14:00</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tarjeta de Contacto */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg mb-4">Contacto</h3>
              
              <div className="space-y-4">
                <a href={`https://wa.me/${clinica.whatsapp.replace(/\D/g,'')}`} className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors group">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <MessageCircle size={18} />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </a>
                
                <a href={`https://instagram.com/${clinica.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-pink-600 transition-colors group">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-pink-50 transition-colors">
                    <Instagram size={18} />
                  </div>
                  <span className="font-medium">@{clinica.instagram}</span>
                </a>

                <div className="pt-4 mt-2 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-[#1A3D3D] font-medium text-sm py-2 transition-colors">
                    <Share2 size={16} /> Compartir este perfil
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FOOTER DESKTOP */}
      <footer className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden pt-12 pb-8 text-left print:hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-white/10"></div>
        <div className="max-w-[1100px] mx-auto px-8 md:px-10 relative z-10">
          
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
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="Linkedin" className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center text-white/70 hover:bg-white hover:text-[#1A3D3D] transition-all"><Linkedin className="w-4 h-4" /></a>
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
  );
}