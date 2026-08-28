import React, { useState } from 'react';
import { NavTab } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TokenizerSimulator } from './components/simulators/TokenizerSimulator';
import { ClozePredictorSimulator } from './components/simulators/ClozePredictorSimulator';
import { AttentionVisualizer } from './components/simulators/AttentionVisualizer';
import { PretrainingFineTuningSimulator } from './components/simulators/PretrainingFineTuningSimulator';
import { ReasoningRLVRSimulator } from './components/simulators/ReasoningRLVRSimulator';
import { TransformerNeuralVisualizer } from './components/simulators/TransformerNeuralVisualizer';
import { SmallModelsSimulator } from './components/simulators/SmallModelsSimulator';
import { OpenWeightsComparison } from './components/simulators/OpenWeightsComparison';
import { CurriculumRoadmap } from './components/CurriculumRoadmap';
import { GlossaryModal } from './components/GlossaryModal';
import { LicenseModal } from './components/LicenseModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isLicenseOpen, setIsLicenseOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-sky-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
      {/* Header with Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenLicense={() => setIsLicenseOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'overview' && (
          <HeroSection setActiveTab={setActiveTab} />
        )}

        {activeTab === 'tokenization' && (
          <TokenizerSimulator />
        )}

        {activeTab === 'cloze' && (
          <ClozePredictorSimulator />
        )}

        {activeTab === 'attention' && (
          <AttentionVisualizer />
        )}

        {activeTab === 'transformer-arch' && (
          <TransformerNeuralVisualizer />
        )}

        {activeTab === 'training' && (
          <PretrainingFineTuningSimulator />
        )}

        {activeTab === 'reasoning' && (
          <ReasoningRLVRSimulator />
        )}

        {activeTab === 'small-models' && (
          <SmallModelsSimulator />
        )}

        {activeTab === 'open-weights' && (
          <OpenWeightsComparison />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumRoadmap />
        )}
      </main>

      {/* Bilingual Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Creative Commons CC BY 4.0 License Modal */}
      <LicenseModal
        isOpen={isLicenseOpen}
        onClose={() => setIsLicenseOpen(false)}
      />

      {/* Educational Footer */}
      <Footer onOpenLicense={() => setIsLicenseOpen(true)} />
    </div>
  );
}
