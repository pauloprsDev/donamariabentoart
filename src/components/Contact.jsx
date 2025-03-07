import React from 'react'
import { FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import './Contact.css'

function Contact() {
  return (
    <div className="contact-wrapper">
      <div className="contact-image"></div>
      <div className="contact-container">
        <div className="contact-header">
          <h1>Entre em Contato</h1>
          <p>Estamos aqui para atender você</p>
        </div>
    
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <FaInstagram className="contact-icon" />
              <h3>Instagram</h3>
              <a 
                href="https://www.instagram.com/donamariabentoart" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                @donamariabentoart
              </a>
            </div>
    
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <h3>Email</h3>
              <a href="mailto:contato@donamariabentoart.com">
                contato@donamariabentoart.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact