import React, { useState } from 'react';
import { ATTENTION_SENTENCES } from '../../data/simulatorsData';
import { 
  Network, 
  Sparkles, 
  Eye, 
  HelpCircle, 
  Layers, 
  BookOpen, 
  ArrowRight,
  SplitSquareVertical,
  Activity
} from 'lucide-react';

export const AttentionVisualizer: React.FC = () => {
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState<number>(0);
  const [activeTokenIndex, setActiveTokenIndex] = useState<number>(4); // default "bank"
  const [activeHead, setActiveHead] = useState<'all' | 'semantic' | 'syntax'>('all');

  const sentenceData = ATTENTION_SENTENCES[selectedSentenceIndex];
  const tokens = sentenceData.tokens;

  // Fallback attention if not defined for that specific token
  const weights = sentenceData.attentionWeights[activeTokenIndex] || 
    tokens.map((_, i) => (i === activeTokenIndex ? 0.4 : 0.6 / (tokens.length - 1)));

  const handleSentenceChange = (idx: number) => {
    setSelectedSentenceIndex(idx);
    // Set appropriate initial focus token per sentence
    if (idx === 0) setActiveTokenIndex(4); // bank
    else if (idx === 1) setActiveTokenIndex(10); // it
    else if (idx === 2) setActiveTokenIndex(7); // inspires
  };

  return (
    <div className="space-y-8">
      {/* Header of Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            <Network className="w-3.5 h-3.5" />
            CS229 Capítulo 17.3 & 17.4 (Pág. 207-215)
          </div>
          <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full border-2 border-amber-300 uppercase tracking-wider">
            Self-Attention Mechanism & Reading Comprehension
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
          Pilar 3: Comprensión de Lectura y el Mecanismo de "Atención"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 space-y-2">
            <div className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-600" />
              ¿Cómo funciona la Atención en Transformers?
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Cada palabra proyecta tres vectores: <strong>Query (Q)</strong> ("¿qué información busco?"), <strong>Key (K)</strong> ("¿qué información ofrezco?") y <strong>Value (V)</strong> ("mi contenido semántico"). 
              La fórmula <code className="bg-slate-200 px-2 py-0.5 rounded-lg font-mono text-xs font-bold text-indigo-950">Softmax(QKᵀ / √d) V</code> conecta cualquier par de palabras sin importar cuántas oraciones las separen.
            </p>
          </div>

          <div className="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200 space-y-2">
            <div className="text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              Paralelo en la Enseñanza de Idiomas (ELT)
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              Es idéntico a las destrezas de <strong>Reading Comprehension y Cohesión Discursiva</strong>. Cuando un estudiante lee <em>"I went to the bank to deposit money"</em>, su mente conecta instantáneamente <em>"bank"</em> con <em>"deposit"</em> y <em>"money"</em>, descartando la acepción de 'orilla de río'.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Explorador Interactivo de Conexiones de Atención
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              Haga clic en cualquier palabra para ver hacia dónde "mira" el modelo y con qué intensidad
            </p>
          </div>

          {/* Sentence Selector */}
          <div className="flex flex-wrap gap-2">
            {ATTENTION_SENTENCES.map((sent, idx) => (
              <button
                key={sent.id}
                onClick={() => handleSentenceChange(idx)}
                className={`text-xs px-3.5 py-2 rounded-xl border-2 font-bold transition-all cursor-pointer shadow-xs ${
                  selectedSentenceIndex === idx
                    ? 'bg-indigo-600 text-white border-indigo-700 font-black'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                Ejemplo #{idx + 1}: {idx === 0 ? 'Polisemia (Bank)' : idx === 1 ? 'Anáfora (It)' : 'Concordancia (S-V)'}
              </button>
            ))}
          </div>
        </div>

        {/* Sentence Prompt Note */}
        <div className="bg-slate-50 border-2 border-slate-200 p-5 rounded-2xl text-xs text-slate-700 space-y-1.5">
          <p className="font-bold text-slate-900 text-sm">
            {sentenceData.explanation}
          </p>
          <p className="text-slate-600 font-medium">
            Palabra enfocada actual: <strong className="text-indigo-600 font-mono font-black text-sm">"{tokens[activeTokenIndex]}"</strong> (Token #{activeTokenIndex + 1})
          </p>
        </div>

        {/* Interactive Sentence Word Flow */}
        <div className="p-8 bg-slate-950 rounded-3xl text-white space-y-6 shadow-2xl border-4 border-indigo-900">
          <div className="flex flex-wrap items-center justify-between text-xs text-indigo-200 border-b border-indigo-900 pb-3 gap-2">
            <span className="font-bold">Oración bajo análisis:</span>
            <span className="text-xs text-amber-400 font-mono font-bold">
              Vector de Atención: ∑ wᵢ = 100%
            </span>
          </div>

          {/* Words interactive buttons */}
          <div className="flex flex-wrap gap-3 items-center justify-center py-4">
            {tokens.map((token, idx) => {
              const isQuery = idx === activeTokenIndex;
              const weight = weights[idx] || 0;
              const weightPct = (weight * 100).toFixed(0);

              // Dynamic color intensity based on attention weight
              let bgStyle = 'bg-slate-900 text-slate-300 border-slate-700';
              if (isQuery) {
                bgStyle = 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-400/40 font-black scale-110 shadow-xl';
              } else if (weight >= 0.25) {
                bgStyle = 'bg-indigo-600 text-white border-indigo-400 font-bold scale-105 shadow-md';
              } else if (weight >= 0.10) {
                bgStyle = 'bg-indigo-950 text-indigo-200 border-indigo-600/60 font-semibold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => setActiveTokenIndex(idx)}
                  className={`px-4 py-2.5 rounded-2xl border-2 text-sm transition-all duration-200 flex flex-col items-center gap-1 cursor-pointer ${bgStyle}`}
                >
                  <span className="font-mono text-sm">{token}</span>
                  <span className={`text-[10px] font-mono font-black ${isQuery ? 'text-slate-950 font-black' : 'text-indigo-300'}`}>
                    {isQuery ? 'Query (Q)' : `${weightPct}%`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Attention Intensity Bar for Selected Word */}
          <div className="space-y-2.5 pt-3 border-t border-indigo-900 text-xs">
            <span className="text-indigo-300 uppercase text-xs font-black tracking-widest block">
              Desglose de Pesos de Atención para "{tokens[activeTokenIndex]}":
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
              {tokens.map((t, idx) => {
                const w = weights[idx] || 0;
                const isSelected = idx === activeTokenIndex;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border-2 text-center text-xs font-bold ${
                      isSelected 
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300 shadow-sm' 
                        : w >= 0.2 
                        ? 'bg-indigo-900 border-indigo-500 text-white font-black' 
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="truncate font-mono">{t}</div>
                    <div className="font-mono text-xs text-white mt-0.5">{(w * 100).toFixed(0)}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pedagogical Insight Card */}
        <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-200 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-black text-indigo-950 uppercase tracking-wide">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>Perspectiva Lingüística para Docentes INA:</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {sentenceData.pedagogicalInsight}
          </p>
          <div className="bg-white p-4 rounded-xl border-2 border-indigo-100 text-xs text-slate-700 space-y-1.5 font-medium">
            <strong className="text-indigo-950 font-bold block">¿Por qué el Transformer supera a los modelos antiguos (RNN/LSTM)?</strong>
            <p className="leading-relaxed">
              Las redes antiguas leían palabra por palabra como quien olvida el inicio de un párrafo largo. El mecanismo de atención <strong>"Self-Attention"</strong> permite que la palabra número 1.000 se comunique directamente en 1 solo paso con la palabra número 1, garantizando que el modelo mantenga el hilo temático y la cohesión discursiva en textos extensos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
