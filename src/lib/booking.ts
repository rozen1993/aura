import {packages, packageRules,site} from '../content/business';
export const events = {matrimonio:'Matrimonio',quinceanero:'Quinceañero',evento:'Fiesta / evento',fotografia:'Sesión fotográfica',graduacion:'Graduación',otro:'Otro'};
export const services = {maquillaje:'Maquillaje',peinado:'Peinado',ambos:'Maquillaje + peinado'};
export type Booking = {evento:string;paquete:string;fecha:string;hora:string;personas:string;servicio:string;modalidad:string;lugar:string;nombre:string;responsable:string;telefono:string;notas:string;consentimiento:boolean;personalizar:boolean};
export type Errors = Partial<Record<keyof Booking,string>>;
export function today(timezone = site.timezone) {
  const parts = new Intl.DateTimeFormat('en-US',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  return ['year','month','day'].map(type => parts.find(p => p.type===type)!.value).join('-');
}
export function phoneDigits(phone:string){return phone.replace(/[\s()+.-]/g,'');}
export function initialBooking(query:URLSearchParams):Partial<Booking> {
  const p=packages.find(p => p.id===query.get('paquete'));
  if(p){const rule=packageRules(p);return {paquete:p.id,evento:rule.event,servicio:rule.service,personas:String(rule.minPeople)};}
  return {paquete:'',evento:Object.hasOwn(events,query.get('evento')||'') ? query.get('evento')! : '',servicio:Object.hasOwn(services,query.get('servicio')||'') ? query.get('servicio')! : 'ambos'};
}
export function needsCustomization(b:Booking){const p=packages.find(p => p.id===b.paquete);if(!p)return false;const rule=packageRules(p);return b.servicio!==rule.service || (['matrimonio','quinceanero'].includes(rule.event)&&b.evento!==rule.event);}
export function validateEvent(b:Booking):Errors {
  const errors:Errors={};const p=packages.find(p => p.id===b.paquete);
  if(!Object.hasOwn(events,b.evento))errors.evento='Selecciona una ocasión.';
  if(b.paquete&&!p)errors.paquete='Selecciona una experiencia válida o solicita asesoría.';
  const parsed=new Date(b.fecha+'T12:00:00Z');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(b.fecha)||!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==b.fecha||b.fecha<today())errors.fecha='Elige una fecha de hoy o posterior.';
  if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(b.hora))errors.hora='Indica la hora en que deben estar listas.';
  const n=Number(b.personas);const min=packageRules(p).minPeople;
  if(!b.personas||!Number.isInteger(n)||n<min||n>site.maxPeople)errors.personas=`Indica un número entero entre ${min} y ${site.maxPeople}. ${min>1 ? 'Puedes elegir otro paquete si son menos personas.' : ''}`;
  if(!Object.hasOwn(services,b.servicio))errors.servicio='Elige maquillaje, peinado o ambos.';
  if(!['estudio','domicilio'].includes(b.modalidad))errors.modalidad='Selecciona una modalidad.';
  if(!b.lugar.trim()||b.lugar.trim().length>120)errors.lugar='Escribe ciudad y distrito, hasta 120 caracteres.';
  if(needsCustomization(b)&&!b.personalizar)errors.personalizar='Confirma la personalización bajo cotización o cambia los servicios, la ocasión o el paquete.';
  return errors;
}
export function validateContact(b:Booking):Errors {
  const errors:Errors={};
  if(!b.nombre.trim()||b.nombre.trim().length>100)errors.nombre='Escribe tu nombre, hasta 100 caracteres.';
  if(b.evento==='quinceanero'&&(!b.responsable.trim()||b.responsable.trim().length>100))errors.responsable='Indica el nombre de la persona responsable, hasta 100 caracteres.';
  if(!/^\+?[\d\s().-]+$/.test(b.telefono.trim())||!/^\d{8,15}$/.test(phoneDigits(b.telefono)))errors.telefono='Escribe entre 8 y 15 dígitos con código de país. Puedes usar +, espacios o separadores.';
  if(b.notas.length>500)errors.notas='La nota puede tener hasta 500 caracteres.';
  if(!b.consentimiento)errors.consentimiento='Autoriza el uso de tus datos para responder a esta consulta.';
  return errors;
}
export function summaryPairs(b:Booking):[string,string][] {
  const p=packages.find(p => p.id===b.paquete);
  return [['Evento',events[b.evento as keyof typeof events]],['Fecha',b.fecha],['Hora en que debemos estar listas',b.hora],['Personas',b.personas],['Servicio',services[b.servicio as keyof typeof services]],['Paquete',p?.name||'Necesito asesoría'],['Modalidad',b.modalidad==='estudio'?'En estudio':'A domicilio'],['Lugar',b.lugar.trim()],['Nombre',b.nombre.trim()],['WhatsApp',phoneDigits(b.telefono)],...(b.evento==='quinceanero' ? [['Responsable',b.responsable.trim()] as [string,string]] : [])];
}
export function makeMessage(b:Booking) {
  const errors={...validateEvent(b),...validateContact(b)};
  if(Object.keys(errors).length)throw new Error('Completa y valida la consulta antes de preparar el mensaje.');
  return `Hola ${site.brand}, deseo consultar disponibilidad.\n${summaryPairs(b).map(([k,v]) => `${k}: ${v}`).join('\n')}${b.personalizar&&needsCustomization(b) ? '\nPersonalización: solicito adaptar el paquete bajo cotización.' : ''}${b.notas.trim() ? '\nMi idea: '+b.notas.trim() : ''}\nEntiendo que esta consulta no confirma la reserva.`;
}
export function whatsappURL(message:string,number:string|null=site.whatsapp){return number&&/^\d{8,15}$/.test(number) ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;}
