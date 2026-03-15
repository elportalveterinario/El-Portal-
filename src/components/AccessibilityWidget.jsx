import React, { useEffect, useState } from 'react';
import {
  X, PersonStanding, ZoomIn, ZoomOut, Contrast, Palette, Type, RotateCcw
} from 'lucide-react';

const FONT_SIZES = ['normal', 'grande', 'muy-grande'];

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSizeIndex: 0, highContrast: false, grayscale: false, dyslexiaFont: false,
  });

  useEffect(() => {
    document.body.classList.remove('font-size-grande', 'font-size-muy-grande');
    const size = FONT_SIZES[settings.fontSizeIndex];
    if (size !== 'normal') document.body.classList.add(`font-size-${size}`);
  }, [settings.fontSizeIndex]);

  useEffect(() => {
    document.body.classList.toggle('dyslexia-font-active', settings.dyslexiaFont);
  }, [settings.dyslexiaFont]);

  const increaseFontSize = () => setSettings(s => ({ ...s, fontSizeIndex: Math.min(s.fontSizeIndex + 1, FONT_SIZES.length - 1) }));
  const decreaseFontSize = () => setSettings(s => ({ ...s, fontSizeIndex: Math.max(s.fontSizeIndex - 1, 0) }));
  const toggleContrast = () => setSettings(s => ({ ...s, highContrast: !s.highContrast }));
  const toggleGrayscale = () => setSettings(s => ({ ...s, grayscale: !s.grayscale }));
  const toggleDyslexiaFont = () => setSettings(s => ({ ...s, dyslexiaFont: !s.dyslexiaFont }));
  const resetSettings = () => setSettings({ fontSizeIndex: 0, highContrast: false, grayscale: false, dyslexiaFont: false });

  useEffect(() => {
    const styleId = 'accessibility-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        body.font-size-grande .text-xs, body.font-size-grande .text-sm { font-size: 16px !important; }
        body.font-size-grande .text-base { font-size: 18px !important; }
        body.font-size-grande .text-lg { font-size: 20px !important; }
        body.font-size-grande .text-xl { font-size: 24px !important; }
        body.font-size-grande .text-2xl { font-size: 28px !important; }
        body.font-size-grande .text-3xl { font-size: 36px !important; }
        body.font-size-muy-grande .text-xs, body.font-size-muy-grande .text-sm, body.font-size-muy-grande .text-base { font-size: 20px !important; }
        body.font-size-muy-grande .text-lg { font-size: 24px !important; }
        body.font-size-muy-grande .text-xl { font-size: 28px !important; }
        body.font-size-muy-grande .text-2xl { font-size: 32px !important; }
        body.font-size-muy-grande .text-3xl { font-size: 42px !important; }
        body.dyslexia-font-active, body.dyslexia-font-active * { font-family: 'OpenDyslexic', sans-serif !important; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const ToggleSwitch = ({ active }) => (
    <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${active ? 'bg-[#2D6A6A]' : 'bg-gray-300'}`}>
      <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${active ? 'left-6' : 'left-1'}`}></div>
    </div>
  );

  return (
    <div className="accessibility-widget-container">
      {(settings.grayscale || settings.highContrast) && (
        <div className="fixed inset-0 pointer-events-none z-[9998]" style={{ backdropFilter: `${settings.grayscale ? 'grayscale(100%)' : ''} ${settings.highContrast ? 'contrast(175%)' : ''}` }}></div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-5 left-5 z-[10000] w-14 h-14 bg-[#1A3D3D] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:bg-[#2D6A6A] hover:scale-110 active:scale-95">
        {isOpen ? <X /> : <PersonStanding />}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 left-5 z-[9999] w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 animate-in fade-in slide-in-from-bottom-5 duration-300 text-left">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Accesibilidad</p>
            <button onClick={resetSettings} className="text-[10px] font-bold text-[#2D6A6A] hover:underline flex items-center gap-1"><RotateCcw className="w-3 h-3" /> Restablecer</button>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-2">
                <div className="flex items-center gap-2 mb-2"><ZoomIn className="w-4 h-4 text-gray-600" /><span className="text-sm font-bold text-gray-700">Tamaño de texto</span></div>
                <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-1">
                    <button onClick={decreaseFontSize} disabled={settings.fontSizeIndex === 0} className="w-10 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"><ZoomOut className="w-4 h-4" /></button>
                    <span className="text-xs font-bold text-[#1A3D3D] uppercase tracking-wider">{FONT_SIZES[settings.fontSizeIndex].replace('-', ' ')}</span>
                    <button onClick={increaseFontSize} disabled={settings.fontSizeIndex === FONT_SIZES.length - 1} className="w-10 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"><ZoomIn className="w-4 h-4" /></button>
                </div>
            </div>
            <button onClick={toggleContrast} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-3"><div className={`p-2 rounded-lg ${settings.highContrast ? 'bg-[#1A3D3D] text-white' : 'bg-gray-100 text-gray-600'}`}><Contrast className="w-4 h-4" /></div><span className="text-sm font-medium text-gray-700">Alto contraste</span></div><ToggleSwitch active={settings.highContrast} />
            </button>
            <button onClick={toggleGrayscale} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-3"><div className={`p-2 rounded-lg ${settings.grayscale ? 'bg-[#1A3D3D] text-white' : 'bg-gray-100 text-gray-600'}`}><Palette className="w-4 h-4" /></div><span className="text-sm font-medium text-gray-700">Escala de grises</span></div><ToggleSwitch active={settings.grayscale} />
            </button>
            <button onClick={toggleDyslexiaFont} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-3"><div className={`p-2 rounded-lg ${settings.dyslexiaFont ? 'bg-[#1A3D3D] text-white' : 'bg-gray-100 text-gray-600'}`}><Type className="w-4 h-4" /></div><span className="text-sm font-medium text-gray-700">Fuente legible</span></div><ToggleSwitch active={settings.dyslexiaFont} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}