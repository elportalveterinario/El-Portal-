import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Update import paths to reflect the correct file locations
import LandingPage from './pages/landing-page';
import Perfil from './pages/perfiles/perfil-profesional'; // Corrected path
import Editor from './pages/editores/editor-profesional'; // Corrected path
import EditorClinica from './pages/editores/editor-clinica'; // Corrected path
import EditorProveedor from './pages/editores/editor-proveedores'; // Corrected path and component name
import Ecosistema from './pages/repertorio';
import BolsaDeTrabajo from './pages/bolsa-de-trabajo';
import Novedades from './pages/novedades';
import LegalPage from './pages/legales/privacidad';
import Inicio from './pages/inicio';
import PerfilProveedor from './pages/perfiles/perfil-proveedores'; // Corrected path
import PerfilClinica from './pages/perfiles/perfil-clinica';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Contenido Principal */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil-proveedor" element={<PerfilProveedor />} />
        <Route path="/perfil-clinica" element={<PerfilClinica />} />
        
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor-clinica" element={<EditorClinica />} />
        <Route path="/editor-proveedores" element={<EditorProveedor />} />
        
        <Route path="/ecosistema" element={<Ecosistema />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/bolsa-de-trabajo" element={<BolsaDeTrabajo />} />
        <Route path="/terminos-y-condiciones" element={<LegalPage />} />
        <Route path="/politica-de-privacidad" element={<LegalPage />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </div>
  );
}

export default App;
