

import React from 'react'
import './Products.css'

const products = [
  {
    id: 1,
    name: 'Cozinhar é só um jeito diferente de amar',
    description: 'Lindo pano de prato todo trabalhado na pintura em detalhes magenta! Escolha o que mais combina com a sua decoração 🥰',
    price: 'R$ 120,00',
    image: '/donamariabentoart/cozinhareamar.jpg'
  },
  {
    id: 2,
    name: 'Coisas boas acontecem aqui',
    description: 'Pano de prato artesanal com frase inspiradora, pintado à mão em tecido 100% algodão. Perfeito para decorar sua cozinha com estilo.',
    price: 'R$ 115,00',
    image: '/donamariabentoart/coisas_boas_acontecem.jpg'
  },
  {
    id: 3,
    name: 'Eu me lembro de quando',
    description: 'Pano de prato com bordado em tons de rosa e verde, com frase nostálgica e detalhes de folhagens. Tecido 100% algodão.',
    price: 'R$ 125,00',
    image: '/donamariabentoart/floral.jpg'
  },
  {
    id: 4,
    name: 'Pano de Prato Floral',
    description: 'Delicado pano de prato com estampa floral em tons de rosa. Feito à mão com muito carinho.',
    price: 'R$ 110,00',
    image: '/donamariabentoart/pano_floral.jpg'
  }
]

const Products = () => {
  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Nossa Coleção</h1>
        <p>Cada peça é única e pintada à mão com carinho</p>
      </div>

      <div className="products-filter">
        <button className="filter-button active">Todos</button>
        <button className="filter-button">Florais</button>
        <button className="filter-button">Frases</button>
        <button className="filter-button">Personalizados</button>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img 
                src={product.image} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/donamariabentoart/placeholder.jpg';
                }}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="product-price">{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products