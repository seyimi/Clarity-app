
import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, CreditCard, TrendingUp, Sparkles } from 'lucide-react';

interface BottomNavProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Home', icon: LayoutDashboard },
    { id: AppView.SUBSCRIPTIONS, label: 'Subs', icon: CreditCard },
    { id: AppView.FORECAST, label: 'Forecast', icon: TrendingUp },
    { id: AppView.INSIGHTS, label: 'AI', icon: Sparkles },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden flex justify-around items-center h-16 px-4 z-50">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              isActive ? 'text-blue-600 font-semibold' : 'text-slate-400'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
