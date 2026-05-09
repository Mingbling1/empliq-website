# empliq — DESIGN

> Sistema visual derivado del probe `D2-bw-vermillion.png` (sistema) + `D3-documentary.png` (hero photo dirección). Documental editorial peruano, B&W con bermellón como único acento semántico.

## Color (OKLCH)

Cero `#000` / `#fff` puros. Todos los neutros tintados levemente al cálido.

```css
:root {
  /* Surfaces */
  --paper:        oklch(0.97 0.005 60);  /* off-white cream warm */
  --paper-deep:   oklch(0.94 0.006 60);  /* secciones alternadas */
  --ink:          oklch(0.18 0.012 60);  /* near-black tinted warm */
  --ink-soft:     oklch(0.30 0.010 60);  /* body text alternative */
  --ink-muted:    oklch(0.45 0.008 60);  /* captions, metadata */
  --rule:         oklch(0.85 0.005 60);  /* dividers, borders */
  --rule-soft:    oklch(0.92 0.004 60);  /* dividers ultra suaves */

  /* Único acento — semántico, NO decorativo */
  --vermillion:        oklch(0.55 0.22 25);   /* CTA primario, ratings ≤4, alertas */
  --vermillion-deep:   oklch(0.42 0.18 25);   /* hover state del CTA */
  --vermillion-soft:   oklch(0.92 0.05 25);   /* background sutil de tags de alerta */
}

/* Dark register reservado para secciones específicas tipo "manifiesto" */
@media (prefers-color-scheme: dark) {
  /* Por ahora opt-in, NO automático. La home vive en light paper. */
}
```

### Reglas de uso del bermellón

| Permitido | Prohibido |
|---|---|
| CTA primario ("Compartir mi experiencia", "Buscar") | Bordes genéricos |
| Ratings críticos (Trato/Salario/Honestidad ≤ 4/10) | Hovers genéricos |
| Tags de alerta ("ALERTA · HONESTIDAD BAJA") | Subrayados |
| Punto de mediana en charts salariales | Iconos decorativos |
| Underline animado en headlines clave (1 sola palabra) | Backgrounds de cards |

Si una página tiene >3 elementos en bermellón, está mal: el acento perdió su peso semántico.

## Tipografía

Todas Google Fonts (open-source, sin licencias comerciales).

```css
:root {
  --font-display: 'Fraunces', 'Playfair Display', Georgia, serif;
  /* Variable: opsz, wght 100-900, ital — para headlines editoriales con italic genuino */

  --font-sans:    'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  /* Variable: wght 100-900 — body, UI, labels */

  --font-serif-text: 'Newsreader', Georgia, serif;
  /* Variable: opsz, wght — pull-quotes, testimonios largos */

  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
  /* Counters, codes anónimos (ANÓNIMO 4827), tags, metadata */
}
```

### Escala (ratio 1.333 perfect-fourth, no flat scales)

| Token | Tamaño | Línea | Uso |
|---|---|---|---|
| `--text-display`  | clamp(3rem, 8vw, 6rem)   | 0.95 | Headlines de hero (italic display serif) |
| `--text-h1`       | clamp(2rem, 4vw, 3.5rem) | 1.05 | Section heads |
| `--text-h2`       | clamp(1.5rem, 2.5vw, 2.25rem) | 1.15 | Subsection heads |
| `--text-h3`       | 1.5rem  | 1.25 | Card titles |
| `--text-body`     | 1.0625rem | 1.6 | Body principal (con `ch` cap a 65–75ch) |
| `--text-small`    | 0.875rem | 1.5 | Captions, metadata |
| `--text-mono-sm`  | 0.75rem  | 1.4 | Counters, tags, ANÓNIMO labels |

Pesos:
- Display italic 300/400 (Fraunces opsz>72) — never bold
- Headline sans 600/700
- Body 400
- Mono 500

## Layout

### Grid

12-column editorial. Gutters generosos. NO `max-w-7xl` por defecto:

```css
:root {
  --container-narrow:  44rem;   /* artículos de manifiesto */
  --container-content: 64rem;   /* secciones principales */
  --container-wide:    92rem;   /* hero + secciones full-bleed */
}
```

### Spacing rhythm

Variar, no uniforme. Stack mínimo:

```
section padding-y: clamp(4rem, 8vw, 8rem)
inter-section divider: 1px ink-rule + 4rem above/below
```

### Cards

Por default NO usar cards con sombra. Si necesitas separación, usa `border-top: 1px solid var(--rule)` o `padding-left: 2rem; border-left: 1px solid var(--rule)`. Cards solo en testimonios (donde la metáfora "tarjeta" tiene sentido editorial: una página arrancada).

Nunca cards anidadas. Nunca cards con shadow blur.

## Motion

Ease-out exponencial únicamente:

```css
:root {
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);

  --dur-fast:   180ms;  /* hover, focus */
  --dur-base:   320ms;  /* card transitions */
  --dur-slow:   620ms;  /* page reveals, headline reveal */
}
```

Animaciones permitidas:

1. **Underline draw** en palabras italicizadas del headline — SVG `stroke-dasharray` 1.2s ease-out al cargar (1 vez)
2. **Counter rollup** de los números 85,000 / 47,213 / 12,890 al entrar al viewport
3. **Testimonial cards rotation** — cross-fade cada 8s entre 5 testimonios reales (CSS `@keyframes`)
4. **Search placeholder cycle** — placeholder rota entre puestos peruanos: `Backend Sr...`, `Analista de Marketing...`, `Asistente de Gerencia...`
5. **Rating bars fill** — al entrar en viewport, `transform: scaleX(0) → scaleX(rating/10)` con ease-out-expo
6. **Vermillion CTA breathing glow** — opcional, `box-shadow` 3s ease-in-out infinite (sutil, NO molesta)

NO permitido: bounce, elastic, spring, parallax pesado, scroll-jacking, animaciones de layout (`width/height/margin`), GSAP timelines complejos para el inicio.

`prefers-reduced-motion: reduce` desactiva todo lo de arriba excepto los crossfades.

## Iconografía

Sistema line-icons custom de 9 íconos en pure ink (vistos en D1/D2):
- search · share · anonymous-mask · building · soles-symbol · clock · shield · chart · flag

Stroke 1.5px, esquinas semi-redondeadas, mismo bounding box 24×24. Inline SVG (no librerías). Para íconos extra (settings, footer social), usar `lucide-react` ya instalado pero **sin colores**, todos `currentColor`.

## Wordmark

`empliq.` con punto al final (presente en D1/D2). El punto es el sello: cierra una declaración. Geometric heavy sans (Inter Display 800 funciona) o probar **Recoleta-equivalente open-source: `Bricolage Grotesque` o `Space Grotesk`**.

Variaciones a producir como SVG en `public/wordmark/`:
1. `lockup-full.svg` — empliq.
2. `monogram.svg` — `e.` con chakana sutil integrada en el counter de la `e`
3. `stacked.svg` — `empliq` arriba `.` abajo
4. `inverted.svg` — wordmark blanco en cuadrado ink

## Hero photograph

Una sola foto. Generada con Higgsfield gpt_image_2 4K, B&W documental:

- Avenida Abancay, Lima, amanecer
- Colectivos en motion blur con cartel "ABANCAY" visible
- Peatones cruzando hacia el trabajo, motion blur de zancada
- Cerro San Cristóbal con cruz blanca al fondo, en bruma
- Composición rule-of-thirds, cruz en upper-third
- Sin texto, sin overlay, foto pura

Treatment en CSS:
- `filter: contrast(1.05) brightness(0.92)` para profundizar más
- Overlay sutil: `linear-gradient(180deg, transparent 0%, oklch(0.18 0.012 60 / 0.3) 100%)` para que el copy del hero se lea sobre la parte inferior
- `object-position: center bottom` para que el cruce de peatones quede en zona segura

## Componentes — principios

### Search bar
Inline en hero. Borde fino `1px solid var(--ink)`. Cursor visible siempre. Placeholder rota.

### Anonymous quote card
Estructura:
```
[ANÓNIMO 4827 · ROL · INDUSTRIA · LIMA]   ← mono small
"Italic serif Newsreader pull-quote..."   ← serif text
[Trato 6/10 · Salario 7/10 · Honestidad 4/10]  ← mono small, números críticos en bermillón
                                          [→ leer completa]  ← link sans
```

### Salary chart
Box-and-whisker horizontal en pure ink. Mediana = punto bermellón. Eje en mono. Sin gridlines pesadas, solo ticks.

### Counters
Formato peruano: `85,000` con coma como separador de miles, NO `85k`. `S/ 3,200` siempre con espacio entre símbolo y número.

### Footer
Editorial: una sola línea de info legal + 3 columnas de navegación + manifiesto link en serif italic. NO logos sociales pesados.

## Decisiones pendientes (`[CONFIRMAR]`)

1. **Headline definitivo**: votos por:
   - "Lo que ganan. Lo que callan." (D2, conciso, italic display)
   - "Cada empresa peruana tiene su versión oficial. Aquí guardamos la otra." (D3, narrativo)
   - Combo: D3 como headline display + D2 como subhead corto
2. **Wordmark con punto** (`empliq.`) sí o no — recomendación: sí, le da sello
3. **Tipografía display**: Fraunces vs alternativa premium. Fraunces es free y excelente.
4. **Eliminar `@react-three/fiber`** del bundle si no se va a usar. Recomendación: sí, eliminar.
5. **Dark variant** para `/manifiesto` — opcional, evaluar después
