import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/theme.jsx'
import App from './App.jsx'
import ParentContext from './context/ParentContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ParentContext>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ParentContext>
  </BrowserRouter>
)
