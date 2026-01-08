
import React from 'react';
import { PaymentMethod } from '../types';
import { ChevronLeft, ArrowUpCircle, ShieldCheck } from 'lucide-react';

interface Props {
  balance: number;
  onSelectPayment: (method: PaymentMethod) => void;
  onBack: () => void;
}

const WalletView: React.FC<Props> = ({ balance, onSelectPayment, onBack }) => {
  return (
    <div className="animate-in slide-in-from-right-4 duration-300 space-y-6 pb-6">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest">Back to Arena</span>
      </button>

      <div className="relative overflow-hidden glass p-8 rounded-[2rem] border-2 border-emerald-500/20 shadow-2xl shadow-emerald-900/10">
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <ArrowUpCircle className="w-24 h-24" />
        </div>
        <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-2">Available Balance</h3>
        <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white opacity-40">৳</span>
            <span className="text-5xl font-black text-white font-game italic">{balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 px-1">Deposit via Secure Gateways</h4>
        
        <button 
          onClick={() => onSelectPayment('bkash')}
          className="w-full flex items-center justify-between p-6 rounded-3xl bkash-bg text-white shadow-lg active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-inner">
               <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/BKash_Logo.svg/1200px-BKash_Logo.svg.png" alt="bKash" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <span className="block text-lg font-black">bKash Fast Pay</span>
              <span className="text-xs opacity-70 font-medium">Instant balance update</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20">
            <span className="font-bold">+</span>
          </div>
        </button>

        <button 
          onClick={() => onSelectPayment('nagad')}
          className="w-full flex items-center justify-between p-6 rounded-3xl nagad-bg text-white shadow-lg active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-inner">
               <img src="https://nagad.com.bd/wp-content/uploads/2021/04/nagad-logo-e1619421887955.png" alt="Nagad" className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <span className="block text-lg font-black">Nagad Wallet</span>
              <span className="text-xs opacity-70 font-medium">Safe & Secure Payment</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20">
            <span className="font-bold">+</span>
          </div>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-500 py-4">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Secured by SSL Wireless</span>
      </div>
    </div>
  );
};

export default WalletView;
