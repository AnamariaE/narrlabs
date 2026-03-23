import React from 'react';
import { useI18n } from '../lib/i18n-context';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { BadgeSlider } from '../components/BadgeSlider';
import { 
  BookOpen, 
  Target, 
  Sparkles,
  Users,
  Award,
  Gamepad2,
  ExternalLink,
  ArrowUp,
  Mail,
  CheckCircle2,
  Clock,
  Star
} from 'lucide-react';

interface HumanidadesDigitalesPageProps {
  onNavigate?: (page: string) => void;
}

export function HumanidadesDigitalesPage({ onNavigate }: HumanidadesDigitalesPageProps) {
  const { language } = useI18n();

  const content = {
    es: {
      hero: {
        title: "Gamificación de Intro a Humanidades Digitales",
        intro: "Gamificar un curso requiere traducir objetivos pedagógicos en experiencias significativas. Esto implica un proceso de abstracción, diseño narrativo y toma de decisiones creativas que transforman los contenidos en dinámicas de aprendizaje.\n\nEn esta sección presento la gamificación diseñada para la asignatura Introducción a las Humanidades Digitales. El curso se desarrolló en modalidades sincrónica, asincrónica y presencial. La propuesta integra narrativa, línea gráfica, sistema de reglas, misiones e insignias, todos concebidos y diseñados por mí como parte del proceso creativo y pedagógico.",
        tags: ["Gamificación", "Diseño Instruccional", "Humanidades Digitales", "Narrativa", "Moodle"]
      },
      tableOfContents: {
        title: "Contenido",
        sections: [
          "Acerca de la materia",
          "Proceso de gamificación",
          "Línea gráfica",
          "Justificación",
          "Contexto del juego",
          "Reglas del juego",
          "Equivalencia de contenidos",
          "Misiones y puntajes",
          "Insignias",
          "Parciales gamificados",
          "Aplicación en Moodle"
        ]
      },
      sections: {
        materia: {
          title: "Acerca de la Materia de Introducción a las Humanidades Digitales",
          content: "Durante la ultima reforma para La licenciatura en Comunicación social y la nueva carrera del Técnico en Producción Multimedia se decidió que era necesario crear la materia de Introducción en Humanidades Digitales. La UCA es la única Universidad en El Salvador en tener una materia con estas características. En esta materia se hace un acercamiento al uso de la tecnología con el pensamiento crítico.\n\nY cómo se puede hacer uso de la tecnología para aprender de ella y con ella y poder realizar productos y proyectos que incluyan un proceso de base de datos, mediación digital y formas de presentar esta información que sea lo más accesible y clara posible para todos. Incluye también procesos de Alfabetización Mediática Informativa, Ciudadanía Digital, Sistemas Informáticos de Geolocalización para las áreas Humanistas, Estilometría, entre otros."
        },
        proceso: {
          title: "Acerca del proceso de Gamificación",
          content: "El proceso de Gamificación tomado en este caso coincide mucho con lo dicho en la página de Procesos. Debido a al fuerte componente tecnologico de la materia decidí que el tema bajo el que se realizaría la gamificación serían los viajes al tiempo. La materia incluye procesos de revisión de historia de las Humanidades Digitales (HD)(Pasado), Conceptos básicos y Habilidades para las HD (Presente) y Aplicaciones para las HD (futuro).\n\nEn las imágenes a continuación encontrarán el manual de uso y cómo se desarrolló el ejercicio.",
          imagePlaceholder: "Manual de uso"
        },
        lineaGrafica: {
          title: "Línea gráfica",
          content: "La línea gráfica que realicé fue inspirada en una estética de un videojuego de los ochentas con mezcla de un Chronos postmoderno.",
          imagePlaceholder: "Línea gráfica"
        },
        justificacion: {
          title: "Justificación",
          content: "En ésta imagen encontramos la forma como se justifica a los estudiantes cómo se abordará el curso. Y se plantea el reto de un esfuerzo mixto. Los estudiantes como actores principales de su educación y los profesores como parte de un acompañamiento en el que la retroalimentación es de gran importancia.",
          imagePlaceholder: "Justificación"
        },
        contexto: {
          title: "Contexto del juego",
          content: "Aspirante a Crononauta es una mezcla entre los programa reality show que surgieron en los 90's en el que se busca una entrevista con Chronos, la personificación del tiempo, según se dice en las obras filosóficas presocráticas, para conseguir el trabajo de tus sueños, poder viajar en el tiempo.",
          imagePlaceholder: "Contexto del juego"
        },
        reglas: {
          title: "Reglas del Juego",
          content: "Toda gamificación necesita tener las reglas claras y las formas como jugar. En Esta imagen se le explica a los estudiantes las formas como podrán sumar puntos con el fin de tener una entrevista con Chronos.",
          imagePlaceholder: "Reglas"
        },
        equivalencia: {
          title: "Equivalencia de los contenidos",
          content: "Es necesario realizar un cuadro en el que se explique la equivalencia de los contenidos y cómo se realizará la metodología. El tiempo, los contenidos y nombres creativos son necesarios en estos procesos.",
          imagePlaceholder: "Cuadro de equivalencias"
        },
        misiones: {
          title: "Misiones y Puntajes",
          content: "En este proceso es necesario crear una forma de equivalencia para el lenguaje que se utilizará a medida se avanza en el curso. El equivalente era Minutos de relojes a puntos. El máximo son 100 minutos a 10 puntos."
        },
        insignias: {
          title: "Insignias",
          content: "Las insignias son necesarias en las gamificaciones. Son modos o formas de ganar puntajes. En este caso existen dos tipos de Insignias las Oopart (objetos fuera del tiempo) y que se refieren a actividades personales en las que ellos eligen cuál desarrollaran y las Insignias Estrellas (que según algunas teorías podrían ayudarnos a viajar en el tiempo) estas se realizan en grupos. Para poder obtener estas insignias deben de tener un puntaje mayor a ocho. Estas insignias pueden ser programadas en Moodle."
        },
        parciales: {
          title: "Parciales gamificados",
          content: "Parte de la gamificación es mantener el tono aún en los procesos de evaluación y este es el primer parcial que realizan. En este caso es una trivia con una ruleta. El ejercicio es en grupo (tripulación) y se enfrentan dos grupos. Esta actividad puede ser realizada en línea (sincrónica) o presencial. Puedes interactuar con el juego dando click en empezar y luego dando click en la ruleta para que te indique qué numero o apartado tienes que acceder."
        },
        moodle: {
          title: "Aplicación en Moodle",
          content: "La primera edición de esta gamificación fue realizada en Sakai pero el sistema ya no está disponible por lo que no puedo tener acceso y de esta forma mostrar cómo se había realizado el aula virtual. Pero sí les mostraré algunos detalles relevantes de la segunda edición (01/2022).",
          insigniasSubtitle: "Uso de Insignias",
          insigniasContent: "Las insignias fueron creadas y asignadas en el sakai a todos los participantes que obtuvieron una nota equivalente o mayor a ocho. Puedes ver en el video todos los tipos de insignias que se crearon.",
          nombresSubtitle: "Nombres y Roles",
          nombresContent: "En moodle se puede cambiar los nombres de los roles que están predeterminados. En este caso como parte de la gamificación realicé los siguientes cambios:",
          nombresPlaceholder: "Nombres y Roles"
        }
      },
      callout: {
        title: "Proceso y metodología de gamificación",
        items: [
          "Objetivos de la gamificación",
          "Fases: análisis y diseño, narrativa y prototipado, revisión/arte, escalabilidad"
        ],
        cta: "Ver página de procesos"
      },
      finalCta: {
        title: "¿Quieres ver el dosier completo?",
        description: "Puedes entrar a ver el manual de instrucciones y todas las actividades en forma de pdf en este link o verlo directamente en el recuadro que encontrarás a la par.",
        button: "Ver dosier completo",
        contact: "Más información puede escribir a: anamariaespinoza@gmail.com"
      },
      backToTop: "Volver arriba"
    },
    en: {
      hero: {
        title: "Gamification of Intro to Digital Humanities",
        intro: "Gamifying a course requires translating pedagogical objectives into meaningful experiences. This involves a process of abstraction, narrative design, and creative decision-making that transforms content into learning dynamics.\n\nIn this section I present the gamification designed for the Introduction to Digital Humanities course. The course was developed in synchronous, asynchronous, and in-person modalities. The proposal integrates narrative, visual design, rule system, missions, and badges, all conceived and designed by me as part of the creative and pedagogical process.",
        tags: ["Gamification", "Instructional Design", "Digital Humanities", "Narrative", "Moodle"]
      },
      tableOfContents: {
        title: "Contents",
        sections: [
          "About the course",
          "Gamification process",
          "Visual design",
          "Justification",
          "Game context",
          "Game rules",
          "Content equivalence",
          "Missions and scores",
          "Badges",
          "Gamified assessments",
          "Moodle implementation"
        ]
      },
      sections: {
        materia: {
          title: "About the Introduction to Digital Humanities Course",
          content: "During the last reform for the Bachelor's degree in Social Communication and the new Multimedia Production Technician career, it was decided that it was necessary to create the Introduction to Digital Humanities course. UCA is the only university in El Salvador with a course with these characteristics. This course approaches the use of technology with critical thinking.\n\nAnd how technology can be used to learn from it and with it, and to create products and projects that include a database process, digital mediation, and ways to present this information that is as accessible and clear as possible for everyone. It also includes processes of Media and Information Literacy, Digital Citizenship, Geographic Information Systems for Humanities areas, Stylometry, among others."
        },
        proceso: {
          title: "About the Gamification Process",
          content: "The gamification process taken in this case coincides a lot with what is said on the Processes page. Due to the strong technological component of the subject, I decided that the theme under which the gamification would be carried out would be time travel. The course includes processes for reviewing the history of Digital Humanities (DH) (Past), Basic Concepts and Skills for DH (Present), and Applications for DH (Future).\n\nIn the following images you will find the user manual and how the exercise was developed.",
          imagePlaceholder: "User manual"
        },
        lineaGrafica: {
          title: "Visual Design",
          content: "The visual design I created was inspired by an 80s video game aesthetic mixed with a postmodern Chronos.",
          imagePlaceholder: "Visual design"
        },
        justificacion: {
          title: "Justification",
          content: "In this image we find the way students are justified how the course will be approached. And the challenge of a mixed effort is raised. Students as the main actors of their education and teachers as part of an accompaniment in which feedback is of great importance.",
          imagePlaceholder: "Justification"
        },
        contexto: {
          title: "Game Context",
          content: "Aspiring Chrononaut is a mix between the reality shows that emerged in the 90's in which an interview with Chronos is sought, the personification of time, as stated in pre-Socratic philosophical works, to get the job of your dreams, being able to travel in time.",
          imagePlaceholder: "Game context"
        },
        reglas: {
          title: "Game Rules",
          content: "Every gamification needs to have clear rules and ways to play. In this image students are explained the ways they can add points in order to have an interview with Chronos.",
          imagePlaceholder: "Rules"
        },
        equivalencia: {
          title: "Content Equivalence",
          content: "It is necessary to make a table that explains the equivalence of content and how the methodology will be carried out. Time, content, and creative names are necessary in these processes.",
          imagePlaceholder: "Equivalence table"
        },
        misiones: {
          title: "Missions and Scores",
          content: "In this process it is necessary to create a form of equivalence for the language that will be used as the course progresses. The equivalent was Clock Minutes to points. The maximum is 100 minutes to 10 points."
        },
        insignias: {
          title: "Badges",
          content: "Badges are necessary in gamifications. They are modes or ways to earn points. In this case there are two types of Badges, the Oopart (objects out of time) that refer to personal activities in which they choose which one to develop, and the Star Badges (which according to some theories could help us travel in time) these are done in groups. To obtain these badges you must have a score greater than eight. These badges can be programmed in Moodle."
        },
        parciales: {
          title: "Gamified Assessments",
          content: "Part of gamification is to maintain the tone even in the evaluation processes and this is the first midterm they take. In this case it is a trivia with a wheel. The exercise is in groups (crew) and two groups face each other. This activity can be done online (synchronous) or in person. You can interact with the game by clicking start and then clicking on the wheel to indicate which number or section you have to access."
        },
        moodle: {
          title: "Moodle Implementation",
          content: "The first edition of this gamification was done in Sakai but the system is no longer available so I cannot access it and thus show how the virtual classroom had been made. But I will show you some relevant details of the second edition (01/2022).",
          insigniasSubtitle: "Use of Badges",
          insigniasContent: "The badges were created and assigned in Sakai to all participants who obtained a grade equal to or greater than eight. You can see in the video all the types of badges that were created.",
          nombresSubtitle: "Names and Roles",
          nombresContent: "In Moodle you can change the names of the default roles. In this case, as part of the gamification, I made the following changes:",
          nombresPlaceholder: "Names and Roles"
        }
      },
      callout: {
        title: "Gamification process and methodology",
        items: [
          "Gamification objectives",
          "Phases: analysis and design, narrative and prototyping, review/art, scalability"
        ],
        cta: "View process page"
      },
      finalCta: {
        title: "Want to see the complete dossier?",
        description: "You can access the instruction manual and all activities in PDF format at this link or view it directly in the box you will find next to it.",
        button: "View complete dossier",
        contact: "For more information write to: anamariaespinoza@gmail.com"
      },
      backToTop: "Back to top"
    }
  };

  const t = content[language];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const badges = [
    {
      src: "https://narrlab.studio/img/insigniasopart.jpg",
      alt: "Insignia Oopart",
      title: "Oopart",
      description: language === 'es' ? "Actividades personales elegibles" : "Personal elective activities"
    },
    {
      src: "https://narrlab.studio/img/estrella.jpg",
      alt: "Insignia Estrellas",
      title: language === 'es' ? "Estrellas" : "Stars",
      description: language === 'es' ? "Actividades grupales" : "Group activities"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F2BF80]/10">
      {/* Navigation sidebar - Desktop only */}
      <nav className="hidden lg:fixed lg:right-8 lg:top-1/2 lg:-translate-y-1/2 lg:flex lg:flex-col lg:gap-3 lg:z-30">
        {['materia', 'proceso', 'linea-grafica', 'justificacion', 'contexto', 'reglas', 'equivalencia', 'misiones', 'insignias', 'parciales', 'moodle'].map((section) => (
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
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <h1 className="text-4xl lg:text-5xl mb-6 font-bold text-[#21374d]">
              {t.hero.title}
            </h1>
            <div className="space-y-4 mb-8">
              {t.hero.intro.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-lg text-[#121126]/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
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
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <img 
              src="https://narrlab.studio/img/cronos.png" 
              alt="Cronos"
              className="w-full max-w-xs h-auto"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="container max-w-6xl mx-auto px-6 pb-8">
        <Card className="p-6 bg-white border-none shadow-sm">
          <h2 className="text-xl mb-4 flex items-center gap-2 text-[#21374d] font-bold">
            <BookOpen className="w-5 h-5 text-[#D95032]" />
            {t.tableOfContents.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.tableOfContents.sections.map((section, index) => {
              const sectionIds = ['materia', 'proceso', 'linea-grafica', 'justificacion', 'contexto', 'reglas', 'equivalencia', 'misiones', 'insignias', 'parciales', 'moodle'];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionIds[index])}
                  className="text-left text-sm text-[#121126]/70 hover:text-[#D95032] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D95032]/50" />
                  {section}
                </button>
              );
            })}
          </div>
        </Card>
      </section>

      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Acerca de la Materia */}
            <section id="materia">
              <h2 className="text-3xl mb-6 italic font-bold" style={{ color: '#21374d' }}>
                {t.sections.materia.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                {t.sections.materia.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-[#121126]/80 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <Separator />

            {/* Proceso de Gamificación */}
            <section id="proceso">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.proceso.title}
              </h2>
              <div className="prose prose-lg max-w-none mb-8">
                {t.sections.proceso.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-[#121126]/80 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
            </section>

            <Separator />

            {/* Línea Gráfica */}
            <section id="linea-grafica">
              <h2 className="text-3xl mb-6 p-[0px]" style={{ color: '#21374d' }}>
                {t.sections.lineaGrafica.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-8">
                {t.sections.lineaGrafica.content}
              </p>
              <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none">
                <ImageWithFallback
                  src="https://narrlab.studio/img/Lineagrafica.jpg"
                  alt={t.sections.lineaGrafica.title}
                  className="w-full h-auto rounded-lg"
                />
              </Card>
            </section>

            <Separator />

            {/* Justificación */}
            <section id="justificacion">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.justificacion.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-8">
                {t.sections.justificacion.content}
              </p>
              <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none">
                <ImageWithFallback
                  src="https://narrlab.studio/img/Justificacion.jpg"
                  alt={t.sections.justificacion.title}
                  className="w-full h-auto rounded-lg"
                />
              </Card>
            </section>

            <Separator />

            {/* Contexto del Juego */}
            <section id="contexto">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.contexto.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-8">
                {t.sections.contexto.content}
              </p>
              <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none">
                <ImageWithFallback
                  src="https://narrlab.studio/img/Contextodeljuego.jpg"
                  alt={t.sections.contexto.title}
                  className="w-full h-auto rounded-lg"
                />
              </Card>
            </section>

            <Separator />

            {/* Reglas del Juego */}
            <section id="reglas">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.reglas.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-8">
                {t.sections.reglas.content}
              </p>
              <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none">
                <ImageWithFallback
                  src="https://narrlab.studio/img/Reglasdeljuego.jpg"
                  alt={t.sections.reglas.title}
                  className="w-full h-auto rounded-lg"
                />
              </Card>
            </section>

            <Separator />

            {/* Equivalencia de Contenidos */}
            <section id="equivalencia">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.equivalencia.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-8">
                {t.sections.equivalencia.content}
              </p>
              <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none">
                <ImageWithFallback
                  src="https://narrlab.studio/img/Equivalenciadeloscontenidos.jpg"
                  alt={t.sections.equivalencia.title}
                  className="w-full h-auto rounded-lg"
                />
              </Card>
            </section>

            <Separator />

            {/* Misiones y Puntajes */}
            <section id="misiones">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.misiones.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-8">
                {t.sections.misiones.content}
              </p>
              
              <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none mb-6">
                <ImageWithFallback
                  src="https://narrlab.studio/img/Misionespuntajes.jpg"
                  alt={t.sections.misiones.title}
                  className="w-full h-auto rounded-lg"
                />
              </Card>
              
              <div className="p-6 bg-[#D95032]/5 rounded-lg border-l-4 border-[#D95032]">
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 text-[#D95032]" />
                  <div>
                    <p className="font-medium text-[#121126]">100 minutos = 10 puntos</p>
                    <p className="text-sm text-[#121126]/60">Equivalencia máxima</p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Insignias */}
            <section id="insignias">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.insignias.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-6">
                {t.sections.insignias.content}
              </p>
              
              {/* Slider for Badges */}
              <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none">
                <div className="relative px-12">
                  <BadgeSlider badges={badges} />
                </div>
              </Card>
            </section>

            <Separator />

            {/* Parciales Gamificados */}
            <section id="parciales">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.parciales.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-8">
                {t.sections.parciales.content}
              </p>
              
              {/* Genially Embed - Trivia/Ruleta Primer Parcial */}
              <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none overflow-hidden">
                <div className="w-full">
                  <div className="relative" style={{ paddingBottom: '56.25%', paddingTop: 0, height: 0 }}>
                    <iframe 
                      title="Primer Parcial - Trivia con Ruleta"
                      frameBorder="0"
                      width="1200"
                      height="675"
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src="https://view.genially.com/6050e3d67a7c2d0d6af36134"
                      allowFullScreen
                      scrolling="yes"
                    />
                  </div>
                </div>
              </Card>
            </section>

            <Separator />

            {/* Aplicación en Moodle */}
            <section id="moodle">
              <h2 className="text-3xl mb-6" style={{ color: '#21374d' }}>
                {t.sections.moodle.title}
              </h2>
              <p className="text-[#121126]/80 leading-relaxed mb-8">
                {t.sections.moodle.content}
              </p>

              {/* Uso de Insignias */}
              <div className="mb-8">
                <h3 className="text-xl mb-4 text-[#121126]">
                  {t.sections.moodle.insigniasSubtitle}
                </h3>
                <p className="text-[#121126]/80 leading-relaxed mb-6">
                  {t.sections.moodle.insigniasContent}
                </p>
                
                {/* YouTube Video Embed */}
                <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none overflow-hidden">
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      src="https://www.youtube.com/embed/9rmAo19PkDo"
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Insignias en Moodle - Tutorial"
                      loading="lazy"
                    />
                  </div>
                </Card>
              </div>

              {/* Nombres y Roles */}
              <div>
                <h3 className="text-xl mb-4 text-[#121126]">
                  {t.sections.moodle.nombresSubtitle}
                </h3>
                <p className="text-[#121126]/80 leading-relaxed mb-6">
                  {t.sections.moodle.nombresContent}
                </p>
                <Card className="p-4 bg-gradient-to-br from-[#D95032]/5 to-[#F2AE2E]/5 border-none">
                  <ImageWithFallback
                    src="https://narrlab.studio/img/Roles.png"
                    alt={t.sections.moodle.nombresSubtitle}
                    className="w-full h-auto rounded-lg"
                  />
                </Card>
              </div>
            </section>

            <Separator className="my-16" />

            {/* Final CTA */}
            <section className="mb-16">
              <Card className="p-8 bg-gradient-to-br from-[#D95032] to-[#F2AE2E] text-white border-none shadow-xl">
                <h2 className="text-2xl lg:text-3xl mb-4">
                  {t.finalCta.title}
                </h2>
                <p className="mb-6 text-white/90 leading-relaxed">
                  {t.finalCta.description}
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-[#D95032] hover:bg-[#F2BF80] mb-8"
                  onClick={() => window.open('https://www.canva.com/design/DAE3zOMYXjA/OcSsF-myCRQunVvAZkxPQw/view', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.finalCta.button}
                </Button>
                
                {/* Canva Embed - Dosier Completo */}
                <Card className="p-4 bg-white/10 border-white/20 overflow-hidden">
                  <div className="w-full">
                    <div className="relative" style={{ paddingBottom: '141.4286%', paddingTop: 0, height: 0 }}>
                      <iframe 
                        title="Dosier Humanidades Digitales"
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        src="https://www.canva.com/design/DAE3zOMYXjA/OcSsF-myCRQunVvAZkxPQw/view?embed"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </Card>

                <div className="mt-6 pt-6 border-t border-white/20">
                  
                </div>
              </Card>
            </section>

            {/* Back to Top */}
            <div className="flex justify-center">
              <Button
                onClick={scrollToTop}
                variant="outline"
                className="border-[#D95032] text-[#D95032] hover:bg-[#D95032]/10"
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                {t.backToTop}
              </Button>
            </div>
          </div>

          {/* Sidebar - Callout */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <Card className="p-6 bg-gradient-to-br from-[#D95032]/10 to-[#F2AE2E]/10 border-2 border-[#D95032]/20 shadow-lg">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#D95032] flex items-center justify-center shrink-0">
                    <Gamepad2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg text-[#121126] pt-1">
                    {t.callout.title}
                  </h3>
                </div>
                <ul className="space-y-3 mb-6">
                  {t.callout.items.map((item, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-4 h-4 text-[#D95032] shrink-0 mt-0.5" />
                      <p className="text-sm text-[#121126]/80">{item}</p>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => onNavigate?.('gamification')}
                  variant="outline"
                  className="w-full border-[#D95032] text-[#D95032] hover:bg-[#D95032]/10"
                >
                  {t.callout.cta}
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}