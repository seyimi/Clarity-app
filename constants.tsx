
import { Subscription, CashFlowPoint } from './types';

export const PRIMARY_COLOR = '#1D4ED8';
export const ACCENT_COLOR = '#22C55E';
export const WARNING_COLOR = '#F59E0B';
export const DANGER_COLOR = '#DC2626';

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: '1',
    name: 'Adobe Creative Cloud',
    category: 'Design',
    amount: 54.99,
    billingCycle: 'monthly',
    nextPaymentDate: '2024-05-15',
    usageFrequency: 85,
    logo: 'https://picsum.photos/seed/adobe/40/40'
  },
  {
    id: '2',
    name: 'Netflix Premium',
    category: 'Entertainment',
    amount: 19.99,
    billingCycle: 'monthly',
    nextPaymentDate: '2024-05-12',
    usageFrequency: 20,
    recommendation: 'Potential Cancellation',
    logo: 'https://picsum.photos/seed/netflix/40/40'
  },
  {
    id: '3',
    name: 'AWS Instance - Production',
    category: 'Infrastructure',
    amount: 450.00,
    billingCycle: 'monthly',
    nextPaymentDate: '2024-05-20',
    usageFrequency: 100,
    logo: 'https://picsum.photos/seed/aws/40/40'
  },
  {
    id: '4',
    name: 'Spotify Family',
    category: 'Entertainment',
    amount: 16.99,
    billingCycle: 'monthly',
    nextPaymentDate: '2024-05-08',
    usageFrequency: 95,
    isDuplicate: true,
    recommendation: 'Duplicate Detected (Personal)',
    logo: 'https://picsum.photos/seed/spotify/40/40'
  },
  {
    id: '5',
    name: 'Cursor AI Pro',
    category: 'Development',
    amount: 20.00,
    billingCycle: 'monthly',
    nextPaymentDate: '2024-05-25',
    usageFrequency: 98,
    logo: 'https://picsum.photos/seed/cursor/40/40'
  },
  {
    id: '6',
    name: 'LinkedIn Premium',
    category: 'Professional',
    amount: 39.99,
    billingCycle: 'monthly',
    nextPaymentDate: '2024-05-10',
    usageFrequency: 5,
    recommendation: 'Low Engagement',
    logo: 'https://picsum.photos/seed/linkedin/40/40'
  }
];

export const MOCK_CASH_FLOW: CashFlowPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2024, 4, i + 1).toISOString().split('T')[0];
  const baseBalance = 12500;
  const variance = Math.sin(i / 5) * 1000;
  const isDebit = i % 7 === 0;
  return {
    date,
    balance: baseBalance + variance - (isDebit ? 800 : 0),
    isDebit,
    description: isDebit ? 'Major Debit' : undefined
  };
});
