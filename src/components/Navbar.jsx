import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import '../styles/Navbar.css'

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