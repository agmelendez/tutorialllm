import React, { useState, useMemo } from 'react';
import { TOKEN_SAMPLES } from '../../data/simulatorsData';
import { 
  Scissors, 
  Sparkles, 
  Layers, 
  Info, 
  BookOpen, 
  Check, 
  RefreshCw,
  Zap,
  HelpCircle
} from 'lucide-react';

interface SimulatedToken {
  text: string;
  id: number;
  type: 'word' | 'subword-root' | 'subword-affix' | 'punct' | 'special';
  note: string;
}

export const TokenizerSimulator: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [customText, setCustomText] = useState<string>(TOKEN_SAMPLES[0].text);
  const [showIdView, setShowIdView] = useState<boolean>(true);

  // Common English affixes for realistic BPE morphological simulation
  const prefixes = ['un', 're', 'in', 'im', 'dis', 'pre', 'mis', 'over', 'non', 'inter', 'sub'];
  const suffixes = ['tion', 'sion', 'ing', 'ed', 'able', 'ible', 'ness', 'ment', 'lessly', 'less', 'ful', 'ly', 'ized', 'ization', 'est', 'er', 'ity'];

  // Simulated BPE tokenizer algorithm based on CS229 Chapter 17.1
  const tokens = useMemo<SimulatedToken[]>(() => {
    const text = customText.trim();
    if (!text) return [];

    // Simple robust tokenizer for demonstration
    const wordsAndPunct: string[] = text.match(/\w+|[^\s\w]/g) || [];
    const result: SimulatedToken[] = [];
    let idCounter = 1000;

    wordsAndPunct.forEach((rawWord: string) => {
      // Check if it is punctuation
      if (/^[^\s\w]+$/.test(rawWord)) {
        result.push({
          text: rawWord,
          id: (rawWord.charCodeAt(0) * 17) % 500,
          type: 'punct',
          note: 'Signo ortográfico delimitador',
        });
        return;
      }

      const lower = rawWord.toLowerCase();
      
      // Check if it's very short / common word
      if (rawWord.length <= 4) {
        result.push({
          text: (result.length > 0 ? ' ' : '') + rawWord,
          id: (idCounter += 37),
          type: 'word',
          note: 'Palabra común de alta frecuencia en el corpus (1 token)',
        });
        return;
      }

      // Check for common morphological prefixes / suffixes
      let matched = false;

      // Prefix check
      for (const pref of prefixes) {
        if (lower.startsWith(pref) && lower.length > pref.length + 3) {
          const rest = rawWord.slice(pref.length);
          result.push({
            text: (result.length > 0 ? ' ' : '') + rawWord.slice(0, pref.length),
            id: (idCounter += 43),
            type: 'subword-affix',
            note: `Prefijo morfológico "${pref}-"`,
          });
          
          // Check suffix on the rest
          let restMatched = false;
          for (const suff of suffixes) {
            if (rest.toLowerCase().endsWith(suff) && rest.length > suff.length + 2) {
              const root = rest.slice(0, rest.length - suff.length);
              result.push({
                text: root,
                id: (idCounter += 109),
                type: 'subword-root',
                note: `Raíz léxica "${root}"`,
              });
              result.push({
                text: suff,
                id: (idCounter += 53),
                type: 'subword-affix',
                note: `Sufijo derivacional "-${suff}"`,
              });
              restMatched = true;
              break;
            }
          }

          if (!restMatched) {
            result.push({
              text: rest,
              id: (idCounter += 89),
              type: 'subword-root',
              note: `Raíz léxica "${rest}"`,
            });
          }
          matched = true;
          break;
        }
      }

      // Suffix check if not matched by prefix
      if (!matched) {
        for (const suff of suffixes) {
          if (lower.endsWith(suff) && lower.length > suff.length + 3) {
            const root = rawWord.slice(0, rawWord.length - suff.length);
            result.push({
              text: (result.length > 0 ? ' ' : '') + root,
              id: (idCounter += 71),
              type: 'subword-root',
              note: `Raíz léxica principal "${root}"`,
            });
            result.push({
              text: suff,
              id: (idCounter += 53),
              type: 'subword-affix',
              note: `Sufijo gramatical "-${suff}"`,
            });
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        result.push({
          text: (result.length > 0 ? ' ' : '') + rawWord,
          id: (idCounter += 67),
          type: 'word',
          note: 'Palabra completa presente en el vocabulario V',
        });
      }
    });

    return result;
  }, [customText]);

  const tokenColorClass = (type: SimulatedToken['type']) => {
    switch (type) {
      case 'subword-affix':
        return 'bg-amber-100 text-amber-900 border-2 border-amber-300 hover:bg-amber-200 shadow-sm';
      case 'subword-root':
        return 'bg-indigo-100 text-indigo-950 border-2 border-indigo-300 hover:bg-indigo-200 shadow-sm';
      case 'punct':
        return 'bg-slate-200 text-slate-900 border-2 border-slate-300 hover:bg-slate-300 shadow-sm';
      case 'word':
      default:
        return 'bg-emerald-100 text-emerald-950 border-2 border-emerald-300 hover:bg-emerald-200 shadow-sm';
    }
  };

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setCustomText(TOKEN_SAMPLES[index].text);
  };

  return (
    <div className="space-y-8">
      {/* Header of Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            <Scissors className="w-3.5 h-3.5" />
            CS229 Capítulo 17.1 (Pág. 202-203)
          </div>
          <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full border-2 border-amber-300 uppercase tracking-wider">
            Morfología & Byte-Pair Encoding (BPE)
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
          Pilar 1: De las Palabras a los "Tokens"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="bg-slate-50 p-5 rounded-2xl border-2 border-slate-100 space-y-2">
            <div className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-600" />
              ¿Qué hace el algoritmo en IA?
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              Los LLMs no procesan texto continuo ni letras sueltas. Mediante <strong>Byte-Pair Encoding (BPE)</strong>, descomponen el texto en fragmentos estadísticos recurrentes llamados <strong>tokens</strong>, cada uno mapeado a un número entero dentro de un vocabulario fijo de ~100k a 248k palabras/subpalabras.
            </p>
          </div>

          <div className="bg-amber-50/80 p-5 rounded-2xl border-2 border-amber-200 space-y-2">
            <div className="text-xs font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-700" />
              Paralelo en la Enseñanza de Idiomas (ELT)
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              Es exactamente igual a la <strong>conciencia morfológica</strong>: un estudiante que aprende inglés no memoriza 500.000 palabras aisladas, sino que combina <em>prefijos</em> (un-, re-, inter-), <em>raíces</em> (happy, nation, believe) y <em>sufijos</em> (-ness, -al, -able) para descifrar e inventar términos.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Playground */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            Simulador de Tokenización Morfológica en Vivo
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowIdView(!showIdView)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl border-2 transition-all cursor-pointer shadow-xs ${
                showIdView
                  ? 'bg-indigo-600 text-white border-indigo-700 font-black'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {showIdView ? 'Ocultar IDs numéricos' : 'Mostrar IDs numéricos de Tokens'}
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
            Seleccione un ejemplo pedagógico o escriba el suyo:
          </label>
          <div className="flex flex-wrap gap-2">
            {TOKEN_SAMPLES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(idx)}
                className={`text-xs px-3.5 py-2 rounded-xl border-2 text-left transition-all cursor-pointer font-bold ${
                  selectedPresetIndex === idx && customText === sample.text
                    ? 'bg-indigo-50 border-indigo-500 text-indigo-950 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="block truncate max-w-xs">{sample.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={3}
              placeholder="Escriba aquí cualquier oración en inglés para ver cómo el LLM la segmenta en tokens..."
              className="w-full text-sm p-4 rounded-2xl border-2 border-slate-300 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-600 bg-slate-50 font-bold text-slate-900 resize-y"
            />
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Pruebe palabras complejas en inglés como: <em>"unpredictability"</em>, <em>"reconceptualizing"</em>, <em>"disproportionately"</em> o <em>"cross-curricular"</em>.
          </p>
        </div>

        {/* Visualized Output */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-5 border-4 border-indigo-900 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between text-xs text-indigo-200 border-b border-indigo-900 pb-3 gap-2">
            <div className="flex items-center gap-4">
              <span>Caracteres: <strong className="text-white font-mono">{customText.length}</strong></span>
              <span>Palabras: <strong className="text-white font-mono">{customText.trim() ? customText.trim().split(/\s+/).length : 0}</strong></span>
              <span>Tokens resultantes: <strong className="text-amber-400 font-mono text-sm">{tokens.length}</strong></span>
            </div>
            <div className="text-[11px] text-indigo-300 font-bold uppercase tracking-wider hidden sm:block">
              Compresión: {(customText.length / (tokens.length || 1)).toFixed(1)} chars/token
            </div>
          </div>

          {/* Token Pills Flow */}
          <div className="space-y-2.5">
            <span className="text-xs font-black text-indigo-300 uppercase tracking-widest block">
              Representación Interna del Modelo (Segmentación BPE):
            </span>
            <div className="flex flex-wrap gap-2.5 p-4 bg-slate-900 rounded-2xl border-2 border-slate-800 min-h-[75px] items-center">
              {tokens.length === 0 ? (
                <span className="text-slate-500 text-xs italic">Escriba texto arriba para visualizar tokens...</span>
              ) : (
                tokens.map((tok, i) => (
                  <div
                    key={i}
                    title={`${tok.note} (ID: ${tok.id})`}
                    className={`inline-flex flex-col items-center justify-center px-3.5 py-2 rounded-xl text-xs font-bold transition-transform hover:scale-105 cursor-help ${tokenColorClass(tok.type)}`}
                  >
                    <span className="font-mono text-xs">{tok.text}</span>
                    {showIdView && (
                      <span className="text-[9px] font-mono opacity-80 mt-0.5">
                        id:{tok.id}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-300 border-2 border-emerald-500 inline-block" />
              <span>Palabra completa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-indigo-300 border-2 border-indigo-500 inline-block" />
              <span>Raíz léxica (Root)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-300 border-2 border-amber-500 inline-block" />
              <span>Afijo morfológico (Prefix / Suffix)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-slate-300 border-2 border-slate-500 inline-block" />
              <span>Puntuación</span>
            </div>
          </div>
        </div>

        {/* Pedagogical Breakdown Table for Teachers */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-800 font-black uppercase text-[10px] tracking-wider border-b-2 border-slate-200">
              <tr>
                <th className="p-3.5">Token #</th>
                <th className="p-3.5">Fragmento Texto</th>
                <th className="p-3.5">ID Numérico</th>
                <th className="p-3.5">Categoría Morfológica</th>
                <th className="p-3.5">Valor Pedagógico en la Enseñanza del Inglés</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {tokens.map((tok, i) => (
                <tr key={i} className="hover:bg-indigo-50/50">
                  <td className="p-3.5 font-mono text-slate-400">{i + 1}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 bg-slate-50/50">
                    "{tok.text}"
                  </td>
                  <td className="p-3.5 font-mono text-indigo-600 font-bold">{tok.id}</td>
                  <td className="p-3.5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      tok.type === 'subword-affix' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      tok.type === 'subword-root' ? 'bg-indigo-100 text-indigo-900 border border-indigo-300' :
                      tok.type === 'punct' ? 'bg-slate-100 text-slate-800 border border-slate-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {tok.type === 'subword-affix' ? 'Afijo' : tok.type === 'subword-root' ? 'Raíz' : tok.type === 'punct' ? 'Puntuación' : 'Palabra'}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-700">{tok.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pedagogical Lesson Idea Box for INA Teachers */}
        <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-200 flex items-start gap-4 shadow-sm">
          <div className="p-3 bg-indigo-600 text-white rounded-xl shrink-0 shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 text-xs text-slate-700">
            <h4 className="font-black text-sm text-indigo-950 uppercase tracking-wide">
              Aplicación Práctica en el Aula de Inglés (Costa Rica - INA):
            </h4>
            <p className="leading-relaxed font-medium">
              <strong>Actividad "Be the Tokenizer":</strong> Entregue a los estudiantes tarjetas con palabras complejas en inglés (ej. <em>"unforgettable", "misunderstanding", "predictable"</em>). Pida que las corten en sus unidades mínimas y deduzcan el significado global sumando el significado de cada morfema. Luego, comparen con el resultado de esta herramienta para explicar cómo la inteligencia artificial comprende el léxico de la misma manera que los humanos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
