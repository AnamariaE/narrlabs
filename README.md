# Anamaría Espinoza — Portfolio & CV

Sitio web bilingüe (ES/EN) de portafolio y CV para Anamaría Espinoza, Learning Experience & Community Education Lead. Incluye modo personal y modo estudio (NarrLab).

## 🎯 Características

- **Bilingüe**: Español e Inglés con cambio persistente
- **Dual brand**: Modo Personal y Modo Estudio (NarrLab)
- **Portafolio filtrable**: Por categoría y búsqueda por palabras clave
- **CV imprimible**: Con estructura optimizada para ATS
- **Páginas de proyecto**: Plantilla de caso de estudio
- **Accesible**: WCAG 2.2 AA, navegación por teclado, skip links
- **Responsive**: Diseño adaptable móvil-escritorio
- **SEO optimizado**: Meta tags, Open Graph, JSON-LD

## 🛠️ Stack técnico

- **React** + **TypeScript**
- **Tailwind CSS** v4.0
- **Shadcn/UI** components
- **Lucide Icons**
- **Google Fonts** (Sora + Inter)

## 📁 Estructura del proyecto

```
/
├── App.tsx                 # Punto de entrada principal
├── components/
│   ├── Navigation.tsx      # Barra de navegación
│   ├── Footer.tsx          # Footer del sitio
│   ├── ProjectCard.tsx     # Tarjeta de proyecto
│   ├── NarrabLogo.tsx      # Logo de NarrLab
│   └── ui/                 # Componentes Shadcn
├── pages/
│   ├── HomePage.tsx        # Portafolio principal
│   ├── CVPage.tsx          # Página de CV
│   ├── ProjectDetailPage.tsx  # Detalle de proyecto
│   ├── AboutPage.tsx       # Acerca de
│   ├── ContactPage.tsx     # Contacto
│   └── StudioPage.tsx      # Página NarrLab
├── lib/
│   ├── i18n-context.tsx    # Contexto de internacionalización
│   └── brand-context.tsx   # Contexto de marca (Personal/Studio)
├── data/
│   └── site-data.json      # Datos del sitio
└── styles/
    └── globals.css         # Estilos globales
```

## 🎨 Paletas de color

### Personal
- **Ink**: #111216 (texto principal)
- **Sand**: #F5F2EC (fondo)
- **Clay**: #D9CFC2 (neutral)
- **Sage**: #5E8F7A (primario)
- **Rose**: #C77A84 (acento)

### NarrLab (Studio)
- **Ink Night**: #1C1B1A (texto)
- **Parchment**: #F7F3EE (fondo)
- **Terracotta**: #C46542 (primario)
- **Sage Deep**: #4E8A7F (acento sereno)
- **Plum Smoke**: #6E5A7C (acento sofisticado)
- **Warm Grey**: #B6AFA6 (neutral)

## 🚀 Uso

El sitio funciona completamente en el frontend sin necesidad de backend.

### Navegación

- **Inicio**: Portafolio con proyectos destacados y grid filtrable
- **CV**: Currículum completo, imprimible y descargable
- **Acerca**: Biografía, habilidades y herramientas
- **Contacto**: Formulario de contacto y enlaces sociales
- **Estudio**: Página de NarrLab con servicios y casos

### Cambiar idioma

Usa el selector de idioma (🌐) en la barra de navegación. La preferencia se guarda en localStorage.

### Cambiar modo de marca

Usa el toggle "Personal / Studio" en la navegación para alternar entre las dos identidades visuales.

## 📝 Agregar proyectos

Edita el archivo `/data/site-data.json` y agrega nuevos proyectos al array `projects`:

```json
{
  "slug": "mi-proyecto",
  "title": "Título del proyecto",
  "category": "Categoría",
  "year": 2024,
  "summary_es": "Resumen en español",
  "summary_en": "Summary in English",
  "cover_image": "https://...",
  "external_url": "https://...",
  "tags": ["Tag1", "Tag2"]
}
```

## ♿ Accesibilidad

- Navegación por teclado completa
- Skip link para saltar al contenido principal
- Atributos ARIA donde corresponde
- Contraste de color WCAG 2.2 AA
- Labels descriptivos en formularios
- `aria-current` en navegación activa
- Respeta `prefers-reduced-motion`

## 🖨️ Impresión del CV

La página de CV incluye estilos optimizados para impresión:

- Formato A4
- Márgenes de 2cm
- Oculta elementos de navegación
- Incluye keywords para ATS al final

Usa el botón "Imprimir" o Ctrl+P / Cmd+P para imprimir o guardar como PDF.

## 🌐 SEO

Cada página incluye:

- Meta tags apropiados
- Open Graph para redes sociales
- JSON-LD para datos estructurados (Person, Organization, CreativeWork)
- Títulos descriptivos
- URLs amigables

## 📱 Responsive

El diseño se adapta a todos los tamaños de pantalla:

- Mobile: 1 columna, menú hamburguesa
- Tablet: 2 columnas
- Desktop: hasta 3 columnas, navegación completa

## 🎓 Contenido

Todo el contenido está centralizado en `/data/site-data.json` para facilitar actualizaciones:

- Información personal
- Habilidades y herramientas
- Proyectos del portafolio
- Experiencia laboral
- Educación y certificaciones
- Servicios de NarrLab

## 📄 Licencia

© 2025 Anamaría Espinoza. Todos los derechos reservados.

---

**Diseñado y desarrollado con pedagogía, accesibilidad y diseño en mente.**
