import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MuseumPattern } from './MuseumPattern';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import siteData from '../../data/site-data';

interface HeroStudioProps {
  brand: string;
  claim: string;
  onViewPortfolio: () => void;
  onAbout: () => void;
  onNavigate: (page: string, slug?: string) => void;
  language: 'es' | 'en';
}

export function HeroStudio({ brand, claim, onViewPortfolio, onAbout, onNavigate, language }: HeroStudioProps) {
  // EXHIBIT DECK: 4 featured projects (existing projects from site-data)
  const exhibitProjects = [
    {
      title: "Toteramy",
      slug: "toteramy-identidad-marca-cafe",
      image: "https://www.narrlab.studio/Assets/Toteramy.jpg",
      year: 2025,
      category: "Branding"
    },
    {
      title: "Gamificación de Intro a Humanidades Digitales",
      slug: "humanidades-digitales",
      image: "https://narrlab.studio/img/Lineagrafica.jpg",
      year: 2022,
      category: "Gamificación"
    },
    {
      title: "Narrativa Wayuu – Video infografía",
      slug: "video-narrativa-wayuu",
      image: "https://narrlab.studio/img/Wayuu-portfolio-100.jpg",
      year: 2024,
      category: "Multimedia"
    },
    {
      title: "Credicampo - Memoria 2022",
      slug: "credicampo-memoria-2022",
      image: "https://www.narrlab.studio/Assets/Portadacredicampo2022.webp",
      year: 2022,
      category: "Editorial"
    }
  ];

  // Component for the exhibit deck - reusable
  const ExhibitDeck = () => (
    <>
      {/* Streamline corner panel background - aerodynamic curved shape */}
      <div 
        className="absolute inset-0 rounded-[32px] overflow-hidden"
        style={{
          backgroundColor: '#1E1940',
          boxShadow: '0 20px 60px rgba(30, 25, 64, 0.3)',
          transform: 'rotate(-2deg) scale(1.05)',
          zIndex: 0
        }}
      >
        {/* Subtle constellation pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(242, 174, 46, 0.8) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        {/* Thin stardust inner stroke */}
        <div 
          className="absolute inset-0 rounded-[32px]"
          style={{
            background: 'linear-gradient(to bottom, #121126, #263e55)',
            boxShadow: '0 20px 60px rgba(30, 25, 64, 0.3)',
            borderRadius: '32px'
          }}
        />
      </div>

      {/* Exhibit Deck Container - 4 overlapping cards */}
      <div className="relative z-10 pt-12 pb-8 px-6">
        <div className="relative" style={{ height: '500px' }}>
          {exhibitProjects.map((project, index) => {
            // Rotation pattern for 4 cards: -3, -1, 1, 3
            const rotations = [-3, -1, 1, 3];
            return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotate: rotations[index]
              }}
              transition={{ 
                duration: 0.7, 
                delay: 0.6 + index * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="absolute rounded-3xl overflow-hidden cursor-pointer group focus:outline-none"
              style={{
                top: `${index * 42}px`,
                left: `${index * 14}px`,
                right: `${(3 - index) * 14}px`,
                zIndex: 4 - index,
                backgroundColor: '#F2EADF',
                border: '2px solid rgba(242, 174, 46, 0.3)',
                boxShadow: `
                  0 ${8 + index * 4}px ${24 + index * 8}px rgba(18, 17, 38, ${0.2 + index * 0.05}),
                  inset 0 1px 0 rgba(242, 174, 46, 0.1)
                `
              }}
              whileHover={{
                y: -8,
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              onClick={() => onNavigate('project', project.slug)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.6)';
                e.currentTarget.style.boxShadow = `
                  0 16px 48px rgba(18, 17, 38, 0.25),
                  inset 0 1px 0 rgba(242, 174, 46, 0.2)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.3)';
                e.currentTarget.style.boxShadow = `
                  0 ${8 + index * 4}px ${24 + index * 8}px rgba(18, 17, 38, ${0.2 + index * 0.05}),
                  inset 0 1px 0 rgba(242, 174, 46, 0.1)
                `;
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '3px solid #F2AE2E';
                e.currentTarget.style.outlineOffset = '4px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
                e.currentTarget.style.outlineOffset = '0px';
              }}
              aria-label={`${language === 'es' ? 'Ver proyecto' : 'View project'}: ${project.title}`}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-[#121126]/5 pointer-events-none">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Exhibit Label */}
              <div className="p-4 bg-[#F2EADF] pointer-events-none">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 
                    className="font-semibold text-sm leading-tight text-[#121126] line-clamp-2 text-left"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {project.title}
                  </h4>
                  <span 
                    className="text-xs font-bold shrink-0 px-2 py-1 rounded-lg"
                    style={{ 
                      backgroundColor: 'rgba(242, 174, 46, 0.15)',
                      color: '#D6B26A'
                    }}
                  >
                    {project.year}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wider text-left" style={{ color: 'rgba(18, 17, 38, 0.5)' }}>
                  {project.categories && project.categories.length > 0
                    ? project.categories.join(' • ')
                    : project.category}
                </p>
              </div>

              {/* Decorative corner accents - show on hover */}
              <div 
                className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 rounded-tl-2xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
                style={{ borderColor: '#F2AE2E' }}
              />
              <div 
                className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 rounded-tr-2xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
                style={{ borderColor: '#F2AE2E' }}
              />
            </motion.button>
          );
          })}
        </div>

        {/* Exhibit deck label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              backgroundColor: 'rgba(242, 174, 46, 0.12)',
              border: '1px solid rgba(242, 174, 46, 0.25)'
            }}
          >
            <Sparkles className="w-3 h-3" style={{ color: '#F2AE2E' }} />
            <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#F2AE2E' }}>
              {language === 'es' ? 'Proyectos destacados' : 'Featured projects'}
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );

  return (
    <section className="relative min-h-[85vh] flex items-center pt-[20px] pb-20">
      {/* Background: Parchment #F2BF80 */}
      <div className="absolute inset-0 bg-[#F2BF80]" />
      
      {/* Subtle pattern overlay */}
      <MuseumPattern variant="combined" className="opacity-30" />
      
      {/* Main Container */}
      <div className="w-full relative z-10 px-6 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content (7/12) - KEEP EXACTLY AS IS */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            {/* Overline with Slate - Hidden on mobile, visible on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex items-center gap-3"
            >
              
              
            </motion.div>

            {/* Logo/Title + Claim - Lado a lado responsive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-stretch gap-4 md:gap-6"
            >
              {/* Title and Claim - stacked (controls the size) */}
              <div className="flex flex-col gap-2 justify-center">
                <h1
                  className="font-semibold leading-tight text-[36px] font-bold"
                  style={{ 
                    fontFamily: 'Sora, sans-serif',
                    color: '#274259'
                  }}
                >
                  {language === 'es' ? 'Portafolio' : 'Portfolio'}
                </h1>
                
                <p
                  className="font-semibold italic leading-tight text-sm sm:text-base md:text-lg lg:text-xl"
                  style={{ 
                    fontFamily: 'Sora, sans-serif',
                    color: '#274259'
                  }}
                >
                  {language === 'es' 
                    ? 'De la esencia al diseño: Narrativas, experiencias de aprendizaje claras y... gamificables'
                    : 'From essence to design: Narratives, clear learning experiences and... gamifiable'
                  }
                </p>
              </div>

              {/* Logo - adapts to text container height */}
              <ImageWithFallback 
                src="https://narrlab.studio/img/LogoNarrlabs.png"
                alt={language === 'es' ? 'NarrLab - Estudio de diseño' : 'NarrLab - Design studio'}
                className="h-full w-auto flex-shrink-0"
              />
            </motion.div>

            {/* Description - Night at 70% */}
            

            {/* EXHIBIT DECK - Mobile only ( ml-[0px] mr-[124px] mt-[0px] mb-[32px]between description and CTAs) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden relative -mt-5"
            >
              <ExhibitDeck />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {/* Primary CTA - Copper #D95032 */}
              <button
                onClick={onViewPortfolio}
                className="group px-8 py-4 bg-[#D95032] text-[#F2EADF] rounded-2xl 
                         transition-all duration-300 flex items-center gap-3
                         hover:scale-[1.02] active:scale-[0.98] font-medium"
                style={{
                  boxShadow: '0 4px 16px rgba(217, 80, 50, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F24738';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#D95032';
                }}
              >
                <span>
                  {language === 'es' ? 'Ver proyectos' : 'View projects'}
                </span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA - Slate #274259 */}
              <button
                onClick={onAbout}
                className="px-8 py-4 bg-transparent border-2 rounded-2xl 
                         transition-all duration-300 font-medium
                         hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  borderColor: '#274259',
                  color: '#274259'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#274259';
                  e.currentTarget.style.color = '#F2EADF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#274259';
                }}
              >
                <span>
                  {language === 'es' ? 'Sobre NarrLab' : 'About NarrLab'}
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: EXHIBIT DECK (5/12) - Desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block lg:col-span-5 relative"
          >
            <ExhibitDeck />
          </motion.div>
        </div>
        </div>
      </div>

      {/* Speed line divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(to right, transparent, rgba(242, 174, 46, 0.4) 20%, rgba(242, 174, 46, 0.4) 80%, transparent)'
      }} />
    </section>
  );
}