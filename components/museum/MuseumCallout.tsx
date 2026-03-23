import React from 'react';
import { Info, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface MuseumCalloutProps {
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'highlight';
  title?: string;
  className?: string;
}

export function MuseumCallout({ 
  children, 
  variant = 'info',
  title,
  className = '' 
}: MuseumCalloutProps) {
  const icons = {
    info: Info,
    warning: AlertCircle,
    success: CheckCircle,
    highlight: Sparkles
  };

  const styles = {
    info: {
      bg: 'bg-accent/5',
      border: 'border-accent/20',
      text: 'text-accent',
      iconBg: 'bg-accent/10'
    },
    warning: {
      bg: 'bg-primary/5',
      border: 'border-primary/20',
      text: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    success: {
      bg: 'bg-accent/5',
      border: 'border-accent/20',
      text: 'text-accent',
      iconBg: 'bg-accent/10'
    },
    highlight: {
      bg: 'bg-secondary/5',
      border: 'border-secondary/30',
      text: 'text-secondary',
      iconBg: 'bg-secondary/15'
    }
  };

  const Icon = icons[variant];
  const style = styles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`
        ${style.bg} ${style.border} border-2 rounded-2xl p-6
        ${className}
      `}
      style={{
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="flex gap-4">
        <div className={`shrink-0 w-10 h-10 ${style.iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${style.text}`} />
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          {title && (
            <h4 className={`font-semibold ${style.text}`} style={{ fontFamily: 'Sora, sans-serif' }}>
              {title}
            </h4>
          )}
          <div className="text-sm text-foreground/80 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
