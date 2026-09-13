import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada colección corresponde a una carpeta en src/content/.
// Los editores añaden/modifican archivos .md desde el panel /admin (o a mano).

const honorees = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/honorees' }),
  schema: z.object({
    name: z.string(),
    year: z.number().int(),
    award: z.enum(['woman-of-the-year', 'rising-swan', 'lifetime-achievement', 'humanitarian', 'woman-of-recognition']),
    category: z.string().optional(),
    title: z.string().optional(),
    photo: z.string().optional(),
    note: z.string().optional(),
  }),
});

const scholars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scholars' }),
  schema: z.object({ name: z.string(), year: z.number().int() }),
});

const board = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/board' }),
  schema: z.object({ name: z.string(), role: z.string().default('Board Member'), photo: z.string().optional(), order: z.number().default(99) }),
});

const memoriam = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/memoriam' }),
  schema: z.object({ name: z.string(), photo: z.string().optional(), years: z.string().optional(), order: z.number().default(99) }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    time: z.string().optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    heroImage: z.string().optional(),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/settings' }),
  schema: z.record(z.string(), z.any()),
});

export const collections = { honorees, scholars, board, memoriam, events, pages, settings };
