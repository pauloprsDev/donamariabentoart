/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'
import './Contact.css'
// Remove self-import as it's not needed since this is the Contact component itself

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-wrapper">
      <motion.div 
        className="contact-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ 
          backgroundImage: `url(${import.meta.env.BASE_URL}images/Confira-as-5-flores-para-plantar-no-inverno-em-qualquer-regiao-do-Brasil.jpg)` 
        }}
      ></motion.div>
      
      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Entre em Contato</h1>
          <p>Estamos aqui para atender você com todo carinho</p>
        </motion.div>
    
        <motion.div 
          className="contact-info"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </div>
  )
}

export default Contact