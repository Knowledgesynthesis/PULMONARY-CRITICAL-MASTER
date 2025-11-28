import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Header } from '@/components/layout/Header'
import { Home } from '@/pages/Home'
import { Asthma } from '@/pages/Asthma'
import { COPD } from '@/pages/COPD'
import { Pneumonia } from '@/pages/Pneumonia'
import { Tuberculosis } from '@/pages/Tuberculosis'
import { PulmonaryEmbolism } from '@/pages/PulmonaryEmbolism'
import { ARDS } from '@/pages/ARDS'
import { OSA } from '@/pages/OSA'
import { Cases } from '@/pages/Cases'
import { Assessment } from '@/pages/Assessment'
import { Glossary } from '@/pages/Glossary'
import { Settings } from '@/pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/asthma" element={<Asthma />} />
              <Route path="/copd" element={<COPD />} />
              <Route path="/pneumonia" element={<Pneumonia />} />
              <Route path="/tuberculosis" element={<Tuberculosis />} />
              <Route path="/pulmonary-embolism" element={<PulmonaryEmbolism />} />
              <Route path="/ards" element={<ARDS />} />
              <Route path="/osa" element={<OSA />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
