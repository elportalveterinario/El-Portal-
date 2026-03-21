import React, { useState, useEffect } from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  PackageSearch, 
  ImagePlus, 
  Save,
  CircleCheck,
  Globe,
  Truck,
  FileText
} from 'lucide-react';

export default function EditorEmpresa() {
  const [isSaved, setIsSaved] = useState(false);

  // Estado para la "Vidriera Comercial" del Proveedor
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    razonSocial: '',
    cuit: '',
    descripcion: '',
    direccion: '',
    zonaCobertura: '',
    whatsappVentas: '',
    emailVentas: '',
    web: '',
    instagram: '',
    linkCatalogo: '', 
    categorias: {
      alimentos: false,
      farmacia: false,
      equipamiento: false,
      descartables: false,
      instrumental: false,
      software: false
    },
    ventaA: {
      clinicas: true,
      profesionales: true,
      publicoGeneral: false
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

  const handleNestedChange = (category, item) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Guardando perfil de Empresa:', formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter'] pb-12">
      {/* Header Fijo con el color corporativo del Portal */}
      <div className="bg-[#1A3D3D] pt-12 pb-6 px-6 shadow-md sticky top-0 z-50 relative overflow-hidden">
        {/* Patrón de fondo sutil (igual al de la clínica) */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-3xl mx-auto flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-white font-['Montserrat'] font-bold text-2xl tracking-tight">
              Perfil de Proveedor
            </h1>
            <p className="text-emerald-100 text-sm mt-1">
              Destaca tus productos ante clínicas y profesionales
            </p>
          </div>
          <button 
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 border border-emerald-400/30"
          >
            {isSaved ? <CircleCheck size={18} /> : <Save size={18} />}
            <span className="hidden sm:inline">{isSaved ? 'Actualizado' : 'Guardar Datos'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        
        {/* SECCIÓN 1: DATOS DE LA EMPRESA */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 bg-emerald-50/30 p-5 flex items-center gap-3">
            <div className="bg-emerald-100/50 p-2 rounded-lg">
              <Building className="text-[#2D6A6A]" size={20} />
            </div>
            <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg">Información Comercial</h2>
          </div>
          
          <div className="p-6 space-y-5">
            {/* Logos */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="w-32 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-colors shrink-0 group">
                <ImagePlus size={28} className="mb-2 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-center px-2 group-hover:text-emerald-700">Logo de la<br/>Empresa</span>
              </div>
              <div className="flex-1 h-32 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-emerald-50 hover:border-emerald-500 transition-colors group">
                <ImagePlus size={28} className="mb-2 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                <span className="text-[11px] font-semibold text-center px-4 group-hover:text-emerald-700">Banner Promocional o Foto de Productos Destacados<br/>(Recomendado: 1200x400px)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Nombre Fantasía / Marca</label>
                <input type="text" name="nombreEmpresa" placeholder="Ej. Distribuidora VetSur" value={formData.nombreEmpresa} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] focus:ring-1 focus:ring-[#2D6A6A] outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Razón Social y CUIT (Privado)</label>
                <input type="text" placeholder="Ej. VetSur S.A. - 30-12345678-9" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Descripción de la Empresa</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="¿Qué fabrican o distribuyen? ¿Cuántos años de trayectoria tienen?..." rows="3" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: RUBROS Y CATÁLOGO */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 bg-emerald-50/30 p-5 flex items-center gap-3">
            <div className="bg-emerald-100/50 p-2 rounded-lg">
              <PackageSearch className="text-[#2D6A6A]" size={20} />
            </div>
            <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg">Rubros y Catálogo</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-3 border-b border-gray-100 pb-2">¿Qué tipo de insumos proveen?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'alimentos', label: 'Alimentos / Nutrición' },
                  { id: 'farmacia', label: 'Laboratorio Farmacéutico' },
                  { id: 'equipamiento', label: 'Equipamiento Médico' },
                  { id: 'descartables', label: 'Insumos Descartables' },
                  { id: 'instrumental', label: 'Instrumental Quirúrgico' },
                  { id: 'software', label: 'Software para Clínicas' },
                ].map((item) => (
                  <label key={item.id} className={`flex items-center p-2.5 rounded-xl border cursor-pointer transition-all ${formData.categorias[item.id] ? 'border-[#2D6A6A] bg-emerald-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="checkbox" className="hidden" checked={formData.categorias[item.id]} onChange={() => handleNestedChange('categorias', item.id)} />
                    <div className={`w-4 h-4 rounded-sm flex items-center justify-center mr-2.5 border transition-colors ${formData.categorias[item.id] ? 'bg-[#2D6A6A] border-[#2D6A6A]' : 'border-gray-300'}`}>
                      {formData.categorias[item.id] && <CircleCheck size={12} className="text-white" />}
                    </div>
                    <span className={`text-sm ${formData.categorias[item.id] ? 'text-[#1A3D3D] font-medium' : 'text-gray-600'}`}>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-emerald-50/50 rounded-xl p-5 border border-emerald-100">
              <label className="block text-xs font-semibold text-[#1A3D3D] mb-1.5 uppercase tracking-wider flex items-center gap-2">
                <FileText size={16} className="text-[#2D6A6A]" /> Enlace a Catálogo de Productos
              </label>
              <p className="text-xs text-gray-600 mb-3">Pega aquí el link a tu carpeta de Google Drive, PDF subido a la nube, o sección de productos de tu web.</p>
              <input type="url" name="linkCatalogo" placeholder="https://..." value={formData.linkCatalogo} onChange={handleChange} className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: LOGÍSTICA Y CONTACTO DE VENTAS */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 bg-emerald-50/30 p-5 flex items-center gap-3">
            <div className="bg-emerald-100/50 p-2 rounded-lg">
              <Truck className="text-[#2D6A6A]" size={20} />
            </div>
            <h2 className="font-['Montserrat'] font-bold text-[#1A3D3D] text-lg">Logística y Contacto</h2>
          </div>
          
          <div className="p-6 space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Zona de Distribución</label>
                <input type="text" name="zonaCobertura" placeholder="Ej. Todo el país / Solo GBA" value={formData.zonaCobertura} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Phone size={14} className="text-green-600" /> WhatsApp (Ventas/Atención)
                </label>
                <input type="tel" name="whatsappVentas" placeholder="+54 9..." value={formData.whatsappVentas} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                  <Globe size={14} className="text-[#2D6A6A]" /> Sitio Web Institucional
                </label>
                <input type="url" name="web" placeholder="www.tuempresa.com" value={formData.web} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-[#2D6A6A] outline-none transition-all" />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-[#1A3D3D] mb-3">¿A quiénes venden de forma directa?</h3>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.ventaA.clinicas ? 'bg-[#2D6A6A] border-[#2D6A6A]' : 'border-gray-300 group-hover:border-[#2D6A6A]'}`}>
                     {formData.ventaA.clinicas && <CircleCheck size={12} className="text-white" />}
                  </div>
                  <input type="checkbox" checked={formData.ventaA.clinicas} onChange={() => handleNestedChange('ventaA', 'clinicas')} className="hidden" />
                  <span className="text-sm text-gray-700">Clínicas Veterinarias</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.ventaA.profesionales ? 'bg-[#2D6A6A] border-[#2D6A6A]' : 'border-gray-300 group-hover:border-[#2D6A6A]'}`}>
                     {formData.ventaA.profesionales && <CircleCheck size={12} className="text-white" />}
                  </div>
                  <input type="checkbox" checked={formData.ventaA.profesionales} onChange={() => handleNestedChange('ventaA', 'profesionales')} className="hidden" />
                  <span className="text-sm text-gray-700">Profesionales Independientes</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.ventaA.publicoGeneral ? 'bg-[#2D6A6A] border-[#2D6A6A]' : 'border-gray-300 group-hover:border-[#2D6A6A]'}`}>
                     {formData.ventaA.publicoGeneral && <CircleCheck size={12} className="text-white" />}
                  </div>
                  <input type="checkbox" checked={formData.ventaA.publicoGeneral} onChange={() => handleNestedChange('ventaA', 'publicoGeneral')} className="hidden" />
                  <span className="text-sm text-gray-700">Público General (Tutores)</span>
                </label>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}