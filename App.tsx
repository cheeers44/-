import React from 'react';
import SnowParticles from './components/SnowParticles';
import Hero from './components/Hero';
import WorldInfo from './components/WorldInfo';
import CharacterSheet from './components/CharacterSheet';
import RelationshipSection from './components/RelationshipSection';
import InteractiveDesk from './components/InteractiveDesk';
import Footer from './components/Footer';
import CursorEffect from './components/CursorEffect';
import IntroOverlay from './components/IntroOverlay';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-blood selection:text-white">
      <IntroOverlay />
      <CursorEffect />
      <SnowParticles />
      
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <WorldInfo />
        <CharacterSheet />
        <RelationshipSection />
        <InteractiveDesk />
      </main>

      <Footer />
    </div>
  );
};

export default App;