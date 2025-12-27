import client from './client';

export const getCartItemsApi = () =>
  client.get('/cart/cart-items/');

export const addToCartApi = (payload) =>
  client.post('/cart/cart-items/', payload);

export const updateCartItemApi = (id, payload) =>
  client.put(`/cart/cart-items/${id}/`, payload);

export const deleteCartItemApi = (id) =>
  client.delete(`/cart/cart-items/${id}/`);
