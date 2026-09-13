/**
 * Paso 1 del login del panel /admin (Decap CMS + GitHub).
 * Redirige al usuario a GitHub para autorizar la app OAuth.
 * Requiere las variables de entorno OAUTH_GITHUB_CLIENT_ID y OAUTH_GITHUB_CLIENT_SECRET.
 */
import type { APIRoute } from 'astro';
export const prerender = false;

export const GET: APIRoute = ({ url, redirect }) => {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) return new Response('OAUTH_GITHUB_CLIENT_ID is not configured on the server.', { status: 500 });
  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: new URL('/api/callback', url.origin).toString(),
    scope: 'repo,user',
    state,
  });
  return redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
};
