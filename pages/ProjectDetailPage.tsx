import React from 'react';
import { ArrowLeft, ExternalLink, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import ReactMarkdown from 'react-markdown';
import siteData from '../data/site-data';

export function ProjectDetailPage() {
  const { language, t } = useI18n();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  
  // Redirect to custom page for humanidades-digitales
  React.useEffect(() => {
    if (slug === 'humanidades-digitales') {
      navigate('/humanidades-digitales');
    }
  }, [slug, navigate]);
  
  const project = siteData.projects.find(p => p.slug === slug);
  
  // Find current project index and get previous/next projects
  const currentIndex = siteData.projects.findIndex(p => p.slug === slug);
  const previousProject = currentIndex > 0 ? siteData.projects[currentIndex - 1] : null;
  const nextProject = currentIndex < siteData.projects.length - 1 ? siteData.projects[currentIndex + 1] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">
            {language === 'es' ? 'Proyecto no encontrado' : 'Project not found'}
          </h2>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'es' ? 'Volver al inicio' : 'Back to home'}
          </Button>
        </div>
      </div>
    );
  }

  const summary = language === 'es' ? project.summary_es : project.summary_en;

  // Helper function to parse and render description with special handling for solutions
  const renderDescription = (description: string) => {
    // Check if this is the Wayuu project with numbered solutions
    if (project.slug === 'video-narrativa-wayuu' && description.includes('**Soluciones:**')) {
      // Split the content at "**Soluciones:**"
      const parts = description.split('**Soluciones:**');
      // Clean up the content before solutions - join orphan lines that start with capital letters
      const beforeSolutions = parts[0].replace(/\.\n\n([A-Z][^*])/g, '. $1');
      
      // Extract everything after Solutions
      const afterSolutionsText = parts[1];
      
      // Find where solutions end (at **Entregables:** or similar)
      const afterSolutionsEnd = afterSolutionsText.indexOf('**Entregables:**');
      const solutionsText = afterSolutionsEnd !== -1 
        ? afterSolutionsText.substring(0, afterSolutionsEnd) 
        : afterSolutionsText;
      const afterContent = afterSolutionsEnd !== -1 ? afterSolutionsText.substring(afterSolutionsEnd) : '';
      
      // Split solutions by the pattern **1)**, **2)**, **3)**, **4)**
      const solutionParts = solutionsText.split(/(?=\*\*\d+\))/);
      const solutions = solutionParts
        .filter(part => part.trim().length > 0)
        .map(part => {
          // Extract title and content
          const match = part.match(/\*\*(\d+\)\s*[^*]+)\*\*\s*(.+)/s);
          if (!match) return null;
          return {
            title: match[1].trim(),
            content: match[2].trim()
          };
        })
        .filter(Boolean);
      
      return (
        <>
          {/* Content before solutions */}
          <ReactMarkdown
            components={{
              p: ({node, ...props}) => <p className="mb-8 text-lg leading-loose" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-foreground block mb-3 text-xl" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-3 my-6" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-3 my-6" {...props} />,
            }}
          >
            {beforeSolutions}
          </ReactMarkdown>

          {/* Solutions section with grid */}
          <div className="my-10">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              {language === 'es' ? 'Soluciones:' : 'Solutions:'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-muted/20 rounded-xl border border-border px-[24px] py-[8px]">
                  <h4 className="text-lg font-bold text-foreground mb-3">{solution.title}</h4>
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="text-base leading-relaxed text-muted-foreground" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                    }}
                  >
                    {solution.content}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>

          {/* Content after solutions */}
          <ReactMarkdown
            components={{
              p: ({node, ...props}) => <p className="mb-8 text-lg leading-loose" {...props} />,
              strong: ({node, ...props}) => <strong className="font-bold text-foreground block mb-3 text-xl" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-3 my-6" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-3 my-6" {...props} />,
            }}
          >
            {afterContent}
          </ReactMarkdown>
        </>
      );
    }
    
    // Parse description and convert bullet points (•) to proper lists
    const parseContent = (text: string) => {
      const lines = text.split('\n');
      const elements: React.ReactNode[] = [];
      let currentList: string[] = [];
      let currentParagraph = '';
      
      const flushList = () => {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${elements.length}`} className="grid grid-cols-2 gap-x-6 gap-y-3 my-6 list-none">
              {currentList.map((item, idx) => {
                // Process markdown in item text
                const processMarkdown = (text: string) => {
                  const parts: React.ReactNode[] = [];
                  let remaining = text;
                  let key = 0;
                  
                  while (remaining.length > 0) {
                    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
                    if (boldMatch && boldMatch.index !== undefined) {
                      // Add text before the bold part
                      if (boldMatch.index > 0) {
                        parts.push(remaining.substring(0, boldMatch.index));
                      }
                      // Add the bold part
                      parts.push(<strong key={key++} className="font-bold text-foreground">{boldMatch[1]}</strong>);
                      // Continue with the rest
                      remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
                    } else {
                      // No more bold text, add the rest
                      parts.push(remaining);
                      break;
                    }
                  }
                  
                  return parts.length > 0 ? parts : text;
                };
                
                return (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary mr-3 mt-1 shrink-0">•</span>
                    <span className="text-base">{processMarkdown(item)}</span>
                  </li>
                );
              })}
            </ul>
          );
          currentList = [];
        }
      };
      
      const flushParagraph = () => {
        if (currentParagraph.trim()) {
          elements.push(
            <ReactMarkdown
              key={`para-${elements.length}`}
              components={{
                p: ({node, ...props}) => <p className="mb-8 leading-loose text-[15px]" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
              }}
            >
              {currentParagraph.trim()}
            </ReactMarkdown>
          );
          currentParagraph = '';
        }
      };
      
      lines.forEach((line, index) => {
        const trimmed = line.trim();
        
        // Check if line starts with bullet point
        if (trimmed.startsWith('•')) {
          flushParagraph();
          // Process markdown in bullet text (convert **text** to bold)
          const bulletText = trimmed.substring(1).trim();
          currentList.push(bulletText);
        } else if (trimmed === '') {
          // Empty line - flush current content
          if (currentList.length > 0) {
            flushList();
          } else {
            currentParagraph += '\n';
          }
        } else {
          // Regular text line
          flushList();
          currentParagraph += (currentParagraph ? '\n' : '') + line;
        }
      });
      
      // Flush any remaining content
      flushList();
      flushParagraph();
      
      return elements;
    };
    
    // Default rendering for other projects with bullet point handling
    return <>{parseContent(description)}</>;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-muted/20 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'es' ? 'Volver a portafolio' : 'Back to portfolio'}
          </Button>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="mb-4 font-bold text-[32px]" style={{ color: '#21374d' }}>
                {project.slug === 'video-narrativa-wayuu' 
                  ? 'Wayuú | Learning Circles @ Let\'s connect'
                  : project.slug === 'organizer-lab-badge-2024'
                  ? (language === 'es' ? 'Organizer Lab – Desarrollo instruccional' : 'Organizer Lab – Instructional Development')
                  : project.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">{summary}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {project.slug === 'video-narrativa-wayuu' ? '2025' : project.year}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  {project.categories && project.categories.length > 0
                    ? project.categories.join(' • ')
                    : project.category}
                </div>
              </div>
            </div>

            <a
              href={project.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cover Image - Skip for Wayuu project since it has video with poster */}
        {project.slug !== 'video-narrativa-wayuu' && (
          <div className="mb-12 rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
            <ImageWithFallback
              src={project.cover_image}
              alt={project.title}
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        {/* Video - Only for Wayuu project */}
        {project.slug === 'video-narrativa-wayuu' && (
          <div className="mb-12 rounded-xl overflow-hidden border border-border bg-muted">
            <video 
              controls 
              className="w-full h-auto"
              poster={project.cover_image}
            >
              <source src="https://narrlab.studio/img/circulowayuu.mp4" type="video/mp4" />
              {language === 'es' 
                ? 'Tu navegador no soporta el elemento de video.' 
                : 'Your browser does not support the video element.'}
            </video>
          </div>
        )}

        {/* Project Metadata Section - Always shown after cover image/video */}
        {(project.role_es || project.role_en || project.tools || project.status_es || project.status_en || project.year || (project.categories && project.categories.length > 0)) && (
          <div className="mb-12 bg-gradient-to-br from-muted/30 to-transparent rounded-2xl p-8 border border-border/40">
            {/* First row: Year, Status, Context, Type - distributed across full width */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mb-6">
              {/* Year */}
              {project.year && (
                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">
                    {language === 'es' ? 'Año' : 'Year'}
                  </p>
                  <p className="text-[15px] text-muted-foreground">{project.year}</p>
                </div>
              )}

              {/* Status */}
              {(project.status_es || project.status_en) && (
                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">
                    {language === 'es' ? 'Estado' : 'Status'}
                  </p>
                  <p className="text-[15px] text-muted-foreground">
                    {language === 'es' ? project.status_es : project.status_en}
                  </p>
                </div>
              )}

              {/* Context */}
              {project.categories && project.categories.length > 0 && (
                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">
                    {language === 'es' ? 'Contexto' : 'Context'}
                  </p>
                  <p className="text-[15px] text-muted-foreground">{project.categories[0]}</p>
                </div>
              )}

              {/* Type */}
              {project.categories && project.categories.length > 1 && (
                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">
                    {language === 'es' ? 'Tipo' : 'Type'}
                  </p>
                  <p className="text-[15px] text-muted-foreground">{project.categories[1]}</p>
                </div>
              )}
            </div>

            {/* Second row: Role and Tools - two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Role */}
              {(project.role_es || project.role_en) && (
                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">
                    {language === 'es' ? 'Mi rol' : 'My role'}
                  </p>
                  <p className="text-[15px] text-muted-foreground">
                    {language === 'es' ? project.role_es : project.role_en}
                  </p>
                </div>
              )}

              {/* Tools */}
              {project.tools && project.tools.length > 0 && (
                <div>
                  <p className="text-[13px] font-bold text-primary mb-2">
                    {language === 'es' ? 'Herramientas' : 'Tools'}
                  </p>
                  <p className="text-[15px] text-muted-foreground">
                    {project.tools.join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Canva Embed - Only for Wayuu project */}
        {project.slug === 'video-narrativa-wayuu' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {language === 'es' ? 'Espacios Sagrados - Pizarra de taller sincrónico' : 'Sacred Spaces - Live Workshop Board'}
              </h3>
              <a
                href="https://www.canva.com/design/DAGoBwWUqlc/iUKgIUevjgFVSdCBTT0m7Q/view?utm_content=DAGoBwWUqlc&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  {language === 'es' ? 'Abrir en Canva' : 'Open in Canva'}
                </Button>
              </a>
            </div>
            <div className="rounded-xl overflow-hidden border border-border bg-muted shadow-sm hover:shadow-lg transition-shadow duration-300 group">
              <div style={{
                position: 'relative',
                width: '100%',
                height: 0,
                paddingTop: '50.0000%',
                paddingBottom: 0,
                overflow: 'hidden',
                borderRadius: '8px',
                willChange: 'transform'
              }}>
                <iframe 
                  loading="lazy" 
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    border: 'none',
                    padding: 0,
                    margin: 0
                  }}
                  src="https://www.canva.com/design/DAGoBwWUqlc/iUKgIUevjgFVSdCBTT0m7Q/view?embed" 
                  allowFullScreen={true}
                  allow="fullscreen"
                  title={language === 'es' ? 'Espacios Sagrados - Pizarra de taller sincrónico' : 'Sacred Spaces - Live Workshop Board'}
                />
              </div>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              {language === 'es' 
                ? 'Haz clic en la pizarra para interactuar. Usa los controles de Canva para navegar y hacer zoom.' 
                : 'Click on the board to interact. Use Canva controls to navigate and zoom.'}
            </p>
          </div>
        )}

        {/* Gallery Images */}
        {project.gallery_images && project.gallery_images.length > 0 && (() => {
          // Remove duplicates: filter out cover_image AND any repeated images in the array
          const uniqueGalleryImages = Array.from(new Set(project.gallery_images))
            .filter(image => image !== project.cover_image);
          
          console.log('Project:', project.slug);
          console.log('Gallery images:', project.gallery_images);
          console.log('Cover image:', project.cover_image);
          console.log('Unique gallery images after filtering:', uniqueGalleryImages);
          
          return uniqueGalleryImages.length > 0 && (
            <div className="mb-12 space-y-6">
              {uniqueGalleryImages.map((image, index) => {
                // Check if this is one of the last two images
                const isLastTwo = index >= uniqueGalleryImages.length - 2;
                const isSecondToLast = index === uniqueGalleryImages.length - 2;
                
                // If it's the second-to-last image, render both in a grid
                if (isSecondToLast) {
                  return (
                    <div key={`grid-${index}`} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
                        <ImageWithFallback
                          src={image}
                          alt={`${project.title} - ${index + 1}`}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
                        <ImageWithFallback
                          src={uniqueGalleryImages[index + 1]}
                          alt={`${project.title} - ${index + 2}`}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </div>
                  );
                }
                
                // Skip the last image since it's already rendered in the grid
                if (index === uniqueGalleryImages.length - 1) {
                  return null;
                }
                
                // Regular single-column layout for other images
                return (
                  <div key={index} className="rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} - ${index + 1}`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* Case Study Sections */}
        <div className="prose prose-lg max-w-none">
          {/* Custom Description if available */}
          {(project.description_es || project.description_en) && (
            <section className="mb-20">
              <div className="space-y-8 text-lg leading-relaxed text-muted-foreground [&_ul]:columns-2 [&_ul]:gap-x-8 [&_ul]:break-inside-avoid-column">
                {renderDescription(language === 'es' ? project.description_es : project.description_en)}
              </div>
            </section>
          )}

          {/* Narrative section - Only for projects with narrative_es/en */}
          {(project.narrative_es || project.narrative_en) && (
            <>
              <Separator className="my-20" />
              <section className="mb-20 mt-[-20px] bg-gradient-to-br from-muted/40 to-muted/20 rounded-3xl border-2 border-border/50 shadow-sm px-[48px] py-[40px]">
                <div className="space-y-6">
                  <ReactMarkdown
                    components={{
                      h2: ({node, ...props}) => <h2 className="text-4xl font-bold mb-8 mt-12 first:mt-0 text-foreground border-b-2 border-primary/20 pb-4" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-2xl font-bold mb-5 mt-8 text-foreground/90" {...props} />,
                      p: ({node, ...props}) => <p className="mb-5 leading-loose text-muted-foreground" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-foreground" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-7 space-y-3 mb-6 text-muted-foreground" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-7 space-y-3 mb-6 text-muted-foreground" {...props} />,
                      li: ({node, ...props}) => <li className="leading-loose pl-2" {...props} />,
                    }}
                  >
                    {language === 'es' ? project.narrative_es : project.narrative_en}
                  </ReactMarkdown>
                </div>
              </section>
            </>
          )}

          {/* Special sections for projects with role_es/en (like Toteramy) */}
          {(project.role_es || project.role_en) && (
            <>
              <Separator className="my-16" />
              
            </>
          )}

          {/* Services section for projects with services_es/en */}
          {(project.services_es || project.services_en) && (
            <section className="mb-16 bg-gradient-to-br from-muted/30 to-transparent rounded-2xl p-8 border border-border/40 -mt-[35px]">
              <h2 className="text-[18px] font-bold mb-6" style={{ color: '#21374d' }}>
                {language === 'es' ? 'Servicios entregados' : 'Services delivered'}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {(language === 'es' ? project.services_es : project.services_en)?.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-3 mt-0.5 text-[13px] font-bold">•</span>
                    <span className="leading-relaxed text-muted-foreground text-[15px]">{service}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Default sections only if no custom description AND no role */}
          {!project.description_es && !project.description_en && !project.role_es && !project.role_en && (
            <>
              <section className="mb-16 bg-gradient-to-br from-muted/30 to-transparent rounded-2xl border border-border/40 px-[32px] py-[0px]">
                <h2 className="text-[18px] font-bold mb-6" style={{ color: '#21374d' }}>
                  {language === 'es' ? 'Contexto' : 'Context'}
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {language === 'es' 
                    ? 'Este proyecto forma parte de mi trabajo en ' + project.category + ', donde me enfoco en crear soluciones de diseño que combinen pedagogía, accesibilidad y narrativa visual.'
                    : 'This project is part of my work at ' + project.category + ', where I focus on creating design solutions that combine pedagogy, accessibility, and visual storytelling.'}
                </p>
              </section>

              <Separator className="my-16" />

              <section className="mb-16 bg-gradient-to-br from-muted/30 to-transparent rounded-2xl border border-border/40 -mt-[35px] px-[32px] py-[10px]">
                <h2 className="text-[18px] font-bold mb-6" style={{ color: '#21374d' }}>
                  {language === 'es' ? 'Mi rol' : 'My role'}
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {language === 'es'
                    ? 'Como diseñadora instruccional y multimedia, lideré el proceso de diseño desde la conceptualización hasta la implementación, asegurando que cada elemento cumpliera con los estándares de accesibilidad y las necesidades específicas del público objetivo.'
                    : 'As an instructional and multimedia designer, I led the design process from conceptualization to implementation, ensuring that every element met accessibility standards and the specific needs of the target audience.'}
                </p>
              </section>

              <Separator className="my-16" />

              <section className="mb-16 bg-gradient-to-br from-muted/30 to-transparent rounded-2xl border border-border/40 -mt-[35px] px-[32px] py-[6px]">
                <h2 className="text-[18px] font-bold mb-6" style={{ color: '#21374d' }}>
                  {language === 'es' ? 'Proceso' : 'Process'}
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {language === 'es'
                    ? 'El proceso incluyó investigación de usuario, wireframing, diseño visual, pruebas de usabilidad y refinamiento iterativo. Trabajé en colaboración con stakeholders para asegurar que el diseño final cumpliera con los objetivos y expectativas de mi cliente. A partir de esta memoria trabajamos durante tres años seguidos como apoyo multimedia e impresa del banco.'
                    : 'The process included user research, wireframing, visual design, usability testing, and iterative refinement. I worked collaboratively with stakeholders to ensure the final design met my client\'s objectives and expectations. From this report onwards, we worked together for three consecutive years as multimedia and print support for the bank.'}
                </p>
              </section>

              <Separator className="my-16" />

              <section className="mb-16 bg-gradient-to-br from-muted/30 to-transparent rounded-2xl border border-border/40 -mt-[35px] px-[32px] py-[5px]">
                <h2 className="text-[18px] font-bold mb-6" style={{ color: '#21374d' }}>
                  {language === 'es' ? 'Entregables' : 'Deliverables'}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {project.tags.map((tag, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-3 mt-0.5 text-[13px] font-bold">•</span>
                      <span className="text-[15px] leading-relaxed text-muted-foreground">
                        {language === 'es' 
                          ? `Diseño y producción de ${tag.toLowerCase()}`
                          : `${tag} design and production`}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-0.5 text-[13px] font-bold">•</span>
                    <span className="text-[15px] leading-relaxed text-muted-foreground">
                      {language === 'es'
                        ? 'Documentación y guías de estilo'
                        : 'Documentation and style guides'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-0.5 text-[13px] font-bold">•</span>
                    <span className="text-[15px] leading-relaxed text-muted-foreground">
                      {language === 'es'
                        ? 'Activos finales optimizados'
                        : 'Optimized final assets'}
                    </span>
                  </li>
                </ul>
              </section>

              <Separator className="my-16" />

              <section className="bg-gradient-to-br from-muted/30 to-transparent rounded-2xl border border-border/40 -mt-[35px] px-[32px] py-[9px]">
                <h2 className="text-[18px] font-bold mb-6" style={{ color: '#21374d' }}>
                  {language === 'es' ? 'Impacto' : 'Impact'}
                </h2>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {language === 'es'
                    ? 'Este proyecto contribuyó significativamente a los objetivos de la organización, proporcionando recursos visuales que mejoraron la comunicación y el engagement con la comunidad. Los activos diseñados continúan siendo utilizados en campañas y programas educativos.'
                    : 'This project significantly contributed to the organization\'s objectives, providing visual resources that improved communication and engagement with the community. The designed assets continue to be used in campaigns and educational programs.'}
                </p>
              </section>
            </>
          )}
        </div>

        {/* Featured Episodes - Only for podcast */}
        {project.slug === 'profe-neon-podcast' && (
          <div className="mt-16 mb-12">
            <h2 className="mb-8 text-center">
              {language === 'es' ? 'Episodios destacados' : 'Featured episodes'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl overflow-hidden border border-border bg-background p-4">
                <iframe 
                  src="https://creators.spotify.com/pod/profile/anamaria-espinoza9/embed/episodes/El-fetiche-digital-influencers--viralidad-y-control-e34udou" 
                  height="152px" 
                  width="100%" 
                  frameBorder="0" 
                  scrolling="no"
                  title="El fetiche digital: influencers, viralidad y control"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-border bg-background p-4">
                <iframe 
                  src="https://creators.spotify.com/pod/profile/anamaria-espinoza9/embed/episodes/Cuando-el-poder-aprendi-a-usar-stickers-And-we-are-back------baby-come-back-e34d6mf/a-ac0lltp" 
                  height="152px" 
                  width="100%" 
                  frameBorder="0" 
                  scrolling="no"
                  title="Cuando el poder aprendió a usar stickers"
                />
              </div>
              <div className="rounded-xl overflow-hidden border border-border bg-background p-4">
                <iframe 
                  src="https://creators.spotify.com/pod/profile/anamaria-espinoza9/embed/episodes/Por-qu-estoy-tan-cansada-an-despus-de-las-vacaciones-e1cm9kt/a-a775460" 
                  height="152px" 
                  width="100%" 
                  frameBorder="0" 
                  scrolling="no"
                  title="Por qué estoy tan cansada aún después de las vacaciones"
                />
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-border text-center">
          <h3 className="mb-4">
            {language === 'es' ? '¿Interesado en colaborar?' : 'Interested in collaborating?'}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === 'es'
              ? 'Me encantaría conocer más sobre tu proyecto y cómo puedo ayudarte a crear experiencias de aprendizaje impactantes.'
              : 'I\'d love to learn more about your project and how I can help you create impactful learning experiences.'}
          </p>
          <Button onClick={() => navigate('/contact')} size="lg">
            {language === 'es' ? 'Contactar' : 'Get in touch'}
          </Button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between">
        {previousProject && (
          <Button
            variant="ghost"
            onClick={() => navigate(`/project/${previousProject.slug}`)}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            {language === 'es' ? 'Proyecto anterior' : 'Previous project'}
          </Button>
        )}
        {nextProject && (
          <Button
            variant="ghost"
            onClick={() => navigate(`/project/${nextProject.slug}`)}
            className="flex items-center ml-auto"
          >
            {language === 'es' ? 'Proyecto siguiente' : 'Next project'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}