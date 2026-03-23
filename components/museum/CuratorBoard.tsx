import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MoreVertical, RotateCcw, Download } from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useI18n } from '../../lib/i18n-context';
import { DraggableProjectCard } from './DraggableProjectCard';
import { DropColumn } from './DropColumn';
import { MuseumPlaque } from './MuseumPlaque';
import { MuseumDivider } from './MuseumDivider';
import { ArchiveTabs } from './ArchiveTabs';

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

interface CuratorBoardProps {
  projects: Project[];
  onViewProject: (slug: string) => void;
  onClose: () => void;
}

type ColumnId = 'unseen' | 'seen' | 'loved';

interface ProjectWithColumn extends Project {
  columnId: ColumnId;
}

export function CuratorBoard({ projects, onViewProject, onClose }: CuratorBoardProps) {
  const { language } = useI18n();

  // Detect if touch device for better DnD backend
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const backendForDND = isTouchDevice ? TouchBackend : HTML5Backend;

  // Initialize all projects in "unseen" column
  const [projectsWithColumns, setProjectsWithColumns] = useState<ProjectWithColumn[]>(
    projects.map(p => ({ ...p, columnId: 'unseen' as ColumnId }))
  );

  // Move project to a different column
  const moveProject = (slug: string, toColumn: ColumnId) => {
    setProjectsWithColumns(prev =>
      prev.map(p => p.slug === slug ? { ...p, columnId: toColumn } : p)
    );
  };

  // Reset all projects to "unseen"
  const handleReset = () => {
    setProjectsWithColumns(prev =>
      prev.map(p => ({ ...p, columnId: 'unseen' as ColumnId }))
    );
  };

  // Export current state (mock implementation)
  const handleExport = () => {
    const data = {
      unseen: projectsWithColumns.filter(p => p.columnId === 'unseen').map(p => p.slug),
      seen: projectsWithColumns.filter(p => p.columnId === 'seen').map(p => p.slug),
      loved: projectsWithColumns.filter(p => p.columnId === 'loved').map(p => p.slug),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'curator-board-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get projects for each column
  const getColumnProjects = (columnId: ColumnId) => 
    projectsWithColumns.filter(p => p.columnId === columnId);

  const unseenProjects = getColumnProjects('unseen');
  const seenProjects = getColumnProjects('seen');
  const lovedProjects = getColumnProjects('loved');

  const columns: { id: ColumnId; title_es: string; title_en: string; count: number }[] = [
    { 
      id: 'unseen', 
      title_es: 'Por ver', 
      title_en: 'To view',
      count: unseenProjects.length 
    },
    { 
      id: 'seen', 
      title_es: 'Visto', 
      title_en: 'Viewed',
      count: seenProjects.length 
    },
    { 
      id: 'loved', 
      title_es: 'Me encanta', 
      title_en: 'I love it',
      count: lovedProjects.length 
    }
  ];

  return (
    <DndProvider backend={backendForDND}>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F2EADF' }}>
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title and Tabs Row - Responsive layout */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 mb-4">
              <div className="flex-1">
                <h2 
                  className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-2"
                  style={{ fontFamily: 'Sora, sans-serif', color: '#121126', letterSpacing: '-0.015em' }}
                >
                  {language === 'es' ? 'Modo curador' : 'Curator mode'}
                </h2>
                <p 
                  className="text-sm leading-relaxed" 
                  style={{ color: 'rgba(18, 17, 38, 0.6)' }}
                >
                  {language === 'es' 
                    ? 'Hola 👋 Veo que también eres curiosa/o ¿Te llamó algo la atención? Haz tu propia selección.'
                    : 'Hello 👋 I see you\'re curious too. Did something catch your eye? Make your own selection.'}
                </p>
                <p 
                  className="text-sm leading-relaxed mt-1" 
                  style={{ color: 'rgba(18, 17, 38, 0.6)' }}
                >
                  {language === 'es' 
                    ? isTouchDevice 
                      ? 'En móvil: no peleemos con el scroll, toca ⋯ y elige la columna.'
                      : 'Arrastra a Por ver, Visto o Me encanta ✨'
                    : isTouchDevice
                      ? 'On mobile: let\'s not fight the scroll, tap ⋯ and choose the column.'
                      : 'Drag to To view, Viewed or I love it ✨'}
                </p>
              </div>

              {/* Archive Tabs for navigation - centered on mobile, right on desktop */}
              <div className="flex justify-center md:justify-end shrink-0">
                <ArchiveTabs
                  activeTab="curator"
                  onTabChange={(tab) => {
                    if (tab === 'portfolio') {
                      onClose();
                    }
                  }}
                  portfolioLabel={language === 'es' ? 'Portafolio' : 'Portfolio'}
                  curatorLabel={language === 'es' ? 'Modo curador' : 'Curator mode'}
                />
              </div>
            </div>

            {/* Mobile instruction banner */}
            {isTouchDevice && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-4 p-4 rounded-2xl md:hidden"
                style={{
                  backgroundColor: 'rgba(242, 174, 46, 0.12)',
                  border: '1px solid rgba(242, 174, 46, 0.3)'
                }}
              >
                <p className="text-xs text-center" style={{ color: '#121126' }}>
                  💡 {language === 'es' 
                    ? 'Usa el botón ••• en cada tarjeta para moverla fácilmente'
                    : 'Use the ••• button on each card to move it easily'}
                </p>
              </motion.div>
            )}

            {/* Action Controls Row - Horizontal scroll on mobile */}
            <div className="flex gap-2 md:gap-3 justify-start md:justify-end mt-4 overflow-x-auto pb-2">
              {/* Reset */}
              <button
                onClick={handleReset}
                className="px-4 md:px-5 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2 font-medium whitespace-nowrap"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#121126',
                  border: '1px solid rgba(242, 174, 46, 0.3)',
                  boxShadow: '0 2px 8px rgba(18, 17, 38, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#F2AE2E';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(242, 174, 46, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.3)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(18, 17, 38, 0.06)';
                }}
                aria-label={language === 'es' ? 'Reiniciar tablero' : 'Reset board'}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="text-sm">
                  {language === 'es' ? 'Reset' : 'Reset'}
                </span>
              </button>

              {/* Export */}
              <button
                onClick={handleExport}
                className="px-4 md:px-5 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-2 font-medium whitespace-nowrap"
                style={{
                  backgroundColor: '#D95032',
                  color: '#F2EADF',
                  boxShadow: '0 2px 8px rgba(217, 80, 50, 0.25)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F24738';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(217, 80, 50, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#D95032';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(217, 80, 50, 0.25)';
                }}
                aria-label={language === 'es' ? 'Exportar selección' : 'Export selection'}
              >
                <Download className="h-4 w-4" />
                <span className="text-sm">
                  {language === 'es' ? 'Export' : 'Export'}
                </span>
              </button>

              {/* Close */}
              <button
                onClick={onClose}
                className="px-4 md:px-5 py-2.5 rounded-2xl transition-all duration-300 font-medium whitespace-nowrap"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#121126',
                  border: '1px solid rgba(242, 174, 46, 0.3)',
                  boxShadow: '0 2px 8px rgba(18, 17, 38, 0.06)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#274259';
                  e.currentTarget.style.backgroundColor = 'rgba(39, 66, 89, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.3)';
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                <span className="text-sm">{language === 'es' ? 'Cerrar' : 'Close'}</span>
              </button>
            </div>

            <MuseumDivider variant="constellation" className="mt-4" />
          </motion.div>
        </div>

        {/* 3-Column Board */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {columns.map((column, index) => {
              const columnProjects = getColumnProjects(column.id);
              
              return (
                <motion.div
                  key={column.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-3xl overflow-hidden"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid rgba(242, 174, 46, 0.25)',
                    boxShadow: '0 4px 16px rgba(18, 17, 38, 0.08)'
                  }}
                >
                  {/* Column Header - Museum Plaque Style */}
                  <div 
                    className="p-6 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #D95032 0%, #F2AE2E 100%)'
                    }}
                  >
                    {/* Subtle pattern overlay */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />
                    
                    <div className="relative z-10 flex items-center justify-between">
                      <h3 
                        className="text-lg font-semibold"
                        style={{ fontFamily: 'Sora, sans-serif', color: '#F2EADF' }}
                      >
                        {language === 'es' ? column.title_es : column.title_en}
                      </h3>
                      
                      {/* Counter Badge */}
                      <div 
                        className="px-3 py-1 rounded-full font-bold text-sm"
                        style={{
                          backgroundColor: 'rgba(242, 234, 223, 0.25)',
                          color: '#F2EADF'
                        }}
                      >
                        {column.count}
                      </div>
                    </div>
                  </div>

                  {/* Column Content - Drop Zone */}
                  <DropColumn
                    columnId={column.id}
                    onDrop={moveProject}
                    className="p-3 min-h-[400px] md:min-h-[500px]"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {columnProjects.length === 0 ? (
                        <div className="col-span-full flex items-center justify-center h-32 md:h-40">
                          <p 
                            className="text-sm text-center px-4"
                            style={{ color: 'rgba(18, 17, 38, 0.4)' }}
                          >
                            {language === 'es' 
                              ? isTouchDevice ? 'Usa el menú •••' : 'Arrastra proyectos aquí'
                              : isTouchDevice ? 'Use the ••• menu' : 'Drag projects here'}
                          </p>
                        </div>
                      ) : (
                        columnProjects.map((project) => (
                          <DraggableProjectCard
                            key={project.slug}
                            project={project}
                            currentColumn={column.id}
                            onMove={moveProject}
                            onViewProject={onViewProject}
                          />
                        ))
                      )}
                    </div>
                  </DropColumn>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}