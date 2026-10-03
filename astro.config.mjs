import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
const site = process.env.PUBLIC_SITE_URL;
export default defineConfig({ output: 'static', site: site || undefined, integrations: site ? [sitemap()] : [], vite: { plugins: [tailwindcss()] }, devToolbar: { enabled: false } });
