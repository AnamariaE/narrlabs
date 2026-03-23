import React from 'react';
import { Sparkles } from 'lucide-react';

interface MuseumDividerProps {
  variant?: 'line' | 'constellation' | 'streamline';
  className?: string;
}

export function MuseumDivider({ variant = 'line', className = '' }: MuseumDividerProps) {
  // Using NEW COLOR SYSTEM: Stardust #F2AE2E (1px strokes only)
  
  if (variant === 'constellation') {
    return (
      <div className={`flex items-center justify-center gap-3 ${className} px-[0px] py-[2px] mx-[0px] mt-[0px] mb-[2px]`}>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-[#F2AE2E]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#F2AE2E]/70" />
          <div className="w-1 h-1 rounded-full bg-[#F2AE2E]/40" />
        </div>
        <Sparkles className="w-4 h-4 text-[#F2AE2E]" style={{ opacity: 0.7 }} />
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-[#F2AE2E]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#F2AE2E]/70" />
          <div className="w-1 h-1 rounded-full bg-[#F2AE2E]/40" />
        </div>
      </div>
    );
  }

  if (variant === 'streamline') {
    return (
      <div className={`relative py-6 ${className}`}>
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div 
            className="w-full border-t" 
            style={{ 
              borderColor: 'rgba(242, 174, 46, 0.4)',
              borderRadius: '100%/20px',
              transform: 'scaleY(0.3)'
            }} 
          />
        </div>
        <div className="relative flex justify-center">
          <div className="w-2 h-2 rounded-full bg-[#F2AE2E]/50" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-full h-px ${className}`}
      style={{
        background: 'linear-gradient(to right, transparent, rgba(242, 174, 46, 0.5), transparent)'
      }}
    />
  );
}