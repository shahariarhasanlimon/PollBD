
import React, { useState, useEffect, useRef } from 'react';
import { Match } from '../types';
import { getMatchCommentary } from '../services/geminiService';
import { Loader2, User, Trophy, CircleDot, ChevronUp } from 'lucide-react';

interface Props {
  match: Match;
  isMatchmaking: boolean;
  onComplete: (won: boolean) => void;
}

const MatchArena: React.FC<Props> = ({ match, isMatchmaking, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [commentary, setCommentary] = useState("Setting up the rack...");
  const [gameStep, setGameStep] = useState(0);
  const [matchingAvatarIndex, setMatchingAvatarIndex] = useState(0);
  const stepsCount = 6;

  // Matchmaking simulation effect
  useEffect(() => {
    if (!isMatchmaking) return;
    const interval = setInterval(() => {
        setMatchingAvatarIndex(prev => (prev + 1) % 10);
    }, 100);
    return () => clearInterval(interval);
  }, [isMatchmaking]);

  useEffect(() => {
    if (isMatchmaking) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(Math.random() > match.opponent.skill), 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isMatchmaking, onComplete, match.opponent.skill]);

  useEffect(() => {
    if (isMatchmaking) return;

    const stepSize = 100 / stepsCount;
    const currentStep = Math.floor(progress / stepSize);

    if (currentStep > gameStep) {
      setGameStep(currentStep);
      const situations = [
        "Powerful break! The table is scattered.",
        "Perfect positioning on the side rail.",
        "Precision cue ball control on the 7-ball.",
        "High pressure safety play. Opponent snookered.",
        "Clearing the solids. Only the 8-ball remains.",
        "Final shot! Corner pocket called."
      ];
      
      const sit = situations[currentStep - 1] || "Intense tactical exchange!";
      getMatchCommentary(sit, match.betAmount).then(setCommentary);
    }
  }, [progress, gameStep, match.betAmount, isMatchmaking]);

  if (isMatchmaking) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center">
            <h2 className="text-3xl font-black italic font-game text-white tracking-tighter uppercase mb-1">Searching...</h2>
            <div className="flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global BD Matchmaking</span>
            </div>
        </div>

        <div className="w-full flex items-center justify-between px-6 gap-8 relative">
           <div className="flex flex-col items-center gap-4 flex-1">
             <div className="w-24 h-24 rounded-3xl border-4 border-emerald-500 p-1 shadow-2xl shadow-emerald-900/40 relative">
                <img src="https://picsum.photos/seed/me/200" className="w-full h-full object-cover rounded-2xl" alt="Player" />
                <div className="absolute -bottom-3 bg-emerald-500 px-3 py-1 rounded-full border-2 border-black text-black font-black text-xs">LV 5</div>
             </div>
             <div className="text-sm font-black text-white uppercase italic">You</div>
           </div>

           <div className="text-4xl font-black italic font-game text-emerald-500 animate-pulse">VS</div>

           <div className="flex flex-col items-center gap-4 flex-1">
             <div className="w-24 h-24 rounded-3xl border-4 border-white/10 p-1 shadow-xl bg-white/5 overflow-hidden relative">
                <img src={`https://picsum.photos/seed/opp${matchingAvatarIndex}/200`} className="w-full h-full object-cover rounded-2xl opacity-40 blur-[1px]" alt="Finding" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             </div>
             <div className="text-sm font-black text-gray-500 uppercase italic">Searching</div>
           </div>
        </div>

        <div className="glass px-8 py-5 rounded-[2rem] border-emerald-500/20 flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Entry Fee Locked</span>
            <div className="text-2xl font-black text-white italic font-game">৳{match.betAmount}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl border-2 border-white/20 p-1 relative shadow-lg">
            <img src="https://picsum.photos/seed/me/200" className="w-full h-full rounded-xl object-cover" alt="Player" />
            <div className="absolute -bottom-2 -right-2 bg-white text-black px-2 py-0.5 rounded-md font-black text-[9px]">LV 5</div>
          </div>
          <span className="text-[10px] font-black uppercase text-gray-500 mt-1">Player One</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-emerald-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase italic shadow-lg shadow-emerald-500/20 mb-2">High Stakes</div>
          <div className="text-xs font-black text-white italic font-game">৳{match.prizePool} PRIZE</div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl border-2 border-emerald-500 p-1 relative shadow-lg">
            <img src={match.opponent.avatar} className="w-full h-full rounded-xl object-cover" alt="Opponent" />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black px-2 py-0.5 rounded-md font-black text-[9px]">LV {match.opponent.level}</div>
          </div>
          <span className="text-[10px] font-black uppercase text-emerald-400 mt-1">{match.opponent.name}</span>
        </div>
      </div>

      {/* MINICLIP STYLE POOL TABLE */}
      <div className="aspect-[4/6] rounded-[3rem] bg-[#3e2723] border-[14px] border-[#2b1b19] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden group">
        
        {/* Table Felt */}
        <div className="absolute inset-0 m-2 rounded-[2rem] pool-table-green relative overflow-hidden">
            {/* Table Sights (Diamonds) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-16 py-1">
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-16 py-1">
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Light Reflection (Overhead Lamp Effect) */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-gradient-to-b from-white/10 to-transparent blur-3xl rounded-full" />

            {/* Pockets */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-black rounded-br-[3rem] shadow-inner border-r border-b border-white/5" />
            <div className="absolute top-0 right-0 w-16 h-16 bg-black rounded-bl-[3rem] shadow-inner border-l border-b border-white/5" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-black rounded-tr-[3rem] shadow-inner border-r border-t border-white/5" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-black rounded-tl-[3rem] shadow-inner border-l border-t border-white/5" />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-12 h-16 bg-black rounded-r-3xl border border-white/5 shadow-inner" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-12 h-16 bg-black rounded-l-3xl border border-white/5 shadow-inner" />

            {/* Cloth Texture Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '6px 6px' }} />

            {/* Game Simulation Logic Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-24 z-10">
                 {/* Rack Area */}
                 <div className="flex gap-2 flex-wrap justify-center max-w-[120px]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`w-5 h-5 rounded-full shadow-2xl border border-white/10 ${i % 2 === 0 ? 'bg-red-600' : 'bg-yellow-400'} ${progress > (i * 15) ? 'scale-0 opacity-0 translate-y-10' : 'scale-100'} transition-all duration-1000 ease-in-out`} />
                    ))}
                    <div className={`w-5 h-5 bg-black rounded-full shadow-2xl border border-white/20 ${progress > 90 ? 'animate-bounce' : ''}`} />
                 </div>

                 {/* Cue Ball & Stick */}
                 <div className="relative flex flex-col items-center">
                    <div className={`w-7 h-7 bg-white rounded-full shadow-xl relative z-20 ${progress < 100 ? 'animate-pulse' : ''}`} 
                         style={{ transform: `translateY(${-progress * 2}px)` }}>
                         <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-400 rounded-full" />
                    </div>
                    {/* Cue Stick Shadow */}
                    <div className="h-48 w-2 bg-gradient-to-t from-[#1a0f0d] to-transparent mt-4 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                 </div>
            </div>

            {/* COMMENTARY OVERLAY */}
            <div className="absolute inset-x-0 bottom-0 bg-[#020617]/90 backdrop-blur-md p-6 border-t border-white/10 z-20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <Trophy className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em]">Live Match Commentary</div>
              </div>
              <p className="text-sm font-bold text-white min-h-[44px] leading-tight">
                "{commentary}"
              </p>
            </div>
        </div>
      </div>

      <div className="mt-8 px-2 space-y-3">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Match State</span>
            <span className="text-xs font-black text-white italic uppercase tracking-tighter">
                {progress < 100 ? 'In Progress...' : 'Final Pocketing'}
            </span>
          </div>
          <span className="text-lg font-black italic font-game text-emerald-500">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-600 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default MatchArena;
