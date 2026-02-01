import React from 'react';
import { WORLD } from '../constants';

const WorldInfo: React.FC = () => {
  return (
    <section className="py-20 bg-black px-6 border-b border-slate-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display text-slate-200 mb-2">세계관</h2>
          <div className="w-16 h-1 bg-blood mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-imperial/50 p-6 border border-slate-800 rounded-sm hover:border-gold/30 transition-colors duration-300">
                <h3 className="text-lg font-myeongjo font-bold text-slate-200 mb-2 flex items-center gap-2">
                    <span className="text-gold">⁕</span> 시대
                </h3>
                <p className="text-slate-400 text-sm">{WORLD.era}</p>
            </div>
            <div className="bg-imperial/50 p-6 border border-slate-800 rounded-sm hover:border-gold/30 transition-colors duration-300">
                <h3 className="text-lg font-myeongjo font-bold text-slate-200 mb-2 flex items-center gap-2">
                    <span className="text-gold">⁕</span> 장소
                </h3>
                <p className="text-slate-400 text-sm">{WORLD.location}</p>
            </div>
             <div className="bg-imperial/50 p-6 border border-slate-800 rounded-sm hover:border-gold/30 transition-colors duration-300">
                <h3 className="text-lg font-myeongjo font-bold text-slate-200 mb-2 flex items-center gap-2">
                    <span className="text-gold">⁕</span> 갈등
                </h3>
                <p className="text-slate-400 text-sm">혁명 전야, 계급 투쟁</p>
            </div>
        </div>

        <div className="mt-12 bg-slate-900/50 p-8 border-l-4 border-blood">
            <h4 className="text-xl font-display text-slate-300 mb-4">배경 상황</h4>
            <ul className="space-y-2">
                {WORLD.context.map((ctx, idx) => (
                    <li key={idx} className="flex items-center text-slate-400 font-serif">
                        <span className="w-1.5 h-1.5 bg-blood rounded-full mr-3"></span>
                        {ctx}
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

export default WorldInfo;