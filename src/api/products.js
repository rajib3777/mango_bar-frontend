import client from './client';

// list
export const getProductsApi = (params = {}) =>
  client.get('/api/products/', { params });

// detail (GET – যদিও ডকে detail PUT লিখা ছিল)
export const getProductDetailApi = (id) =>
  client.get(`/api/products/${id}/`);

// add new (seller/admin)
export const addProductApi = (payload) =>
  client.post('/api/products/', payload);

// update existing (seller/admin)
export const updateProductApi = (id, payload) =>
  client.put(`/api/products/${id}/`, payload);

// delete
export const deleteProductApi = (id) =>
  client.delete(`/api/products/${id}/`);

// search
export const searchProductsApi = (q) =>
  client.get('/api/products/search/', { params: { q } });

// categories
export const getCategoriesApi = () =>
  client.get('/api/categories/');
