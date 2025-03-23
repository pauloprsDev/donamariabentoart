import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Registrar service worker para melhor cache e atualizações
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/donamariabentoart/sw.js')
      .then(registration => {
        console.log('SW registrado: ', registration);
      })
      .catch(registrationError => {
        console.log('Falha no registro do SW: ', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
