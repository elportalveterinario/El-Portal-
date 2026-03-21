import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ChevronLeft,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Stethoscope,
  Hospital,
  Store
} from 'lucide-react';

export default function Login() {
  // Estados: 'login', 'register', 'forgot_password', 'recovery_sent'
  const [view, setView] = useState('login');
  
  // Nuevo estado para el tipo de cuenta en el registro
  const [accountType, setAccountType] = useState(null); // null, 'profesional', 'clinica', 'empresa'
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '', // Se usa para Matrícula, Nombre de Clínica o Nombre de Empresa
    email: '',
    password: ''
  });

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Inter:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (view === 'login') {
      console.log('Iniciando sesión con:', formData.email);
    } else if (view === 'register') {
      console.log(`Registrando [${accountType}] con:`, formData);
    } else if (view === 'forgot_password') {
      setView('recovery_sent');
    }
  };

  const renderHeader = () => {
    if (view === 'forgot_password' || view === 'recovery_sent') return 'Recuperar Clave';
    if (view === 'register') {
        return accountType ? 'Completar Datos' : '¿Qué tipo de cuenta?';
    }
    return 'Iniciar Sesión';
  };

  // Función para manejar el botón de volver atrás
  const handleBack = () => {
    if (view === 'register' && accountType) {
        setAccountType(null); // Vuelve a la selección de tipo de cuenta
    } else {
        setView('login'); // Vuelve al login
        setAccountType(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center font-['Inter'] antialiased">
      <div className="w-full max-w-[412px] bg-[#F4F7F7] min-h-screen relative shadow-2xl flex flex-col">
        
        {/* Navbar */}
        <nav className="h-[60px] bg-transparent flex items-center px-5 justify-between shrink-0 absolute top-0 w-full z-10">
          {(view !== 'login' || accountType) && (
            <button 
              onClick={handleBack}
              className="text-[#1A3D3D] bg-white/50 backdrop-blur p-2 rounded-full hover:bg-white transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
          )}
        </nav>

        {/* Header Decorativo Superior */}
        <div className="bg-[#1A3D3D] pt-20 pb-12 px-8 rounded-b-[40px] relative overflow-hidden shrink-0 shadow-lg">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="bg-[#2D6A6A] p-3 rounded-2xl mb-4 shadow-inner border border-white/10">
              {view === 'forgot_password' || view === 'recovery_sent' ? (
                <KeyRound className="text-white w-8 h-8" />
              ) : (
                <ShieldCheck className="text-white w-8 h-8" />
              )}
            </div>
            <h1 className="text-white font-['Montserrat'] font-extrabold text-2xl tracking-tight leading-none mb-2">
              El Portal<span className="text-[#2D6A6A]">.</span>
            </h1>
            <p className="text-white/60 text-[12px] font-medium max-w-[250px]">
              {view === 'forgot_password' || view === 'recovery_sent' 
                ? 'Protegemos tu acceso profesional.' 
                : 'La red profesional exclusiva para medicina veterinaria.'}
            </p>
          </div>
        </div>

        {/* Contenedor de la Tarjeta Blanca */}
        <div className="flex-1 px-6 -mt-6 relative z-20 pb-8 flex flex-col">
          <div className="bg-white rounded-[32px] shadow-xl p-6 border border-gray-50 flex-1 flex flex-col">
            
            <h2 className="text-[#1A3D3D] font-['Montserrat'] font-bold text-lg text-center mb-6 uppercase tracking-wider">
              {renderHeader()}
            </h2>

            {/* VISTA: ELEGIR TIPO DE CUENTA (Registro Paso 1) */}
            {view === 'register' && !accountType ? (
                <div className="space-y-4">
                    <button 
                        onClick={() => setAccountType('profesional')}
                        className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-[#2D6A6A] hover:bg-[#F4F7F7] transition-all group flex items-center gap-4"
                    >
                        <div className="bg-blue-50 p-3 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
                            <Stethoscope size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1A3D3D] text-[15px]">Soy Profesional</h3>
                            <p className="text-gray-500 text-[11px] leading-tight mt-1">Veterinario/a, busco conectar y acceder a recursos.</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => setAccountType('clinica')}
                        className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-[#2D6A6A] hover:bg-[#F4F7F7] transition-all group flex items-center gap-4"
                    >
                        <div className="bg-emerald-50 p-3 rounded-full text-emerald-600 group-hover:scale-110 transition-transform">
                            <Hospital size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1A3D3D] text-[15px]">Soy una Clínica</h3>
                            <p className="text-gray-500 text-[11px] leading-tight mt-1">Busco publicar ofertas de empleo y derivaciones.</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => setAccountType('empresa')}
                        className="w-full text-left p-4 rounded-2xl border-2 border-gray-100 hover:border-[#2D6A6A] hover:bg-[#F4F7F7] transition-all group flex items-center gap-4"
                    >
                        <div className="bg-purple-50 p-3 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                            <Store size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1A3D3D] text-[15px]">Empresa / Proveedor</h3>
                            <p className="text-gray-500 text-[11px] leading-tight mt-1">Ofrezco insumos, equipamiento o servicios.</p>
                        </div>
                    </button>
                </div>
            ) : view === 'recovery_sent' ? (
              /* VISTA: CORREO ENVIADO (ÉXITO) */
              <div className="flex flex-col items-center text-center space-y-4 py-4">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-bold text-[#1A3D3D] text-[15px]">¡Revisa tu bandeja!</h3>
                <p className="text-gray-500 text-[12px] leading-relaxed">
                  Hemos enviado un enlace de recuperación a <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => setView('login')}
                  className="w-full mt-6 bg-[#2D6A6A] text-white font-bold rounded-xl py-4 flex items-center justify-center tracking-[0.1em] text-[12px] uppercase shadow-lg shadow-[#2D6A6A]/30 hover:bg-[#1A3D3D] transition-all"
                >
                  Volver al inicio
                </button>
              </div>
            ) : (
              /* VISTAS DE FORMULARIO (Login, Register paso 2, Forgot Password) */
              <>
                {(view === 'login') && (
                  <>
                    <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-semibold py-3.5 px-4 rounded-xl hover:bg-gray-50 transition-colors shadow-sm mb-6">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-[13px]">Continuar con Google</span>
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex-1 h-px bg-gray-100"></div>
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">O con tu mail</span>
                      <div className="flex-1 h-px bg-gray-100"></div>
                    </div>
                  </>
                )}

                {view === 'forgot_password' && (
                  <p className="text-center text-gray-500 text-[12px] mb-6 leading-relaxed">
                    Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* CAMPO DINÁMICO SEGÚN TIPO DE CUENTA */}
                  {view === 'register' && accountType && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        {accountType === 'profesional' ? <Stethoscope size={18} /> : 
                         accountType === 'clinica' ? <Hospital size={18} /> : <Store size={18} />}
                      </div>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder={
                            accountType === 'profesional' ? 'Tu Matrícula Profesional' : 
                            accountType === 'clinica' ? 'Nombre de la Clínica' : 'Nombre de la Empresa / Marca'
                        }
                        className="w-full pl-11 pr-4 py-3.5 bg-[#F4F7F7] border border-transparent rounded-xl text-[13px] text-[#1A3D3D] placeholder-gray-400 focus:bg-white focus:border-[#2D6A6A] focus:ring-2 focus:ring-[#2D6A6A]/20 transition-all outline-none"
                        required
                      />
                    </div>
                  )}

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Correo electrónico"
                      className="w-full pl-11 pr-4 py-3.5 bg-[#F4F7F7] border border-transparent rounded-xl text-[13px] text-[#1A3D3D] placeholder-gray-400 focus:bg-white focus:border-[#2D6A6A] focus:ring-2 focus:ring-[#2D6A6A]/20 transition-all outline-none"
                      required
                    />
                  </div>

                  {(view === 'login' || view === 'register') && (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        className="w-full pl-11 pr-12 py-3.5 bg-[#F4F7F7] border border-transparent rounded-xl text-[13px] text-[#1A3D3D] placeholder-gray-400 focus:bg-white focus:border-[#2D6A6A] focus:ring-2 focus:ring-[#2D6A6A]/20 transition-all outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#2D6A6A] transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  )}

                  {view === 'login' && (
                    <div className="flex justify-end pt-1">
                      <button 
                        type="button" 
                        onClick={() => setView('forgot_password')}
                        className="text-[11px] font-semibold text-[#2D6A6A] hover:text-[#1A3D3D] transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#2D6A6A] text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 tracking-[0.1em] text-[12px] uppercase shadow-lg shadow-[#2D6A6A]/30 hover:bg-[#1A3D3D] transition-all"
                  >
                    {view === 'login' && 'Ingresar a mi cuenta'}
                    {view === 'register' && 'Crear cuenta ahora'}
                    {view === 'forgot_password' && 'Enviar enlace'}
                    <ArrowRight size={16} />
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Toggle Inferior */}
          {(view === 'login' || view === 'register') && (
            <div className="mt-8 text-center shrink-0">
              <p className="text-[12px] text-gray-500 font-medium">
                {view === 'login' ? '¿Aún no eres parte de la red?' : '¿Ya tienes una cuenta?'}
              </p>
              <button
                onClick={() => {
                  setView(view === 'login' ? 'register' : 'login');
                  setAccountType(null);
                }}
                className="mt-2 text-[12px] font-bold uppercase tracking-widest text-[#1A3D3D] hover:text-[#2D6A6A] transition-colors"
              >
                {view === 'login' ? 'Solicitar Registro' : 'Iniciar Sesión'} 
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}


