import React, { useState } from 'react';
import { 
  Smartphone, 
  Server, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  WifiOff, 
  BatteryCharging, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Activity,
  Award
} from 'lucide-react';
import { DEVICE_COMPARISON_SCENARIOS, LIQUID_AI_ARCHITECTURE_POINTS } from '../../data/simulatorsData';

export const SmallModelsSimulator: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(DEVICE_COMPARISON_SCENARIOS[0].id);
  const [activeSubTab, setActiveSubTab] = useState<'device-duel' | 'liquid-ai-tech' | 'mobile-setup-guide'>('device-duel');
  const [simulatedExecutionState, setSimulatedExecutionState] = useState<'idle' | 'running' | 'completed'>('completed');

  const currentScenario = DEVICE_COMPARISON_SCENARIOS.find(s => s.id === selectedScenarioId) || DEVICE_COMPARISON_SCENARIOS[0];

  const handleScenarioChange = (scenarioId: string) => {
    setSelectedScenarioId(scenarioId);
    setSimulatedExecutionState('running');
    setTimeout(() => {
      setSimulatedExecutionState('completed');
    }, 350);
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            <Smartphone className="w-3.5 h-3.5" />
            Modelos Pequeños (SLMs) & On-Device Edge AI
          </div>
          <a
            href="https://www.liquid.ai/models"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-black text-indigo-700 bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-full border-2 border-indigo-300 uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <span>Referencia: Liquid AI (Liquid Foundation Models)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
          Modelos Pequeños (SLMs) en Teléfonos Móviles vs. Modelos Gigantes de Laboratorio
        </h2>

        <p className="text-slate-700 text-sm leading-relaxed font-medium">
          Durante años se creyó que la IA requería supercomputadoras en centros de datos con miles de GPUs. Hoy, la nueva generación de <strong>Modelos Pequeños de Lenguaje (Small Language Models - SLMs)</strong> y arquitecturas continuas de última generación como <strong>Liquid AI (Liquid Foundation Models - LFMs)</strong> permiten ejecutar inteligencia artificial completa <strong>directamente en el procesador de un teléfono celular o laptop escolar, 100% offline, sin gastar batería y protegiendo la privacidad de los estudiantes</strong>.
        </p>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-indigo-950">
              <WifiOff className="w-4 h-4 text-indigo-600" />
              100% Sin Internet
            </div>
            <p className="text-xs text-indigo-900 font-medium">
              Funciona en zonas rurales, playas y montañas de Costa Rica sin cobertura de red.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-emerald-950">
              <Clock className="w-4 h-4 text-emerald-600" />
              Latencia Instantánea
            </div>
            <p className="text-xs text-emerald-900 font-medium">
              Respuestas en 25 a 50 milisegundos sin colas de espera en servidores sobrecargados.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-amber-950">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Privacidad Absoluta
            </div>
            <p className="text-xs text-amber-900 font-medium">
              Los ensayos y voz de los estudiantes menores de edad jamás salen del chip del teléfono.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('device-duel')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeSubTab === 'device-duel'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          1. Duelo Interactivo: Móvil Local vs. Servidor en la Nube
        </button>
        <button
          onClick={() => setActiveSubTab('liquid-ai-tech')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeSubTab === 'liquid-ai-tech'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          2. Innovación Arquitectónica: Liquid AI (LFMs) vs. Transformers Clásicos
        </button>
        <button
          onClick={() => setActiveSubTab('mobile-setup-guide')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeSubTab === 'mobile-setup-guide'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          3. Guía Práctica: Cómo Instalar un SLM en el Celular de un Docente/Alumno
        </button>
      </div>

      {/* VIEW 1: INTERACTIVE DUEL / DEVICE COMPARISON */}
      {activeSubTab === 'device-duel' && (
        <div className="space-y-6">
          {/* Scenario Selector */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-indigo-950 tracking-wider">
                Seleccione un Escenario Pedagógico de Clase de Inglés:
              </span>
              <span className="text-xs font-black bg-indigo-100 text-indigo-900 px-3 py-0.5 rounded-full border border-indigo-300">
                Nivel / Programa INA: {currentScenario.cefrLevel}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DEVICE_COMPARISON_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioChange(sc.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer shadow-xs ${
                    selectedScenarioId === sc.id
                      ? 'bg-indigo-600 text-white border-indigo-800 font-bold shadow-md scale-102'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-[11px] font-mono opacity-80 mb-1">
                    Escenario: {sc.cefrLevel}
                  </div>
                  <div className="text-xs font-black line-clamp-2">
                    {sc.taskTitle}
                  </div>
                </button>
              ))}
            </div>

            {/* Prompt Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-1 border border-slate-800">
              <span className="text-amber-400 font-bold block text-[11px]">Instrucción de Entrada (Prompt del Docente / Alumno):</span>
              <p className="text-slate-200 font-sans text-sm">{currentScenario.userPrompt}</p>
            </div>
          </div>

          {/* Side-by-Side Comparison Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT: Mobile On-Device Small Model */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-500 shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider block">
                        Modelo en Teléfono Móvil
                      </span>
                      <h4 className="text-base font-black text-emerald-950">
                        {currentScenario.mobileModel.name}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full border border-emerald-300">
                    {currentScenario.mobileModel.parameters}
                  </span>
                </div>

                {/* Metrics Table */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center">
                    <span className="text-[10px] text-emerald-800 font-bold block">Uso de Memoria RAM</span>
                    <span className="font-mono text-xs font-black text-emerald-950">{currentScenario.mobileModel.ramUsageMB} MB (~0.85 GB)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center">
                    <span className="text-[10px] text-emerald-800 font-bold block">Latencia de Respuesta</span>
                    <span className="font-mono text-xs font-black text-emerald-950">{currentScenario.mobileModel.latencyMs} ms (Ultra rápida)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-emerald-800 font-bold block">Consumo Eléctrico</span>
                    <span className="font-mono text-xs font-black text-emerald-950">{currentScenario.mobileModel.energyWatts}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase text-emerald-900 tracking-wider block">
                    Respuesta Generada en el Dispositivo Móvil:
                  </span>
                  <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-50 text-xs font-sans whitespace-pre-wrap leading-relaxed border-2 border-emerald-800 shadow-inner">
                    {currentScenario.mobileModel.simulatedResponse}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-xs text-emerald-950 space-y-1">
                <strong className="block font-black text-emerald-900">Evaluación Pedagógica de Aula:</strong>
                <p className="font-medium">{currentScenario.mobileModel.pedagogicalAssessment}</p>
              </div>
            </div>

            {/* RIGHT: Cloud Datacenter Frontier Model */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-xl space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-md">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                        Modelo de Datacenter en la Nube
                      </span>
                      <h4 className="text-base font-black text-slate-900">
                        {currentScenario.cloudLabModel.name}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-black bg-slate-200 text-slate-800 px-2.5 py-1 rounded-full border border-slate-300">
                    {currentScenario.cloudLabModel.parameters}
                  </span>
                </div>

                {/* Metrics Table */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-600 font-bold block">Uso de Memoria VRAM</span>
                    <span className="font-mono text-xs font-black text-slate-900">420.000 MB (420 GB en GPUs)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center">
                    <span className="text-[10px] text-slate-600 font-bold block">Latencia de Red</span>
                    <span className="font-mono text-xs font-black text-slate-900">{currentScenario.cloudLabModel.latencyMs} ms (+ Red)</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-center col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-600 font-bold block">Consumo Eléctrico</span>
                    <span className="font-mono text-xs font-black text-slate-900">{currentScenario.cloudLabModel.energyWatts}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase text-slate-800 tracking-wider block">
                    Respuesta Generada en el Servidor Central:
                  </span>
                  <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs font-sans whitespace-pre-wrap leading-relaxed border-2 border-slate-700 shadow-inner">
                    {currentScenario.cloudLabModel.simulatedResponse}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 border-2 border-slate-200 text-xs text-slate-800 space-y-1">
                <strong className="block font-black text-slate-900">Evaluación Pedagógica de Aula:</strong>
                <p className="font-medium">{currentScenario.cloudLabModel.pedagogicalAssessment}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: LIQUID AI TECHNICAL INNOVATION */}
      {activeSubTab === 'liquid-ai-tech' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                La Revolución de Liquid AI (Liquid Foundation Models - LFMs)
              </h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                Por qué las arquitecturas de sistemas dinámicos continuos superan el cuello de botella del Transformer en smartphones.
              </p>
            </div>
            <a
              href="https://www.liquid.ai/models"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Ver Modelos LFM 1B, 3B y 40B en Liquid.ai</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-4">
            {LIQUID_AI_ARCHITECTURE_POINTS.map((pt, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-indigo-950 font-black text-sm">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <span>{pt.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                    <span className="text-[11px] font-black uppercase text-rose-900 block">
                      Transformer Tradicional (Atención Estándar)
                    </span>
                    <p className="text-xs text-rose-950 font-medium leading-relaxed">
                      {pt.traditionalTransformer}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="text-[11px] font-black uppercase text-emerald-900 block">
                      Liquid Foundation Model (LFM de Liquid AI)
                    </span>
                    <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                      {pt.liquidFoundationModel}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                  <strong className="text-amber-900">¿Por qué es crucial para el teléfono del docente? </strong>
                  {pt.whyItMattersForMobile}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: PRACTICAL MOBILE SETUP GUIDE */}
      {activeSubTab === 'mobile-setup-guide' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-950 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              Guía Paso a Paso para Docentes: Ejecutar un Modelo Local en Teléfono Celular
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Herramientas gratuitas y sin costo de suscripción que cualquier docente del INA puede instalar hoy mismo en Android o iPhone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-2.5">
              <div className="text-sm font-black text-indigo-950 flex items-center justify-between">
                <span>MLC Chat / PocketLLM</span>
                <span className="text-[10px] bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded font-bold">Android / iOS</span>
              </div>
              <p className="text-xs text-indigo-900 font-medium">
                Permite descargar modelos pequeños (Llama-3.2-1B, Liquid LFM, Phi-3.5) con un solo clic. Funciona con el modo avión activado.
              </p>
              <div className="text-[11px] font-mono text-indigo-800 bg-white/70 p-2 rounded-lg">
                Requisito: 3 GB a 4 GB RAM libre
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 space-y-2.5">
              <div className="text-sm font-black text-emerald-950 flex items-center justify-between">
                <span>LM Studio / Jan</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-bold">Laptops Docentes</span>
              </div>
              <p className="text-xs text-emerald-900 font-medium">
                Interfaz gráfica amigable para Windows/Mac/Linux. Permite arrastrar archivos .GGUF y crear asistentes personalizados con las guías y programas del INA.
              </p>
              <div className="text-[11px] font-mono text-emerald-800 bg-white/70 p-2 rounded-lg">
                Requisito: 8 GB RAM en Laptop
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2.5">
              <div className="text-sm font-black text-amber-950 flex items-center justify-between">
                <span>Ollama</span>
                <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">Laboratorios INA</span>
              </div>
              <p className="text-xs text-amber-900 font-medium">
                Servidor local ligero que se puede instalar en una sola computadora del laboratorio del centro de formación para abastecer a 30 computadoras sin internet.
              </p>
              <div className="text-[11px] font-mono text-amber-800 bg-white/70 p-2 rounded-lg">
                Comando: ollama run llama3.2:1b
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
