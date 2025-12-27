// src/api/auth.js
import client from './client';

// register
export const registerApi = (payload) =>
  client.post('/accounts/register/', payload);

// login
export const loginApi = (payload) =>
  client.post('/accounts/login/', payload);

// ⚠️ ডকে POST লেখা, কিন্তু বাস্তবে GET কাজ করছে – তাই GET নেবো
export const profileApi = () =>
  client.get('/accounts/profile/');

// edit profile (JSON + FormData দুইটাই সাপোর্ট)
export const editProfileApi = (payload) => {
  const isFormData = payload instanceof FormData;

  return client.put(
    '/accounts/edit-profile/',
    payload,
    isFormData ? {} : undefined
  );
};

// change password
export const changePasswordApi = (payload) =>
  client.patch('/accounts/change-password/', payload);

// verify email
export const verifyEmailApi = (uid, token) =>
  client.get(`/accounts/verify-email/${uid}/${token}/`);
