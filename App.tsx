
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import Subscriptions from './components/Subscriptions';
import Forecast from './components/Forecast';
import AIChat from './components/AIChat';
import { AppView } from './types';
import { Bell, Search, Info } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.SUBSCRIPTIONS:
        return <Subscriptions />;
      case AppView.FORECAST:
        return <Forecast />;
      case AppView.INSIGHTS:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 md:p-12">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 mb-6">
              <Info size={32} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Intelligence Engine Loading</h2>
            <p className="text-slate-500 mt-2 max-w-md text-sm md:text-base">Our predictive models are crunching your transaction history to provide deep recurring behavior insights.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 flex flex-col md:flex-row">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 md:ml-64 lg:ml-72 p-6 lg:p-10 max-w-[1440px] mx-auto overflow-x-hidden w-full pb-24 md:pb-10">
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
              <span className="text-lg font-bold">Clarity</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 bg-white border border-slate-200 rounded-lg">
                <Bell size={18} className="text-slate-600" />
              </button>
              <img src="https://picsum.photos/seed/user/40/40" className="w-8 h-8 rounded-full border border-white shadow-sm" alt="User" />
            </div>
          </div>

          <div className="relative w-full md:w-80 lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search insights..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors relative">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-px bg-slate-200 mx-2"></div>
            <div className="bg-blue-600 px-4 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-2 shadow-lg shadow-blue-100 cursor-pointer hover:bg-blue-700 transition-colors">
              $12,450.60
            </div>
          </div>

          <div className="flex md:hidden items-center justify-center bg-blue-600 px-4 py-3 rounded-2xl text-white text-sm font-bold shadow-lg shadow-blue-100">
            Portfolio: $12,450.60
          </div>
        </header>

        {renderView()}
      </main>

      <BottomNav currentView={currentView} setView={setCurrentView} />
      <AIChat />
    </div>
  );
};

export default App;
