import React from 'react';

interface CosmicPatternProps {
  variant?: 'constellation' | 'speedlines' | 'combined';
  className?: string;
}

export function CosmicPattern({ variant = 'combined', className = '' }: CosmicPatternProps) {
  // Cosmic Editorial Diary: Streamline Moderne + subtle Stardust Art Nouveau
  // Using Personal color palette: Accent #8466F2 at very low opacity (1-3%)
  
  if (variant === 'constellation') {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(132, 102, 242, 0.08) 1px, transparent 1px),
            radial-gradient(circle, rgba(91, 68, 242, 0.05) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '60px 60px, 40px 40px',
          backgroundPosition: '0 0, 20px 30px',
          opacity: 0.4
        }}
      />
    );
  }

  if (variant === 'speedlines') {
    return (
      <div 
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 120px,
              rgba(132, 102, 242, 0.04) 120px,
              rgba(132, 102, 242, 0.04) 121px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(91, 68, 242, 0.02) 80px,
              rgba(91, 68, 242, 0.02) 81px
            )
          `,
          opacity: 0.6
        }}
      />
    );
  }

  // Combined: constellation + speedlines
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Speedlines layer */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 140px,
              rgba(132, 102, 242, 0.03) 140px,
              rgba(132, 102, 242, 0.03) 141px
            )
          `,
          opacity: 0.5
        }}
      />
      {/* Constellation layer */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(132, 102, 242, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: '25px 25px',
          opacity: 0.4
        }}
      />
    </div>
  );
}
