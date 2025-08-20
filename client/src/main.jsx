import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import TaskManagerProvider from './context/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TaskManagerProvider>
        <App />
        <Toaster />
      </TaskManagerProvider>

    </BrowserRouter>

  </StrictMode>

)
