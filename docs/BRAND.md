# 29AprendeYa — Identidad de marca

Reemplaza a la marca anterior, descontinuada. Versión 1 · agosto 2026.
Referencia visual viva: `Identidad 29AprendeYa.dc.html` y `Vistas 29AprendeYa.dc.html`
(proyecto de diseño en claude.ai/design — sincronizar este archivo desde ahí, no al revés).

## Nombre

Siempre junto y en una palabra: **29AprendeYa**. No usar "29 Aprende Ya", "29AY" ni "AprendeYa" solo.
En el logotipo el "29" se separa visualmente dentro de un badge, pero el texto de marca nunca se parte.

## Concepto

Academia de bootcamps online para gente joven que aprende a programar desde su computadora.
Tono **profesional sobrio**: cercana pero seria, sin gamificación ni celebración exagerada.
"Ya" comunica inmediatez — se expresa con un solo acento naranja por pantalla, no con ruido visual.

## Paleta

### Modo claro
| Token | Hex | Uso |
|---|---|---|
| primary/100 | `#E3EAFE` | fondos de estado activo, chips seleccionados |
| primary/500 | `#3A66F0` | hover claro, gráficos |
| primary/600 | `#1F4BD8` | **color de marca y de acción** (botones, links, progreso) |
| primary/700 | `#1739A8` | hover/pressed, texto sobre primary/100 |
| accent/100 | `#FFEDE5` | fondo de badge "en vivo" |
| accent/600 | `#E85A20` | un solo acento por pantalla (CTA de clase en vivo) |
| bg | `#F7F8FA` | fondo de página |
| surface | `#FFFFFF` | tarjetas, barras, modales |
| border | `#E3E7EF` | bordes y divisores (`#EDF0F6` para divisor interno) |
| ink/400 | `#8A93A6` | texto deshabilitado, metadatos |
| ink/500 | `#5A6478` | texto secundario |
| ink/700 | `#263043` | texto de cuerpo |
| ink/900 | `#0B1220` | títulos, superficies oscuras |

### Modo oscuro
| Token | Hex |
|---|---|
| bg | `#0B1220` |
| surface | `#121A2A` |
| surface/2 | `#1A2437` |
| border | `#26314A` |
| primary | `#6E8CFF` (texto sobre él: `#0B1220`) |
| accent | `#FF8355` |
| text | `#E6EAF2` |
| text muted | `#9AA5BC` |

### Estados
success `#15803D` · warning `#B45309` · error `#C81E1E` · info `#0369A1`.
Fondos suaves: `#E7F4EC` / `#FEF3E2` / `#FDECEC` / `#F2F7FD`.

Ningún color se hereda de la marca anterior. Todos los pares texto/fondo de la tabla cumplen 4.5:1 o mejor.

## Tipografía

| Familia | Uso | Pesos |
|---|---|---|
| **Sora** | h1–h4, wordmark, números destacados | 600, 700 |
| **IBM Plex Sans** | todo el texto de interfaz | 400, 500, 600 |
| **JetBrains Mono** | código, IDs de cohorte, etiquetas técnicas | 400, 600 |

Roboto se retira junto con la marca vieja. Instalar `@fontsource/sora`, `@fontsource/ibm-plex-sans`, `@fontsource/jetbrains-mono` (evita depender de Google Fonts en runtime).

Escala: h1 44/1.1/-0.025em · h2 30/1.2 · h3 24/1.25 · h4 20/1.3 · body1 16/1.65 · body2 14/1.6 · caption 13.
Mínimo de texto de interfaz: 13px. Mínimo de área táctil: 44px.

## Logotipo

Wordmark tipográfico en minúsculas, una sola palabra, sin badge ni contenedor: **29aprendeya** seguido de un **cursor** rectangular.

- **Primario (claro)**: Sora 600, tracking -0.045em, texto `#0B1220`, "29" en `#1F4BD8`, cursor en `#E85A20`.
- **Inverso (oscuro)**: texto `#FFFFFF`, "29" en `#6E8CFF`, cursor en `#FF8355`.
- **Isotipo**: `29` + cursor — favicon, app icon, avatar.
- **Cursor solo**: marca de agua, loaders, estados vacíos.
- **Monocromo**: todo en una tinta, para facturas e impresión.
- Geometría: el cursor mide 0,4 × la altura de caja tipográfica y va separado 6px. Aire libre alrededor = ancho del "29". Tamaño mínimo: 15px de caja.
- Racional: el cursor que parpadea es el instante anterior a escribir la primera línea de código — dice "ya" sin decirlo, y evita el badge de iniciales genérico. Se construye con texto + CSS, sin assets binarios: `<Logo29 variant="light|dark|mark|cursor" />`.

## Forma, espacio, elevación

- Radios: inputs y botones **10**, tarjetas y modales **16**, chips y avatares **pill**. `shape.borderRadius: 10`.
- Espaciado base 4: 4 / 8 / 16 / 24 / 40 / 64. *(Nota de implementación: `FE/aprendeya_fe` mantiene `spacing` de MUI en su default de 8 — cambiar la base rompería silenciosamente cientos de `sx`/`spacing` ya calibrados contra 8. Si se quiere adoptar 4 de verdad, es una fase propia de reauditoría de espaciado, no un cambio del theme.)*
- Elevación: por defecto **borde, sin sombra**. Sombra solo en hover de tarjeta y overlays.
  - hover: `0 1px 2px rgba(11,18,32,.06), 0 10px 24px -12px rgba(11,18,32,.18)`
  - overlay: `0 18px 48px -12px rgba(11,18,32,.28)`
- Densidad MUI: botones 44px de alto, inputs 46px, filas de tabla 56px.
- Focus visible obligatorio: `box-shadow: 0 0 0 3px rgba(31,75,216,.22)` + borde primary/600.

## Voz y microcopy

Español de Costa Rica, segunda persona, sin emoji y sin signos de exclamación. Frases cortas que dicen qué pasó y qué sigue. Términos técnicos en inglés cuando así se usan en la industria (commit, deploy, pull request).

- Sí: "Tu progreso quedó guardado." · "No encontramos clases con esos filtros. Probá quitando el horario."
- No: "¡Wow! 🚀 ¡Lo lograste!" · "Error 422: unprocessable entity." · "Oops, algo salió mal."

Copyright estándar: `© 2026 29AprendeYa · Todos los derechos reservados`.
