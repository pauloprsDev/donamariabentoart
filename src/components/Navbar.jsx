/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Dona Maria Bento</Link>
      </div>
      <div className="navbar-logo">
        <Link to="/">
          <motion.img 
            src={`${import.meta.env.BASE_URL}logo.jpeg`}
            alt="Dona Maria Bento Art Logo"
            className="nav-logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
            }}
          />
        </Link>
      </div>
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Inicio</Link>
        <Link to="/products" onClick={toggleMenu}>Produtos</Link>
        <Link to="/about" onClick={toggleMenu}>Nossa História</Link>
        <Link to="/contact" onClick={toggleMenu}>Contato</Link>
      </div>
    </nav>
  )
}

export default Navbar