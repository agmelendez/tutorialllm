import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Sparkles, 
  Activity, 
  BookOpen, 
  Sliders, 
  RefreshCw, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  HelpCircle,
  Database,
  GitBranch,
  Network,
  Lightbulb
} from 'lucide-react';
import { TRANSFORMER_PIPELINE_STAGES, NEURAL_WEIGHT_PRESETS } from '../../data/simulatorsData';

export const TransformerNeuralVisualizer: React.FC = () => {
  // Transformer Pipeline State
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  
  // Neural Weights Simulator State
  const [selectedPresetId, setSelectedPresetId] = useState<string>(NEURAL_WEIGHT_PRESETS[0].id);
  const currentPreset = NEURAL_WEIGHT_PRESETS.find(p => p.id === selectedPresetId) || NEURAL_WEIGHT_PRESETS[0];
  
  // Dynamic weights and inputs state
  const [featureWeights, setFeatureWeights] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    currentPreset.features.forEach(f => {
      initial[f.id] = f.weight;
    });
    return initial;
  });

  const [featureInputs, setFeatureInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    currentPreset.features.forEach(f => {
      initial[f.id] = f.inputValue;
    });
    return initial;
  });

  const [bias, setBias] = useState<number>(currentPreset.bias);
  const [learningStepCount, setLearningStepCount] = useState<number>(0);
  const [isTrainingAnim, setIsTrainingAnim] = useState<boolean>(false);

  const handlePresetChange = (presetId: string) => {
    const preset = NEURAL_WEIGHT_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedPresetId(presetId);
      const newWeights: Record<string, number> = {};
      const newInputs: Record<string, number> = {};
      preset.features.forEach(f => {
        newWeights[f.id] = f.weight;
        newInputs[f.id] = f.inputValue;
      });
      setFeatureWeights(newWeights);
      setFeatureInputs(newInputs);
      setBias(preset.bias);
      setLearningStepCount(0);
    }
  };

  const handleWeightChange = (featureId: string, val: number) => {
    setFeatureWeights(prev => ({ ...prev, [featureId]: val }));
  };

  const handleInputChange = (featureId: string, val: number) => {
    setFeatureInputs(prev => ({ ...prev, [featureId]: val }));
  };

  // Math: z = sum(w_i * x_i) + b
  const linearSum = currentPreset.features.reduce((acc, feat) => {
    const w = featureWeights[feat.id] ?? feat.weight;
    const x = featureInputs[feat.id] ?? feat.inputValue;
    return acc + (w * x);
  }, 0) + bias;

  // Sigmoid activation: 1 / (1 + e^-z)
  const sigmoidActivation = 1 / (1 + Math.exp(-Math.max(Math.min(linearSum, 15), -15)));
  const isActivated = sigmoidActivation >= 0.5;

  // Simulate Backpropagation / Gradient Descent optimization
  const runGradientDescentStep = () => {
    setIsTrainingAnim(true);
    setTimeout(() => {
      // Adjust weights towards target high-confidence activation
      setFeatureWeights(prev => {
        const nextWeights = { ...prev };
        currentPreset.features.forEach(f => {
          const current = nextWeights[f.id] ?? f.weight;
          // Gradient step toward theoretical optimal sign
          const delta = (f.weight - current) * 0.4 + (f.weight > 0 ? 0.3 : -0.3);
          nextWeights[f.id] = parseFloat((current + delta).toFixed(2));
        });
        return nextWeights;
      });
      setLearningStepCount(c => c + 1);
      setIsTrainingAnim(false);
    }, 400);
  };

  const activeStage = TRANSFORMER_PIPELINE_STAGES[activeStageIndex];

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            <Cpu className="w-3.5 h-3.5" />
            CS229 Capítulos 7 & 17.3 (Pág. 102-115, 207-215)
          </div>
          <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full border-2 border-amber-300 uppercase tracking-wider">
            Arquitectura Transformer & El Rol de los Pesos
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
          Diseño del Transformer, Redes Neuronales & La Importancia de los Pesos (W)
        </h2>

        {/* Non-Technical Friendly Overview Callout */}
        <div className="bg-amber-50/90 p-4 sm:p-5 rounded-2xl border-2 border-amber-300 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
            <strong className="font-black text-amber-900 block text-sm">
              💡 Explicación sin tecnicismos para el docente:
            </strong>
            <p>
              Un Modelo de Lenguaje (LLM) no "piensa" como un ser humano, sino que funciona como una <strong>red de interruptores de volumen</strong> (llamados <em>pesos</em>). Cuando el modelo lee una oración en inglés, evalúa pistas como los sujetos, los verbos y el contexto. Cada pista suma o resta puntos según la fuerza de sus interruptores para decidir cuál es la siguiente palabra o corrección gramatical adecuada.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 space-y-2">
            <div className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              ¿Qué es la Arquitectura Transformer?
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Es el diseño estructural de la IA (creado en 2017). Funciona como una <strong>fábrica de procesamiento en 6 estaciones</strong>: recibe las palabras descompuestas, analiza cómo se relacionan entre sí a lo largo de toda la oración (atención), y genera una comprensión enriquecida del mensaje.
            </p>
          </div>

          <div className="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200 space-y-2">
            <div className="text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-700" />
              ¿Qué son los "Pesos" (Weights) en el Cerebro y en la IA?
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              Los pesos son números que miden la <strong>fuerza de conexión entre dos conceptos</strong>. En la mente de un estudiante de inglés, equivalen a las <em>conexiones neuronales</em> que asocian automáticamente una palabra con su regla (por ejemplo, asociar "She" con el verbo terminado en "-s", "She works").
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE TRANSFORMER PIPELINE EXPLORER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-600" />
            1. Diagrama Interactivo del Pipeline Transformer Paso a Paso
          </h3>
          <p className="text-xs font-semibold text-slate-600 mt-1">
            Haga clic en cualquiera de las 6 etapas para ver cómo viaja una frase en inglés desde que entra al modelo hasta que se genera la respuesta.
          </p>
        </div>

        {/* Pipeline Step Selector Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {TRANSFORMER_PIPELINE_STAGES.map((stage, idx) => {
            const isSelected = activeStageIndex === idx;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-1 shadow-xs ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-800 shadow-md scale-102'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>
                    Etapa {stage.stepNumber}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
                </div>
                <span className="text-xs font-bold leading-tight mt-1 line-clamp-2">
                  {stage.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Deep-Dive Card */}
        <div className="p-6 sm:p-8 bg-slate-950 rounded-3xl text-white space-y-6 border-4 border-indigo-900 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-900 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                {activeStage.stepNumber}
              </span>
              <div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {activeStage.name}
                </h4>
                <span className="text-xs text-indigo-300 font-mono">
                  Dimensión de la Información: Entrada {activeStage.inputShape} → Salida {activeStage.outputShape}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold bg-indigo-900/80 text-amber-300 px-3 py-1 rounded-xl border border-indigo-700">
              {activeStage.keyParameters}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Math & Technical Action */}
            <div className="space-y-4">
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-indigo-800 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 block">
                  Fórmula Matemática del Paso (Stanford CS229)
                </span>
                <pre className="font-mono text-xs text-indigo-200 bg-slate-950 p-3 rounded-xl overflow-x-auto whitespace-pre-wrap border border-slate-800">
                  {activeStage.mathFormula}
                </pre>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                  ¿Qué ocurre internamente en la máquina?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {activeStage.technicalRole}
                </p>
              </div>

              <div className="p-3.5 bg-indigo-950/60 rounded-xl border border-indigo-700/60 text-xs text-indigo-200 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{activeStage.interactiveNote}</span>
              </div>
            </div>

            {/* Right: ELT Pedagogical Translation */}
            <div className="bg-indigo-900/40 p-5 rounded-2xl border-2 border-indigo-700/60 space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Equivalente en la Clase de Inglés (Pedagogía ELT)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium bg-indigo-950/80 p-4 rounded-xl border border-indigo-800">
                  {activeStage.eltPedagogyParallel}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-indigo-800/80">
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev > 0 ? prev - 1 : TRANSFORMER_PIPELINE_STAGES.length - 1))}
                  className="text-xs font-bold text-indigo-200 hover:text-white px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-800 transition-all cursor-pointer"
                >
                  ← Etapa Anterior
                </button>
                <span className="text-xs font-mono text-indigo-300">
                  {activeStageIndex + 1} de {TRANSFORMER_PIPELINE_STAGES.length}
                </span>
                <button
                  onClick={() => setActiveStageIndex((prev) => (prev < TRANSFORMER_PIPELINE_STAGES.length - 1 ? prev + 1 : 0))}
                  className="text-xs font-bold text-slate-950 px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 transition-all font-black flex items-center gap-1 cursor-pointer"
                >
                  Siguiente Etapa →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE NEURAL WEIGHT ADJUSTER & SIMULATOR */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              2. Simulador Interactivo de Pesos Neuronales (W) y Nivel de Confianza
            </h3>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              Mueva las perillas de peso para ver cómo la neurona decide si una frase es correcta o qué respuesta dar.
            </p>
          </div>

          {/* Preset Selector Buttons */}
          <div className="flex flex-wrap gap-2">
            {NEURAL_WEIGHT_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePresetChange(p.id)}
                className={`text-xs px-3.5 py-2 rounded-xl border-2 font-bold transition-all cursor-pointer shadow-xs ${
                  selectedPresetId === p.id
                    ? 'bg-indigo-600 text-white border-indigo-700 font-black'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Info Banner */}
        <div className="bg-indigo-50 p-5 rounded-2xl border-2 border-indigo-200 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-black text-indigo-950 uppercase tracking-wide">
              {currentPreset.name}
            </span>
            <span className="text-[11px] font-black bg-indigo-200/80 text-indigo-900 px-2.5 py-0.5 rounded-full">
              Tema del Currículo INA: {currentPreset.eltCurriculumConcept}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {currentPreset.explanation}
          </p>
        </div>

        {/* Live Neuron Calculation Canvas & Sliders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sliders Area (Inputs x_i and Weights w_i) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-indigo-950 tracking-wider">
                Pistas presentes en la oración (Entrada) y su Importancia (Peso)
              </span>
              <button
                onClick={runGradientDescentStep}
                disabled={isTrainingAnim}
                className="text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl shadow-md border-b-2 border-emerald-900 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTrainingAnim ? 'animate-spin' : ''}`} />
                {isTrainingAnim ? 'Ajustando pesos...' : 'Aprender del Error (Ajustar Pesos)'}
              </button>
            </div>

            <div className="space-y-3.5">
              {currentPreset.features.map((feat) => {
                const currentWeight = featureWeights[feat.id] ?? feat.weight;
                const currentInput = featureInputs[feat.id] ?? feat.inputValue;
                const contribution = currentWeight * currentInput;

                return (
                  <div 
                    key={feat.id}
                    className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-black text-slate-900 block">
                          {feat.label}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {feat.description}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`text-xs font-mono font-black px-2 py-0.5 rounded ${
                          contribution > 0 ? 'bg-emerald-100 text-emerald-800' : contribution < 0 ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          Aporte a la decisión: {contribution > 0 ? `+${contribution.toFixed(2)}` : contribution.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Input toggle / slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>¿Está esta pista en la frase?</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleInputChange(feat.id, 0)}
                            className={`flex-1 text-[11px] py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                              currentInput === 0 ? 'bg-slate-800 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300'
                            }`}
                          >
                            No (Ausente)
                          </button>
                          <button
                            onClick={() => handleInputChange(feat.id, 1)}
                            className={`flex-1 text-[11px] py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                              currentInput === 1 ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-700 border-slate-300'
                            }`}
                          >
                            Sí (Presente)
                          </button>
                        </div>
                      </div>

                      {/* Weight Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600">
                          <span>Fuerza / Peso del criterio:</span>
                          <span className="font-mono text-indigo-700 font-black">{currentWeight.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="-5"
                          max="5"
                          step="0.1"
                          value={currentWeight}
                          onChange={(e) => handleWeightChange(feat.id, parseFloat(e.target.value))}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="flex justify-between text-[9px] text-slate-500 font-semibold">
                          <span>-5.0 (Resta / Penaliza)</span>
                          <span>0.0 (Neutro)</span>
                          <span>+5.0 (Suma / Recompensa)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bias Slider */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-black text-amber-950">
                  <span>Umbral de Exigencia Inicial de la Red (Sesgo / Bias $b$)</span>
                  <span className="font-mono bg-amber-200 px-2 py-0.5 rounded text-amber-900 font-bold">{bias.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(parseFloat(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <span className="text-[11px] text-amber-900 font-medium block">
                  Representa qué tan estricta o escéptica es la neurona antes de validar la respuesta. Si es muy negativo, exige más evidencias positivas acumuladas.
                </span>
              </div>
            </div>
          </div>

          {/* Calculation & Activation Output Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-slate-950 p-6 rounded-3xl border-4 border-indigo-900 text-white space-y-5 shadow-2xl flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 block mb-2">
                  Balance Total y Nivel de Confianza
                </span>
                
                {/* Math Sum Expression */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 font-bold">
                    Balance Acumulado de Puntos (Suma Ponderada):
                  </div>
                  <div className="font-mono text-lg font-black text-amber-300">
                    Puntos totales = {linearSum.toFixed(3)}
                  </div>
                </div>

                {/* Sigmoid Activation Display */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                    <span>Probabilidad de Aceptación (Confianza de la Red):</span>
                    <span className="font-mono font-black text-sm text-emerald-400">
                      {(sigmoidActivation * 100).toFixed(1)}%
                    </span>
                  </div>

                  {/* Activation Progress Bar */}
                  <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isActivated ? 'bg-emerald-400 shadow-md' : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.max(Math.min(sigmoidActivation * 100, 100), 2)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                    <span>0% (Rechazada)</span>
                    <span className="text-amber-300 font-bold">Umbral de Aprobación (50%)</span>
                    <span>100% (Aceptada con certeza)</span>
                  </div>
                </div>
              </div>

              {/* Verdict Box */}
              <div className={`p-4 rounded-2xl border-2 text-center transition-all ${
                isActivated 
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' 
                  : 'bg-rose-950/80 border-rose-600 text-rose-200'
              }`}>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Diagnóstico de la Neurona Lingüística:
                </span>
                <div className="text-base font-black mt-1">
                  {isActivated ? `✓ ${currentPreset.targetCategory}` : `✗ Condición NO Cumplida`}
                </div>
                <span className="text-[11px] opacity-90 mt-1 block">
                  {isActivated 
                    ? 'Las pistas positivas superaron el umbral: el modelo valida la regla gramatical o registro lingüístico.'
                    : 'Las pistas fueron insuficientes o fueron anuladas por elementos penalizadores.'}
                </span>
              </div>

              {learningStepCount > 0 && (
                <div className="text-center text-xs text-amber-300 font-mono">
                  Ciclos de corrección aplicados: {learningStepCount}
                </div>
              )}
            </div>

            {/* Pedagogical Takeaway */}
            <div className="p-4 bg-slate-100 rounded-2xl border-2 border-slate-200 text-xs text-slate-700 space-y-1 font-medium">
              <strong className="text-indigo-950 block">Conclusión para la Práctica Docente:</strong>
              <p>
                Un modelo moderno tiene miles de millones de estos pesos. Cuando entrenamos a un estudiante o ajustamos una IA, el objetivo es el mismo: <strong>calibrar la intuición</strong> para que reconozca qué combinaciones de palabras suenan naturales y gramaticalmente correctas en inglés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
