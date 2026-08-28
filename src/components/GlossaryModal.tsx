import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../data/curriculumData';
import { X, Search, BookOpen, Layers, Sparkles } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(GLOSSARY_TERMS.map(g => g.category)))];

  const filtered = GLOSSARY_TERMS.filter(item => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.termEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definitionAi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.analogyElt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <BookOpen className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                Glosario Bilingüe de Términos (IA ⇄ Pedagogía de Idiomas)
              </h3>
              <p className="text-xs text-slate-300">
                Traducción epistemológica para docentes de inglés del INA
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término (ej. Token, LoRA, Attention, Temperatura)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-xl border border-slate-300 bg-white text-slate-700 cursor-pointer"
          >
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c === 'all' ? 'Todas las Categorías' : c}
              </option>
            ))}
          </select>
        </div>

        {/* List of Terms */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{item.term}</h4>
                  <span className="text-[11px] font-mono text-slate-400">({item.termEn})</span>
                </div>
                <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                  {item.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold text-slate-600 block text-[10px] uppercase">
                    Definición en IA / CS229:
                  </span>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">
                    {item.definitionAi}
                  </p>
                </div>

                <div className="bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                  <span className="font-bold text-blue-700 block text-[10px] uppercase">
                    Equivalente en Enseñanza de Inglés (ELT):
                  </span>
                  <p className="text-blue-950 font-medium mt-0.5 leading-relaxed">
                    {item.analogyElt}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs">
              No se encontraron términos coincidentes.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-semibold px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-colors cursor-pointer"
          >
            Cerrar Glosario
          </button>
        </div>
      </div>
    </div>
  );
};
