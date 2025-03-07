import React from 'react'
import './Products.css'

const products = [
    {
      id: 1,
      name: 'Cozinhar é só um jeito diferente de amar',
      description: 'Lindo pano de prato todo trabalhado na pintura em detalhes magenta! Escolha o que mais combina com a sua decoração 🥰',
      price: 'R$ 120,00',
      image: 'cozinhareamar.jpg'
    },
    {
      id: 2,
      name: 'Coisas Boas Acontecem Aqui',
      description: 'Pano de prato frase "coisas boas acontecem aqui" feito a mão em pano 100%algodão- 41x66cm',
      price: 'R$ 135,00',
      image: 'coisas_boas_acontecem.jpg'
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
  const getImagePath = (imageName) => {
    return `${import.meta.env.BASE_URL}${imageName}`;
  };
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
                src={getImagePath(product.image)} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${import.meta.env.BASE_URL}placeholder.jpg`;
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