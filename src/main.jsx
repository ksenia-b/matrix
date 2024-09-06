import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MatrixProvider } from './contexts/MatrixContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MatrixProvider>
      <App />
    </MatrixProvider>
  </StrictMode>,
)
