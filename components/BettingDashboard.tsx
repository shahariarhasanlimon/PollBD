
import React from 'react';
import { Target, Users, ArrowRight } from 'lucide-react';
import { COMMISSION_RATE } from '../constants';

interface Tier {
  amount: number;
  label: string;
  color: string;
}

interface Props {
  tiers: Tier[];
  balance: number;
  onSelect: (amount: number) => void;
}

const BettingDashboard: React.FC<Props> = ({ tiers, onSelect, balance }) => {
  return (
    <div className="grid gap-5">
      {tiers.map((tier) => {
        const prize = (tier.amount * 2) * (1 - COMMISSION_RATE);
        
        return (
          <button
            key={tier.amount}
            disabled={balance < tier.amount}
            onClick={() => onSelect(tier.amount)}
            className={`relative group flex flex-col p-5 rounded-[2rem] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-l-8 border-b-2 shadow-2xl transition-all active:scale-[0.98] ${tier.color} ${balance < tier.amount ? 'opacity-40 grayscale pointer-events-none' : 'hover:translate-y-[-2px] hover:shadow-emerald-900/10'}`}
          >
            <div className="flex items-start justify-between w-full mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border border-white/10 ${tier.amount === 100 ? 'bg-emerald-500/20' : tier.amount === 300 ? 'bg-blue-500/20' : 'bg-amber-500/20'}`}>
                  <Target className={`w-7 h-7 ${tier.amount === 100 ? 'text-emerald-400' : tier.amount === 300 ? 'text-blue-400' : 'text-amber-400'}`} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-white text-lg tracking-tight">{tier.label}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{Math.floor(Math.random() * 100) + 50} Players</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Entry Fee</div>
                <div className="text-2xl font-black text-white italic font-game">৳{tier.amount}</div>
              </div>
            </div>
            
            <div className="w-full flex items-center justify-between bg-black/40 px-6 py-4 rounded-2xl border border-white/5">
                <div className="flex flex-col text-left">
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Total Prize</span>
                    <span className="text-xl font-black text-white italic font-game">৳{prize.toFixed(0)}</span>
                </div>
                <div className="bg-emerald-500 p-2 rounded-full text-black shadow-lg shadow-emerald-500/20 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5" />
                </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BettingDashboard;
