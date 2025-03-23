/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './AdminStyles.css';
import { syncProducts, getProducts, addProduct, updateProduct, deleteProduct } from '../../utils/productSync';

const AdminDashboard = () => {
  // Estado existente
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // Adicionar estado para edição de produto
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    imagePreview: null
  });
  
  // No useEffect, substitua o carregamento de produtos
  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
    
    // Carregar produtos do Firebase
    const loadProducts = async () => {
      const productsList = await getProducts();
      setProducts(productsList);
    };
    
    loadProducts();
  }, [navigate]);

  // Mova a função handleLogout para dentro do componente
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    navigate('/admin');
  };

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

  // Substitua a função handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newProduct.imagePreview) {
      alert("Por favor, adicione uma imagem para o produto.");
      return;
    }
    
    // Create a new product with the image as a data URL
    const productToAdd = {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: newProduct.category,
      imageUrl: newProduct.imagePreview,
      dateAdded: new Date().toISOString()
    };
    
    // Adicionar ao Firebase
    const addedProduct = await addProduct(productToAdd);
    
    // Atualizar estado local
    setProducts([...products, addedProduct]);
    
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

  // Substitua a função handleDeleteProduct
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      // Excluir do Firebase
      const success = await deleteProduct(productId);
      
      if (success) {
        // Atualizar estado local
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
      } else {
        alert("Erro ao excluir produto. Tente novamente.");
      }
    }
  };

  // Substitua a função handleSaveEdit
  const handleSaveEdit = async () => {
    // Atualizar no Firebase
    const updatedProduct = {
      ...editingProduct,
      imageUrl: editingProduct.imagePreview
    };
    
    await updateProduct(updatedProduct);
    
    // Atualizar estado local
    const updatedProducts = products.map(product => 
      product.id === editingProduct.id ? updatedProduct : product
    );
    
    setProducts(updatedProducts);
    setEditingProduct(null);
    alert("Produto atualizado com sucesso!");
  };

  // Modificar o return para incluir a interface de edição
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
        {editingProduct ? (
          <div className="admin-edit-product">
            <h2>Editar Produto</h2>
            
            <div className="admin-form">
              <div className="admin-form-group">
                <label htmlFor="edit-name">Nome do Produto</label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="edit-description">Descrição</label>
                <textarea
                  id="edit-description"
                  name="description"
                  value={editingProduct.description}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="edit-price">Preço (R$)</label>
                <input
                  type="number"
                  id="edit-price"
                  name="price"
                  min="0"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="edit-category">Categoria</label>
                <select
                  id="edit-category"
                  name="category"
                  value={editingProduct.category}
                  onChange={handleEditInputChange}
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
                <label htmlFor="edit-image">Imagem do Produto</label>
                <input
                  type="file"
                  id="edit-image"
                  name="image"
                  accept="image/*"
                  onChange={handleEditImageChange}
                />
                
                {editingProduct.imagePreview && (
                  <div className="image-preview">
                    <img src={editingProduct.imagePreview} alt="Preview" />
                  </div>
                )}
              </div>
              
              <div className="admin-edit-actions">
                <button 
                  type="button" 
                  className="admin-save-button"
                  onClick={handleSaveEdit}
                >
                  <FaSave /> Salvar Alterações
                </button>
                <button 
                  type="button" 
                  className="admin-cancel-button"
                  onClick={handleCancelEdit}
                >
                  <FaTimes /> Cancelar
                </button>
              </div>
            </div>
          </div>
        ) : (
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
        )}
        
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
                      className="admin-edit-button"
                      onClick={() => handleEditProduct(product)}
                      aria-label="Editar produto"
                    >
                      <FaEdit />
                    </button>
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