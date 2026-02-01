import React from 'react';
import { ChevronDown } from 'lucide-react';
import { NIKOLAI } from '../constants';

const Hero: React.FC = () => {
  const russianNameParts = NIKOLAI.russianName.split(' ');

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
      {/* Background Image Placeholder with Filter */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        <img 
          src="https://i.postimg.cc/gkr44dxT/siwi.jpg" 
          alt="Winter St. Petersburg" 
          className="w-full h-full object-cover object-top opacity-40 grayscale-[30%]"
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto space-y-6">
        <div className="border-b border-blood w-24 mx-auto mb-6"></div>
        <h2 className="text-gold tracking-[0.2em] text-sm md:text-lg font-myeongjo uppercase font-bold">
          {NIKOLAI.role}
        </h2>
        {/* Main Title in Russian */}
        <h1 className="text-5xl md:text-8xl font-russian text-slate-200 font-bold tracking-tight">
          {russianNameParts[0]} <span className="text-blood">{russianNameParts[1]}</span>
        </h1>
        {/* Subtitle in Korean */}
        <p className="font-myeongjo italic text-slate-400 text-xl md:text-2xl mt-4">
          "{NIKOLAI.name}"
        </p>
        <p className="text-slate-400 max-w-xl mx-auto mt-6 leading-relaxed font-light break-keep">
          얼음과 귀족의 피로 빚어진 칼날, 의무로 얼룩진 삶. <br/>
          무너져가는 제국의 마지막 방패.
        </p>
      </div>

      <div className="absolute bottom-10 z-20 animate-bounce text-slate-500">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;