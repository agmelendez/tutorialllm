import React, { useState, useMemo } from 'react';
import { CLOZE_STEPS } from '../../data/simulatorsData';
import { 
  Dices, 
  Sparkles, 
  Sliders, 
  HelpCircle, 
  CheckCircle, 
  ArrowRight, 
  RefreshCw,
  BookOpen,
  BarChart3,
  Gauge
} from 'lucide-react';

export const ClozePredictorSimulator: React.FC = () => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(1.0);
  const [topP, setTopP] = useState<number>(1.0);
  const [topK, setTopK] = useState<number>(6);
  const [userGuess, setUserGuess] = useState<string | null>(null);
  const [hasRevealed, setHasRevealed] = useState<boolean>(true);

  const currentStep = CLOZE_STEPS[selectedExampleIndex];

  // Calculate Softmax distribution with Temperature based on CS229 Section 17.2 Eq 17.8
  const calculatedDistribution = useMemo(() => {
    const rawCandidates = currentStep.candidates;
    
    // Scale logits by temperature: t_i / tau
    const scaledLogits = rawCandidates.map(c => c.logit / Math.max(temperature, 0.05));
    const maxScaled = Math.max(...scaledLogits);
    
    // Stable exponentiation: exp(scaled - max)
    const exps = scaledLogits.map(s => Math.exp(s - maxScaled));
    const sumExps = exps.reduce((acc, v) => acc + v, 0);
    
    // Raw softmax probabilities
    let probs = rawCandidates.map((c, idx) => ({
      ...c,
      probability: exps[idx] / sumExps,
    }));

    // Sort descending by probability
    probs.sort((a, b) => b.probability - a.probability);

    // Apply Top-K filtering
    if (topK < probs.length) {
      probs = probs.slice(0, topK);
    }

    // Apply Top-P (nucleus) filtering
    let cumulative = 0;
    const filteredByP = [];
    for (const item of probs) {
      filteredByP.push(item);
      cumulative += item.probability;
      if (cumulative >= topP) break;
    }
    probs = filteredByP;

    // Renormalize after Top-K / Top-P
    const currentSum = probs.reduce((acc, i) => acc + i.probability, 0);
    return probs.map(p => ({
      ...p,
      normalizedProb: p.probability / (currentSum || 1),
    }));
  }, [currentStep, temperature, topP, topK]);

  const handleSelectExample = (idx: number) => {
    setSelectedExampleIndex(idx);
    setUserGuess(null);
  };

  return (
    <div className="space-y-8">
      {/* Header of Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            <Dices className="w-3.5 h-3.5" />
            CS229 Capítulo 17.2 & 7.1 (Pág. 203-207)
          </div>
          <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full border-2 border-amber-300 uppercase tracking-wider">
            Next-Token Prediction & Cloze Test Pedagogy
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
          Pilar 2: El Juego de Predecir la Palabra (Modelos Autorregresivos)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 space-y-2">
            <div className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Fundamento Matemático (CS229)
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Un LLM genera texto mediante la <strong>cadena de probabilidades condicionales</strong>: 
              <code className="bg-slate-200 px-2 py-0.5 rounded-lg font-mono text-xs block my-1 font-bold text-indigo-950">
                p(x₁, ..., x_T) = ∏ p(x_t | x_1, ..., x_t-1)
              </code>
              El modelo calcula los <em>logits</em> de cada palabra en el diccionario y aplica la función <strong>Softmax</strong> para convertirlos en porcentajes de probabilidad.
            </p>
          </div>

          <div className="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200 space-y-2">
            <div className="text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              Paralelo en la Enseñanza del Inglés (ELT)
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              Es 100% idéntico a un <strong>Cloze Test o ejercicio de "Fill-in-the-blank"</strong>. Un estudiante evalúa pistas de colocación, tiempos verbales y coherencia textual para inferir qué palabra encaja en el espacio en blanco.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Simulador Interactivo de Cloze Test & Temperatura (Softmax)
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              Modifique la Temperatura (τ) para ver cómo cambia la distribución de probabilidad de las palabras
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CLOZE_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectExample(idx)}
                className={`text-xs px-3.5 py-2 rounded-xl border-2 font-bold transition-all cursor-pointer shadow-xs ${
                  selectedExampleIndex === idx
                    ? 'bg-indigo-600 text-white border-indigo-700 font-black'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                Oración #{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Cloze Sentence Display */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white p-7 rounded-3xl space-y-3 shadow-2xl border-4 border-indigo-900">
          <div className="text-xs font-mono text-amber-300 font-bold uppercase tracking-widest flex items-center gap-2">
            <span>Contexto Previo (Prompt / Prefijo):</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold leading-relaxed text-indigo-100">
            "{currentStep.context}{' '}
            <span className="inline-flex items-center justify-center px-4 py-1.5 bg-amber-400 text-slate-950 font-black rounded-xl border-2 border-amber-300 animate-pulse shadow-lg">
              [ &nbsp; ? &nbsp; ]
            </span>{' '}
            ..."
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3 text-xs text-indigo-200 border-t border-indigo-900 font-medium">
            <span><strong>Pista Semántica:</strong> {currentStep.blankMeaning}</span>
            <span>•</span>
            <span><strong>Expectativa Gramatical:</strong> <span className="text-emerald-400 font-bold">{currentStep.targetExpected}</span></span>
          </div>
        </div>

        {/* Hyperparameters Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
          {/* Temperature Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-slate-800 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-indigo-600" />
                Temperatura (τ):
              </span>
              <span className="font-mono bg-indigo-100 text-indigo-900 border border-indigo-300 px-2.5 py-0.5 rounded-lg text-xs font-black">
                {temperature.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={0.05}
              max={2.0}
              step={0.05}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>0.1 (Determinista/Exacto)</span>
              <span>1.0 (Balance)</span>
              <span>2.0 (Creativo)</span>
            </div>
          </div>

          {/* Top-P (Nucleus) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-slate-800 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-600" />
                Top-P (Nucleus):
              </span>
              <span className="font-mono bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-lg text-xs font-black">
                {(topP * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={1.0}
              step={0.05}
              value={topP}
              onChange={(e) => setTopP(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>Corta baja prob.</span>
              <span>100% (Todo V)</span>
            </div>
          </div>

          {/* Top-K */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-slate-800 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-600" />
                Top-K Candidates:
              </span>
              <span className="font-mono bg-emerald-100 text-emerald-900 border border-emerald-300 px-2.5 py-0.5 rounded-lg text-xs font-black">
                {topK} palabras
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={6}
              step={1}
              value={topK}
              onChange={(e) => setTopK(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>Solo la 1ª</span>
              <span>Top 6 candidatas</span>
            </div>
          </div>
        </div>

        {/* Live Probability Bars & Pedagogical Breakdown */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="text-sm font-black text-indigo-950 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Distribución de Probabilidad del Siguiente Token:
            </h4>
            <span className="text-xs font-bold text-slate-500">
              Fórmula: <code className="font-mono bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200">P(w) = Softmax(logit / τ)</code>
            </span>
          </div>

          <div className="space-y-3">
            {calculatedDistribution.map((cand, i) => {
              const probPercent = (cand.normalizedProb * 100).toFixed(1);
              const isWinner = i === 0;

              return (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    isWinner 
                      ? 'bg-indigo-50/90 border-indigo-400 shadow-md ring-2 ring-indigo-200' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-black ${
                        isWinner ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {i + 1}
                      </span>
                      <span className="text-base font-black font-mono text-slate-900">
                        "{cand.token}"
                      </span>
                      <span className="text-[11px] text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full font-bold border border-slate-200">
                        {cand.grammaticalRole}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-mono font-medium">
                        Logit: {cand.logit.toFixed(1)}
                      </span>
                      <span className="text-sm font-black text-indigo-700 font-mono">
                        {probPercent}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        isWinner 
                          ? 'bg-gradient-to-r from-indigo-500 to-amber-500' 
                          : 'bg-slate-400'
                      }`}
                      style={{ width: `${Math.max(parseFloat(probPercent), 2)}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-600 mt-2 italic font-medium">
                    {cand.meaning}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pedagogical Teaching Box */}
        <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-200 flex items-start gap-4 shadow-sm">
          <div className="p-3 bg-indigo-600 text-white rounded-xl shrink-0 shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-2 text-xs text-slate-700">
            <h4 className="font-black text-sm text-indigo-950 uppercase tracking-wide">
              ¿Por qué la Temperatura importa en la Evaluación de Redacción en Inglés?
            </h4>
            <p className="leading-relaxed font-medium">
              <strong>Para ejercicios formales de gramática (ej. verb tenses, preposiciones):</strong> Queremos que la IA opere a <em>Temperatura baja (τ = 0.1 a 0.3)</em> para que elija siempre la forma canónica y exacta sin inventar variaciones raras.
            </p>
            <p className="leading-relaxed font-medium">
              <strong>Para actividades de escritura creativa (Creative Writing & Storytelling):</strong> Se utiliza <em>Temperatura media-alta (τ = 0.7 a 1.0)</em> para que el modelo sugiera adjetivos vívidos, sinónimos menos comunes y metáforas originales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
