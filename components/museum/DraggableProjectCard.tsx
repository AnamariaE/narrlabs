import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { motion } from 'motion/react';
import { MoreVertical, Eye } from 'lucide-react';
import { useI18n } from '../../lib/i18n-context';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Badge } from '../ui/badge';

interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  summary_es: string;
  summary_en: string;
  cover_image: string;
  external_url?: string;
  tags: string[];
}

type ColumnId = 'unseen' | 'seen' | 'loved';

interface DraggableProjectCardProps {
  project: Project;
  currentColumn: ColumnId;
  onMove: (slug: string, toColumn: ColumnId) => void;
  onViewProject: (slug: string) => void;
}

const DRAG_TYPE = 'PROJECT_CARD';

export function DraggableProjectCard({ 
  project, 
  currentColumn, 
  onMove, 
  onViewProject 
}: DraggableProjectCardProps) {
  const { language } = useI18n();
  const [showMoveMenu, setShowMoveMenu] = useState(false);

  const summary = language === 'es' ? project.summary_es : project.summary_en;

  // Random rotation for playful feel (but consistent per card)
  const randomRotation = React.useMemo(() => {
    const seed = project.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seed % 7) - 3); // -3 to +3 degrees
  }, [project.slug]);

  // Setup drag
  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: { slug: project.slug, currentColumn },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <motion.div
      ref={drag}
      initial={{ 
        opacity: 0, 
        y: 20,
        rotate: randomRotation
      }}
      animate={{ 
        opacity: isDragging ? 0.5 : 1, 
        y: 0,
        rotate: isDragging ? (randomRotation > 0 ? 4 : -4) : randomRotation,
        scale: isDragging ? 1.05 : 1
      }}
      transition={{ 
        duration: 0.3,
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className="relative rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        backgroundColor: '#F2EADF',
        border: '1px solid rgba(242, 174, 46, 0.3)',
        boxShadow: isDragging 
          ? '0 20px 40px rgba(18, 17, 38, 0.25), 0 0 0 2px rgba(242, 174, 46, 0.5)'
          : '0 2px 8px rgba(18, 17, 38, 0.08)',
        touchAction: 'none'
      }}
    >
      {/* Decorative corners - show on drag */}
      {isDragging && (
        <>
          <div 
            className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 rounded-tl-xl z-10 pointer-events-none"
            style={{ borderColor: '#F2AE2E' }}
          />
          <div 
            className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 rounded-tr-xl z-10 pointer-events-none"
            style={{ borderColor: '#F2AE2E' }}
          />
        </>
      )}

      {/* Move Menu - 3-dot dropdown */}
      <div className="absolute top-1.5 right-1.5 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMoveMenu(!showMoveMenu);
          }}
          className="p-1.5 rounded-lg transition-all"
          style={{
            backgroundColor: isDragging ? 'rgba(242, 234, 223, 0.95)' : 'rgba(242, 234, 223, 0.8)',
            color: '#121126',
            backdropFilter: 'blur(8px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(242, 174, 46, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(242, 234, 223, 0.8)';
          }}
          aria-label="Move to column"
        >
          <MoreVertical className="h-3.5 w-3.5" />
        </button>

        {/* Dropdown Menu */}
        {showMoveMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-10 right-0 rounded-xl overflow-hidden"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(242, 174, 46, 0.3)',
              boxShadow: '0 8px 24px rgba(18, 17, 38, 0.15)',
              minWidth: '140px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {(['unseen', 'seen', 'loved'] as ColumnId[]).map((columnId) => {
              const labels = {
                unseen: { es: 'Por ver', en: 'To view' },
                seen: { es: 'Visto', en: 'Viewed' },
                loved: { es: 'Me encanta', en: 'I love it' }
              };

              const isCurrentColumn = columnId === currentColumn;

              return (
                <button
                  key={columnId}
                  onClick={() => {
                    onMove(project.slug, columnId);
                    setShowMoveMenu(false);
                  }}
                  disabled={isCurrentColumn}
                  className="w-full px-3 py-2 text-left text-xs transition-colors"
                  style={{
                    backgroundColor: isCurrentColumn ? 'rgba(242, 174, 46, 0.1)' : 'transparent',
                    color: isCurrentColumn ? 'rgba(18, 17, 38, 0.5)' : '#121126',
                    cursor: isCurrentColumn ? 'default' : 'pointer',
                    fontWeight: isCurrentColumn ? '600' : '400'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrentColumn) {
                      e.currentTarget.style.backgroundColor = 'rgba(242, 174, 46, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrentColumn) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {language === 'es' ? labels[columnId].es : labels[columnId].en}
                  {isCurrentColumn && (
                    <span className="ml-2 text-xs" style={{ color: '#F2AE2E' }}>●</span>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Image */}
      <div 
        className="aspect-[4/3] overflow-hidden relative"
        style={{ backgroundColor: 'rgba(18, 17, 38, 0.05)' }}
      >
        <ImageWithFallback
          src={project.cover_image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{
            filter: isDragging ? 'brightness(1.05)' : 'brightness(1)'
          }}
        />
        
        {/* Overlay on drag */}
        {isDragging && (
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(242, 174, 46, 0.15), transparent)'
            }}
          />
        )}
      </div>

      {/* Card Content - Compact */}
      <div className="p-2.5">
        <div className="flex items-start justify-between gap-1.5 mb-1.5">
          <h4 
            className="font-semibold text-xs leading-tight line-clamp-2 flex-1"
            style={{ fontFamily: 'Sora, sans-serif', color: '#121126' }}
          >
            {project.title}
          </h4>
          <span 
            className="text-xs font-bold shrink-0 px-1.5 py-0.5 rounded"
            style={{ 
              backgroundColor: 'rgba(242, 174, 46, 0.15)',
              color: '#D6B26A',
              fontSize: '10px'
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Tags - Compact */}
        <div className="flex flex-wrap gap-1 mb-2">
          {project.tags.slice(0, 2).map((tag) => (
            <Badge 
              key={tag} 
              variant="outline"
              className="text-xs px-1.5 py-0"
              style={{
                borderColor: 'rgba(242, 174, 46, 0.3)',
                color: 'rgba(18, 17, 38, 0.7)',
                fontSize: '9px'
              }}
            >
              {tag}
            </Badge>
          ))}
          {project.tags.length > 2 && (
            <Badge 
              variant="outline"
              className="text-xs px-1.5 py-0"
              style={{
                borderColor: 'rgba(242, 174, 46, 0.3)',
                color: '#F2AE2E',
                fontSize: '9px'
              }}
            >
              +{project.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* View Button - Compact */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewProject(project.slug);
          }}
          className="w-full px-2 py-1.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 text-xs font-medium"
          style={{
            backgroundColor: '#D95032',
            color: '#F2EADF',
            boxShadow: '0 2px 6px rgba(217, 80, 50, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#F24738';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(217, 80, 50, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#D95032';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(217, 80, 50, 0.2)';
          }}
        >
          <Eye className="h-3 w-3" />
          {language === 'es' ? 'Ver' : 'View'}
        </button>
      </div>

      {/* Dragging indicator */}
      {isDragging && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            border: '2px dashed rgba(242, 174, 46, 0.6)',
            backgroundColor: 'rgba(242, 174, 46, 0.05)'
          }}
        />
      )}
    </motion.div>
  );
}