import client from './client';

export const getOverviewApi = () =>
  client.get('/admin-panel/overview/');

export const getAdminDashboardApi = () =>
  client.get('/admin-panel/dashboard/');

export const getMangoListApi = () =>
  client.get('/admin-panel/mangos/');

export const getAdminOrderListApi = () =>
  client.get('/admin-panel/orders/');
