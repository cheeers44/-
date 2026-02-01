import React from 'react';
import { NIKOLAI } from '../constants';

const CharacterSheet: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Portrait & Basic Info (Sticky on large screens) */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-10 lg:self-start h-fit">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold via-blood to-gold rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-slate-700 bg-slate-900">
                   <img 
                    src="https://i.postimg.cc/T1MnTMd1/peulopil-2.jpg" 
                    alt="Nikolai Portrait" 
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                       <h3 className="text-3xl font-russian text-slate-100">{NIKOLAI.russianName}</h3>
                       <p className="text-blood font-myeongjo">{NIKOLAI.title}</p>
                   </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                <div className="bg-slate-900/80 p-4 border border-slate-800">
                    <span className="block text-slate-500 uppercase text-xs tracking-wider font-myeongjo">나이</span>
                    <span className="text-slate-200">{NIKOLAI.age}세</span>
                </div>
                <div className="bg-slate-900/80 p-4 border border-slate-800">
                    <span className="block text-slate-500 uppercase text-xs tracking-wider font-myeongjo">신장</span>
                    <span className="text-slate-200">{NIKOLAI.height}</span>
                </div>
                 <div className="bg-slate-900/80 p-4 border border-slate-800 col-span-2">
                    <span className="block text-slate-500 uppercase text-xs tracking-wider font-myeongjo">가문</span>
                    <span className="text-slate-200">{NIKOLAI.family}</span>
                </div>
            </div>
        </div>

        {/* Right Column: All Details Combined */}
        <div className="lg:col-span-8 space-y-16">
            
            {/* 1. Attributes & Equipment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                {/* Appearance */}
                <div>
                    <h4 className="text-gold font-myeongjo text-xl mb-4 flex items-center gap-2 font-bold"><span className="text-blood">⁕</span> 외형</h4>
                    <ul className="space-y-3">
                        {NIKOLAI.appearance.map((item, i) => (
                            <li key={i} className="text-slate-300 text-sm flex items-start gap-2 bg-slate-900/30 p-2 border-l border-slate-700">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Clothing */}
                <div>
                    <h4 className="text-gold font-myeongjo text-xl mb-4 flex items-center gap-2 font-bold"><span className="text-blood">⁕</span> 복장</h4>
                        <div className="space-y-3">
                        {Object.entries(NIKOLAI.clothing).map(([key, value]) => (
                            <div key={key} className="bg-slate-900/50 p-3 border border-slate-800">
                                <span className="text-xs uppercase text-slate-500 block mb-1 font-myeongjo">{key}</span>
                                <p className="text-slate-300 text-sm">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 2. Personality */}
            <div className="animate-fade-in">
                 <h4 className="text-gold font-myeongjo text-xl mb-4 flex items-center gap-2 font-bold"><span className="text-blood">⁕</span> 성격</h4>
                 <div className="flex flex-wrap gap-3">
                    {NIKOLAI.personality.map((p, i) => (
                        <span key={i} className="text-slate-300 text-sm bg-slate-900/80 px-4 py-2 rounded-sm border border-slate-700">
                            {p}
                        </span>
                    ))}
                </div>
            </div>

            {/* 3. Residence - Updated to Connected Floor Stack */}
            <div className="animate-fade-in">
                 <h4 className="text-gold font-myeongjo text-xl mb-4 flex items-center gap-2 font-bold"><span className="text-blood">⁕</span> 거주지: {NIKOLAI.residence.name}</h4>
                 <div className="bg-slate-900/20 p-6 border border-slate-800/50">
                    
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* Info Column */}
                        <div className="flex-1 space-y-4 w-full">
                            <div>
                                <span className="text-xs uppercase text-gold tracking-widest block mb-1 font-myeongjo">위치</span>
                                <p className="text-slate-300 font-serif italic text-lg border-l-2 border-gold pl-3">{NIKOLAI.residence.location}</p>
                            </div>
                            <div>
                                {/* Removed Description Label */}
                                <p className="text-slate-400 text-sm leading-relaxed">{NIKOLAI.residence.description}</p>
                            </div>
                            
                            {/* Exterior details */}
                            <div className="mt-4 pt-4 border-t border-slate-800/50">
                                <span className="text-xs uppercase text-slate-500 tracking-widest block mb-1 font-myeongjo">외부 (Exterior)</span>
                                <p className="text-slate-300 text-sm">{NIKOLAI.residence.structure.exterior}</p>
                            </div>
                        </div>

                        {/* Visual Floor Plan */}
                        <div className="flex-1 w-full max-w-sm mx-auto select-none pt-4">
                            <div className="flex flex-col w-full">
                                {/* Roof Visual */}
                                <div className="relative h-6 w-full opacity-60">
                                    <div className="absolute bottom-0 w-full border-b-4 border-slate-700"></div>
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-slate-700"></div>
                                </div>
                                
                                {/* 2F & 1F Combined Container */}
                                <div className="flex flex-col border border-slate-600 bg-slate-800/30 divide-y divide-slate-600/50 shadow-2xl">
                                    {/* 2F */}
                                    <div className="p-4 relative group hover:bg-slate-800/50 transition-colors">
                                        <span className="absolute top-2 right-2 text-slate-500 text-[10px] font-bold font-mono bg-slate-900/50 px-1">2F</span>
                                        <p className="text-slate-200 text-sm mt-1">{NIKOLAI.residence.structure.floor2}</p>
                                    </div>

                                    {/* 1F */}
                                    <div className="p-4 relative group hover:bg-slate-800/50 transition-colors">
                                        <span className="absolute top-2 right-2 text-slate-500 text-[10px] font-bold font-mono bg-slate-900/50 px-1">1F</span>
                                        <p className="text-slate-200 text-sm mt-1">{NIKOLAI.residence.structure.floor1}</p>
                                    </div>
                                </div>

                                {/* Ground Line */}
                                <div className="h-[2px] w-[110%] -ml-[5%] bg-slate-500 shadow-lg z-10 my-0 relative"></div>

                                {/* Basement */}
                                <div className="mx-3 border-x border-b border-slate-800 bg-black/40 p-4 relative group hover:bg-black/60 transition-colors shadow-inner rounded-b-sm">
                                    <span className="absolute top-2 right-2 text-slate-700 text-[10px] font-bold font-mono">B1</span>
                                    <p className="text-slate-500 text-sm mt-1">{NIKOLAI.residence.structure.basement}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                 </div>
            </div>

            {/* 4. Timeline (History WITHOUT Images) */}
            <div className="animate-fade-in">
                <h4 className="text-gold font-myeongjo text-xl mb-8 flex items-center gap-2 font-bold"><span className="text-blood">⁕</span> 과거의 기억</h4>
                <div className="border-l border-slate-800 ml-4 space-y-8 pb-4">
                    {NIKOLAI.background.past.map((event, i) => (
                        <div key={i} className="relative pl-10 group">
                            {/* Dot */}
                            <div className="absolute -left-[5px] top-4 w-2.5 h-2.5 rounded-full bg-slate-700 border border-slate-900 group-hover:bg-gold transition-colors z-10"></div>
                            
                            {/* Content Card (No Image) */}
                            <div className="bg-imperial/40 border border-slate-800/50 p-6 hover:border-slate-700 transition-colors">
                                <p className="text-slate-300 text-sm leading-relaxed font-serif">
                                    {event}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                    {/* Current Status Node */}
                    <div className="relative pl-10 pt-4">
                            <div className="absolute -left-[7px] top-8 w-3.5 h-3.5 rounded-full bg-blood border border-slate-900 animate-pulse z-10"></div>
                            <div className="bg-blood/5 border border-blood/20 p-6">
                                <span className="text-blood text-xs font-bold uppercase tracking-widest mb-3 block font-myeongjo">현재 — Current</span>
                                <div className="space-y-2">
                                    {NIKOLAI.background.current.map((c, i) => (
                                        <p key={i} className="text-slate-200 text-sm italic">"{c}"</p>
                                    ))}
                                </div>
                            </div>
                    </div>
                </div>
            </div>

            {/* 5. Preferences (Likes & Dislikes) */}
            <div className="animate-fade-in">
                 <h4 className="text-gold font-myeongjo text-xl mb-6 flex items-center gap-2 font-bold">취향</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Likes */}
                    <div className="bg-slate-900/30 p-6 border border-slate-800/50 rounded-sm">
                        <h5 className="text-slate-300 font-display mb-4 flex items-center gap-2 text-sm border-b border-slate-800 pb-2">
                            <span className="text-gold">⁕</span> 좋아하는 것
                        </h5>
                        <ul className="space-y-2">
                            {NIKOLAI.likes.map((like, i) => (
                                <li key={i} className="text-slate-400 text-sm pl-2 border-l-2 border-transparent hover:border-gold hover:text-slate-200 transition-all">
                                    {like}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Dislikes */}
                    <div className="bg-slate-900/30 p-6 border border-slate-800/50 rounded-sm">
                        <h5 className="text-slate-300 font-display mb-4 flex items-center gap-2 text-sm border-b border-slate-800 pb-2">
                             <span className="text-blood">⁕</span> 싫어하는 것
                        </h5>
                        <ul className="space-y-2">
                            {NIKOLAI.dislikes.map((dislike, i) => (
                                <li key={i} className="text-slate-400 text-sm pl-2 border-l-2 border-transparent hover:border-blood hover:text-slate-200 transition-all">
                                    {dislike}
                                </li>
                            ))}
                        </ul>
                    </div>
                 </div>
            </div>

        </div>

      </div>
    </section>
  );
};

export default CharacterSheet;