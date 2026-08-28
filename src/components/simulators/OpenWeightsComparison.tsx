import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  FolderOpen, 
  Download, 
  Eye, 
  DollarSign, 
  Check, 
  X, 
  AlertTriangle, 
  Server, 
  Smartphone, 
  HelpCircle,
  Award,
  Database,
  Cpu,
  FileCode
} from 'lucide-react';
import { MODEL_CATEGORIES_DATA } from '../../data/simulatorsData';
import { ModelCategoryType } from '../../types';

export const OpenWeightsComparison: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ModelCategoryType>('open-weights');
  const [activeTabInspection, setActiveTabInspection] = useState<'matrix' | 'safetensors-inspector' | 'mep-strategy'>('matrix');

  const currentCategoryData = MODEL_CATEGORIES_DATA.find(c => c.category === selectedCategory) || MODEL_CATEGORIES_DATA[1];

  return (
    <div className="space-y-10">
      {/* Header Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            <Unlock className="w-3.5 h-3.5" />
            Soberanía Tecnológica & Gobernanza de IA
          </div>
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border-2 border-emerald-300 uppercase tracking-wider">
            LLM Abierto vs. Pesos Abiertos (Open Weights) vs. Cerrado
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
          Modelos Cerrados, Pesos Abiertos (Open Weights) y Código Abierto: ¿Cuál es la Diferencia Real?
        </h2>

        <p className="text-slate-700 text-sm leading-relaxed font-medium">
          En el debate público se suele llamar "Open Source" a cualquier modelo que se pueda descargar, pero en computación de IA existen distinciones fundamentales: <strong>¿Tenemos el archivo de los pesos matemáticos? ¿El código de entrenamiento? ¿Los datos originales? ¿Podemos ejecutarlo sin internet en el colegio?</strong>
        </p>

        {/* 3 Categories Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {MODEL_CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-3 shadow-xs ${
                  isSelected
                    ? 'bg-indigo-950 text-white border-indigo-700 shadow-lg scale-102'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-indigo-50/60 hover:border-indigo-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {cat.badge}
                    </span>
                    {cat.category === 'closed' && <Lock className="w-4 h-4 text-rose-400" />}
                    {cat.category === 'open-weights' && <Unlock className="w-4 h-4 text-amber-400" />}
                    {cat.category === 'fully-open' && <FolderOpen className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <h3 className="text-sm font-black mt-2 leading-tight">
                    {cat.title}
                  </h3>
                </div>
                <div className="text-[11px] font-medium opacity-80 line-clamp-2">
                  Ejemplos: {cat.examples.join(', ')}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 pb-3">
        <button
          onClick={() => setActiveTabInspection('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTabInspection === 'matrix'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          1. Cuadro Comparativo & Detalle Técnico
        </button>
        <button
          onClick={() => setActiveTabInspection('safetensors-inspector')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTabInspection === 'safetensors-inspector'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          2. Anatomía de un Archivo de Pesos (.safetensors / .gguf)
        </button>
        <button
          onClick={() => setActiveTabInspection('mep-strategy')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTabInspection === 'mep-strategy'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          3. Recomendaciones Estratégicas para el INA
        </button>
      </div>

      {/* VIEW 1: MATRIX & DETAILS */}
      {activeTabInspection === 'matrix' && (
        <div className="space-y-6">
          {/* Selected Category Deep Dive Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block">
                  Categoría Seleccionada
                </span>
                <h3 className="text-xl font-black text-indigo-950">
                  {currentCategoryData.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                  currentCategoryData.offlineCapable 
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-rose-100 text-rose-900 border-rose-300'
                }`}>
                  {currentCategoryData.offlineCapable ? '✓ Funciona 100% Offline (Sin Internet)' : '✗ Requiere Internet Permanente'}
                </span>
              </div>
            </div>

            {/* Grid of Key Properties */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-1.5">
                <div className="text-[11px] font-black uppercase text-indigo-950 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-indigo-600" />
                  Acceso a los Pesos
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  {currentCategoryData.weightsAccess}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-1.5">
                <div className="text-[11px] font-black uppercase text-indigo-950 flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                  Acceso al Código
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  {currentCategoryData.codeAccess}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-1.5">
                <div className="text-[11px] font-black uppercase text-indigo-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  Privacidad de Datos
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  {currentCategoryData.privacyLevel}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-1.5">
                <div className="text-[11px] font-black uppercase text-indigo-950 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-indigo-600" />
                  Estructura de Costos
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  {currentCategoryData.costStructure}
                </p>
              </div>
            </div>

            {/* Pros and Cons Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-emerald-50 p-5 rounded-2xl border-2 border-emerald-200 space-y-3">
                <div className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700" />
                  Ventajas Principales
                </div>
                <ul className="space-y-2">
                  {currentCategoryData.keyAdvantages.map((adv, idx) => (
                    <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2 font-medium">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-200 space-y-3">
                <div className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  Limitaciones & Desafíos
                </div>
                <ul className="space-y-2">
                  {currentCategoryData.keyLimitations.map((lim, idx) => (
                    <li key={idx} className="text-xs text-amber-950 flex items-start gap-2 font-medium">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Educational Fit Note */}
            <div className="p-4 bg-indigo-50 rounded-2xl border-2 border-indigo-200 text-xs text-indigo-950 space-y-1">
              <strong className="block font-black">Veredicto para la Enseñanza del Inglés en el INA:</strong>
              <p className="font-medium">{currentCategoryData.mepSuitability}</p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SAFETENSORS & GGUF INSPECTOR */}
      {activeTabInspection === 'safetensors-inspector' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-600" />
              ¿Qué hay dentro de un archivo de Pesos Abiertos (.safetensors o .gguf)?
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Cuando un docente descarga un modelo como <code>Llama-3.2-1B-Instruct.Q4_K_M.gguf</code> (750 MB) o <code>model.safetensors</code>, el archivo contiene exactamente las siguientes estructuras de tensores:
            </p>
          </div>

          <div className="bg-slate-950 rounded-2xl p-6 border-2 border-indigo-900 text-white font-mono text-xs space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-amber-400 font-bold">Encabezado del Archivo de Pesos (SafeTensors Metadata Header)</span>
              <span className="text-slate-400 text-[11px]">Formato Cero-Copia (Zero-Copy)</span>
            </div>

            <div className="space-y-2 text-indigo-200">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-300 font-bold">model.embed_tokens.weight:</span> [128256, 2048] (Float16) → 525 MB
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                  Matriz de vocabulario: asigna un vector a cada uno de los 128.256 tokens del inglés y otros idiomas.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-300 font-bold">layers.0.self_attn.q_proj.weight:</span> [2048, 2048] (Int4 / Q4_K_M) → 2.1 MB
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                  Pesos de la matriz Query de la Capa 1 de Atención (pregunta semántica).
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-300 font-bold">layers.0.mlp.gate_proj.weight:</span> [8192, 2048] (Int4) → 8.4 MB
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                  Pesos de la red neuronal de memoria léxica y reglas gramaticales asociadas.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                ... [Se repite a lo largo de las 16 a 80 capas del modelo] ...
              </div>

              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-300 font-bold">lm_head.weight:</span> [128256, 2048] (Float16) → 525 MB
                <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                  Capa de salida final que proyecta los logits para el Softmax de predicción de la siguiente palabra.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-xs text-indigo-950 space-y-1.5">
              <strong className="block font-black text-indigo-900">¿Por qué esto le da poder al docente?</strong>
              <p className="font-medium">
                Al tener el archivo de pesos localmente, nadie puede apagar su modelo, cambiar sus respuestas, cobrarle una mensualidad inesperada o borrar su material didáctico. El modelo es suyo para siempre en su computadora o teléfono móvil.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs text-amber-950 space-y-1.5">
              <strong className="block font-black text-amber-900">¿Qué es la Cuantización (Quantization)?</strong>
              <p className="font-medium">
                Es la técnica matemática que reduce la precisión de los números de 16 bits (Float16) a 4 bits (INT4). Esto <strong>comprime el peso del archivo en un 75%</strong> (de 4 GB a solo 1 GB) con una pérdida casi imperceptible de calidad lingüística, permitiendo correrlo en cualquier teléfono Android o laptop educativa.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: INA STRATEGY */}
      {activeTabInspection === 'mep-strategy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Estrategia Recomendada para el Instituto Nacional de Aprendizaje (INA)
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Guía de adopción institucional para el Núcleo Sector Comercio y Servicios (Subsector de Idiomas) en las 9 Unidades Regionales de Costa Rica.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
                <span>En Unidades Regionales y Zonas con Conectividad Limitada: Modelos de Pesos Abiertos Locales</span>
              </div>
              <p className="text-xs text-slate-700 font-medium pl-8">
                Instalar modelos SLMs (1B - 3B parámetros en formato GGUF o Liquid AI) directamente en las computadoras de los centros de formación o en los dispositivos de los estudiantes técnicos. Los alumnos pueden practicar conversación en inglés laboral, servicio al cliente bilingüe y redacción comercial sin depender de conexión a internet.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
                <span>Cumplimiento Estricto de la Protección y Privacidad de Datos Estudiantiles</span>
              </div>
              <p className="text-xs text-slate-700 font-medium pl-8">
                Al usar modelos de pesos abiertos ejecutados localmente en las instalaciones del INA, las evaluaciones, grabaciones de voz e información de los alumnos jamás viajan a centros de datos extranjeros, garantizando 100% de confidencialidad y soberanía tecnológica institucional.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
                <span>Adaptación Curricular Específica mediante Fine-Tuning (LoRA) con Estándares INA</span>
              </div>
              <p className="text-xs text-slate-700 font-medium pl-8">
                El equipo pedagógico del Subsector de Idiomas puede realizar un ajuste fino (Fine-Tuning con LoRA) a un modelo de pesos abiertos usando los programas técnicos de inglés para comercio y servicios, permitiendo una retroalimentación calibrada a las competencias laborales requeridas por la industria costarricense.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
