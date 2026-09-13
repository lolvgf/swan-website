// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Todas las páginas se generan como HTML estático en el build.
// Solo /api/auth y /api/callback (login del panel /admin) corren en Node.
export default defineConfig({
  site: 'https://www.swanskagit.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  trailingSlash: 'never',
  build: { format: 'directory' },
  // Rutas antiguas del sitio Squarespace -> nuevas rutas
  redirects: {
    '/woy': '/women-of-the-year',
    '/swanscholarship': '/swan-scholarship',
    '/get-involved-1': '/get-involved',
    '/volunteer-2': '/get-involved',
  },
});
