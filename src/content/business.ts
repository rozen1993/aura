import content from './site.json' with {type:'json'};
export interface Package {
  id: string; name: string; universe: 'beauty' | 'bridal' | 'xv' | 'grupal'; eyebrow: string; summary: string; audience: string;
  includes: string[]; excludes: string[]; trial: boolean; highlight?: boolean; price: number | null; currency: string; priceMode: string;
}
export const site = { ...content, reviewMode: true, maxPeople: 30, luxuryRetouchHours: null as number | null };
export const packages = content.packages as Package[];
export const packageRules = (p?: Package) => ({
  minPeople: p?.id === 'bridal-luxury' ? 3 : ['bride-tribe', 'sweet-xv-party'].includes(p?.id || '') ? 4 : 1,
  event: p ? (p.universe === 'xv' || p.id === 'sweet-xv-party' ? 'quinceanero' : p.universe === 'bridal' || p.id === 'bride-tribe' ? 'matrimonio' : 'evento') : '',
  service: p?.id === 'social' ? 'maquillaje' : 'ambos',
  companions: p?.id === 'bridal-luxury' ? 2 : ['bride-tribe', 'sweet-xv-party'].includes(p?.id || '') ? 3 : 0,
});
export function priceLabel(p: Package) {
  if (p.price === null || p.priceMode === 'cotizar') return 'Cotización personalizada';
  return (p.priceMode === 'desde' ? 'Desde ' : '') + new Intl.NumberFormat(site.locale, { style: 'currency', currency: p.currency }).format(p.price);
}
