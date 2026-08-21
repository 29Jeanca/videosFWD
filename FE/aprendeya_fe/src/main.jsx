import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/Global.css'

// Tipografía de marca (ver docs/BRAND.md §Tipografía) — solo los pesos que se usan:
// Sora 600/700, IBM Plex Sans 400/500/600, JetBrains Mono 400/600.
import '@fontsource/sora/600.css'
import '@fontsource/sora/700.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/600.css'

import { TemaProvider } from './theme/TemaContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TemaProvider>
      <App />
    </TemaProvider>
  </StrictMode>,
)
