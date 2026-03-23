import React from 'react';

interface MuseumPatternProps {
  variant?: 'streamline' | 'constellation' | 'combined';
  className?: string;
}

export function MuseumPattern({ variant = 'combined', className = '' }: MuseumPatternProps) {
  // Using NEW COLOR SYSTEM: Stardust #F2AE2E for thin strokes only
  
  if (variant === 'streamline') {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 150px,
              rgba(242, 174, 46, 0.06) 150px,
              rgba(242, 174, 46, 0.06) 151px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 60px,
              rgba(242, 174, 46, 0.04) 60px,
              rgba(242, 174, 46, 0.04) 61px
            )
          `,
          opacity: 0.6
        }}
      />
    );
  }

  if (variant === 'constellation') {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(242, 174, 46, 0.15) 1px, transparent 1px),
            radial-gradient(circle, rgba(39, 66, 89, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 120px 120px',
          backgroundPosition: '0 0, 40px 60px',
          opacity: 0.5
        }}
      />
    );
  }

  // Combined: streamline + constellation
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Streamline layer - Stardust */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 140px,
              rgba(242, 174, 46, 0.05) 140px,
              rgba(242, 174, 46, 0.05) 141px
            )
          `,
          opacity: 0.5
        }}
      />
      {/* Constellation layer - Stardust */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(242, 174, 46, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '30px 30px',
          opacity: 0.4
        }}
      />
    </div>
  );
}