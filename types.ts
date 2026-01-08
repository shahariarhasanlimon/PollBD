
export enum AppState {
  DASHBOARD = 'DASHBOARD',
  MATCHMAKING = 'MATCHMAKING',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
  WALLET = 'WALLET',
  PAYMENT_FORM = 'PAYMENT_FORM',
  PRACTICE = 'PRACTICE'
}

export interface User {
  id: string;
  name: string;
  balance: number;
  wins: number;
  losses: number;
  level: number;
  xp: number;
  phone?: string;
}

export interface Match {
  betAmount: number;
  prizePool: number;
  commission: number;
  opponent: {
    name: string;
    avatar: string;
    skill: number;
    level: number;
  };
}

export type PaymentMethod = 'bkash' | 'nagad';
