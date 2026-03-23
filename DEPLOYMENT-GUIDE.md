# 🚀 Guía de Deployment - Vercel

Tu sitio está listo para desplegarse en **Vercel**. Aquí está el proceso paso a paso.

---

## **PASO 1: Instala Git (si no lo tienes)**

### En macOS:
```bash
brew install git
```

### En Windows:
Descarga desde https://git-scm.com/download/win

### Verifica que está instalado:
```bash
git --version
```

---

## **PASO 2: Crea una cuenta en GitHub**

1. Ve a https://github.com/signup
2. Completa el registro (es gratis)
3. Verifica tu email

---

## **PASO 3: Prepara el repositorio local**

Abre la terminal en tu carpeta del proyecto:

```bash
# Inicializa Git
git init

# Configura tu nombre y email (usa los mismos de GitHub)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Añade todos los archivos
git add .

# Crea el primer commit
git commit -m "Initial commit - Portfolio setup"
```

---

## **PASO 4: Sube a GitHub**

1. Ve a https://github.com/new
2. Crea un nuevo repositorio llamado `portfolio` (o el nombre que prefieras)
3. **NO** inicialices con README
4. Copia los comandos de la sección "...or push an existing repository from the command line"

Ejecuta en tu terminal:
```bash
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git branch -M main
git push -u origin main
```

---

## **PASO 5: Despliega en Vercel**

1. Ve a https://vercel.com/signup
2. Haz clic en **"Continue with GitHub"**
3. Autoriza Vercel
4. Haz clic en **"Import Project"**
5. Selecciona tu repositorio `portfolio`
6. Vercel detectará automáticamente que es Next.js
7. Haz clic en **"Deploy"**

**¡Listo!** Tu sitio estará en vivo en unos minutos. Vercel te dará una URL como:
```
https://portfolio-xxx.vercel.app
```

---

## **PASO 6: Apunta tu dominio de GoDaddy a Vercel**

### A. En Vercel:

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **Domains**
4. Haz clic en **"Add Domain"**
5. Escribe tu dominio de GoDaddy (ej: `anamaria.com`)
6. Vercel te mostrará instrucciones de DNS

### B. En GoDaddy:

1. Ve a https://www.godaddy.com/
2. Inicia sesión
3. Ve a **"My Products"** → **Domains**
4. Haz clic en tu dominio
5. Ve a **"DNS"**
6. Añade los registros que Vercel te indicó (generalmente son nameservers)
7. Guarda los cambios

**Espera 24-48 horas** para que los DNS se propaguen.

---

## **PASO 7: Editar el sitio (desde aquí)**

Cada vez que hagas cambios:

```bash
# 1. Guarda los archivos
# 2. En la terminal:

git add .
git commit -m "Descripción del cambio"
git push

# 3. Vercel automáticamente va a:
#    - Detectar el cambio
#    - Compilar
#    - Desplegar (en ~1 minuto)
```

**Tu sitio estará actualizado automáticamente.** ✨

---

## **Archivos importantes a editar:**

- **Proyectos**: `/data/site-data.json`
- **Información personal**: `/data/site-data.json`
- **Estilos**: `/globals.css` o archivos de componentes
- **Contenido**: Edita los archivos en `/components` y `/pages`

---

## **Troubleshooting:**

### ❌ "Git not found"
Instala Git desde https://git-scm.com

### ❌ "Authentication failed on GitHub"
Crea un token personal:
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token
3. Usa el token como contraseña en git push

### ❌ "Vercel build fails"
1. Revisa los logs en https://vercel.com/dashboard/project-settings
2. Busca el error en los logs
3. Arregla el error y haz push de nuevo

---

## **Comandos útiles:**

```bash
# Ver estado de Git
git status

# Ver cambios pendientes
git diff

# Revertir cambios
git restore <archivo>

# Ver historial de cambios
git log --oneline
```

---

## **¿Preguntas?**

- Vercel docs: https://vercel.com/docs
- GitHub docs: https://docs.github.com
- Next.js docs: https://nextjs.org/docs

**¡Tu sitio está listo para desplegarse!** 🚀
