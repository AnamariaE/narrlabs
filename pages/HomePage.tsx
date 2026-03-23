import React, { useState, useMemo } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { useNavigate } from 'react-router';
import { ProjectCard } from '../components/ProjectCard';
import { AnimatedMasonryGrid } from '../components/MasonryGrid';
import { HeroStudio, MuseumDivider, MuseumPattern, CuratorBoard, ArchiveTabs } from '../components/museum';
import { CosmicPattern, CosmicDivider } from '../components/personal';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import siteData from '../data/site-data';
import { motion, useScroll, useTransform } from 'motion/react';

export function HomePage() {
  const { language, t } = useI18n();
  const { mode } = useBrand();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCuratorMode, setIsCuratorMode] = useState(false);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const backgroundY = useTransform(scrollY, [0, 500], [0, -100]);

  // Hero background image for personal mode
  const personalHeroImage = 'https://images.unsplash.com/photo-1742440710136-1976b1cad864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGRlc2lnbiUyMHN0dWRpb3xlbnwxfHx8fDE3Njg0ODAwNTl8MA&ixlib=rb-4.1.0&q=80&w=1080';

  // Get featured projects based on brand mode
  const featuredProjects = useMemo(() => {
    let projects = siteData.projects.filter(p => p.isFeatured === true);
    
    if (mode === 'studio') {
      projects = projects.filter(p => p.isStudioProject !== false);
    }
    
    return projects.slice(0, 3);
  }, [mode]);

  // Only filter for Studio mode
  const filteredProjects = useMemo(() => {
    // In personal mode, we don't show the full grid
    if (mode === 'personal') return [];
    
    let filtered = [...siteData.projects];

    // Filter by brand mode (studio only)
    if (mode === 'studio') {
    filtered = filtered.filter(p => p.isStudioProject !== false);

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => {
        // Support both old single category and new dual categories system
        if (p.categories && p.categories.length > 0) {
          // Check if any of the categories matches the selected filter
          return p.categories.includes(selectedCategory);
        }
        // Fallback to old category field
        return p.category === selectedCategory;
      });
    }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.summary_es.toLowerCase().includes(query) ||
        p.summary_en.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, mode]);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Different for Studio vs Personal */}
      {mode === 'studio' ? (
        <>
          {/* Studio mode: HeroStudio component (no background image) */}
          <HeroStudio
            brand={siteData.studio.brand}
            claim={language === 'es' ? siteData.studio.claim : 'Where pedagogy becomes design.'}
            onViewPortfolio={() => {
              const portfolioSection = document.getElementById('portfolio');
              portfolioSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            onAbout={() => navigate('why-narrlab')}
            onNavigate={navigate}
            language={language}
          />

          {/* Services Section - MOVED FROM HERO - Museum exhibit labels style */}
          <section className="py-10 relative" style={{ backgroundColor: '#F2EADF' }}>
            {/* Subtle constellation pattern */}
            <div 
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(39, 66, 89, 0.8) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />

            <div className="w-full relative z-10 px-6 sm:px-8 lg:px-10">
              <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-5"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F2AE2E]/60" />
                    <div className="w-2 h-2 rounded-full bg-[#F2AE2E]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F2AE2E]/60" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: '#274259' }}>
                    {language === 'es' ? 'Servicios destacados' : 'Featured services'}
                  </p>
                </motion.div>

                {/* Service Cards - 3 horizontal pill cards (museum exhibit label style) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {/* Service 1: Diseño instruccional y LXD */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="group relative rounded-3xl p-3 transition-all duration-300"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '2px solid rgba(242, 174, 46, 0.2)',
                      boxShadow: '0 2px 12px rgba(18, 17, 38, 0.06)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.5)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(18, 17, 38, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.2)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(18, 17, 38, 0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Icon */}
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-all duration-300"
                      style={{ backgroundColor: '#D95032' }}
                    >
                      <svg className="w-4 h-4 text-[#F2EADF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    {/* Text */}
                    <h3 
                      className="font-semibold text-xs mb-1.5 leading-tight"
                      style={{ fontFamily: 'Sora, sans-serif', color: '#121126' }}
                    >
                      {language === 'es' 
                        ? 'Diseño instruccional y LXD'
                        : 'Instructional design & LXD'}
                    </h3>
                    <div 
                      className="w-8 h-0.5 rounded-full mt-1.5"
                      style={{ backgroundColor: 'rgba(242, 174, 46, 0.3)' }}
                    />
                  </motion.div>

                  {/* Service 2: Producción multimedia */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="group relative rounded-3xl p-3 transition-all duration-300"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '2px solid rgba(242, 174, 46, 0.2)',
                      boxShadow: '0 2px 12px rgba(18, 17, 38, 0.06)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.5)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(18, 17, 38, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.2)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(18, 17, 38, 0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Icon */}
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-all duration-300"
                      style={{ backgroundColor: '#D95032' }}
                    >
                      <svg className="w-4 h-4 text-[#F2EADF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    {/* Text */}
                    <h3 
                      className="font-semibold text-xs mb-1.5 leading-tight"
                      style={{ fontFamily: 'Sora, sans-serif', color: '#121126' }}
                    >
                      {language === 'es' 
                        ? 'Producción multimedia (video, audio, motion)'
                        : 'Multimedia production (video, audio, motion)'}
                    </h3>
                    <div 
                      className="w-8 h-0.5 rounded-full mt-1.5"
                      style={{ backgroundColor: 'rgba(242, 174, 46, 0.3)' }}
                    />
                  </motion.div>

                  {/* Service 3: Gamificación y storytelling */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="group relative rounded-3xl p-3 transition-all duration-300"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '2px solid rgba(242, 174, 46, 0.2)',
                      boxShadow: '0 2px 12px rgba(18, 17, 38, 0.06)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.5)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(18, 17, 38, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.2)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(18, 17, 38, 0.06)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Icon */}
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-all duration-300"
                      style={{ backgroundColor: '#D95032' }}
                    >
                      <svg className="w-4 h-4 text-[#F2EADF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    {/* Text */}
                    <h3 
                      className="font-semibold text-xs mb-1.5 leading-tight"
                      style={{ fontFamily: 'Sora, sans-serif', color: '#121126' }}
                    >
                      {language === 'es' 
                        ? 'Gamificación y storytelling'
                        : 'Gamification & storytelling'}
                    </h3>
                    <div 
                      className="w-8 h-0.5 rounded-full mt-1.5"
                      style={{ backgroundColor: 'rgba(242, 174, 46, 0.3)' }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        // Personal mode: Cosmic Editorial Diary hero - NO stock photo overlay
        <section className="relative min-h-[85vh] flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background: Personal Bg #F2EADF */}
          <div className="absolute inset-0" style={{ backgroundColor: '#F2EADF' }} />
          
          {/* Subtle cosmic pattern overlay */}
          <CosmicPattern variant="combined" className="opacity-30" />
          
          {/* Main Container */}
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Text Content (7/12) */}
              <div className="lg:col-span-7 space-y-8">
                {/* Overline with Accent */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#8466F2]" />
                    <div className="w-1 h-1 rounded-full bg-[#8466F2]/60 self-center" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8466F2]/80 self-center" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8466F2] font-bold">
                    {language === 'es' ? 'Diseñadora instruccional' : 'Instructional Designer'}
                  </span>
                </motion.div>

                {/* Title - Ink #1E1940 */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1]"
                  style={{ 
                    fontFamily: 'Sora, sans-serif', 
                    letterSpacing: '-0.02em',
                    color: '#1E1940'
                  }}
                >
                  {siteData.person.name}
                </motion.h1>

                {/* Role - Primary #5B44F2 */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed"
                  style={{ 
                    fontFamily: 'Sora, sans-serif',
                    color: '#5B44F2'
                  }}
                >
                  {siteData.person.role}
                </motion.p>

                {/* Description - Muted Ink */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base md:text-lg leading-relaxed max-w-2xl"
                  style={{ color: 'rgba(30, 25, 64, 0.7)' }}
                >
                  {t('hero.claim')}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  {/* Primary CTA - Primary #5B44F2 */}
                  <button
                    onClick={() => navigate('/cv')}
                    className="group px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-3
                             hover:scale-[1.02] active:scale-[0.98] font-medium"
                    style={{
                      backgroundColor: '#5B44F2',
                      color: '#ffffff',
                      boxShadow: '0 4px 16px rgba(91, 68, 242, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#3A29A6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#5B44F2';
                    }}
                  >
                    <span>{t('nav.cv')}</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Secondary CTA - Accent #8466F2 */}
                  <button
                    onClick={() => navigate('/about')}
                    className="px-8 py-4 bg-transparent rounded-2xl transition-all duration-300 font-medium
                             hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      border: '2px solid rgba(49, 39, 115, 0.18)',
                      color: '#1E1940'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(132, 102, 242, 0.12)';
                      e.currentTarget.style.borderColor = '#8466F2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(49, 39, 115, 0.18)';
                    }}
                  >
                    <span>{t('nav.about')}</span>
                  </button>
                </motion.div>
              </div>

              {/* Right Column: Featured Info Plaque (5/12) - Surface white */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-5"
              >
                <div 
                  className="rounded-3xl overflow-hidden relative"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid rgba(49, 39, 115, 0.18)',
                    boxShadow: `
                      0 12px 40px rgba(30, 25, 64, 0.12),
                      inset 0 1px 0 rgba(132, 102, 242, 0.1)
                    `
                  }}
                >
                  {/* Header with Primary gradient */}
                  <div 
                    className="px-8 py-6 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #5B44F2 0%, #8466F2 100%)'
                    }}
                  >
                    {/* Subtle constellation pattern in header */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}
                    />
                    <p className="text-xs uppercase tracking-[0.15em] font-bold mb-2 text-white/90 relative z-10">
                      {language === 'es' ? 'Experiencia destacada' : 'Featured experience'}
                    </p>
                    <div className="flex justify-center relative z-10">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                        <div className="w-2 h-2 rounded-full bg-white/90" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      </div>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-8">
                    {/* Decorative speed-line corners */}
                    <div 
                      className="absolute top-24 left-0 w-8 h-8 border-l border-b rounded-bl-2xl"
                      style={{ borderColor: 'rgba(132, 102, 242, 0.3)' }}
                    />
                    <div 
                      className="absolute top-24 right-0 w-8 h-8 border-r border-b rounded-br-2xl"
                      style={{ borderColor: 'rgba(132, 102, 242, 0.3)' }}
                    />

                    {/* Info items */}
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(30, 25, 64, 0.5)' }}>
                          {language === 'es' ? 'Especialización' : 'Specialization'}
                        </p>
                        <p className="font-semibold" style={{ 
                          fontFamily: 'Sora, sans-serif',
                          color: '#1E1940'
                        }}>
                          {language === 'es' ? 'Diseño instruccional y multimedia' : 'Instructional & multimedia design'}
                        </p>
                      </motion.div>

                      <CosmicDivider variant="speedline" />

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                      >
                        <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(30, 25, 64, 0.5)' }}>
                          {language === 'es' ? 'Enfoque' : 'Focus'}
                        </p>
                        <p className="font-semibold" style={{ 
                          fontFamily: 'Sora, sans-serif',
                          color: '#1E1940'
                        }}>
                          {language === 'es' 
                            ? 'Experiencias de aprendizaje significativas'
                            : 'Meaningful learning experiences'}
                        </p>
                      </motion.div>

                      <CosmicDivider variant="speedline" />

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="pt-2"
                      >
                        <div 
                          className="p-4 rounded-2xl"
                          style={{
                            backgroundColor: 'rgba(132, 102, 242, 0.08)',
                            border: '1px solid rgba(132, 102, 242, 0.2)'
                          }}
                        >
                          <p className="text-sm leading-relaxed" style={{ color: '#1E1940' }}>
                            {language === 'es'
                              ? 'Transformando ideas complejas en experiencias educativas claras y efectivas.'
                              : 'Transforming complex ideas into clear and effective educational experiences.'}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects - ONLY in Personal mode */}
      {mode === 'personal' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {language === 'es' ? 'Proyectos destacados' : 'Featured projects'}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <ProjectCard
                    project={project}
                    onViewProject={(slug) => navigate(`/project/${slug}`)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects with Filter - ONLY in Studio mode */}
      {mode === 'studio' && !isCuratorMode && (
        <section id="portfolio" className="pt-4 pb-20 lg:py-20 px-6 sm:px-8 lg:px-10 relative" style={{ backgroundColor: '#F2BF80' }}>
          {/* Museum Pattern Background */}
          <MuseumPattern variant="combined" className="opacity-40" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header with Archive Tabs */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-6">
              {/* Left: Title */}
              <div className="text-left flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F2AE2E]/60" />
                    <div className="w-2 h-2 rounded-full bg-[#F2AE2E]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F2AE2E]/60" />
                  </div>
                </motion.div>
                <motion.h2 
                  className="text-3xl md:text-4xl mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ fontFamily: 'Sora, sans-serif', letterSpacing: '-0.015em', color: '#21374d' }}
                >
                  {t('portfolio.all')}
                </motion.h2>
              </div>

              {/* Right: Archive Tabs - centered on mobile, right on desktop */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex justify-center md:justify-end"
              >
                <ArchiveTabs
                  activeTab={isCuratorMode ? 'curator' : 'portfolio'}
                  onTabChange={(tab) => {
                    if (tab === 'curator') {
                      setIsCuratorMode(true);
                    } else {
                      setIsCuratorMode(false);
                    }
                  }}
                  portfolioLabel={t('portfolio.all')}
                  curatorLabel={language === 'es' ? 'Modo curador' : 'Curator mode'}
                  playInvitation={language === 'es' ? 'si tienes tiempo juguemos!' : 'if you have time let\'s play!'}
                />
              </motion.div>
            </div>

            <MuseumDivider variant="constellation" className="mb-12" />

            {/* Filters */}
            <motion.div 
              className="-mt-10 mb-12 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Search Bar - Surface background */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F2AE2E]" />
                <Input
                  type="text"
                  placeholder={t('portfolio.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 text-base rounded-2xl transition-all"
                  style={{
                    backgroundColor: '#F2EADF',
                    color: '#121126',
                    border: '1px solid rgba(242, 174, 46, 0.3)',
                    boxShadow: '0 2px 8px rgba(18, 17, 38, 0.04)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#F2AE2E';
                    e.target.style.boxShadow = '0 4px 12px rgba(242, 174, 46, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(242, 174, 46, 0.3)';
                    e.target.style.boxShadow = '0 2px 8px rgba(18, 17, 38, 0.04)';
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: 'rgba(18, 17, 38, 0.5)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#121126'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(18, 17, 38, 0.5)'}
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-3">
                <Badge
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  className={`cursor-pointer transition-all duration-300 px-6 py-2.5 text-sm rounded-xl font-medium`}
                  style={selectedCategory === 'all' ? {
                    backgroundColor: '#D95032',
                    color: '#F2EADF',
                    borderColor: '#D95032',
                    boxShadow: '0 4px 12px rgba(217, 80, 50, 0.25)'
                  } : {
                    borderColor: 'rgba(242, 174, 46, 0.4)',
                    borderWidth: '1px',
                    color: '#121126'
                  }}
                  onClick={() => setSelectedCategory('all')}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== 'all') {
                      e.currentTarget.style.borderColor = '#F2AE2E';
                      e.currentTarget.style.backgroundColor = 'rgba(242, 174, 46, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== 'all') {
                      e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.4)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {t('common.all')}
                </Badge>
                {siteData.portfolio_categories
                  .filter(category => {
                    // Only show categories that have at least one project
                    // Check both old category field and new categories array
                    const projectCount = siteData.projects.filter(p => {
                      if (p.categories && p.categories.length > 0) {
                        return p.categories.includes(category);
                      }
                      return p.category === category;
                    }).length;
                    return projectCount > 0;
                  })
                  .map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all duration-300 px-6 py-2.5 text-sm rounded-xl font-medium`}
                    style={selectedCategory === category ? {
                      backgroundColor: '#D95032',
                      color: '#F2EADF',
                      borderColor: '#D95032',
                      boxShadow: '0 4px 12px rgba(217, 80, 50, 0.25)'
                    } : {
                      borderColor: 'rgba(242, 174, 46, 0.4)',
                      borderWidth: '1px',
                      color: '#121126'
                    }}
                    onClick={() => setSelectedCategory(category)}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.borderColor = '#F2AE2E';
                        e.currentTarget.style.backgroundColor = 'rgba(242, 174, 46, 0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.4)';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Reset button - Slate */}
              {(selectedCategory !== 'all' || searchQuery) && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-sm flex items-center gap-2 
                             px-4 py-2 rounded-lg transition-all font-medium"
                    style={{
                      color: '#274259',
                      border: '1px solid rgba(242, 174, 46, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#274259';
                      e.currentTarget.style.backgroundColor = 'rgba(39, 66, 89, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(242, 174, 46, 0.3)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <X className="h-4 w-4" />
                    {t('portfolio.reset')}
                  </button>
                </div>
              )}
            </motion.div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <AnimatedMasonryGrid>
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    onViewProject={(slug) => navigate(`/project/${slug}`)}
                  />
                ))}
              </AnimatedMasonryGrid>
            ) : (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground text-lg">
                  {language === 'es' 
                    ? 'No se encontraron proyectos con estos criterios.'
                    : 'No projects found with these criteria.'}
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Curator Board - ONLY in Studio mode when Curator Mode is active */}
      {mode === 'studio' && isCuratorMode && (
        <CuratorBoard
          projects={filteredProjects}
          onViewProject={navigate}
          onClose={() => setIsCuratorMode(false)}
        />
      )}
    </div>
  );
}