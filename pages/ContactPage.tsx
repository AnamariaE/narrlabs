import React, { useState } from 'react';
import { Mail, Linkedin, ExternalLink, Send, CheckCircle2, FileText, RotateCcw, Download, X, Copy, Check } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import siteData from '../data/site-data';
import { motion, AnimatePresence } from 'motion/react';

export function ContactPage() {
  const { language, t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Brief Builder states
  const [filledSections, setFilledSections] = useState<Set<number>>(new Set());
  const [briefAnswers, setBriefAnswers] = useState<{ [key: number]: string[] }>({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);

  const briefSections = [
    {
      id: 0,
      title: language === 'es' ? 'Contexto' : 'Context',
      fields: [
        {
          placeholder: language === 'es' 
            ? 'Ej: un curso online, una campaña interna, un rediseño de onboarding... cuéntanos cómo ves tu proyecto' 
            : 'E.g.: an online course, an internal campaign, an onboarding redesign... tell us how you see your project'
        }
      ]
    },
    {
      id: 1,
      title: language === 'es' ? 'Audiencia' : 'Audience',
      fields: [
        {
          placeholder: language === 'es' 
            ? '¿Quién lo usará y en qué contexto?' 
            : 'Who is it for, and in what context?'
        }
      ]
    },
    {
      id: 2,
      title: language === 'es' ? 'Necesidad' : 'Need',
      fields: [
        {
          placeholder: language === 'es' 
            ? '¿Qué problema real querés resolver?' 
            : 'What real problem are we solving?'
        }
      ]
    },
    {
      id: 3,
      title: language === 'es' ? 'Resultado' : 'Outcome',
      fields: [
        {
          placeholder: language === 'es' 
            ? 'Al final, ¿qué deberían poder hacer distinto?' 
            : 'At the end, what should people be able to do differently?'
        }
      ]
    },
    {
      id: 4,
      title: language === 'es' ? 'Entregables' : 'Deliverables',
      fields: [
        {
          placeholder: language === 'es' 
            ? '¿Qué necesitas que exista? (curso, toolkit, video, HTML, línea gráfica…)' 
            : 'What needs to exist? (course, toolkit, video, HTML, brand system…)'
        }
      ]
    },
    {
      id: 5,
      title: language === 'es' ? 'Restricciones' : 'Constraints',
      fields: [
        {
          placeholder: language === 'es' 
            ? 'Herramientas/LMS, plazos, requisitos de accesibilidad, tono de marca.' 
            : 'Tools/LMS, timelines, accessibility requirements, brand tone.'
        }
      ]
    },
    {
      id: 6,
      title: language === 'es' ? 'Éxito' : 'Success',
      fields: [
        {
          placeholder: language === 'es' 
            ? '¿Cómo sabremos que funcionó? (métricas o señales claras)' 
            : 'How will we know it worked? (metrics or clear signals)'
        }
      ]
    }
  ];

  const handleFieldChange = (sectionId: number, fieldIndex: number, value: string) => {
    setBriefAnswers(prev => {
      const sectionAnswers = prev[sectionId] || Array(briefSections[sectionId].fields.length).fill('');
      const updated = [...sectionAnswers];
      updated[fieldIndex] = value;
      return { ...prev, [sectionId]: updated };
    });
  };

  const addToBrief = (id: number) => {
    const answers = briefAnswers[id] || [];
    const hasContent = answers.some(answer => answer && answer.trim().length > 0);
    if (hasContent) {
      setFilledSections(new Set([...filledSections, id]));
    }
  };

  const removeFromBrief = (id: number) => {
    const updated = new Set(filledSections);
    updated.delete(id);
    setFilledSections(updated);
  };

  const resetBrief = () => {
    setFilledSections(new Set());
    setBriefAnswers({});
  };

  const generateNarrativeBrief = () => {
    const getAnswers = (id: number) => {
      const answers = briefAnswers[id] || [];
      return answers.filter(a => a && a.trim()).join(' ');
    };

    const contexto = getAnswers(0);
    const audiencia = getAnswers(1);
    const necesidad = getAnswers(2) || '[NECESIDAD]';
    const resultado = getAnswers(3) || '[RESULTADO]';
    const entregables = getAnswers(4) || '[ENTREGABLES]';
    const restricciones = getAnswers(5) || '[RESTRICCIONES]';
    const exito = getAnswers(6) || '[ÉXITO]';

    if (language === 'es') {
      let firstPart = 'Estamos trabajando en ';
      if (contexto) {
        firstPart += contexto;
        if (audiencia) {
          firstPart += ', dirigido a ' + audiencia;
        }
        firstPart += '.';
      } else if (audiencia) {
        firstPart = 'Este proyecto va dirigido a ' + audiencia + '.';
      } else {
        firstPart += '[CONTEXTO], dirigido a [AUDIENCIA].';
      }

      return `${firstPart} Ahora mismo el reto principal es ${necesidad}, y lo que buscamos lograr es que, al finalizar, las personas puedan ${resultado}.\n\nPara llegar ahí, necesitamos crear ${entregables}, tomando en cuenta ${restricciones}. Sabremos que funcionó si ${exito}.`;
    } else {
      let firstPart = 'We\'re working on ';
      if (contexto) {
        firstPart += contexto;
        if (audiencia) {
          firstPart += ', for ' + audiencia;
        }
        firstPart += '.';
      } else if (audiencia) {
        firstPart = 'This project is for ' + audiencia + '.';
      } else {
        firstPart += '[CONTEXT], for [AUDIENCE].';
      }

      return `${firstPart} Right now, the main challenge is ${necesidad}, and our goal is that by the end, people can ${resultado}.\n\nTo get there, we need to create ${entregables}, while considering ${restricciones}. We'll know it worked if ${exito}.`;
    }
  };

  const copyToClipboard = async () => {
    const text = generateNarrativeBrief();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const progress = (filledSections.size / briefSections.length) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    // In a real app, this would send to Formspree or Netlify Forms
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Pre-Brief Builder Section */}
      <section 
        id="pre-brief-builder"
        className="py-20 px-4 sm:px-6 lg:px-8 relative mx-[0px] my-[-58px]"
        style={{
          backgroundImage: 'url(https://narrlab.studio/img/sepia-plasterboard-texture.jpg)',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundSize: '400px 400px'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 font-bold text-[24px] text-[#21374d]">
            {language === 'es' 
              ? '¿Te gustó lo que viste y te gustaría que trabajemos juntos?' 
              : 'Did you like what you saw and would you like to work together?'}
          </h2>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto text-[16px]">
            {language === 'es'
              ? 'Para entenderte mejor (y responderte mejor), armemos un pre-brief en 3 minutos.'
              : 'To understand you better (and respond better), let\'s create a pre-brief in 3 minutes.'}
          </p>
          <p className="text-muted-foreground mb-1 max-w-2xl mx-auto text-[14px]">
            {language === 'es'
              ? 'Escribe lo esencial y el editor lo va organizando en la parte inferior.'
              : 'Write the essentials and the editor organizes it at the bottom.'}
          </p>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-[15px]">
            {language === 'es'
              ? 'Al final tendrás un brief claro, listo para copiar y compartir.'
              : 'At the end you\'ll have a clear brief, ready to copy and share.'}
          </p>
          
          {/* Brief Builder Section - Horizontal Tabs */}
          <div className="max-w-6xl mx-auto mb-12">
            {/* Tabs Header - Desktop */}
            <div className="hidden md:block mb-8">
              <div className="flex border-b border-border">
                {briefSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentStep(section.id)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all relative ${
                      currentStep === section.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-border'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {filledSections.has(section.id) && (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      )}
                      <span>{section.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs Header - Mobile Scroll */}
            <div className="md:hidden mb-6">
              <div className="flex overflow-x-auto border-b border-border no-scrollbar">
                {briefSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentStep(section.id)}
                    className={`flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                      currentStep === section.id
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {filledSections.has(section.id) && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      <span>{section.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                <div className="space-y-4 mb-6">
                  {briefSections[currentStep].fields.map((field, fieldIndex) => (
                    <div key={fieldIndex}>
                      <label className="block text-sm font-medium mb-2 text-left">
                        {briefSections[currentStep].title}
                      </label>
                      <textarea
                        className="w-full bg-background border border-border rounded-lg p-4 resize-none min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary/30 text-left"
                        placeholder={field.placeholder}
                        value={briefAnswers[currentStep]?.[fieldIndex] || ''}
                        onChange={(e) => handleFieldChange(currentStep, fieldIndex, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-muted-foreground">
                    {language === 'es' ? 'Paso' : 'Step'} {currentStep + 1} {language === 'es' ? 'de' : 'of'} {briefSections.length}
                  </div>

                  <div className="flex gap-2">
                    {!filledSections.has(currentStep) ? (
                      <Button
                        onClick={() => {
                          addToBrief(currentStep);
                          if (currentStep < briefSections.length - 1) {
                            setCurrentStep(currentStep + 1);
                          }
                        }}
                        disabled={!briefAnswers[currentStep]?.[0]?.trim()}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        {language === 'es' ? 'Guardar y continuar' : 'Save and continue'}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => removeFromBrief(currentStep)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        {language === 'es' ? 'Quitar' : 'Remove'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>{language === 'es' ? 'Progreso' : 'Progress'}</span>
                <span>{filledSections.size}/{briefSections.length} {language === 'es' ? 'completado' : 'completed'}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Brief Preview - Below Builder - OUTSIDE max-w-4xl */}
        <div className="max-w-6xl mx-auto px-4">
          {filledSections.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="border border-[#d4c4b0] rounded-xl p-6 md:p-8 shadow-lg mb-12"
              style={{
                backgroundImage: 'url(https://narrlab.studio/img/whitish-grain-wall-template.jpg)',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'top left',
                backgroundSize: '300px 300px'
              }}
            >
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">
                  {language === 'es' ? 'Vista del brief' : 'Brief preview'}
                </h3>
              </div>

              {/* Brief Content */}
              <div className="space-y-4 text-left text-sm">
                {/* Acto 1 - Contexto y Audiencia */}
                {(filledSections.has(0) || filledSections.has(1)) && (
                  <div>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem', lineHeight: '1.6' }}
                    >
                      {(() => {
                        const contextoAnswers = briefAnswers[0] || [];
                        const audienciaAnswers = briefAnswers[1] || [];
                        const hasContexto = filledSections.has(0) && contextoAnswers.some(a => a && a.trim());
                        const hasAudiencia = filledSections.has(1) && audienciaAnswers.some(a => a && a.trim());
                        
                        const contexto = hasContexto ? contextoAnswers.filter(a => a && a.trim())[0] : '';
                        const audiencia = hasAudiencia ? audienciaAnswers.filter(a => a && a.trim())[0] : '';
                        
                        if (language === 'es') {
                          if (hasContexto && hasAudiencia) {
                            return `Estamos trabajando en ${contexto}, dirigido a ${audiencia}.`;
                          } else if (hasContexto) {
                            return `Estamos trabajando en ${contexto}.`;
                          } else if (hasAudiencia) {
                            return `Este proyecto va dirigido a ${audiencia}.`;
                          }
                        } else {
                          if (hasContexto && hasAudiencia) {
                            return `We're working on ${contexto}, for ${audiencia}.`;
                          } else if (hasContexto) {
                            return `We're working on ${contexto}.`;
                          } else if (hasAudiencia) {
                            return `This project is for ${audiencia}.`;
                          }
                        }
                      })()}
                    </p>
                  </div>
                )}

                {/* Acto 2 - Necesidad */}
                {filledSections.has(2) && (
                  <div>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem', lineHeight: '1.6' }}
                    >
                      {language === 'es' ? 'Ahora mismo el reto principal es: ' : 'Right now, the main challenge is: '}
                      <span className="text-foreground">{briefAnswers[2]?.filter(a => a && a.trim())[0]}</span>
                    </p>
                  </div>
                )}

                {/* Acto 3 - Resultado */}
                {filledSections.has(3) && (
                  <div>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem', lineHeight: '1.6' }}
                    >
                      {language === 'es' ? 'Al finalizar, las personas podrán: ' : 'By the end, people will be able to: '}
                      <span className="text-foreground">{briefAnswers[3]?.filter(a => a && a.trim())[0]}</span>
                    </p>
                  </div>
                )}

                {/* Acto 4 - Entregables y Restricciones */}
                {(filledSections.has(4) || filledSections.has(5)) && (
                  <div>
                    <div className="space-y-2">
                      {filledSections.has(4) && (
                        <p 
                          className="text-muted-foreground leading-relaxed"
                          style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem', lineHeight: '1.6' }}
                        >
                          {language === 'es' ? 'Necesitamos crear: ' : 'We need to create: '}
                          <span className="text-foreground">{briefAnswers[4]?.filter(a => a && a.trim())[0]}</span>
                        </p>
                      )}
                      {filledSections.has(5) && (
                        <p 
                          className="text-muted-foreground leading-relaxed"
                          style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem', lineHeight: '1.6' }}
                        >
                          {language === 'es' ? 'Teniendo en cuenta: ' : 'Considering: '}
                          <span className="text-foreground">{briefAnswers[5]?.filter(a => a && a.trim())[0]}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Acto 5 - Éxito */}
                {filledSections.has(6) && (
                  <div>
                    <p 
                      className="text-muted-foreground leading-relaxed"
                      style={{ fontFamily: "'Caveat', cursive", fontSize: '1.15rem', lineHeight: '1.6' }}
                    >
                      {language === 'es' ? 'Sabremos que funcionó si: ' : 'We\'ll know it worked if: '}
                      <span className="text-foreground">{briefAnswers[6]?.filter(a => a && a.trim())[0]}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Preview Actions */}
              <div className="mt-6 pt-4 border-t border-border flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetBrief}
                  className="flex-1"
                  disabled={filledSections.size === 0}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  disabled={filledSections.size < briefSections.length}
                  onClick={() => setShowExportModal(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {language === 'es' ? 'Exportar' : 'Export'}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Export Modal - Brief listo para copiar */}
        <AnimatePresence>
          {showExportModal && (
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExportModal(false)}
            >
              <motion.div
                className="bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-auto"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      {language === 'es' ? 'Brief listo para copiar' : 'Brief ready to copy'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="prose prose-sm max-w-none mb-6">
                    <p className="text-base leading-relaxed mb-4">
                      {(() => {
                        const contexto = briefAnswers[0]?.filter(a => a && a.trim()).join(' ');
                        const audiencia = briefAnswers[1]?.filter(a => a && a.trim()).join(' ');
                        const necesidad = briefAnswers[2]?.filter(a => a && a.trim()).join(' ') || '[NECESIDAD]';
                        const resultado = briefAnswers[3]?.filter(a => a && a.trim()).join(' ') || '[RESULTADO]';
                        
                        if (language === 'es') {
                          let firstPart = 'Estamos trabajando en ';
                          if (contexto) {
                            firstPart = <><strong>{contexto}</strong></>;
                            if (audiencia) {
                              return <>Estamos trabajando en {firstPart}, dirigido a <strong>{audiencia}</strong>. Ahora mismo el reto principal es <strong>{necesidad}</strong>, y lo que buscamos lograr es que, al finalizar, las personas puedan <strong>{resultado}</strong>.</>;
                            } else {
                              return <>Estamos trabajando en {firstPart}. Ahora mismo el reto principal es <strong>{necesidad}</strong>, y lo que buscamos lograr es que, al finalizar, las personas puedan <strong>{resultado}</strong>.</>;
                            }
                          } else if (audiencia) {
                            return <>Este proyecto va dirigido a <strong>{audiencia}</strong>. Ahora mismo el reto principal es <strong>{necesidad}</strong>, y lo que buscamos lograr es que, al finalizar, las personas puedan <strong>{resultado}</strong>.</>;
                          } else {
                            return <>Estamos trabajando en <strong>[CONTEXTO]</strong>, dirigido a <strong>[AUDIENCIA]</strong>. Ahora mismo el reto principal es <strong>{necesidad}</strong>, y lo que buscamos lograr es que, al finalizar, las personas puedan <strong>{resultado}</strong>.</>;
                          }
                        } else {
                          let firstPart = 'We\'re working on ';
                          if (contexto) {
                            firstPart = <><strong>{contexto}</strong></>;
                            if (audiencia) {
                              return <>We're working on {firstPart}, for <strong>{audiencia}</strong>. Right now, the main challenge is <strong>{necesidad}</strong>, and our goal is that by the end, people can <strong>{resultado}</strong>.</>;
                            } else {
                              return <>We're working on {firstPart}. Right now, the main challenge is <strong>{necesidad}</strong>, and our goal is that by the end, people can <strong>{resultado}</strong>.</>;
                            }
                          } else if (audiencia) {
                            return <>This project is for <strong>{audiencia}</strong>. Right now, the main challenge is <strong>{necesidad}</strong>, and our goal is that by the end, people can <strong>{resultado}</strong>.</>;
                          } else {
                            return <>We're working on <strong>[CONTEXT]</strong>, for <strong>[AUDIENCE]</strong>. Right now, the main challenge is <strong>{necesidad}</strong>, and our goal is that by the end, people can <strong>{resultado}</strong>.</>;
                          }
                        }
                      })()}
                    </p>
                    
                    <p className="text-base leading-relaxed">
                      {language === 'es' ? (
                        <>
                          Para llegar ahí, necesitamos crear{' '}
                          <strong>{briefAnswers[4]?.filter(a => a && a.trim()).join(' ') || '[ENTREGABLES]'}</strong>, 
                          tomando en cuenta{' '}
                          <strong>{briefAnswers[5]?.filter(a => a && a.trim()).join(' ') || '[RESTRICCIONES]'}</strong>. 
                          Sabremos que funcionó si{' '}
                          <strong>{briefAnswers[6]?.filter(a => a && a.trim()).join(' ') || '[ÉXITO]'}</strong>.
                        </>
                      ) : (
                        <>
                          To get there, we need to create{' '}
                          <strong>{briefAnswers[4]?.filter(a => a && a.trim()).join(' ') || '[DELIVERABLES]'}</strong>, 
                          while considering{' '}
                          <strong>{briefAnswers[5]?.filter(a => a && a.trim()).join(' ') || '[CONSTRAINTS]'}</strong>. 
                          We'll know it worked if{' '}
                          <strong>{briefAnswers[6]?.filter(a => a && a.trim()).join(' ') || '[SUCCESS]'}</strong>.
                        </>
                      )}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={copyToClipboard}
                      className="flex-1"
                      disabled={copied}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          {language === 'es' ? '¡Copiado!' : 'Copied!'}
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          {language === 'es' ? 'Copiar brief' : 'Copy brief'}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowExportModal(false)}
                    >
                      {language === 'es' ? 'Cerrar' : 'Close'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Form Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto px-[0px] py-[15px]">
          <div className="text-center mb-12">
            <h1 className="mb-4 text-left font-bold text-[32px] text-[#21374d]">{t('contact.title')}</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t('contact.name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">{t('contact.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">{t('contact.message')}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    t('contact.sending')
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t('contact.send')}
                    </>
                  )}
                </Button>

                {status === 'success' && (
                  <p className="text-sm text-center text-green-600">
                    {t('contact.success')}
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-sm text-center text-destructive">
                    {t('contact.error')}
                  </p>
                )}
              </form>

              {/* LinkedIn Link */}
              {siteData.social.linkedin && (
                <a
                  href={siteData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group mt-6"
                >
                  <div className="p-2 bg-background rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <p className="font-medium">Connect on LinkedIn</p>
                  </div>
                </a>
              )}
            </div>

            {/* Services & Contact Info */}
            <div>
              <p className="text-muted-foreground max-w-2xl mx-auto mx-[-3px] my-[0px] text-left mb-8 text-[16px]">
                {language === 'es'
                  ? 'Me encantaría conocer más sobre tu proyecto. Completa el formulario o contáctame directamente.'
                  : "I'd love to learn more about your project. Fill out the form or contact me directly."}
              </p>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 mb-8">
                <h4 className="mb-3">
                  {language === 'es' ? '¿Qué puedo hacer por ti?' : 'What can I do for you?'}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      {language === 'es'
                        ? 'Diseño instruccional y arquitectura de cursos'
                        : 'Instructional design & course architecture'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      {language === 'es'
                        ? 'Experiencias de aprendizaje (LXD)'
                        : 'Learning experience design (LXD)'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      {language === 'es'
                        ? 'Producción multimedia (video, audio, motion)'
                        : 'Multimedia production (video, audio, motion)'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      {language === 'es'
                        ? 'Plantillas, toolkits y recursos educativos'
                        : 'Templates, toolkits & educational resources'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      {language === 'es'
                        ? 'Programas de comunidad y facilitación'
                        : 'Community programs & facilitation'}
                    </span>
                  </li>
                </ul>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}