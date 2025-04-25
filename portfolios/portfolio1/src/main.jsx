import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/theme.jsx'
import { AppProvider } from './context/ParentContext.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </BrowserRouter>
)
