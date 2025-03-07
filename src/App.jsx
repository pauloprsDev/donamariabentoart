
import React, { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

// Import components directly
import Home from './components/Home'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'

// AnimatedRoutes component definition
function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router basename="/donamariabentoart">
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <ErrorBoundary>
          <AnimatedRoutes />
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  )
}

export default App
