import React from 'react';
import { Sparkles } from 'lucide-react';

interface CosmicDividerProps {
  variant?: 'line' | 'constellation' | 'speedline';
  className?: string;
}

export function CosmicDivider({ variant = 'line', className = '' }: CosmicDividerProps) {
  // Personal mode dividers: Accent #8466F2
  
  if (variant === 'constellation') {
    return (
      <div className={`flex items-center justify-center gap-3 py-8 ${className}`}>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-[#8466F2]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#8466F2]/70" />
          <div className="w-1 h-1 rounded-full bg-[#8466F2]/40" />
        </div>
        <Sparkles className="w-4 h-4 text-[#8466F2]" style={{ opacity: 0.7 }} />
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-[#8466F2]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#8466F2]/70" />
          <div className="w-1 h-1 rounded-full bg-[#8466F2]/40" />
        </div>
      </div>
    );
  }

  if (variant === 'speedline') {
    return (
      <div className={`relative py-6 ${className}`}>
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div 
            className="w-full border-t" 
            style={{ 
              borderColor: 'rgba(132, 102, 242, 0.3)',
              borderRadius: '100%/20px',
              transform: 'scaleY(0.3)'
            }} 
          />
        </div>
        <div className="relative flex justify-center">
          <div className="w-2 h-2 rounded-full bg-[#8466F2]/50" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-full h-px ${className}`}
      style={{
        background: 'linear-gradient(to right, transparent, rgba(132, 102, 242, 0.4), transparent)'
      }}
    />
  );
}
