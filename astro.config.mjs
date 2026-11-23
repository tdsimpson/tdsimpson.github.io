import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
import remarkEditorialLists from './src/lib/remark-editorial-lists.mjs';

// The homepage, 404 and lab pages are plain HTML files in public/. GitHub Pages
// (and `npm run preview`) serve public/index.html at "/" automatically, but the
// dev server only serves public files at their exact path. This makes
// `npm run dev` behave the same: "/" -> public/index.html, "/lab/" -> public/lab/index.html.
const servePublicIndexPages = {
    name: 'serve-public-index-pages',
    configureServer(server) {
        server.middlewares.use((req, _res, next) => {
            const [pathname, query = ''] = (req.url || '').split('?');
            if (pathname.endsWith('/')) {
                const file = path.join(server.config.publicDir, decodeURIComponent(pathname), 'index.html');
                if (fs.existsSync(file)) req.url = `${pathname}index.html${query ? `?${query}` : ''}`;
            }
            next();
        });
    },
};

export default defineConfig({
    site: 'https://taylorsimpson.ca',
    integrations: [mdx()],
    markdown: {
        // Leave quotes exactly as written (no automatic curly-quote conversion).
        smartypants: false,
        remarkPlugins: [remarkEditorialLists],
    },
    vite: {
        plugins: [servePublicIndexPages],
    },
});
