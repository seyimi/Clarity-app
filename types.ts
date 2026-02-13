
export enum AppView {
  DASHBOARD = 'dashboard',
  SUBSCRIPTIONS = 'subscriptions',
  FORECAST = 'forecast',
  INSIGHTS = 'insights'
}

export interface Subscription {
  id: string;
  name: string;
  category: string;
  amount: number;
  billingCycle: 'monthly' | 'annual';
  nextPaymentDate: string;
  usageFrequency: number; // 0 to 100
  isDuplicate?: boolean;
  recommendation?: string;
  logo?: string;
}

export interface CashFlowPoint {
  date: string;
  balance: number;
  isDebit: boolean;
  description?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
