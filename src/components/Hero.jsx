// ... código existente ...
<div className="hero-content">
  <motion.h1 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    Dona Maria Bento
    <span className="subtitle">Arte em Panos de Prato</span>
  </motion.h1>
  
  <motion.div 
    className="hero-decoration"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  ></motion.div>
  
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    Cada peça é única e pintada à mão com carinho
  </motion.p>
  
  <motion.button 
    className="cta-button"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Ver Coleção
  </motion.button>
</div>
// ... código existente ...