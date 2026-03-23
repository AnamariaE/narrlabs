import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

interface Project {
  slug: string;
  title: string;
  category: string;
  categories?: string[]; // New dual category system: [Context, Type]
  year: number;
  summary_es: string;
  summary_en: string;
  cover_image: string;
  external_url: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  onViewProject: (slug: string) => void;
  size?: 'normal' | 'tall' | 'wide';
}

export function ProjectCard({ project, onViewProject, size = 'normal' }: ProjectCardProps) {
  const { language, t } = useI18n();
  const { mode } = useBrand();
  const [isExpanded, setIsExpanded] = useState(false);
  const summary = language === 'es' ? project.summary_es : project.summary_en;

  // Dynamic aspect ratios for masonry effect
  const aspectRatio = {
    normal: 'aspect-[3/2]',
    tall: 'aspect-[3/4]',
    wide: 'aspect-[16/9]'
  }[size];

  // Museum style applies only in studio mode
  const isMuseum = mode === 'studio';
  
  // Truncate tags if more than 4
  const maxTags = 4;
  const visibleTags = project.tags.slice(0, maxTags);
  const hiddenTagsCount = project.tags.length - maxTags;

  return (
    <motion.article 
      className={`group overflow-hidden border transition-all duration-500 ${
        isMuseum 
          ? 'rounded-3xl bg-[#F2EADF]' 
          : 'rounded-3xl bg-[#FFFFFF]'
      }`}
      style={isMuseum ? {
        borderColor: 'rgba(242, 174, 46, 0.3)',
        borderWidth: '1px',
        boxShadow: '0 2px 12px rgba(18, 17, 38, 0.08)',
      } : {
        borderColor: 'rgba(49, 39, 115, 0.18)',
        borderWidth: '2px',
        boxShadow: '0 2px 12px rgba(30, 25, 64, 0.08)'
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={(e) => {
        if (isMuseum) {
          e.currentTarget.style.borderColor = '#F2AE2E';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(18, 17, 38, 0.15), 0 0 0 1px rgba(242, 174, 46, 0.4)';
        } else {
          e.currentTarget.style.borderColor = 'rgba(132, 102, 242, 0.4)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(30, 25, 64, 0.12), 0 0 0 1px rgba(132, 102, 242, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (isMuseum) {
          e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.3)';
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(18, 17, 38, 0.08)';
        } else {
          e.currentTarget.style.borderColor = 'rgba(49, 39, 115, 0.18)';
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(30, 25, 64, 0.08)';
        }
      }}
    >
      {/* Decorative corners - different for each mode */}
      {isMuseum && (
        <div className="relative">
          <motion.div 
            className="absolute top-0 left-0 w-8 h-8 border-l border-t rounded-tl-2xl z-10 pointer-events-none" 
            initial={{ opacity: 0, borderColor: 'rgba(242, 174, 46, 0)' }}
            whileHover={{ opacity: 0.5, borderColor: '#F2AE2E' }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-8 h-8 border-r border-t rounded-tr-2xl z-10 pointer-events-none" 
            initial={{ opacity: 0, borderColor: 'rgba(242, 174, 46, 0)' }}
            whileHover={{ opacity: 0.5, borderColor: '#F2AE2E' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <div className={`${aspectRatio} overflow-hidden bg-muted relative cursor-pointer`} onClick={() => onViewProject(project.slug)}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <ImageWithFallback
            src={project.cover_image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </motion.div>
        
        {/* Overlay on hover */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: isMuseum 
              ? 'linear-gradient(to top, rgba(18, 17, 38, 0.7), transparent)'
              : 'linear-gradient(to top, rgba(30, 25, 64, 0.7), transparent)'
          }}
        />
      </div>
      
      <div className={isMuseum ? 'p-7' : 'p-7'}>
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Title - Different colors per mode */}
          <h3 
            className={`line-clamp-2 transition-colors font-semibold tracking-tight cursor-pointer`} 
            onClick={() => onViewProject(project.slug)}
            style={isMuseum ? { 
              fontFamily: 'Sora, sans-serif',
              color: '#21374d'
            } : {
              fontFamily: 'Sora, sans-serif',
              color: '#1E1940'
            }}
            onMouseEnter={(e) => {
              if (isMuseum) {
                e.currentTarget.style.color = '#D95032';
              } else {
                e.currentTarget.style.color = '#5B44F2';
              }
            }}
            onMouseLeave={(e) => {
              if (isMuseum) {
                e.currentTarget.style.color = '#21374d';
              } else {
                e.currentTarget.style.color = '#1E1940';
              }
            }}>
            {project.slug === 'video-narrativa-wayuu' 
              ? 'Wayuú | Learning Circles @ Wikimedia' 
              : project.title}
          </h3>
          {/* Year - Different colors per mode */}
          <span className={`text-sm shrink-0 font-medium`} 
            style={isMuseum ? { color: '#F2AE2E' } : { color: '#8466F2' }}>
            {project.year}
          </span>
        </div>

        {/* Summary - Different colors per mode */}
        <p className={`text-[13px] mb-4 ${
          isExpanded || summary.length < 100 ? '' : 'line-clamp-2'
        }`} style={isMuseum ? { 
          color: 'rgba(18, 17, 38, 0.7)',
          lineHeight: '1.7' 
        } : { 
          color: 'rgba(30, 25, 64, 0.7)',
          lineHeight: '1.7' 
        }}>
          {summary}
        </p>

        {/* Read more/less - Different colors per mode */}
        {summary.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-[11px] font-medium mb-4 transition-colors`}
            style={isMuseum ? { color: '#274259' } : { color: '#8466F2' }}
            onMouseEnter={(e) => {
              if (isMuseum) {
                e.currentTarget.style.color = '#D95032';
              } else {
                e.currentTarget.style.color = '#5B44F2';
              }
            }}
            onMouseLeave={(e) => {
              if (isMuseum) {
                e.currentTarget.style.color = '#274259';
              } else {
                e.currentTarget.style.color = '#8466F2';
              }
            }}
          >
            {isExpanded 
              ? (language === 'es' ? 'Leer menos' : 'Read less')
              : (language === 'es' ? 'Leer más' : 'Read more')
            }
          </button>
        )}

        {/* Tags - Different borders per mode */}
        <div className="flex flex-wrap gap-2 mb-4">
          {visibleTags.map((tag) => (
            <Badge 
              key={tag} 
              variant="outline"
              className={`text-xs transition-all rounded-lg`}
              style={isMuseum ? {
                borderColor: 'rgba(242, 174, 46, 0.4)',
                borderWidth: '1px',
                color: '#121126'
              } : {
                borderColor: 'rgba(49, 39, 115, 0.18)',
                borderWidth: '1px',
                color: '#1E1940'
              }}
              onMouseEnter={(e) => {
                if (isMuseum) {
                  e.currentTarget.style.borderColor = '#F2AE2E';
                  e.currentTarget.style.backgroundColor = 'rgba(242, 174, 46, 0.08)';
                } else {
                  e.currentTarget.style.borderColor = 'rgba(132, 102, 242, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(132, 102, 242, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (isMuseum) {
                  e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.4)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                } else {
                  e.currentTarget.style.borderColor = 'rgba(49, 39, 115, 0.18)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {tag}
            </Badge>
          ))}
          {hiddenTagsCount > 0 && (
            <Badge 
              variant="outline" 
              className={`text-xs rounded-lg`}
              style={isMuseum ? {
                borderColor: 'rgba(242, 174, 46, 0.4)',
                color: '#F2AE2E'
              } : {
                borderColor: 'rgba(49, 39, 115, 0.18)',
                color: '#8466F2'
              }}
            >
              +{hiddenTagsCount}
            </Badge>
          )}
        </div>

        {/* CTAs - Different colors per mode */}
        <div className="flex gap-2">
          {/* Primary Button */}
          <button
            onClick={() => onViewProject(project.slug)}
            className={`flex-1 px-4 py-2 transition-all font-medium rounded-2xl`}
            style={isMuseum ? {
              backgroundColor: '#D95032',
              color: '#F2EADF',
              boxShadow: '0 2px 8px rgba(217, 80, 50, 0.2)'
            } : {
              backgroundColor: '#5B44F2',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(91, 68, 242, 0.2)'
            }}
            onMouseEnter={(e) => {
              if (isMuseum) {
                e.currentTarget.style.backgroundColor = '#F24738';
              } else {
                e.currentTarget.style.backgroundColor = '#3A29A6';
              }
            }}
            onMouseLeave={(e) => {
              if (isMuseum) {
                e.currentTarget.style.backgroundColor = '#D95032';
              } else {
                e.currentTarget.style.backgroundColor = '#5B44F2';
              }
            }}
          >
            {t('portfolio.view')}
          </button>
          {/* Secondary Link */}
          <a
            href={project.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 border transition-colors flex items-center gap-2 rounded-2xl`}
            style={isMuseum ? {
              borderColor: 'rgba(242, 174, 46, 0.4)',
              borderWidth: '1px',
              color: '#121126'
            } : {
              borderColor: 'rgba(49, 39, 115, 0.18)',
              borderWidth: '1px',
              color: '#1E1940'
            }}
            onMouseEnter={(e) => {
              if (isMuseum) {
                e.currentTarget.style.backgroundColor = '#F2BF80';
                e.currentTarget.style.borderColor = '#F2AE2E';
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(132, 102, 242, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(132, 102, 242, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (isMuseum) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.4)';
              } else {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(49, 39, 115, 0.18)';
              }
            }}
            aria-label={`${t('portfolio.external')} - ${project.title}`}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}