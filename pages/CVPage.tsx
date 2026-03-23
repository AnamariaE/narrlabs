import React from 'react';
import { Download, Printer } from 'lucide-react';
import { useI18n } from '../lib/i18n-context';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import siteData from '../data/site-data';
import { ObfuscatedEmail } from '../components/ObfuscatedEmail';
import { CVByFocus } from '../components/CVByFocus';

export function CVPage() {
  const { language, t } = useI18n();

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    window.print();
  };

  const cvData = siteData.cv;
  const summary = language === 'es' ? cvData.summary_es : cvData.summary_en;

  return (
    <>
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 print:py-0">
        <div className="max-w-4xl mx-auto">
          {/* Header with Actions */}
          <div className="flex justify-between items-start mb-8 print:hidden">
            <div>
              <h1 className="mb-2">{t('cv.title')}</h1>
              <p className="text-muted-foreground">{siteData.person.name}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handlePrint} variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                {t('cv.print')}
              </Button>
              <Button onClick={handleDownload} size="sm">
                <Download className="h-4 w-4 mr-2" />
                {t('cv.download')}
              </Button>
            </div>
          </div>

          {/* CV Content */}
          <div className="bg-card border border-border rounded-xl p-8 print:border-0 print:p-0">
            {/* Header */}
            <div className="mb-8 print:mb-6">
              <h2 className="mb-2">{siteData.person.name}</h2>
              <p className="text-lg mb-3" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>
                {siteData.person.role}
              </p>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>
                <span>{siteData.person.location}</span>
                <span>•</span>
                <ObfuscatedEmail email={siteData.social.email} />
                {siteData.social.linkedin && (
                  <>
                    <span>•</span>
                    <a href={siteData.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline print:text-black">
                      LinkedIn
                    </a>
                  </>
                )}
              </div>
            </div>

            <Separator className="mb-8 print:mb-6" />

            {/* Summary */}
            <div className="mb-8 print:mb-6">
              <h3 className="mb-4">{t('cv.summary')}</h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.85)' }}>
                {summary}
              </p>
            </div>

            {/* Experience */}
            <div className="mb-8 print:mb-6">
              <h3 className="mb-4">{t('cv.experience')}</h3>
              <div className="space-y-6">
                {cvData.experience.map((job, index) => {
                  const description = language === 'es' ? job.description_es : job.description_en;
                  return (
                    <div key={index}>
                      <div className="flex justify-between items-baseline mb-2 flex-wrap gap-2">
                        <h4 className="mb-0">{job.company}</h4>
                        <span className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>{job.period}</span>
                      </div>
                      <p className="font-medium mb-2" style={{ color: 'rgba(30, 25, 64, 0.75)' }}>{job.role}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(30, 25, 64, 0.7)' }}>
                        {description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8 print:mb-6">
              <h3 className="mb-4">{t('cv.education')}</h3>
              <div className="space-y-4">
                {cvData.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                      <h4 className="mb-0">{edu.degree}</h4>
                      <span className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>{edu.year}</span>
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(30, 25, 64, 0.7)' }}>{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8 print:mb-6">
              <h3 className="mb-4">{t('cv.skills')}</h3>
              <div className="flex flex-wrap gap-2 print:gap-1">
                {siteData.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="print:text-xs print:bg-transparent print:border print:border-black"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="mb-8 print:mb-6">
              <h3 className="mb-4">{t('cv.tools')}</h3>
              <div className="flex flex-wrap gap-2 print:gap-1">
                {siteData.tools.map((tool) => (
                  <Badge 
                    key={tool} 
                    variant="outline"
                    className="print:text-xs"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h3 className="mb-4">{t('cv.languages')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-4 print:gap-2">
                {siteData.languages.map((lang) => (
                  <div key={lang.name} className="text-center p-3 rounded-lg border print:border-black print:p-2">
                    <p className="font-medium mb-1 print:text-sm">{lang.name}</p>
                    <p className="text-sm print:text-xs" style={{ color: 'rgba(30, 25, 64, 0.6)' }}>
                      {lang.level}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: CV by Focus */}
      <CVByFocus />
      
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
          
          /* Hide navigation and other UI elements */
          nav,
          header,
          footer,
          .print\\:hidden {
            display: none !important;
          }
          
          /* Ensure proper page breaks */
          h2, h3, h4 {
            page-break-after: avoid;
          }
          
          /* Avoid breaking inside sections */
          .space-y-6 > div,
          .space-y-4 > div {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
}
