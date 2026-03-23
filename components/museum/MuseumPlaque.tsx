import React from 'react';
import { motion } from 'motion/react';

interface MuseumPlaqueProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'featured' | 'mini';
  className?: string;
}

export function MuseumPlaque({ 
  title, 
  subtitle, 
  children, 
  variant = 'default',
  className = '' 
}: MuseumPlaqueProps) {
  const variants = {
    default: 'p-6 md:p-8',
    featured: 'p-8 md:p-12',
    mini: 'p-4 md:p-6'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`
        bg-card rounded-3xl border border-secondary/20 
        ${variants[variant]}
        ${className}
      `}
      style={{
        boxShadow: '0 2px 12px rgba(45, 40, 35, 0.06), inset 0 1px 0 rgba(212, 175, 122, 0.1)'
      }}
    >
      {/* Decorative corner accents */}
      <div className="relative">
        <div className="absolute -top-6 -left-6 w-12 h-12 border-l-2 border-t-2 border-secondary/20 rounded-tl-2xl" 
             style={{ opacity: 0.4 }} 
        />
        <div className="absolute -top-6 -right-6 w-12 h-12 border-r-2 border-t-2 border-secondary/20 rounded-tr-2xl" 
             style={{ opacity: 0.4 }} 
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {subtitle && (
          <p className="text-xs uppercase tracking-widest text-secondary font-medium">
            {subtitle}
          </p>
        )}
        <h3 className="text-lg md:text-xl font-semibold text-foreground" style={{ fontFamily: 'Sora, sans-serif' }}>
          {title}
        </h3>
        {children && (
          <div className="text-muted-foreground leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}
