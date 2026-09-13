# Sitio web de SWAN (Skagit Women's Alliance and Network)

Sitio moderno, rápido y fácil de mantener. Todo el contenido vive en archivos de texto dentro de
`src/content/` y se edita desde un panel visual en **`/admin`** (similar a WordPress) o directamente en GitHub.
Cada cambio guardado se publica solo en Render en 1‑2 minutos.

---

## 1. Cómo está organizado

| Carpeta / archivo | Qué contiene | Quién lo toca |
| --- | --- | --- |
| `src/content/settings/site.json` | Email, dirección, enlaces de donación, formularios, aviso superior… | Editoras (desde /admin) |
| `src/content/settings/sponsorship.json` | Niveles de patrocinio y sus beneficios | Editoras |
| `src/content/pages/*.md` | Textos de cada página (título, subtítulo, imagen, texto) | Editoras |
| `src/content/honorees/*.md` | Una ganadora por archivo (Women of the Year, Rising Swan, Lifetime) | Editoras |
| `src/content/scholars/*.md` | Una becaria por archivo | Editoras |
| `src/content/board/*.md` | Miembros de la junta | Editoras |
| `src/content/memoriam/*.md` | In Memoriam | Editoras |
| `src/content/events/*.md` | Eventos (con fecha; los pasados se archivan solos) | Editoras |
| `public/images/` | Fotos e imágenes | Editoras (se suben desde /admin) |
| `public/files/` | PDFs (solicitud a la junta) | Editoras |
| `public/admin/config.js` | Configuración del panel /admin | Solo al instalar |
| `src/pages/*.astro` | Plantillas de las páginas | Desarrollador/a |
| `src/components/`, `src/layouts/` | Piezas reutilizables (cabecera, pie, tarjetas) | Desarrollador/a |
| `src/styles/global.css` | Colores, tipografías y estilos globales | Desarrollador/a |

Ejemplo de una ganadora (`src/content/honorees/2025-silvia-reed-woman.md`):

```md
---
name: "Silvia Reed"
year: 2025
award: "woman-of-the-year"
category: "Mentorship of Women"
title: "Business Development & Foundation Director, Mount Vernon Chamber of Commerce"
photo: "/images/silvia-reed.jpg"
---
```

Al añadir un archivo así, la ganadora aparece automáticamente en la portada (si es del año más reciente),
en la página del premio y en el listado histórico. No hay que tocar ninguna plantilla.

---

## 2. Editar contenido

### Opción A: panel visual `/admin` (recomendado)

1. Entra en `https://TU-DOMINIO/admin/` e inicia sesión con GitHub.
2. Elige la colección (Award recipients, Events, Page text, Site settings…), edita y pulsa **Publish**.
3. En 1‑2 minutos el sitio se actualiza solo.

Requiere la configuración del apartado 4.3 (GitHub OAuth App). Hasta entonces usa la opción B o C.

### Opción B: editar en GitHub

Abre el archivo en GitHub, pulsa el lápiz, edita y "Commit changes". Render publica el cambio automáticamente.

### Opción C: panel visual en tu computadora (sin login)

```bash
npm install        # solo la primera vez
npm run cms        # abre http://localhost:4321/admin
```

El panel escribe directamente en los archivos de tu copia local. Cuando termines: `git add -A && git commit -m "Actualizo contenido" && git push`.

---

## 3. Trabajar en local

```bash
npm install     # instala dependencias (Node 22 o superior)
npm run dev     # sitio en http://localhost:4321 con recarga automática
npm run build   # genera la versión de producción en dist/
npm start       # sirve la versión de producción (lo que usa Render)
```

---

## 4. Publicar en Render (paso a paso)

### 4.1 Subir el código a GitHub

1. Crea un repositorio nuevo en GitHub (por ejemplo `swan-website`, puede ser privado).
2. En esta carpeta:
   ```bash
   git init
   git add -A
   git commit -m "Nuevo sitio web de SWAN"
   git branch -M main
   git remote add origin https://github.com/lolvgf/swan-website.git
   git push -u origin main
   ```
3. Edita `public/admin/config.js` y cambia `GITHUB_REPO` por `lolvgf/swan-website`. Haz commit y push.

### 4.2 Crear el servicio en Render

1. En [render.com](https://render.com) → **New → Blueprint** → conecta el repositorio.
   Render lee `render.yaml` y crea el servicio web automáticamente (plan gratuito).
2. Cuando pida las variables `OAUTH_GITHUB_CLIENT_ID` y `OAUTH_GITHUB_CLIENT_SECRET`, déjalas vacías por ahora
   (se rellenan en 4.3) o ponlas si ya las tienes.
3. Al terminar el primer deploy tendrás una URL tipo `https://swan-website.onrender.com`.

> **Plan gratuito:** el servicio se "duerme" tras 15 minutos sin visitas y la primera visita tarda ~30 s.
> Para evitarlo, cambia `plan: free` por `plan: starter` en `render.yaml` (≈ 7 USD/mes).

### 4.3 Activar el login del panel `/admin`

El panel guarda los cambios en GitHub, así que necesita una "GitHub OAuth App":

1. GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Application name: `SWAN website admin`
   - Homepage URL: `https://swan-website.onrender.com` (o tu dominio)
   - Authorization callback URL: `https://swan-website.onrender.com/api/callback`
2. Copia el **Client ID** y genera un **Client Secret**.
3. En Render → tu servicio → **Environment** → añade `OAUTH_GITHUB_CLIENT_ID` y `OAUTH_GITHUB_CLIENT_SECRET`. Guarda (se redepliega solo).
4. Entra en `/admin/`, pulsa "Login with GitHub" y listo.

Las personas que editen necesitan una cuenta de GitHub con permiso de escritura en el repositorio
(Settings → Collaborators en GitHub).

### 4.4 Dominio propio (`www.swanskagit.com`)

Render → servicio → **Settings → Custom Domains → Add**. Render te indica el registro DNS (CNAME) que debes
crear en el proveedor del dominio. El certificado HTTPS se genera solo.

Si cambias de dominio, actualiza también la "Authorization callback URL" de la OAuth App (4.3) y `site` en `astro.config.mjs`.

---

## 5. Tareas frecuentes

| Quiero… | Dónde |
| --- | --- |
| Cambiar el aviso de la barra superior (o quitarlo) | Site settings → General → *Announcement bar text* (vacío = se oculta) |
| Poner el enlace de venta de entradas del banquete | Site settings → *Banquet tickets link* |
| Cambiar el enlace de donación (PayPal, Zeffy…) | Site settings → *Donate link* |
| Añadir las ganadoras de este año | Award recipients → **New Recipient** (una por persona) |
| Añadir becarias | Scholarship recipients → **New** |
| Crear un evento | Events → **New Event** (marca *Show on the home page* para destacarlo) |
| Cambiar miembros de la junta | Board members |
| Cambiar el texto de una página | Page text → elige la página |
| Cambiar precios o beneficios de patrocinio | Site settings → Sponsorship levels |
| Cambiar colores o tipografías | `src/styles/global.css` (variables al inicio del archivo) |
| Cambiar el menú | `src/components/Header.astro` (lista `nav`) |

**Pendiente de rellenar:** en `site.json` los enlaces `donateUrl` y `scholarshipDonateUrl` apuntan a una URL
genérica de PayPal. Sustitúyelos por los enlaces reales de donación de SWAN.

---

## 6. Redirecciones de la web antigua

Las rutas antiguas de Squarespace (`/woy`, `/swanscholarship`, `/get-involved-1`, `/volunteer-2`) redirigen a
las nuevas páginas (configurado en `astro.config.mjs`). Las URLs principales (`/about`, `/nominate`,
`/previous-woy`, `/rising-swan`, `/lifetime-achievement`, `/be-a-sponsor`, `/donate`, `/events`,
`/in-memoriam`, `/contact`, `/swan-scholarship`, `/women-of-the-year`) se mantienen iguales.

---

## 7. Tecnología

- [Astro](https://astro.build) 7: genera HTML estático muy rápido; solo dos rutas (`/api/auth`, `/api/callback`) corren en Node para el login del panel.
- [Decap CMS](https://decapcms.org): panel de edición sin base de datos; el contenido se guarda en GitHub.
- CSS propio sin frameworks (`src/styles/global.css`), tipografías Fraunces + Manrope (Google Fonts).
- Sin base de datos, sin plugins que actualizar, sin costes de licencia.
