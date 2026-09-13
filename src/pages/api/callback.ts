/**
 * Paso 2 del login del panel /admin: GitHub vuelve aquí con un `code`,
 * lo cambiamos por un token y se lo entregamos a la ventana del CMS.
 */
import type { APIRoute } from 'astro';
export const prerender = false;

const page = (status: 'success' | 'error', payload: unknown) => `<!doctype html>
<html><body><script>
(function () {
  var msg = 'authorization:github:${status}:' + JSON.stringify(${JSON.stringify(payload)});
  function receive(e) { window.opener.postMessage(msg, e.origin); window.removeEventListener('message', receive); }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script><p>Signing you in…</p></body></html>`;

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const html = { headers: { 'content-type': 'text/html; charset=utf-8' } };

  if (!code || !clientId || !clientSecret) {
    return new Response(page('error', { error: 'Missing code or OAuth server configuration.' }), { ...html, status: 400 });
  }
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = (await res.json()) as { access_token?: string; error?: string; error_description?: string };
  if (!data.access_token) {
    return new Response(page('error', { error: data.error_description ?? data.error ?? 'GitHub did not return a token.' }), { ...html, status: 401 });
  }
  return new Response(page('success', { token: data.access_token, provider: 'github' }), html);
};
