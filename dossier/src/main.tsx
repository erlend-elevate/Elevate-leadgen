import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

// No <React.StrictMode> — it double-runs canvas/GSAP effects (react-dev.md).
createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
)
