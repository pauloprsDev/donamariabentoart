/* eslint-disable no-unused-vars */
/**
 * Utilitário para sincronizar alterações de produtos
 */
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';

// Função para configurar listener em tempo real
export const setupProductsListener = (setProducts) => {
  const productsCollection = collection(db, 'products');
  
  // Configura um listener que atualiza os produtos em tempo real
  const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
    const productsList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Atualiza o estado e o localStorage
    setProducts(productsList);
    localStorage.setItem('products', JSON.stringify(productsList));
  }, (error) => {
    console.error("Erro ao ouvir mudanças nos produtos:", error);
  });
  
  // Retorna função para cancelar o listener quando necessário
  return unsubscribe;
};

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