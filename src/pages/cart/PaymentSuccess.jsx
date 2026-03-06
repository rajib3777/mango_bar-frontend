import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import Button from '@/components/ui/Button.jsx';
import { useCart } from '@/context/CartContext.jsx';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful payment if they haven't already
    clearCart();
  }, [clearCart]);

  return (
    <AnimatedPage>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center text-5xl">
          ✅
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Payment Successful!</h1>
          <p className="text-slate-600 mt-2 max-w-md mx-auto">
            Thank you for your order. We have received your payment via SSLCommerz. 
            Our team will contact you shortly regarding delivery.
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/orders')}>View Orders</Button>
          <Button variant="secondary" onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    </AnimatedPage>
  );
}
