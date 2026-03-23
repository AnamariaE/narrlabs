import React from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { NarrabLogo } from './NarrabLogo';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Navigation() {
  const { language, setLanguage, t } = useI18n();
  const { mode, setMode } = useBrand();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();

  // Get current page from pathname
  const getCurrentPage = () => {
    const path = location.pathname.slice(1); // Remove leading slash
    if (path === '') return 'home';
    if (path.startsWith('project/')) return 'project';
    return path;
  };

  const currentPage = getCurrentPage();

  // Detect scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Show nav after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Different nav items based on brand mode
  const navItems = mode === 'personal'
    ? [
        { id: 'home', label: t('nav.home') },
        { id: 'cv', label: t('nav.cv') },
        { id: 'consulting', label: t('nav.consulting') },
        { id: 'gamification', label: language === 'es' ? 'Gamificación' : 'Gamification' },
        { id: 'podcast', label: t('nav.podcast') },
        { id: 'contact', label: t('nav.contact') },
      ]
    : [
        { id: 'home', label: t('nav.home') },
        { id: 'portfolio', label: t('nav.portfolio') },
        { 
          id: 'why-narrlab', 
          label: language === 'es' ? '¿Por qué NarrLab?' : 'Why NarrLab?',
          subitems: [
            { id: 'gamification', label: language === 'es' ? 'Gamificación' : 'Gamification' }
          ]
        },
        { id: 'consulting', label: t('nav.consulting') },
        { id: 'contact', label: t('nav.contact') },
      ];

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 ${
      isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    } ${
      mode === 'studio' 
        ? 'bg-[#F2BF80]/95 border-b border-[#F2AE2E]/25' 
        : 'bg-[#F2EADF]/95 border-b'
    }`} style={mode === 'personal' ? { borderColor: 'rgba(49, 39, 115, 0.18)' } : undefined}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label="Go to home"
          >
            {mode === 'studio' && (
              <img 
                src="https://narrlab.studio/img/isotipo-narralab.png" 
                alt="NarrLab" 
                className="h-9 object-contain"
              />
            )}
            <div className="flex flex-col">
              
              {mode === 'studio' && (
                null
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.subitems ? (
                // Dropdown menu for items with subitems
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger className={`transition-all duration-200 relative flex items-center gap-1 bg-transparent border-0 cursor-pointer ${
                    currentPage === item.id 
                      ? (mode === 'studio' ? 'text-[#274259] font-medium' : 'text-[#5B44F2] font-medium')
                      : (mode === 'studio' ? 'text-[#121126]/70 hover:text-[#274259]' : 'text-[#1E1940]/70 hover:text-[#5B44F2]')
                  }`}>
                    {item.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    {currentPage === item.id && (
                      <span 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" 
                        style={{ backgroundColor: mode === 'studio' ? '#F2AE2E' : '#8466F2' }}
                      />
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="start"
                    className={mode === 'studio' ? 'bg-[#F2EADF] border-[#F2AE2E]/30' : ''}
                  >
                    <DropdownMenuItem asChild>
                      <Link to={`/${item.id}`} className="cursor-pointer">
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                    {item.subitems.map((subitem) => (
                      <DropdownMenuItem key={subitem.id} asChild>
                        <Link to={`/${subitem.id}`} className="cursor-pointer pl-6">
                          {subitem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Regular link for items without subitems
                <Link
                  key={item.id}
                  to={item.id === 'home' ? '/' : `/${item.id}`}
                  className={`transition-all duration-200 relative ${
                    currentPage === item.id 
                      ? (mode === 'studio' ? 'text-[#274259] font-medium' : 'text-[#5B44F2] font-medium')
                      : (mode === 'studio' ? 'text-[#121126]/70 hover:text-[#274259]' : 'text-[#1E1940]/70 hover:text-[#5B44F2]')
                  }`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" 
                      style={{ backgroundColor: mode === 'studio' ? '#F2AE2E' : '#8466F2' }}
                    />
                  )}
                </Link>
              )
            ))}

            {/* Brand Mode Toggle - Pill Style */}
            <div className={`flex items-center gap-1 p-1 rounded-full transition-all ${
              mode === 'studio'
                ? 'border border-[#F2AE2E]/30'
                : 'border'
            }`} style={mode === 'studio' ? { 
              backgroundColor: 'rgba(242, 174, 46, 0.1)' 
            } : { 
              backgroundColor: 'rgba(132, 102, 242, 0.08)',
              borderColor: 'rgba(132, 102, 242, 0.2)'
            }}>
              <button
                onClick={() => setMode('personal')}
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  mode === 'personal' 
                    ? 'shadow-sm font-medium' 
                    : ''
                }`}
                style={mode === 'personal' ? {
                  backgroundColor: '#FFFFFF',
                  color: '#1E1940'
                } : mode === 'studio' ? {
                  color: 'rgba(18, 17, 38, 0.6)'
                } : {
                  color: 'rgba(30, 25, 64, 0.6)'
                }}
                onMouseEnter={(e) => {
                  if (mode === 'studio') {
                    e.currentTarget.style.color = 'rgba(18, 17, 38, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (mode === 'studio') {
                    e.currentTarget.style.color = 'rgba(18, 17, 38, 0.6)';
                  }
                }}
                aria-pressed={mode === 'personal'}
                aria-label="Switch to Personal mode"
              >
                {t('nav.personal')}
              </button>
              <button
                onClick={() => setMode('studio')}
                className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 font-medium ${
                  mode === 'studio' 
                    ? 'shadow-md' 
                    : ''
                }`}
                style={mode === 'studio' ? {
                  backgroundColor: '#D95032',
                  color: '#F2EADF',
                  boxShadow: '0 2px 8px rgba(217, 80, 50, 0.25)'
                } : {
                  backgroundColor: '#5B44F2',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px rgba(91, 68, 242, 0.25)'
                }}
                aria-pressed={mode === 'studio'}
                aria-label="Switch to Studio mode"
              >
                {t('nav.studio')}
              </button>
            </div>

            {/* Language Switcher - Pill Style */}
            <div className={`flex items-center gap-1 p-1 rounded-full transition-all ${
              mode === 'studio'
                ? 'border border-[#F2AE2E]/30'
                : 'border'
            }`} style={mode === 'studio' ? { 
              backgroundColor: 'rgba(242, 174, 46, 0.1)' 
            } : {
              backgroundColor: 'rgba(132, 102, 242, 0.08)',
              borderColor: 'rgba(132, 102, 242, 0.2)'
            }}>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  language === 'es' 
                    ? 'shadow-sm font-medium'
                    : ''
                }`}
                style={language === 'es' ? (
                  mode === 'studio' ? {
                    backgroundColor: '#F2EADF',
                    color: '#121126'
                  } : {
                    backgroundColor: '#FFFFFF',
                    color: '#1E1940'
                  }
                ) : (
                  mode === 'studio' ? {
                    color: 'rgba(18, 17, 38, 0.6)'
                  } : {
                    color: 'rgba(30, 25, 64, 0.6)'
                  }
                )}
                onMouseEnter={(e) => {
                  if (language !== 'es') {
                    e.currentTarget.style.color = mode === 'studio' ? 'rgba(18, 17, 38, 0.8)' : 'rgba(30, 25, 64, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (language !== 'es') {
                    e.currentTarget.style.color = mode === 'studio' ? 'rgba(18, 17, 38, 0.6)' : 'rgba(30, 25, 64, 0.6)';
                  }
                }}
                aria-pressed={language === 'es'}
                aria-label="Switch to Spanish"
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                  language === 'en' 
                    ? 'shadow-sm font-medium'
                    : ''
                }`}
                style={language === 'en' ? (
                  mode === 'studio' ? {
                    backgroundColor: '#F2EADF',
                    color: '#121126'
                  } : {
                    backgroundColor: '#FFFFFF',
                    color: '#1E1940'
                  }
                ) : (
                  mode === 'studio' ? {
                    color: 'rgba(18, 17, 38, 0.6)'
                  } : {
                    color: 'rgba(30, 25, 64, 0.6)'
                  }
                )}
                onMouseEnter={(e) => {
                  if (language !== 'en') {
                    e.currentTarget.style.color = mode === 'studio' ? 'rgba(18, 17, 38, 0.8)' : 'rgba(30, 25, 64, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (language !== 'en') {
                    e.currentTarget.style.color = mode === 'studio' ? 'rgba(18, 17, 38, 0.6)' : 'rgba(30, 25, 64, 0.6)';
                  }
                }}
                aria-pressed={language === 'en'}
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Change language">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('es')}>
                  Español {language === 'es' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English {language === 'en' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <div key={item.id}>
                  <Link
                    to={item.id === 'home' ? '/' : `/${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-left py-2 transition-colors block ${
                      currentPage === item.id ? 'text-primary' : 'text-foreground/70'
                    }`}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.subitems && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {item.subitems.map((subitem) => (
                        <Link
                          key={subitem.id}
                          to={`/${subitem.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-left py-1 transition-colors text-sm ${
                            currentPage === subitem.id ? 'text-primary' : 'text-foreground/60'
                          }`}
                        >
                          → {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setMode('personal')}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all ${
                    mode === 'personal' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted'
                  }`}
                >
                  {t('nav.personal')}
                </button>
                <button
                  onClick={() => setMode('studio')}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all ${
                    mode === 'studio' ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted'
                  }`}
                >
                  {t('nav.studio')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}