import React from 'react';
import { ArrowRight, CheckCircle2, Target, Sparkles } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import siteData from '../data/site-data';
import { NarrabLogo } from '../components/NarrabLogo';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface StudioPageProps {
  onNavigate: (page: string, slug?: string) => void;
}

// Extracted FlippableCard component to prevent re-renders
const FlippableCard = React.memo(({ service, description, index }: { service: string; description: string; index: number }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  
  return (
    <motion.div
      className="h-[140px] perspective-1000 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-shadow"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <ImageWithFallback 
            src="https://narrlab.studio/img/LogoNarrlabs.png"
            alt="NarrLab"
            className="h-8 w-8 mb-4"
          />
          <p className="font-semibold text-lg pt-0">{service}</p>
        </div>
        
        {/* Back of card */}
        <div
          className="absolute w-full h-full bg-primary/5 border border-primary/20 rounded-xl p-6 flex items-center justify-center text-center shadow-sm"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <p className="text-sm text-muted-foreground leading-relaxed pt-0">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

FlippableCard.displayName = 'FlippableCard';

export function StudioPage() {
  const { language, t } = useI18n();
  const navigate = useNavigate();

  const services = language === 'es' 
    ? siteData.studio.services_es 
    : siteData.studio.services_en;

  const serviceDescriptions = language === 'es'
    ? siteData.studio.service_descriptions_es
    : siteData.studio.service_descriptions_en;

  const extras = language === 'es'
    ? siteData.studio.extras_es
    : siteData.studio.extras_en;

  const values = language === 'es'
    ? siteData.studio.values_es
    : siteData.studio.values_en;

  const mission = language === 'es'
    ? siteData.studio.mission_es
    : siteData.studio.mission_en;

  const vision = language === 'es'
    ? siteData.studio.vision_es
    : siteData.studio.vision_en;

  const description = language === 'es'
    ? siteData.studio.description_es
    : siteData.studio.description_en;

  const [activeChip, setActiveChip] = React.useState<number | null>(null);
  const [labView, setLabView] = React.useState<'before' | 'after'>('before');
  const [mobileExpandedCard, setMobileExpandedCard] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Split Layout */}
      <section className="-mt-[10px] md:mt-0 py-1 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mx-[0px] my-[-58px]">
            
            {/* LEFT COLUMN - Content */}
            <motion.div 
              className="mx-[0px] my-[12px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* NarrLab Logo */}
              <div className="mb-2 mx-[0px] mt-[0px] mb-[26px] p-[0px]">
                <ImageWithFallback 
                  src="https://narrlab.studio/img/isotipo-narralab.png"
                  alt={language === 'es' ? 'Isotipo NarrLab' : 'NarrLab Isotype'}
                  className="h-20 w-auto"
                />
              </div>

              {/* Eyebrow */}
              <div className="inline-block">
                <span 
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                  style={{ 
                    backgroundColor: 'rgba(217, 80, 50, 0.1)',
                    color: '#D95032',
                    border: '1px solid rgba(217, 80, 50, 0.2)'
                  }}
                >
                  {language === 'es' ? 'ESTUDIO / LAB / APRENDIZAJE' : 'STUDIO / LAB / LEARNING'}
                </span>
              </div>

              {/* H1 */}
              <h1 className="font-bold leading-tight text-[40px]" style={{ color: '#21374d' }}>
                {language === 'es' 
                  ? 'Tu conocimiento tiene forma. Narrlab la encuentra y te ayuda a contarla.'
                  : 'Your knowledge has shape. Narrlab finds it and helps you tell it.'}
              </h1>

              {/* Subheadline */}
              <p className="leading-relaxed text-[15px]" style={{ color: '#274259' }}>
                {language === 'es'
                  ? 'Narrlab es un estudio laboratorio que transforma contenido complejo en experiencias de aprendizaje claras, coherentes y listas para funcionar con la identidad visual de tu organización, no una plantilla genérica.'
                  : 'Narrlab is a studio laboratory that transforms complex content into clear, coherent learning experiences ready to work with your organization\'s visual identity, not a generic template.'}
              </p>

              {/* CTAs - Desktop only */}
              <div className="hidden lg:flex flex-wrap gap-4 pt-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/contact')}
                  style={{
                    backgroundColor: '#D95032',
                    color: '#F2EADF',
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  {language === 'es' ? 'Hablemos de tu proyecto' : 'Let\'s talk about your project'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/portfolio')}
                  style={{
                    borderColor: '#D95032',
                    color: '#D95032'
                  }}
                  className="hover:bg-[#D95032]/10 transition-colors"
                >
                  {language === 'es' ? 'Ver portafolio' : 'View portfolio'}
                </Button>
              </div>
            </motion.div>

            {/* RIGHT COLUMN - Lab Desk Composition */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Stacked Cards Container with Dark Background */}
              <div className="relative">
                {/* Dark base shape - Epic visual anchor */}
                <div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    backgroundColor: '#1E1940',
                    boxShadow: '0 20px 60px rgba(30, 25, 64, 0.3)',
                    zIndex: 0,
                  }}
                />
                
                {/* Content container */}
                <div className="relative rounded-[32px] px-[16px] pt-[15px] pb-[0px]"
                  style={{
                    background: 'linear-gradient(to bottom, #121126, #263e55)',
                    boxShadow: '0 20px 60px rgba(30, 25, 64, 0.3)',
                    marginTop: '-20px'
                  }}
                >
                  {/* Toggle Chips */}
                  <div className="flex justify-center gap-2 mb-4">
                    <button
                      onClick={() => setLabView('before')}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: labView === 'before' ? '#D95032' : 'transparent',
                        color: labView === 'before' ? '#F2EADF' : '#F2EADF',
                        border: `2px solid ${labView === 'before' ? '#D95032' : 'rgba(242, 234, 223, 0.3)'}`,
                      }}
                      aria-pressed={labView === 'before'}
                      aria-label={language === 'es' ? 'Mostrar estado antes' : 'Show before state'}
                    >
                      {language === 'es' ? 'Antes: notas' : 'Before: notes'}
                    </button>
                    <button
                      onClick={() => setLabView('after')}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        backgroundColor: labView === 'after' ? '#D95032' : 'transparent',
                        color: labView === 'after' ? '#F2EADF' : '#F2EADF',
                        border: `2px solid ${labView === 'after' ? '#D95032' : 'rgba(242, 234, 223, 0.3)'}`,
                      }}
                      aria-pressed={labView === 'after'}
                      aria-label={language === 'es' ? 'Mostrar estado después' : 'Show after state'}
                    >
                      {language === 'es' ? 'Después: experiencia' : 'After: experience'}
                    </button>
                  </div>
                
                  {/* Cards container - using SAME logic as Portfolio HeroStudio */}
                  <div className="relative z-10 pt-6 pb-8 px-4">
                    <div className="relative mx-[0px] my-[-25px] p-[0px]" style={{ height: '420px' }}>
                      {/* Card 0: Chaotic Sticky Note (Before) */}
                      <motion.div
                        initial={{ opacity: 0, y: 30, rotate: 0 }}
                        animate={{ 
                          opacity: labView === 'before' ? 1 : 0.9,
                          y: 0,
                          rotate: -3
                        }}
                        transition={{ 
                          duration: 0.7, 
                          delay: 0.1,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="absolute rounded-3xl overflow-hidden cursor-pointer group focus:outline-none"
                        style={{
                          top: '0px',
                          left: '0px',
                          right: '32px',
                          zIndex: labView === 'before' ? 10 : 3,
                          backgroundColor: '#F2EADF',
                          border: '2px solid rgba(242, 174, 46, 0.3)',
                          boxShadow: `
                            0 8px 24px rgba(18, 17, 38, 0.2),
                            inset 0 1px 0 rgba(242, 174, 46, 0.1)
                          `
                        }}
                        whileHover={{
                          y: -8,
                          rotate: 0,
                          zIndex: 20,
                          transition: { duration: 0.3 }
                        }}
                        onClick={() => {
                          setLabView('before');
                          setMobileExpandedCard(mobileExpandedCard === 0 ? null : 0);
                        }}
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
                            0 8px 24px rgba(18, 17, 38, 0.2),
                            inset 0 1px 0 rgba(242, 174, 46, 0.1)
                          `;
                        }}
                        aria-label={language === 'es' ? 'Vista antes: notas del cliente' : 'Before view: client notes'}
                      >
                        {/* Inner yellow sticky note */}
                        <div className="p-6 bg-[#FFF4A3] h-full">
                          <div className="space-y-3">
                            <div className="flex items-start gap-2">
                              <span className="text-2xl">📌</span>
                              <div>
                                <p className="font-bold text-sm mb-2" style={{ color: '#121126' }}>
                                  {language === 'es' ? 'Ideas del cliente:' : 'Client ideas:'}
                                </p>
                                <ul className="space-y-1 text-xs" style={{ color: '#121126' }}>
                                  <li className="line-through opacity-60">• {language === 'es' ? 'Hacer curso video' : 'Make video course'}</li>
                                  <li>• {language === 'es' ? 'Quiero gamificación???' : 'Want gamification???'}</li>
                                  <li className="underline">• {language === 'es' ? 'DEBE SER INTERACTIVO' : 'MUST BE INTERACTIVE'}</li>
                                  <li>• {language === 'es' ? 'Animaciones' : 'Animations'} 🎨</li>
                                  <li className="font-bold">• {language === 'es' ? 'Tecnología nueva!!' : 'New tech!!'}</li>
                                  <li className="text-[10px]">• {language === 'es' ? '(no sé cómo medir resultados)' : '(don\'t know how to measure)'}</li>
                                </ul>
                              </div>
                            </div>
                            <div className="border-t border-[#F2AE2E] pt-2">
                              <p className="text-[10px] italic opacity-70">
                                {language === 'es' ? '"Vivo pero no usable"' : '"Alive but not usable"'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Decorative corner accents */}
                        <div 
                          className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 rounded-tl-2xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
                          style={{ borderColor: '#F2AE2E' }}
                        />
                        <div 
                          className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 rounded-tr-2xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
                          style={{ borderColor: '#F2AE2E' }}
                        />
                      </motion.div>

                      {/* Card 2: Polished Final Module (After) - Bottom */}
                      <motion.div
                        initial={{ opacity: 0, y: 30, rotate: 0 }}
                        animate={{ 
                          opacity: labView === 'after' ? 1 : 0.9,
                          y: 0,
                          rotate: 2
                        }}
                        transition={{ 
                          duration: 0.7, 
                          delay: 0.4,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="absolute rounded-3xl overflow-hidden cursor-pointer group focus:outline-none"
                        style={{
                          top: '100px',
                          left: '32px',
                          right: '0px',
                          zIndex: labView === 'after' ? 10 : 1,
                          backgroundColor: '#F2EADF',
                          border: '2px solid rgba(242, 174, 46, 0.3)',
                          boxShadow: `
                            0 16px 32px rgba(18, 17, 38, 0.3),
                            inset 0 1px 0 rgba(242, 174, 46, 0.1)
                          `
                        }}
                        whileHover={{
                          y: -8,
                          rotate: 0,
                          zIndex: 20,
                          transition: { duration: 0.3 }
                        }}
                        onClick={() => {
                          setLabView('after');
                          setMobileExpandedCard(mobileExpandedCard === 2 ? null : 2);
                        }}
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
                            0 16px 32px rgba(18, 17, 38, 0.3),
                            inset 0 1px 0 rgba(242, 174, 46, 0.1)
                          `;
                        }}
                        aria-label={language === 'es' ? 'Vista después: experiencia final' : 'After view: final experience'}
                      >
                        {/* Inner polished module */}
                        <div className="p-6 bg-white h-full">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D95032' }}></div>
                                <span className="text-xs font-bold tracking-wide" style={{ color: '#D95032' }}>
                                  {language === 'es' ? 'MÓDULO 1' : 'MODULE 1'}
                                </span>
                              </div>
                              <CheckCircle2 className="h-5 w-5" style={{ color: '#4CAF50' }} />
                            </div>
                            
                            <h4 className="font-bold text-lg" style={{ color: '#121126' }}>
                              {language === 'es' ? 'Introducción clara' : 'Clear introduction'}
                            </h4>
                            
                            <div className="bg-gradient-to-br from-[#F2BF80]/20 to-[#F2AE2E]/10 rounded-lg p-4 border border-[#F2AE2E]/30">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D95032' }}>
                                  <span className="text-white">🎯</span>
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="h-2 bg-[#D95032]/30 rounded w-full"></div>
                                  <div className="h-2 bg-[#D95032]/20 rounded w-4/5"></div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button 
                                className="flex-1 px-3 py-2 rounded-lg text-xs font-medium"
                                style={{ 
                                  backgroundColor: '#D95032',
                                  color: '#F2EADF'
                                }}
                              >
                                {language === 'es' ? 'Continuar' : 'Continue'}
                              </button>
                              <button 
                                className="px-3 py-2 rounded-lg text-xs"
                                style={{ 
                                  border: '1px solid rgba(18, 17, 38, 0.2)',
                                  color: '#121126'
                                }}
                              >
                                💾
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Decorative corner accents */}
                        <div 
                          className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 rounded-tl-2xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
                          style={{ borderColor: '#F2AE2E' }}
                        />
                        <div 
                          className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 rounded-tr-2xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
                          style={{ borderColor: '#F2AE2E' }}
                        />
                      </motion.div>
                    </div>

                    {/* Deck label */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.8 }}
                      className="text-center mx-[0px] mt-[-1px] mb-[0px]"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{
                          backgroundColor: 'rgba(242, 174, 46, 0.12)',
                          border: '1px solid rgba(242, 174, 46, 0.25)',
                          marginTop: '-12px'
                        }}
                      >
                        <Sparkles className="w-3 h-3" style={{ color: '#F2AE2E' }} />
                        <span className="text-xs uppercase tracking-wider font-bold" style={{ color: '#F2AE2E' }}>
                          {language === 'es' ? 'De las ideas a las OVA\'s' : 'From ideas to Learning Objects'}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-center text-sm italic mx-[0px] mt-[25px] mb-[0px]" style={{ color: '#D95032' }}>
                {language === 'es' 
                  ? 'No solo diseñamos: transformamos caos en claridad.'
                  : 'We don\'t just design: we transform chaos into clarity.'}
              </p>
            </motion.div>

            {/* CTAs - Mobile only (below cards) */}
            <motion.div 
              className="flex lg:hidden flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button 
                size="lg" 
                onClick={() => navigate('/contact')}
                style={{
                  backgroundColor: '#D95032',
                  color: '#F2EADF',
                }}
                className="hover:opacity-90 transition-opacity"
              >
                {language === 'es' ? 'Hablemos de tu proyecto' : 'Let\'s talk about your project'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/portfolio')}
                style={{
                  borderColor: '#D95032',
                  color: '#D95032'
                }}
                className="hover:bg-[#D95032]/10 transition-colors"
              >
                {language === 'es' ? 'Ver portafolio' : 'View portfolio'}
              </Button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* El problema que resolvemos - NEW SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-center" style={{ color: '#21374d' }}>
              {language === 'es'
                ? 'Tienes el conocimiento. El problema es cómo hacerlo llegar.'
                : 'You have the knowledge. The problem is how to deliver it.'}
            </h2>

            {/* Body copy */}
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>
                {language === 'es'
                  ? 'Muchas organizaciones invierten en formación y obtienen cursos que nadie termina. No porque el contenido sea malo - sino porque nadie lo estructuró pensando en quien lo recibe, y nadie lo hizo visualmente coherente con la marca.'
                  : 'Many organizations invest in training and get courses that no one finishes. Not because the content is bad - but because no one structured it thinking about who receives it, and no one made it visually coherent with the brand.'}
              </p>

              <p>
                {language === 'es'
                  ? 'La solución habitual es contratar tres proveedores distintos: una agencia de elearning, una de diseño, y algo de IA. El resultado: tres piezas que no hablan entre sí.'
                  : 'The usual solution is to hire three different providers: an elearning agency, a design agency, and some AI. The result: three pieces that don\'t talk to each other.'}
              </p>

              <p className="font-semibold" style={{ color: '#D95032' }}>
                {language === 'es'
                  ? 'Narrlab hace las dos cosas a la vez - con un solo criterio, desde el principio hasta el final.'
                  : 'Narrlab does both at once - with a single criterion, from beginning to end.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA to Why NarrLab Page */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              size="lg"
              onClick={() => navigate('/why-narrlab')}
              className="group"
              style={{ 
                backgroundColor: '#D95032',
                color: '#F2EADF',
              }}
            >
              {language === 'es' ? '¿Por qué NarrLab?' : 'Why NarrLab?'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section id="method-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-center text-[32px] mx-[0px] mt-[-18px] mb-[53px] text-[#21374d]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {language === 'es' ? (
              <>El <span className="font-bold">método</span> NarrLab</>
            ) : (
              <>The NarrLab <span className="font-bold">Method</span></>
            )}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -4 }}
              >
                <h3 className="mb-3 text-primary font-bold text-[15px]">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="pt-6 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="mb-12 text-center text-[32px] font-bold text-[#21374d]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('studio.services')}
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              return <FlippableCard key={index} service={service} description={serviceDescriptions[index]} index={index} />;
            })}
          </div>
        </div>
      </section>

      {/* Casos Destacados - Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#21374d' }}>
              {language === 'es'
                ? 'De documentos a experiencias reales'
                : 'From documents to real experiences'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {language === 'es'
                ? 'Comunidades de agricultores. Voluntarios internacionales. Equipos de think tanks. Cada proyecto, con su propio contexto - y un resultado que funciona.'
                : 'Farmers communities. International volunteers. Think tank teams. Each project, with its own context - and a result that works.'}
            </p>
          </motion.div>

          {/* Featured Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.projects
              .filter(p => p.isFeatured && p.isStudioProject)
              .slice(0, 3)
              .map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/project/${project.slug}`)}
                >
                  {/* Project Card */}
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <ImageWithFallback
                        src={project.cover_image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" style={{ borderColor: '#D95032', color: '#D95032' }}>
                          {project.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{project.year}</span>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {language === 'es' ? project.summary_es : project.summary_en}
                      </p>
                      
                      <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: '#D95032' }}>
                        <span>{language === 'es' ? 'Ver proyecto' : 'View project'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* View All Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/portfolio')}
              style={{
                borderColor: '#D95032',
                color: '#D95032'
              }}
              className="hover:bg-[#D95032]/10 transition-colors"
            >
              {language === 'es' ? 'Ver todos los proyectos' : 'View all projects'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Extras Section */}
      <section className="bg-muted/10 px-[32px] py-[1px]">
        <div className="max-w-6xl mx-auto">
          {/* Decorative divider */}
          
          
          {/* Grouped content with subtle border */}
          <div className="border border-border/50 rounded-2xl bg-card/30 px-[32px] py-[31px]">
            <motion.p 
              className="text-center mb-6 text-[24px] font-bold"
              style={{ color: '#D95032' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              ¡También hacemos esto muy bien! (y nos encanta) ;)
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {extras.chips.map((chip, index) => (
                <Badge 
                  key={index}
                  variant={activeChip === index ? "default" : "outline"}
                  className="px-4 py-2 text-sm rounded-full cursor-pointer hover:bg-primary/10 transition-colors font-bold"
                  onClick={() => setActiveChip(activeChip === index ? null : index)}
                >
                  {chip.label}
                </Badge>
              ))}
            </motion.div>
            {activeChip !== null && (
              <motion.div 
                className="max-w-2xl mx-auto text-center"
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: 10, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {extras.chips[activeChip].tooltip}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="mb-8 text-center text-[24px] text-[#21374d]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {language === 'es' ? (
              <>Nuestro <span className="font-bold">enfoque</span></>
            ) : (
              <>Our <span className="font-bold">approach</span></>
            )}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🎯',
                title: language === 'es' ? 'Centrado en resultados' : 'Results-focused',
                description: language === 'es'
                  ? 'Diseñamos con objetivos de aprendizaje claros y métricas medibles.'
                  : 'We design with clear learning objectives and measurable metrics.'
              },
              {
                emoji: '♿',
                title: language === 'es' ? 'Accesible e inclusivo' : 'Accessible & inclusive',
                description: language === 'es'
                  ? 'Cada experiencia está diseñada para ser accesible a todas las audiencias.'
                  : 'Every experience is designed to be accessible to all audiences.'
              },
              {
                emoji: '🚀',
                title: language === 'es' ? 'Escalable' : 'Scalable',
                description: language === 'es'
                  ? 'Creamos sistemas, plantillas y toolkits para maximizar el impacto.'
                  : 'We create systems, templates, and toolkits to maximize impact.'
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{item.emoji}</span>
                </div>
                <h4 className="mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{
          backgroundImage: 'url(https://narrlab.studio/img/sepia-plasterboard-texture.jpg)',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundSize: '400px 400px'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 font-bold text-[32px] text-[#21374d]">
            {language === 'es' 
              ? '¿Tienes un proyecto en mente?' 
              : 'Do you have a project in mind?'}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-[18px]">
            {language === 'es'
              ? 'No necesitas tener todo claro. Empieza por contarnos qué tienes y qué necesitas lograr - el resto lo trabajamos juntos.'
              : 'You don\'t need to have everything figured out. Start by telling us what you have and what you need to achieve - we\'ll work out the rest together.'}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/contact')} 
              size="lg"
              style={{
                backgroundColor: '#D95032',
                color: '#F2EADF',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              {language === 'es' ? 'Cuéntanos qué tienes' : 'Tell us what you have'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 
            className="mb-8 text-[24px] italic font-bold text-[#21374d]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('studio.clients')}
          </motion.h2>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {siteData.studio.selected_clients.map((client) => (
              <Badge key={client} variant="outline" className="px-6 py-3 text-base">
                {client}
              </Badge>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}