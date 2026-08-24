# Criterio de estilos — 29AprendeYa

Un solo motor de estilos en todo el proyecto: **`sx` de MUI**, apoyado en los tokens de
`src/theme/theme.js`. Nada de styled-components (queda como dependencia sin uso — se
retira en la Fase 8) ni CSS plano nuevo.

## Reglas

1. **Colores**: siempre `theme.palette.*` (vía `sx` con paths tipo `"primary.main"`, o
   `theme => theme.palette.x` cuando la propiedad necesita interpolarse en un string,
   p. ej. un `border: theme => \`1px solid ${theme.palette.divider}\``). Nunca un hex
   literal, salvo:
   - `src/theme/theme.js` (es la fuente de verdad de los tokens).
   - Datos legítimos de producto que no son "marca": la paleta de colores que el
     usuario elige para sus propios eventos de calendario (`ModalCreateEvent`,
     `ModalCreateWeekEvent`, `formaterInfo.js`) y los mapas de color por categoría del
     calendario (`CalendarWeek`, `CalendarDay`, `CalendarMonth`). Son datos de negocio,
     no residuos de la marca vieja — se rediseñan en la Fase 5 si corresponde, no se
     tocan acá.
2. **Estados neutros de UI** (fondos/hover de botones secundarios, paneles vacíos):
   usar los tokens semánticos que MUI ya expone — `action.hover`, `action.selected` —
   antes que inventar un gris nuevo.
3. **CSS plano**: solo `src/styles/Global.css`, y solo como red de seguridad para nodos
   fuera del árbol de MUI (`MuiCssBaseline` ya cubre el reset real). Si un componente
   necesita una regla CSS que no puede expresar con `sx`, se pregunta antes de agregar
   un archivo `.css` nuevo.
4. **Links**: no se estilizan por componente. `MuiCssBaseline` en `theme.js` ya define
   `a` / `a:hover` / `:focus-visible` una sola vez para todo el proyecto.
5. Si una pantalla arma su propio `createTheme()` local (como el login antes de la Fase
   3), sus valores tienen que salir de `brandTokens` — nunca un hex inventado ahí mismo.

## Por qué

`sx` ya era, de lejos, el mecanismo dominante (210 usos en 40 archivos antes de esta
fase, contra cero imports reales de `styled-components`). Formalizar eso evita que
convivan dos formas de resolver lo mismo y hace que todo color responda automáticamente
a modo claro/oscuro sin tocarlo vista por vista.
