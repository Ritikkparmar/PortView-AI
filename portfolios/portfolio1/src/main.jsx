import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import App from './App.jsx'
import ParentContext from './contexts/ParentContext.jsx'

createRoot(document.getElementById('root')).render(
  <ParentContext>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ParentContext>
)
