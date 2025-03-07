import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Dona Maria Bento</h3>
          <p>Tecidos pintados à mão com exclusividade e amor.</p>
        </div>
        
        <div className="footer-section">
          <h4>Links Rápidos</h4>
          <nav>
            <Link to="/">Início</Link>
            <Link to="/products">Produtos</Link>
            <Link to="/about">Nossa História</Link>
            <Link to="/contact">Contato</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Redes Sociais</h4>
          <div className="social-links">
            <a href="https://www.instagram.com/donamariabentoart" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="mailto:contato@donamariabentoart.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Dona Maria Bento Art. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer