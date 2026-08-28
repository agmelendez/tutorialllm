import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Sliders,
  ArrowRight,
  Code
} from 'lucide-react';

export const PretrainingFineTuningSimulator: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'pretrain' | 'sft' | 'fewshot' | 'lora'>('sft');
  const [loraRank, setLoraRank] = useState<number>(8);

  const testPrompt = "Teacher prompt: Explain the difference between 'Since' and 'For' to a high school student in Costa Rica with 2 examples.";

  const stageData = {
    pretrain: {
      title: '1. Modelo Base Pre-entrenado (Base Model)',
      cs229Ref: 'CS229 Cap. 15 & 17.2 (Pág. 191, 206)',
      eltRef: 'Input Comprensible de Krashen (Extensive Reading / Inmersión)',
      description: 'El modelo absorbió miles de millones de páginas web. Solo sabe completar texto de forma probabilística, NO sabe dialogar ni seguir órdenes.',
      behaviorNote: 'Al recibir la consigna, continúa como si fuera un artículo de enciclopedia o un blog, sin responder directamente.',
      sampleOutput: `...to a high school student in Costa Rica with 2 examples. Chapter 4: Temporal Prepositions in Central American Dialects. Submitted by Prof. Rodriguez, San José (2019). Introduction: In educational linguistics, temporal prepositions represent a frequent challenge for L2 learners...`,
      isConversational: false,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    sft: {
      title: '2. Ajuste Fino Supervisado (SFT / Instruction Tuning)',
      cs229Ref: 'CS229 Cap. 17.8 (Pág. 218-220)',
      eltRef: 'Práctica Guiada (P-P-P) & Modelado Docente con Rúbrica',
      description: 'El modelo fue entrenado con pares de [Instrucción del Docente → Respuesta Ejemplar]. Aprende a actuar como tutor pedagógico servicial.',
      behaviorNote: 'Responde amablemente, estructura la explicación con viñetas y respeta el contexto pedagógico solicitado.',
      sampleOutput: `¡Hola! Con mucho gusto te explico la diferencia para tus estudiantes:

1. 'SINCE' (Desde): Se usa para un punto de inicio específico en el tiempo (fecha, hora, evento).
   • Ejemplo: "I have lived in Heredia since 2015."
   • Ejemplo: "She has been studying since 8:00 AM."

2. 'FOR' (Por / Durante): Se usa para medir la duración total o periodo de tiempo.
   • Ejemplo: "They have played soccer for two hours."
   • Ejemplo: "He has been an English teacher for 10 years."

Consejo para la clase: Recuerda a los chicos que "Since = Starting point" y "For = Total duration".`,
      isConversational: true,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    fewshot: {
      title: '3. Aprendizaje en Contexto (In-Context Few-Shot Prompting)',
      cs229Ref: 'CS229 Cap. 17.6 & 17.7 (Pág. 216-218)',
      eltRef: 'Enseñanza por Modelos (Exemplar-Based Scaffolding)',
      description: 'Sin reentrenar el modelo, se le dan 1 o 2 ejemplos dentro del mismo prompt para que imite el estilo o formato exacto deseado.',
      behaviorNote: 'El modelo reconoce el patrón de las demostraciones y genera la salida con el mismo formato estructurado.',
      sampleOutput: `Target Output (Generated in same JSON / Table format):
{
  "concept_1": { "word": "Since", "meaning": "Specific point in the past", "example": "I have studied at Liceo de Costa Rica since March." },
  "concept_2": { "word": "For", "meaning": "Duration of time span", "example": "We have practiced English for 45 minutes." }
}`,
      isConversational: true,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    lora: {
      title: '4. LoRA: Adaptación Modular de Bajo Rango',
      cs229Ref: 'CS229 Cap. 15.2 (Pág. 194-196)',
      eltRef: 'Inglés con Fines Específicos (ESP - English for Tourism / Customer Service)',
      description: 'Mantiene congelado el modelo general de inglés (W₀) y añade un micro-adaptador (B × A) entrenado con vocabulario especializado.',
      behaviorNote: 'Responde utilizando terminología turística o laboral costarricense sin olvidar la gramática general.',
      sampleOutput: `Adapted Response (Specialized for Tourism & Hospitality in Guanacaste):
• "Our eco-lodge has been welcoming international tourists SINCE 1998." (Specific founding date)
• "Visitors usually stay in Manuel Antonio FOR 3 days." (Length of stay)
• Note for Hospitality Students: Use 'Since' for check-in dates and 'For' for hotel reservation duration!`,
      isConversational: true,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
    }
  };

  const currentInfo = stageData[activeStage];

  // LoRA Parameter Calculation (CS229 Page 194)
  // Dense = d_in * d_out (e.g. 4096 * 4096 = 16,777,216 params per matrix)
  // LoRA = r * (d_in + d_out) = r * (4096 + 4096) = r * 8192
  const d_in = 4096;
  const d_out = 4096;
  const denseParams = d_in * d_out;
  const loraParams = loraRank * (d_in + d_out);
  const reductionFactor = (denseParams / loraParams).toFixed(0);

  return (
    <div className="space-y-8">
      {/* Header of Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
            <GraduationCap className="w-3.5 h-3.5" />
            CS229 Capítulos 15, 16 & 17.8 (Pág. 191-220)
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Pre-training vs SFT vs In-Context Learning vs LoRA
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pilar 4: Práctica, Inmersión y Especialización (Del Modelo Base al Asistente)
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed">
          Comprender cómo un LLM pasa de ser un simple autocompletador de texto a un tutor pedagógico 
          es idéntico a entender la diferencia entre la <strong>adquisición natural por inmersión masiva</strong> y el <strong>entrenamiento guiado con rúbricas de evaluación</strong>.
        </p>
      </div>

      {/* Stage Tabs Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(['pretrain', 'sft', 'fewshot', 'lora'] as const).map((stage) => {
          const info = stageData[stage];
          const isSelected = activeStage === stage;
          return (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider block ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                {stage === 'pretrain' ? 'Fase 1' : stage === 'sft' ? 'Fase 2' : stage === 'fewshot' ? 'Técnica 3' : 'Adaptador 4'}
              </span>
              <span className="text-xs sm:text-sm font-bold block mt-1 leading-snug">
                {info.title.split(':')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Stage Visualizer */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${currentInfo.badgeColor}`}>
              {currentInfo.title}
            </span>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {currentInfo.cs229Ref}
          </div>
        </div>

        {/* Comparison grid: AI vs ELT Pedagogy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              En Computación e IA:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentInfo.description}
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 space-y-1.5">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              En la Enseñanza del Inglés (ELT):
            </span>
            <p className="text-xs text-indigo-950 leading-relaxed font-medium">
              {currentInfo.eltRef}
            </p>
          </div>
        </div>

        {/* Simulated Prompt & Response Display */}
        <div className="space-y-3">
          <div className="bg-slate-100 p-3 rounded-xl text-xs font-mono text-slate-800 border border-slate-200">
            <span className="font-bold text-slate-600 block text-[10px] uppercase">Entrada / Prompt suministrado:</span>
            "{testPrompt}"
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">
                Respuesta generada por el modelo ({activeStage.toUpperCase()}):
              </span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                currentInfo.isConversational ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {currentInfo.isConversational ? 'Sigue Instrucciones Pedagógicas' : 'Completación Cruda No Alineada'}
              </span>
            </div>

            <div className={`p-4 rounded-xl border font-mono text-xs leading-relaxed whitespace-pre-wrap ${
              currentInfo.isConversational 
                ? 'bg-slate-900 text-emerald-300 border-slate-800' 
                : 'bg-amber-950/20 text-amber-900 border-amber-300'
            }`}>
              {currentInfo.sampleOutput}
            </div>
            <p className="text-[11px] text-slate-500 italic">
              {currentInfo.behaviorNote}
            </p>
          </div>
        </div>

        {/* Special Section if SFT: Visualizing Prompt Loss Masking */}
        {activeStage === 'sft' && (
          <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-950">
              <Code className="w-4 h-4 text-blue-600" />
              <span>¿Cómo aprende el SFT sin olvidar el inglés base? (Máscara de Pérdida - Loss Masking)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              En CS229 Capítulo 17.8 (Ec. 17.37), Andrew Ng explica que para no distorsionar el idioma, se utiliza una <strong>máscara de pérdida m_r^(i)</strong>:
            </p>
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-xl border border-blue-200 text-xs">
              <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded border border-slate-300">
                [Prompt: Explica Since vs For] → <strong className="text-red-600">m_r = 0 (Sin penalización)</strong>
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
              <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded border border-emerald-300">
                [Respuesta: 1. Since: I have lived...] → <strong className="text-emerald-700">m_r = 1 (Ajuste de pesos)</strong>
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              <em>Metáfora pedagógica:</em> El docente no califica la pregunta del examen que él mismo redactó, sino únicamente la respuesta elaborada por el estudiante.
            </p>
          </div>
        )}

        {/* Special Section if LoRA: Parameter Calculator */}
        {activeStage === 'lora' && (
          <div className="bg-purple-50/70 p-5 rounded-2xl border border-purple-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-purple-950">
                <Cpu className="w-4 h-4 text-purple-600" />
                <span>Calculadora de Eficiencia LoRA (CS229 Capítulo 15.2)</span>
              </div>
              <span className="text-xs font-mono text-purple-700 font-bold">
                Reducción: {reductionFactor}x menos memoria
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-3 rounded-xl border border-purple-200">
                <span className="text-slate-500 block text-[10px] uppercase">Rango LoRA (r):</span>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="range"
                    min={2}
                    max={64}
                    step={2}
                    value={loraRank}
                    onChange={(e) => setLoraRank(parseInt(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                  <span className="font-mono font-bold text-purple-900">{loraRank}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-purple-200">
                <span className="text-slate-500 block text-[10px] uppercase">Pesos Base Congelados (W₀):</span>
                <span className="font-mono font-bold text-slate-900 block mt-1">
                  {(denseParams / 1_000_000).toFixed(1)}M parámetros
                </span>
                <span className="text-[10px] text-slate-400">100% Inmóviles (Inglés General)</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-purple-200">
                <span className="text-slate-500 block text-[10px] uppercase">Adaptador Entrenable (B × A):</span>
                <span className="font-mono font-bold text-purple-700 block mt-1">
                  {(loraParams / 1000).toFixed(1)}k parámetros
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold">¡Ahorro masivo de cómputo!</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
