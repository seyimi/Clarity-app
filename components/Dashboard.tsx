
import React from 'react';
import { Card, SectionHeader, Badge } from './UI';
import { MOCK_CASH_FLOW, MOCK_SUBSCRIPTIONS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const currentBalance = 12450.60;
  const predictedBalance = 10120.45;
  const monthlyRecurring = MOCK_SUBSCRIPTIONS.reduce((acc, sub) => acc + sub.amount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <SectionHeader 
          title="Predictive Intelligence" 
          description="A forward-looking view of your recurring financial behavior." 
        />
        <div className="md:pb-8 flex items-center">
          <Badge variant="warning">
            <div className="flex items-center gap-1">
              <AlertCircle size={14} />
              3 Actionable Risk Alerts
            </div>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Current Balance" subtitle={`$${currentBalance.toLocaleString()}`}>
          <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium mt-2">
            <ArrowUpRight size={16} />
            +2.4% from last week
          </div>
        </Card>
        <Card title="Predicted End-of-Month" subtitle={`$${predictedBalance.toLocaleString()}`}>
          <div className="flex items-center gap-1 text-rose-600 text-sm font-medium mt-2">
            <ArrowDownRight size={16} />
            -18% projection
          </div>
        </Card>
        <Card title="Monthly Recurring Total" subtitle={`$${monthlyRecurring.toFixed(2)}`}>
          <div className="text-slate-500 text-sm mt-2">
            Across {MOCK_SUBSCRIPTIONS.length} active subscriptions
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card title="Cash Flow Forecast" className="lg:col-span-2">
          <div className="h-[250px] md:h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CASH_FLOW}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94A3B8' }}
                  tickFormatter={(val) => new Date(val).getDate().toString()}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94A3B8' }}
                  tickFormatter={(val) => `$${val/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(val: any) => [`$${val.toFixed(2)}`, 'Balance']}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#1D4ED8" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Upcoming Auto-Debits">
          <div className="space-y-6 mt-4">
            {MOCK_SUBSCRIPTIONS.slice(0, 4).map((sub) => (
              <div key={sub.id} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                  <img src={sub.logo} alt={sub.name} className="w-full h-full rounded-lg object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{sub.name}</p>
                  <p className="text-xs text-slate-500">May {new Date(sub.nextPaymentDate).getDate()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">${sub.amount.toFixed(2)}</p>
                  <Badge variant={sub.amount > 100 ? 'warning' : 'info'}>Auto</Badge>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            View All Timeline
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
