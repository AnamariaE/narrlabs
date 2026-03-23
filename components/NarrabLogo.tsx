import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NarrabLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function NarrabLogo({ className = '', variant = 'dark' }: NarrabLogoProps) {
  return (
    <ImageWithFallback
      src="https://narrlab.studio/img/Logotipo.png"
      alt="NarrLab logotipo"
      className={className}
      aria-label="NarrLab logo"
    />
  );
}