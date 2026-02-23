import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/Landing/index.tsx'
import ScheduleCombinationsPage from './pages/schedule/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schedule" element={<ScheduleCombinationsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
