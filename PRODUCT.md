# empliq — PRODUCT

> Plataforma anónima de transparencia salarial y reseñas laborales para profesionales peruanos.

## Register

**brand**

empliq.io es la landing pública de la plataforma. El diseño aquí ES el producto: comunicar credibilidad, voz, peruanidad y respeto al usuario. La aplicación interna (búsqueda, formularios, perfiles) tiene su propio register `product` y vive bajo `(app)/`.

## Producto

### Qué es

Una red anónima donde profesionales peruanos comparten:

- **Sueldos reales** — lo que efectivamente ganan, por puesto y empresa
- **Reseñas de empresas** — trato, forma de trabajo, cultura, jefaturas
- **Beneficios y requisitos** — qué ofrecen, qué exigen en entrevistas

Ya hay 85,000 empresas peruanas indexadas (15% del universo formal scrapeado del SUNAT/SUNARP/etc.). La gente busca por empresa, deja su descargo, comparte su sueldo. Login con Google obligatorio para reducir bots, pero la identidad pública es siempre un handle anónimo (`ANÓNIMO 4827`).

### Por qué existe

**Asimetría de información.** En Perú, hablar de sueldo es tabú; las empresas conocen el mercado y los trabajadores no. empliq invierte la asimetría sin obligar a nadie a romper el tabú: el dato circula, pero la persona queda protegida.

Casi sin fines de lucro. La motivación es civic: que más peruanos puedan negociar mejor.

## Usuarios

| Persona | Contexto | Estado mental | Lo que quiere |
|---|---|---|---|
| Postulante activo | Tiene una entrevista mañana | Ansioso, con prisa | Saber rango salarial real, cómo es la entrevista, red flags |
| Empleado que evalúa irse | 2-3 años en una empresa, considera moverse | Reflexivo, comparativo | Comparar su sueldo con el mercado, ver qué piensan de otras empresas |
| Trabajador que quiere aportar | Ya tuvo experiencias laborales | Catártico, justiciero o agradecido | Dejar registro anónimo de lo que vivió, ayudar a otros |
| Estudiante por egresar | Próximo a su primer empleo | Curioso, sin referencias | Aprender qué es razonable pedir, qué empresas tratan bien |

Todos peruanos. Mayoría Lima/Arequipa/Trujillo. 22-45 años. Smartphones primero pero usan desktop para investigar serio. Español Perú, no español neutro.

## Tono y voz

- **Periodístico, no promocional.** El sitio NO se vende a sí mismo, presenta evidencia.
- **Valiente y restrained.** Decir las verdades incómodas con respeto, no con escándalo.
- **Anónimo como dignidad.** El anonimato no es disfraz, es la condición que permite la verdad.
- **Peruanidad sutil.** Referencias a Lima, soles, empresas locales — sin folklore turístico ni clichés andinos.
- **Datos en lenguaje natural.** "47,213 sueldos compartidos" suena mejor que "47K shared salaries".

Voz primera persona plural cuando habla la plataforma ("guardamos", "presentamos"). Tercera persona cuando cita testimonios. Nunca usar "tú/usted" en headlines, sí en CTAs y formularios.

## Anti-references

| NO ser | Por qué |
|---|---|
| **Glassdoor / Indeed** | Genéricos, USA-céntricos, llenos de SEO spam, voz corporativa |
| **Linear / Vercel / Stripe** | Gradient hero + cards, estética SaaS B2B genérica que no corresponde a este producto cívico |
| **Webflow templates** | Hero oversized + features con icon + heading + párrafo |
| **Reddit** | Voz cruda sin curaduría editorial; queremos lo opuesto |
| **Páginas gubernamentales peruanas tradicionales** | Burocráticas, mal tipografiadas, desconfiables |
| **Folklore turístico (chullos, llamas, quinua)** | Peruanidad mal entendida; respetamos al lector, no infantilizamos |

## Strategic principles

1. **El dato es protagonista**, no el copy promocional. Si un número puede reemplazar un adjetivo, gana el número.
2. **Anonimato visible.** Los handles `ANÓNIMO N` son parte del lenguaje visual, no detalle escondido.
3. **Densidad editorial** sobre minimalismo SaaS. Una página con mucho contenido bien jerarquizado supera a un hero vacío con 3 features.
4. **Tipografía hace el trabajo** que normalmente harían imágenes decorativas. Cero ilustraciones cute, cero stock photos genéricas.
5. **Una sola foto poderosa** (el hero documental de Lima al amanecer) carga el peso visual de toda la marca. El resto es tipografía + dato + ink.
6. **Bermellón como semántica**, no como decoración. Solo aparece en CTAs primarios, ratings críticos (≤4/10), y alertas. Nunca en bordes ni hovers genéricos.
7. **Loading states con voz.** En lugar de spinners, mostrar `Buscando entre 85,000 empresas...` con cursor blink. La espera es parte del producto.

## Datos para la home

- **85,000** empresas peruanas indexadas
- **47,213** sueldos compartidos *(placeholder; live API en `getPlatformStats()`)*
- **12,890** reseñas anónimas *(placeholder; live API)*
- *(números actuales se leen del backend en build/runtime; los del mock son indicativos)*

## Constraints técnicos

- Stack: Next.js 15 (App Router), Tailwind 4, shadcn, Supabase (auth + data), Cloudflare Workers (deploy via opennextjs-cloudflare)
- `@react-three/fiber` está en deps pero sin uso claro — evaluar descarte para reducir bundle
- Auth: Google OAuth via Supabase, pero la UI nunca muestra la identidad real
- Multi-currency/i18n existe (`CurrencyLanguageSelector`) — mantener pero default Perú/PEN/Español
- SEO: el `page.tsx` actual ya tiene JSON-LD bien estructurado, conservar
