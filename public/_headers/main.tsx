# HTTP Headers para NarrLab Studio
# Mejora SEO, seguridad y rendimiento

# Headers globales para todas las páginas
/*
  # Security headers
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  
  # Cache control
  Cache-Control: public, max-age=3600, must-revalidate
  
  # CORS (permitir recursos desde el dominio)
  Access-Control-Allow-Origin: https://narrlab.studio
  
  # Content Security Policy (básico)
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: http:; connect-src 'self' https://www.google-analytics.com; frame-src 'self' https://www.youtube.com https://open.spotify.com;

# Assets estáticos con cache largo
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.jpeg
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.gif
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable

/*.webp
  Cache-Control: public, max-age=31536000, immutable

/*.woff
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

# HTML pages - cache corto
/*.html
  Cache-Control: public, max-age=0, must-revalidate

# Manifest y service worker
/manifest.json
  Cache-Control: public, max-age=86400
  Content-Type: application/manifest+json

# Sitemap y robots
/sitemap.xml
  Cache-Control: public, max-age=86400
  Content-Type: application/xml

/robots.txt
  Cache-Control: public, max-age=86400
  Content-Type: text/plain
