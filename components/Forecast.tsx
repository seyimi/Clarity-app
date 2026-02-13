
import React, { useState } from 'react';
import { SectionHeader, Card, Badge } from './UI';
import { MOCK_CASH_FLOW } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { ShieldAlert, Zap, MousePointer2 } from 'lucide-react';

const Forecast: React.FC = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  
  const modifiedData = MOCK_CASH_FLOW.map(p => ({
    ...p,
    balance: p.balance * multiplier
  }));

  const riskPoints = modifiedData.filter(p => p.balance < 10000);

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <SectionHeader 
        title="Cash Flow Simulation" 
        description="Dynamic scenarios and predictive liquidity mapping for the next 30 days." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Card title="Interactive Balance Projection">
            <div className="h-[300px] lg:h-[450px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={modifiedData}>
                  <defs>
                    <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
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
                    tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94A3B8' }}
                    tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    cursor={{ stroke: '#1D4ED8', strokeWidth: 2 }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <ReferenceArea y1={0} y2={10000} fill="rgba(220, 38, 38, 0.05)" />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#1D4ED8" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorMain)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 gap-4">
                <label className="text-sm font-bold text-slate-700">Spend Scenario: {(multiplier * 100).toFixed(0)}% of Average</label>
                <Badge variant={multiplier > 1.2 ? 'warning' : 'success'}>
                  {multiplier > 1.2 ? 'High Risk Scenario' : 'Optimized Flow'}
                </Badge>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="2.0" 
                step="0.1" 
                value={multiplier} 
                onChange={(e) => setMultiplier(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">
                <span>Conservative</span>
                <span className="hidden sm:inline">Baseline</span>
                <span>Aggressive</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Risk Analysis">
            {riskPoints.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-rose-600">
                  <ShieldAlert size={20} />
                  <p className="text-sm font-bold">Liquidity Warning</p>
                </div>
                <p className="text-sm text-slate-500">
                  Your balance is projected to dip below the $10,000 safety threshold on {riskPoints.length} upcoming days.
                </p>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <p className="text-xs font-semibold text-rose-700">Critical: May 21st</p>
                  <p className="text-[10px] text-rose-600 uppercase mt-1">Major AWS Bill Due</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <Zap size={24} />
                </div>
                <p className="text-sm font-bold text-slate-900">Health Optimized</p>
                <p className="text-xs text-slate-500 mt-1">No liquidity risks detected.</p>
              </div>
            )}
          </Card>

          <Card title="Scenario Impacts">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Avg. Daily Spend</span>
                <span className="text-xs font-bold">${(450 * multiplier).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Min. Monthly Bal</span>
                <span className={`text-xs font-bold ${multiplier > 1.5 ? 'text-rose-600' : 'text-slate-900'}`}>
                  ${(8500 * multiplier).toFixed(2)}
                </span>
              </div>
              <button className="w-full mt-2 py-3 text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <MousePointer2 size={14} />
                Lock Scenario
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
