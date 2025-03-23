/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrash, FaEdit } from 'react-icons/fa';
import './AdminStyles.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    imagePreview: null
  });

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    // Load existing products from localStorage
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({
          ...newProduct,
          image: file,
          imagePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newProduct.imagePreview) {
      alert("Por favor, adicione uma imagem para o produto.");
      return;
    }
    
    // Create a new product with an ID and the image as a data URL
    const productToAdd = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      imageUrl: newProduct.imagePreview,
      dateAdded: new Date().toISOString()
    };
    
    // Add to products array
    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    
    // Save to localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Reset form
    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      image: null,
      imagePreview: null
    });
    
    alert("Produto adicionado com sucesso!");
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

  return (
    <motion.div 
      className="admin-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="admin-header">
        <h1>Painel Administrativo</h1>
        <button onClick={handleLogout} className="admin-logout-button">
          Sair
        </button>
      </div>
      
      <div className="admin-content">
        <div className="admin-add-product">
          <h2>Adicionar Novo Produto</h2>
          
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-group">
              <label htmlFor="name">Nome do Produto</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="price">Preço (R$)</label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                <option value="panos">Panos de Prato</option>
                <option value="toalhas">Toalhas</option>
                <option value="decoracao">Decoração</option>
                <option value="outros">Outros</option>
              </select>
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="image">Imagem do Produto</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              
              {newProduct.imagePreview && (
                <div className="image-preview">
                  <img src={newProduct.imagePreview} alt="Preview" />
                </div>
              )}
            </div>
            
            <button type="submit" className="admin-submit-button">
              Adicionar Produto
            </button>
          </form>
        </div>
        
        <div className="admin-product-list">
          <h2>Produtos Cadastrados ({products.length})</h2>
          
          <div className="admin-products-grid">
            {products.map(product => (
              <div key={product.id} className="admin-product-card">
                <div className="admin-product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="admin-product-info">
                  <h3>{product.name}</h3>
                  <p className="admin-product-category">{product.category}</p>
                  <p className="admin-product-price">R$ {product.price}</p>
                  <div className="admin-product-actions">
                    <button 
                      className="admin-delete-button"
                      onClick={() => handleDeleteProduct(product.id)}
                      aria-label="Excluir produto"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;