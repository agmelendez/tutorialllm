# Lingüística & LLMs | Guía Pedagógica para Docentes de Inglés (INA)

Plataforma educativa interactiva desarrollada para la **Semana de Capacitación Docente del Instituto Nacional de Aprendizaje (INA)** — Núcleo Sector Comercio y Servicios / Subsector de Idiomas.

---

## 🚀 Despliegue en GitHub Pages

El proyecto ya está preparado para funcionar sin pantallas en blanco en GitHub Pages:

### Opción A: Despliegue Automático mediante GitHub Actions (Recomendado)
1. Suba el código a su repositorio de GitHub (`main` o `master`).
2. En GitHub, vaya a **Settings** > **Pages**.
3. En **Build and deployment** > **Source**, seleccione **GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` compilará y publicará la web automáticamente.

### Opción B: Despliegue desde la rama `gh-pages` o carpeta `dist`
1. Ejecute localmente:
   ```bash
   npm install
   npm run build
   ```
2. La carpeta compilada `dist/` contiene todo el sitio estático con `base: './'`, `.nojekyll` y `404.html`.
3. Puede publicar directamente el contenido de `dist/` en la rama `gh-pages`.

---

## 🛠️ Tecnologías
- **React 19 + TypeScript + Vite**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Error Boundary integrado**
- **Compatibilidad con rutas relativas para subdirectorios de GitHub (`base: './'`)**
