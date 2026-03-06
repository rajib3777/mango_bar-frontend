import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCartItemsApi,
  addToCartApi,
  updateCartItemApi,
  deleteCartItemApi,
} from '@/api/cart.js';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const loadCart = async () => {
    // Only attempt if we have a token (optional check), or just handle 401 gracefully
    if (!localStorage.getItem('accessToken')) {
      setItems([]);
      return;
    }
    setCartLoading(true);
    try {
      const res = await getCartItemsApi();
      setItems(res.data || []);
    } catch (e) {
      if (e.response?.status !== 401) {
        console.error(e);
      }
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addItem = async (productId, quantity = 1) => {
    const res = await addToCartApi({ product_id: productId, quantity });
    setItems(res.data || []);
  };

  const updateItem = async (id, quantity) => {
    const res = await updateCartItemApi(id, { quantity });
    setItems(res.data || []);
  };

  const removeItem = async (id) => {
    const res = await deleteCartItemApi(id);
    setItems(res.data || []);
  };

  const totalCount = items.reduce((sum, i) => sum + (i.quantity || 0), 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + (i.total_price || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartLoading,
        loadCart,
        addItem,
        updateItem,
        removeItem,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
