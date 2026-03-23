# 🚀 Guía de Configuración SEO — NarrLab Studio

**Última actualización:** 23 Marzo 2026

---

## 📊 Títulos SEO Optimizados por Página

### Títulos Actuales (Studio Mode)

| Página | Title Tag (ES) | Title Tag (EN) |
|--------|---------------|----------------|
| **Homepage** | Narrlab — Diseño instruccional con identidad visual | Narrlab — Instructional design with visual identity |
| **Consulting** | Consultoría de diseño instruccional — Narrlab | Instructional design consulting — Narrlab |
| **Why NarrLab** | Por qué Narrlab — Diseño instruccional para ONGs | Why Narrlab — Instructional design for NGOs |
| **Portfolio** | Portafolio — Cursos, branding y proyectos de impacto | Portfolio — Courses, branding and impact projects |

### Keywords Principales

**Studio Mode:**
- ✅ `diseño instruccional ONG`
- ✅ `instructional designer freelance`
- ✅ `instructional design freelance`
- ✅ `diseñador instruccional freelance`
- ✅ `diseño instruccional España`
- ✅ `instructional design Spain`
- ✅ `identidad visual cursos`
- ✅ `visual identity courses`
- ✅ `cursos online ONGs`
- ✅ `learning experience design`

---

## 📋 Archivos Creados para SEO

### 1. `/public/robots.txt`
**Propósito:** Indica a los bots de búsqueda qué páginas pueden indexar.

**Características:**
- ✅ Permite indexar todo el contenido público
- ✅ Bloquea archivos de sistema y documentación interna
- ✅ Incluye referencia al sitemap
- ✅ Controla crawl-delay para diferentes bots
- ✅ Bloquea bots agresivos de scraping

**URL de acceso:** `https://narrlab.studio/robots.txt`

---

### 2. `/public/sitemap.xml`
**Propósito:** Mapa completo del sitio para motores de búsqueda.

**Características:**
- ✅ Lista todas las páginas principales
- ✅ Lista todos los proyectos individuales
- ✅ Incluye alternativas de idioma (ES/EN) con hreflang
- ✅ Prioridades asignadas (1.0 = home, 0.5 = páginas secundarias)
- ✅ Frecuencia de actualización (weekly, monthly, yearly)
- ✅ Última fecha de modificación

**URL de acceso:** `https://narrlab.studio/sitemap.xml`

**Actualizar Fechas:**
Cada vez que actualices contenido, cambia la fecha `<lastmod>` en el sitemap:
```xml
<lastmod>2026-03-23</lastmod> <!-- Formato: YYYY-MM-DD -->
```

**Añadir Nuevos Proyectos:**
```xml
<url>
  <loc>https://narrlab.studio/project/nuevo-proyecto-slug</loc>
  <lastmod>2026-03-23</lastmod>
  <changefreq>yearly</changefreq>
  <priority>0.7</priority>
  <xhtml:link rel="alternate" hreflang="es" href="https://narrlab.studio/project/nuevo-proyecto-slug?lang=es"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://narrlab.studio/project/nuevo-proyecto-slug?lang=en"/>
</url>
```

---

### 3. `/public/_headers`
**Propósito:** Configuración de headers HTTP para seguridad y cache.

**Características:**
- ✅ Security headers (X-Frame-Options, CSP, etc.)
- ✅ Cache control optimizado para assets estáticos
- ✅ CORS configurado
- ✅ Content Security Policy básico

**Nota:** Este archivo funciona en plataformas como Netlify/Vercel. Si usas otro hosting, puede que necesites configurar headers en el servidor.

---

### 4. `/public/manifest.json`
**Propósito:** Configuración de Progressive Web App (PWA).

**Características:**
- ✅ Nombre de la app
- ✅ Iconos para móvil (home screen)
- ✅ Theme colors (adapta según Brand Mode)
- ✅ Screenshots para install prompts
- ✅ Share target para compartir contenido

**Conexión al HTML:**
Añade esto al `<head>` de tu `index.html`:
```html
<link rel="manifest" href="/manifest.json">
```

---

### 5. `/components/SEOHead.tsx`
**Propósito:** Componente React para meta tags dinámicos.

**Características:**
- ✅ Actualiza `<title>` según la página
- ✅ Meta description adaptada
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ JSON-LD Structured Data (Schema.org)
- ✅ Canonical URLs
- ✅ Hreflang para idiomas alternativos
- ✅ Se adapta automáticamente a Brand Mode (Personal/Studio)

**Uso Básico:**
```tsx
// En RootLayout (routes.tsx) - ya está incluido
<SEOHead />

// En una página específica para sobrescribir valores
<SEOHead 
  title="Título Custom de la Página"
  description="Descripción específica de esta página"
  image="https://url-de-imagen-social.jpg"
  type="article"
  keywords={["palabra clave 1", "palabra clave 2"]}
/>
```

**Props Disponibles:**
| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | string | Auto (según Brand Mode) | Título de la página |
| `description` | string | Auto (según Brand Mode) | Meta description |
| `image` | string | Logo NarrLab | Imagen para redes sociales (OG/Twitter) |
| `url` | string | URL actual | Canonical URL |
| `type` | 'website' \| 'article' \| 'profile' | 'website' | Tipo de contenido Open Graph |
| `keywords` | string[] | Auto (según Brand Mode) | Palabras clave SEO |
| `noindex` | boolean | false | Bloquear indexación (para páginas privadas) |

---

## 🎯 Cómo Usar SEO en Páginas Específicas

### Ejemplo 1: Página de Proyecto Individual

```tsx
// En ProjectDetailPage.tsx
import { SEOHead } from '../components/SEOHead';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = siteData.projects.find(p => p.slug === slug);
  const { language } = useI18n();
  
  return (
    <>
      <SEOHead
        title={project.title}
        description={language === 'es' ? project.summary_es : project.summary_en}
        image={project.cover_image}
        url={`https://narrlab.studio/project/${slug}`}
        type="article"
        keywords={project.tags}
      />
      
      {/* Resto del contenido */}
    </>
  );
}
```

### Ejemplo 2: Página con contenido protegido (no indexar)

```tsx
// En alguna página con ProtectedContent
<SEOHead
  title="Contenido Privado"
  description="Esta página requiere contraseña"
  noindex={true}  // ⚠️ No indexar en Google
/>
```

---

## 🔍 Verificación en Google Search Console

### Paso 1: Registrar el Sitio
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Añade propiedad: `https://narrlab.studio`
3. Verifica propiedad (método recomendado: DNS o HTML tag)

### Paso 2: Enviar Sitemap
1. En Search Console, ve a **Sitemaps**
2. Añade la URL: `https://narrlab.studio/sitemap.xml`
3. Enviar
4. Espera 1-3 días para indexación inicial

### Paso 3: Inspeccionar URLs
- Usa la herramienta "Inspección de URLs"
- Pega URLs específicas para verificar indexación
- Solicita indexación manual si es necesario

---

## 🌐 Internacionalización (Hreflang)

El sitio soporta ES/EN con hreflang tags automáticos.

**Ejemplo generado por SEOHead:**
```html
<link rel="alternate" hreflang="es" href="https://narrlab.studio/portfolio?lang=es" />
<link rel="alternate" hreflang="en" href="https://narrlab.studio/portfolio?lang=en" />
```

**Beneficios:**
- Google muestra la versión correcta según idioma del usuario
- Evita contenido duplicado
- Mejora CTR en SERPs internacionales

---

## 📊 Structured Data (Schema.org)

El componente `SEOHead` genera JSON-LD automáticamente:

**Para Studio Mode:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NarrLab Studio",
  "url": "https://narrlab.studio",
  "logo": "https://narrlab.studio/img/LogoNarrlabs.png",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Zaragoza",
    "addressCountry": "ES"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "aespinoza@narrlab.studio"
  }
}
```

**Para Personal Mode:**
```json
{
  "@type": "Person",
  "name": "Anamaría Espinoza",
  "jobTitle": "Learning Experience & Community Education Lead",
  "knowsLanguage": ["Spanish", "English"]
}
```

**Validar Structured Data:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

---

## 🎨 Open Graph & Twitter Cards

Generado automáticamente por `SEOHead`:

**Open Graph (Facebook, LinkedIn):**
```html
<meta property="og:title" content="NarrLab Studio — Diseño de Experiencias Pedagógicas" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://narrlab.studio/img/LogoNarrlabs.png" />
<meta property="og:url" content="https://narrlab.studio" />
<meta property="og:type" content="website" />
```

**Twitter Card:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

**Validar Social Cards:**
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## ✅ Checklist SEO Pre-Launch

### Contenido
- [ ] Títulos únicos en todas las páginas
- [ ] Meta descriptions únicas (150-160 caracteres)
- [ ] Imágenes con `alt` descriptivo
- [ ] URLs limpias y descriptivas (sin IDs raros)
- [ ] Estructura de headings correcta (H1 → H2 → H3)

### Técnico
- [ ] `robots.txt` publicado y accesible
- [ ] `sitemap.xml` publicado y accesible
- [ ] Sitemap enviado a Google Search Console
- [ ] `manifest.json` enlazado en HTML
- [ ] HTTPS activo (certificado SSL)
- [ ] Canonical URLs configurados
- [ ] Hreflang tags para ES/EN

### Performance
- [ ] Lighthouse score > 90 (Desktop/Mobile)
- [ ] Imágenes optimizadas (WebP, lazy loading)
- [ ] Cache headers configurados
- [ ] Minificación de CSS/JS (build process)

### Social
- [ ] Open Graph tags verificados
- [ ] Twitter Cards verificadas
- [ ] Imagen social compartible (1200x630px recomendado)

### Analytics
- [ ] Google Analytics instalado
- [ ] Google Search Console verificado
- [ ] Cookie consent funcionando

---

## 📈 KPIs SEO a Monitorear

**Google Search Console:**
- Impresiones totales (cuántas veces aparece en búsquedas)
- Clics totales
- CTR promedio (Click Through Rate)
- Posición promedio en resultados
- Páginas con más tráfico
- Queries de búsqueda que traen tráfico

**Google Analytics 4:**
- Usuarios orgánicos (fuente: organic search)
- Bounce rate
- Tiempo en página
- Páginas más visitadas
- Conversiones (contacto, descargas CV, etc.)

**Actualizar cada:**
- Sitemap: cada vez que añadas proyectos nuevos
- Meta descriptions: al cambiar contenido significativo
- Structured data: al cambiar información de contacto/servicios

---

## 🔧 Troubleshooting

### Problema: Google no indexa el sitio
**Solución:**
1. Verifica que `robots.txt` permita indexación
2. Revisa que el sitio esté en HTTPS
3. Envía sitemap manualmente en Search Console
4. Inspecciona URL específica y solicita indexación

### Problema: Contenido duplicado
**Solución:**
1. Asegúrate de que canonical URLs estén configurados
2. Verifica que hreflang tags sean correctos
3. Usa redirects 301 para URLs antiguas

### Problema: Social cards no aparecen
**Solución:**
1. Valida con debuggers (Facebook, Twitter)
2. Asegúrate que la imagen sea accesible públicamente
3. Tamaño mínimo: 1200x630px
4. Limpia caché de redes sociales (puede tardar horas)

### Problema: Structured data no se detecta
**Solución:**
1. Valida JSON-LD en Schema.org validator
2. Revisa que el script esté en `<head>`
3. Espera 1-2 días para que Google procese

---

## 🎓 Recursos Adicionales

**Herramientas:**
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse (Chrome DevTools)](https://developers.google.com/web/tools/lighthouse)

**Validadores:**
- [Schema Validator](https://validator.schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

**Documentación:**
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

## 🚀 Próximos Pasos Recomendados

1. **Instalar Google Analytics 4** (ya tienes el código, falta activarlo)
2. **Crear imágenes optimizadas para social sharing** (1200x630px)
3. **Escribir blog posts** (SEO de contenido: artículos sobre gamificación, diseño instruccional)
4. **Link building:** compartir proyectos en Behance, LinkedIn, comunidades de diseño
5. **Local SEO:** Si ofreces servicios en Zaragoza, crear perfil de Google Business
6. **Performance:** Optimizar imágenes a WebP, implementar lazy loading avanzado

---

¡Tu sitio ahora tiene una base SEO sólida! 🎉

Recuerda: **SEO es un proceso continuo**, no una configuración única. Monitorea, ajusta y mejora con el tiempo.