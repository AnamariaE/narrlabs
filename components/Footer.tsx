import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { siteData } from '../data/site-data';
import { ObfuscatedEmail } from './ObfuscatedEmail';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="mb-4">{siteData.person.name}</h3>
            <p className="text-sm opacity-75">{siteData.person.role}</p>
            <p className="text-sm opacity-75 mt-1">{siteData.person.location}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4">Social</h4>
            <div className="flex flex-col gap-3">
              {siteData.social.linkedin && (
                <a
                  href={siteData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
              {siteData.person.behance_url && (
                null
              )}
              {siteData.person.commons_url && (
                <a
                  href={siteData.person.commons_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Wikimedia Commons
                </a>
              )}
              {siteData.social.email && (
                <a
                  href={`mailto:${siteData.social.email}`}
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <ObfuscatedEmail email={siteData.social.email} />
                </a>
              )}
            </div>
          </div>

          {/* Copyright */}
          <div className="md:text-right space-y-2">
            <p className="text-sm opacity-75">
              © {currentYear} {siteData.person.name}
            </p>
            <p className="text-sm opacity-75">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}