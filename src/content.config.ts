import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
    schema: z.object({
        title: z.string(),
        // Used for the <meta name="description"> and social previews.
        description: z.string(),
        // Intro paragraph under the title. **bold** works.
        lead: z.string(),
        meta: z.array(z.object({ label: z.string(), value: z.string() })),
        metaNote: z.string().optional(),
        summary: z.array(z.string()).optional(),
        summaryLabel: z.string().optional(),
        // The numbered section index on the left. Ids must match <Section id="…">.
        rail: z.array(z.object({ id: z.string(), label: z.string() })).default([]),
        // Narrow single-column layout with no section index (small projects).
        compact: z.boolean().default(false),
        // Keep the page out of search results (e.g. while it's unlisted).
        noindex: z.boolean().default(false),
        socialImage: z.string().default('/images/og-image.png'),
    }),
});

export const collections = { projects };
