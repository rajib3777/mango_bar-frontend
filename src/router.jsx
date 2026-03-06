import { Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home.jsx';
import BlogPage from '@/pages/BlogPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';

import Login from '@/pages/auth/Login.jsx';
import Register from '@/pages/auth/Register.jsx';
import VerifyEmail from '@/pages/auth/VerifyEmail.jsx';
import Profile from '@/pages/auth/Profile.jsx';
import ChangePassword from '@/pages/auth/ChangePassword.jsx';

import ProductList from '@/pages/shop/ProductList.jsx';
import ProductDetail from '@/pages/shop/ProductDetail.jsx';

import CartPage from '@/pages/cart/CartPage.jsx';
import PaymentSuccess from '@/pages/cart/PaymentSuccess.jsx';
import PaymentFail from '@/pages/cart/PaymentFail.jsx';
import OrdersPage from '@/pages/orders/OrdersPage.jsx';

import AdminDashboard from '@/pages/admin/AdminDashboard.jsx';
import AdminOrders from '@/pages/admin/AdminOrders.jsx';
import AdminMangos from '@/pages/admin/AdminMangos.jsx';

import ProtectedRoute from '@/components/common/ProtectedRoute.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/shop" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      <Route path="/payment/fail" element={<PaymentFail />} />
      <Route path="/payment/cancel" element={<PaymentFail />} />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email/:uid/:token" element={<VerifyEmail />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute adminOnly>
            <AdminOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/mangos"
        element={
          <ProtectedRoute adminOnly>
            <AdminMangos />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
