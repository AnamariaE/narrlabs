# 🔄 INSTRUCCIONES DE RESTAURACIÓN
**Cómo volver al estado funcional si algo sale mal**

---

## 🚨 CUÁNDO USAR ESTA GUÍA

Usa estas instrucciones si después de hacer cambios:
- ❌ Aparecen errores de navegación
- ❌ Los botones no funcionan
- ❌ React Router no funciona
- ❌ Páginas no cargan
- ❌ Errores de "is not defined"
- ❌ Errores de "is not a function"

---

## 📋 CHECKLIST RÁPIDO DE DIAGNÓSTICO

Antes de restaurar, verifica:

1. **¿El error menciona React Router?**
   - ✅ Verifica que NO uses `react-router-dom`
   - ✅ Solo usa `react-router`

2. **¿El error menciona `onNavigate`?**
   - ✅ Verifica que las páginas NO tengan prop `onNavigate`
   - ✅ Verifica que usen `const navigate = useNavigate()`

3. **¿El error menciona `NotFound`?**
   - ✅ Verifica que `/routes.tsx` tenga la función `NotFound` definida

---

## 🔧 RESTAURACIÓN POR TIPO DE ERROR

### ERROR 1: `NotFound is not defined`

**Solución**: Restaurar `/routes.tsx`

```tsx
// Agregar esta función ANTES de `export const router`:

// 404 Not Found page
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">Página no encontrada / Page not found</p>
        <a href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          Volver al inicio / Go home
        </a>
      </div>
    </div>
  );
}
```

---

### ERROR 2: `onNavigate is not a function`

**Causa**: Una página espera recibir `onNavigate` como prop pero ya no se pasa.

**Solución**: Actualizar la página para usar `useNavigate`

#### Paso 1: Agregar import
```tsx
import { useNavigate } from 'react-router';
```

#### Paso 2: Quitar prop de la función
```tsx
// ❌ ANTES
export function MyPage({ onNavigate }: { onNavigate: (page: string) => void }) {

// ✅ DESPUÉS
export function MyPage() {
```

#### Paso 3: Agregar hook
```tsx
export function MyPage() {
  const navigate = useNavigate();
  // ... resto del código
}
```

#### Paso 4: Reemplazar llamadas
```tsx
// ❌ ANTES
onClick={() => onNavigate('contact')}

// ✅ DESPUÉS
onClick={() => navigate('/contact')}
```

**Páginas que deben seguir este patrón:**
- HomePage
- StudioPage
- ProjectDetailPage
- AboutPage
- ConsultingPage
- PodcastPage
- GamificationPage
- HumanidadesDigitalesPage

---

### ERROR 3: Errores de routing general

**Solución**: Verificar imports en cada archivo

#### `/App.tsx` debe tener:
```tsx
import { RouterProvider } from 'react-router';
```

#### `/routes.tsx` debe tener:
```tsx
import { createBrowserRouter, Outlet, useLocation } from 'react-router';
```

#### `/components/Navigation.tsx` debe tener:
```tsx
import { Link, useLocation } from 'react-router';
```

#### Páginas deben tener:
```tsx
import { useNavigate } from 'react-router';
// Y opcionalmente:
import { useParams } from 'react-router';  // si usan parámetros URL
```

---

## 📝 TEMPLATE DE PÁGINA CORRECTA

Usa esta plantilla para cualquier página nueva o restaurada:

```tsx
import React from 'react';
import { useNavigate } from 'react-router';
import { useI18n } from '../lib/i18n-context';

export function MyPage() {
  const navigate = useNavigate();
  const { language, t } = useI18n();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <h1>Mi Página</h1>
      <button onClick={() => navigate('/otra-pagina')}>
        Ir a otra página
      </button>
    </div>
  );
}
```

---

## 🔍 VERIFICACIÓN POST-RESTAURACIÓN

Después de restaurar, verifica:

### 1. **Archivos Críticos Sin Errores**
```bash
✅ /App.tsx - tiene RouterProvider
✅ /routes.tsx - tiene NotFound definido
✅ /components/Navigation.tsx - tiene Link
✅ /pages/*.tsx - NO tienen prop onNavigate
✅ /pages/*.tsx - usan useNavigate hook
```

### 2. **Imports Correctos**
```bash
✅ Todos usan 'react-router'
✅ Ninguno usa 'react-router-dom'
```

### 3. **Funcionalidad de Navegación**
```bash
✅ Logo navega a home
✅ Menu items navegan correctamente
✅ Botones de páginas navegan
✅ Links externos abren en nueva pestaña
✅ 404 page se muestra en rutas inválidas
```

---

## 🆘 RESTAURACIÓN COMPLETA (Último Recurso)

Si nada funciona, restaura estos archivos clave en orden:

### 1. Restaurar `/routes.tsx`
- Debe tener `RootLayout`, `HomeWrapper`, `NotFound`
- Debe usar `createBrowserRouter`
- Debe importar desde `'react-router'`

### 2. Restaurar `/App.tsx`
- Debe usar `RouterProvider`
- Debe importar `router` desde `'./routes'`

### 3. Restaurar páginas una por una:
```
Orden de prioridad:
1. HomePage.tsx
2. StudioPage.tsx
3. AboutPage.tsx
4. ProjectDetailPage.tsx
5. CVPage.tsx
6. ContactPage.tsx
7. ConsultingPage.tsx
8. Resto de páginas
```

### 4. Verificar componentes:
```
1. Navigation.tsx
2. Footer.tsx
3. ProjectCard.tsx
```

---

## 📞 COMANDOS ÚTILES DE DIAGNÓSTICO

### Buscar uso de react-router-dom (debe dar 0 resultados):
```bash
grep -r "react-router-dom" src/
```

### Buscar páginas con prop onNavigate (deben corregirse):
```bash
grep -r "onNavigate.*void" src/pages/
```

### Buscar imports de react-router (deben usar 'react-router'):
```bash
grep -r "from.*react-router" src/
```

---

## 📚 REFERENCIA RÁPIDA

### Hooks Disponibles en React Router:
- `useNavigate()` - Para navegación programática
- `useLocation()` - Para obtener ruta actual
- `useParams()` - Para obtener parámetros de URL
- `useSearchParams()` - Para query strings

### Componentes Disponibles:
- `<Link to="/path">` - Para enlaces internos
- `<Outlet />` - Para renderizar rutas hijas
- `<RouterProvider>` - Para proveer el router

### Funciones:
- `createBrowserRouter(routes)` - Para crear el router

---

## ✅ ESTADO OBJETIVO (POST-RESTAURACIÓN)

Después de restaurar, el sitio debe:
- ✅ Navegar entre páginas sin errores
- ✅ Mostrar 404 en rutas inválidas
- ✅ Permitir URLs directas
- ✅ Funcionar en modo Personal y Studio
- ✅ Cambiar idiomas ES/EN
- ✅ Todos los botones funcionales
- ✅ Links externos seguros

---

## 📞 SOPORTE ADICIONAL

Si después de restaurar sigues teniendo problemas:

1. **Revisa el archivo**: `/SNAPSHOT-BACKUP-2025-03-17.md`
2. **Compara tu código** con los patrones documentados
3. **Verifica la consola** del navegador para errores específicos
4. **Revisa la auditoría**: `/BUTTONS-AUDIT-REPORT.md`

---

**ÚLTIMA ACTUALIZACIÓN**: 17 Marzo 2025  
**ESTADO SNAPSHOT**: ✅ Funcional y certificado
