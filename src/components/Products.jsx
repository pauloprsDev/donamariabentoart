/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { motion } from 'framer-motion';
import './Products.css'

const products = [
  {
    id: 1,
    name: 'Cozinhar é só um jeito diferente de amar',
    description: 'Lindo pano de prato todo trabalhado na pintura em detalhes magenta! Escolha o que mais combina com a sua decoração 🥰',
    price: 'R$ 120,00',
    image: 'cozinhareamar.jpg',
    category: 'frases'
  },
  {
    id: 2,
    name: 'Coisas Boas Acontecem Aqui',
    description: 'Pano de prato frase "coisas boas acontecem aqui" feito a mão em pano 100%algodão- 41x66cm',
    price: 'R$ 135,00',
    image: 'coisas_boas_acontecem.jpg',
    category: 'frases'
  },
    {
      id: 3,
      name: 'Eu me lembro de quando',
      description: 'Pano de prato com bordado em tons de rosa e verde, com frase nostálgica e detalhes de folhagens. Tecido 100% algodão.',
      price: 'R$ 125,00',
      image: 'melembro.jpg'
    },
    {
      id: 4,
      name: 'Pano Floral',
      description: 'Delicado pano de prato com estampa floral em tons de rosa. Feito à mão com muito carinho.',
      price: 'R$ 110,00',
      image: 'floral.jpg'
    }
];

const Products = () => {
  const [filter, setFilter] = useState('todos');
  
  const getImagePath = (imageName) => {
    return `${import.meta.env.BASE_URL}${imageName}`;
  };
  
  const filteredProducts = filter === 'todos' 
    ? products 
    : products.filter(product => product.category === filter);
  
  return (
    <motion.div 
      className="products-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="products-header">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Nossa Coleção
        </motion.h1>
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Cada peça é única e pintada à mão com carinho
        </motion.p>
      </div>
      
      <motion.div 
        className="products-filter"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button 
          className={`filter-button ${filter === 'todos' ? 'active' : ''}`}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button 
          className={`filter-button ${filter === 'florais' ? 'active' : ''}`}
          onClick={() => setFilter('florais')}
        >
          Florais
        </button>
        <button 
          className={`filter-button ${filter === 'frases' ? 'active' : ''}`}
          onClick={() => setFilter('frases')}
        >
          Frases
        </button>
        <button 
          className={`filter-button ${filter === 'personalizados' ? 'active' : ''}`}
          onClick={() => setFilter('personalizados')}
        >
          Personalizados
        </button>
      </motion.div>

      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <motion.div 
            key={product.id} 
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="product-image">
              <img 
                src={getImagePath(product.image)} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${import.meta.env.BASE_URL}placeholder.jpg`;
                }}
              />
              <div className="product-overlay">
                <button className="view-details">Ver Detalhes</button>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-footer">
                <span className="product-price">{product.price}</span>
                <button className="add-to-cart">Comprar</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Products