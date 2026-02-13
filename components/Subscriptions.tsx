
import React, { useState } from 'react';
import { SectionHeader, Card, Badge } from './UI';
import { MOCK_SUBSCRIPTIONS } from '../constants';
import { Layers, TrendingDown } from 'lucide-react';

const Subscriptions: React.FC = () => {
  const [billingFilter, setBillingFilter] = useState<'monthly' | 'annual' | 'all'>('all');

  const filtered = MOCK_SUBSCRIPTIONS.filter(s => billingFilter === 'all' || s.billingCycle === billingFilter);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <SectionHeader 
          title="Subscription Inventory" 
          description="Optimization and life-cycle management for recurring commitments." 
        />
        
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 self-start xl:self-center overflow-x-auto w-full xl:w-auto no-scrollbar">
          <button 
            onClick={() => setBillingFilter('all')}
            className={`flex-1 xl:flex-none px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${billingFilter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            All
          </button>
          <button 
            onClick={() => setBillingFilter('monthly')}
            className={`flex-1 xl:flex-none px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${billingFilter === 'monthly' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setBillingFilter('annual')}
            className={`flex-1 xl:flex-none px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${billingFilter === 'annual' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((sub) => (
          <Card key={sub.id} className="relative overflow-hidden group">
            {sub.isDuplicate && (
              <div className="absolute top-0 right-0 p-3">
                <Badge variant="warning">
                  <Layers size={12} className="inline mr-1" />
                  Duplicate
                </Badge>
              </div>
            )}
            
            <div className="flex items-start gap-4 mb-6">
              <img src={sub.logo} alt={sub.name} className="w-12 h-12 rounded-xl" />
              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{sub.name}</h4>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{sub.category}</p>
              </div>
            </div>

            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs text-slate-400">Monthly Expense</p>
                <p className="text-xl font-bold text-slate-900">${sub.amount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Next Payment</p>
                <p className="text-sm font-semibold text-slate-700">{new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500 font-medium">Usage Intelligence</span>
                <span className={`font-bold ${sub.usageFrequency > 50 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {sub.usageFrequency}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${sub.usageFrequency > 50 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                  style={{ width: `${sub.usageFrequency}%` }}
                />
              </div>
            </div>

            {sub.recommendation && (
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-2">
                <TrendingDown size={14} className="text-amber-500" />
                <span className="text-xs font-semibold text-amber-600">{sub.recommendation}</span>
              </div>
            )}

            <div className="mt-6 flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
              <button className="flex-1 py-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                Manage
              </button>
              <button className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors">
                Cancel
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
