import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, ChevronLeft, Menu, Phone, Mail, Globe,
  PackageSearch, Truck, CreditCard, Check, ArrowUpRight, X, MessageCircle, FileText, Wrench,
  Facebook, Instagram, Linkedin, Heart
} from 'lucide-react';

// ==========================================
// DATOS DEL PROVEEDOR
// ==========================================
const PROVEEDOR = {
  nombre: "VetSur Insumos",
  categoria: "Distribuidor Oficial Nacional",
  verificado: true,
  fotoPortada: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  logo: "https://api.dicebear.com/7.x/initials/svg?seed=VS&backgroundColor=1A3D3D",
  bioCorta: "Más de 15 años equipando quirófanos y consultorios veterinarios en toda la Argentina con tecnología de punta y soporte técnico directo.",
  bioLarga: "Entendemos que el equipamiento de tu clínica es el corazón de tus diagnósticos y cirugías. Por eso, en VetSur no solo somos distribuidores, somos socios estratégicos del profesional veterinario. Contamos con un equipo de bioingenieros para servicio técnico oficial y garantizamos la trazabilidad de todos nuestros insumos importados.",
  contacto: {
    whatsapp: "+5491112345678",
    email: "ventas@vetsur.com.ar",
  },
  envios: [
    "Envíos a todo el país",
    "Despacho en 24 a 48hs hábiles",
    "Transporte a convenir",
    "Retiro en depósito disponible",
    "Embalaje de seguridad"
  ],
  // ACTUALIZADO: Medios de pago, cuotas y descuentos
  pagos: [
    "10% OFF por transferencia",
    "3 y 6 cuotas con Tarjeta de Crédito",
    "Aceptamos E-Cheq (30/60 días)",
    "Emitimos Factura A y B"
  ],
  // NUEVO: Post-venta (Clave para B2B)
  garantia: [
    "Garantía oficial (12 a 24 meses)",
    "Servicio técnico propio",
    "Repuestos originales en stock",
    "Asesoramiento de instalación"
  ],
  productosDestacados: [
    { 
      id: 1, 
      titulo: "Ecógrafo Portátil Mindray V1", 
      categoria: "Imágenes", 
      precio: "2.500.000", 
      imagenes: [
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1584820927500-1c3f81e33c94?auto=format&fit=crop&w=800&q=80", 
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"  
      ],
      descripcionLarga: "Sistema de ultrasonido Doppler a color, diseñado específicamente para uso veterinario. Su diseño ultraligero y batería de larga duración lo hacen ideal tanto para consultorio como para salidas a campo. Interfaz intuitiva y presets específicos para diferentes especies. Incluye múltiples modos de visualización que permiten diagnósticos más certeros y rápidos en situaciones de emergencia.",
      caracteristicas: ["Pantalla LED 15 pulgadas de alta resolución", "Batería con 90 min de autonomía", "Sondas microconvex y lineal incluidas", "Doppler Color y Pulsado", "12 meses de garantía oficial"]
    },
    { 
      id: 2, 
      titulo: "Monitor Multiparamétrico Vet", 
      categoria: "Quirófano", 
      precio: "850.000", 
      imagenes: [
        "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80", 
      ],
      descripcionLarga: "Monitor preconfigurado para parámetros vitales en pequeños y grandes animales. Algoritmos optimizados para detectar frecuencias cardíacas elevadas y presiones arteriales en pacientes críticos. Cuenta con un sistema avanzado de reducción de interferencias que asegura lecturas estables incluso en animales inquietos.",
      caracteristicas: ["Medición de ECG, SpO2, NIBP, RESP, TEMP", "Pantalla táctil de 12.1\"", "Alarmas visuales y auditivas configurables", "Soporte rodante opcional", "Batería de respaldo integrada"]
    },
  ],
  marcas: [
    { id: 1, nombre: "Bayer", logo: "https://placehold.co/300x150/ffffff/1A3D3D?text=BAYER&font=montserrat" },
    { id: 2, nombre: "Zoetis", logo: "https://placehold.co/300x150/ffffff/1A3D3D?text=ZOETIS&font=montserrat" },
  ]
};

export default function PerfilProveedor() {
  const navigate = useNavigate();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [imagenActiva, setImagenActiva] = useState(0);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (productoSeleccionado) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => document.body.style.overflow = 'auto';
  }, [productoSeleccionado]);

  const handleCerrarModal = (e) => {
    if (e.target.id === 'modal-overlay') {
      setProductoSeleccionado(null);
    }
  };

  const abrirModalProducto = (prod) => {
    setProductoSeleccionado(prod);
    setImagenActiva(0);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F7] font-['Inter'] text-[#333333] selection:bg-[#2D6A6A] selection:text-white antialiased">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-[80px] bg-white border-b border-gray-100 flex items-center px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center">
            <div className="text-[#1A3D3D] font-['Montserrat'] font-extrabold text-2xl tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
                El Portal<span className="text-[#2D6A6A]">.</span>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-gray-500 font-bold text-[11px] uppercase tracking-widest">
                <button className="hover:text-[#1A3D3D] transition-colors">¿Por qué unirte?</button>
                <button className="hover:text-[#1A3D3D] transition-colors">Ecosistema</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:flex bg-[#1A3D3D] text-white px-6 py-3 rounded-[16px] font-bold text-[13px] hover:bg-[#2D6A6A] transition-colors shadow-sm">
                Crear mi perfil
              </button>
              <button className="w-12 h-12 bg-white border border-gray-200 rounded-[16px] flex items-center justify-center text-[#1A3D3D] hover:bg-gray-50 transition-colors shadow-sm">
                <Menu className="w-5 h-5" />
              </button>
            </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-[110px] pb-16 md:pt-[130px] md:pb-24 px-6 md:px-10 bg-[#1A3D3D] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={PROVEEDOR.fotoPortada} alt="Fondo Empresa" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A3D3D] via-[#1A3D3D]/90 to-transparent"></div>
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Volver
          </button>
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
            <div className="w-28 h-28 md:w-36 md:h-36 bg-[#1A3D3D] rounded-[32px] p-2 shrink-0 border-[3px] border-white relative shadow-xl">
              <img src={PROVEEDOR.logo} alt={PROVEEDOR.nombre} className="w-full h-full object-cover rounded-[20px]" />
              {PROVEEDOR.verificado && (
                <div className="absolute -bottom-3 -right-3 bg-[#4DB6AC] text-white p-2.5 rounded-xl shadow-lg border-2 border-[#1A3D3D]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>
            <div className="flex-1 max-w-3xl pt-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-full mb-4">
                <span className="flex h-1.5 w-1.5 rounded-full bg-[#4DB6AC] animate-pulse"></span>
                <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em] leading-none">{PROVEEDOR.categoria}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white font-['Montserrat'] leading-[1.1] tracking-tighter mb-4">
                {PROVEEDOR.nombre}
              </h1>
              <p className="text-white/80 text-sm md:text-base font-medium leading-relaxed">
                {PROVEEDOR.bioCorta}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-[1200px] mx-auto px-6 md:px-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative -top-8">
          
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-4">Sobre Nosotros</h2>
              <p className="text-gray-600 font-medium text-[15px] leading-relaxed">
                {PROVEEDOR.bioLarga}
              </p>
            </div>

            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-6">Catálogo Publicado</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROVEEDOR.productosDestacados.map(prod => (
                  <article key={prod.id} onClick={() => abrirModalProducto(prod)} className="bg-[#F4F7F7] rounded-[24px] p-4 border border-gray-100 hover:shadow-md hover:border-[#2D6A6A]/30 transition-all group flex flex-col cursor-pointer">
                    <div className="w-full h-48 bg-white rounded-[16px] mb-4 p-4 flex items-center justify-center relative overflow-hidden border border-gray-50">
                      <span className="absolute top-3 left-3 bg-[#1A3D3D] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg z-10">
                        {prod.categoria}
                      </span>
                      <img src={prod.imagenes[0]} alt={prod.titulo} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-sm mb-2 leading-tight">
                      {prod.titulo}
                    </h3>
                    <div className="mt-auto flex items-end justify-between pt-2">
                      <div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest block mb-0.5">Precio ARS</span>
                        <span className="font-black text-[#2D6A6A] text-lg">${prod.precio}</span>
                      </div>
                      <button className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-[#1A3D3D] group-hover:bg-[#1A3D3D] group-hover:text-white transition-colors shadow-sm">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-black font-['Montserrat'] text-[#1A3D3D] mb-6">Marcas Representadas</h2>
              <div className="grid grid-cols-2 gap-4">
                {PROVEEDOR.marcas.map((marca) => (
                  <div key={marca.id} className="bg-[#F4F7F7] rounded-[24px] border border-gray-100 p-8 flex items-center justify-center aspect-video group cursor-default">
                    <img src={marca.logo} alt={marca.nombre} className="w-full h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SIDEBAR DERECHO */}
          <aside className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="sticky top-[104px] flex flex-col gap-6">
              
              {/* 1. CAJA DE CONTACTO */}
              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_20px_40px_rgba(26,61,61,0.08)] border border-gray-100 flex flex-col gap-6 relative z-20">
                <div className="text-center border-b border-gray-50 pb-6">
                  <div className="w-16 h-16 bg-[#F4F7F7] rounded-2xl flex items-center justify-center text-[#2D6A6A] mx-auto mb-4 border border-gray-100">
                    <PackageSearch className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-xl mb-1">Contacto Comercial</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Asesoramiento directo</p>
                </div>
                <div className="space-y-3">
                  <a href={`https://wa.me/${PROVEEDOR.contacto.whatsapp}`} target="_blank" rel="noreferrer" className="w-full py-4 bg-[#1A3D3D] text-white rounded-[20px] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#2D6A6A] transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95">
                    <Phone className="w-4 h-4" /> Hablar con Ventas
                  </a>
                  <a href={`mailto:${PROVEEDOR.contacto.email}`} className="w-full py-4 bg-white text-[#1A3D3D] border-2 border-gray-100 rounded-[20px] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center justify-center gap-2 active:scale-95">
                    <Mail className="w-4 h-4 text-gray-400" /> Enviar Correo
                  </a>
                </div>
              </div>

              {/* 2. CAJA DE ENVÍOS */}
              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_20px_40px_rgba(26,61,61,0.04)] border border-gray-100 flex flex-col relative z-20">
                <div className="flex items-center gap-4 mb-5 border-b border-gray-50 pb-5">
                  <div className="w-12 h-12 bg-[#F4F7F7] rounded-xl flex items-center justify-center text-[#2D6A6A] border border-gray-100 shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-lg leading-tight mb-0.5">Logística</h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Opciones de entrega</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {PROVEEDOR.envios.map((punto, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#4DB6AC]" />
                      </div>
                      <p className="text-[13px] text-gray-600 font-medium leading-snug">
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. CAJA DE PAGOS Y FACTURACIÓN */}
              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_20px_40px_rgba(26,61,61,0.04)] border border-gray-100 flex flex-col relative z-20">
                <div className="flex items-center gap-4 mb-5 border-b border-gray-50 pb-5">
                  <div className="w-12 h-12 bg-[#F4F7F7] rounded-xl flex items-center justify-center text-[#2D6A6A] border border-gray-100 shrink-0">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-lg leading-tight mb-0.5">Condiciones</h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Pagos y Facturación</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {PROVEEDOR.pagos.map((punto, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#4DB6AC]" />
                      </div>
                      <p className="text-[13px] text-gray-600 font-medium leading-snug">
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. NUEVA CAJA: SOPORTE Y GARANTÍA */}
              <div className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_20px_40px_rgba(26,61,61,0.04)] border border-gray-100 flex flex-col relative z-20">
                <div className="flex items-center gap-4 mb-5 border-b border-gray-50 pb-5">
                  <div className="w-12 h-12 bg-[#F4F7F7] rounded-xl flex items-center justify-center text-[#2D6A6A] border border-gray-100 shrink-0">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-['Montserrat'] font-black text-[#1A3D3D] text-lg leading-tight mb-0.5">Post-Venta</h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Soporte y Garantía</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {PROVEEDOR.garantia.map((punto, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#4DB6AC]" />
                      </div>
                      <p className="text-[13px] text-gray-600 font-medium leading-snug">
                        {punto}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </aside>
          
        </div>
      </main>

      {/* MODAL DETALLE DE PRODUCTO AMPLIADO */}
      {productoSeleccionado && (
        <div 
          id="modal-overlay"
          onClick={handleCerrarModal}
          className="fixed inset-0 z-[200] bg-[#1A3D3D]/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-[32px] w-full max-w-5xl h-auto max-h-[90vh] md:h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setProductoSeleccionado(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-[#1A3D3D] transition-colors z-50 border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Columna Izquierda Fija */}
            <div className="md:w-1/2 bg-[#F4F7F7] p-6 md:p-10 flex flex-col h-[40vh] md:h-full relative shrink-0">
              <div className="flex-1 flex items-center justify-center min-h-0 mb-6">
                <img 
                  src={productoSeleccionado.imagenes[imagenActiva]} 
                  alt={`${productoSeleccionado.titulo} - Vista principal`} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply transition-opacity duration-300 drop-shadow-sm"
                />
              </div>

              {productoSeleccionado.imagenes.length > 1 && (
                <div className="flex justify-center flex-wrap gap-2 md:gap-3 shrink-0">
                  {productoSeleccionado.imagenes.map((imgUrl, index) => (
                    <button 
                      key={index}
                      onClick={() => setImagenActiva(index)}
                      className={`
                        w-14 h-14 md:w-20 md:h-20 rounded-xl bg-white flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-200
                        ${imagenActiva === index 
                          ? 'border-2 border-[#2D6A6A] shadow-md ring-2 ring-[#2D6A6A]/20' 
                          : 'border border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                        }
                      `}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Miniatura ${index + 1}`} 
                        className="w-full h-full object-contain p-2 mix-blend-multiply" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Columna Derecha con Scroll */}
            <div className="md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col bg-white overflow-y-auto hide-scrollbar">
              <div className="pb-8">
                <span className="inline-block bg-[#2D6A6A]/10 text-[#2D6A6A] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg mb-4 w-fit">
                  {productoSeleccionado.categoria}
                </span>
                
                <h3 className="text-3xl md:text-4xl font-black font-['Montserrat'] text-[#1A3D3D] mb-4 leading-tight pr-10">
                  {productoSeleccionado.titulo}
                </h3>
                
                <div className="mb-8 p-6 bg-[#F4F7F7] rounded-[24px] border border-gray-100">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1">Precio Referencial (ARS)</span>
                  <span className="font-black text-[#2D6A6A] text-3xl">${productoSeleccionado.precio}</span>
                </div>

                <div className="prose prose-sm md:prose-base text-gray-600 leading-relaxed mb-10">
                  <p>{productoSeleccionado.descripcionLarga}</p>
                </div>

                <div className="mb-10">
                  <h4 className="text-[12px] font-bold uppercase tracking-widest text-[#1A3D3D] mb-5 border-b border-gray-100 pb-3">
                    Características principales
                  </h4>
                  <ul className="space-y-4">
                    {productoSeleccionado.caracteristicas.map((carac, i) => (
                      <li key={i} className="flex items-center gap-3 text-[14px] md:text-[15px] text-gray-600 font-medium">
                        <div className="w-6 h-6 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-[#4DB6AC]" />
                        </div>
                        <span className="leading-snug">{carac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-8 border-t border-gray-100">
                  <a 
                    href={`https://wa.me/${PROVEEDOR.contacto.whatsapp}?text=Hola, estoy viendo el perfil de ${PROVEEDOR.nombre} en El Portal y me gustaría consultar por el equipo: ${productoSeleccionado.titulo}.`}
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-5 bg-[#2D6A6A] text-white rounded-[20px] font-black text-[13px] uppercase tracking-[0.2em] hover:bg-[#1A3D3D] transition-all shadow-xl shadow-[#2D6A6A]/20 flex items-center justify-center gap-3 active:scale-95"
                  >
                    <MessageCircle className="w-6 h-6" /> Consultar disponibilidad
                  </a>
                  <p className="text-center text-[11px] font-medium text-gray-400 mt-4">
                    Al contactar, serás redirigido a WhatsApp para hablar directo con {PROVEEDOR.nombre}.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER COMPACTO (Definitivo) */}
      <footer className="w-full bg-gradient-to-br from-[#1A3D3D] to-[#2D6A6A] relative overflow-hidden mt-12 pt-12 pb-8 text-left print:hidden">
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

    </div>
  );
}