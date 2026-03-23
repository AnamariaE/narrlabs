import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Users, Brain, Sparkles, Package, Calendar, Star } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

export function ConsultingPage() {
  const { language, t } = useI18n();
  const navigate = useNavigate();

  const [vatEnabled, setVatEnabled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Helper function to get text in current language
  const getText = (obj: { es: string; en: string }) => obj[language];

  // Content
  const content = {
    hero: {
      title: {
        es: 'Tienes un proyecto de formación. Narrlab lo convierte en algo que funciona.',
        en: 'You have a training project. Narrlab turns it into something that works.',
      },
      subhead: {
        es: 'Para ONGs, organizaciones internacionales y equipos con conocimiento experto que necesitan estructurarlo, diseñarlo y publicarlo - sin contratar tres proveedores distintos.',
        en: 'For NGOs, international organizations, and teams with expert knowledge who need to structure, design, and publish it - without hiring three different vendors.',
      },
      cta: { es: 'Cuéntanos qué tienes', en: 'Tell us what you have' },
    },
    forWhom: {
      title: { es: 'Para quién es esto', en: 'Who this is for' },
      cards: [
        {
          icon: Users,
          title: { es: 'ONGs y organizaciones internacionales', en: 'NGOs and international organizations' },
          description: {
            es: 'Tienes un programa de formación para voluntarios, comunidades o equipos internos. Necesitas que el contenido llegue - aunque la audiencia sea diversa, tenga baja alfabetización, o esté en otro idioma.',
            en: 'You have a training program for volunteers, communities, or internal teams. You need the content to land - even if the audience is diverse, has low literacy, or speaks another language.',
          },
        },
        {
          icon: Brain,
          title: { es: 'Equipos con conocimiento experto', en: 'Teams with expert knowledge' },
          description: {
            es: 'Tienes el saber. El problema es cómo pasarlo a un curso que la gente realmente complete. Nosotros ponemos la estructura, el diseño y la plataforma.',
            en: 'You have the knowledge. The problem is how to turn it into a course people actually complete. We provide the structure, design, and platform.',
          },
        },
        {
          icon: Sparkles,
          title: { es: 'Proyectos con identidad propia', en: 'Projects with their own identity' },
          description: {
            es: 'No quieres una plantilla genérica. Quieres que el curso represente a tu organización - con tu marca, tu lenguaje, tu coherencia visual.',
            en: 'You don\'t want a generic template. You want the course to represent your organization - with your brand, your language, your visual coherence.',
          },
        },
      ],
    },
    howWeWork: {
      title: { es: 'Cómo trabajamos', en: 'How we work' },
      steps: [
        {
          number: 1,
          title: { es: 'Entendemos el proyecto', en: 'We understand the project' },
          description: {
            es: 'Antes de proponer nada, hacemos las preguntas que nadie había hecho: quién aprende, qué necesita lograr, qué restricciones existen. El brief que resulta de esa conversación define todo lo demás.',
            en: 'Before proposing anything, we ask the questions no one has asked: who learns, what they need to achieve, what constraints exist. The brief resulting from that conversation defines everything else.',
          },
        },
        {
          number: 2,
          title: { es: 'Estructuramos y diseñamos', en: 'We structure and design' },
          description: {
            es: 'Diseño instruccional + identidad visual en el mismo proceso. No primero uno y luego el otro - juntos, desde el principio, para que el resultado sea coherente.',
            en: 'Instructional design + visual identity in the same process. Not one then the other - together, from the start, so the result is coherent.',
          },
        },
        {
          number: 3,
          title: { es: 'Entregamos listo', en: 'We deliver ready' },
          description: {
            es: 'El curso llega a tu LMS probado, interactivo y con la marca aplicada. No archivos sueltos. Un producto terminado.',
            en: 'The course arrives at your LMS tested, interactive, and branded. Not loose files. A finished product.',
          },
        },
      ],
    },
    pricing: {
      title: { es: 'Elige según lo que necesitas', en: 'Choose what you need' },
      subtitle: {
        es: 'Todos los proyectos incluyen una llamada de inicio sin coste. Si no es el momento adecuado para trabajar juntos, lo decimos antes de empezar.',
        en: 'All projects include a free kickoff call. If it\'s not the right time to work together, we\'ll say so before starting.',
      },
      vatToggle: {
        off: { es: 'Sin IVA', en: 'Excl. VAT' },
        on: { es: 'Con IVA (21%)', en: 'Incl. VAT (21%)' },
      },
      services: [
        {
          title: { es: 'Estructura instruccional', en: 'Instructional structure' },
          price: { noVat: '2.800€', withVat: '3.388€' },
          subtitle: { es: 'Para quien tiene el contenido y necesita que alguien lo ordene.', en: 'For those who have content and need someone to organize it.' },
          includes: {
            es: [
              'Análisis de contenido y audiencia',
              'Guion instruccional estructurado',
              'Mapa de módulos y objetivos de aprendizaje',
              'Recomendaciones de formato y plataforma',
              'Documento de entrega editable',
            ],
            en: [
              'Content and audience analysis',
              'Structured instructional script',
              'Module map and learning objectives',
              'Format and platform recommendations',
              'Editable delivery document',
            ],
          },
          timeline: { es: 'Plazo: 2–3 semanas', en: 'Timeline: 2–3 weeks' },
          cta: { es: 'Solicitar este servicio', en: 'Request this service' },
        },
        {
          title: { es: 'Curso completo', en: 'Complete course' },
          price: { noVat: '6.500€', withVat: '7.865€' },
          subtitle: { es: 'Del documento al curso publicado y funcionando.', en: 'From document to published, working course.' },
          includes: {
            es: [
              'Todo lo anterior',
              'Diseño visual coherente con tu marca',
              'Maquetación en LMS (Moodle / Open edX)',
              'Objetos virtuales de aprendizaje interactivos',
              'Una ronda de revisiones incluida',
            ],
            en: [
              'Everything above',
              'Visual design coherent with your brand',
              'LMS layout (Moodle / Open edX)',
              'Interactive virtual learning objects',
              'One round of revisions included',
            ],
          },
          timeline: { es: 'Hasta 60 horas de contenido estructurado. Plazo: 4–6 semanas', en: 'Up to 60 hours of structured content. Timeline: 4–6 weeks' },
          cta: { es: 'Solicitar este servicio', en: 'Request this service' },
          featured: true,
        },
        {
          title: { es: 'Programa complejo', en: 'Complex program' },
          price: { noVat: 'desde 10.000€', withVat: 'desde 12.100€' },
          subtitle: { es: 'Para programas grandes, múltiples módulos o audiencias de alta exigencia.', en: 'For large programs, multiple modules, or demanding audiences.' },
          includes: {
            es: [
              'Todo lo anterior',
              'Varios cursos o módulos dentro del mismo programa',
              'Adaptación para audiencias con baja alfabetización',
              'Sesión de formación al equipo',
              'Dos rondas de revisiones',
            ],
            en: [
              'Everything above',
              'Multiple courses or modules within the same program',
              'Adaptation for low-literacy audiences',
              'Team training session',
              'Two rounds of revisions',
            ],
          },
          timeline: { es: 'Precio según alcance - se define en consultoría previa', en: 'Price based on scope - defined in preliminary consultation' },
          cta: { es: 'Hablemos de tu proyecto', en: 'Let\'s talk about your project' },
        },
        {
          title: { es: 'Retainer', en: 'Retainer' },
          price: { noVat: '4.200€/mes', withVat: '5.082€/mes' },
          subtitle: { es: 'Para organizaciones que necesitan capacidad continua de diseño instruccional y visual.', en: 'For organizations needing ongoing instructional and visual design capacity.' },
          includes: {
            es: [
              '~8 horas/semana garantizadas',
              'Prioridad sobre proyectos nuevos',
              'Sin gestión de contratos por cada encargo',
              'Mínimo 3 meses',
            ],
            en: [
              '~8 hours/week guaranteed',
              'Priority over new projects',
              'No contract management per assignment',
              'Minimum 3 months',
            ],
          },
          timeline: { es: '', en: '' },
          cta: { es: 'Consultar disponibilidad', en: 'Check availability' },
        },
        {
          title: { es: 'Sesión de criterio', en: 'Criteria session' },
          price: { noVat: '320€', withVat: '387€' },
          subtitle: { es: '90 minutos. Revisas lo que tienes, Narrlab te dice qué cambiar y cómo.', en: '90 minutes. Review what you have, Narrlab tells you what to change and how.' },
          includes: {
            es: [
              'Revisión de estructura de curso existente',
              'Recomendaciones concretas y priorizadas',
              'Documento de entrega post-sesión',
              'Ideal si no estás segura de qué necesitas todavía',
            ],
            en: [
              'Review of existing course structure',
              'Concrete, prioritized recommendations',
              'Post-session delivery document',
              'Ideal if you\'re not sure what you need yet',
            ],
          },
          timeline: { es: '', en: '' },
          cta: { es: 'Reservar sesión', en: 'Book session' },
        },
      ],
    },
    testimonials: {
      title: { es: 'Lo que dicen nuestros clientes', en: 'What our clients say' },
      items: [
        {
          quote: { 
            es: 'No entiendo cómo ese montón de texto se convirtió en esto tan atractivo y bien construido.',
            en: 'I don\'t understand how that pile of text turned into something so attractive and well-built.',
          },
        },
        {
          quote: { 
            es: 'Además siguió las líneas gráficas y es coherente.',
            en: 'Plus, it followed the graphic guidelines and is coherent.',
          },
        },
        {
          quote: { 
            es: 'Es muy fácil trabajar con Narrlab porque entienden lo que queremos.',
            en: 'It\'s very easy to work with Narrlab because they understand what we want.',
          },
        },
      ],
      clients: {
        es: 'Clientes: Wikimedia · CRS · UCA',
        en: 'Clients: Wikimedia · CRS · UCA',
      },
    },
    faq: {
      title: { es: 'Preguntas frecuentes', en: 'FAQ' },
      items: [
        {
          question: {
            es: '¿Necesito tener el contenido listo antes de empezar?',
            en: 'Do I need to have content ready before starting?',
          },
          answer: {
            es: 'No. Muchos proyectos empiezan con documentos en borrador, notas dispersas o conocimiento que todavía no tiene forma escrita. Parte del trabajo es darle estructura.',
            en: 'No. Many projects start with draft documents, scattered notes, or knowledge that doesn\'t yet have written form. Part of the work is giving it structure.',
          },
        },
        {
          question: {
            es: '¿Trabajáis con cualquier LMS?',
            en: 'Do you work with any LMS?',
          },
          answer: {
            es: 'Principalmente Moodle y Open edX, que son los más comunes en ONGs y organizaciones internacionales. Si usas otra plataforma, consúltanos antes.',
            en: 'Mainly Moodle and Open edX, which are most common in NGOs and international organizations. If you use another platform, consult with us first.',
          },
        },
        {
          question: {
            es: '¿Qué pasa si el proyecto es más pequeño o más grande de lo previsto?',
            en: 'What if the project is smaller or larger than expected?',
          },
          answer: {
            es: 'Definimos el alcance al inicio. Si cambia, lo hablamos antes de que afecte al precio o al plazo - nunca después.',
            en: 'We define the scope at the start. If it changes, we discuss it before it affects price or timeline - never after.',
          },
        },
        {
          question: {
            es: '¿Puedo empezar con una sesión de criterio y luego contratar un proyecto?',
            en: 'Can I start with a criteria session and then hire a project?',
          },
          answer: {
            es: 'Sí. El coste de la sesión se descuenta del proyecto si decides continuar.',
            en: 'Yes. The session cost is deducted from the project if you decide to continue.',
          },
        },
      ],
    },
    finalCta: {
      title: {
        es: '¿Tiene sentido trabajar juntos?',
        en: 'Does it make sense to work together?',
      },
      description: {
        es: 'Empieza por contarnos qué tienes. La primera llamada no tiene coste ni compromiso - solo sirve para entender si podemos ayudarte.',
        en: 'Start by telling us what you have. The first call has no cost or commitment - it just helps us understand if we can help you.',
      },
      cta: { es: 'Empieza con un brief', en: 'Start with a brief' },
    },
  };

  return (
    <div className="min-h-screen">
      {/* SECTION 1 - HERO */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-balance">{getText(content.hero.title)}</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {getText(content.hero.subhead)}
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/contact')}
              style={{ backgroundColor: '#D95032' }}
              className="hover:opacity-90"
            >
              {getText(content.hero.cta)} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 2 - FOR WHOM */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">{getText(content.forWhom.title)}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.forWhom.cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{getText(card.title)}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {getText(card.description)}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 - HOW WE WORK */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-16 text-[32px] font-bold">{getText(content.howWeWork.title)}</h2>
          <div className="space-y-12">
            {content.howWeWork.steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold mb-2">{getText(step.title)}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {getText(step.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 - PRICING */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="mb-4 font-bold text-[32px]">{getText(content.pricing.title)}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {getText(content.pricing.subtitle)}
              </p>
            </div>

            {/* VAT Toggle */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <span className={`text-sm ${!vatEnabled ? 'font-semibold' : 'text-muted-foreground'}`}>
                {getText(content.pricing.vatToggle.off)}
              </span>
              <button
                onClick={() => setVatEnabled(!vatEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  vatEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
                role="switch"
                aria-checked={vatEnabled}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    vatEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${vatEnabled ? 'font-semibold' : 'text-muted-foreground'}`}>
                {getText(content.pricing.vatToggle.on)}
              </span>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.pricing.services.map((service, index) => (
                <Card
                  key={index}
                  className={`p-6 hover:shadow-xl transition-shadow relative flex flex-col ${
                    service.featured ? 'border-2 border-primary shadow-lg' : ''
                  }`}
                >
                  {service.featured && (
                    <Badge 
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      style={{ backgroundColor: '#D95032' }}
                    >
                      {language === 'es' ? 'Más solicitado' : 'Most requested'}
                    </Badge>
                  )}
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{getText(service.title)}</h3>
                      <p className="text-sm text-muted-foreground italic">
                        {getText(service.subtitle)}
                      </p>
                    </div>
                    <div className="py-2">
                      <p className="text-3xl font-bold">
                        {vatEnabled ? service.price.withVat : service.price.noVat}
                      </p>
                    </div>
                    <div className="space-y-2 flex-1">
                      {(language === 'es' ? service.includes.es : service.includes.en).map(
                        (item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        )
                      )}
                    </div>
                    {service.timeline && getText(service.timeline) && (
                      <p className="text-xs text-muted-foreground border-t pt-3">
                        {getText(service.timeline)}
                      </p>
                    )}
                    <Button
                      className="w-full mt-4"
                      variant={service.featured ? 'default' : 'outline'}
                      onClick={() => navigate('/contact')}
                      style={service.featured ? { backgroundColor: '#D95032' } : {}}
                    >
                      {getText(service.cta)}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - TESTIMONIALS */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center mb-12">{getText(content.testimonials.title)}</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {content.testimonials.items.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <Star className="h-5 w-5 text-primary mb-3 fill-current" />
                  <p className="text-muted-foreground italic flex-1">
                    "{getText(item.quote)}"
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground font-semibold">
            {getText(content.testimonials.clients)}
          </p>
        </div>
      </section>

      {/* SECTION 6 - FAQ */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-12">{getText(content.faq.title)}</h2>
            <div className="space-y-4">
              {content.faq.items.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold">{getText(item.question)}</span>
                    <ArrowRight
                      className={`h-5 w-5 flex-shrink-0 transition-transform ${
                        openFaqIndex === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-6 pb-4 text-muted-foreground border-t bg-muted/20">
                      <p className="pt-4">{getText(item.answer)}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - FINAL CTA */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-balance font-bold text-[32px]">{getText(content.finalCta.title)}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {getText(content.finalCta.description)}
          </p>
          <div className="pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/contact')}
              style={{ backgroundColor: '#D95032' }}
              className="hover:opacity-90"
            >
              {getText(content.finalCta.cta)} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}