import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import './Loading.css'

function Loading() {
  return (
    <motion.div 
      className="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-spinner"></div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Carregando...
      </motion.p>
    </motion.div>
  )
}

export default Loading