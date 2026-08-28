import React from 'react';
import { BrainCircuit, BookOpen, GraduationCap, ShieldCheck, Heart, ExternalLink, Award } from 'lucide-react';

interface FooterProps {
  onOpenLicense?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLicense }) => {
  return (
    <footer className="bg-slate-950 text-indigo-200 text-xs border-t-4 border-indigo-900 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Purpose & Mission */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-black text-sm">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
              <span>Plataforma Pedagógica de Lingüística & LLMs para Docentes de Inglés</span>
            </div>
            <p className="text-indigo-200 text-xs leading-relaxed max-w-md font-medium">
              Desarrollado para la <strong>Semana de Capacitación Docente del Instituto Nacional de Aprendizaje (INA)</strong>, dirigida a los 245 docentes del <strong>Subsector de Idiomas del Núcleo Comercio y Servicios</strong> en las 9 Unidades Regionales de Costa Rica. 
              Traduce los fundamentos técnicos de Inteligencia Artificial (Transformers, atención, redes neuronales y razonamiento) a metodologías cotidianas y comprensibles para la docencia técnica y profesional.
            </p>
          </div>

          {/* Col 2: Academic Sources */}
          <div className="space-y-2">
            <h4 className="text-amber-300 font-black text-xs uppercase tracking-widest">
              Fundamentos Pedagógicos & Técnicos
            </h4>
            <ul className="space-y-1.5 text-xs text-indigo-200 font-medium">
              <li>• Stanford CS229: Machine Learning (Andrew Ng & T. Ma)</li>
              <li>• Arquitectura Transformer (Vaswani et al.)</li>
              <li>• Hipótesis de Adquisición de L2 (Krashen)</li>
              <li>• Modelos de Razonamiento (DeepSeek-R1 / o1)</li>
              <li>• Marco Nacional de Cualificaciones & CEFR/MCER</li>
            </ul>
          </div>

          {/* Col 3: Institutional Context */}
          <div className="space-y-2">
            <h4 className="text-emerald-300 font-black text-xs uppercase tracking-widest">
              Marco Institucional INA
            </h4>
            <p className="text-xs text-indigo-200 leading-relaxed font-medium">
              Alineado con el <strong>Enfoque por Competencias Laborales y Acción Comunicativa</strong> del Núcleo Comercio y Servicios / Proceso Planeamiento y Evaluación.
            </p>
          </div>
        </div>

        {/* Creative Commons CC BY 4.0 Official License Section */}
        <div className="bg-slate-900/90 border-2 border-indigo-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* CC BY Official Vector Logos & Title */}
            <div className="flex items-center gap-3.5">
              <div className="flex items-center gap-1.5 bg-white text-slate-950 p-2 rounded-xl shrink-0 shadow-sm">
                {/* CC Icon */}
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor" aria-label="Creative Commons">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="8" />
                  <path d="M42 38c-2-2-5-3-8-3-7 0-12 6-12 15s5 15 12 15c3 0 6-1 8-3l5 5c-3 4-8 6-13 6-12 0-21-9-21-23s9-23 21-23c5 0 10 2 13 6l-4 5zm32 0c-2-2-5-3-8-3-7 0-12 6-12 15s5 15 12 15c3 0 6-1 8-3l5 5c-3 4-8 6-13 6-12 0-21-9-21-23s9-23 21-23c5 0 10 2 13 6l-4 5z" />
                </svg>
                {/* BY (Person) Icon */}
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor" aria-label="Attribution (BY)">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="8" />
                  <circle cx="50" cy="32" r="12" />
                  <path d="M26 80c0-14 10-24 24-24s24 10 24 24H26z" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">
                    Licencia Creative Commons Atribución 4.0 Internacional (CC BY 4.0)
                  </span>
                  <span className="hidden md:inline-block px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded text-[10px] font-black uppercase tracking-wider border border-amber-400/40">
                    Recurso Abierto
                  </span>
                </div>
                <p className="text-xs text-indigo-200 mt-0.5">
                  Creative Commons Attribution 4.0 International
                </p>
              </div>
            </div>

            {/* Quick Action Link / Button */}
            <div className="flex items-center gap-2.5 shrink-0">
              {onOpenLicense && (
                <button
                  onClick={onOpenLicense}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ver Términos & Citar</span>
                </button>
              )}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs px-3.5 py-2 rounded-xl border border-indigo-700/60 transition-all flex items-center gap-1.5"
              >
                <span>Deed Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Explicit Legal Terms description */}
          <div className="text-[11px] text-indigo-200/90 leading-relaxed border-t border-indigo-900/60 pt-3 space-y-1.5">
            <p>
              <strong>Resumen de Derechos:</strong> Esta licencia permite a cualquier persona compartir, copiar, distribuir, remezclar, adaptar y construir sobre este material en cualquier medio o formato, incluso para propósitos comerciales.
            </p>
            <p className="text-amber-200/90 font-medium">
              <strong>Condición (BY - Atribución):</strong> Debe otorgar el crédito correspondiente al autor y a la institución (Agustín Gómez Meléndez / UNED & Instituto Nacional de Aprendizaje - INA), proporcionar un enlace a la licencia e indicar si se realizaron cambios.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-indigo-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-indigo-300 font-medium">
          <div>
            © {new Date().getFullYear()} INA Costa Rica • Núcleo Sector Comercio y Servicios (Subsector Idiomas) & Agustín Gómez Meléndez (UNED).
          </div>
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <span>Diseñado con lenguaje claro y accesible para educadores de idiomas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
