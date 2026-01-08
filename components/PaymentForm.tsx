
import React, { useState } from 'react';
import { PaymentMethod } from '../types';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface Props {
  method: PaymentMethod;
  onConfirm: (amount: number) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<Props> = ({ method, onConfirm, onCancel }) => {
  const [amount, setAmount] = useState<string>('500');
  const [phone, setPhone] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !amount) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirm(Number(amount));
      }, 1500);
    }, 2000);
  };

  const bgColor = method === 'bkash' ? 'bg-[#d12053]' : 'bg-[#f7941d]';

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Payment Successful!</h3>
        <p className="text-sm text-gray-400 font-medium px-8">Your balance is being updated. Redirecting to arena...</p>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <div className={`p-8 rounded-t-[2.5rem] ${bgColor} text-white flex justify-between items-center`}>
        <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">Secure Deposit</h3>
          <p className="text-xs opacity-80 font-bold uppercase tracking-widest">Gateway: {method}</p>
        </div>
        <img 
            src={method === 'bkash' ? "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/BKash_Logo.svg/1200px-BKash_Logo.svg.png" : "https://nagad.com.bd/wp-content/uploads/2021/04/nagad-logo-e1619421887955.png"} 
            className="w-16 h-16 object-contain bg-white rounded-2xl p-2"
            alt={method}
        />
      </div>

      <div className="glass p-8 rounded-b-[2.5rem] border-t-0 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Wallet Number</label>
            <input 
              required
              type="tel"
              placeholder="01XXXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Deposit Amount (৳)</label>
            <div className="grid grid-cols-3 gap-3">
              {['300', '500', '1000'].map(val => (
                <button 
                  key={val}
                  type="button"
                  onClick={() => setAmount(val)}
                  className={`py-3 rounded-xl border font-black text-sm transition-all ${amount === val ? 'bg-white text-black border-white' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'}`}
                >
                  ৳{val}
                </button>
              ))}
            </div>
          </div>

          <button 
            disabled={isProcessing}
            type="submit"
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 ${isProcessing ? 'bg-gray-700 cursor-not-allowed' : `${bgColor} hover:brightness-110 shadow-black/20`}`}
          >
            {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Payment'}
          </button>
          
          <button 
            type="button"
            onClick={onCancel}
            className="w-full py-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors"
          >
            Cancel Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
