import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Activity, 
  ImagePlus, 
  Save,
  CircleCheck,
  AlertCircle,
  UserCheck
} from 'lucide-react';

export default function EditorClinica() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaved, setIsSaved] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: 'Veterinaria El Portal', // Simula que ya viene del login
    directorMedico: '',
    matriculaDirector: '',
    descripcion: '',
    direccion: '',
    ciudad: '',
    provincia: '',
    whatsapp: '',
    telefono: '',
    email: 'contacto@clinica.com',
    horarioSemana: '',
    horarioFinde: '',
    guardia24h: false,
    servicios: {
      quirofano: false,
      rayos: false,
      ecografia: false,
      laboratorio: false,
      internacion: false,
      exoticos: false,
      peluqueria: false
    }
  });

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceChange = (service) => {
    setFormData(prev => ({
      ...prev,
      servicios: {
        ...prev.servicios,
        [service]: !prev.servicios[service]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Guardando datos de clínica:', formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-['Inter'] pb-12">
      {/* Header Fijo */}
      <div className="bg-[#1A3D3D] pt-12 pb-6 px-6 shadow-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white font-['Montserrat'] font-bold text-2xl tracking-tight">
              Perfil Institucional
            </h1>
            <p className="text-white/70 text-sm mt-1">Completa los datos de tu centro veterinario</p>
          </div>
          <button 
            onClick={handleSubmit}
            className="bg-[#2D6A6A] hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-colors shadow-lg"
          >
            {isSaved ? <CircleCheck size={18} /> : <Save size={18} />}
            <span className="hidden sm:inline">{isSaved ? 'Guardado' : 'Guardar'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Banner de progreso (Opcional) */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3 mb-8">
          <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-blue-900 font-semibold text-sm">Mejora tu visibilidad</h3>
            <p className="text-blue-700 text-xs mt-1 leading-relaxed">
              Las clínicas con perfiles completos (incluyendo fotos e infraestructura) reciben un 60% más de postulaciones en sus ofertas de empleo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECCIÓN 1: IDENTIDAD */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 p-5 flex items-center gap-3">
              <div className="bg-[#1A3D3D]/10 p-2 rounded-lg">
                <Building2 className="text-[#1A3D3D]" size={20} />
              </div>
              <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg">Identidad y Dirección Médica</h2>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Fotos */}
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-[#2D6A6A] transition-colors shrink-0">
                  <ImagePlus size={24} className="mb-1" />
                  <span className="text-[10px] font-semibold">Logo</span>
                </div>
                <div className="flex-1 w-full h-24 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-[#2D6A6A] transition-colors">
                  <ImagePlus size={24} className="mb-1" />
                  <span className="text-[10px] font-semibold">Foto de Fachada o Recepción</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Nombre de la Clínica</label>
                  <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] focus:ring-1 focus:ring-[#2D6A6A] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email Institucional</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] focus:ring-1 focus:ring-[#2D6A6A] outline-none transition-all text-gray-500" disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <div>
                  <label className="block text-xs font-semibold text-orange-800 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <UserCheck size={14} /> Director Médico
                  </label>
                  <input type="text" name="directorMedico" placeholder="Ej. Dr. Juan Pérez" value={formData.directorMedico} onChange={handleChange} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-orange-800 mb-1.5 uppercase tracking-wider">Matrícula (MP/MN)</label>
                  <input type="text" name="matriculaDirector" placeholder="Ej. MP 12345" value={formData.matriculaDirector} onChange={handleChange} className="w-full bg-white border border-orange-200 rounded-xl px-4 py-3 text-sm focus:border-orange-400 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Breve Descripción (Bio)</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Cuéntale a la comunidad sobre la historia y filosofía de tu centro..." rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] focus:ring-1 focus:ring-[#2D6A6A] outline-none transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: UBICACIÓN Y CONTACTO */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 p-5 flex items-center gap-3">
              <div className="bg-[#1A3D3D]/10 p-2 rounded-lg">
                <MapPin className="text-[#1A3D3D]" size={20} />
              </div>
              <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg">Ubicación y Contacto</h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Dirección Exacta</label>
                <input type="text" name="direccion" placeholder="Ej. Av. Rivadavia 1234" value={formData.direccion} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Ciudad</label>
                  <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Provincia</label>
                  <input type="text" name="provincia" value={formData.provincia} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Phone size={14} /> WhatsApp (Derivaciones/Consultas)
                  </label>
                  <input type="tel" name="whatsapp" placeholder="+54 9 11..." value={formData.whatsapp} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-green-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <Phone size={14} /> Teléfono Fijo (Opcional)
                  </label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: INFRAESTRUCTURA Y SERVICIOS */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 p-5 flex items-center gap-3">
              <div className="bg-[#1A3D3D]/10 p-2 rounded-lg">
                <Activity className="text-[#1A3D3D]" size={20} />
              </div>
              <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg">Infraestructura y Servicios</h2>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-5">
                Selecciona las instalaciones y servicios con los que cuenta tu centro. Esto ayuda a otros colegas a saber qué pueden derivarte.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { id: 'quirofano', label: 'Quirófano Equipado' },
                  { id: 'rayos', label: 'Rayos X' },
                  { id: 'ecografia', label: 'Ecografía' },
                  { id: 'laboratorio', label: 'Laboratorio Propio' },
                  { id: 'internacion', label: 'Internación' },
                  { id: 'exoticos', label: 'Animales Exóticos' },
                ].map((servicio) => (
                  <label 
                    key={servicio.id} 
                    className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.servicios[servicio.id] 
                        ? 'border-[#2D6A6A] bg-[#2D6A6A]/5' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={formData.servicios[servicio.id]}
                      onChange={() => handleServiceChange(servicio.id)}
                    />
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 border ${
                      formData.servicios[servicio.id] ? 'bg-[#2D6A6A] border-[#2D6A6A]' : 'border-gray-300'
                    }`}>
                      {formData.servicios[servicio.id] && <CircleCheck size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${formData.servicios[servicio.id] ? 'text-[#1A3D3D]' : 'text-gray-600'}`}>
                      {servicio.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SECCIÓN 4: HORARIOS */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 bg-gray-50/50 p-5 flex items-center gap-3">
              <div className="bg-[#1A3D3D]/10 p-2 rounded-lg">
                <Clock className="text-[#1A3D3D]" size={20} />
              </div>
              <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg">Horarios de Atención</h2>
            </div>
            
            <div className="p-6 space-y-5">
              {/* Toggle Guardia 24hs */}
              <label className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl cursor-pointer hover:bg-red-100/50 transition-colors">
                <div>
                  <h3 className="font-bold text-red-900 text-sm">¿Tienen Guardia 24 horas?</h3>
                  <p className="text-red-700/80 text-xs mt-1">Destaca tu clínica para urgencias nocturnas</p>
                </div>
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.guardia24h ? 'bg-red-500' : 'bg-gray-300'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${formData.guardia24h ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
                <input 
                  type="checkbox" 
                  name="guardia24h"
                  checked={formData.guardia24h}
                  onChange={handleChange}
                  className="hidden" 
                />
              </label>

              {!formData.guardia24h && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Lunes a Viernes</label>
                    <input type="text" name="horarioSemana" placeholder="Ej. 09:00 a 20:00 hs" value={formData.horarioSemana} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Sábados / Domingos</label>
                    <input type="text" name="horarioFinde" placeholder="Ej. Sábados 09 a 13 hs" value={formData.horarioFinde} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
                  </div>
                </div>
              )}
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}