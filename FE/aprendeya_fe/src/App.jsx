import { useMemo } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Routing from './routes/Routing'
import { useTema } from './theme/useTema'
import { buildTheme } from './theme/theme'

// Resuelve el theme de MUI a partir del modo activo (ver TemaContext / docs/HANDOFF.md
// "Patrón de modo claro/oscuro"). Necesita estar dentro de <TemaProvider> (ver main.jsx).
export default function App() {
  const { mode } = useTema()
  const theme = useMemo(() => buildTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routing />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
