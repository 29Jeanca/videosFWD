# Handoff de implementación — 29AprendeYa

Diseño de referencia: `Identidad 29AprendeYa.dc.html` (sistema) y `Vistas 29AprendeYa.dc.html` (9 vistas + variante oscura), ambos en el proyecto de diseño de claude.ai/design.
Tokens y overrides listos para pegar: `theme.js`. Marca: `BRAND.md`.

## Orden de trabajo sugerido (un commit por bloque)

1. **Fuentes + theme**: instalar `@fontsource/sora @fontsource/ibm-plex-sans @fontsource/jetbrains-mono`, quitar `@fontsource/roboto`, agregar `src/theme/theme.js`, envolver la app en `ThemeProvider` + `CssBaseline`.
2. **Logo**: `src/components/Logo29.jsx` con variantes `light | dark | mark | cursor`. Reemplaza cualquier logo de la marca vieja en headers, login y 404. Favicon = isotipo.
3. **Limpieza de CSS heredado**: migrar `src/styles/Global.css` y `src/auth/styles/LoginForm.css` a tokens del theme; borrar colores/tipografía de la marca vieja que queden sueltos.
4. **Vista por vista** (misma estructura de props, handlers y llamadas a la API — solo JSX de presentación y estilos):
   - `/` LoginPage + LoginForm → una columna centrada (no split), líneas verticales tenues de fondo, "29" gigante de contorno en la esquina, header propio con logo + Cursos/Ayuda + tema, footer con Términos/Privacidad.
   - `/reset-password` → tarjeta centrada 452px con indicador de paso y nota informativa de vencimiento del enlace.
   - `/clases` → header + sidebar de filtros sticky + CalendarFilter + grid 2 col de ClassCard + NoResults como estado vacío punteado.
   - `/perfil` → sidebar de identidad + GeneralProgress con 4 métricas + CourseCard con barra de progreso + PersonalInfo en grid de 2 col.
   - `/comunidad` → search 50px, tabs subrayadas, CategoryChips pill, DiscussionCard con badges de estado, aside con UpcomingEvents.
   - `/post/:postId` → artículo 880px, bloque de código oscuro, mejor respuesta con borde primary, respuestas anidadas con borde izquierdo, editor de respuesta.
   - `/calendario` → grid 7 col con celdas de 116px, píldoras de evento por color de tipo, switch Mes/Semana/Día, leyenda.
   - `/actividad` → tabs + tabla de 5 columnas con badges de tipo y acciones a la derecha + paginación.
   - `*` NotFoundPage → header/footer propios, 404 en Sora 700 sobre primary/100, dos acciones.
5. **Textos y metadatos**: ver checklist abajo.
6. **Cierre**: `npm run lint` y `npm run build` en `FE/aprendeya_fe`.

## Checklist de reemplazo textual

- `index.html`: `<title>`, `meta description`, `og:title`, `og:description`, favicon.
- Headers/footers de todas las vistas y de `profile_community/errors`.
- Copyright → `© 2026 29AprendeYa · Todos los derechos reservados`.
- `package.json` `"name"` → `"29aprendeya-fe"` (hecho).
- Backend: templates de correo, `admin.site.site_header` / `site_title` / `index_title`, mensajes visibles al usuario.
- `public/login/login_auth.png`: se elimina — el nuevo login no usa imagen de marca vieja.
- **2026-08-21 — carpetas y paquete renombrados**: las carpetas del frontend y del backend que todavía llevaban el nombre de la marca anterior pasaron a `FE/aprendeya_fe` y `BE/aprendeya_be` (`ROOT_URLCONF`, `WSGI_APPLICATION`, `DJANGO_SETTINGS_MODULE` en `manage.py`/`asgi.py`/`wsgi.py` actualizados y verificados con `python manage.py check`). El nombre del paquete Python no puede empezar con un número, por eso quedó `aprendeya_be` y no `29aprendeya_be`. Ya no queda ninguna referencia a la marca anterior en el repo.

## Modo claro / oscuro

Ambos modos están definidos en `theme.js` (`buildTheme('light' | 'dark')`) y dibujados en las 9 vistas.
El **predeterminado sigue al sistema**, con override manual persistido:

```jsx
const sistema = useMediaQuery('(prefers-color-scheme: dark)');
const [pref, setPref] = useState(() => localStorage.getItem('29ay:tema') || 'system'); // 'system' | 'light' | 'dark'
const mode = pref === 'system' ? (sistema ? 'dark' : 'light') : pref;
const theme = useMemo(() => buildTheme(mode), [mode]);
```

El control vive hoy como un botón de icono que cicla `sistema → claro → oscuro → sistema` (Login/Reset y `AppHeader`). El diseño de origen lo describe como un menú de cuenta con tres opciones nombradas (Claro · Oscuro · Sistema); son equivalentes en funcionalidad — decidir si vale la pena migrar al menú es una mejora de UX, no un bloqueante. Agregar `<meta name="color-scheme" content="light dark">` en `index.html` para que los controles nativos y el fondo inicial no parpadeen (ya está).

## Reglas que no se tocan

Rutas de `Routing.jsx`, endpoints y contratos FE↔BE, nombres de props, validaciones y cálculos de progreso/permisos. Stack fijo: MUI v7 + styled-components + react-router-dom v7.

## Accesibilidad incluida en el rediseño

Contraste ≥4.5:1 en todos los pares de la paleta, área táctil mínima 44px, focus visible con anillo `rgba(31,75,216,.22)`, estados de error con texto (no solo color), jerarquía de encabezados una sola `h1` por vista.

## Estado de implementación (ver memoria de proyecto para detalle por archivo)

Fundaciones (theme, `Logo29`, fuentes), `AppHeader` compartido (las 9 vistas), y Login están implementados y verificados contra este handoff con capturas reales (no solo lectura de código — este proyecto ya tuvo un caso real de un bug visual invisible en el JSX). Pendiente de un repaso vista-por-vista más fino: Reset (nota de vencimiento de enlace + contacto de soporte), Comunidad/Post/Calendario/Actividad/404 (fidelidad de detalle contra el mockup, más allá de la paleta y el header ya compartidos).
