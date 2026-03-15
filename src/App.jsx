import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Update import paths to reflect the correct file locations
import LandingPage from './pages/landing-page';
import Perfil from './pages/perfil';
import Editor from './pages/editor';
import Ecosistema from './pages/repertorio';
import BolsaDeTrabajo from './pages/bolsa-de-trabajo';
import Novedades from './pages/novedades';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Contenido Principal */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/ecosistema" element={<Ecosistema />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/bolsa-de-trabajo" element={<BolsaDeTrabajo />} />
      </Routes>

    </div>
  );
}

export default App;
