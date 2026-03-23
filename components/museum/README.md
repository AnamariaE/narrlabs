# Museo Retro-Cósmico — Design System

Sistema visual para NarrLab Studio inspirado en **Streamline Moderne** + **Stardust Art Nouveau**.

## Filosofía

Una galería museo premium: elegante, futurista-vintage, cálida. Editorial minimal con microinteracciones sutiles y personalidad distintiva.

## Paleta de Colores

### Studio Mode
- **Pergamino** (`#FAF7F2`): Fondo principal cálido
- **Charcoal** (`#2D2823`): Texto principal (no negro puro)
- **Terracota** (`#C8705D`): Acento principal, CTAs, estados activos
- **Stardust Dorado** (`#D4AF7A`): Acento secundario, bordes, separadores, badges
- **Sage** (`#7A9B8E`): Acento frío mínimo, énfasis puntual
- **Midnight Blue** (`#2C4153`): Detalles de constelación, links especiales

### Borders & Shadows
- Bordes: `border-secondary/20` (dorados suaves)
- Sombras: `0 2px 12px rgba(45, 40, 35, 0.06)` (museo default)
- Sombras hover: `0 12px 32px rgba(45, 40, 35, 0.12)` con brillo dorado

## Componentes

### MuseumPattern
Patrones de fondo sutiles:
- **streamline**: Líneas horizontales aerodinámicas
- **constellation**: Puntos/nodos tipo estrellas
- **combined**: Ambos + glow spots

```tsx
<MuseumPattern variant="combined" className="opacity-60" />
```

### MuseumDivider
Separadores decorativos:
- **line**: Gradiente dorado simple
- **constellation**: Puntos + sparkles
- **streamline**: Línea curva con nodo central

```tsx
<MuseumDivider variant="constellation" />
```

### MuseumPlaque
Tarjetas tipo "ficha de museo" con esquinas decorativas:
- Variantes: `default`, `featured`, `mini`
- Bordes dorados, sombras sutiles, corners decorativos

```tsx
<MuseumPlaque 
  title="Título" 
  subtitle="OVERLINE"
  variant="featured"
>
  Contenido aquí
</MuseumPlaque>
```

### HeroStudio
Hero editorial de dos columnas para modo Studio:
- Columna izquierda (7/12): Texto + CTAs
- Columna derecha (5/12): Placa de exhibición con 3 servicios
- Sin fotos stock, solo patrones custom
- Animaciones suaves con Motion

## Tipografía

- **Sora**: Headings (letter-spacing: `-0.015em`)
- **Inter**: Body text (line-height: `1.7`, letter-spacing: `0.01em`)
- Mayor aire en lectura, jerarquías claras

## Esquinas & Radios

- Cards museo: `rounded-3xl` (24px)
- Buttons: `rounded-xl` (16px)
- Inputs: `rounded-2xl` (20px)
- Pequeños elementos: `rounded-lg` (12px)

## Microinteracciones

### Hover States
- Elevación: 2-6px
- Duración: 300-350ms
- Easing: `[0.22, 1, 0.36, 1]` (ease-out-expo)
- Brillo dorado leve en bordes

### Transiciones
- Scroll reveals: fade + slight translate
- Filtros: 200-300ms
- Evitar efectos llamativos o neón

## Accesibilidad

- Contraste mínimo: **4.5:1** (WCAG 2.2 AA)
- Focus visible: anillo dorado con offset
- Estados claros en toggles y filtros
- Tamaños de texto legibles (min 14px body)

## Uso

Importar componentes:
```tsx
import { HeroStudio, MuseumPattern, MuseumDivider } from '@/components/museum';
```

El sistema se activa automáticamente en modo Studio gracias a la clase `.studio-mode` en el `<html>`.
