
import React from 'react';
import { AppView } from '../types';
import { LayoutDashboard, CreditCard, TrendingUp, Sparkles, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppView.SUBSCRIPTIONS, label: 'Subscriptions', icon: CreditCard },
    { id: AppView.FORECAST, label: 'Cash Forecast', icon: TrendingUp },
    { id: AppView.INSIGHTS, label: 'Intelligence', icon: Sparkles },
  ];

  return (
    <aside className="hidden md:flex w-64 lg:w-72 h-screen fixed left-0 top-0 bg-white border-r border-slate-200 flex-col p-6 z-20">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
          C
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">Clarity</span>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4 px-2">Main Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-sm shadow-blue-50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 pt-6 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
          <Settings size={20} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
          <HelpCircle size={20} />
          Help Center
        </button>
        
        <div className="mt-6 p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
          <img src="https://picsum.photos/seed/user/40/40" className="w-9 h-9 rounded-full ring-2 ring-white" alt="Profile" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">Alex Sterling</p>
            <p className="text-xs text-slate-500 truncate">Premium Member</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
