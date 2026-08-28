import React from 'react';
import { NavTab } from '../types';
import { PEDAGOGICAL_PILLARS } from '../data/curriculumData';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpenCheck, 
  BrainCircuit, 
  GraduationCap, 
  CheckCircle2, 
  Lightbulb, 
  Compass,
  FileCheck
} from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: NavTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-10">
      {/* Main Educational Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border-4 border-indigo-500/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border-2 border-amber-300/40 px-3.5 py-1 rounded-full text-xs font-black text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Capacitación Docente INA 2026 • Núcleo Sector Comercio y Servicios (Subsector Idiomas)
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            ¿Cómo funcionan realmente los LLMs?
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-sky-300 to-emerald-300">
              Una Guía Pedagógica desde la Lingüística para Docentes de Idiomas
            </span>
          </h1>

          <p className="text-base sm:text-lg text-indigo-100 leading-relaxed max-w-3xl font-medium">
            Desmitificamos la Inteligencia Artificial Generativa traduciendo las matemáticas formales de los 
            <strong> Modelos de Lenguaje (LLMs y Transformers de Stanford CS229)</strong> a las metodologías 
            cotidianas de la enseñanza del inglés: <em>morfología, pruebas cloze, comprensión lectora, 
            adquisición de segundas lenguas y razonamiento metacognitivo</em>.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('tokenization')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-3.5 rounded-2xl shadow-xl border-b-4 border-indigo-900 transition-all flex items-center gap-2 cursor-pointer active:translate-y-0.5"
            >
              <span>Explorar los 5 Pilares Interactivos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className="bg-slate-900/90 hover:bg-slate-900 text-white font-bold px-5 py-3.5 rounded-2xl border-2 border-indigo-400/30 hover:border-indigo-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Ver Mapeo Stanford CS229 → ELT</span>
            </button>
          </div>

          {/* Key Metrics / Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t-2 border-indigo-800/80 text-xs font-bold text-indigo-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Simuladores de Pesos Neuronales</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Modelos Móviles (Liquid AI)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>DeepSeek-R1 & Auto-mejora (RLVR)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Pesos Abiertos & Privacidad INA</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Core Epistemological Translation Grid */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
              Los 5 Pilares de Traducción: De la IA al Aula de Inglés
            </h2>
            <p className="text-sm font-semibold text-slate-600">
              Cada concepto computacional tiene un reflejo directo en la pedagogía de idiomas
            </p>
          </div>
          <span className="px-3.5 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-black uppercase tracking-wider border-2 border-indigo-200">
            Mapeo Pedagógico Directo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PEDAGOGICAL_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id as NavTab)}
              className="group bg-white rounded-3xl p-6 border-2 border-slate-200 hover:border-indigo-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border-2 border-indigo-200">
                    Paso 0{idx + 1}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    {pillar.cs229Chapter.split('(')[0]}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mt-0.5">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* AI vs ELT contrast badge with Vibrant styling */}
                <div className="space-y-2.5 pt-1">
                  <div className="bg-slate-50 p-3 rounded-2xl border-2 border-slate-100 text-xs">
                    <span className="font-black text-indigo-600 block text-[10px] uppercase tracking-wider">Concepto Técnico (IA):</span>
                    <span className="text-slate-800 font-bold mt-0.5 block">{pillar.aiConcept}</span>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-200/80 text-xs">
                    <span className="font-black text-amber-700 block text-[10px] uppercase tracking-wider">Mapeo Pedagógico (ELT):</span>
                    <span className="text-amber-950 font-bold mt-0.5 block">{pillar.eltConcept}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                  {pillar.pedagogicalAnalogy}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-slate-100 flex items-center justify-between text-xs font-black text-indigo-600 group-hover:translate-x-1 transition-transform">
                <span>Abrir Simulador y Ejemplos</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}

          {/* Bonus Card: CS229 Syllabus */}
          <div
            onClick={() => setActiveTab('curriculum')}
            className="group bg-gradient-to-br from-indigo-600 to-indigo-900 text-white rounded-3xl p-6 border-b-4 border-indigo-950 hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-indigo-950 bg-amber-400 px-3 py-1 rounded-full uppercase tracking-wider">
                  Curriculum Completo
                </span>
                <span className="text-[11px] font-mono font-bold text-indigo-200">CS229 Stanford</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-snug">
                  Mapeo Integral de los 21 Capítulos
                </h3>
                <p className="text-xs font-bold text-amber-300 mt-1 uppercase tracking-wider">
                  Desde Regresión Lineal hasta RLVR & Transformers
                </p>
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed font-medium">
                Explore el programa completo de Machine Learning de Stanford traducido al contexto curricular 
                y laboral del Instituto Nacional de Aprendizaje (INA).
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-indigo-400/40 flex items-center justify-between text-xs font-black text-amber-300 group-hover:translate-x-1 transition-transform">
              <span>Explorar Matriz Curricular</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Scenario / Why this matters for INA */}
      <section className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg space-y-6">
        <div className="flex items-start gap-4">
          <div className="p-3.5 bg-amber-100 text-amber-800 rounded-2xl border-2 border-amber-300 shrink-0">
            <Lightbulb className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-indigo-950">
              ¿Por qué los docentes de idiomas son los mejores intérpretes de la IA?
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Históricamente, la IA fue presentada como "código y matemáticas". Sin embargo, los Grandes Modelos de Lenguaje (LLMs) son esencialmente <strong>sistemas lingüísticos probabilísticos</strong>. Nadie entiende mejor la descomposición de raíces (morfología), la predicción contextual (cloze tests), el rastreo de referentes (anáforas) y la auto-corrección metacognitiva que un <strong>docente de lenguas extranjeras</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 space-y-2">
            <div className="font-black text-indigo-950 text-sm flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-indigo-600" />
              1. Dominio Conceptual Sin Jerga
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Permite explicar a colegas y estudiantes técnicos qué hace ChatGPT/Gemini sin caer en mitos de "magia" ni en fórmulas inaccesibles.
            </p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 space-y-2">
            <div className="font-black text-indigo-950 text-sm flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-amber-600" />
              2. Alfabetización Crítica (AI Literacy)
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Los estudiantes aprenden a detectar alucinaciones, sesgos y limitaciones probabilísticas en sus tareas de comunicación técnica y comercial.
            </p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 space-y-2">
            <div className="font-black text-indigo-950 text-sm flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-600" />
              3. Creación de Materiales Reales
            </div>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Generación de actividades pedagógicas listas para descargar y aplicar en las 9 Unidades Regionales del INA.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
