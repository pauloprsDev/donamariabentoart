/**
 * Utilitário para sincronizar alterações de produtos
 */
import { db } from '../firebase/config';
// eslint-disable-next-line no-unused-vars
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';

// Função para obter produtos do Firestore
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Também salva no localStorage para acesso offline
    localStorage.setItem('products', JSON.stringify(productsList));
    
    return productsList;
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    
    // Fallback para localStorage se o Firebase falhar
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  }
};

// Função para adicionar um produto
export const addProduct = async (product) => {
  try {
    const productsCollection = collection(db, 'products');
    const docRef = await addDoc(productsCollection, product);
    return { ...product, id: docRef.id };
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    return product;
  }
};

// Função para atualizar um produto
export const updateProduct = async (product) => {
  try {
    const productRef = doc(db, 'products', product.id);
    await updateDoc(productRef, product);
    return product;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return product;
  }
};

// Função para excluir um produto
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    return false;
  }
};

// Função para sincronizar produtos (mantida para compatibilidade)
export const syncProducts = async (products) => {
  // Salvar produtos no localStorage
  localStorage.setItem('products', JSON.stringify(products));
  
  // Verificar se estamos em produção (GitHub Pages)
  if (window.location.hostname !== 'localhost') {
    // Forçar atualização do service worker para atualizar o cache
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.update();
        }
      });
    }
  }
  
  return products;
};