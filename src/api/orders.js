import client from './client';

export const buyNowApi = (payload) =>
  client.post('/orders/api/buy-now/', payload);

export const getOrdersApi = () =>
  client.get('/orders/api/orders/');

export const getOrderStatusApi = (id) =>
  client.get(`/orders/api/orders/${id}/status`);

export const updateOrderStatusApi = (id, status) =>
  client.patch(`/orders/api/orders/${id}/status/`, { status });
