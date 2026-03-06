import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import Button from '@/components/ui/Button.jsx';

export default function PaymentFail() {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
        <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center text-5xl">
          ❌
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900">Payment Failed!</h1>
          <p className="text-slate-600 mt-2 max-w-md mx-auto">
            Unfortunately, your transaction could not be completed or was cancelled. 
            Please try again.
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/cart')}>Back to Cart</Button>
          <Button variant="secondary" onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    </AnimatedPage>
  );
}
