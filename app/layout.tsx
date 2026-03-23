import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anamaría Espinoza — Portfolio & CV',
  description: 'Portfolio y CV bilingüe (ES/EN) de Anamaría Espinoza. Learning Experience & Community Education Lead.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://anamaria.com',
    siteName: 'Anamaría Espinoza',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
