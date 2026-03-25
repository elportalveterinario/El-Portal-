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
  FileText,
  CreditCard,
  Wrench,
  Mail,
  Check,
  Info
} from 'lucide-react';

export default function EditorEmpresa() {
  const [isSaved, setIsSaved] = useState(false);

  // ESTADO ACTUALIZADO: Refleja 1 a 1 los datos que consume PerfilProveedor.jsx
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    razonSocial: '',
    cuit: '',
    categoria: '', // Ej: Distribuidor Oficial Nacional
    bioCorta: '',
    descripcion: '', // Bio Larga
    zonaCobertura: '',
    whatsappVentas: '',
    emailVentas: '',
    web: '',
    linkCatalogo: '', 
    marcasRepresentadas: '', // Separadas por coma
    categorias: {
      alimentos: false,
      farmacia: false,
      equipamiento: false,
      descartables: false,
      instrumental: false,
      software: false
    },
    // NUEVO: Opciones estandarizadas para el Sidebar del perfil
    logistica: {
      todoElPais: false,
      despachoRapido: false,
      transporteConvenir: false,
      retiroLocal: false,
      embalajeSeguro: false,
    },
    pagos: {
      transferencia: false,
      tarjetaCredito: false,
      echeq: false,
      facturaA: false,
      financiacionPropia: false,
    },
    garantia: {
      oficial: false,
      tecnicoPropio: false,
      repuestos: false,
      asesoramiento: false,
    }
  });

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap';
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

  // Clases reutilizables para inputs
  const inputClass = "w-full bg-[#F4F7F7] border border-gray-200 rounded-2xl px-5 py-4 text-[15px] font-medium text-[#333] focus:border-[#2D6A6A] focus:bg-white focus:ring-4 focus:ring-[#2D6A6A]/10 outline-none transition-all placeholder:text-gray-400";
  const labelClass = "block text-[11px] font-bold text-gray-500 mb-2 uppercase tracking-widest";

  return (
    <div className="min-h-screen bg-[#F4F7F7] font-['Inter'] pb-20 selection:bg-[#2D6A6A] selection:text-white">
      
      {/* HEADER FIJO ESTILO "BACKSTAGE" */}
      <div className="bg-[#1A3D3D] pt-12 pb-6 px-6 sticky top-0 z-50 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between relative z-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-3 py-1 rounded-full mb-3">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#4DB6AC] animate-pulse"></span>
              <span className="text-white font-bold text-[9px] uppercase tracking-[0.2em] leading-none">Modo Edición</span>
            </div>
            <h1 className="text-white font-['Montserrat'] font-black text-3xl tracking-tight">
              Configurar Vidriera B2B
            </h1>
          </div>
          <button 
            onClick={handleSubmit}
            className={`px-8 py-4 rounded-[20px] font-black text-[13px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 border border-white/10
              ${isSaved 
                ? 'bg-[#4DB6AC] text-[#1A3D3D] shadow-[#4DB6AC]/20' 
                : 'bg-[#2D6A6A] hover:bg-white hover:text-[#1A3D3D] text-white shadow-[#2D6A6A]/20'}`}
          >
            {isSaved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {isSaved ? 'Cambios Públicos' : 'Publicar Perfil'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 space-y-8">
        
        {/* SECCIÓN 1: DATOS DE LA EMPRESA */}
        <div className="bg-white rounded-[32px] shadow-[0_20px_40px_rgba(26,61,61,0.03)] border border-gray-100 p-6 md:p-10">
          <div className="flex items-center gap-4 mb-8 border-b border-gray-50 pb-6">
            <div className="w-14 h-14 bg-[#F4F7F7] rounded-2xl flex items-center justify-center text-[#2D6A6A] border border-gray-100 shrink-0">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-['Montserrat'] font-black text-[#1A3D3D] text-2xl">Identidad Visual e Info</h2>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Cómo te ven las clínicas</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Logos */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="w-32 h-32 bg-[#F4F7F7] rounded-[24px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-white hover:border-[#2D6A6A] hover:shadow-lg transition-all shrink-0 group">
                <ImagePlus className="w-8 h-8 mb-2 text-gray-300 group-hover:text-[#2D6A6A] transition-colors" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-center px-2 group-hover:text-[#1A3D3D]">Subir<br/>Logo</span>
              </div>
              <div className="flex-1 h-32 bg-[#F4F7F7] rounded-[24px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-white hover:border-[#2D6A6A] hover:shadow-lg transition-all group relative overflow-hidden">
                <ImagePlus className="w-8 h-8 mb-2 text-gray-300 group-hover:text-[#2D6A6A] transition-colors" />
                <span className="text-[11px] font-bold text-center px-4 group-hover:text-[#1A3D3D]">Subir Banner de Portada (1200x400px)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Nombre Fantasía</label>
                <input type="text" name="nombreEmpresa" placeholder="Ej. VetSur Insumos" value={formData.nombreEmpresa} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Etiqueta de Categoría</label>
                <select name="categoria" value={formData.categoria} onChange={handleChange} className={inputClass}>
                  <option value="">Seleccionar rol principal...</option>
                  <option value="Distribuidor Oficial">Distribuidor Oficial</option>
                  <option value="Fabricante Nacional">Fabricante Nacional</option>
                  <option value="Importador Directo">Importador Directo</option>
                  <option value="Laboratorio">Laboratorio Veterinario</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Slogan o Bio Corta (150 caract.)</label>
                <input type="text" name="bioCorta" placeholder="Ej. Más de 15 años equipando quirófanos..." value={formData.bioCorta} onChange={handleChange} className={inputClass} maxLength={150} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Descripción Completa (Sobre Nosotros)</label>
              <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Detalla la trayectoria, propuesta de valor y diferenciales de tu empresa..." rows="4" className={`${inputClass} resize-none`}></textarea>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: CATÁLOGO Y CONTACTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-[32px] shadow-[0_20px_40px_rgba(26,61,61,0.03)] border border-gray-100 p-6 md:p-10">
            <div className="flex items-center gap-4 mb-6 border-b border-gray-50 pb-6">
              <div className="w-12 h-12 bg-[#F4F7F7] rounded-xl flex items-center justify-center text-[#2D6A6A] border border-gray-100 shrink-0">
                <PackageSearch className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-['Montserrat'] font-black text-[#1A3D3D] text-xl">Catálogo</h2>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Link a lista de precios o Drive</label>
                <input type="url" name="linkCatalogo" placeholder="https://..." value={formData.linkCatalogo} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Marcas que representan</label>
                <input type="text" name="marcasRepresentadas" placeholder="Ej. Bayer, Zoetis, Mindray (Separadas por coma)" value={formData.marcasRepresentadas} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Rubros principales</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'alimentos', label: 'Alimentos' },
                    { id: 'farmacia', label: 'Farmacia' },
                    { id: 'equipamiento', label: 'Equipos' },
                    { id: 'descartables', label: 'Descartables' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNestedChange('categorias', item.id)}
                      className={`px-4 py-2 rounded-xl text-[13px] font-bold border transition-all ${
                        formData.categorias[item.id] 
                        ? 'bg-[#1A3D3D] text-white border-[#1A3D3D]' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#2D6A6A]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] shadow-[0_20px_40px_rgba(26,61,61,0.03)] border border-gray-100 p-6 md:p-10">
            <div className="flex items-center gap-4 mb-6 border-b border-gray-50 pb-6">
              <div className="w-12 h-12 bg-[#F4F7F7] rounded-xl flex items-center justify-center text-[#2D6A6A] border border-gray-100 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-['Montserrat'] font-black text-[#1A3D3D] text-xl">Contacto B2B</h2>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className={labelClass}>WhatsApp Comercial</label>
                <input type="tel" name="whatsappVentas" placeholder="+54 9..." value={formData.whatsappVentas} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email de Ventas</label>
                <input type="email" name="emailVentas" placeholder="ventas@empresa.com" value={formData.emailVentas} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Sitio Web</label>
                <input type="url" name="web" placeholder="www.tuempresa.com.ar" value={formData.web} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

        </div>

        {/* SECCIÓN 3: LOGÍSTICA, PAGOS Y POST-VENTA (LAS 3 CAJAS DEL SIDEBAR) */}
        <div className="bg-[#1A3D3D] rounded-[32px] p-1 shadow-xl">
          <div className="bg-white rounded-[30px] p-6 md:p-10">
            <div className="mb-8 text-center">
              <h2 className="font-['Montserrat'] font-black text-[#1A3D3D] text-2xl mb-2">Condiciones Comerciales</h2>
              <p className="text-gray-500 text-sm">Esta información se mostrará estandarizada en la columna derecha de tu perfil.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Columna 1: Logística */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-5 h-5 text-[#2D6A6A]" />
                  <h3 className="font-['Montserrat'] font-bold text-[#1A3D3D]">Logística</h3>
                </div>
                {[
                  { id: 'todoElPais', label: 'Envíos a todo el país' },
                  { id: 'despachoRapido', label: 'Despacho en 24/48hs' },
                  { id: 'transporteConvenir', label: 'Transporte a convenir' },
                  { id: 'retiroLocal', label: 'Retiro en depósito' },
                  { id: 'embalajeSeguro', label: 'Embalaje de seguridad' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${formData.logistica[item.id] ? 'bg-[#4DB6AC] border-[#4DB6AC]' : 'bg-[#F4F7F7] border-gray-300 group-hover:border-[#2D6A6A]'}`}>
                      {formData.logistica[item.id] && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-[14px] font-medium text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Columna 2: Pagos */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-5 h-5 text-[#2D6A6A]" />
                  <h3 className="font-['Montserrat'] font-bold text-[#1A3D3D]">Pagos</h3>
                </div>
                {[
                  { id: 'facturaA', label: 'Emitimos Factura A y B' },
                  { id: 'transferencia', label: 'Desc. por Transferencia' },
                  { id: 'tarjetaCredito', label: 'Cuotas c/ Tarjeta' },
                  { id: 'echeq', label: 'Aceptamos E-Cheq' },
                  { id: 'financiacionPropia', label: 'Financiación Propia' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${formData.pagos[item.id] ? 'bg-[#4DB6AC] border-[#4DB6AC]' : 'bg-[#F4F7F7] border-gray-300 group-hover:border-[#2D6A6A]'}`}>
                      {formData.pagos[item.id] && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-[14px] font-medium text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>

              {/* Columna 3: Post-Venta */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Wrench className="w-5 h-5 text-[#2D6A6A]" />
                  <h3 className="font-['Montserrat'] font-bold text-[#1A3D3D]">Post-Venta</h3>
                </div>
                {[
                  { id: 'oficial', label: 'Garantía oficial' },
                  { id: 'tecnicoPropio', label: 'Servicio técnico propio' },
                  { id: 'repuestos', label: 'Repuestos originales' },
                  { id: 'asesoramiento', label: 'Asesoramiento técnico' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors ${formData.garantia[item.id] ? 'bg-[#4DB6AC] border-[#4DB6AC]' : 'bg-[#F4F7F7] border-gray-300 group-hover:border-[#2D6A6A]'}`}>
                      {formData.garantia[item.id] && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-[14px] font-medium text-gray-700">{item.label}</span>
                  </label>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}