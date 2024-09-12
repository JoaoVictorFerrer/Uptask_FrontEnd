import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <p className='text-6xl text-indigo-500'>Hola mundo</p>
  </StrictMode>
)
