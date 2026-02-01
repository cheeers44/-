import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw, X } from 'lucide-react';

// --- Expanded Content Data ---

const LETTER_CONTENTS = [
  // 1. Basic Worry
  {
    date: "1916년 11월 12일",
    body: [
        "사랑하는 니콜라이,",
        "오늘따라 궁의 공기가 너무나 차갑게 느껴져요. 창밖으로 당신의 부대가 지나가는 것을 보았습니다.",
        "사람들이 당신을 '차르의 사냥개'라 부르며 두려워하지만, 제 눈에는 그저 지친 오빠의 등만 보일 뿐이에요.",
        "부디 다치지 말아요. 제 곁에 남은 건 당신뿐이니까요."
    ],
    from: "너의 아나스타샤"
  },
  // 2. Childhood Memory - Sea
  {
    date: "작성일 미상, 낡은 편지",
    body: [
        "기억나요? 우리가 어렸을 때 크림반도 별장에서 보냈던 여름 말이에요.",
        "그때 오빠가 만들어준 모래성이 파도에 쓸려갈 때 제가 울었었죠. 오빠는 '내가 다시 지어줄게'라고 했고요.",
        "지금 우리의 제국이 파도 앞의 모래성 같아요. 이번에도 오빠가 지켜줄 수 있을까요? ...아니, 차라리 무너졌으면 좋겠어요."
    ],
    from: "A.V."
  },
  // 3. Guilt
  {
    date: "깊은 밤, 눈물 자국이 있는 편지",
    body: [
        "미안해요.",
        "오늘 폐하께서 오빠가 진압한 시위에 대해 말씀하시며 웃으셨어요. 저는 따라 웃어야만 했어요.",
        "나를 지키기 위해 오빠의 손이 피로 물들어가는 걸 지켜보는 게, 죽는 것보다 더 고통스러워요.",
        "용서하지 말아요."
    ],
    from: "죄 많은 동생이"
  },
  // 4. Warning - Rasputin
  {
    date: "급하게 휘갈겨 쓴 쪽지",
    body: [
        "오라버니, 조심하세요.",
        "그 '수도사'가 폐하께 오라버니의 부대에 대해 속삭이는 걸 들었어요. 불순한 사상이 의심된다나 뭐라나.",
        "당분간은 눈에 띄지 않게 행동하세요. 제발요. 내가 어떻게든 수습해볼게요."
    ],
    from: "아나스타샤"
  },
  // 5. Gift - Scarf
  {
    date: "1917년 1월, 소포와 함께",
    body: [
        "날씨가 많이 추워졌죠? 목도리를 하나 짰어요. 솜씨가 없어서 좀 투박하지만, 군복 안이 따뜻했으면 해요.",
        "색이 너무 밝으면 군율에 어긋날까 봐 검은색 털실을 썼어요.",
        "이걸 두를 때마다 제 기도가 당신을 감싸고 있다고 생각해주세요."
    ],
    from: "당신의 여동생"
  },
  // 6. Tsar's Violence (Hidden)
  {
    date: "향수 냄새가 짙은 편지",
    body: [
        "걱정 마세요, 오빠. 저번 연회 때 얼굴이 창백해 보였다고 하셨죠? 그저 피곤해서 그랬을 뿐이에요.",
        "폐하께서는... 여전히 다정하세요. 정말이에요.",
        "그러니 제 걱정은 말고 임무에만 집중하세요. 오빠가 무너지면 저도 무너져요."
    ],
    from: "황후 아나스타샤"
  },
  // 7. Nightmare
  {
    date: "새벽 3시",
    body: [
        "또 악몽을 꿨어요.",
        "사람들이 궁으로 들이닥치고, 붉은 깃발이 휘날리는 꿈. 그리고 그 한가운데 오빠가 쓰러져 있었어요.",
        "잠들기가 무서워요. 어릴 때처럼 오빠가 머리맡에서 동화책을 읽어주던 때로 돌아가고 싶어요."
    ],
    from: "겁쟁이 아나스타샤"
  },
  // 8. Secret Meeting
  {
    date: "책갈피 사이에 끼워진 쪽지",
    body: [
        "이번 주 일요일, 황실 예배당 뒤편 정원에 잠시 머물 수 있어요?",
        "공식적인 알현은 귀족들의 눈이 너무 많아서 숨이 막혀요. 그냥, 멀리서라도 오빠 얼굴을 보고 싶어서요.",
        "5분이면 돼요. 기다릴게요."
    ],
    from: "A"
  },
  // 9. About Kasha (Horse)
  {
    date: "평온해 보이는 편지",
    body: [
        "카샤는 잘 지내나요? 그 아이가 좋아하는 각설탕을 좀 보낼게요.",
        "오빠가 유일하게 마음을 여는 상대가 말이라서 다행이면서도, 가끔은 그 말이 질투가 나네요.",
        "농담이에요. 카샤에게 안부 전해주세요. 주인 좀 잘 지키라고."
    ],
    from: "동생"
  },
  // 10. Run Away
  {
    date: "불에 그슬린 흔적이 있는 편지",
    body: [
        "가끔 상상해요. 우리가 귀족이 아니었다면, 그저 시골의 평범한 농부의 자식들이었다면 어땠을까.",
        "가난해도 서로 웃을 수 있었을 텐데. 지금은 비단 옷을 입고 서로를 위해 울기만 하네요.",
        "도망칠까요? 오빠. 세상 끝으로."
    ],
    from: "꿈꾸는 아나스타샤"
  },
  // 11. Riot Aftermath
  {
    date: "피의 일요일 추모일",
    body: [
        "오늘따라 눈이 붉어 보여요.",
        "사람들이 오빠를 살인자라 욕해도, 저는 알아요. 오빠가 그날 밤새도록 떨며 술을 마셨다는 걸.",
        "신께서 우리를 벌하실까요? 아니면 이미 벌을 받고 있는 걸까요?"
    ],
    from: "당신의 공범자"
  },
  // 12. Tea
  {
    date: "마른 찻잎과 함께",
    body: [
        "영국에서 들어온 홍차예요. 향이 좋아서 오빠 생각이 났어요.",
        "보드카만 마시지 말고, 가끔은 따뜻한 차도 마셔요. 속 버려요.",
        "다음에 만날 땐 술 냄새 말고 차 냄새가 났으면 좋겠어요."
    ],
    from: "잔소리꾼 동생"
  },
  // 13. Resignation
  {
    date: "짧은 서신",
    body: [
        "소문 들었어요. 혁명군이 네바 강까지 진출했다면서요.",
        "만약... 만약의 상황이 오면, 저를 구하러 오지 마세요.",
        "오빠라도 살아야 해요. 이게 제 마지막 명령이에요, 대위."
    ],
    from: "황후"
  },
  // 14. Happy Memory
  {
    date: "1915년 봄을 회상하며",
    body: [
        "작년 무도회 때 오빠가 몰래 춤 신청해줬던 거 기억나요?",
        "모두가 가면을 쓰고 서로를 속이는 와중에, 오빠의 손만이 유일한 진실처럼 느껴졌어요.",
        "그 순간만큼은 황후가 아니라, 그냥 니콜라이의 여동생일 수 있었어요."
    ],
    from: "아나스타샤"
  },
  // 15. Cold Weather
  {
    date: "눈 오는 날",
    body: [
        "상트페테르부르크의 겨울은 너무 길어요.",
        "오빠의 관사는 난방이 잘 되나요? 장작을 좀 보낼까요?",
        "제 방은 벽난로를 아무리 때도 추워요. 마음이 시려서 그런가 봐요."
    ],
    from: "A.V."
  },
  // 16. Parent's Grave
  {
    date: "기일",
    body: [
        "어제 부모님 묘소에 다녀왔어요.",
        "어머니께 빌었어요. 우리 오빠, 더 이상 아프지 않게 해달라고. 피 냄새 맡지 않게 해달라고.",
        "오빠도 시간 나면 한 번 가봐요. 빈손으로 가도 반겨주실 거예요."
    ],
    from: "동생"
  },
  // 17. Looking at the Moon
  {
    date: "늦은 밤",
    body: [
        "창밖의 달을 보고 있나요? 저도 보고 있어요.",
        "우리가 같은 달을 보고 있다는 사실만이 저를 위로해주네요.",
        "오늘 밤은 꿈에서라도 만나요."
    ],
    from: "아나스타샤"
  },
  // 18. About a Portrait
  {
    date: "화가의 방문 이후",
    body: [
        "오늘 궁정 화가가 제 초상화를 그리러 왔어요.",
        "그가 그러더군요. '황후 마마, 눈이 슬퍼 보이십니다. 좀 웃으세요.'",
        "오빠가 없는 곳에서 제가 어떻게 웃을 수 있겠어요."
    ],
    from: "A"
  },
  // 19. Secret Code
  {
    date: "아무 의미 없어 보이는 시 구절",
    body: [
        "'겨울이 오면, 늑대들은 숲으로 숨는다.'",
        "'가장 깊은 굴이 가장 안전하다.'",
        "(오빠, 상황이 안 좋아요. 당분간 몸을 사리라는 뜻이에요. 알아들었죠?)"
    ],
    from: "A.V."
  },
  // 20. Just Miss You
  {
    date: "눈물로 번진 글씨",
    body: [
        "보고 싶어.",
        "보고 싶어, 오빠.",
        "그냥... 너무 보고 싶어요."
    ],
    from: "나샤"
  }
];

const ROULETTE_QUOTES = [
  "아직 내 자리는 지옥에도 없는 모양이야.",
  "신조차 나를 거부하는 건가.",
  "비겁한 안도감이 드는 게 역겨워.",
  "오늘은 죽을 날이 아닙니다.",
  "손이 떨리는 걸 보니, 아직 살고 싶은가 봐.",
  "차가운 금속성 소리가 심장을 긁고 지나가네.",
  "6분의 1. 전선에서의 생존 확률보단 높아.",
  "아나스타샤... 네가 아니었다면 벌써 끝냈어.",
  "빈 소리가 공허해. 마치 내 속처럼.",
  "또 살아남았다. 저주스럽게도.",
  "피 묻은 손이라 미끄러운 건가.",
  "침묵. 지금 누릴 수 있는 유일한 평화지.",
  "죽음은 도망자에게만 찾아오는 법이야.",
  "차라리 여기서 끝났다면 편했을 텐데.",
  "황제 폐하 만세. ...하, 우습지도 않어.",
  "귓가에 비명소리가 쟁쟁해.",
  "다음은 실탄일까. 확인해볼까.",
  "겁쟁이 녀석. 넌 결국 못 죽어.",
  "총구에서 비릿한 쇠 맛이 난다.",
  "운명은 잔인해. 내게 쉴 틈을 주지 않아.",
  "아직 흘려야 할 피가 남았다는 뜻인가.",
  "...지긋지긋해."
];

const VODKA_QUOTES = [
  "이 술이 없으면 잠들 수 없어. 비명소리가 너무 선명해서.",
  "아나스타샤... 네가 행복하다면, 내 지옥 따위는 상관없어.",
  "가끔은 그냥 평범한 남자로 살고 싶었어. 총 대신 꽃을 든.",
  "차가운 보드카가 식도를 태우네. 이제야 좀 살 것 같군.",
  "폐하를 위해 죽는 것? 아니, 난 오직 그녀를 위해 죽을 뿐이야.",
  "피 냄새가 지워지지 않아. 아무리 씻어도.",
  "오늘 본 아이의 눈동자가... 잊혀지질 않는군.",
  "취하지 않으면 버틸 수 없는 밤이 있어.",
  "내일도 명령을 따라야겠지. 기계처럼.",
  "신이 있다면, 나 같은 놈은 가장 먼저 버리겠지.",
  "손이 떨리는 건 추위 때문이 아니야. ...알고 있잖아.",
  "도망치고 싶어. 너와 함께, 아무도 없는 곳으로.",
  "거울 속의 내가 낯설어. 괴물 같아서.",
  "따뜻한 차 한 잔... 그리고 네 미소. 그거면 충분했는데.",
  "이게 마지막 잔이야. ...거짓말이지만."
];

const InteractiveDesk: React.FC = () => {
  // State for Russian Roulette
  const [bulletPosition, setBulletPosition] = useState<number>(Math.floor(Math.random() * 6));
  const [chamber, setChamber] = useState<number>(0);
  
  // Separation of Dialogue and Visual Action Text
  const [rouletteText, setRouletteText] = useState<string | null>(null);
  const [actionText, setActionText] = useState<string>("READY");
  
  const [isFired, setIsFired] = useState(false);
  const [flash, setFlash] = useState(false);
  
  // Track last index to prevent repeats
  const lastQuoteIndex = useRef<number>(-1);
  const lastVodkaIndex = useRef<number>(-1);
  const lastLetterIndex = useRef<number>(-1);

  // State for Vodka (Drunkenness)
  const [drunkLevel, setDrunkLevel] = useState(0);

  // State for Letter
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(LETTER_CONTENTS[0]);

  // Helper to get random non-repeating item
  const getRandomIndex = (length: number, lastIndexRef: React.MutableRefObject<number>) => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * length);
    } while (length > 1 && newIndex === lastIndexRef.current);
    
    lastIndexRef.current = newIndex;
    return newIndex;
  };

  // Reset visual effects after time
  useEffect(() => {
    if (flash) {
      const timer = setTimeout(() => setFlash(false), 200);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  // Vodka effect decay
  useEffect(() => {
    if (drunkLevel > 0) {
      const timer = setInterval(() => {
        setDrunkLevel(prev => Math.max(0, prev - 0.1)); 
      }, 100);
      return () => clearInterval(timer);
    }
  }, [drunkLevel]);

  // Actions
  const handleRoulette = () => {
    if (isFired) {
      // Reload
      setActionText("RELOADING...");
      setRouletteText(null); // Clear dialogue during reload
      
      // Add delay for effect
      setTimeout(() => {
        setBulletPosition(Math.floor(Math.random() * 6));
        setChamber(0);
        setIsFired(false);
        setActionText("READY");
      }, 800);
      return;
    }

    // Spin/Pull Trigger logic
    if (chamber === bulletPosition) {
      // BANG
      setFlash(true);
      setIsFired(true);
      setActionText("BANG!");
      setRouletteText("아, 드디어 침묵이 찾아오는군.");
      setDrunkLevel(0);
    } else {
      // Click - Get unique random quote
      setChamber((prev) => (prev + 1) % 6);
      const idx = getRandomIndex(ROULETTE_QUOTES.length, lastQuoteIndex);
      setActionText("CLICK");
      setRouletteText(ROULETTE_QUOTES[idx]);
    }
  };

  const handleDrink = () => {
    if (drunkLevel > 5) {
      setActionText("TOO DRUNK");
      setRouletteText("더 이상 마시면 방아쇠를 당길 힘도 없을 것 같군.");
      return;
    }
    setDrunkLevel(prev => prev + 2);
    
    // Get unique random inner thought
    const idx = getRandomIndex(VODKA_QUOTES.length, lastVodkaIndex);
    setActionText("GULP");
    setRouletteText(VODKA_QUOTES[idx]);
  };

  const handleOpenLetter = () => {
    // Get unique random letter
    const idx = getRandomIndex(LETTER_CONTENTS.length, lastLetterIndex);
    setCurrentLetter(LETTER_CONTENTS[idx]);
    setIsLetterOpen(true);
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-slate-900">
       {/* Screen Flash Effect (Red for Gunshot) */}
       <div className={`fixed inset-0 bg-red-600 z-[9999] pointer-events-none transition-opacity duration-75 ${flash ? 'opacity-40' : 'opacity-0'}`}></div>

       {/* Drunken Blur Effect Overlay */}
       <div 
        className="fixed inset-0 pointer-events-none z-[50] transition-all duration-300 ease-out"
        style={{ 
            backdropFilter: `blur(${drunkLevel}px)`,
            opacity: drunkLevel > 0 ? 1 : 0 
        }}
       ></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display text-slate-200 mb-2">대위의 책상</h2>
          <p className="text-slate-500 font-myeongjo italic">The Captain's Desk</p>
          <div className="w-16 h-1 bg-slate-800 mx-auto mt-4"></div>
        </div>

        {/* Desk Surface */}
        <div className="bg-black rounded-sm p-8 md:p-12 shadow-2xl border border-slate-800 relative">
            
            {/* Texture/Grain */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>

            {/* Status Text Area */}
            <div className="mb-12 h-20 flex flex-col items-center justify-center gap-2">
                {/* Visual FX Text */}
                <p className={`font-display text-sm font-bold tracking-[0.3em] uppercase transition-colors duration-100 ${flash ? 'text-red-500' : 'text-slate-500'}`}>
                    {actionText}
                </p>
                {/* Dialogue */}
                <p className={`font-myeongjo text-lg md:text-xl text-slate-300 italic transition-all duration-300 h-8 ${flash ? 'text-red-500/80 scale-105 font-bold' : ''}`}>
                    {rouletteText ? `"${rouletteText}"` : "..."}
                </p>
            </div>

            {/* Interactive Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center items-end h-full">
                
                {/* 1. The Revolver (Replaced with Image) */}
                <div className="group flex flex-col items-center gap-4">
                    <button 
                        onClick={handleRoulette}
                        className={`relative w-64 h-40 flex items-center justify-center transition-all duration-200 
                        ${actionText === "RELOADING..." ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'}
                        `}
                        title="Revolver"
                        disabled={actionText === "RELOADING..."}
                    >
                         <img 
                            src="https://i.postimg.cc/rm9dZW5P/gun.png" 
                            alt="Revolver" 
                            className={`w-full h-full object-contain drop-shadow-2xl transition-transform duration-100 ease-out
                                ${actionText === "BANG!" ? "-rotate-6 translate-x-2" : "rotate-0"}
                            `}
                         />
                         
                         {actionText === "RELOADING..." && (
                             <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full blur-xl">
                                 <RefreshCcw size={48} className="text-white animate-spin drop-shadow-md" />
                             </div>
                         )}
                    </button>
                    
                    {/* Visual Cylinder Indicator */}
                    <div className="flex flex-col items-center gap-2 mt-[-20px]"> 
                         <div className="flex gap-2">
                            {[0, 1, 2, 3, 4, 5].map((idx) => (
                                <div 
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        idx === chamber 
                                            ? (isFired ? 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)] scale-125' : 'bg-gold shadow-[0_0_8px_rgba(197,160,89,0.8)] scale-125') 
                                            : (idx < chamber ? 'bg-slate-800' : 'bg-slate-700')
                                    }`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between w-full px-2 text-[10px] uppercase tracking-widest text-slate-500 font-mono gap-4">
                            <span>{isFired ? "EMPTY" : `CYLINDER ${chamber + 1}/6`}</span>
                            <span>{isFired ? "LOADED: 0" : "LOADED: 1"}</span>
                        </div>
                    </div>
                    
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-400 transition-colors mt-2">
                        {isFired ? "RELOAD" : "PULL TRIGGER"}
                    </span>
                </div>

                {/* 2. The Letter */}
                <div className="group flex flex-col items-center gap-4">
                     <button 
                        onClick={handleOpenLetter}
                        className="relative w-56 h-40 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                        title="Read Letter"
                    >
                         <img 
                            src="https://i.postimg.cc/Zqb0BnGd/letter.png" 
                            alt="Letter" 
                            className="w-full h-full object-contain drop-shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-500"
                        />
                    </button>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-400 transition-colors">
                        READ LETTER
                    </span>
                </div>

                {/* 3. The Vodka */}
                <div className="group flex flex-col items-center gap-4">
                    <button 
                        onClick={handleDrink}
                        className="relative w-32 h-60 flex items-center justify-center transition-all duration-300 hover:scale-105 active:rotate-12"
                    >
                        <img 
                            src="https://i.postimg.cc/25SnWrM4/jan.png" 
                            alt="Vodka" 
                            className={`w-full h-full object-contain drop-shadow-2xl transition-all duration-300 ${drunkLevel > 4 ? 'opacity-70 blur-[1px]' : 'opacity-100'}`} 
                        />
                    </button>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-600 group-hover:text-slate-400 transition-colors">
                        DRINK
                    </span>
                </div>
            </div>
        </div>
      </div>

      {/* Letter Modal */}
      {isLetterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsLetterOpen(false)}>
            <div 
                className="bg-[#f0e6d2] text-slate-900 p-8 md:p-12 max-w-lg w-full shadow-2xl relative rotate-1"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={() => setIsLetterOpen(false)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-red-900 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="font-myeongjo leading-relaxed space-y-4">
                    <p className="italic text-sm text-slate-600 text-right">{currentLetter.date}</p>
                    {currentLetter.body.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                    <p className="text-right mt-8">
                        <span className="font-display font-bold">{currentLetter.from}</span>
                    </p>
                </div>
                
                {/* Visual tear/blood */}
                <div className="absolute top-0 left-12 w-24 h-24 bg-gradient-to-br from-slate-900/5 to-transparent rounded-full blur-xl pointer-events-none"></div>
            </div>
        </div>
      )}

    </section>
  );
};

export default InteractiveDesk;