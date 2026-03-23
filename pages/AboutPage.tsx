import React from 'react';
import { Mail, Linkedin, ExternalLink, ChevronDown, ChevronUp, Play, Pause, Volume2 } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import siteData from '../data/site-data';
import { ObfuscatedEmail } from '../components/ObfuscatedEmail';

export function AboutPage() {
  const { language, t } = useI18n();
  const { mode } = useBrand();
  const navigate = useNavigate();
  const [showAllSkills, setShowAllSkills] = React.useState(false);
  const [storyExpanded, setStoryExpanded] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Display only top 8 skills initially
  const displayedSkills = showAllSkills ? siteData.skills : siteData.skills.slice(0, 8);

  // Role translation based on language
  const roleText = language === 'es' 
    ? 'Diseñadora Instruccional y Multimedia'
    : siteData.person.role;

  // Location update
  const locationText = language === 'es'
    ? 'Zaragoza, ES'
    : 'Zaragoza, ES';

  // Audio controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Story content
  const storyPreview = language === 'es'
    ? 'Hay un hilo que recorre todo lo que hago: convertir lo complejo en algo claro y que además se sienta humano. Yo vengo de comunicaciones. Ahí vi una oportunidad evidente: si el mensaje importa, entonces el diseño no es "lo bonito", es el motor que puede mejorar y amplificar cómo una idea llega, se entiende y se queda.'
    : 'There\'s a thread running through everything I do: turning complexity into clarity while keeping it human. I come from communications. There I saw an obvious opportunity: if the message matters, then design isn\'t "the pretty part", it\'s the engine that can improve and amplify how an idea lands, is understood, and stays.';

  const storyFull = language === 'es'
    ? `Hay un hilo que recorre todo lo que hago: convertir lo complejo en algo claro y que además se sienta humano. Yo vengo de comunicaciones. Ahí vi una oportunidad evidente: si el mensaje importa, entonces el diseño no es "lo bonito", es el motor que puede mejorar y amplificar cómo una idea llega, se entiende y se queda.

Años después empecé como profesora universitaria en El Salvador. Y aunque la tecnología siempre fue parte de mi vida, enseñar me obligó a hacerme una pregunta incómoda: ¿cómo uno esos dos mundos sin que la tecnología se vuelva ruido, y sin que la teoría se vuelva un muro? Empecé a explorar formas de enseñar que fueran más cercanas, más activas, más aplicables. Desde la teoría de Humanidades Digitales encontré rigor académico y una mirada crítica que me dio estructura: método, pensamiento, contexto. Y con el tiempo todo fue encajando con Design Thinking: escuchar primero, prototipar temprano, iterar sin drama, diseñar para personas reales.

Mi obsesión, desde entonces, es doble: claridad y experiencia. Que aprender no sea "aguantar contenido", sino entender, probar, equivocarse con seguridad y avanzar. Me gusta lo divertido. Me gusta cuando aprender se siente vivo. Y sí: eso también es una pequeña rebelión personal, porque difiere muchísimo de la educación que vivió la Anamaría de 12 años, esa educación donde aprender era más cumplir que descubrir.

Hoy diseño experiencias de aprendizaje y multimedia que mezclan pedagogía, narrativa y tecnología con una idea simple: si algo puede explicarse mejor, puede diseñarse mejor. Y si puede diseñarse mejor, puede cambiar lo que las personas hacen con ese conocimiento. En resumen: no solo comunico ideas. Las convierto en caminos que se pueden recorrer.`
    : `There's a thread running through everything I do: turning complexity into clarity while keeping it human. I come from communications. There I saw an obvious opportunity: if the message matters, then design isn't "the pretty part", it's the engine that can improve and amplify how an idea lands, is understood, and stays.

Years later I started as a university professor in El Salvador. And although technology was always part of my life, teaching forced me to ask an uncomfortable question: how do I unite these two worlds without technology becoming noise, and without theory becoming a wall? I started exploring ways of teaching that were closer, more active, more applicable. From Digital Humanities theory I found academic rigor and a critical perspective that gave me structure: method, thinking, context. And over time everything fit together with Design Thinking: listen first, prototype early, iterate without drama, design for real people.

My obsession, since then, is twofold: clarity and experience. That learning isn't "enduring content," but understanding, trying, failing safely, and moving forward. I like fun. I like when learning feels alive. And yes: that's also a small personal rebellion, because it differs greatly from the education that 12-year-old Anamaría experienced, that education where learning was more about complying than discovering.

Today I design learning and multimedia experiences that blend pedagogy, narrative, and technology with a simple idea: if something can be explained better, it can be designed better. And if it can be designed better, it can change what people do with that knowledge. In short: I don't just communicate ideas. I turn them into paths that can be traveled.`;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: mode === 'personal' ? '#FEFDFB' : '#F2EADF' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-16 text-left font-bold text-[32px]">{t('about.title')}</h1>

        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Professional Avatar/Monogram */}
          <div className="md:col-span-1">
            <div 
              className="aspect-square rounded-3xl relative overflow-hidden shadow-sm"
              style={{ 
                background: 'linear-gradient(135deg, #8466F2 0%, #5B44F2 100%)',
              }}
            >
              {/* Subtle streamline art deco motif */}
              <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 200 200" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.07 }}
              >
                <path 
                  d="M20 100 Q 60 40, 100 100 T 180 100" 
                  stroke="white" 
                  strokeWidth="2" 
                  fill="none"
                />
                <path 
                  d="M20 120 Q 60 60, 100 120 T 180 120" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  fill="none"
                />
                <path 
                  d="M20 80 Q 60 20, 100 80 T 180 80" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  fill="none"
                />
              </svg>
              
              {/* Monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="font-semibold select-none"
                  style={{ 
                    fontSize: '5rem',
                    color: '#F2EADF',
                    letterSpacing: '-0.05em',
                    lineHeight: 1
                  }}
                >
                  AE
                </span>
              </div>
            </div>
          </div>

          {/* Bio - Improved hierarchy and contrast */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-3">
              <h2 className="mb-0" style={{ lineHeight: 1.2 }}>{siteData.person.name}</h2>
              <p 
                className="text-[17px] font-medium mb-0" 
                style={{ 
                  color: mode === 'personal' ? '#5B44F2' : '#D95032',
                  lineHeight: 1.4
                }}
              >
                {roleText}
              </p>
              <p 
                className="text-base" 
                style={{ 
                  color: mode === 'personal' ? 'rgba(30, 25, 64, 0.65)' : 'rgba(18, 17, 38, 0.65)',
                  lineHeight: 1.5
                }}
              >
                {locationText}
              </p>
            </div>

            <p 
              className="text-[16px] leading-relaxed" 
              style={{ 
                color: mode === 'personal' ? 'rgba(30, 25, 64, 0.85)' : 'rgba(18, 17, 38, 0.85)',
                lineHeight: 1.7
              }}
            >
              {t('about.bio')}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {siteData.social.linkedin && (
                <a
                  href={siteData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:border-[#2B7A9D] hover:text-[#2B7A9D] hover:bg-[#2B7A9D]/5 transition-all"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </a>
              )}
              {siteData.person.behance_url && (
                <a
                  href={siteData.person.behance_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:border-[#2B7A9D] hover:text-[#2B7A9D] hover:bg-[#2B7A9D]/5 transition-all"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Behance
                  </Button>
                </a>
              )}
              {siteData.social.email && (
                <a href={`mailto:${siteData.social.email}`}>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:border-[#2B7A9D] hover:text-[#2B7A9D] hover:bg-[#2B7A9D]/5 transition-all"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Story Module - Expandable */}
        <section className="mb-20">
          <p 
            className="uppercase tracking-wider mb-4 font-bold text-[15px]" 
            style={{ 
              color: mode === 'personal' ? 'rgba(30, 25, 64, 0.5)' : 'rgba(18, 17, 38, 0.5)',
              letterSpacing: '0.1em'
            }}
          >
            {language === 'es' ? 'Mi historia' : 'My story'}
          </p>
          
          <div className="space-y-4">
            {/* Preview text in regular font */}
            {!storyExpanded && (
              <p 
                className="text-base leading-relaxed font-[Kalam]"
                style={{ 
                  color: mode === 'personal' ? 'rgba(30, 25, 64, 0.85)' : 'rgba(18, 17, 38, 0.85)',
                  lineHeight: 1.7
                }}
              >
                {storyPreview}
              </p>
            )}

            {/* Expanded paper panel with handwriting font */}
            {storyExpanded && (
              <div 
                className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-400"
                style={{
                  background: 'linear-gradient(to bottom, #FAF7F2 0%, #F5F1E8 100%)',
                  padding: '2.5rem 2rem',
                  border: '1px solid rgba(139, 115, 85, 0.15)',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
                  animation: 'expandPaper 400ms ease-out'
                }}
              >
                {/* Subtle deckled edge effect at top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(139, 115, 85, 0.08) 20%, transparent 40%, rgba(139, 115, 85, 0.08) 60%, transparent 80%, rgba(139, 115, 85, 0.08) 100%)',
                  }}
                />
                
                {/* Audio Player Chip */}
                <div className="mb-6 flex justify-center">
                  <div 
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full shadow-md transition-all hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(43, 122, 157, 0.08) 0%, rgba(43, 122, 157, 0.04) 100%)',
                      border: '1px solid rgba(43, 122, 157, 0.2)',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    {/* Play/Pause button */}
                    <button
                      onClick={togglePlay}
                      className="flex items-center justify-center w-10 h-10 rounded-full transition-all hover:scale-105"
                      style={{
                        backgroundColor: '#2B7A9D',
                        color: 'white'
                      }}
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" fill="white" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" fill="white" />
                      )}
                    </button>

                    {/* Audio info and progress */}
                    <div className="flex flex-col gap-1 min-w-[180px]">
                      <div className="flex items-center gap-2">
                        <Volume2 className="w-3.5 h-3.5" style={{ color: '#2B7A9D' }} />
                        <span 
                          className="text-xs font-medium"
                          style={{ color: 'rgba(30, 25, 64, 0.8)' }}
                        >
                          {language === 'es' ? 'Escucha mi historia' : 'Listen to my story'}
                        </span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="flex items-center gap-2">
                        <div 
                          className="flex-1 h-1.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: 'rgba(43, 122, 157, 0.15)' }}
                        >
                          <div 
                            className="h-full rounded-full transition-all duration-200"
                            style={{ 
                              width: `${progressPercentage}%`,
                              backgroundColor: '#2B7A9D'
                            }}
                          />
                        </div>
                        <span 
                          className="text-xs tabular-nums"
                          style={{ color: 'rgba(30, 25, 64, 0.6)' }}
                        >
                          {duration > 0 ? formatTime(currentTime) : '0:00'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hidden audio element */}
                  <audio
                    ref={audioRef}
                    src="https://narrlab.studio/audio/acerca-de-mi.mp3"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    preload="metadata"
                  />
                </div>
                
                {/* Story content with handwriting font */}
                <div 
                  className="prose prose-lg max-w-none"
                  style={{ 
                    fontFamily: "'Kalam', cursive",
                    fontSize: '1.125rem',
                    lineHeight: 2,
                    color: 'rgba(30, 25, 64, 0.95)',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {storyFull}
                </div>
              </div>
            )}

            {/* Read more/less button */}
            <button
              onClick={() => setStoryExpanded(!storyExpanded)}
              className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
              style={{
                color: '#2B7A9D',
                lineHeight: 1.5
              }}
            >
              {storyExpanded 
                ? (language === 'es' ? 'Leer menos' : 'Read less')
                : (language === 'es' ? 'Leer más' : 'Read more')
              }
              {storyExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </section>

        {/* Skills Grid - Show only top 8, then "See more" */}
        <section className="mb-20">
          <h3 className="mb-8" style={{ lineHeight: 1.3 }}>{t('cv.skills')}</h3>
          <div className="flex flex-wrap gap-2.5">
            {displayedSkills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary"
                className="px-4 py-2 text-sm"
                style={{ lineHeight: 1.4 }}
              >
                {skill}
              </Badge>
            ))}
            {!showAllSkills && siteData.skills.length > 8 && (
              <button
                onClick={() => setShowAllSkills(true)}
                className="px-4 py-2 text-sm rounded-full border transition-all inline-flex items-center gap-1.5 hover:bg-[#2B7A9D]/5"
                style={{
                  borderColor: mode === 'personal' ? 'rgba(91, 68, 242, 0.2)' : 'rgba(217, 80, 50, 0.2)',
                  color: '#2B7A9D'
                }}
              >
                {language === 'es' ? 'Ver más' : 'See more'}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* Tools & Languages - Two Column Layout */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Tools Column */}
            <div>
              <h3 className="mb-6" style={{ lineHeight: 1.3 }}>{t('cv.tools')}</h3>
              <div className="flex flex-wrap gap-2.5">
                {siteData.tools.map((tool) => (
                  <Badge 
                    key={tool} 
                    variant="outline"
                    className="px-4 py-2 text-sm"
                    style={{ lineHeight: 1.4 }}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages Column */}
            <div>
              <h3 className="mb-6" style={{ lineHeight: 1.3 }}>{t('cv.languages')}</h3>
              <div className="space-y-4">
                {siteData.languages.map((lang) => (
                  <div 
                    key={lang.name} 
                    className="flex items-center justify-between p-4 rounded-xl shadow-sm"
                    style={{
                      backgroundColor: mode === 'personal' ? 'rgba(132, 102, 242, 0.04)' : 'rgba(217, 80, 50, 0.04)',
                      border: `1px solid ${mode === 'personal' ? 'rgba(132, 102, 242, 0.1)' : 'rgba(217, 80, 50, 0.1)'}`
                    }}
                  >
                    <p 
                      className="font-medium" 
                      style={{ 
                        lineHeight: 1.4,
                        color: mode === 'personal' ? 'rgba(30, 25, 64, 0.9)' : 'rgba(18, 17, 38, 0.9)'
                      }}
                    >
                      {lang.name}
                    </p>
                    <p 
                      className="text-sm" 
                      style={{ 
                        color: mode === 'personal' ? 'rgba(30, 25, 64, 0.6)' : 'rgba(18, 17, 38, 0.6)',
                        lineHeight: 1.5
                      }}
                    >
                      {lang.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA - Updated microcopy and buttons */}
        <div 
          className="rounded-3xl p-10 md:p-14 text-center shadow-sm"
          style={{
            backgroundColor: mode === 'personal' ? 'rgba(132, 102, 242, 0.04)' : 'rgba(242, 174, 46, 0.08)',
            border: `1px solid ${mode === 'personal' ? 'rgba(132, 102, 242, 0.12)' : 'rgba(242, 174, 46, 0.2)'}`
          }}
        >
          <h3 className="mb-6" style={{ lineHeight: 1.3 }}>
            {language === 'es' ? '¿Trabajamos juntos?' : "Let's work together"}
          </h3>
          <div 
            className="space-y-4 mb-8 max-w-2xl mx-auto"
            style={{ 
              color: mode === 'personal' ? 'rgba(30, 25, 64, 0.75)' : 'rgba(18, 17, 38, 0.75)',
              lineHeight: 1.7
            }}
          >
            <p className="text-lg">
              {language === 'es'
                ? 'Estoy disponible para proyectos de diseño instruccional, LXD y producción multimedia. ¡Conversemos!'
                : "I'm available for instructional design, LXD, and multimedia production projects. Let's chat!"}
            </p>
            <p className="text-[13px]">
              {language === 'es'
                ? 'También convierto ideas sueltas en proyectos con historia, estructura y prototipo.'
                : 'I also turn loose ideas into projects with story, structure, and prototype.'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={() => navigate('/contact')} 
              size="lg"
              className="min-w-[140px] shadow-md"
              style={{
                backgroundColor: mode === 'personal' ? '#5B44F2' : '#D95032',
                color: '#FEFDFB'
              }}
            >
              {t('hero.contact')}
            </Button>
            <Button 
              onClick={() => navigate('/cv')} 
              variant="outline" 
              size="lg"
              className="min-w-[140px] hover:border-[#2B7A9D] hover:text-[#2B7A9D] hover:bg-[#2B7A9D]/5 transition-all"
            >
              {language === 'es' ? 'Ver CV' : 'View CV'}
            </Button>
          </div>
        </div>

        {/* Add Google Fonts for handwriting */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
          
          @keyframes expandPaper {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
}