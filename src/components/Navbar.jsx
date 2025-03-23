/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const location = useLocation();
  const videoRef = useRef(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle video loading
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  // Ensure video plays on mobile
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Try to play the video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented
          // Show a UI element to let the user manually start playback
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, []);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Video Banner - Otimizado para mobile */}
      <div className="navbar-video-banner">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className={`banner-video ${videoLoaded ? 'loaded' : ''}`}
          onLoadedData={handleVideoLoad}
        >
          <source src={`${import.meta.env.BASE_URL}banner1.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="banner-overlay"></div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Navegação principal">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" aria-label="Página inicial">
            <img 
              src={`${import.meta.env.BASE_URL}logo.webp`} 
              alt="Dona Maria Bento Ateliê" 
              className="nav-logo-img"
            />
            <span className="nav-logo-text">Dona Maria Bento</span>
          </Link>

          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation */}
          <div className="nav-menu desktop-menu">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              <span>Início</span>
              {location.pathname === '/' && <motion.div className="nav-indicator" layoutId="indicator" />}
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              <span>Sobre</span>
              {location.pathname === '/about' && <motion.div className="nav-indicator" layoutId="indicator" />}
            </Link>
            <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>
              <span>Produtos</span>
              {location.pathname === '/products' && <motion.div className="nav-indicator" layoutId="indicator" />}
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              <span>Contato</span>
              {location.pathname === '/contact' && <motion.div className="nav-indicator" layoutId="indicator" />}
            </Link>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="nav-menu mobile-menu"
                id="mobile-menu"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <motion.div variants={itemVariants} className="mobile-menu-header">
                  <img 
                    src={`${import.meta.env.BASE_URL}logo.webp`} 
                    alt="Dona Maria Bento Ateliê" 
                    className="mobile-logo"
                  />
                  <p className="mobile-tagline">Artesanato com amor e dedicação</p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                    Início
                  </NavLink>
                  <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                    Sobre
                  </NavLink>
                  <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
                    Produtos
                  </NavLink>
                  <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                    Contato
                  </NavLink>
                  // Add this to your Navbar component - make sure it's visible in the navigation
                  <div className="nav-links">
                    <NavLink to="/admin" className="admin-link">
                      Admin
                    </NavLink>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link to="/about" className={`mobile-link ${location.pathname === '/about' ? 'active' : ''}`}>
                    Sobre
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link to="/products" className={`mobile-link ${location.pathname === '/products' ? 'active' : ''}`}>
                    Produtos
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link to="/contact" className={`mobile-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                    Contato
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mobile-menu-footer">
                  <p>Siga-nos no Instagram</p>
                  <a 
                    href="https://instagram.com/donamariabentoart" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="instagram-link"
                  >
                    @donamariabentoart
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;