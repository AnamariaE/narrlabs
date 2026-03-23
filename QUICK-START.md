# ⚡ INICIO RÁPIDO - 5 MINUTOS

## 📋 Lo que necesitas:

1. ✅ **Git** instalado (https://git-scm.com)
2. ✅ **GitHub** cuenta (https://github.com)
3. ✅ **Vercel** cuenta (https://vercel.com)

---

## 🚀 3 PASOS SIMPLES:

### **PASO 1: Sube a GitHub**

```bash
cd /Users/anamaria/Documents/Sitio

git init
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git branch -M main
git push -u origin main
```

*(Crea el repo en https://github.com/new primero)*

### **PASO 2: Conecta Vercel**

1. Ve a https://vercel.com/new
2. Selecciona GitHub → Tu repositorio
3. Haz clic en **"Deploy"**

### **PASO 3: Apunta tu dominio**

En GoDaddy, añade los **nameservers de Vercel** que te indica.

---

## ✨ ¡LISTO!

Tu sitio estará en vivo en minutos. Cada vez que hagas cambios:

```bash
git add .
git commit -m "Cambio realizado"
git push
```

Vercel automáticamente despliega. ✨

---

📚 Más detalles en **DEPLOYMENT-GUIDE.md**
