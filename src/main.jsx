import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Neutralino from '@neutralinojs/lib';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// Inisialisasi Neutralino
Neutralino.init();