/**
 * Utility to sync product changes with GitHub Pages
 */
export const syncProducts = (products) => {
  // Save products to localStorage
  localStorage.setItem('products', JSON.stringify(products));
  
  // Check if we're in production (GitHub Pages)
  if (window.location.hostname !== 'localhost') {
    // Force a refresh of the service worker to update cache
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