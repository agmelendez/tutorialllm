import React from 'react';
import { NavTab } from '../types';
import { 
  BookOpen, 
  Scissors, 
  Dices, 
  Network, 
  GraduationCap, 
  BrainCircuit, 
  Sparkles, 
  Layers,
  Cpu,
  Smartphone,
  Unlock,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenGlossary: () => void;
  onOpenLicense?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenGlossary, onOpenLicense }) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Inicio', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'tokenization', label: '1. Tokens & Morfología', icon: <Scissors className="w-4 h-4" /> },
    { id: 'cloze', label: '2. Predicción & Cloze', icon: <Dices className="w-4 h-4" /> },
    { id: 'attention', label: '3. Mecanismo de Atención', icon: <Network className="w-4 h-4" /> },
    { id: 'transformer-arch', label: '4. Transformer & Pesos (W)', icon: <Cpu className="w-4 h-4" />, badge: 'Arquitectura' },
    { id: 'training', label: '5. Pretraining & SFT', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'reasoning', label: '6. Razonamiento & RLVR', icon: <BrainCircuit className="w-4 h-4" />, badge: 'DeepSeek / o1' },
    { id: 'small-models', label: '7. Modelos Pequeños & Móvil', icon: <Smartphone className="w-4 h-4" />, badge: 'Liquid AI' },
    { id: 'open-weights', label: '8. Pesos Abiertos vs Cerrados', icon: <Unlock className="w-4 h-4" />, badge: 'Soberanía' },
    { id: 'curriculum', label: 'Mapeo CS229 → ELT', icon: <Layers className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b-4 border-indigo-500 shadow-md">
      {/* Top Banner with Vibrant Palette Colors */}
      <div className="bg-indigo-950 text-white text-xs py-2 px-4 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-400 text-slate-950 font-black px-2.5 py-0.5 rounded-md text-[11px] uppercase tracking-wider shadow-xs">
              INA Costa Rica
            </span>
            <span className="text-indigo-200 font-semibold text-xs hidden sm:inline">
              Núcleo Sector Comercio y Servicios • Subsector de Idiomas
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-indigo-200 font-medium">
            <span className="hidden xl:inline text-indigo-300 text-[11px]">Stanford CS229 (Andrew Ng & Tengyu Ma)</span>
            
            {onOpenLicense && (
              <button
                onClick={onOpenLicense}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border border-indigo-800 cursor-pointer"
                title="Licencia Creative Commons Atribución 4.0 Internacional"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>CC BY 4.0</span>
              </button>
            )}

            <button
              onClick={onOpenGlossary}
              className="bg-indigo-700 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border border-indigo-500 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Glosario Bilingüe</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div 
            onClick={() => setActiveTab('overview')}
            className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md border-b-2 border-indigo-800 shrink-0 cursor-pointer transition-all"
          >
            IA
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 
                onClick={() => setActiveTab('overview')}
                className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight leading-none cursor-pointer hover:text-indigo-700 transition-colors"
              >
                GUÍA PEDAGÓGICA LLM
              </h1>
              <span className="hidden sm:inline-block px-3 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[11px] font-black uppercase tracking-wider border-2 border-amber-300">
                Especialidad de Idiomas
              </span>
            </div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-0.5">
              Instituto Nacional de Aprendizaje • Capacitación Docente: Herramientas Tecnológicas
            </p>
          </div>
        </div>

        {/* Quick Access to Key Modules */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setActiveTab('transformer-arch')}
            className="text-xs font-black text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border-2 border-indigo-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            Pesos Neuronales
          </button>
          <button
            onClick={() => setActiveTab('small-models')}
            className="text-xs font-black text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border-2 border-emerald-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            Modelos Móviles (Liquid AI)
          </button>
          <button
            onClick={() => setActiveTab('open-weights')}
            className="text-xs font-black text-amber-950 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border-2 border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Unlock className="w-3.5 h-3.5 text-amber-700" />
            Pesos Abiertos
          </button>
        </div>
      </div>

      {/* Scrollable Navigation Bar */}
      <div className="border-t-2 border-slate-100 bg-slate-50/90">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav className="flex space-x-1.5 overflow-x-auto py-2 no-scrollbar scroll-smooth">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white font-black shadow-md border-b-2 border-indigo-900'
                      : 'text-slate-700 hover:text-indigo-900 hover:bg-white font-bold border-2 border-transparent hover:border-indigo-200'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
