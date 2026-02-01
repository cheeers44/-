import React from 'react';
import { NPCS } from '../constants';

const RelationshipSection: React.FC = () => {
  return (
    <section className="py-24 bg-black px-6">
      <div className="max-w-6xl mx-auto">
         <div className="text-center mb-16">
          <h2 className="text-3xl font-display text-slate-200 mb-2">주요 인물</h2>
          <p className="text-slate-500 font-myeongjo italic">목줄을 쥔 자들</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {NPCS.map((npc, idx) => {
                let bgImage = null;
                if (npc.name.includes("아나스타시야")) {
                    bgImage = "https://i.postimg.cc/xC3HrLyN/yeodongsaeng.jpg";
                } else if (npc.name.includes("알렉산드르")) {
                    bgImage = "https://i.postimg.cc/CKzBPWzR/chaleu.jpg";
                } else if (npc.name.includes("이반")) {
                    bgImage = "https://i.postimg.cc/xCNs2xFf/bugwan.jpg";
                } else if (npc.name.includes("표도르")) {
                    bgImage = "https://i.postimg.cc/ZY2SpXh3/jibsa.jpg";
                }
                
                return (
                <div key={idx} className="group relative bg-imperial border border-slate-800 overflow-hidden hover:border-slate-500 transition-all duration-500 ease-out min-h-[640px] hover:shadow-2xl hover:scale-105 hover:z-30">
                    
                    {/* Background Image */}
                    {bgImage && (
                        <>
                            <div className="absolute inset-0 z-0 bg-black">
                                <img 
                                    src={bgImage} 
                                    alt={npc.name} 
                                    // Default: 40% opacity, Grayscale. Hover: 100% opacity, Color, Zoom in slightly
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                    style={{ objectPosition: 'top center' }}
                                />
                            </div>
                            
                            {/* Gradients */}
                            {/* Top Gradient (protects title) */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/90 via-transparent to-transparent opacity-80 transition-all duration-700"></div>
                            {/* Bottom Gradient (protects description) */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 transition-all duration-700"></div>
                        </>
                    )}

                    <div className="absolute top-0 right-0 p-4 opacity-10 font-display text-6xl font-bold select-none z-0 text-white transition-opacity duration-500 group-hover:opacity-20">
                        {idx + 1}
                    </div>
                    
                    <div className="relative z-10 p-8 flex flex-col h-full justify-between">
                        
                        {/* TOP SECTION: Name & Badges */}
                        <div>
                            <div className="mb-4 transform transition-transform duration-500 group-hover:translate-x-1">
                                <h3 className="text-2xl font-display text-slate-100 relative drop-shadow-lg tracking-wide group-hover:text-white">
                                    {npc.name}
                                </h3>
                                <p className="text-sm text-gold font-russian italic relative drop-shadow-md">
                                    {npc.russianName}
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 transform transition-transform duration-500 delay-75 group-hover:translate-x-1">
                                <span className="inline-block px-3 py-1 bg-slate-900/80 border border-slate-700 text-xs text-slate-400 uppercase tracking-widest backdrop-blur-md shadow-lg group-hover:bg-slate-950 group-hover:text-gold group-hover:border-gold/50 transition-colors">
                                    {npc.relation}
                                </span>
                                {(npc.age || npc.birthday) && (
                                    <span className="inline-block px-3 py-1 bg-slate-900/80 border border-slate-700 text-xs text-slate-400 uppercase tracking-widest backdrop-blur-md shadow-lg group-hover:bg-slate-950 group-hover:text-gold group-hover:border-gold/50 transition-colors">
                                        {[npc.age, npc.birthday].filter(Boolean).join(' | ')}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* BOTTOM SECTION: Description & Quote */}
                        <div className="transform transition-transform duration-500 delay-100 group-hover:translate-x-1 mt-auto">
                            <p className="text-slate-300 leading-relaxed text-sm break-keep relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-slate-100 transition-colors mb-6">
                                {npc.description}
                            </p>

                            {npc.quote && (
                                <div className="pt-6 border-t border-slate-700/30 group-hover:border-slate-500/50 transition-colors">
                                    <p className="font-myeongjo italic text-slate-400 text-center break-keep relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] group-hover:text-slate-200 transition-colors">
                                        "{npc.quote}"
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                    
                    {/* Hover Effect Bar */}
                    <div className={`absolute bottom-0 left-0 h-1 w-0 ${idx === 0 ? 'bg-blood' : 'bg-gold'} group-hover:w-full transition-all duration-700 ease-out z-20`}></div>
                </div>
            )})}
        </div>
      </div>
    </section>
  );
};

export default RelationshipSection;