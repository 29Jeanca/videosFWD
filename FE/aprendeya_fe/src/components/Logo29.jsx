// src/components/Logo29.jsx
// Logotipo de 29AprendeYa — portado del proyecto de diseño (claude.ai/design,
// "Identidad 29AprendeYa.dc.html" §01 Logotipo). Cuatro variantes:
//
//   <Logo29 variant="light" />   wordmark en tinta oscura, para fondos claros
//   <Logo29 variant="dark" />    wordmark en tinta clara, para fondos oscuros
//   <Logo29 variant="mark" />    isotipo "29" + cursor, sin badge (favicon/app icon)
//   <Logo29 variant="cursor" />  solo el cursor, decorativo (aria-hidden)
//
// Regla del diseño: nunca meter el cursor dentro de un cuadro, ni inclinarlo ni
// redondearlo. Cursor = 0.4 × su propia altura de ancho; altura ≈ 0.86em del
// tamaño de fuente; separado del texto ~0.28em. No depende de <ThemeProvider>:
// la variante ya define su propia tinta según el fondo donde se coloque.
import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import { brandTokens, fontFamilies } from "../theme/theme";

const parpadeo = keyframes`
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
`;

const cursorSx = (color, size) => ({
  display: "inline-block",
  width: `${size * 0.4}em`,
  height: `${size}em`,
  backgroundColor: color,
  verticalAlign: "text-bottom",
});

function Cursor({ color, size = 0.86, animado = false, sx }) {
  return (
    <Box
      component="span"
      aria-hidden="true"
      sx={{
        ...cursorSx(color, size),
        ...(animado ? { animation: `${parpadeo} 1.25s steps(1) infinite` } : null),
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        ...sx,
      }}
    />
  );
}

function Wordmark({ tinta, numeroColor, cursorColor, size = 1.3125 }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: fontFamilies.display,
        fontWeight: 600,
        letterSpacing: "-0.045em",
        color: tinta,
        fontSize: `${size}rem`,
        lineHeight: 1,
      }}
    >
      <Box component="span" sx={{ color: numeroColor }}>29</Box>
      aprendeya
      <Cursor color={cursorColor} size={0.86} sx={{ marginInlineStart: "0.28em" }} />
    </Box>
  );
}

// Isotipo: "29" + cursor, sin contenedor ni badge (ver docs/BRAND.md §Logotipo:
// "sin badge ni contenedor" — la única variante con relleno es el favicon
// exportado a SVG, que sí necesita un fondo para ser legible en la pestaña).
function Mark({ size = 30 }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: fontFamilies.display,
        fontWeight: 700,
        letterSpacing: "-0.05em",
        color: brandTokens.ink[900],
        fontSize: `${size}px`,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      <Box component="span" sx={{ color: brandTokens.primary[600] }}>29</Box>
      <Cursor color={brandTokens.accent[600]} size={0.86} sx={{ marginInlineStart: "0.2em" }} />
    </Box>
  );
}

/**
 * @param {{variant: 'light'|'dark'|'mark'|'cursor', size?: number, animado?: boolean, sx?: object}} props
 */
export default function Logo29({ variant = "light", size, animado = false, sx }) {
  switch (variant) {
    case "dark":
      return (
        <Wordmark
          tinta="#FFFFFF"
          numeroColor={brandTokens.dark.primary}
          cursorColor={brandTokens.dark.accent}
          size={size ?? 1.3125}
        />
      );
    case "mark":
      return <Mark size={size ?? 30} />;
    case "cursor":
      return (
        <Cursor
          color={brandTokens.accent[600]}
          size={size ?? 0.86}
          animado={animado}
          sx={sx}
        />
      );
    case "light":
    default:
      return (
        <Wordmark
          tinta={brandTokens.ink[900]}
          numeroColor={brandTokens.primary[600]}
          cursorColor={brandTokens.accent[600]}
          size={size ?? 1.3125}
        />
      );
  }
}
