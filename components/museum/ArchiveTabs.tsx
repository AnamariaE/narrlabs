import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ArchiveTabsProps {
  activeTab: 'portfolio' | 'curator';
  onTabChange: (tab: 'portfolio' | 'curator') => void;
  portfolioLabel: string;
  curatorLabel: string;
  playInvitation?: string;
}

export function ArchiveTabs({ 
  activeTab, 
  onTabChange, 
  portfolioLabel, 
  curatorLabel,
  playInvitation 
}: ArchiveTabsProps) {
  const tabs = [
    { id: 'portfolio' as const, label: portfolioLabel, icon: null, color: '#F2AE2E' },
    { id: 'curator' as const, label: curatorLabel, icon: Sparkles, color: '#D95032' }
  ];

  return (
    <div className="flex flex-col items-end gap-3">
      {/* File tabs - Horizontal layout */}
      <div className="flex items-end gap-2">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative group"
              initial={{ y: 0 }}
              whileHover={!isActive ? { y: -4 } : {}}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              aria-label={tab.label}
              aria-current={isActive ? 'true' : undefined}
              style={{
                zIndex: isActive ? 20 : 10 - index
              }}
            >
              {/* Tab body - File folder tab style */}
              <div
                className="relative px-6 py-3 flex items-center gap-2 transition-all duration-300"
                style={{
                  backgroundColor: isActive ? '#F2EADF' : '#FFFFFF',
                  borderTopLeftRadius: '12px',
                  borderTopRightRadius: '12px',
                  border: '1px solid rgba(242, 174, 46, 0.25)',
                  borderBottom: 'none',
                  boxShadow: isActive
                    ? '0 -2px 8px rgba(18, 17, 38, 0.08), 0 4px 0 0 #F2EADF'
                    : '0 -1px 4px rgba(18, 17, 38, 0.04)',
                  minWidth: '140px',
                  height: isActive ? '52px' : '44px',
                  transform: isActive ? 'translateY(0)' : 'translateY(8px)'
                }}
              >
                {/* Color accent line at top - like physical file tabs */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? tab.color : `${tab.color}40`,
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    boxShadow: isActive ? `0 0 8px ${tab.color}60` : 'none'
                  }}
                />

                {/* Icon */}
                {Icon && (
                  <Icon 
                    className="h-4 w-4 shrink-0" 
                    style={{ 
                      color: isActive ? tab.color : 'rgba(18, 17, 38, 0.4)',
                      transition: 'color 0.3s'
                    }} 
                  />
                )}

                {/* Label - Horizontal text */}
                <span
                  className="text-sm font-medium tracking-wide whitespace-nowrap"
                  style={{
                    color: isActive ? '#121126' : 'rgba(18, 17, 38, 0.6)',
                    fontFamily: 'Sora, sans-serif',
                    letterSpacing: '0.01em',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'color 0.3s, font-weight 0.3s'
                  }}
                >
                  {tab.label}
                </span>

                {/* Subtle notch on inactive tabs to show depth */}
                {!isActive && (
                  <div
                    className="absolute top-0 right-0 w-4 h-4"
                    style={{
                      backgroundColor: '#F2BF80',
                      clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
                      borderTopRightRadius: '12px'
                    }}
                  />
                )}
              </div>

              {/* Focus ring for accessibility */}
              <div
                className="absolute inset-0 rounded-t-xl pointer-events-none opacity-0 group-focus-visible:opacity-100 transition-opacity"
                style={{
                  outline: '2px solid #F2AE2E',
                  outlineOffset: '2px'
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Play invitation - only show when in portfolio mode */}
      {playInvitation && activeTab === 'portfolio' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xs italic text-right pr-2"
          style={{
            color: 'rgba(18, 17, 38, 0.5)',
            fontFamily: 'Sora, sans-serif',
            maxWidth: '200px',
            lineHeight: '1.4'
          }}
        >
          {playInvitation}
        </motion.div>
      )}
    </div>
  );
}