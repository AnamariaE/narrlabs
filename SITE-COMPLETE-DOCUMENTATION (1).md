# 📘 Documentación Completa del Sitio — NarrLab + Anamaría Espinoza Portfolio

**Última actualización:** 19 Marzo 2025

---

## 🎯 Propósito del Sitio

Sitio web **bilingüe (ES/EN)** que funciona como:

1. **Portafolio personal** de Anamaría Espinoza (diseñadora instruccional y multimedia)
2. **Sitio corporativo** de NarrLab Studio (estudio de diseño de experiencias pedagógicas)

El sitio cambia completamente su identidad visual, navegación y contenido según el **Brand Mode** activo:
- **Personal Mode**: Paleta morada "Cosmic Editorial Diary" enfocada en el trabajo individual de Anamaría
- **Studio Mode**: Paleta cálida "Retro-Cosmic Museum" enfocada en NarrLab como estudio

---

## 🏗️ Arquitectura Técnica

### Stack
- **React** con **TypeScript**
- **React Router** (Data Mode) para navegación multi-página
- **Tailwind CSS v4** para estilos
- **Motion** (ex Framer Motion) para animaciones
- **Lucide React** para iconografía

### Estructura de Carpetas Clave

```
/
├── App.tsx                    # Entry point con RouterProvider
├── routes.tsx                 # Configuración de rutas (React Router)
├── components/
│   ├── Navigation.tsx         # Navbar adaptativa según Brand Mode
│   ├── Footer.tsx             # Footer global
│   ├── ProtectedContent.tsx   # Componente para proteger contenido con contraseña
│   ├── ProjectCard.tsx        # Card de proyecto (grid portafolio)
│   ├── MasonryGrid.tsx        # Layout masonry animado
│   ├── museum/                # Sistema de diseño "Retro-Cosmic Museum"
│   │   ├── HeroStudio.tsx     # Hero editorial para Studio mode
│   │   ├── MuseumPattern.tsx  # Patrones de fondo (streamline/constellation)
│   │   ├── MuseumDivider.tsx  # Separadores decorativos
│   │   ├── MuseumPlaque.tsx   # Cards tipo "ficha de museo"
│   │   ├── MuseumCallout.tsx  # Callouts decorativos
│   │   ├── CuratorBoard.tsx   # Tablero drag-and-drop (interactivo)
│   │   └── ArchiveTabs.tsx    # Pestañas estilo archivo museo
│   ├── personal/              # Sistema de diseño "Cosmic Editorial Diary"
│   │   ├── CosmicPattern.tsx  # Patrones cósmicos morados
│   │   └── CosmicDivider.tsx  # Separadores cosmic
│   └── ui/                    # shadcn/ui components (buttons, inputs, etc.)
├── pages/
│   ├── HomePage.tsx           # Portfolio grid + Hero (studio mode) o AboutPage (personal mode)
│   ├── AboutPage.tsx          # Página "About Anamaría" (personal)
│   ├── StudioPage.tsx         # Home de NarrLab Studio
│   ├── WhyNarrLabPage.tsx     # "¿Por qué NarrLab?" (filosofía del estudio)
│   ├── GamificationPage.tsx   # Página dedicada a Gamificación
│   ├── ConsultingPage.tsx     # Servicios de consultoría
│   ├── ContactPage.tsx        # Formulario de contacto
│   ├── CVPage.tsx             # CV imprimible (estructura ATS)
│   ├── ProjectDetailPage.tsx  # Página individual de proyecto (/project/:slug)
│   ├── HumanidadesDigitalesPage.tsx  # Proyecto de Humanidades Digitales
│   └── PodcastPage.tsx        # Podcast "Profesora Neón"
├── data/
│   └── site-data.ts           # Base de datos central (proyectos, skills, servicios)
├── lib/
│   ├── brand-context.tsx      # Context para Brand Mode (personal/studio)
│   ├── i18n-context.tsx       # Context para idioma (ES/EN)
│   └── consent-context.tsx    # Context para cookies/analytics
└── styles/
    └── globals.css            # CSS global con custom properties para ambos modos
```

---

## 🎨 Sistema de Diseño Dual

### Personal Mode: "Cosmic Editorial Diary"

**Paleta de Colores:**
```css
--personal-bg: #F2EADF;           /* Fondo beige cálido */
--personal-surface: #FFFFFF;      /* Tarjetas blancas */
--personal-ink: #1E1940;          /* Texto principal (morado oscuro) */
--personal-primary: #5B44F2;      /* Morado vibrante (CTA, links) */
--personal-accent: #8466F2;       /* Morado claro (acentos) */
--personal-border: rgba(49, 39, 115, 0.18); /* Bordes suaves */
```

**Filosofía Visual:**
- Minimal elegante con toques editoriales
- Tipografía espaciada, jerarquías claras
- Patterns cósmicos sutiles (estrellas, nebulosas)
- Animaciones suaves, sin efectos bruscos

**Componentes Clave:**
- `<CosmicPattern />` — Patrones de fondo con estrellas/nodos
- `<CosmicDivider />` — Separadores con líneas y partículas

---

### Studio Mode: "Retro-Cosmic Museum"

**Paleta de Colores:**
```css
--museum-night: #121126;       /* Azul marino oscuro */
--museum-slate: #274259;       /* Azul grisáceo */
--museum-parchment: #F2BF80;   /* Fondo pergamino cálido */
--museum-surface: #F2EADF;     /* Superficie beige */
--museum-copper: #D95032;      /* Terracota/cobre (CTA) */
--museum-stardust: #F2AE2E;    /* Dorado (acentos, bordes) */
```

**Filosofía Visual:**
- Galería museo premium: elegante, futurista-vintage, cálida
- Inspiración: **Streamline Moderne** + **Stardust Art Nouveau**
- Editorial minimal con microinteracciones sutiles
- Patterns geométricos (líneas aerodinámicas, constelaciones)

**Componentes Clave:**
- `<HeroStudio />` — Hero editorial de dos columnas con tarjetas flippables
- `<MuseumPattern variant="combined" />` — Fondo con streamlines + constellation
- `<MuseumDivider variant="constellation" />` — Separadores con sparkles
- `<MuseumPlaque variant="featured" />` — Tarjetas tipo "ficha de museo"
- `<MuseumCallout />` — Callouts decorativos con bordes dorados
- `<CuratorBoard />` — Tablero drag-and-drop interactivo
- `<ArchiveTabs />` — Pestañas estilo archivo de museo

**Radios y Esquinas:**
- Cards museo: `rounded-3xl` (24px)
- Buttons: `rounded-xl` (16px)
- Inputs: `rounded-2xl` (20px)

**Microinteracciones:**
- Hover: Elevación 2-6px + brillo dorado en bordes
- Duración: 300-350ms
- Easing: `[0.22, 1, 0.36, 1]` (ease-out-expo)

---

## 🌐 Sistema de Internacionalización (i18n)

**Contexto:** `lib/i18n-context.tsx`

**Idiomas soportados:**
- Español (ES) — default
- English (EN)

**Cómo funciona:**
- Context Provider con hook `useI18n()`
- Guarda preferencia en `localStorage`
- Toggle en navegación (icono Globe)

**Uso:**
```tsx
const { language, setLanguage, t } = useI18n();

<h1>{t('hero.title')}</h1>
<button onClick={() => setLanguage('en')}>Switch to English</button>
```

**Contenido Bilingüe en site-data.ts:**
Todos los proyectos tienen campos `_es` y `_en`:
```ts
{
  title: "Título único (no traducido)",
  summary_es: "Resumen en español",
  summary_en: "Summary in English",
  description_es: "...",
  description_en: "..."
}
```

---

## 🎭 Brand Mode System

**Contexto:** `lib/brand-context.tsx`

**Modos:**
- `personal` — Portfolio de Anamaría Espinoza
- `studio` — NarrLab Studio

**Cómo funciona:**
- Context Provider con hook `useBrand()`
- Guarda preferencia en `localStorage`
- Añade clase `.studio-mode` al `<html>` cuando activo
- CSS global (`styles/globals.css`) aplica paletas según la clase

**Impacto del Brand Mode:**

| Aspecto | Personal Mode | Studio Mode |
|---------|--------------|-------------|
| **Home** | `AboutPage` (sobre Anamaría) | `StudioPage` (sobre NarrLab) |
| **Navegación** | Home, CV, Consulting, Gamification, Podcast, Contact | Home, Portfolio, ¿Por qué NarrLab? (dropdown), Consulting, Contact |
| **Proyectos** | Todos los proyectos | Solo `isStudioProject !== false` |
| **Paleta** | Morada "Cosmic Editorial Diary" | Cálida "Retro-Cosmic Museum" |
| **Componentes** | `<CosmicPattern />`, `<CosmicDivider />` | `<HeroStudio />`, `<MuseumPattern />`, etc. |

**Toggle de Brand:**
- En Footer, hay un switcher visual (logo NarrLab vs nombre Anamaría)
- Cambia todo el sitio instantáneamente

---

## 📄 Páginas y Rutas

### Estructura de Routing (`routes.tsx`)

```tsx
{
  path: "/",
  Component: RootLayout,  // Incluye <Navigation /> + <Footer />
  children: [
    { index: true, Component: HomeWrapper },  // Cambia según Brand Mode
    { path: "portfolio", Component: HomePage },
    { path: "cv", Component: CVPage },
    { path: "about", Component: AboutPage },
    { path: "contact", Component: ContactPage },
    { path: "consulting", Component: ConsultingPage },
    { path: "gamification", Component: GamificationPage },
    { path: "humanidades-digitales", Component: HumanidadesDigitalesPage },
    { path: "podcast", Component: PodcastPage },
    { path: "studio", Component: StudioPage },
    { path: "project/:slug", Component: ProjectDetailPage },
    { path: "why-narrlab", Component: WhyNarrLabPage },
    { path: "*", Component: NotFound },
  ]
}
```

### HomeWrapper (Ruta `/`)
- **Personal Mode:** muestra `<AboutPage />`
- **Studio Mode:** muestra `<StudioPage />`

### Páginas Detalladas

#### 1. **HomePage** (`/portfolio`)
**Composición:**
- Hero diferenciado:
  - **Studio Mode:** `<HeroStudio />` con claim de NarrLab, 3 servicios en tarjetas flippables
  - **Personal Mode:** Hero con imagen de fondo, título personal
- Sección de servicios (solo Studio Mode)
- Grid de proyectos filtrable:
  - Filtros por categoría (badges interactivos)
  - Buscador (input con lupa)
  - Layout masonry animado con Motion
  - Cada proyecto es un `<ProjectCard />` con hover effects
- **Curator Mode** (toggle experimental): drag-and-drop para organizar proyectos
- Solo en Studio Mode muestra el grid completo; en Personal Mode solo featured projects

**Filtrado de Proyectos:**
- Categorías disponibles: "Instructional Design", "Branding", "Multimedia", "Studio/Freelance", "CRS", "Wikimedia", etc.
- En Studio Mode: solo proyectos con `isStudioProject !== false`
- Buscador: busca en `title`, `summary_es`, `summary_en`, `tags`

#### 2. **StudioPage** (`/studio` o `/` en Studio Mode)
**Composición:**
- Hero editorial con claim de NarrLab
- 3 tarjetas flippables de servicios (click para voltear)
- Sección "¿Qué hacemos?" con valores del estudio
- Sección de casos destacados (featured projects)
- CTAs hacia Portfolio, Contact, Why NarrLab

#### 3. **WhyNarrLabPage** (`/why-narrlab`)
**Composición:**
- Filosofía del estudio: claim extendido, valores
- Patrones museum en fondo
- Secciones con `<MuseumPlaque />`
- Narrativa sobre "abstraer lo esencial y volverlo experiencia pedagógica"
- Conecta con servicios de Consulting y Gamification

#### 4. **GamificationPage** (`/gamification`)
**Composición:**
- Página dedicada a la metodología de gamificación
- Framework propio: narrativa, mecánicas, estética
- Casos de estudio (GAAP, Wikimedia Learning)
- Diagramas de flujo (importados desde Markdown)
- Proceso paso a paso
- CTA hacia Consulting

#### 5. **ConsultingPage** (`/consulting`)
**Composición:**
- Servicios de consultoría divididos en áreas:
  - Diseño Instruccional
  - Gamificación
  - Comunidades de aprendizaje
  - Branding educativo
- Proceso de trabajo (Discovery → Design → Develop → Deploy)
- Testimonios (si aplica)
- CTA hacia Contact

**Importante:** Se corrigió un bug crítico donde objetos bilingües `{es, en}` se renderizaban directamente. Se añadió función helper `getText()` que selecciona el idioma correcto.

#### 6. **ContactPage** (`/contact`)
**Composición:**
- Formulario de contacto (nombre, email, mensaje)
- Email ofuscado usando `<ObfuscatedEmail />` para evitar spam bots
- Links a redes sociales (LinkedIn, Behance, Wikimedia Commons)
- Información de contacto del estudio

#### 7. **CVPage** (`/cv`)
**Composición:**
- CV completo de Anamaría Espinoza
- **Estructura ATS-friendly** (Applicant Tracking System)
- Componente `<CVByFocus />` que agrupa experiencia por áreas:
  - Learning Experience Design
  - Instructional Design
  - Community Programs
  - Multimedia Production
- Versión imprimible (CSS print optimizado)
- Botón de descarga PDF

#### 8. **ProjectDetailPage** (`/project/:slug`)
**Composición:**
- Página individual de proyecto dinámica según slug
- Hero con imagen de portada
- Metadata: cliente, año, rol, categorías, tags
- Descripción completa bilingüe
- Galería de imágenes
- Lista de servicios/deliverables
- Herramientas usadas (badges)
- Navegación a proyecto anterior/siguiente
- CTA para contactar

#### 9. **AboutPage** (`/about`)
**Composición:**
- Biografía de Anamaría Espinoza
- Skills y herramientas
- Idiomas
- Trayectoria profesional
- Foto de perfil
- Links a portfolio externo (Google Sites, Behance)

#### 10. **PodcastPage** (`/podcast`)
**Composición:**
- Información sobre "Profesora Neón"
- Embed de Spotify o link externo
- Episodios destacados
- Filosofía del podcast (filosofía y ciencias sociales en lenguaje pop)

#### 11. **HumanidadesDigitalesPage** (`/humanidades-digitales`)
**Composición:**
- Proyecto de Humanidades Digitales
- Contexto académico
- Metodología
- Resultados

---

## 📦 Sistema de Datos (`data/site-data.ts`)

**Estructura Central:**

```ts
export const siteData = {
  person: {
    name: "Anamaría Espinoza",
    role: "Learning Experience & Community Education Lead",
    location: "Zaragoza, ES",
    portfolio_url: "...",
    behance_url: "...",
    commons_url: "..."
  },
  
  social: {
    email: "aespinoza@narrlab.studio",
    linkedin: "...",
    github: "",
    x: ""
  },
  
  skills: ["Instructional Design", "LXD", "Gamification", ...],
  tools: ["Moodle", "Canvas", "Adobe CC", ...],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "English", level: "Advanced" }
  ],
  
  studio: {
    brand: "NarrLab",
    claim: "Abstraemos lo esencial y lo volvemos experiencia pedagógica.",
    services_es: [...],
    services_en: [...],
    service_descriptions_es: [...],
    service_descriptions_en: [...]
  },
  
  projects: [
    {
      slug: "proyecto-slug",
      title: "Título del Proyecto",
      category: "Branding",  // Categoría legacy
      categories: ["Studio/Freelance", "Branding"],  // Nuevo sistema dual
      year: 2025,
      client: "Cliente XYZ",
      isStudioProject: true,  // true = aparece en Studio Mode
      isFeatured: true,        // true = aparece en sección destacados
      role_es: "Rol en español",
      role_en: "Role in English",
      summary_es: "Resumen corto ES",
      summary_en: "Short summary EN",
      description_es: "Descripción larga ES",
      description_en: "Long description EN",
      cover_image: "https://...",
      gallery_images: ["https://...", ...],
      services_es: ["Servicio 1", "Servicio 2"],
      services_en: ["Service 1", "Service 2"],
      tools: ["Figma", "Illustrator"],
      tags: ["Branding", "Identity", "Coffee"],
      status: "Lanzado y en mercado",
      external_url: "https://..."  // Opcional
    },
    // ... más proyectos
  ]
}
```

**Proyectos Destacados (2025):**
1. **Toteramy** — Branding completo para café de especialidad peruano
2. **Profesora Neón** — Podcast de filosofía y ciencias sociales
3. **GAAP** — Curso gamificado de microfinanzas comunitarias (CRS)
4. **Wikimedia Learning** — Programa de aprendizaje para comunidades
5. **UCA** — Diseño de identidad para universidad centroamericana

---

## 🔐 Protección de Contenido (`ProtectedContent.tsx`)

**Nueva funcionalidad (19 Mar 2025):** Componente para proteger secciones con contraseña.

**Props:**
```tsx
<ProtectedContent
  password="cliente123"        // Contraseña para desbloquear
  id="seccion-unica"          // ID único (para localStorage)
  title="Contenido Protegido" // Título personalizado (opcional)
  description="Ingresa..."    // Descripción (opcional)
  placeholder="Contraseña"    // Placeholder input (opcional)
>
  <div>Contenido secreto aquí</div>
</ProtectedContent>
```

**Características:**
- ✅ Guarda contraseña en `localStorage` (persistente)
- ✅ Bilingüe (ES/EN según idioma activo)
- ✅ Preview borroso del contenido bloqueado
- ✅ Toggle para mostrar/ocultar password
- ✅ Botón flotante para re-bloquear (hover)
- ✅ Animaciones: shake en error, fade in
- ✅ Múltiples instancias con diferentes passwords

**Casos de Uso:**
- Proteger proyectos NDA con contraseña compartida con cliente
- Ocultar secciones work-in-progress
- Contenido exclusivo para clientes específicos

---

## 🧩 Componentes Clave

### Navigation (`Navigation.tsx`)
- **Navbar sticky** con backdrop blur
- Aparece al hacer scroll (100px)
- Cambia según Brand Mode:
  - **Personal:** Home, CV, Consulting, Gamificación, Podcast, Contact
  - **Studio:** Home, Portfolio, ¿Por qué NarrLab? (dropdown con Gamificación), Consulting, Contact
- Toggle de idioma (icono Globe)
- Logo NarrLab en Studio Mode
- Responsive: menú hamburguesa en mobile

### Footer (`Footer.tsx`)
- Links rápidos
- Brand Mode switcher (logo NarrLab ↔ nombre Anamaría)
- Redes sociales
- Email ofuscado
- Copyright

### ProjectCard (`ProjectCard.tsx`)
- Card de proyecto para grid
- Hover: elevación + brillo
- Muestra: imagen cover, título, categorías (badges), año
- Click: navega a `/project/:slug`
- Adapta colores según Brand Mode

### MasonryGrid (`MasonryGrid.tsx`)
- Layout masonry responsive
- Animaciones de entrada con Motion (stagger)
- 3 columnas en desktop, 2 en tablet, 1 en mobile
- Optimizado con `react-responsive-masonry`

### ProtectedContent (`ProtectedContent.tsx`)
- Ver sección **Protección de Contenido** arriba

### ObfuscatedEmail (`ObfuscatedEmail.tsx`)
- Muestra email sin exponerlo a bots scraping
- Codifica email en base64 o similar
- Evita spam

### CookieConsentBanner (`CookieConsentBanner.tsx`)
- Banner de consentimiento de cookies (GDPR)
- Opciones: Aceptar todo, Rechazar todo, Personalizar
- Guarda preferencias en `localStorage`

### Museum Components (Sistema de Diseño Studio)
Ver sección **Sistema de Diseño Dual → Studio Mode** arriba.

---

## 🎨 Estilos y Theming

### Tailwind CSS v4
- **No** usar `tailwind.config.js` (no soportado en v4)
- Tokens CSS custom en `styles/globals.css`
- Responsive: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

### Typography
- **Headings:** Sora (sans-serif moderna)
- **Body:** Inter (legible, profesional)
- **Handwriting (accent):** Caveat (solo elementos decorativos)

**Reglas:**
- ❌ NO usar clases de Tailwind para `font-size`, `font-weight`, `line-height` (definidos en globals.css)
- ✅ Usar clases para `color`, `spacing`, `layout`, `responsive`

### Dark Mode
- Soportado pero no prioritario
- CSS variables cambian en `.dark`
- Toggle manual (no implementado aún en UI)

---

## ♿ Accesibilidad (WCAG 2.2 AA)

**Cumplimiento:**
- ✅ Contraste mínimo 4.5:1 en textos
- ✅ Focus visible en todos los interactivos
- ✅ Skip-to-content link (screen reader)
- ✅ ARIA labels en iconos sin texto
- ✅ Semántica HTML correcta (`<nav>`, `<main>`, `<section>`, etc.)
- ✅ Imágenes con `alt` descriptivo
- ✅ Keyboard navigation completa
- ✅ No usar solo color para información crítica

**Herramientas Usadas:**
- Screen reader testing
- Lighthouse audits
- axe DevTools

---

## 📊 Analytics y Cookies

**Integración:**
- Google Analytics 4 (opcional)
- Context de consentimiento (`lib/consent-context.tsx`)
- Solo trackea si usuario acepta cookies analíticas

**GDPR Compliance:**
- Banner de cookies al entrar
- Opciones: Aceptar, Rechazar, Personalizar
- Guarda consentimiento en `localStorage`

---

## 🚀 Performance

**Optimizaciones:**
- Lazy loading de imágenes (`loading="lazy"`)
- `React.memo()` en componentes pesados (FlippableCard, ProjectCard)
- `useMemo()` para filtrado de proyectos
- Motion animations optimizadas (GPU-accelerated)
- Code splitting con React Router

---

## 🖼️ Assets y Recursos

### Imágenes Externas
- **NarrLab Logo:** `https://narrlab.studio/img/isotipo-narralab.png`
- **NarrLab Full Logo:** `https://narrlab.studio/img/LogoNarrlabs.png`
- **Proyecto Covers:** Alojadas en `https://www.narrlab.studio/Assets/`

### Unsplash Integration
- Herramienta: `unsplash_tool()` para generar imágenes on-demand
- Usar para placeholders, hero backgrounds, etc.
- Siempre con `ImageWithFallback` component

### SVGs
- Iconos: Lucide React (importar como componentes)
- SVGs custom: En `/imports/svg-*` (importados desde Figma)

---

## 🔧 Estado Actual del Proyecto (19 Marzo 2025)

### ✅ Completado
- [x] Arquitectura de routing completa (React Router Data Mode)
- [x] Sistema de Brand Mode (Personal/Studio) funcional
- [x] Sistema i18n (ES/EN) completo
- [x] Diseño museo "Retro-Cosmic Museum" con componentes completos
- [x] Diseño personal "Cosmic Editorial Diary"
- [x] Navbar adaptativa con dropdown "¿Por qué NarrLab?"
- [x] Todas las páginas principales implementadas
- [x] Grid de portafolio con filtros y búsqueda
- [x] CV imprimible (estructura ATS)
- [x] Páginas de proyecto individuales dinámicas
- [x] Footer con Brand switcher
- [x] Cookie consent system
- [x] Componente `ProtectedContent` para proteger secciones
- [x] Bug fix en ConsultingPage: objetos bilingües renderizando mal

### 🔄 En Progreso
- [ ] Analytics setup completo (Google Analytics 4)
- [ ] SEO metadata (Open Graph, Twitter Cards)
- [ ] Sitemap XML y robots.txt
- [ ] Performance audit y optimizaciones finales

### 💡 Backlog / Ideas Futuras
- [ ] Blog section (para artículos/essays)
- [ ] Newsletter signup
- [ ] Case studies en profundidad (páginas largas tipo Medium)
- [ ] Animaciones de scroll más complejas (Lottie, GSAP)
- [ ] Filtro por múltiples categorías simultáneas
- [ ] Sistema de comentarios en proyectos
- [ ] Versión móvil del Curator Board

---

## 🐛 Bugs Conocidos Resueltos

### 1. Objetos bilingües renderizando directamente (✅ Resuelto)
**Problema:** En `ConsultingPage.tsx`, objetos como `{es: "texto", en: "text"}` se renderizaban como `[object Object]`.

**Solución:** Se añadió función helper:
```tsx
const getText = (content: { es: string; en: string }) => 
  language === 'es' ? content.es : content.en;

// Uso:
<h2>{getText(content.services.instructionalDesign.title)}</h2>
```

### 2. Navegación Studio con demasiados ítems (✅ Resuelto)
**Problema:** Menu horizontal muy largo (Home, Portfolio, Why NarrLab, Gamification, Consulting, Contact).

**Solución:** Se convirtió "¿Por qué NarrLab?" en dropdown con "Gamificación" como submenú.

---

## 📝 Notas de Desarrollo

### Importaciones de Imágenes
- **Raster images (PNG, JPG):** usar `figma:asset/hash.png` (NO prefijos de path)
- **SVGs:** importar con path relativo desde `/imports/svg-*`
- **Nuevas imágenes:** usar `<ImageWithFallback />` de `/src/app/components/figma/ImageWithFallback.tsx`

### Protected Files
❌ **NO modificar:**
- `/src/app/components/figma/ImageWithFallback.tsx`

### Convenciones de Código
- Componentes: PascalCase (`ProjectCard.tsx`)
- Hooks: camelCase con prefijo `use` (`useI18n.ts`)
- Constantes: UPPER_SNAKE_CASE
- CSS custom props: kebab-case (`--museum-copper`)

### Git Workflow
- Commits descriptivos en inglés
- Branch naming: `feature/nombre`, `fix/nombre`, `docs/nombre`

---

## 🎯 Claim de NarrLab

**Español:**
> "Abstraemos lo esencial y lo volvemos experiencia pedagógica."

**English:**
> "Where pedagogy becomes design."

---

## 📞 Contacto

**Anamaría Espinoza**
- Email: aespinoza@narrlab.studio
- LinkedIn: [linkedin.com/in/anamariaespinoza](https://linkedin.com/in/anamariaespinoza)
- Behance: [behance.net/anamariaespinoza](https://www.behance.net/anamariaespinoza)
- Wikimedia Commons: [User:Anamaria_Espinoza](https://commons.wikimedia.org/wiki/Category:User:Anamaria_Espinoza)

**NarrLab Studio**
- Web: [narrlab.studio](https://narrlab.studio)
- Email: aespinoza@narrlab.studio

---

## 🏁 Resumen para Claude

**Si eres Claude leyendo esto en el futuro:**

Este es un sitio web bilingüe (ES/EN) con **doble personalidad visual** que cambia completamente según el Brand Mode:

1. **Personal Mode** (morado "Cosmic Editorial Diary") → Portfolio de Anamaría Espinoza
2. **Studio Mode** (cálido "Retro-Cosmic Museum") → Sitio corporativo de NarrLab

**Tecnologías clave:**
- React + TypeScript + React Router
- Tailwind CSS v4 con tokens custom
- Motion para animaciones
- Sistema de diseño completo en `/components/museum/`

**Páginas principales:**
- `/` → Home (cambia según Brand Mode)
- `/portfolio` → Grid de proyectos filtrable
- `/cv` → CV imprimible ATS-friendly
- `/project/:slug` → Detalles de proyecto
- `/consulting` → Servicios de consultoría
- `/gamification` → Metodología de gamificación
- `/contact` → Formulario de contacto

**Funcionalidades especiales:**
- Brand switcher (footer)
- i18n ES/EN (context)
- Protección de contenido con contraseña (`<ProtectedContent />`)
- Grid masonry animado con filtros
- Cookie consent system

**Paletas:**
- Personal: `#5B44F2` (morado primary), `#F2EADF` (beige bg)
- Studio: `#D95032` (terracota primary), `#F2BF80` (pergamino bg)

**Data central:** `/data/site-data.ts` (proyectos, skills, servicios)

**Accesibilidad:** WCAG 2.2 AA compliant

**Claim de NarrLab:** "Abstraemos lo esencial y lo volvemos experiencia pedagógica."

¡Ya tienes todo el contexto para ayudar al usuario! 🚀
