
import React, { Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'

// Lazy load components
const Home = React.lazy(() => import('./components/Home'))
const Products = React.lazy(() => import('./components/Products'))
const About = React.lazy(() => import('./components/About'))
const Contact = React.lazy(() => import('./components/Contact'))

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
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <Suspense fallback={<Loading />}>
          <AnimatedRoutes />
        </Suspense>
        <Footer />
      </div>
    </Router>
  )
}

export default App
