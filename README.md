# AURA

Web estática con Astro, Tailwind CSS y TypeScript: 22 páginas, galería filtrable, comparador y consulta de disponibilidad en tres pasos. Conserva el diseño original y sus fuentes Georgia y Arial.

## Desplegar en Vercel

1. Importa el repositorio `rozen1993/aura` y selecciona la rama `main`.
2. Usa la raíz del repositorio como Root Directory.
3. Framework: **Astro**. Node.js: **24.x**.
4. Instalación: `npm ci`. Build: `npm run build`. Output Directory: `dist`.
5. Pulsa **Deploy**.

`vercel.json` define instalación, framework, build y salida. El proyecto genera HTML estático y no necesita adaptador de servidor. No requiere variables de entorno para su primer despliegue. Cuando tengas el dominio definitivo, configura `PUBLIC_SITE_URL` con su URL completa y reconstruye para generar canonical y sitemap.

Referencia: [Astro en Vercel](https://vercel.com/docs/frameworks/frontend/astro).

## Desarrollo local

Requiere Node.js 24.

```sh
npm ci
npm run dev -- --port 4321
```

Abre http://127.0.0.1:4321/. En PowerShell puedes usar `npm.cmd` si la ejecución de scripts está deshabilitada.

```sh
npm run check
npm run build
npm run preview
```

`npm test` ejecuta las pruebas de rutas, enlaces, responsive, filtros, diálogo, menú, FAQ y formulario. El entorno de pruebas actual utiliza Microsoft Edge instalado en Windows; no se ejecuta durante el despliegue de Vercel.

## Contenido y fotografías

- `src/content/site.json`: marca, moneda, WhatsApp, Instagram, dirección, horarios y siete paquetes. `price: null` muestra «Cotización personalizada».
- `src/content/business.ts`: reglas compartidas de paquetes y configuración del modo de revisión.
- `src/content/photos.json`: fotografías, dimensiones, tamaños responsive y puntos focales.
- `public/images/editorial/`: imágenes WebP utilizadas por la web. Representan seis modelos ficticias, un interior conceptual y un ejemplo de comparación creados con IA. Están identificadas como ilustrativas; no son clientas ni portafolio real.
- `src/components/`, `src/layouts/`, `src/pages/`: componentes reutilizables y rutas estáticas de Astro.
- `src/lib/booking.ts`, `src/scripts/booking.ts`: validación y consulta en tres pasos.

Las referencias de diseño, capturas y fuentes PNG de generación se conservan solo en el espacio de trabajo local y no se incluyen en GitHub ni en el despliegue. El ZIP original se eliminó a petición del usuario.

## Consulta y datos pendientes

El formulario valida fecha en America/Lima, hora, cantidad de personas, lugar, teléfono internacional, consentimiento y responsable para quinceañeras. Los grupos requieren cuatro personas y Bridal Luxury tres. Volver conserva los datos de la página actual; recargar los reinicia. No se almacenan datos personales ni se envían mensajes automáticamente.

Sin WhatsApp del negocio, permite copiar la consulta. Con un número internacional válido configurado, abre WhatsApp con el mensaje preparado y la persona decide enviarlo. La consulta no confirma una reserva.

Marca confirmada: AURA. Tres propuestas de identidad están en public/brand/propuestas.html. Pendientes comerciales: logo definitivo, WhatsApp, ubicación y cobertura, horarios, precios e inclusiones aprobadas, fotos reales autorizadas, duración de retoques Luxury, pagos, cancelaciones y políticas finales.

El modo de revisión conserva `noindex`, bloquea robots y muestra avisos de referencia. Privacidad y condiciones están marcadas como borradores. Desactiva `reviewMode` solo tras aprobar y completar el contenido; las imágenes de galería requieren aprobación para mostrarse fuera de revisión.
