import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { Mic2, Play, Headphones, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

interface PodcastPageProps {
  onNavigate?: (page: string) => void;
}

type PillarKey = 'all' | 'tech-power' | 'education' | 'body-image' | 'digital-culture' | 'ethics';

interface Episode {
  id: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  date: string;
  pillar: PillarKey;
  spotifyUrl?: string;
  featured?: boolean;
}

// Episodios de ejemplo (placeholders)
const episodes: Episode[] = [
  {
    id: '001',
    title_es: 'El fetiche digital: influencers, viralidad y la economía de la atención',
    title_en: 'The digital fetish: influencers, virality and the attention economy',
    description_es: 'Cómo las plataformas convierten la autenticidad en producto, y qué perdemos en el proceso.',
    description_en: 'How platforms turn authenticity into product, and what we lose in the process.',
    date: '2024-01-15',
    pillar: 'digital-culture',
    featured: true
  },
  {
    id: '002',
    title_es: 'Tecnología y poder: por qué el algoritmo no es neutral',
    title_en: 'Technology and power: why the algorithm is not neutral',
    description_es: 'Desmontando el mito de la objetividad tecnológica y sus implicaciones políticas.',
    description_en: 'Dismantling the myth of technological objectivity and its political implications.',
    date: '2024-01-22',
    pillar: 'tech-power',
    featured: true
  },
  {
    id: '003',
    title_es: 'Educación y futuro: aprender sin agotarnos',
    title_en: 'Education and future: learning without burning out',
    description_es: 'Entre la promesa edtech y la fatiga digital: hacia un aprendizaje que sí tenga sentido.',
    description_en: 'Between the edtech promise and digital fatigue: towards meaningful learning.',
    date: '2024-01-29',
    pillar: 'education',
    featured: true
  },
  {
    id: '004',
    title_es: 'Filtros y blanqueamiento: cuando la app decide cómo deberías verte',
    title_en: 'Filters and whitening: when the app decides how you should look',
    description_es: 'La estética colonial en tus selfies y qué dice sobre el poder de la imagen.',
    description_en: 'Colonial aesthetics in your selfies and what it says about image power.',
    date: '2024-02-05',
    pillar: 'body-image'
  },
  {
    id: '005',
    title_es: 'Wikipedia como refugio: verdad, consenso y conocimiento abierto',
    title_en: 'Wikipedia as refuge: truth, consensus and open knowledge',
    description_es: 'Por qué necesitamos espacios donde el conocimiento no sea mercancía.',
    description_en: 'Why we need spaces where knowledge is not a commodity.',
    date: '2024-02-12',
    pillar: 'ethics'
  },
  {
    id: '006',
    title_es: 'Memes, trends y resistencia: cultura digital desde dentro',
    title_en: 'Memes, trends and resistance: digital culture from within',
    description_es: 'Cómo las comunidades digitales crean sentido (y a veces, transforman el sistema).',
    description_en: 'How digital communities create meaning (and sometimes transform the system).',
    date: '2024-02-19',
    pillar: 'digital-culture'
  }
];

export function PodcastPage({ onNavigate }: PodcastPageProps) {
  const { language } = useI18n();
  const { mode } = useBrand();
  const [selectedPillar, setSelectedPillar] = useState<PillarKey>('all');

  const accentColor = mode === 'personal' ? '#5B44F2' : '#D95032';
  const secondaryAccent = '#2B7A9D';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const pillars = [
    {
      key: 'tech-power' as PillarKey,
      title_es: 'Tecnología y poder',
      title_en: 'Technology and Power',
      desc_es: 'Plataformas, algoritmos, gobernanza, propaganda suave',
      desc_en: 'Platforms, algorithms, governance, soft propaganda'
    },
    {
      key: 'education' as PillarKey,
      title_es: 'Educación y futuro',
      title_en: 'Education and Future',
      desc_es: 'Aprendizaje híbrido, edtech, creatividad, fatiga, sentido',
      desc_en: 'Hybrid learning, edtech, creativity, fatigue, meaning'
    },
    {
      key: 'body-image' as PillarKey,
      title_es: 'Cuerpo, imagen y sesgos',
      title_en: 'Body, Image and Biases',
      desc_es: 'Filtros, blanqueamiento, estética, autoestima, colonialidad',
      desc_en: 'Filters, whitening, aesthetics, self-esteem, coloniality'
    },
    {
      key: 'digital-culture' as PillarKey,
      title_es: 'Cultura digital',
      title_en: 'Digital Culture',
      desc_es: 'Memes, trends, comunidades, "resistir desde dentro"',
      desc_en: 'Memes, trends, communities, "resisting from within"'
    },
    {
      key: 'ethics' as PillarKey,
      title_es: 'Ética y refugios',
      title_en: 'Ethics and Refuges',
      desc_es: 'Conocimiento abierto, Wikipedia, verdad/consenso, límites',
      desc_en: 'Open knowledge, Wikipedia, truth/consensus, boundaries'
    }
  ];

  const filteredEpisodes = selectedPillar === 'all' 
    ? episodes 
    : episodes.filter(ep => ep.pillar === selectedPillar);

  const featuredEpisodes = episodes.filter(ep => ep.featured);

  return (
    <div className="min-h-screen" style={{ backgroundColor: mode === 'personal' ? '#FEFDFB' : '#F2EADF' }}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle streamline wave decoration */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 800px 400px at 50% 50%, ${accentColor} 0%, transparent 50%)`
          }}
        />
        
        <svg 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl opacity-[0.04] pointer-events-none"
          viewBox="0 0 800 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50,200 Q 200,100 400,200 T 750,200"
            stroke={accentColor}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 50,220 Q 200,120 400,220 T 750,220"
            stroke={accentColor}
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </svg>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <p 
              className="text-sm uppercase tracking-wider mb-4 font-medium inline-flex items-center gap-2 group"
              style={{ color: accentColor }}
            >
              <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
              {language === 'es' ? 'La Profe Neón presenta' : 'La Profe Neón presents'}
            </p>

            {/* H1 */}
            <h1 className="mb-6" style={{ lineHeight: 1.2 }}>
              Mientras glitcheamos
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
              {language === 'es'
                ? 'Diseño instruccional, tecnología y cultura digital - explicado claro, pensado crítico, y con permiso para reírnos un poquito.'
                : 'Instructional design, technology and digital culture - explained clearly, thought critically, and with permission to laugh a little.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button
                onClick={() => scrollToSection('start-here')}
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all"
                style={{
                  backgroundColor: accentColor,
                  color: '#FFFFFF'
                }}
              >
                <Play className="h-4 w-4 mr-2" />
                {language === 'es' ? 'Empezar aquí' : 'Start here'}
              </Button>
              <Button
                onClick={() => scrollToSection('donde-escuchar')}
                variant="outline"
                size="lg"
                className="hover:border-[#2B7A9D] hover:text-[#2B7A9D] hover:bg-[#2B7A9D]/5"
              >
                <Headphones className="h-4 w-4 mr-2" />
                {language === 'es' ? 'Suscribirme' : 'Subscribe'}
              </Button>
            </div>

            {/* Micro metadata */}
            <p className="text-xs" style={{ color: 'rgba(30, 25, 64, 0.5)' }}>
              {language === 'es'
                ? 'Ensayos cortos + conversaciones · ritmo humano · ideas que aterrizan.'
                : 'Short essays + conversations · human pace · ideas that land.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Latest Episode Section - MOVED HERE */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm border"
            style={{ borderColor: `${accentColor}10` }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Play className="w-6 h-6" style={{ color: accentColor }} />
              <h2 className="mb-0">
                {language === 'es' ? 'Último episodio' : 'Latest episode'}
              </h2>
            </div>
            
            <div className="rounded-xl overflow-hidden mb-6">
              <iframe 
                data-testid="embed-iframe" 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/show/27Y7j7ejAjqUsaQ4MYyZxx?utm_source=generator" 
                width="100%" 
                height="450" 
                frameBorder="0" 
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify Podcast"
              />
            </div>

            {/* Platform buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <a 
                href="https://open.spotify.com/show/27Y7j7ejAjqUsaQ4MYyZxx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-gray-50 transition-colors"
              >
                Spotify
              </a>
              <a 
                href="#" 
                className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-gray-50 transition-colors"
              >
                Apple Podcasts
              </a>
              <a 
                href="#" 
                className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-gray-50 transition-colors"
              >
                Google Podcasts
              </a>
              <a 
                href="#episodios" 
                className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-gray-50 transition-colors"
              >
                RSS
              </a>
            </div>

            <a 
              href="#episodios"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('episodios');
              }}
              className="text-sm font-medium inline-flex items-center gap-1 hover:underline"
              style={{ color: secondaryAccent }}
            >
              {language === 'es' ? 'Ver todos los episodios' : 'View all episodes'}
              <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Start Here Section */}
      <section id="start-here" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm border"
            style={{ borderColor: `${accentColor}15` }}
          >
            <div className="mb-6">
              <h2 className="mb-2">
                {language === 'es' ? 'Si es tu primera vez…' : 'If it\'s your first time…'}
              </h2>
              <p style={{ color: 'rgba(30, 25, 64, 0.65)' }}>
                {language === 'es'
                  ? 'Te dejo un punto de entrada (sin spoilers, con sentido).'
                  : 'Here\'s an entry point (no spoilers, with meaning).'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border rounded-xl p-5 hover:shadow-md transition-all group"
                  style={{ borderColor: 'rgba(30, 25, 64, 0.1)' }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div 
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {episode.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold mb-1 leading-tight line-clamp-2 group-hover:text-[#2B7A9D] transition-colors">
                        {language === 'es' ? episode.title_es : episode.title_en}
                      </h4>
                    </div>
                  </div>
                  <p className="text-xs mb-4 leading-relaxed line-clamp-2" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>
                    {language === 'es' ? episode.description_es : episode.description_en}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs group-hover:bg-[#2B7A9D]/5"
                    style={{ color: secondaryAccent }}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    {language === 'es' ? 'Escuchar' : 'Listen'}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pilares Temáticos - Interactive */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <h2 className="mb-2">
                {language === 'es' ? 'Pilares temáticos' : 'Thematic Pillars'}
              </h2>
              <p className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>
                {language === 'es'
                  ? 'Selecciona un pilar para ver episodios relacionados.'
                  : 'Select a pillar to view related episodes.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedPillar('all')}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: selectedPillar === 'all' ? accentColor : 'white',
                  color: selectedPillar === 'all' ? 'white' : 'rgba(30, 25, 64, 0.7)',
                  border: `1px solid ${selectedPillar === 'all' ? accentColor : 'rgba(30, 25, 64, 0.2)'}`
                }}
              >
                {language === 'es' ? 'Todos' : 'All'}
              </button>
              {pillars.map((pillar) => (
                <button
                  key={pillar.key}
                  onClick={() => setSelectedPillar(pillar.key)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-sm"
                  style={{
                    backgroundColor: selectedPillar === pillar.key ? accentColor : 'white',
                    color: selectedPillar === pillar.key ? 'white' : 'rgba(30, 25, 64, 0.7)',
                    border: `1px solid ${selectedPillar === pillar.key ? accentColor : 'rgba(30, 25, 64, 0.2)'}`
                  }}
                >
                  {language === 'es' ? pillar.title_es : pillar.title_en}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar) => (
                <motion.button
                  key={pillar.key}
                  onClick={() => setSelectedPillar(pillar.key)}
                  className="text-left p-6 rounded-xl border transition-all hover:shadow-md group"
                  style={{
                    backgroundColor: selectedPillar === pillar.key ? `${accentColor}05` : 'white',
                    borderColor: selectedPillar === pillar.key ? accentColor : 'rgba(30, 25, 64, 0.1)'
                  }}
                  whileHover={{ y: -2 }}
                >
                  <h4 className="font-bold mb-2 group-hover:text-[#2B7A9D] transition-colors" style={{ color: accentColor }}>
                    {language === 'es' ? pillar.title_es : pillar.title_en}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.65)' }}>
                    {language === 'es' ? pillar.desc_es : pillar.desc_en}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Episodes Archive */}
      <section id="episodios" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6">
              {language === 'es' ? 'Episodios' : 'Episodes'}
              {selectedPillar !== 'all' && (
                <span className="text-lg font-normal ml-3" style={{ color: 'rgba(30, 25, 64, 0.5)' }}>
                  ({filteredEpisodes.length})
                </span>
              )}
            </h2>

            {filteredEpisodes.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: 'rgba(30, 25, 64, 0.5)' }}>
                  {language === 'es'
                    ? 'No hay episodios en este pilar todavía.'
                    : 'No episodes in this pillar yet.'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEpisodes.map((episode, index) => {
                  const pillarData = pillars.find(p => p.key === episode.pillar);
                  return (
                    <motion.div
                      key={episode.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="bg-white border rounded-xl p-6 hover:shadow-md transition-all group"
                      style={{ borderColor: 'rgba(30, 25, 64, 0.1)' }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <span 
                              className="flex-shrink-0 text-xs font-bold px-2 py-1 rounded"
                              style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                            >
                              #{episode.id}
                            </span>
                            <div className="flex-1">
                              <h3 className="mb-1 text-lg leading-tight group-hover:text-[#2B7A9D] transition-colors">
                                {language === 'es' ? episode.title_es : episode.title_en}
                              </h3>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs" style={{ color: 'rgba(30, 25, 64, 0.5)' }}>
                                  {new Date(episode.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                                {pillarData && (
                                  <>
                                    <span style={{ color: 'rgba(30, 25, 64, 0.3)' }}>•</span>
                                    <Badge variant="outline" className="text-xs">
                                      {language === 'es' ? pillarData.title_es : pillarData.title_en}
                                    </Badge>
                                  </>
                                )}
                              </div>
                              <p className="text-sm leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.7)' }}>
                                {language === 'es' ? episode.description_es : episode.description_en}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-shrink-0 group-hover:border-[#2B7A9D] group-hover:text-[#2B7A9D] group-hover:bg-[#2B7A9D]/5"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {language === 'es' ? 'Escuchar' : 'Listen'}
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Dónde escuchar */}
      <section id="donde-escuchar" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 border"
            style={{ borderColor: `${accentColor}15` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Headphones className="w-6 h-6" style={{ color: accentColor }} />
              <h3 className="mb-0">
                {language === 'es' ? '¿Dónde escuchar?' : 'Where to listen?'}
              </h3>
            </div>
            <p className="mb-6" style={{ color: 'rgba(30, 25, 64, 0.7)' }}>
              {language === 'es'
                ? 'Escucha donde prefieras. Si tu app existe, probablemente también.'
                : 'Listen wherever you prefer. If your app exists, it\'s probably there too.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://open.spotify.com/show/27Y7j7ejAjqUsaQ4MYyZxx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white border-2 rounded-full text-sm font-medium hover:shadow-md transition-all"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                Spotify
              </a>
              <span className="px-5 py-2.5 bg-white border-2 rounded-full text-sm font-medium hover:shadow-md transition-all" style={{ borderColor: 'rgba(30, 25, 64, 0.2)' }}>
                Apple Podcasts
              </span>
              <span className="px-5 py-2.5 bg-white border-2 rounded-full text-sm font-medium hover:shadow-md transition-all" style={{ borderColor: 'rgba(30, 25, 64, 0.2)' }}>
                Google Podcasts
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}