import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Share2, 
  BookOpen, 
  Sparkles,
  Award,
  FileText
} from 'lucide-react';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onClose }) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const citationAPA = `Gómez Meléndez, A., & Instituto Nacional de Aprendizaje [INA]. (${new Date().getFullYear()}). Guía Pedagógica y Lingüística de Modelos de Lenguaje (LLMs) para Docentes de Inglés: Herramientas Tecnológicas para la Docencia (Núcleo Sector Comercio y Servicios / Subsector de Idiomas). San José, Costa Rica. Licencia Creative Commons Atribución 4.0 Internacional (CC BY 4.0).`;

  const citationText = `Guía Pedagógica LLM para Docentes de Idiomas © ${new Date().getFullYear()} por Agustín Gómez Meléndez (UNED) & Instituto Nacional de Aprendizaje (INA). Licenciado bajo CC BY 4.0. Para ver una copia de esta licencia, visite https://creativecommons.org/licenses/by/4.0/`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-indigo-600/30 space-y-6 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with CC & BY Official Badges */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-900 rounded-2xl border-2 border-amber-300 shrink-0 flex items-center justify-center">
            {/* SVG Creative Commons Double-C */}
            <svg className="w-9 h-9" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="8" />
              <path d="M42 38c-2-2-5-3-8-3-7 0-12 6-12 15s5 15 12 15c3 0 6-1 8-3l5 5c-3 4-8 6-13 6-12 0-21-9-21-23s9-23 21-23c5 0 10 2 13 6l-4 5zm32 0c-2-2-5-3-8-3-7 0-12 6-12 15s5 15 12 15c3 0 6-1 8-3l5 5c-3 4-8 6-13 6-12 0-21-9-21-23s9-23 21-23c5 0 10 2 13 6l-4 5z" />
            </svg>
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-indigo-100 text-indigo-900 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-300">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Licencia Oficial Abierta
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-indigo-950 mt-1 tracking-tight">
              Creative Commons Atribución 4.0 Internacional (CC BY 4.0)
            </h2>
            <p className="text-xs text-slate-600 font-bold mt-0.5">
              Creative Commons Attribution 4.0 International
            </p>
          </div>
        </div>

        {/* License Badges & Summary */}
        <div className="bg-gradient-to-br from-indigo-50 to-amber-50/50 p-5 rounded-2xl border-2 border-indigo-200/80 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Visual CC Badges */}
            <div className="flex items-center gap-1 bg-slate-900 text-white px-3 py-1.5 rounded-xl font-mono text-xs font-black">
              <span className="text-amber-400">CC</span>
              <span className="text-slate-400">|</span>
              <span className="text-sky-300">BY</span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-300">4.0</span>
            </div>
            <span className="text-xs font-extrabold text-indigo-950">
              Usted es libre de compartir, adaptar y crear obras derivadas
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            Esta licencia permite a docentes, investigadores, instituciones y desarrolladores <strong>distribuir, remezclar, adaptar y construir a partir de este material</strong> en cualquier medio o formato, incluso para fines educativos o comerciales.
          </p>
        </div>

        {/* The 2 Core Rules Explained Simply */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-900 uppercase tracking-wider">
              <Share2 className="w-4 h-4 text-emerald-700" />
              Libertad de Uso
            </div>
            <ul className="text-xs text-emerald-950 space-y-1 font-medium">
              <li>• <strong>Compartir:</strong> Copiar y redistribuir el material en cualquier formato o soporte.</li>
              <li>• <strong>Adaptar:</strong> Remezclar, transformar y crear a partir de los simuladores y guías para sus clases.</li>
            </ul>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-700" />
              Condición: Atribución (BY)
            </div>
            <ul className="text-xs text-amber-950 space-y-1 font-medium">
              <li>• <strong>Reconocer Autoría:</strong> Debe dar el crédito adecuado al creador (Agustín Gómez Meléndez / UNED & INA Costa Rica).</li>
              <li>• <strong>Enlace y Cambios:</strong> Proporcionar un enlace a la licencia e indicar si se realizaron cambios.</li>
            </ul>
          </div>
        </div>

        {/* Copyable Citation Helper for Teachers */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-600" />
              ¿Cómo citar este recurso en sus trabajos o clases?
            </label>
          </div>

          {/* APA Format */}
          <div className="bg-slate-900 text-slate-100 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center text-[11px] text-amber-300 font-bold">
              <span>Formato de Cita Académica (APA 7ma Edición):</span>
              <button
                onClick={() => copyToClipboard(citationAPA, 'apa')}
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold"
              >
                {copiedFormat === 'apa' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-300" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copiar Cita</span>
                  </>
                )}
              </button>
            </div>
            <p className="font-mono text-[11px] text-slate-200 leading-relaxed">
              {citationAPA}
            </p>
          </div>
        </div>

        {/* Link to Official Deed */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-slate-100 text-xs">
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-black hover:underline"
          >
            <span>Ver el Resumen Legal Oficial (License Deed CC BY 4.0)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-black px-6 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
