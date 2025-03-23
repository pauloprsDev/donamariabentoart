/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple password check - in a real app, use proper authentication
    if (password === 'admin123') {
      localStorage.setItem('adminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <motion.div 
      className="admin-login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-login-card">
        <h1>Área Administrativa</h1>
        <p>Digite a senha para acessar o painel administrativo</p>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && <div className="admin-error-message">{error}</div>}
          
          <div className="admin-form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="admin-login-button">
            Entrar
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminLogin;