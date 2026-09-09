import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import { ContentProvider } from './contexts/ContentContext'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Consulting from './components/sections/Consulting'
import Training from './components/sections/Training'
import Testimonials from './components/sections/Testimonials'
import Media from './components/sections/Media'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import Login from './dashboard/Login'
import DashboardLayout from './dashboard/DashboardLayout'
import ProtectedRoute from './dashboard/ProtectedRoute'

function Site() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--surface-base)', color: 'var(--ink)' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Consulting />
        <Training />
        <Testimonials />
        <Media />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ContentProvider>
          <Routes>
            <Route path="/" element={<Site />} />
            <Route path="/dashboard/login" element={<Login />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ContentProvider>
      </AppProvider>
    </BrowserRouter>
  )
}
