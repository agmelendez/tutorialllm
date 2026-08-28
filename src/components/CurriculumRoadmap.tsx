import React, { useState } from 'react';
import { CS229_FULL_MAPPINGS, INA_TEACHING_GUIDELINES } from '../data/curriculumData';
import { 
  Layers, 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle, 
  FileText, 
  ExternalLink,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export const CurriculumRoadmap: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState<string>('all');

  const parts = [
    'all',
    'Parte I: Aprendizaje Supervisado',
    'Parte II: Deep Learning',
    'Parte III: Generalización y Regularización',
    'Parte V: Modelos de Fundación y LLMs',
    'Parte VI: Aprendizaje por Refuerzo'
  ];

  const filteredChapters = CS229_FULL_MAPPINGS.filter(chap => {
    const matchesPart = selectedPart === 'all' || chap.part === selectedPart;
    const matchesSearch = 
      chap.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chap.cs229Summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chap.eltPedagogyParallel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chap.teachingApplication.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPart && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
            <Layers className="w-3.5 h-3.5" />
            Stanford CS229 (Andrew Ng & Tengyu Ma) → INA Costa Rica
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Matriz de Equivalencia Curricular & Formación Docente
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mapeo Integral de Capítulos CS229 a Metodologías de Enseñanza del Inglés (ELT)
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Esta matriz pedagógica relaciona formalmente los principios matemáticos de cada capítulo de los 
          <strong> CS229 Lecture Notes</strong> con su análogo directo en lingüística aplicada, evaluación de segundas lenguas y el 
          <strong> Enfoque Orientado a la Acción y por Competencias</strong> del INA (Núcleo Sector Comercio y Servicios / Subsector de Idiomas).
        </p>

        {/* INA Institutional Guidelines Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-blue-950">
            <GraduationCap className="w-4 h-4 text-blue-700" />
            <span>{INA_TEACHING_GUIDELINES.institution} — {INA_TEACHING_GUIDELINES.department}</span>
          </div>
          <p className="text-[11px] text-blue-900 font-semibold">
            {INA_TEACHING_GUIDELINES.event} • Dirigido a {INA_TEACHING_GUIDELINES.beneficiaries}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 pt-1">
            {INA_TEACHING_GUIDELINES.principles.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por concepto de IA (Softmax, LoRA, Transformers) o de ELT (Cloze, Morfología, Rúbricas)..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
            className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-700 cursor-pointer"
          >
            {parts.map((p, idx) => (
              <option key={idx} value={p}>
                {p === 'all' ? 'Todas las Secciones del PDF' : p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chapters Cards Grid */}
      <div className="space-y-6">
        {filteredChapters.map((chap) => (
          <div
            key={chap.chapterNumber}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold font-mono text-sm flex items-center justify-center shadow-xs">
                  {chap.chapterNumber}
                </span>
                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    {chap.part}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {chap.chapterTitle}
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Technical side */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Fundamento Técnico (Stanford CS229):
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {chap.cs229Summary}
                </p>
                {chap.keyFormulasAndConcepts.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/60 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block">Fórmulas Clave:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {chap.keyFormulasAndConcepts.map((form, fIdx) => (
                        <code key={fIdx} className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-mono text-[10px]">
                          {form}
                        </code>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pedagogical ELT side */}
              <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200/80 space-y-2">
                <span className="font-bold text-indigo-900 uppercase tracking-wider text-[10px] block">
                  Equivalencia Pedagógica en la Enseñanza del Inglés:
                </span>
                <p className="text-indigo-950 font-medium leading-relaxed">
                  {chap.eltPedagogyParallel}
                </p>
                <div className="pt-2 border-t border-indigo-200/60 text-indigo-900">
                  <span className="text-[10px] font-bold uppercase text-indigo-700 block">
                    Propuesta Didáctica para el Aula INA:
                  </span>
                  <p className="mt-0.5 text-indigo-950">
                    {chap.teachingApplication}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
