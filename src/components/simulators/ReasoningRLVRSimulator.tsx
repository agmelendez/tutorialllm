import React, { useState } from 'react';
import { REASONING_EXAMPLES } from '../../data/simulatorsData';
import { 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  BookOpen, 
  ArrowRight, 
  GitBranch, 
  ShieldCheck, 
  Flame,
  Award,
  Zap
} from 'lucide-react';

export const ReasoningRLVRSimulator: React.FC = () => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(5); // show full by default
  const [isSimulatingGroup, setIsSimulatingGroup] = useState<boolean>(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState<number>(0);

  const currentExample = REASONING_EXAMPLES[selectedExampleIndex];

  // Simulated GRPO group completions (G=3 rollouts)
  const groupCompletions = [
    {
      id: 'trace-a',
      label: 'Ruta 1 (Razonamiento Completo & Verificado)',
      score: 1.0,
      reward: 'Premio +1.0 (Reward Máximo)',
      status: 'verified',
      summary: 'El modelo dudó, corrigió el condicional en el paso 2 y verificó la concordancia de tiempo pasado.',
      advantage: '+1.41 (Refuerzo Positivo en Política π_θ)',
    },
    {
      id: 'trace-b',
      label: 'Ruta 2 (Respuesta Rápida Sin Auto-reflexión)',
      score: 0.0,
      reward: 'Penalización 0.0 (Falla en el Verificador)',
      status: 'failed',
      summary: 'Respondió sin desglosar el "would have" y mantuvo el error en la cláusula condicional.',
      advantage: '-0.71 (Desincentivado por GRPO)',
    },
    {
      id: 'trace-c',
      label: 'Ruta 3 (Razonamiento Incompleto)',
      score: 0.2,
      reward: 'Score Parcial 0.2',
      status: 'partial',
      summary: 'Detectó el error pero no justificó la regla de pasado no realizado para la cláusula principal.',
      advantage: '-0.70 (Poco gradiente)',
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header of Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-100">
            <BrainCircuit className="w-3.5 h-3.5" />
            CS229 Capítulo 18 & 21 (Pág. 220-226, 258-266)
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Chain of Thought (CoT), RLVR & GRPO (DeepSeek-R1 / OpenAI o1)
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pilar 5: Razonamiento, Metacognición y Auto-Mejora (RLVR)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              ¿Qué es la Auto-Mejora y RLVR en los LLMs Modernos?
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              En lugar de solo memorizar textos, el modelo genera <strong>cadenas de pensamiento intermedias (CoT)</strong>. Mediante <strong>RLVR (Reinforcement Learning with Verifiable Rewards)</strong> y <strong>GRPO</strong>, el modelo genera múltiples borradores de pensamiento, comprueba cuál resuelve la consigna con un verificador objetivo y aprende a <em>autocorregirse ("Wait! Let me rethink...")</em> sin intervención humana directa.
            </p>
          </div>

          <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-200/80 space-y-2">
            <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Paralelo en la Enseñanza de Idiomas (ELT)
            </div>
            <p className="text-xs text-indigo-950 leading-relaxed">
              Es el equivalente a las <strong>Estrategias Metacognitivas y Protocolos de Pensamiento en Voz Alta (Think-Aloud Protocols)</strong>. En redacción de nivel B2/C1, el alumno exitoso no escribe la primera idea que se le ocurre: duda, revisa las reglas del 3er condicional, auto-corrige la concordancia y valida su texto con la rúbrica antes de entregarlo.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Trace Simulator */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Simulador del Proceso de Razonamiento y Auto-Corrección
            </h3>
            <p className="text-xs text-slate-500">
              Observe cómo el modelo razona en tiempo real, detecta sus propios errores y valida la regla gramatical
            </p>
          </div>

          <div className="flex items-center gap-2">
            {REASONING_EXAMPLES.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => {
                  setSelectedExampleIndex(idx);
                  setCurrentStepIndex(5);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  selectedExampleIndex === idx
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                Caso #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* The Prompt Under Test */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-purple-400 font-bold uppercase tracking-wider">
              Consigna Pedagógica (Teacher Prompt):
            </span>
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
              {currentExample.targetCategory}
            </span>
          </div>
          <p className="text-sm sm:text-base font-medium">
            "{currentExample.prompt}"
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs text-slate-300 border-t border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Criterio Verificable del Evaluador (Reward Verifier):</strong> {currentExample.verifierCriteria}</span>
          </div>
        </div>

        {/* Step Progress Controller */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-bold text-slate-700">
            Control de Pasos de Razonamiento (Inference-Time Compute):
          </span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((st) => (
              <button
                key={st}
                onClick={() => setCurrentStepIndex(st)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  currentStepIndex === st
                    ? 'bg-purple-600 text-white shadow-xs'
                    : currentStepIndex > st
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {st}
              </button>
            ))}
            <button
              onClick={() => setCurrentStepIndex(5)}
              className="text-xs font-semibold text-purple-700 hover:text-purple-900 ml-2 px-2 py-1 bg-purple-50 rounded border border-purple-200"
            >
              Ver Todo
            </button>
          </div>
        </div>

        {/* Reasoning Steps Stream */}
        <div className="space-y-3">
          {currentExample.traces.slice(0, currentStepIndex).map((step, idx) => {
            const isOutput = step.type === 'output';
            const isReflect = step.type === 'reflect';
            const isVerify = step.type === 'verify';

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  isOutput
                    ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/20'
                    : step.isSelfCorrection
                    ? 'bg-amber-50/80 border-amber-300'
                    : isVerify
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isOutput ? 'bg-emerald-600 text-white' :
                      step.isSelfCorrection ? 'bg-amber-500 text-white' :
                      isVerify ? 'bg-blue-600 text-white' : 'bg-slate-400 text-white'
                    }`}>
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {isOutput ? 'Respuesta Final Verificada' :
                       step.isSelfCorrection ? '¡Momento Aha! / Auto-Corrección (Self-Reflection)' :
                       isVerify ? 'Verificación con Clave Gramatical (RLVR Verifier)' : 'Análisis Inicial'}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    Paso #{step.stepNumber} de {currentExample.traces.length}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isOutput ? 'text-emerald-950 font-medium' :
                  step.isSelfCorrection ? 'text-amber-950 font-semibold' : 'text-slate-800'
                }`}>
                  {step.content}
                </p>

                <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-600">Nota Lingüística:</span>
                  <span>{step.subAnalysis}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verifier Badge */}
        {currentStepIndex >= 4 && (
          <div className="bg-emerald-900/10 border border-emerald-300 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-emerald-950 block">
                  Veredicto del Evaluador Verificable (Reward Verifier):
                </span>
                <span className="text-emerald-800">
                  Respuesta correcta conforme a las normas CEFR B1/B2 para programas del INA.
                </span>
              </div>
            </div>
            <div className="font-mono bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg">
              Reward R(x,y) = +1.0
            </div>
          </div>
        )}

        {/* How Group Relative Policy Optimization (GRPO) Works */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-purple-400" />
              <h4 className="text-sm font-bold text-white">
                Muestreo Grupal y Auto-mejora (Algoritmo GRPO de DeepSeek-R1)
              </h4>
            </div>
            <span className="text-[11px] text-purple-300 font-mono">
              CS229 Ec. 18.7 (Pág. 224)
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Durante el entrenamiento, el modelo genera 3 o más respuestas simultáneas para la misma consigna. 
            El algoritmo compara las puntuaciones del grupo y premia las rutas lógicas que alcanzaron la recompensa:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {groupCompletions.map((comp, idx) => (
              <div
                key={comp.id}
                onClick={() => setActiveGroupIndex(idx)}
                className={`p-3.5 rounded-xl border text-xs space-y-2 cursor-pointer transition-all ${
                  activeGroupIndex === idx
                    ? 'bg-purple-950/60 border-purple-400 ring-2 ring-purple-400/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-200">{comp.label.split('(')[0]}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    comp.status === 'verified' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {comp.status === 'verified' ? 'R=1.0' : 'R=0.0'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {comp.summary}
                </p>
                <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-purple-300">
                  Advantage: {comp.advantage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pedagogical ELT Teaching Box */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200 space-y-2">
          <div className="flex items-center gap-2 text-sm font-bold text-purple-950">
            <Award className="w-5 h-5 text-purple-600" />
            <span>Cómo aplicar "Chain-of-Thought" con tus estudiantes de inglés:</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            <strong>Estrategia "Show Your Thinking":</strong> Al asignar tareas de redacción o resolución de oraciones complejas (ej. Reported Speech, Conditionals, Passive Voice), pida a los estudiantes que añadan una columna de "Monólogo Interno" donde escriban qué regla aplicaron y qué error inicial descartaron. 
            Esta metacognición es exactamente el mismo principio que convirtió a los modelos como DeepSeek-R1 y OpenAI o1 en los más inteligentes del mundo.
          </p>
        </div>
      </div>
    </div>
  );
};
