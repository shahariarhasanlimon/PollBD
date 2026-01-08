
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Target, Award, Play, RotateCcw } from 'lucide-react';
import { getMatchCommentary } from '../services/geminiService';

interface Props {
  onExit: () => void;
}

const PracticeArena: React.FC<Props> = ({ onExit }) => {
  const [shotPower, setShotPower] = useState(0);
  const [isShooting, setIsShooting] = useState(false);
  const [ballsRemaining, setBallsRemaining] = useState(8);
  const [coachFeedback, setCoachFeedback] = useState("Tap to charge your shot and clear the table.");
  const [powerIncreasing, setPowerIncreasing] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isShooting) {
      interval = setTimeout(() => {
        setIsShooting(false);
        setShotPower(0);
        if (ballsRemaining > 0) {
          setBallsRemaining(prev => prev - 1);
          const messages = [
            "Nice pocket! Keep your elbow tucked.",
            "Solid contact. Watch the cue ball spin.",
            "Great bank shot! Geometry is your friend.",
            "Perfect speed control.",
            "Clearance in progress! Focus on the next ball."
          ];
          const msg = messages[Math.floor(Math.random() * messages.length)];
          getMatchCommentary(`Practice shot: ${msg}`, 0).then(setCoachFeedback);
        }
      }, 1200);
    }
    return () => clearTimeout(interval);
  }, [isShooting, ballsRemaining]);

  const handleShot = () => {
    if (isShooting) return;
    setIsShooting(true);
  };

  const resetTable = () => {
    setBallsRemaining(8);
    setCoachFeedback("Table reset. Let's work on those fundamentals.");
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-300 space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <button onClick={onExit} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Exit Facility</span>
        </button>
        <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-500/30">
          <Target className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Training Session</span>
        </div>
      </div>

      <div className="aspect-[1/2] rounded-[2.5rem] bg-blue-900 border-[12px] border-[#3e2723] shadow-inner flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Subtle cloth texture overlay - Blue Felt for practice */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        
        {/* Table details */}
        <div className="absolute top-[-10px] left-[-10px] w-12 h-12 bg-black rounded-full shadow-inner" />
        <div className="absolute top-[-10px] right-[-10px] w-12 h-12 bg-black rounded-full shadow-inner" />
        <div className="absolute bottom-[-10px] left-[-10px] w-12 h-12 bg-black rounded-full shadow-inner" />
        <div className="absolute bottom-[-10px] right-[-10px] w-12 h-12 bg-black rounded-full shadow-inner" />

        <div className="relative w-full h-full flex flex-col items-center justify-between py-10">
          <div className="flex gap-2 flex-wrap justify-center max-w-[150px]">
            {[...Array(ballsRemaining)].map((_, i) => (
              <div 
                key={i} 
                className={`w-5 h-5 rounded-full shadow-lg ${i === 7 ? 'bg-black ring-1 ring-white/30' : 'bg-red-500'} ${isShooting && i === ballsRemaining - 1 ? 'animate-ping opacity-0' : 'scale-100'}`} 
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
             <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-700 ${isShooting ? '-translate-y-40 scale-0' : 'scale-100'}`} />
             <div className="h-40 w-1.5 bg-gradient-to-t from-gray-300/30 to-transparent rounded-full" />
          </div>
        </div>

        {/* Coach Commentary Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-md p-6 border-t border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-[10px] font-black uppercase text-blue-400 tracking-widest">Master Coach AI</div>
          </div>
          <p className="text-sm font-medium text-white min-h-[40px] leading-relaxed italic">
            "{coachFeedback}"
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Ball Control</span>
           <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{ballsRemaining} / 8 Left</span>
        </div>

        <button 
          onClick={handleShot}
          disabled={isShooting || ballsRemaining === 0}
          className={`w-full py-6 rounded-3xl flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl ${isShooting || ballsRemaining === 0 ? 'bg-gray-800 text-gray-500' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-900/40'}`}
        >
          {ballsRemaining === 0 ? (
            <span className="flex items-center gap-2 font-black uppercase italic tracking-tighter text-xl">Table Cleared!</span>
          ) : (
            <>
              <Play className={`w-6 h-6 ${isShooting ? 'animate-pulse' : ''}`} />
              <span className="font-black uppercase italic tracking-tighter text-xl">{isShooting ? 'STRIKING...' : 'TAKE SHOT'}</span>
            </>
          )}
        </button>

        {ballsRemaining === 0 && (
          <button 
            onClick={resetTable}
            className="w-full py-4 rounded-2xl glass border border-white/10 flex items-center justify-center gap-2 text-white font-bold text-sm uppercase"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Practice Rack
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeArena;
