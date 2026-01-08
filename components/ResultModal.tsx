
import React from 'react';
import { Trophy, XCircle, ChevronRight, Share2, Wallet } from 'lucide-react';

interface Props {
  result: {
    won: boolean;
    amount: number;
  };
  commission: number;
  onClose: () => void;
}

const ResultModal: React.FC<Props> = ({ result, onClose, commission }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="w-full max-w-sm glass rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
        
        {/* Result Header */}
        <div className={`p-8 text-center ${result.won ? 'bg-gradient-to-b from-emerald-500/20 to-transparent' : 'bg-gradient-to-b from-red-500/20 to-transparent'}`}>
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${result.won ? 'bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]'}`}>
            {result.won ? <Trophy className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            {result.won ? 'YOU WON!' : 'DEFEATED'}
          </h2>
          <p className="text-sm text-gray-400 font-medium">
            {result.won ? 'Flawless performance at the table!' : 'Rough break, but you\'ll bounce back.'}
          </p>
        </div>

        {/* Stats Table */}
        <div className="px-8 pb-4 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Winnings</span>
            <span className={`text-lg font-black ${result.won ? 'text-emerald-400' : 'text-white'}`}>
              ৳{result.won ? result.amount.toFixed(0) : '0'}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/5">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Commission</span>
              <span className="text-[10px] text-gray-600 font-medium italic">10% for the house</span>
            </div>
            <span className="text-sm font-bold text-red-400/80">-৳{commission.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center py-3">
             <span className="text-sm font-bold text-gray-200 uppercase tracking-widest">Net Total</span>
             <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-500" />
                <span className="text-xl font-black text-white">৳{result.won ? result.amount.toFixed(0) : '0'}</span>
             </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-8 pt-0 flex flex-col gap-3">
          <button 
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-50 active:scale-95 transition-all shadow-lg"
          >
            Return to Lobby
            <ChevronRight className="w-5 h-5" />
          </button>
          
          <button className="w-full py-3 rounded-2xl glass border border-white/10 text-white font-bold text-sm uppercase flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 transition-all">
            <Share2 className="w-4 h-4" />
            Share Highlight
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
