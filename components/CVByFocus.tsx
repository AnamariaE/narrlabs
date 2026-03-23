import React, { useState } from 'react';
import { Download, Printer, Eye, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useBrand } from '../lib/brand-context';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

type CVFocusVersion = 'base' | 'lxd' | 'multimedia';

interface CVFocusData {
  name: string;
  title_es: string;
  title_en: string;
  location: string;
  email: string;
  social: string;
  profile_es: string;
  profile_en: string;
  skills: string[];
  tools: string[];
  experience: Array<{
    company: string;
    role_es: string;
    role_en: string;
    period: string;
    highlights_es: string[];
    highlights_en: string[];
  }>;
  education_es: string[];
  education_en: string[];
  certifications: string[];
  languages: Array<{ name: string; level: string }>;
  keywords_es: string;
  keywords_en: string;
  pdfPath: string;
}

const cvFocusData: Record<CVFocusVersion, CVFocusData> = {
  base: {
    name: "Anamaría Espinoza",
    title_es: "Learning Experience & Community Education Lead",
    title_en: "Learning Experience & Community Education Lead",
    location: "Zaragoza, ES",
    email: "aespinoza@narrlab.studio",
    social: "LinkedIn · Behance · Wikimedia Commons",
    profile_es: "Diseñadora instruccional y multimedia con +10 años creando experiencias de aprendizaje para comunidades globales. Convierto conocimiento complejo en cursos escalables y medibles, y diseño plantillas/guías y flujos de trabajo para que equipos y course creators produzcan más rápido y mejor. He liderado onboarding y QA de creadores de cursos (WikiLearn), integrando accesibilidad, gamificación y storytelling.",
    profile_en: "Instructional and multimedia designer with +10 years creating learning experiences for global communities. I turn complex knowledge into scalable and measurable courses, and design templates/guides and workflows so that teams and course creators can produce faster and better. I have led onboarding and QA for course creators (WikiLearn), integrating accessibility, gamification and storytelling.",
    skills: [
      "Instructional Design", "LXD", "Curriculum", "Assessment/Certification",
      "Accessibility", "Community Programs", "Gamification", "Storytelling",
      "QA/Check-ins", "Templates/Toolkits", "Analytics/KPIs", "Design Thinking"
    ],
    tools: [
      "Moodle", "Canvas", "edX", "Adobe CC (Ps, Ai, Pr, Ae)", "HTML/CSS",
      "R", "Python", "Google Workspace", "WordPress"
    ],
    experience: [
      {
        company: "Wikimedia Foundation - Community Development (WikiLearn)",
        role_es: "Instructional Design Lead (contract) · 2024–presente",
        role_en: "Instructional Design Lead (contract) · 2024–present",
        period: "2024–presente",
        highlights_es: [
          "Pipeline de onboarding y QA con check-ins −2/+2 semanas; seguimiento cíclico.",
          "Analítica de curso (edX): inscripción, avance, finalización, certificados; badges/certificados (Edly/Badgr).",
          "Plantillas estandarizadas (SMART, rúbricas, evaluación) para escalar producción y calidad.",
          "Outputs: PPT accesible (Core Curriculum – External Comms), landing con video HTML, Content Library, checklist de Course Creator Resources.",
          "Proyectos clave: Organizer Lab, Wayuu Learning Circles, RFC Gender, Board Candidate Pre-Onboarding 2024, Africa Growth Pilot/Core Curriculum."
        ],
        highlights_en: [
          "Onboarding and QA pipeline with check-ins −2/+2 weeks; cyclical follow-up.",
          "Course analytics (edX): enrollment, progress, completion, certificates; badges/certificates (Edly/Badgr).",
          "Standardized templates (SMART, rubrics, assessment) to scale production and quality.",
          "Outputs: accessible PPT (Core Curriculum – External Comms), landing with HTML video, Content Library, Course Creator Resources checklist.",
          "Key projects: Organizer Lab, Wayuu Learning Circles, RFC Gender, Board Candidate Pre-Onboarding 2024, Africa Growth Pilot/Core Curriculum."
        ]
      },
      {
        company: "CRS - ASA Virtual (Canvas LMS)",
        role_es: "Diseño e-learning multimedia · 2022–2023",
        role_en: "E-learning multimedia design · 2022–2023",
        period: "2022–2023",
        highlights_es: [
          "Traducción de contenidos técnicos a módulos accesibles (baja alfabetización) con storytelling y visuales.",
          "Producción audiovisual (guiones, video, gráficos) y guías; reducción de capacitación presencial.",
          "Validación con especialistas para exactitud técnica y usabilidad en baja conectividad."
        ],
        highlights_en: [
          "Translation of technical content into accessible modules (low literacy) with storytelling and visuals.",
          "Audiovisual production (scripts, video, graphics) and guides; reduction of in-person training.",
          "Validation with specialists for technical accuracy and usability in low connectivity."
        ]
      },
      {
        company: "Universidad Centroamericana (UCA)",
        role_es: "Docente (Humanidades Digitales, Diseño y Diagramación, Producción Multimedia) · 2018–2021",
        role_en: "Faculty (Digital Humanities, Design and Layout, Multimedia Production) · 2018–2021",
        period: "2018–2021",
        highlights_es: [
          "Actualización de malla curricular (competencias y resultados).",
          "Redacción de syllabus con rúbricas y criterios.",
          "Curso gamificado \"Aspirante a Crononauta\"; cohortes ~50 estudiantes."
        ],
        highlights_en: [
          "Curriculum update (competencies and outcomes).",
          "Syllabus writing with rubrics and criteria.",
          "Gamified course \"Aspirante a Crononauta\"; cohorts ~50 students."
        ]
      }
    ],
    education_es: [
      "M.A. Filosofía Latinoamericana",
      "M.A. Diseño Gráfico y Publicaciones Digitales",
      "B.A. Comunicación Social"
    ],
    education_en: [
      "M.A. Latin American Philosophy",
      "M.A. Graphic Design and Digital Publications",
      "B.A. Social Communication"
    ],
    certifications: [
      "R (Statistics)",
      "GIS",
      "Gamification",
      "Wikipedia Training"
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "English", level: "Advanced" }
    ],
    keywords_es: "Instructional Design, LXD, Curriculum, Assessment, Certification, edX, Canvas, Moodle, Accessibility, Inclusive Design, SCORM/xAPI, Gamification, Storytelling, QA, Templates, Toolkits, Analytics, KPIs, Design Thinking, Community Programs, Remote Facilitation",
    keywords_en: "Instructional Design, LXD, Curriculum, Assessment, Certification, edX, Canvas, Moodle, Accessibility, Inclusive Design, SCORM/xAPI, Gamification, Storytelling, QA, Templates, Toolkits, Analytics, KPIs, Design Thinking, Community Programs, Remote Facilitation",
    pdfPath: "/assets/cv/AnamariaEspinoza_CV_Base.pdf"
  },
  lxd: {
    name: "Anamaría Espinoza",
    title_es: "Learning Experience Design (LXD) Lead / Instructional Design Lead",
    title_en: "Learning Experience Design (LXD) Lead / Instructional Design Lead",
    location: "Zaragoza, ES",
    email: "aespinoza@narrlab.studio",
    social: "LinkedIn · Behance · Wikimedia Commons",
    profile_es: "Diseñadora instruccional (LXD) con +10 años creando experiencias de aprendizaje escalables y medibles. Lidero onboarding y QA para course creators, y estandarizo plantillas (objetivos SMART, rúbricas y evaluación) para acelerar producción sin perder calidad. Integro accesibilidad, analítica en edX y sistemas de certificación/badges para mejorar resultados y consistencia.",
    profile_en: "Instructional designer (LXD) with +10 years creating scalable and measurable learning experiences. I lead onboarding and QA for course creators, and standardize templates (SMART objectives, rubrics and assessment) to accelerate production without losing quality. I integrate accessibility, edX analytics and certification/badge systems to improve outcomes and consistency.",
    skills: [
      "LXD", "Instructional Design", "Curriculum", "Assessment/Certification",
      "Accessibility", "QA/Check-ins", "Templates/Toolkits", "Analytics/KPIs",
      "Inclusive Design", "Design Thinking", "Remote Facilitation",
      "Gamification", "Storytelling", "SCORM/xAPI"
    ],
    tools: [
      "edX", "Canvas", "Moodle", "Badges/Certificates (Edly/Badgr)",
      "Google Workspace", "HTML/CSS", "Adobe CC", "R", "Python", "WordPress"
    ],
    experience: [
      {
        company: "Wikimedia Foundation - Community Development (WikiLearn)",
        role_es: "Instructional Design Lead (contract) · 2024–presente",
        role_en: "Instructional Design Lead (contract) · 2024–present",
        period: "2024–presente",
        highlights_es: [
          "Pipeline de onboarding y QA con check-ins −2/+2 semanas; seguimiento cíclico.",
          "Analítica de curso (edX): inscripción, avance, finalización, certificados; badges/certificados (Edly/Badgr).",
          "Plantillas estandarizadas (SMART, rúbricas, evaluación) para escalar producción y calidad.",
          "Outputs: PPT accesible (Core Curriculum – External Comms), landing con video HTML, Content Library, checklist de Course Creator Resources.",
          "Proyectos clave: Organizer Lab, Wayuu Learning Circles, RFC Gender, Board Candidate Pre-Onboarding 2024, Africa Growth Pilot/Core Curriculum."
        ],
        highlights_en: [
          "Onboarding and QA pipeline with check-ins −2/+2 weeks; cyclical follow-up.",
          "Course analytics (edX): enrollment, progress, completion, certificates; badges/certificates (Edly/Badgr).",
          "Standardized templates (SMART, rubrics, assessment) to scale production and quality.",
          "Outputs: accessible PPT (Core Curriculum – External Comms), landing with HTML video, Content Library, Course Creator Resources checklist.",
          "Key projects: Organizer Lab, Wayuu Learning Circles, RFC Gender, Board Candidate Pre-Onboarding 2024, Africa Growth Pilot/Core Curriculum."
        ]
      },
      {
        company: "CRS - ASA Virtual (Canvas LMS)",
        role_es: "Diseño e-learning multimedia · 2022–2023",
        role_en: "E-learning multimedia design · 2022–2023",
        period: "2022–2023",
        highlights_es: [
          "Traducción de contenidos técnicos a módulos accesibles (baja alfabetización) con storytelling y visuales.",
          "Validación con especialistas para exactitud técnica y usabilidad en baja conectividad."
        ],
        highlights_en: [
          "Translation of technical content into accessible modules (low literacy) with storytelling and visuals.",
          "Validation with specialists for technical accuracy and usability in low connectivity."
        ]
      },
      {
        company: "Universidad Centroamericana (UCA)",
        role_es: "Docente · 2018–2021",
        role_en: "Faculty · 2018–2021",
        period: "2018–2021",
        highlights_es: [
          "Redacción de syllabus con rúbricas y criterios.",
          "Curso gamificado \"Aspirante a Crononauta\"; cohortes ~50 estudiantes."
        ],
        highlights_en: [
          "Syllabus writing with rubrics and criteria.",
          "Gamified course \"Aspirante a Crononauta\"; cohorts ~50 students."
        ]
      }
    ],
    education_es: [
      "M.A. Filosofía Latinoamericana",
      "B.A. Comunicación Social",
      "M.A. Diseño Gráfico y Publicaciones Digitales"
    ],
    education_en: [
      "M.A. Latin American Philosophy",
      "B.A. Social Communication",
      "M.A. Graphic Design and Digital Publications"
    ],
    certifications: [
      "R (Statistics)",
      "Wikipedia Training",
      "Gamification",
      "GIS"
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "English", level: "Advanced" }
    ],
    keywords_es: "Instructional Design, LXD, Curriculum, Assessment, Certification, Accessibility, Inclusive Design, QA, Templates, Toolkits, Analytics, KPIs, edX, Canvas, Moodle, SCORM/xAPI, Design Thinking, Remote Facilitation, Badges, Storytelling",
    keywords_en: "Instructional Design, LXD, Curriculum, Assessment, Certification, Accessibility, Inclusive Design, QA, Templates, Toolkits, Analytics, KPIs, edX, Canvas, Moodle, SCORM/xAPI, Design Thinking, Remote Facilitation, Badges, Storytelling",
    pdfPath: "/assets/cv/AnamariaEspinoza_CV_LXD-Lead.pdf"
  },
  multimedia: {
    name: "Anamaría Espinoza",
    title_es: "Multimedia Learning Designer / Interactive Learning Content Specialist",
    title_en: "Multimedia Learning Designer / Interactive Learning Content Specialist",
    location: "Zaragoza, ES",
    email: "aespinoza@narrlab.studio",
    social: "LinkedIn · Behance · Wikimedia Commons",
    profile_es: "Diseñadora instruccional y multimedia con +10 años creando recursos visuales e interactivos que convierten contenido complejo en experiencias claras y memorables. Produzco materiales que combinan narrativa, diseño y tecnología (video, gráficos, HTML) con enfoque en accesibilidad y públicos diversos. Me muevo cómoda entre estrategia de aprendizaje y producción: de la idea al recurso listo para usar.",
    profile_en: "Instructional and multimedia designer with +10 years creating visual and interactive resources that turn complex content into clear and memorable experiences. I produce materials that combine narrative, design and technology (video, graphics, HTML) with a focus on accessibility and diverse audiences. I move comfortably between learning strategy and production: from idea to ready-to-use resource.",
    skills: [
      "Multimedia Learning Design", "Digital Storytelling",
      "Producción audiovisual (guiones, video, gráficos)", "Visual Systems",
      "HTML/CSS interactivo", "Accessibility", "Gamification",
      "Instructional Design", "Templates/Toolkits", "Design Thinking"
    ],
    tools: [
      "Adobe CC (Ps, Ai, Pr, Ae)", "HTML/CSS", "edX", "Canvas",
      "Moodle", "WordPress", "Google Workspace"
    ],
    experience: [
      {
        company: "Wikimedia Foundation - Community Development (WikiLearn)",
        role_es: "Instructional Design Lead (contract) · 2024–presente",
        role_en: "Instructional Design Lead (contract) · 2024–present",
        period: "2024–presente",
        highlights_es: [
          "Outputs: PPT accesible (Core Curriculum – External Comms), landing con video HTML, Content Library, checklist de Course Creator Resources.",
          "Plantillas estandarizadas (SMART, rúbricas, evaluación) para escalar producción y calidad.",
          "Proyectos clave: Organizer Lab, Wayuu Learning Circles, RFC Gender, Board Candidate Pre-Onboarding 2024, Africa Growth Pilot/Core Curriculum."
        ],
        highlights_en: [
          "Outputs: accessible PPT (Core Curriculum – External Comms), landing with HTML video, Content Library, Course Creator Resources checklist.",
          "Standardized templates (SMART, rubrics, assessment) to scale production and quality.",
          "Key projects: Organizer Lab, Wayuu Learning Circles, RFC Gender, Board Candidate Pre-Onboarding 2024, Africa Growth Pilot/Core Curriculum."
        ]
      },
      {
        company: "CRS - ASA Virtual (Canvas LMS)",
        role_es: "Diseño e-learning multimedia · 2022–2023",
        role_en: "E-learning multimedia design · 2022–2023",
        period: "2022–2023",
        highlights_es: [
          "Traducción de contenidos técnicos a módulos accesibles (baja alfabetización) con storytelling y visuales.",
          "Producción audiovisual (guiones, video, gráficos) y guías; reducción de capacitación presencial.",
          "Validación con especialistas para exactitud técnica y usabilidad en baja conectividad."
        ],
        highlights_en: [
          "Translation of technical content into accessible modules (low literacy) with storytelling and visuals.",
          "Audiovisual production (scripts, video, graphics) and guides; reduction of in-person training.",
          "Validation with specialists for technical accuracy and usability in low connectivity."
        ]
      },
      {
        company: "Universidad Centroamericana (UCA)",
        role_es: "Docente (Humanidades Digitales, Diseño y Diagramación, Producción Multimedia) · 2018–2021",
        role_en: "Faculty (Digital Humanities, Design and Layout, Multimedia Production) · 2018–2021",
        period: "2018–2021",
        highlights_es: [
          "Curso gamificado \"Aspirante a Crononauta\"; cohortes ~50 estudiantes.",
          "Actualización de malla curricular (competencias y resultados)."
        ],
        highlights_en: [
          "Gamified course \"Aspirante a Crononauta\"; cohorts ~50 students.",
          "Curriculum update (competencies and outcomes)."
        ]
      }
    ],
    education_es: [
      "M.A. Diseño Gráfico y Publicaciones Digitales",
      "B.A. Comunicación Social",
      "M.A. Filosofía Latinoamericana"
    ],
    education_en: [
      "M.A. Graphic Design and Digital Publications",
      "B.A. Social Communication",
      "M.A. Latin American Philosophy"
    ],
    certifications: [
      "Gamification",
      "Wikipedia Training",
      "GIS",
      "R (Statistics)"
    ],
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "English", level: "Advanced" }
    ],
    keywords_es: "Multimedia Learning, Digital Storytelling, Adobe Creative Cloud, Premiere, After Effects, Interactive Content, HTML/CSS, Visual Systems, Accessibility, Gamification, edX, Canvas, Moodle, WordPress, Storytelling",
    keywords_en: "Multimedia Learning, Digital Storytelling, Adobe Creative Cloud, Premiere, After Effects, Interactive Content, HTML/CSS, Visual Systems, Accessibility, Gamification, edX, Canvas, Moodle, WordPress, Storytelling",
    pdfPath: "/assets/cv/AnamariaEspinoza_CV_Multimedia.pdf"
  }
};

export function CVByFocus() {
  const { language } = useI18n();
  const { mode } = useBrand();
  const [activeTab, setActiveTab] = useState<CVFocusVersion>('base');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<CVFocusVersion>('base');

  const currentCV = cvFocusData[activeTab];
  const modalCV = cvFocusData[modalContent];

  const handleView = (version: CVFocusVersion) => {
    setModalContent(version);
    setIsModalOpen(true);
  };

  const handleDownload = (version: CVFocusVersion) => {
    const link = document.createElement('a');
    link.href = cvFocusData[version].pdfPath;
    link.download = `AnamariaEspinoza_CV_${version}.pdf`;
    link.click();
  };

  const handlePrint = (version: CVFocusVersion) => {
    setModalContent(version);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const tabLabels = {
    base: 'Base',
    lxd: 'LXD',
    multimedia: 'Multimedia'
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 print:hidden" style={{ backgroundColor: mode === 'personal' ? '#FEFDFB' : '#F2EADF' }}>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h2 className="mb-3">
              {language === 'es' ? 'CV por enfoque' : 'CV by focus'}
            </h2>
            <p 
              className="text-lg" 
              style={{ 
                color: mode === 'personal' ? 'rgba(30, 25, 64, 0.7)' : 'rgba(18, 17, 38, 0.7)',
                lineHeight: 1.6
              }}
            >
              {language === 'es' 
                ? 'Elige el lente que mejor encaje con lo que estás buscando.' 
                : "Choose the lens that best fits what you're looking for."}
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div 
              role="tablist" 
              aria-label="CV versions"
              className="flex gap-2 border-b overflow-x-auto"
              style={{ borderColor: mode === 'personal' ? 'rgba(132, 102, 242, 0.15)' : 'rgba(217, 80, 50, 0.15)' }}
            >
              {(['base', 'lxd', 'multimedia'] as CVFocusVersion[]).map((version) => (
                <button
                  key={version}
                  role="tab"
                  aria-selected={activeTab === version}
                  aria-controls={`panel-${version}`}
                  onClick={() => {
                    setActiveTab(version);
                    setIsExpanded(false);
                  }}
                  className="px-6 py-3 font-medium text-sm transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    color: activeTab === version 
                      ? (mode === 'personal' ? '#5B44F2' : '#D95032')
                      : 'rgba(30, 25, 64, 0.5)',
                    borderBottom: activeTab === version 
                      ? `2px solid ${mode === 'personal' ? '#5B44F2' : '#D95032'}`
                      : '2px solid transparent',
                    marginBottom: '-1px'
                  }}
                >
                  {tabLabels[version]}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Panel */}
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="rounded-2xl p-6 md:p-8 shadow-sm border"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: mode === 'personal' ? 'rgba(132, 102, 242, 0.1)' : 'rgba(217, 80, 50, 0.1)'
            }}
          >
            {/* CV Preview - Collapsed */}
            {!isExpanded && (
              <div className="space-y-4">
                <h3 className="mb-0 text-xl font-bold" style={{ lineHeight: 1.3 }}>
                  {language === 'es' ? currentCV.title_es : currentCV.title_en}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                  {language === 'es' ? currentCV.profile_es : currentCV.profile_en}
                </p>
                
                {/* Expand button */}
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-sm font-medium inline-flex items-center gap-1 transition-colors"
                  style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}
                >
                  {language === 'es' ? 'Ver CV completo' : 'View full CV'}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* CV Full - Expanded */}
            {isExpanded && (
              <div className="space-y-6">
                {/* Collapse button */}
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-sm font-medium inline-flex items-center gap-1 transition-colors mb-4"
                  style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}
                >
                  {language === 'es' ? 'Contraer' : 'Collapse'}
                  <ChevronUp className="h-4 w-4" />
                </button>

                {/* Title */}
                <div>
                  <h3 className="mb-1 text-xl font-bold" style={{ lineHeight: 1.3 }}>
                    {language === 'es' ? currentCV.title_es : currentCV.title_en}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>
                    {currentCV.location} · {currentCV.email}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(30, 25, 64, 0.5)' }}>
                    {currentCV.social}
                  </p>
                </div>

                <Separator />

                {/* Profile */}
                <div>
                  <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                    {language === 'es' ? 'Perfil' : 'Profile'}
                  </h4>
                  <p className="text-base leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.85)' }}>
                    {language === 'es' ? currentCV.profile_es : currentCV.profile_en}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                    {language === 'es' ? 'Competencias' : 'Skills'}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                    {currentCV.skills.join(' · ')}
                  </p>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                    {language === 'es' ? 'Herramientas' : 'Tools'}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                    {currentCV.tools.join(' · ')}
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="mb-3 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                    {language === 'es' ? 'Experiencia' : 'Experience'}
                  </h4>
                  <div className="space-y-4">
                    {currentCV.experience.map((exp, index) => (
                      <div key={index}>
                        <h5 className="font-bold mb-1" style={{ lineHeight: 1.3 }}>{exp.company}</h5>
                        <p className="text-sm mb-2" style={{ color: 'rgba(30, 25, 64, 0.7)' }}>
                          {language === 'es' ? exp.role_es : exp.role_en}
                        </p>
                        <ul className="text-sm space-y-1 ml-4" style={{ color: 'rgba(30, 25, 64, 0.65)' }}>
                          {(language === 'es' ? exp.highlights_es : exp.highlights_en).map((highlight, i) => (
                            <li key={i} className="leading-relaxed">• {highlight}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                    {language === 'es' ? 'Educación' : 'Education'}
                  </h4>
                  <ul className="text-sm space-y-1 ml-4" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                    {(language === 'es' ? currentCV.education_es : currentCV.education_en).map((edu, i) => (
                      <li key={i}>• {edu}</li>
                    ))}
                  </ul>
                </div>

                {/* Certifications */}
                <div>
                  <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                    {language === 'es' ? 'Certificaciones' : 'Certifications'}
                  </h4>
                  <p className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                    {currentCV.certifications.join(' · ')}
                  </p>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                    {language === 'es' ? 'Idiomas' : 'Languages'}
                  </h4>
                  <p className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                    {currentCV.languages.map(lang => `${lang.name} (${lang.level})`).join(' · ')}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t" style={{ borderColor: mode === 'personal' ? 'rgba(132, 102, 242, 0.1)' : 'rgba(217, 80, 50, 0.1)' }}>
              <Button
                onClick={() => handleView(activeTab)}
                size="lg"
                style={{
                  backgroundColor: mode === 'personal' ? '#5B44F2' : '#D95032',
                  color: '#FFFFFF'
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                {language === 'es' ? 'Ver' : 'View'}
              </Button>
              <Button
                onClick={() => handleDownload(activeTab)}
                variant="outline"
                size="lg"
                className="hover:border-[#2B7A9D] hover:text-[#2B7A9D] hover:bg-[#2B7A9D]/5"
              >
                <Download className="h-4 w-4 mr-2" />
                {language === 'es' ? 'Descargar PDF' : 'Download PDF'}
              </Button>
              <Button
                onClick={() => handlePrint(activeTab)}
                variant="outline"
                size="lg"
                className="hover:border-[#2B7A9D] hover:text-[#2B7A9D] hover:bg-[#2B7A9D]/5"
              >
                <Printer className="h-4 w-4 mr-2" />
                {language === 'es' ? 'Imprimir' : 'Print'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8 px-4 print:hidden"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white border-b rounded-t-2xl px-6 py-4 flex items-center justify-between">
              <h3 className="mb-0 text-lg font-bold">
                {language === 'es' ? modalCV.title_es : modalCV.title_en}
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleDownload(modalContent)}
                  variant="outline"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button
                  onClick={() => handlePrint(modalContent)}
                  variant="outline"
                  size="sm"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  {language === 'es' ? 'Imprimir' : 'Print'}
                </Button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6" id="cv-modal-content">
              {/* Header */}
              <div className="text-center pb-4 border-b">
                <h2 className="mb-1 text-2xl font-bold">{modalCV.name}</h2>
                <p className="text-lg mb-2" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? modalCV.title_es : modalCV.title_en}
                </p>
                <p className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>
                  {modalCV.location} · {modalCV.email}
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgba(30, 25, 64, 0.5)' }}>
                  {modalCV.social}
                </p>
              </div>

              {/* Profile */}
              <div>
                <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? 'Perfil Profesional' : 'Professional Profile'}
                </h4>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.85)' }}>
                  {language === 'es' ? modalCV.profile_es : modalCV.profile_en}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? 'Competencias Clave' : 'Core Competencies'}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                  {modalCV.skills.join(' · ')}
                </p>
              </div>

              {/* Tools */}
              <div>
                <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? 'Herramientas' : 'Tools & Technologies'}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                  {modalCV.tools.join(' · ')}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h4 className="mb-3 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? 'Experiencia Profesional' : 'Professional Experience'}
                </h4>
                <div className="space-y-5">
                  {modalCV.experience.map((exp, index) => (
                    <div key={index}>
                      <h5 className="font-bold text-base mb-1" style={{ lineHeight: 1.3 }}>{exp.company}</h5>
                      <p className="text-sm mb-2 font-medium" style={{ color: 'rgba(30, 25, 64, 0.7)' }}>
                        {language === 'es' ? exp.role_es : exp.role_en}
                      </p>
                      <ul className="text-sm space-y-1.5 ml-4" style={{ color: 'rgba(30, 25, 64, 0.7)' }}>
                        {(language === 'es' ? exp.highlights_es : exp.highlights_en).map((highlight, i) => (
                          <li key={i} className="leading-relaxed">• {highlight}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? 'Educación' : 'Education'}
                </h4>
                <ul className="text-sm space-y-1 ml-4" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                  {(language === 'es' ? modalCV.education_es : modalCV.education_en).map((edu, i) => (
                    <li key={i}>• {edu}</li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? 'Certificaciones' : 'Certifications'}
                </h4>
                <p className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                  {modalCV.certifications.join(' · ')}
                </p>
              </div>

              {/* Languages */}
              <div>
                <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? 'Idiomas' : 'Languages'}
                </h4>
                <p className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                  {modalCV.languages.map(lang => `${lang.name} (${lang.level})`).join(' · ')}
                </p>
              </div>

              {/* Keywords */}
              <div>
                <h4 className="mb-2 text-sm uppercase tracking-wider font-bold" style={{ color: mode === 'personal' ? '#5B44F2' : '#D95032' }}>
                  {language === 'es' ? 'Palabras clave' : 'Keywords'}
                </h4>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>
                  {language === 'es' ? modalCV.keywords_es : modalCV.keywords_en}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            margin: 2cm;
            size: A4;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          /* Hide everything except modal content when printing */
          body > * {
            display: none !important;
          }
          
          #cv-modal-content {
            display: block !important;
          }
          
          #cv-modal-content * {
            display: revert !important;
          }
          
          /* Print-friendly styles */
          #cv-modal-content {
            background: white !important;
            color: black !important;
            padding: 0 !important;
          }
          
          #cv-modal-content h2,
          #cv-modal-content h3,
          #cv-modal-content h4,
          #cv-modal-content h5 {
            color: black !important;
            page-break-after: avoid;
          }
          
          #cv-modal-content p,
          #cv-modal-content li {
            color: black !important;
          }
          
          #cv-modal-content .border-b,
          #cv-modal-content .border-t {
            border-color: #000 !important;
          }
          
          /* Avoid breaking inside sections */
          #cv-modal-content > div {
            page-break-inside: avoid;
          }
          
          /* Remove backgrounds and shadows */
          #cv-modal-content * {
            background: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </>
  );
}