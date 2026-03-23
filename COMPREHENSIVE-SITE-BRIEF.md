# 📘 Comprehensive Site Brief — Anamaría Espinoza Portfolio & CV

## 🎯 Propósito General

Sitio web bilingüe (ES/EN) de portafolio profesional y CV para **Anamaría Espinoza**, diseñadora instruccional y multimedia. El sitio presenta dos identidades visuales diferenciadas que conviven en la misma aplicación:

1. **Modo Personal** ("Cosmic Editorial Diary"): Portafolio personal de Anamaría con paleta morada/lila
2. **Modo Studio** ("Retro-Cosmic Museum"): Marca profesional de su estudio **NarrLab** con paleta cálida terracota/dorada

El usuario puede cambiar entre ambos modos usando un toggle en la navegación, y cada modo muestra diferente contenido, navegación, colores y componentes visuales.

---

## 🏗️ Arquitectura del Sitio

### Stack Técnico
- **React 18** con TypeScript
- **React Router** para navegación basada en URLs
- **Tailwind CSS v4.0** (sin archivo de configuración)
- **Motion (Framer Motion)** para animaciones
- **Shadcn/UI** para componentes base
- **Lucide React** para iconografía
- **Tipografías**: Sora (headings) + Inter (body)

### Estructura de Archivos Clave

```
/
├── App.tsx                         # Punto de entrada con RouterProvider
├── routes.tsx                      # Configuración de rutas de React Router
├── components/
│   ├── Navigation.tsx              # Barra nav sticky con toggle modo/idioma
│   ├── Footer.tsx                  # Footer bilingüe con links sociales
│   ├── ProjectCard.tsx             # Tarjeta de proyecto para grids
│   ├── MasonryGrid.tsx             # Grid masonry animado
│   ├── CVByFocus.tsx               # CV organizado por áreas de enfoque
│   ├── BadgeSlider.tsx             # Slider de badges para skills/tools
│   ├── ObfuscatedEmail.tsx         # Email ofuscado anti-bots
│   ├── CookieConsentBanner.tsx     # Banner RGPD de cookies
│   ├── CookieSettings.tsx          # Panel de configuración de cookies
│   ├── ErrorBoundary.tsx           # Error boundary para manejo de errores
│   ├── museum/                     # Sistema de diseño "Museo Retro-Cósmico" (Studio)
│   │   ├── HeroStudio.tsx          # Hero editorial para StudioPage
│   │   ├── MuseumPattern.tsx       # Patrones de fondo (streamline/constellation)
│   │   ├── MuseumDivider.tsx       # Separadores decorativos
│   │   ├── MuseumPlaque.tsx        # Tarjetas tipo "ficha de museo"
│   │   ├── MuseumCallout.tsx       # Callouts estilo placa museo
│   │   ├── CuratorBoard.tsx        # Tablero "modo curador" con drag&drop
│   │   ├── ArchiveTabs.tsx         # Tabs archivo/curador
│   │   ├── DraggableProjectCard.tsx # Card arrastrables para CuratorBoard
│   │   └── DropColumn.tsx          # Columnas drop zone para curador
│   ├── personal/                   # Sistema de diseño "Cosmic Editorial Diary" (Personal)
│   │   ├── CosmicPattern.tsx       # Patrones de fondo cósmicos
│   │   └── CosmicDivider.tsx       # Separadores tipo "speed-line" editorial
│   └── ui/                         # Componentes Shadcn base
├── pages/
│   ├── HomePage.tsx                # Portafolio (grid filtrable en Studio, featured en Personal)
│   ├── CVPage.tsx                  # CV imprimible optimizado ATS
│   ├── ProjectDetailPage.tsx       # Detalle de proyectos individuales
│   ├── AboutPage.tsx               # Página "Acerca de"
│   ├── ContactPage.tsx             # Formulario de contacto
│   ├── StudioPage.tsx              # Página principal de NarrLab (modo Studio)
│   ├── ConsultingPage.tsx          # Servicios de consultoría
│   ├── GamificationPage.tsx        # Caso de estudio: Gamificación
│   ├── HumanidadesDigitalesPage.tsx # Caso de estudio: Humanidades digitales
│   └── PodcastPage.tsx             # Landing page del podcast "Profesora Neón"
├── lib/
│   ├── i18n-context.tsx            # Contexto de internacionalización ES/EN
│   ├── brand-context.tsx           # Contexto de modo Personal/Studio
│   └── consent-context.tsx         # Contexto de consentimiento de cookies
├── data/
│   └── site-data.ts                # Datos centralizados del sitio
└── styles/
    └── globals.css                 # Estilos globales y paletas de color
```

---

## 🎨 Paletas de Color y Sistema Visual

### MODO PERSONAL — "Cosmic Editorial Diary"

**Filosofía**: Minimalismo editorial contemporáneo con toques cósmicos sutiles. Inspirado en publicaciones de diseño y revistas de vanguardia. Limpio, aspiracional, sofisticado.

**Paleta de Colores**:
```css
--personal-bg: #F2EADF           /* Background cálido crema */
--personal-surface: #FFFFFF      /* Cards y superficies */
--personal-ink: #1E1940          /* Texto principal (casi negro) */
--personal-muted-ink: rgba(30, 25, 64, 0.70)  /* Texto secundario */
--personal-primary: #5B44F2      /* Primario morado vibrante */
--personal-primary-hover: #3A29A6  /* Hover del primario */
--personal-accent: #8466F2       /* Acento lila más claro */
--personal-border: rgba(49, 39, 115, 0.18)  /* Bordes sutiles */
--personal-highlight: rgba(132, 102, 242, 0.12)  /* Highlights de fondo */
```

**Componentes Exclusivos Personal**:
- `CosmicPattern`: Patrones de fondo sutiles (puntos, líneas, combinados)
- `CosmicDivider`: Separadores tipo "speed-line" editorial con puntos decorativos

**Uso Visual**:
- Fondos limpios sin fotos stock en hero
- Tarjetas blancas con bordes delicados
- Patrones cósmicos apenas perceptibles (opacity 20-30%)
- Animaciones suaves y elegantes
- Mayor aire blanco y espaciado

---

### MODO STUDIO — "Museo Retro-Cósmico"

**Filosofía**: Galería museo premium con toques Streamline Moderne + Stardust Art Nouveau. Cálido, vintage-futurista, editorial, museístico. Inspirado en museos de ciencia retro-futuristas de los años 30-50.

**Paleta de Colores**:
```css
--color-night: #121126          /* Texto principal oscuro */
--color-slate: #274259          /* Acento frío tipo "midnight blue" */
--color-parchment: #F2BF80      /* Background principal cálido "pergamino" */
--color-surface: #F2EADF        /* Cards y superficies "papel museo" */
--color-copper: #D95032         /* Primario terracota/cobre */
--color-copper-hover: #F24738   /* Hover del copper */
--color-stardust: #F2AE2E       /* Acento dorado "polvo de estrellas" */
```

**Sistema de Diseño Museum** (`/components/museum/`):

#### `MuseumPattern`
Patrones decorativos de fondo para secciones:
- **streamline**: Líneas horizontales aerodinámicas estilo Art Déco
- **constellation**: Puntos tipo constelación conectados
- **combined**: Ambos + glow spots
```tsx
<MuseumPattern variant="combined" className="opacity-40" />
```

#### `MuseumDivider`
Separadores decorativos entre secciones:
- **line**: Gradiente dorado simple horizontal
- **constellation**: Puntos + sparkles decorativos
- **streamline**: Línea curva con nodo central
```tsx
<MuseumDivider variant="constellation" />
```

#### `MuseumPlaque`
Tarjetas tipo "ficha de museo" con esquinas decorativas:
- Variantes: `default`, `featured`, `mini`
- Incluye bordes dorados, corners decorativos, sombras sutiles
- Overline + título + contenido + opcional footer
```tsx
<MuseumPlaque 
  title="Título" 
  subtitle="OVERLINE EN MAYÚSCULAS"
  variant="featured"
>
  Contenido aquí
</MuseumPlaque>
```

#### `MuseumCallout`
Callouts estilo placa de museo con fondo cálido y bordes dorados:
```tsx
<MuseumCallout title="Nota importante">
  Contenido destacado
</MuseumCallout>
```

#### `HeroStudio`
Hero editorial de dos columnas para StudioPage:
- Columna izquierda (7/12): Claim de NarrLab + descripción + CTAs
- Columna derecha (5/12): "Placa de exhibición" con servicios destacados
- Sin fotos stock, solo patrones custom
- Animaciones suaves con Motion
```tsx
<HeroStudio
  brand="NarrLab"
  claim="Abstraemos lo esencial y lo volvemos experiencia pedagógica."
  onViewPortfolio={() => scrollTo('#portfolio')}
  onAbout={() => navigate('/studio')}
  language="es"
/>
```

#### `CuratorBoard` + `ArchiveTabs`
Modo interactivo "curador de museo" con drag & drop:
- `ArchiveTabs`: Toggle entre vista portfolio y modo curador
- `CuratorBoard`: Tablero con columnas (Favoritos, Para revisar, Archivados)
- `DraggableProjectCard`: Cards arrastrables usando react-dnd
- `DropColumn`: Zonas de drop para organizar proyectos

**Características del Modo Curador**:
- Permite al visitante "jugar a ser curador" organizando proyectos
- Mensaje lúdico: "si tienes tiempo juguemos!" / "if you have time let's play!"
- Drag & drop entre columnas
- Invitación a conectar si el visitante lo encuentra útil

**Uso Visual**:
- Backgrounds cálidos (parchment #F2BF80)
- Cards en superficie clara (#F2EADF)
- Bordes y acentos dorados (#F2AE2E)
- CTAs en copper (#D95032)
- Esquinas redondeadas generosas (rounded-3xl para cards)
- Microinteracciones museísticas (hover con brillo dorado sutil)

---

## 🌐 Sistema de Routing (React Router)

### URLs Disponibles

```
/                           → HomeWrapper (AboutPage en personal, StudioPage en studio)
/portfolio                  → HomePage (grid de proyectos)
/cv                         → CVPage
/about                      → AboutPage
/contact                    → ContactPage
/consulting                 → ConsultingPage
/gamification               → GamificationPage
/humanidades-digitales      → HumanidadesDigitalesPage
/podcast                    → PodcastPage
/studio                     → StudioPage
/project/:slug              → ProjectDetailPage con slug dinámico
/*                          → NotFound (404)
```

### Navegación Según Modo

**Modo Personal** (nav items):
- Home
- CV
- Consulting
- Gamificación
- Podcast
- Contact

**Modo Studio** (nav items):
- Home
- Portfolio
- Consulting
- Gamificación
- Contact

**Comportamiento del Home (`/`)**:
- En **modo Personal**: Muestra `AboutPage` (biografía, hero personal)
- En **modo Studio**: Muestra `StudioPage` (claim de NarrLab, servicios, hero museo)

**Scroll Behavior**:
- Scroll automático a top en cada cambio de ruta
- `behavior: 'instant'` para evitar animación jarring

---

## 🗂️ Datos del Sitio (`/data/site-data.ts`)

Archivo centralizado con toda la información del sitio. Estructura:

```typescript
{
  person: {
    name: "Anamaría Espinoza",
    role: "Learning Experience & Community Education Lead",
    location: "Zaragoza, ES",
    portfolio_url: string,
    behance_url: string,
    commons_url: string
  },
  social: {
    email: "aespinoza@narrlab.studio",
    linkedin: string,
    github: string,
    x: string
  },
  skills: string[],  // Array de competencias
  tools: string[],   // Array de herramientas
  languages: [
    { name: string, level: string }
  ],
  portfolio_categories: string[],  // Categorías de filtrado
  projects: [
    {
      slug: string,                  // URL-friendly slug
      title: string,
      category: string,
      year: number,
      client?: string,
      isStudioProject: boolean,      // ¿Mostrar en modo Studio?
      isFeatured: boolean,           // ¿Proyecto destacado?
      role_es: string,
      role_en: string,
      summary_es: string,            // Resumen corto ES
      summary_en: string,            // Resumen corto EN
      description_es: string,        // Descripción larga ES
      description_en: string,        // Descripción larga EN
      cover_image: string,           // URL imagen principal
      gallery_images?: string[],     // Array de imágenes
      services_es?: string[],        // Servicios prestados
      services_en?: string[],
      tools: string[],               // Herramientas usadas
      tags: string[],                // Tags para búsqueda
      status?: string,               // "En curso", "Completado", etc.
      external_url?: string          // Link externo si aplica
    }
  ],
  studio: {
    brand: "NarrLab",
    claim: "Abstraemos lo esencial y lo volvemos experiencia pedagógica.",
    services: [
      {
        title_es: string,
        title_en: string,
        description_es: string,
        description_en: string,
        icon: string  // Nombre del ícono de lucide-react
      }
    ],
    clients: string[]  // Logos de clientes
  },
  podcast: {
    name: "Profesora Neón",
    tagline_es: string,
    tagline_en: string,
    description_es: string,
    description_en: string,
    spotify_url: string,
    cover_image: string
  },
  cv: {
    experience: [
      {
        title: string,
        company: string,
        location: string,
        period: string,
        description_es: string,
        description_en: string,
        highlights_es: string[],
        highlights_en: string[]
      }
    ],
    education: [...],
    certifications: [...]
  }
}
```

**Importante**: Todos los textos tienen versión `_es` y `_en` para soportar bilingüismo.

---

## 🌍 Sistema Bilingüe (i18n)

### Contexto: `I18nProvider` + `useI18n()`

**Provider**: `/lib/i18n-context.tsx`

```tsx
const { language, setLanguage, t } = useI18n();
// language: 'es' | 'en'
// setLanguage: Cambia idioma y guarda en localStorage
// t: Función de traducción t('nav.home') → "Inicio" | "Home"
```

**Traducciones Disponibles** (claves en `/lib/i18n-context.tsx`):

```
nav.*         → Navegación (home, portfolio, cv, about, contact, studio, personal, podcast, consulting)
hero.*        → Hero sections (claim, cta, contact)
portfolio.*   → Portfolio (featured, all, filter, search, reset, view, external)
cv.*          → CV (title, download, print, profile, skills, tools, experience, education, certifications, languages, keywords)
studio.*      → Studio (claim, services, clients, cta, contact)
about.*       → About (title, bio)
contact.*     → Contact form (title, name, email, message, send, sending, success, error)
footer.*      → Footer (rights, social, cookieSettings)
common.*      → Comunes (year, category, all, loading)
```

**Persistencia**: 
- Se guarda en `localStorage` con key `language`
- Se inicializa en `'es'` por defecto

**Uso en Componentes**:
```tsx
{language === 'es' ? 'Texto español' : 'English text'}
// O usando traducciones centralizadas:
<h1>{t('cv.title')}</h1>
```

---

## 🎭 Sistema de Modos de Marca

### Contexto: `BrandProvider` + `useBrand()`

**Provider**: `/lib/brand-context.tsx`

```tsx
const { mode, setMode } = useBrand();
// mode: 'personal' | 'studio'
// setMode: Cambia modo y guarda en localStorage
```

**Comportamiento**:
- Modo por defecto: `'studio'`
- Persistencia en `localStorage` con key `brandMode`
- Al cambiar modo, se aplica/remueve clase `.studio-mode` en `<html>`
- CSS variables cambian automáticamente según el modo

**Navegación Diferenciada**:

| Página | Modo Personal | Modo Studio |
|--------|--------------|-------------|
| Home `/` | AboutPage | StudioPage |
| Portfolio `/portfolio` | ✅ Featured projects (3) | ✅ Full grid filtrable |
| CV `/cv` | ✅ | ✅ |
| About `/about` | ✅ | ✅ |
| Contact `/contact` | ✅ | ✅ |
| Studio `/studio` | ❌ (No en nav) | ✅ |
| Consulting `/consulting` | ✅ | ✅ |
| Gamification `/gamification` | ✅ | ✅ |
| Podcast `/podcast` | ✅ | ❌ (No en nav) |

**Filtrado de Proyectos**:
```typescript
// En HomePage, solo se muestran proyectos donde:
if (mode === 'studio') {
  projects = projects.filter(p => p.isStudioProject !== false);
}
// Personal mode solo muestra featured (isFeatured: true)
```

---

## 📄 Páginas Principales

### 1. **HomePage** (`/portfolio`)

**Modo Studio**:
- `HeroStudio` component con claim de NarrLab
- Sección de 3 servicios destacados (pills horizontales)
- Grid masonry completo de proyectos con filtros:
  - Search bar (busca en title, summary, tags)
  - Category badges clickeables
  - Botón "Limpiar filtros"
- Toggle "Archive Tabs" para cambiar a modo curador
- `CuratorBoard` interactivo con drag & drop

**Modo Personal**:
- Hero limpio sin foto de fondo, solo patrones cósmicos
- Sección de título + rol + claim personal
- CTAs: "Ver CV" y "Acerca"
- Grid de 3 proyectos destacados (isFeatured: true)

**Filtros**:
- Por categoría (Wikimedia, CRS, UCA, Credicampo, Multimedia, Branding)
- Por búsqueda de texto
- Animaciones stagger en grid

---

### 2. **CVPage** (`/cv`)

**Estructura**:
- Sección Hero con nombre, rol, ubicación, foto
- Tabs para organizar CV:
  - **Por enfoque** (CVByFocus component): Agrupa experiencia por áreas temáticas
  - **Cronológica**: Timeline tradicional
- Secciones:
  - Perfil profesional (bio expandida)
  - Experiencia laboral
  - Educación
  - Certificaciones
  - Skills (con BadgeSlider)
  - Tools (con BadgeSlider)
  - Idiomas
  - Keywords para ATS (ocultos en pantalla, visibles en print)

**Print Styles**:
- CSS `@media print` para formato A4
- Oculta navegación, footer, botones interactivos
- Márgenes 2cm
- Incluye keywords al final para ATS
- Botón "Imprimir" que ejecuta `window.print()`

**Accesibilidad**:
- Estructura semántica `<section>`, `<article>`
- ARIA labels en badges y tabs
- Focus visible en elementos interactivos

---

### 3. **ProjectDetailPage** (`/project/:slug`)

**Recibe slug dinámico** desde URL params:
```tsx
const { slug } = useParams<{ slug: string }>();
const project = siteData.projects.find(p => p.slug === slug);
```

**Layout**:
- Hero con cover_image grande
- Meta info: Categoría, año, cliente, tags
- Sección "Contexto y Reto" (description)
- Sección "Rol y Servicios" (services)
- Sección "Herramientas" (tools)
- Galería de imágenes si existen (gallery_images)
- Botón CTA: "Enlace externo" si hay external_url
- Link "Volver al portafolio"

**Estilos según modo**:
- Personal: Bordes morados, patrones cósmicos
- Studio: Placas museo, bordes dorados

---

### 4. **StudioPage** (`/studio`)

Página principal de NarrLab cuando está en modo Studio.

**Estructura**:
- `HeroStudio` con claim, descripción y CTAs
- Sección "Servicios" con cards detalladas (MuseumPlaque)
- Sección "Casos destacados" con proyectos filtrados por `isStudioProject: true`
- Sección "Clientes" con logos
- Footer con MuseumCallout: "¿Listo para tu proyecto?"

**Identidad Visual**:
- Fondo parchment (#F2BF80)
- Patrones museo (constellation + streamline)
- Dividers dorados
- CTAs en copper (#D95032)

---

### 5. **AboutPage** (`/about`)

**Layout**:
- Hero con foto personal
- Biografía larga (multi-párrafo)
- Sección "Filosofía de trabajo"
- Sección "Habilidades clave" (BadgeSlider con skills)
- Sección "Herramientas" (BadgeSlider con tools)
- Links sociales (LinkedIn, Behance, Wikimedia Commons)
- CTA: "Descargar CV" o "Contactar"

**Contenido dinámico**:
```tsx
{language === 'es' ? t('about.bio') : siteData.person.bio_en}
```

---

### 6. **ContactPage** (`/contact`)

**Formulario de contacto** (frontend only, no backend):
- Campos: Nombre, Email, Mensaje
- Validación básica
- Botón "Enviar"
- Email obfuscado mostrado con `ObfuscatedEmail` component

**Layout**:
- Dos columnas: 
  - Izquierda: Formulario
  - Derecha: Info de contacto, links sociales, email directo

**Nota**: El formulario no envía emails reales (no hay backend). Muestra mensaje de éxito simulado. Para implementación real necesitaría servicio como Formspree, EmailJS o backend propio.

---

### 7. **ConsultingPage** (`/consulting`)

Landing page de servicios de consultoría.

**Estructura**:
- Hero con título "Consultorías especializadas"
- Grid de 3-4 servicios en cards detalladas:
  - Diseño instruccional
  - Auditoría LXD
  - Desarrollo de programas
  - QA y mejora continua
- Pricing tiers (si aplica)
- Proceso de trabajo (timeline)
- CTA: "Agendar llamada"

**Colores según modo**:
- Títulos h1, h2, h3 usan color **#21374d** (azul oscuro consistente en todo el sitio)
- Cards usan colores del modo activo

---

### 8. **GamificationPage** (`/gamification`)

Caso de estudio expandido sobre gamificación en e-learning.

**Contenido**:
- Importa markdown desde `/imports/gamification-elearning-process.md`
- Secciones:
  - ¿Qué es gamificación?
  - Proceso de diseño
  - Frameworks (Octalysis, MDA)
  - Casos de uso
  - Herramientas
- Imágenes, diagramas, ejemplos
- CTA: "Ver más proyectos gamificados"

**Diseño**:
- Typography clara tipo "long-form article"
- Imágenes full-width con captions
- Secciones separadas con dividers
- Sidebar opcional con TOC (table of contents)

---

### 9. **HumanidadesDigitalesPage** (`/humanidades-digitales`)

Caso de estudio sobre proyecto de humanidades digitales + gamificación.

**Contenido**:
- Importa markdown desde `/imports/humanidades-digitales-gamif.md`
- Similar estructura a GamificationPage
- Incluye contexto académico, metodología, resultados

---

### 10. **PodcastPage** (`/podcast`)

Landing page del podcast "Profesora Neón".

**Estructura**:
- Hero con cover art del podcast (GIF animado)
- Tagline: "Una voz que traduce filosofía y ciencias sociales al idioma pop"
- Descripción del concepto
- Embed de Spotify player (iframe)
- Lista de episodios destacados
- CTA: "Escuchar en Spotify"

**Datos**:
```typescript
siteData.podcast = {
  name: "Profesora Neón",
  tagline_es: "...",
  tagline_en: "...",
  spotify_url: "https://creators.spotify.com/pod/profile/...",
  cover_image: "https://www.narrlab.studio/Assets/podcastProfeneon.gif"
}
```

---

## 🍪 Sistema de Cookies y Consentimiento RGPD

### Componentes

**CookieConsentBanner**:
- Banner sticky bottom con mensaje de cookies
- Botones: "Aceptar todas", "Solo necesarias", "Configurar"
- Solo se muestra si el usuario no ha dado consentimiento
- Guarda preferencia en `localStorage`

**CookieSettings**:
- Panel modal con categorías de cookies:
  - **Necesarias** (siempre activas): Funcionalidad básica del sitio
  - **Analíticas**: Google Analytics (opcional)
  - **Funcionales**: Preferencias de idioma/modo (opcional pero recomendado)
- Toggle switches para cada categoría
- Botón "Guardar preferencias"

**ConsentContext**:
```tsx
const { 
  consent,           // { necessary: true, analytics: boolean, functional: boolean }
  hasConsent,        // boolean
  updateConsent,     // (updates: Partial<ConsentState>) => void
  showSettings,      // boolean
  setShowSettings    // (show: boolean) => void
} = useConsent();
```

**Integración con Google Analytics**:
- Solo se carga script de GA si `consent.analytics === true`
- Código de tracking en `/public/google-analytics-integration.html`
- Instrucciones en `/GOOGLE-ANALYTICS-CODE.txt`

---

## 🎨 Componentes Reutilizables

### `ProjectCard`
Tarjeta de proyecto para grids de portafolio.

**Props**:
```tsx
{
  project: Project,
  onViewProject: (slug: string) => void
}
```

**Layout**:
- Imagen cover (aspect ratio 16:9)
- Overlay con gradiente en hover
- Badge de categoría
- Título
- Summary corto
- Tags (max 3)
- Botón "Ver proyecto" que aparece en hover

**Estilos**:
- Bordes y sombras según modo
- Animación de elevación en hover
- Transiciones suaves (300ms)

---

### `BadgeSlider`
Slider horizontal con scroll de badges (skills/tools).

**Props**:
```tsx
{
  items: string[],
  variant?: 'default' | 'secondary'
}
```

**Funcionalidad**:
- Scroll horizontal con botones prev/next
- Indicadores de posición (dots)
- Auto-scroll opcional
- Responsive: muestra 3-6 items según viewport

---

### `MasonryGrid` / `AnimatedMasonryGrid`
Grid masonry usando `react-responsive-masonry`.

**Features**:
- Columnas responsive: 1 (mobile) → 2 (tablet) → 3 (desktop)
- Animaciones stagger con Motion
- Gap consistente (16-24px)
- Lazy loading de imágenes

---

### `ObfuscatedEmail`
Componente anti-spam para mostrar emails.

**Estrategia**:
- Email codificado en base64 o separado por caracteres
- Se ensambla solo en runtime con JavaScript
- Bots de scraping no pueden extraerlo del HTML estático

```tsx
<ObfuscatedEmail email="aespinoza@narrlab.studio" />
```

---

### `Navigation`
Barra de navegación sticky con comportamiento adaptativo.

**Características**:
- **Sticky top**: Solo aparece después de scroll 100px (fade in)
- **Logo**: Muestra isotipo de NarrLab en modo Studio
- **Nav Items**: Diferentes según modo (ver tabla arriba)
- **Toggles**:
  - Modo de marca (Personal / Studio): Pills con colores distintivos
  - Idioma (ES / EN): Pills con fondo del modo activo
- **Mobile**: Menú hamburguesa con dropdown
- **Active state**: Subrayado animado en página activa

**Colores según modo**:
```tsx
// Personal: bg #F2EADF/95, links morados
// Studio: bg #F2BF80/95, links terracota/dorado
```

---

### `Footer`
Footer bilingüe con links y copyright.

**Secciones**:
- Logo/Brand (según modo)
- Links sociales (LinkedIn, Behance, Wikimedia)
- Botón "Preferencias de cookies"
- Copyright: "© 2025 Anamaría Espinoza / NarrLab. Todos los derechos reservados."

**Estilos**:
- Fondo según modo
- Dividers sutiles
- Padding generoso

---

## 🎯 Características Clave de Accesibilidad

### WCAG 2.2 AA Compliance

**Contraste de Color**:
- Personal: Ink #1E1940 sobre bg #F2EADF = **12.8:1** ✅
- Studio: Night #121126 sobre parchment #F2BF80 = **10.2:1** ✅
- Buttons y links cumplen mínimo 4.5:1

**Navegación por Teclado**:
- Todos los elementos interactivos son focuseables
- Focus visible con outline de 2px (color: var(--ring))
- Skip link: "Skip to main content" (aparece en :focus)
- Tab order lógico

**ARIA**:
- `aria-current="page"` en nav activo
- `aria-label` en botones de íconos
- `aria-pressed` en toggles
- `role="navigation"`, `role="main"`, `role="complementary"`

**Screen Readers**:
- Headings jerárquicos (h1 → h2 → h3)
- Landmarks semánticos (`<nav>`, `<main>`, `<footer>`, `<aside>`)
- Alt text descriptivo en imágenes
- Labels en formularios

**Reducción de Movimiento**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind default):
```
sm:  640px   (tablet)
md:  768px   (tablet landscape)
lg:  1024px  (desktop)
xl:  1280px  (desktop large)
2xl: 1536px  (ultra-wide)
```

### Layout Adaptativo

**Navigation**:
- Mobile: Hamburger menu
- Desktop: Full horizontal nav

**Portfolio Grid**:
- Mobile: 1 columna
- Tablet: 2 columnas
- Desktop: 3 columnas (masonry)

**Hero Sections**:
- Mobile: 1 columna stacked
- Desktop: 2 columnas (7/12 + 5/12)

**Typography**:
```tsx
// Hero title
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"

// Body text
className="text-base md:text-lg"
```

**Spacing**:
```tsx
// Section padding
className="py-12 lg:py-20"
className="px-4 sm:px-6 lg:px-8"
```

---

## ⚡ Animaciones y Microinteracciones

### Motion (Framer Motion)

**Scroll Animations**:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
```

**Stagger Children**:
```tsx
<motion.div
  variants={{
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
```

**Parallax**:
```tsx
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 150]);
const opacity = useTransform(scrollY, [0, 300], [1, 0]);
```

### Hover States

**Cards**:
```tsx
// Elevación + brillo de borde
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-4px)';
  e.currentTarget.style.boxShadow = '0 12px 32px rgba(18, 17, 38, 0.15)';
  e.currentTarget.style.borderColor = '#F2AE2E';  // Studio dorado
}}
```

**Buttons**:
```tsx
// Scale + cambio de color
className="hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
```

**Easing Curves**:
- Default: `ease-out-expo` → `[0.22, 1, 0.36, 1]`
- Bouncy: `ease-out-back`
- Sharp: `ease-in-out-cubic`

---

## 🔍 SEO y Metadatos

**Meta Tags** (deberían estar en `<head>` de index.html):
```html
<title>Anamaría Espinoza — Learning Experience & Instructional Designer</title>
<meta name="description" content="Portfolio y CV de Anamaría Espinoza, diseñadora instruccional y multimedia con 10+ años creando experiencias de aprendizaje para comunidades globales.">
<meta name="keywords" content="instructional design, LXD, e-learning, multimedia, gamification, community education">

<!-- Open Graph -->
<meta property="og:title" content="Anamaría Espinoza — Portfolio">
<meta property="og:description" content="...">
<meta property="og:image" content="https://narrlab.studio/img/og-image.jpg">
<meta property="og:url" content="https://tudominio.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
```

**JSON-LD Structured Data** (Person schema):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Anamaría Espinoza",
  "jobTitle": "Learning Experience & Community Education Lead",
  "url": "https://tudominio.com",
  "sameAs": [
    "https://linkedin.com/in/anamariaespinoza",
    "https://behance.net/anamariaespinoza"
  ]
}
```

---

## 🚀 Performance y Optimización

**Lazy Loading**:
- Imágenes usan `loading="lazy"` attribute
- Componentes de páginas no se cargan hasta navegación

**Code Splitting**:
- React Router hace split automático por ruta
- Cada página es un chunk separado

**Optimización de Imágenes**:
- Usar formatos modernos (WebP, AVIF) cuando sea posible
- Servir imágenes desde CDN (narrlab.studio actualmente)
- Compresión adecuada (80-90% quality)
- Responsive images con `srcset` si aplica

**Fuentes**:
- Google Fonts cargado con `display=swap`
- Solo cargar weights necesarios (400, 600, 700)

**CSS**:
- Tailwind CSS con purge automático
- Solo se incluyen clases usadas
- Archivo final < 50KB

---

## 📊 Analytics y Tracking

**Google Analytics 4**:
- Script solo se carga si usuario acepta cookies analíticas
- Implementación en `/public/google-analytics-integration.html`
- Eventos personalizados:
  - Cambio de modo (personal ↔ studio)
  - Cambio de idioma (es ↔ en)
  - Click en proyecto
  - Download CV
  - Submit contact form

**Código de integración**:
```javascript
// Solo se ejecuta si consent.analytics === true
if (consent.analytics) {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
}
```

---

## 🛠️ Comandos y Mantenimiento

### Agregar un Nuevo Proyecto

1. Edita `/data/site-data.ts`
2. Agrega objeto al array `projects`:
```typescript
{
  slug: "nombre-proyecto-url-friendly",
  title: "Título del Proyecto",
  category: "Multimedia",  // O categoría existente
  year: 2025,
  client: "Nombre Cliente",
  isStudioProject: true,  // ¿Mostrar en modo Studio?
  isFeatured: true,       // ¿Destacar en Personal mode?
  role_es: "Rol en español",
  role_en: "Role in English",
  summary_es: "Resumen corto ES",
  summary_en: "Short summary EN",
  description_es: "Descripción larga ES...",
  description_en: "Long description EN...",
  cover_image: "https://url-imagen.jpg",
  gallery_images: ["url1.jpg", "url2.jpg"],
  services_es: ["Servicio 1", "Servicio 2"],
  services_en: ["Service 1", "Service 2"],
  tools: ["Adobe Illustrator", "Figma"],
  tags: ["Tag1", "Tag2", "Tag3"],
  status: "Completado",
  external_url: "https://proyecto-live.com"
}
```

### Agregar Nueva Categoría

1. Agrega string a `portfolio_categories` en `site-data.ts`
2. La categoría aparecerá automáticamente en filtros de HomePage
3. Asigna categoría a proyectos usando ese string exacto

### Actualizar Traducciones

1. Edita `/lib/i18n-context.tsx`
2. Agrega keys en objetos `translations.es` y `translations.en`
3. Usa en componentes con `t('nueva.key')`

### Cambiar Colores del Sistema

1. Edita `/styles/globals.css`
2. Modifica variables en `:root` (Personal) o `.studio-mode` (Studio)
3. Los componentes heredarán automáticamente los nuevos colores

---

## 📌 Notas Importantes

### Logos de NarrLab
- **Isotipo**: `https://narrlab.studio/img/isotipo-narralab.png`
- **Logotipo completo**: `https://narrlab.studio/img/logotipo-narralab.png`
- Servidos desde servidor oficial de NarrLab

### Email
- Email principal: `aespinoza@narrlab.studio`
- Usado en modo Studio
- En ContactPage se muestra ofuscado

### Convenciones de Código

**Componentes**:
- PascalCase para nombres de archivos y exports
- Props interface con sufijo `Props`
- Hooks custom con prefijo `use`

**Estilos**:
- Preferir Tailwind classes sobre CSS custom
- Inline styles solo para valores dinámicos
- Variables CSS para temas

**i18n**:
- Siempre duplicar textos en ES y EN
- Usar función `t()` para UI strings
- Usar data `_es` / `_en` para contenido largo

**Accesibilidad**:
- Siempre incluir `aria-label` en botones de ícono
- Usar `aria-current="page"` en navegación activa
- Mantener contraste mínimo 4.5:1

---

## 🎯 Objetivos del Sitio

1. **Presentar profesionalismo**: CV completo y portafolio robusto
2. **Dual identity**: Personal brand + NarrLab studio brand
3. **Accesibilidad**: Inclusivo para todos los usuarios
4. **Bilingüismo**: Alcance global ES/EN
5. **Showcasing skills**: Demostrar capacidades de diseño instruccional y multimedia
6. **Conversión**: Facilitar contacto de potenciales clientes/empleadores
7. **Storytelling**: Comunicar filosofía de trabajo y enfoque pedagógico

---

## ✨ Características Únicas

- **Modo Curador**: Experiencia interactiva de drag & drop para "jugar a ser curador de museo"
- **Dual brand system**: Dos identidades visuales completas coexistiendo
- **Sistema de diseño museo**: Componentes visuales únicos inspirados en museografía retro-futurista
- **CV por enfoque**: Organización alternativa del CV por áreas temáticas en lugar de cronológica
- **Podcast integration**: Landing page dedicada para proyecto personal Profesora Neón
- **Cookies RGPD**: Implementación completa de consentimiento con categorías configurables

---

**Fecha de última actualización**: Marzo 2025  
**Versión**: 2.0  
**Autor**: Anamaría Espinoza con asistencia de Claude (Anthropic)

---

Este documento es una guía comprehensiva para cualquier desarrollador o IA que necesite entender, mantener o expandir el sitio web.
