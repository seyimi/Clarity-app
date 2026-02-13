
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => (
  <div className={`bg-white rounded-[14px] p-6 shadow-sm border border-slate-100 ${className}`}>
    {(title || subtitle) && (
      <div className="mb-4">
        {title && <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>}
        {subtitle && <p className="text-2xl font-bold text-slate-900 mt-1">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'success' | 'warning' | 'danger' | 'info' }> = ({ children, variant = 'info' }) => {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    warning: 'bg-amber-50 text-amber-700 border-amber-100',
    danger: 'bg-rose-50 text-rose-700 border-rose-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
};

export const SectionHeader: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
    {description && <p className="text-slate-500 mt-1 text-lg">{description}</p>}
  </div>
);
