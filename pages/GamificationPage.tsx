import React from 'react';
import { useI18n } from '../lib/i18n-context';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  Target, 
  Map, 
  BookOpen, 
  Gamepad2, 
  Eye, 
  Sparkles,
  ExternalLink,
  Download,
  CheckCircle2,
  AlertCircle,
  Award,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react';

interface GamificationPageProps {
  onNavigate?: (page: string) => void;
}

export function GamificationPage({ onNavigate }: GamificationPageProps) {
  const { language } = useI18n();

  const content = {
    es: {
      hero: {
        title: "Proceso de creación de una gamificación para e-learning",
        subtitle: "De objetivos a experiencia jugable: diseño instruccional, narrativa y prototipado para aprender con intención.",
        tags: ["Instructional Design", "Gamificación", "E-learning", "Narrativa", "Prototipado"],
        ctaPrimary: "Ver entregables",
        ctaSecondary: "Descargar resumen (PDF)"
      },
      context: {
        title: "Contexto del proyecto",
        items: [
          { label: "Contexto", value: "Educación superior / e-learning" },
          { label: "Mi rol", value: "Diseño instruccional, diseño visual, narrativa, prototipado" },
          { label: "Meta", value: "Hacer el aprendizaje interactivo y memorable sin perder rigor" }
        ]
      },
      quote: "La gamificación no es solo hacer un juego. Es crear una estructura diseñada con narrativas que dan contexto y marco teórico para que el aprendizaje sea interesante, estructurado y hasta divertido",
      objectives: {
        title: "Objetivos del proceso",
        items: [
          "Planear el escenario educativo y ajustar objetivos y estructura del curso.",
          "Plantear la ruta formativa con actividades, evaluación y recursos.",
          "Desarrollar y montar contenidos, actividades y recursos en el aula virtual para que sean usables y presentables."
        ]
      },
      phases: {
        title: "Fases",
        items: [
          {
            number: 1,
            name: "Análisis y diseño",
            description: "Investigación de objetivos educativos y contexto del usuario",
            output: "Mapa de objetivos + criterios de éxito + estructura del curso"
          },
          {
            number: 2,
            name: "Evaluación y desarrollo preliminar",
            description: "Creación de contenidos base y estrategia de evaluación",
            output: "Contenidos base + recursos + evaluación preliminar"
          },
          {
            number: 3,
            name: "Narrativa, mecánicas y prototipado",
            description: "Diseño de la experiencia jugable y sistemas de progreso",
            output: "Storyline + reglas + sistema de progreso + prototipo inicial"
          },
          {
            number: 4,
            name: "Revisión, arte y prototipado",
            description: "Refinamiento visual y experiencia de usuario",
            output: "Kit visual + componentes + prototipo refinado"
          },
          {
            number: 5,
            name: "Evaluación y escalabilidad",
            description: "Validación de calidad y preparación para implementación",
            output: "Checklist + plantilla reusable + mejoras para iteración"
          }
        ]
      },
      deliverables: {
        title: "Entregables",
        items: [
          { name: "Mapa de experiencia (Learning Journey)", icon: Map },
          { name: "Storyline y mundo narrativo", icon: BookOpen },
          { name: "Mecánicas y sistema de progreso", icon: Gamepad2 },
          { name: "Prototipo navegable", icon: Eye },
          { name: "Kit visual y componentes", icon: Sparkles },
          { name: "Checklist de QA y escalabilidad", icon: CheckCircle2 }
        ]
      },
      results: {
        title: "Resultados y señales",
        note: "Métricas ajustables según implementación y cohortes.",
        metrics: [
          { label: "Participación / interacción", value: "85%+", icon: Users },
          { label: "Finalización del curso", value: "78%+", icon: TrendingUp },
          { label: "Feedback cualitativo", value: "4.5/5", icon: BarChart3 }
        ]
      },
      credentials: {
        title: "Planificación de la Gamificación en Educación Superior",
        details: [
          { label: "Duración", value: "30 horas" },
          { label: "Institución", value: "UCA" },
          { label: "Fecha", value: "marzo 2021" },
          { label: "Nota", value: "10.0" }
        ],
        cta: "Ver constancia"
      },
      learnings: {
        title: "Lo que aprendí",
        repeat: {
          title: "Lo repetiría",
          items: [
            "Validar narrativa con usuarios antes de desarrollar todo el contenido",
            "Iterar prototipo en papel primero, luego digital",
            "Documentar mecánicas desde el inicio para escalabilidad"
          ]
        },
        improve: {
          title: "Lo mejoraría",
          items: [
            "Incluir más momentos de feedback durante el proceso",
            "Establecer criterios de medición desde fase 1",
            "Planificar sesiones de co-diseño con stakeholders"
          ]
        }
      },
      finalCta: {
        title: "¿Quieres que convierta tu curso en una experiencia jugable y clara?",
        ctaPrimary: "Hablemos",
        ctaSecondary: "Ver más casos"
      }
    },
    en: {
      hero: {
        title: "Creating a gamification process for e-learning",
        subtitle: "From objectives to playable experience: instructional design, narrative, and prototyping for intentional learning.",
        tags: ["Instructional Design", "Gamification", "E-learning", "Narrative", "Prototyping"],
        ctaPrimary: "View deliverables",
        ctaSecondary: "Download summary (PDF)"
      },
      context: {
        title: "Project context",
        items: [
          { label: "Context", value: "Higher education / e-learning" },
          { label: "My role", value: "Instructional design, visual design, narrative, prototyping" },
          { label: "Goal", value: "Make learning interactive and memorable without losing rigor" }
        ]
      },
      quote: "Gamification is not just making a game. It's creating a structure designed with narratives that provide context and theoretical framework to make learning interesting, structured, and even fun",
      objectives: {
        title: "Process objectives",
        items: [
          "Plan the educational scenario and adjust course objectives and structure.",
          "Design the learning path with activities, assessment, and resources.",
          "Develop and deploy content, activities, and resources in the virtual classroom to be usable and presentable."
        ]
      },
      phases: {
        title: "Phases",
        items: [
          {
            number: 1,
            name: "Analysis and design",
            description: "Research on educational objectives and user context",
            output: "Objectives map + success criteria + course structure"
          },
          {
            number: 2,
            name: "Evaluation and preliminary development",
            description: "Creation of base content and assessment strategy",
            output: "Base content + resources + preliminary assessment"
          },
          {
            number: 3,
            name: "Narrative, mechanics and prototyping",
            description: "Design of playable experience and progress systems",
            output: "Storyline + rules + progress system + initial prototype"
          },
          {
            number: 4,
            name: "Review, art and prototyping",
            description: "Visual refinement and user experience",
            output: "Visual kit + components + refined prototype"
          },
          {
            number: 5,
            name: "Evaluation and scalability",
            description: "Quality validation and implementation preparation",
            output: "Checklist + reusable template + iteration improvements"
          }
        ]
      },
      deliverables: {
        title: "Deliverables",
        items: [
          { name: "Experience map (Learning Journey)", icon: Map },
          { name: "Storyline and narrative world", icon: BookOpen },
          { name: "Mechanics and progress system", icon: Gamepad2 },
          { name: "Navigable prototype", icon: Eye },
          { name: "Visual kit and components", icon: Sparkles },
          { name: "QA and scalability checklist", icon: CheckCircle2 }
        ]
      },
      results: {
        title: "Results and signals",
        note: "Metrics adjustable based on implementation and cohorts.",
        metrics: [
          { label: "Participation / interaction", value: "85%+", icon: Users },
          { label: "Course completion", value: "78%+", icon: TrendingUp },
          { label: "Qualitative feedback", value: "4.5/5", icon: BarChart3 }
        ]
      },
      credentials: {
        title: "Gamification Planning in Higher Education",
        details: [
          { label: "Duration", value: "30 hours" },
          { label: "Institution", value: "UCA" },
          { label: "Date", value: "March 2021" },
          { label: "Grade", value: "10.0" }
        ],
        cta: "View certificate"
      },
      learnings: {
        title: "What I learned",
        repeat: {
          title: "I would repeat",
          items: [
            "Validate narrative with users before developing all content",
            "Iterate prototype on paper first, then digital",
            "Document mechanics from the start for scalability"
          ]
        },
        improve: {
          title: "I would improve",
          items: [
            "Include more feedback moments during the process",
            "Establish measurement criteria from phase 1",
            "Plan co-design sessions with stakeholders"
          ]
        }
      },
      finalCta: {
        title: "Want to turn your course into a playable and clear experience?",
        ctaPrimary: "Let's talk",
        ctaSecondary: "View more cases"
      }
    }
  };

  const t = content[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F2BF80]/10">
      {/* Navigation sidebar - Desktop only */}
      <nav className="hidden lg:fixed lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:flex lg:flex-col lg:gap-3 lg:z-30">
        {['context', 'objectives', 'phases', 'deliverables', 'results', 'credentials', 'learnings'].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className="w-2 h-2 rounded-full bg-[#D95032]/30 hover:bg-[#D95032] transition-colors duration-200"
            aria-label={`Navigate to ${section}`}
          />
        ))}
      </nav>

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl mb-6 text-[#121126]">
              {t.hero.title}
            </h1>
            <p className="text-lg text-[#121126]/70 mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {t.hero.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary"
                  className="bg-[#D95032]/10 text-[#D95032] hover:bg-[#D95032]/20 border-none"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => scrollToSection('deliverables')}
                className="bg-[#D95032] hover:bg-[#D95032]/90 text-white"
              >
                {t.hero.ctaPrimary}
              </Button>
              
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551533257-19e98f46a429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBlbGVhcm5pbmclMjBjb3Vyc2UlMjBkZXNpZ258ZW58MXx8fHwxNzcyNzQ3OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="E-learning course design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section id="context" className="container max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {t.context.items.map((item, index) => (
            <Card key={index} className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-sm uppercase tracking-wide text-[#D95032] mb-2">
                {item.label}
              </h3>
              <p className="text-[#121126]">
                {item.value}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Quote Section */}
      <section className="container max-w-4xl mx-auto px-6 py-16">
        <blockquote className="relative p-8 bg-[#D95032]/5 border-l-4 border-[#D95032] rounded-r-lg">
          <p className="text-xl lg:text-2xl text-[#121126] italic leading-relaxed">
            "{t.quote}"
          </p>
        </blockquote>
      </section>

      {/* Objectives Section */}
      <section id="objectives" className="container max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl mb-8 text-[#121126]">
          {t.objectives.title}
        </h2>
        <div className="space-y-4">
          {t.objectives.items.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <Target className="w-5 h-5 text-[#D95032] shrink-0 mt-1" />
              <p className="text-[#121126]/80 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="container max-w-6xl mx-auto my-8" />

      {/* Phases Section */}
      <section id="phases" className="container max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl mb-12 text-[#121126] text-center">
          {t.phases.title}
        </h2>
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-[#D95032]/20" />
          
          <div className="space-y-8">
            {t.phases.items.map((phase, index) => (
              <div key={index} className="relative flex gap-6 md:gap-8">
                {/* Number circle */}
                <div className="shrink-0 w-16 h-16 rounded-full bg-[#D95032] text-white flex items-center justify-center text-2xl z-10">
                  {phase.number}
                </div>
                
                {/* Content */}
                <Card className="flex-1 p-6 bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl mb-2 text-[#121126]">
                    {phase.name}
                  </h3>
                  <p className="text-[#121126]/70 mb-4">
                    {phase.description}
                  </p>
                  <div className="pt-4 border-t border-[#D95032]/10">
                    <p className="text-sm text-[#D95032]">
                      <strong>Output:</strong> {phase.output}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="container max-w-6xl mx-auto my-8" />

      {/* Deliverables Section */}
      <section id="deliverables" className="container max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl mb-12 text-[#121126] text-center">
          {t.deliverables.title}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.deliverables.items.map((item, index) => {
            const Icon = item.icon;
            const images = [
              "https://images.unsplash.com/photo-1618393678187-fb258b8ee191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGpvdXJuZXklMjBtYXAlMjBibHVlcHJpbnR8ZW58MXx8fHwxNzcyNzQ3OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              "https://images.unsplash.com/photo-1765891521839-99dc556853bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXJyYXRpdmUlMjBzdG9yeXRlbGxpbmclMjB2aXN1YWx8ZW58MXx8fHwxNzcyNzQ3OTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              "https://images.unsplash.com/photo-1562601555-513820e5d0eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwbWVjaGFuaWNzJTIwZGVzaWduJTIwcHJvdG90eXBlfGVufDF8fHx8MTc3Mjc0NzkyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              "https://images.unsplash.com/photo-1663153203126-08bbadc178ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmFjdGl2ZSUyMHByb3RvdHlwZSUyMG1vYmlsZXxlbnwxfHx8fDE3NzI3NDc5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              "https://images.unsplash.com/photo-1596566430365-55867e5ccaca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBjb21wb25lbnRzJTIwa2l0fGVufDF8fHx8MTc3Mjc0NzkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              "https://images.unsplash.com/photo-1618393678187-fb258b8ee191?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGpvdXJuZXklMjBtYXAlMjBibHVlcHJpbnR8ZW58MXx8fHwxNzcyNzQ3OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ];
            
            // Use Wayuú image specifically for "Storyline y mundo narrativo" (index 1)
            const imageSource = index === 1 
              ? "https://narrlab.studio/img/Wayuu-portfolio-100.jpg"
              : images[index % images.length];
            
            return (
              <Card key={index} className="group bg-white border-none shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#D95032]/10 to-[#F2AE2E]/10 relative overflow-hidden">
                  {index === 1 ? (
                    <ImageWithFallback 
                      src={imageSource}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  ) : (
                    <img 
                      src={imageSource}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-[#D95032]" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm mb-3 text-[#121126]">
                    {item.name}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full text-[#D95032] hover:bg-[#D95032]/10"
                    onClick={() => onNavigate?.('project', 'video-narrativa-wayuu')}
                  >
                    {language === 'es' ? 'Ver ejemplo' : 'View example'}
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="container max-w-6xl mx-auto my-8" />

      {/* Results Section */}
      <section id="results" className="container max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl mb-4 text-[#121126] text-center">
          {t.results.title}
        </h2>
        <p className="text-sm text-[#121126]/60 text-center mb-12">
          {t.results.note}
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {t.results.metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="p-8 bg-white border-none shadow-sm text-center">
                <Icon className="w-10 h-10 text-[#D95032] mx-auto mb-4" />
                <div className="text-4xl mb-2 text-[#D95032]">
                  {metric.value}
                </div>
                <p className="text-sm text-[#121126]/70">
                  {metric.label}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="container max-w-6xl mx-auto my-8" />

      {/* Credentials Section */}
      <section id="credentials" className="container max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl mb-8 text-[#121126] text-center">
          {language === 'es' ? 'Certificación' : 'Certification'}
        </h2>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image of the certificate */}
          <div className="order-2 lg:order-1">
            <div className="rounded-xl overflow-hidden shadow-lg border-2 border-[#D95032]/20 hover:shadow-2xl transition-shadow duration-300">
              <img 
                src="https://lh7-rt.googleusercontent.com/sitesz/AClOY7ohxWGAhPqPG_tTfpDdlnNKDQtMbCp-P30l98o4gejahtIImEASYaGRxl4xb8rGB2xhAkUTdf2aqdTXOLcTW4yKUNndcafQ0_4eocCPzkFluWwC-539v3IutjpTwBTJnwLkNe_upVAZ_9RokEGbMb752XITgh_Xem2gCdLTOseMbvCslRQA-JB_0MCdVFJ4?key=3PQyrpkvmeT8xqa3VZbmcJvN"
                alt={t.credentials.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Details card */}
          <Card className="p-8 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-2 border-[#D95032]/20 order-1 lg:order-2">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-[#D95032] flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-[#121126] pt-2">
                {t.credentials.title}
              </h3>
            </div>
            <div className="space-y-3 mb-6">
              {t.credentials.details.map((detail, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-[#D95032]/10 last:border-0">
                  <span className="text-sm font-medium text-[#D95032]">{detail.label}</span>
                  <span className="text-[#121126] font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
            <Button 
              variant="outline"
              className="w-full border-[#D95032] text-[#D95032] hover:bg-[#D95032]/10"
              onClick={() => window.open('https://lh7-rt.googleusercontent.com/sitesz/AClOY7ohxWGAhPqPG_tTfpDdlnNKDQtMbCp-P30l98o4gejahtIImEASYaGRxl4xb8rGB2xhAkUTdf2aqdTXOLcTW4yKUNndcafQ0_4eocCPzkFluWwC-539v3IutjpTwBTJnwLkNe_upVAZ_9RokEGbMb752XITgh_Xem2gCdLTOseMbvCslRQA-JB_0MCdVFJ4?key=3PQyrpkvmeT8xqa3VZbmcJvN', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {t.credentials.cta}
            </Button>
          </Card>
        </div>
      </section>

      <Separator className="container max-w-6xl mx-auto my-8" />

      {/* Learnings Section */}
      <section id="learnings" className="container max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl mb-12 text-[#121126] text-center">
          {t.learnings.title}
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* What I would repeat */}
          <Card className="p-8 bg-white border-none shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h3 className="text-xl text-[#121126]">
                {t.learnings.repeat.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {t.learnings.repeat.items.map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 shrink-0 mt-2" />
                  <p className="text-[#121126]/80">{item}</p>
                </li>
              ))}
            </ul>
          </Card>

          {/* What I would improve */}
          <Card className="p-8 bg-white border-none shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-amber-600" />
              <h3 className="text-xl text-[#121126]">
                {t.learnings.improve.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {t.learnings.improve.items.map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2" />
                  <p className="text-[#121126]/80">{item}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container max-w-4xl mx-auto px-6 py-16">
        <Card className="p-12 bg-gradient-to-br from-[#D95032] to-[#F2AE2E] text-white text-center border-none shadow-xl">
          <h2 className="text-2xl lg:text-3xl mb-8">
            {t.finalCta.title}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => onNavigate?.('contact')}
              size="lg"
              className="bg-white text-[#D95032] hover:bg-[#F2BF80]"
            >
              {t.finalCta.ctaPrimary}
            </Button>
            <Button 
              onClick={() => onNavigate?.('portfolio')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              {t.finalCta.ctaSecondary}
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/90 mb-4 text-sm">
              {language === 'es' ? 'Ver ejemplo de gamificación aplicada:' : 'See applied gamification example:'}
            </p>
            <Button 
              onClick={() => onNavigate?.('humanidades-digitales')}
              variant="outline"
              className="border-white text-white hover:bg-white/20"
            >
              {language === 'es' ? 'Humanidades Digitales →' : 'Digital Humanities →'}
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}