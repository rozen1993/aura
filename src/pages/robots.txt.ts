import type { APIRoute } from 'astro';
import {site} from '../content/business';
export const GET: APIRoute = ({site: url}) => new Response(`User-agent: *\n${site.reviewMode ? 'Disallow: /' : 'Allow: /'}\n${url && !site.reviewMode ? `Sitemap: ${new URL('/sitemap-index.xml',url)}` : ''}`, {headers:{'Content-Type':'text/plain'}});
