import { getEntry, getCollection } from 'astro:content';

/** Ajustes globales del sitio (src/content/settings/site.json). */
export async function getSite() {
  const entry = await getEntry('settings', 'site');
  if (!entry) throw new Error('Falta src/content/settings/site.json');
  return entry.data as SiteSettings;
}

/** Niveles de patrocinio (src/content/settings/sponsorship.json). */
export async function getSponsorship() {
  const entry = await getEntry('settings', 'sponsorship');
  if (!entry) throw new Error('Falta src/content/settings/sponsorship.json');
  return entry.data as { intro: string; levels: SponsorLevel[]; otherNote: string };
}

export type SponsorLevel = { name: string; amount: number; featured?: boolean; perks: string[] };

export type SiteSettings = {
  name: string; fullName: string; tagline: string; description: string;
  email: string; mailingAddress: string; facebook?: string; linkedin?: string;
  donateUrl: string; scholarshipDonateUrl?: string;
  ticketsUrl?: string; ticketsLabel?: string;
  nominationFormEn: string; nominationFormEs?: string; nominationsOpen?: boolean; nominationsDeadline?: string;
  scholarshipFormEn: string; scholarshipFormEs?: string;
  boardApplicationFile?: string; newsletterAction?: string;
  announcement?: string; announcementLink?: string; announcementLinkLabel?: string;
};

export const AWARD_LABELS: Record<string, string> = {
  'woman-of-the-year': 'Woman of the Year',
  'rising-swan': 'Rising Swan',
  'lifetime-achievement': 'Lifetime Achievement',
  'humanitarian': 'Humanitarian Award',
  'woman-of-recognition': 'Woman of Recognition',
};

/** Honorees de un premio, ordenadas de más reciente a más antigua. */
export async function getHonorees(award?: string) {
  const all = await getCollection('honorees', (e) => (award ? e.data.award === award : true));
  return all.sort((a, b) => b.data.year - a.data.year || a.data.name.localeCompare(b.data.name));
}

/** Agrupa cualquier lista con `data.year` por año (desc). */
export function groupByYear<T extends { data: { year: number } }>(items: T[]) {
  const map = new Map<number, T[]>();
  for (const it of items) map.set(it.data.year, [...(map.get(it.data.year) ?? []), it]);
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
}
