
import React from 'react';
import { User } from '../types';
import { Wallet, Bell, Menu } from 'lucide-react';

interface HeaderProps {
  user: User;
  onWalletClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onWalletClick }) => {
  const xpPercentage = (user.xp / 1000) * 100;

  return (
    <header className="px-5 py-4 flex flex-col gap-3 glass sticky top-0 z-40 border-b border-white/5 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-emerald-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center shadow-lg border border-white/10 overflow-hidden">
                  <img src="https://picsum.photos/seed/me/100" alt="Avatar" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 right-0 bg-emerald-500 px-1 rounded-tl-md border-l border-t border-white/20">
                    <span className="text-[8px] font-black text-black">{user.level}</span>
                  </div>
              </div>
          </div>
          <div>
            <h1 className="text-base font-black font-game tracking-tighter italic text-white leading-none">
              8BALL <span className="text-emerald-500">BD</span>
            </h1>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[10px] text-gray-400 font-bold">{user.name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={onWalletClick}
            className="flex items-center gap-2 bg-[#020617] px-4 py-2.5 rounded-2xl border border-white/5 shadow-inner active:scale-95 transition-all"
          >
            <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-black font-black text-[10px]">৳</span>
            </div>
            <span className="text-sm font-black text-white">{user.balance.toLocaleString()}</span>
          </button>
          <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-gray-400">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Level / XP Bar */}
      <div className="flex items-center gap-3 px-1">
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-700 shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
              style={{ width: `${xpPercentage}%` }} 
            />
        </div>
        <div className="flex items-center gap-1">
            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Level</span>
            <span className="text-[10px] font-black text-white">{user.level}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
