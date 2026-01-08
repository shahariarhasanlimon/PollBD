
import React, { useState, useEffect } from 'react';
import { AppState, User, Match, PaymentMethod } from './types';
import { BETTING_TIERS, COMMISSION_RATE, OPPONENTS } from './constants';
import { getMatchCommentary, getBettingTip } from './services/geminiService';
import BettingDashboard from './components/BettingDashboard';
import MatchArena from './components/MatchArena';
import PracticeArena from './components/PracticeArena';
import Header from './components/Header';
import ResultModal from './components/ResultModal';
import WalletView from './components/WalletView';
import PaymentForm from './components/PaymentForm';
import { Trophy, Wallet, Zap, Home, Target } from 'lucide-react';

const STORAGE_KEY = '8ball_pool_bd_user_v2';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      id: 'user-1',
      name: 'BD_Pro_88',
      balance: 1000,
      wins: 0,
      losses: 0,
      level: 5,
      xp: 450
    };
  });

  const [gameState, setGameState] = useState<AppState>(AppState.DASHBOARD);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [matchResult, setMatchResult] = useState<{ won: boolean; amount: number } | null>(null);
  const [aiTip, setAiTip] = useState<string>("Master the cue, rule the board.");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    getBettingTip(user.balance).then(setAiTip);
  }, [gameState, user.balance]);

  const handleStartMatch = (betAmount: number) => {
    if (user.balance < betAmount) {
      setGameState(AppState.WALLET);
      return;
    }

    const rawOpponent = OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
    const opponent = {
        ...rawOpponent,
        level: Math.floor(Math.random() * 20) + 1
    };

    const totalPool = betAmount * 2;
    const commission = totalPool * COMMISSION_RATE;
    const prize = totalPool - commission;

    setCurrentMatch({
      betAmount,
      prizePool: prize,
      commission,
      opponent
    });

    setUser(prev => ({ ...prev, balance: prev.balance - betAmount }));
    setGameState(AppState.MATCHMAKING);

    setTimeout(() => {
      setGameState(AppState.PLAYING);
    }, 3500); // Longer delay to simulate the "Miniclip" matchmaking spinner
  };

  const onMatchEnd = (won: boolean) => {
    const prize = currentMatch?.prizePool || 0;
    const xpGain = won ? 100 : 25;
    
    setUser(prev => {
        let newXp = prev.xp + xpGain;
        let newLevel = prev.level;
        if (newXp >= 1000) {
            newLevel += 1;
            newXp -= 1000;
        }
        
        return {
            ...prev,
            balance: won ? prev.balance + prize : prev.balance,
            wins: won ? prev.wins + 1 : prev.wins,
            losses: won ? prev.losses : prev.losses + 1,
            xp: newXp,
            level: newLevel
        };
    });

    setMatchResult({ won, amount: prize });
    setGameState(AppState.RESULT);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl bg-[#040812]">
      <Header user={user} onWalletClick={() => setGameState(AppState.WALLET)} />

      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-4">
        {gameState === AppState.DASHBOARD && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="relative overflow-hidden glass p-5 rounded-3xl border-emerald-500/20 shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-10 -mt-10" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-emerald-500/20 p-2 rounded-xl">
                  <Zap className="text-emerald-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-1">CUE ANALYTICS</h3>
                  <p className="text-sm text-gray-200 italic font-medium">"{aiTip}"</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setGameState(AppState.PRACTICE)}
              className="w-full flex items-center justify-between p-5 rounded-3xl bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20 transition-all active:scale-95 group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-white text-base">Practice Offline</h4>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Training Room • 0 Fee</p>
                </div>
              </div>
              <div className="bg-blue-500/20 px-4 py-1.5 rounded-full text-[10px] font-black text-blue-300 uppercase border border-blue-500/30">Free Play</div>
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-black italic font-game uppercase tracking-tighter text-white">Match Lobby</h2>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">3,142 Online</span>
                </div>
              </div>
              <BettingDashboard 
                tiers={BETTING_TIERS} 
                onSelect={handleStartMatch} 
                balance={user.balance} 
              />
            </div>
          </div>
        )}

        {gameState === AppState.PRACTICE && (
          <PracticeArena onExit={() => setGameState(AppState.DASHBOARD)} />
        )}

        {gameState === AppState.WALLET && (
          <WalletView 
            balance={user.balance} 
            onSelectPayment={(method) => {
              setSelectedPaymentMethod(method);
              setGameState(AppState.PAYMENT_FORM);
            }} 
            onBack={() => setGameState(AppState.DASHBOARD)}
          />
        )}

        {gameState === AppState.PAYMENT_FORM && selectedPaymentMethod && (
          <PaymentForm 
            method={selectedPaymentMethod} 
            onConfirm={(amount) => {
                setUser(prev => ({ ...prev, balance: prev.balance + amount }));
                setGameState(AppState.DASHBOARD);
            }} 
            onCancel={() => setGameState(AppState.WALLET)} 
          />
        )}

        {(gameState === AppState.MATCHMAKING || gameState === AppState.PLAYING) && currentMatch && (
          <MatchArena 
            match={currentMatch} 
            isMatchmaking={gameState === AppState.MATCHMAKING}
            onComplete={onMatchEnd}
          />
        )}
      </main>

      {gameState === AppState.RESULT && matchResult && (
        <ResultModal 
          result={matchResult} 
          onClose={() => setGameState(AppState.DASHBOARD)} 
          commission={currentMatch?.commission || 0}
        />
      )}

      <footer className="sticky bottom-0 left-0 right-0 glass border-t border-white/10 px-8 py-4 flex justify-around items-center z-50 rounded-t-[2rem]">
        <button 
          onClick={() => setGameState(AppState.DASHBOARD)} 
          className={`flex flex-col items-center gap-1.5 transition-all ${gameState === AppState.DASHBOARD ? 'scale-110 text-emerald-500' : 'text-gray-500 opacity-60'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Lobby</span>
        </button>
        
        <div className="relative -mt-14">
            <div className="absolute inset-0 bg-emerald-500/30 blur-2xl rounded-full animate-pulse" />
            <button 
                onClick={() => setGameState(AppState.DASHBOARD)}
                className="relative bg-gradient-to-br from-emerald-400 to-green-600 p-4.5 rounded-full shadow-2xl border-4 border-[#040812] active:scale-90 transition-transform"
            >
                <Trophy className="w-8 h-8 text-white" />
            </button>
        </div>

        <button 
          onClick={() => setGameState(AppState.WALLET)} 
          className={`flex flex-col items-center gap-1.5 transition-all ${gameState === AppState.WALLET ? 'scale-110 text-emerald-500' : 'text-gray-500 opacity-60'}`}
        >
          <Wallet className="w-6 h-6" />
          <span className="text-[9px] font-black uppercase tracking-tighter">Bank</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
