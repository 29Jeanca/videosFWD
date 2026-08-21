// src/theme/theme.js — theme centralizado de 29AprendeYa (MUI v7).
// Portado 1:1 desde el `theme.js` del proyecto de diseño (claude.ai/design,
// "Vistas 29AprendeYa.dc.html" / "Identidad 29AprendeYa.dc.html" — ver
// docs/BRAND.md v1 agosto 2026). No reinterpretar los valores: si falta un
// color o tamaño, se agrega primero en el proyecto de diseño.
//
// Las fuentes se cargan una sola vez en main.jsx — este archivo no importa
// `@fontsource/*` para no duplicar el side-effect de carga.
//
// Uso:
//   import { buildTheme, brandTokens, fontFamilies } from "../theme/theme";
//   const theme = useMemo(() => buildTheme(mode), [mode]);
import { createTheme, alpha } from "@mui/material/styles";

// ---------------------------------------------------------------------------
// 1. Tokens crudos (ver docs/BRAND.md §Paleta). No usar estos hex directamente
//    en componentes: siempre a través de `theme.palette.*`.
// ---------------------------------------------------------------------------
export const brandTokens = {
  primary: { 100: "#E3EAFE", 500: "#3A66F0", 600: "#1F4BD8", 700: "#1739A8" },
  accent: { 100: "#FFEDE5", 600: "#E85A20", 700: "#C94A16" },
  ink: { 400: "#8A93A6", 500: "#5A6478", 700: "#263043", 900: "#0B1220" },
  light: { bg: "#F7F8FA", surface: "#FFFFFF", surface2: "#F1F3F7", border: "#E3E7EF", divider: "#EDF0F6" },
  dark: {
    bg: "#0B1220",
    surface: "#121A2A",
    surface2: "#1A2437",
    border: "#26314A",
    primary: "#6E8CFF",
    accent: "#FF8355",
    text: "#E6EAF2",
    muted: "#9AA5BC",
  },
  status: { success: "#15803D", warning: "#B45309", error: "#C81E1E", info: "#0369A1" },
  focusRing: "0 0 0 3px rgba(31,75,216,0.22)",
  shadow: {
    hover: "0 1px 2px rgba(11,18,32,0.06), 0 10px 24px -12px rgba(11,18,32,0.18)",
    overlay: "0 18px 48px -12px rgba(11,18,32,0.28)",
  },
};

const fontUI = "'IBM Plex Sans', system-ui, sans-serif";
const fontDisplay = "'Sora', 'IBM Plex Sans', sans-serif";
export const fontMono = "'JetBrains Mono', ui-monospace, monospace";

// Alias con la forma que ya consumen Logo29.jsx / LoginForm.jsx.
export const fontFamilies = { display: fontDisplay, body: fontUI, mono: fontMono };

const typography = {
  htmlFontSize: 16,
  fontFamily: fontUI,
  h1: { fontFamily: fontDisplay, fontWeight: 600, fontSize: "2.75rem", lineHeight: 1.1, letterSpacing: "-0.025em" },
  h2: { fontFamily: fontDisplay, fontWeight: 600, fontSize: "1.875rem", lineHeight: 1.2, letterSpacing: "-0.02em" },
  h3: { fontFamily: fontDisplay, fontWeight: 600, fontSize: "1.5rem", lineHeight: 1.25, letterSpacing: "-0.018em" },
  h4: { fontFamily: fontDisplay, fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.3, letterSpacing: "-0.015em" },
  h5: { fontFamily: fontDisplay, fontWeight: 600, fontSize: "1.125rem", lineHeight: 1.35 },
  h6: { fontFamily: fontDisplay, fontWeight: 600, fontSize: "1rem", lineHeight: 1.4 },
  body1: { fontSize: "1rem", lineHeight: 1.65 },
  body2: { fontSize: "0.875rem", lineHeight: 1.6 },
  caption: { fontSize: "0.8125rem", lineHeight: 1.5, color: brandTokens.ink[400] },
  button: { fontSize: "0.9375rem", fontWeight: 600, textTransform: "none" },
};

const componentsFor = (mode) => {
  const t = mode === "dark" ? brandTokens.dark : brandTokens.light;
  const primaryMain = mode === "dark" ? brandTokens.dark.primary : brandTokens.primary[600];
  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: t.bg, transition: "background-color .2s ease, color .2s ease" },
        code: { fontFamily: fontMono },
        a: { color: primaryMain, textDecorationColor: alpha(primaryMain, 0.4) },
        "a:hover": { color: mode === "dark" ? "#8CA4FF" : brandTokens.primary[700] },
        "a:focus-visible, button:focus-visible, [tabindex]:focus-visible": {
          outline: `2px solid ${primaryMain}`,
          outlineOffset: "2px",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { minHeight: 44, borderRadius: 10, paddingInline: 22 },
        containedPrimary: {
          "&:hover": { backgroundColor: mode === "dark" ? "#8CA4FF" : brandTokens.primary[700] },
          "&.Mui-focusVisible": { boxShadow: brandTokens.focusRing },
        },
        outlined: { borderWidth: 1.5, "&:hover": { borderWidth: 1.5, borderColor: primaryMain } },
        sizeLarge: { minHeight: 56, fontSize: "1rem" },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${t.border}`,
          backgroundColor: t.surface,
          backgroundImage: "none",
          boxShadow: "none",
          transition: "box-shadow 160ms ease, border-color 160ms ease",
          "&:hover": { boxShadow: mode === "dark" ? "none" : brandTokens.shadow.hover },
        },
      },
    },
    MuiPaper: { styleOverrides: { rounded: { borderRadius: 16 } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 16, boxShadow: brandTokens.shadow.overlay } } },
    MuiTextField: { defaultProps: { size: "medium" } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          minHeight: 46,
          backgroundColor: t.surface,
          "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: 1.5,
            borderColor: mode === "dark" ? t.border : "#D8DEEC",
          },
          "&.Mui-focused": { boxShadow: brandTokens.focusRing },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { height: 32, borderRadius: 999, fontWeight: 500, fontSize: "0.8125rem" },
        filledPrimary: { fontWeight: 600 },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "inherit" },
      styleOverrides: {
        root: {
          backgroundColor: t.surface,
          borderBottom: `1px solid ${t.border}`,
          backgroundImage: "none",
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 500, minHeight: 48, "&.Mui-selected": { fontWeight: 600 } },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 8, borderRadius: 999, backgroundColor: mode === "dark" ? t.surface2 : "#E9EDF6" },
        bar: { borderRadius: 999 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: brandTokens.ink[500],
          backgroundColor: mode === "dark" ? t.surface2 : brandTokens.light.bg,
        },
        root: { borderColor: t.divider || t.border },
      },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: brandTokens.ink[900], fontSize: "0.75rem", borderRadius: 8 } },
    },
  };
};

const paletteFor = (mode) =>
  mode === "dark"
    ? {
        mode: "dark",
        primary: { main: brandTokens.dark.primary, dark: "#5473F0", light: "#8CA4FF", contrastText: "#0B1220" },
        secondary: { main: brandTokens.dark.accent, contrastText: "#0B1220" },
        background: { default: brandTokens.dark.bg, paper: brandTokens.dark.surface },
        text: { primary: brandTokens.dark.text, secondary: brandTokens.dark.muted },
        divider: brandTokens.dark.border,
        success: { main: "#3FBF72" },
        warning: { main: "#E0A23C" },
        error: { main: "#F0736E" },
        info: { main: "#4FB0E8" },
      }
    : {
        mode: "light",
        primary: {
          main: brandTokens.primary[600],
          dark: brandTokens.primary[700],
          light: brandTokens.primary[500],
          contrastText: "#FFFFFF",
        },
        secondary: {
          main: brandTokens.accent[600],
          dark: brandTokens.accent[700],
          light: brandTokens.accent[100],
          contrastText: "#FFFFFF",
        },
        background: { default: brandTokens.light.bg, paper: brandTokens.light.surface },
        text: { primary: brandTokens.ink[900], secondary: brandTokens.ink[500] },
        divider: brandTokens.light.border,
        success: { main: brandTokens.status.success },
        warning: { main: brandTokens.status.warning },
        error: { main: brandTokens.status.error },
        info: { main: brandTokens.status.info },
      };

// ---------------------------------------------------------------------------
// 2. Theme builder
// ---------------------------------------------------------------------------
export function buildTheme(mode = "light") {
  return createTheme({
    palette: paletteFor(mode),
    typography,
    shape: { borderRadius: 10 },
    // El diseño de origen usa spacing base 4, pero esta app ya tiene cientos de
    // `sx={{ p: 2 }}` / `spacing={3}` calibrados contra el default de MUI (8px).
    // Cambiar la base acá encogería a la mitad todos los espaciados existentes
    // sin tocar una línea de cada vista — eso hay que decidirlo a propósito,
    // vista por vista (Fase 5), no como efecto secundario de este archivo. Se
    // mantiene 8 hasta que se re-audite el espaciado.
    components: componentsFor(mode),
  });
}

export default buildTheme;
