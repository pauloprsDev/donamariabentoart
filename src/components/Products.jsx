/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from './PageTransition';
import './Products.css';
import { setupProductsListener } from '../utils/productSync';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    // Configurar listener em tempo real para produtos
    const unsubscribe = setupProductsListener(setProducts);
    
    // Inicializar com produtos padrão se não houver nenhum
    setTimeout(() => {
      if (products.length === 0) {
        const defaultProducts = [
          {
            id: '1',
            name: 'Pano de Prato Floral',
            description: 'Pano de prato com bordado em tons de verde e a frase "Aprecie as pequenas coisas da vida".',
            price: '45.00',
            category: 'panos',
            imageUrl: `${import.meta.env.BASE_URL}floral.webp`
          },
          {
            id: '2',
            name: 'Toalha Bordada',
            description: 'Toalha de mesa com bordado artesanal.',
            price: '120.00',
            category: 'toalhas',
            imageUrl: `${import.meta.env.BASE_URL}coisas_boas_acontecem.webp`
          },
          {
            id: '3',
            name: 'Conjunto Decorativo',
            description: 'Conjunto de peças decorativas para cozinha.',
            price: '89.90',
            category: 'decoracao',
            imageUrl: `${import.meta.env.BASE_URL}cozinhareamar.webp`
          }
        ];
        setProducts(defaultProducts);
      }
      setIsLoading(false);
    }, 1500);
    
    // Limpar listener quando o componente for desmontado
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    // Initialize image loading state for each product
    const initialImageLoading = {};
    products.forEach(product => {
      initialImageLoading[product.id] = true;
    });
    setImageLoading(initialImageLoading);
    
    // Atualizar produtos filtrados quando a lista de produtos mudar
    if (activeFilter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeFilter));
    }
  }, [products, activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleImageLoad = (productId) => {
    setImageLoading(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  const handleImageError = (productId, productName) => {
    console.error(`Failed to load image for product: ${productName}`);
    setImageLoading(prev => ({
      ...prev,
      [productId]: false
    }));
  };

  return (
    <PageTransition>
      <div className="products-container">
        <div className="products-header">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Nossos Produtos
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Conheça nossa coleção de produtos artesanais
          </motion.p>
        </div>

        <motion.div
          className="products-filter"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Todos
          </button>
          <button
            className={`filter-button ${activeFilter === 'panos' ? 'active' : ''}`}
            onClick={() => handleFilterChange('panos')}
          >
            Panos de Prato
          </button>
          <button
            className={`filter-button ${activeFilter === 'toalhas' ? 'active' : ''}`}
            onClick={() => handleFilterChange('toalhas')}
          >
            Toalhas
          </button>
          <button
            className={`filter-button ${activeFilter === 'decoracao' ? 'active' : ''}`}
            onClick={() => handleFilterChange('decoracao')}
          >
            Decoração
          </button>
          <button
            className={`filter-button ${activeFilter === 'outros' ? 'active' : ''}`}
            onClick={() => handleFilterChange('outros')}
          >
            Outros
          </button>
        </motion.div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando produtos...</p>
          </div>
        ) : (
          <motion.div
            className="products-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="product-card" key={product.id}>
                  <div className="product-image">
                    {imageLoading[product.id] && (
                      <div className="image-loading-placeholder">
                        <div className="loading-spinner"></div>
                      </div>
                    )}
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      loading="lazy"
                      onLoad={() => handleImageLoad(product.id)}
                      onError={() => handleImageError(product.id, product.name)}
                    />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <span className="product-price">R$ {product.price}</span>
                    <button className="add-to-cart">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                      </svg>
                      Adicionar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products-message">
                <p>Nenhum produto encontrado nesta categoria.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default Products;