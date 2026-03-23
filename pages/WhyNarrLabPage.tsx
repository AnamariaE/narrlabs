import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../lib/i18n-context';
import { useNavigate } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export function WhyNarrLabPage() {
  const { language } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-[#F2BF80] overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-12"
          >
            <ImageWithFallback 
              src="https://narrlab.studio/img/LogoNarrlabs.png"
              alt="NarrLab"
              className="h-20 w-20 md:h-24 md:w-24"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6"
            style={{ 
              fontFamily: 'Sora, sans-serif',
              color: '#121126'
            }}
          >
            {language === 'es' ? '¿Por qué NarrLab?' : 'Why NarrLab?'}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl text-center max-w-4xl mx-auto leading-relaxed"
            style={{ color: '#274259' }}
          >
            {language === 'es' 
              ? 'Narrlab existe porque aprender algo complejo no debería verse como un manual de instrucciones.'
              : 'Narrlab exists because learning something complex shouldn\'t look like an instruction manual.'}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-center italic max-w-3xl mx-auto mt-8"
            style={{ color: '#D95032' }}
          >
            {language === 'es'
              ? 'Somos un estudio laboratorio que combina diseño instruccional e identidad visual. Una combinación que casi nadie ofrece, pero que cambia completamente los resultados.'
              : 'We are a studio laboratory that combines instructional design and visual identity. A combination that almost no one offers, but that completely changes the results.'}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-20">
          
          {/* Section 1: Qué hacemos (en serio) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#21374d' }}>
              {language === 'es' ? 'Qué hacemos (en serio)' : 'What we do (seriously)'}
            </h2>

            <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>
                {language === 'es'
                  ? 'La mayoría de los proyectos de formación llegan a nosotros en forma de documento Word. A veces bien estructurado, a veces no. Siempre con demasiado texto y poca forma.'
                  : 'Most training projects come to us in the form of a Word document. Sometimes well structured, sometimes not. Always with too much text and little form.'}
              </p>

              <p>
                {language === 'es'
                  ? 'Nuestro trabajo es convertir ese material en una experiencia de aprendizaje que las personas realmente completan y aplican, publicadas en tu LMS, con tu identidad visual, coherente de principio a fin.'
                  : 'Our job is to convert that material into a learning experience that people actually complete and apply, published on your LMS, with your visual identity, coherent from start to finish.'}
              </p>

              <p className="font-semibold" style={{ color: '#D95032' }}>
                {language === 'es'
                  ? 'No somos una agencia grande. Hay una persona detrás de cada proyecto, con criterio propio y una red de profesionales que se integra cuando el trabajo lo necesita. Eso nos da la agilidad de un freelance con la profundidad de un estudio.'
                  : 'We are not a large agency. There is one person behind each project, with their own judgment and a network of professionals who join when the work requires it. That gives us the agility of a freelancer with the depth of a studio.'}
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-px bg-border mx-auto" />

          {/* Section 2: Cómo trabajamos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#21374d' }}>
              {language === 'es' ? 'Cómo trabajamos' : 'How we work'}
            </h2>

            {/* 3 Steps */}
            <div className="space-y-10">
              {/* Step 1 */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ backgroundColor: '#D95032', color: '#F2EADF' }}
                  >
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#121126' }}>
                      {language === 'es' ? 'Escuchamos primero' : 'We listen first'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'es'
                        ? 'Antes de proponer cualquier cosa, entendemos el proyecto: quién aprende, qué necesita lograr, qué restricciones existen. La pregunta que nadie había hecho suele aparecer aquí.'
                        : 'Before proposing anything, we understand the project: who is learning, what they need to achieve, what constraints exist. The question nobody asked usually appears here.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ backgroundColor: '#F2AE2E', color: '#121126' }}
                  >
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#121126' }}>
                      {language === 'es' ? 'Estructuramos con criterio' : 'We structure with judgment'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'es'
                        ? 'Diseño instruccional no es poner bullets en una presentación. Es decidir qué va primero, qué puede sacarse, cómo debe fluir para que alguien con tu audiencia específica lo entienda y lo retenga.'
                        : 'Instructional design isn\'t about putting bullets in a presentation. It\'s deciding what goes first, what can be removed, how it should flow so someone with your specific audience understands and retains it.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                    style={{ backgroundColor: '#5B44F2', color: '#F2EADF' }}
                  >
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#121126' }}>
                      {language === 'es' ? 'Diseñamos y entregamos listo' : 'We design and deliver ready'}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'es'
                        ? 'El resultado final tiene identidad visual, coherencia de lenguaje y funciona en la plataforma que uses. No piezas sueltas: un producto terminado.'
                        : 'The final result has visual identity, language coherence, and works on the platform you use. Not loose pieces: a finished product.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-px bg-border mx-auto" />

          {/* Section 3: Por qué es diferente */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#21374d' }}>
              {language === 'es' ? 'Por qué es diferente' : 'Why it\'s different'}
            </h2>

            <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              <h3 className="text-2xl font-bold" style={{ color: '#121126' }}>
                {language === 'es' 
                  ? 'La mayoría separa lo que nosotros integramos.'
                  : 'Most separate what we integrate.'}
              </h3>

              <p>
                {language === 'es'
                  ? 'Una agencia de e-learning estructura el contenido, pero no cuida la estética. Una agencia de diseño hace bonito lo que le das, pero no entiende de pedagogía. La IA genera rápido, pero sin criterio instruccional ni coherencia de marca.'
                  : 'An e-learning agency structures the content, but doesn\'t care about aesthetics. A design agency makes pretty what you give them, but doesn\'t understand pedagogy. AI generates quickly, but without instructional judgment or brand coherence.'}
              </p>

              <p className="font-semibold" style={{ color: '#D95032' }}>
                {language === 'es'
                  ? 'En Narrlab, ambas cosas viven en el mismo proceso, bajo el mismo criterio. El resultado es que el curso no solo funciona... también representa a tu organización.'
                  : 'At Narrlab, both things live in the same process, under the same judgment. The result is that the course not only works... it also represents your organization.'}
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-px bg-border mx-auto" />

          {/* Section 4: Con quién trabajamos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#21374d' }}>
              {language === 'es' ? 'Con quién trabajamos' : 'Who we work with'}
            </h2>

            <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
              <h3 className="text-2xl font-bold" style={{ color: '#121126' }}>
                {language === 'es' 
                  ? 'Contextos que conocemos bien'
                  : 'Contexts we know well'}
              </h3>

              <ul className="space-y-4 list-none">
                <li className="flex items-start gap-3">
                  <span style={{ color: '#D95032' }}>✓</span>
                  <span>
                    {language === 'es'
                      ? 'ONGs y organizaciones internacionales con programas de formación para comunidades'
                      : 'NGOs and international organizations with training programs for communities'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#D95032' }}>✓</span>
                  <span>
                    {language === 'es'
                      ? 'Equipos con conocimiento experto que no saben cómo estructurarlo para otros'
                      : 'Teams with expert knowledge who don\'t know how to structure it for others'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: '#D95032' }}>✓</span>
                  <span>
                    {language === 'es'
                      ? 'Proyectos donde la audiencia final es diversa, vulnerable, o de baja alfabetización'
                      : 'Projects where the final audience is diverse, vulnerable, or has low literacy'}
                  </span>
                </li>
              </ul>

              <p className="font-semibold italic" style={{ color: '#121126' }}>
                {language === 'es'
                  ? 'Si tu proyecto tiene una audiencia real con necesidades reales, es el tipo de trabajo que nos importa.'
                  : 'If your project has a real audience with real needs, it\'s the kind of work we care about.'}
              </p>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-px bg-border mx-auto" />

          {/* Section 5: Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: '#21374d' }}>
              {language === 'es' 
                ? 'Lo que dicen quienes han trabajado con nosotros'
                : 'What people who have worked with us say'}
            </h2>

            <div className="space-y-8">
              {/* Testimonial 1 */}
              <div className="border-l-4 pl-6 py-2" style={{ borderColor: '#D95032' }}>
                <p className="text-lg italic text-muted-foreground mb-2">
                  "{language === 'es'
                    ? 'No entiendo cómo ese montón de texto se convirtió en esto tan atractivo y bien construido.'
                    : 'I don\'t understand how that pile of text became something so attractive and well-built.'}"
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="border-l-4 pl-6 py-2" style={{ borderColor: '#F2AE2E' }}>
                <p className="text-lg italic text-muted-foreground mb-2">
                  "{language === 'es'
                    ? 'Además siguió las líneas gráficas y es coherente.'
                    : 'Plus it followed the graphic guidelines and is coherent.'}"
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="border-l-4 pl-6 py-2" style={{ borderColor: '#5B44F2' }}>
                <p className="text-lg italic text-muted-foreground mb-2">
                  "{language === 'es'
                    ? 'Es muy fácil trabajar con ella porque entiende lo que queremos.'
                    : 'It\'s very easy to work with her because she understands what we want.'}"
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CTA Final Section */}
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
              ? '¿Tiene sentido trabajar juntos?' 
              : 'Does it make sense to work together?'}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-[18px]">
            {language === 'es'
              ? 'Cuéntanos en qué estás. Si podemos ayudar, lo decimos. Si no, también.'
              : 'Tell us what you\'re working on. If we can help, we\'ll say so. If not, we\'ll say that too.'}
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
              {language === 'es' ? 'Empieza con un brief' : 'Start with a brief'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}