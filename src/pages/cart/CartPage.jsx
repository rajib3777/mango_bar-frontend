import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import LoadingSpinner from '@/components/common/LoadingSpinner.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import Button from '@/components/ui/Button.jsx';
import { useCart } from '@/context/CartContext.jsx';
import { formatPrice } from '@/utils/format.js';
import { initiatePaymentApi } from '@/api/orders.js';

export default function CartPage() {
  const {
    items,
    cartLoading,
    updateItem,
    removeItem,
    totalCount,
    totalPrice,
  } = useCart();

  const handleCheckout = async () => {
    if (!items.length) return;
    try {
      // Assuming 'buyNowApi' creates the order in DB if needed. 
      // But we built initiates to handle amount straight up first for now.
      const res = await initiatePaymentApi({
        amount: totalPrice,
        name: 'User', // Could pull from profile if needed
      });
      
      if (res.data?.gateway_url) {
        window.location.href = res.data.gateway_url; // Redirect to SSLCommerz
      } else {
        alert('Failed to get gateway URL.');
      }
    } catch (e) {
      console.error(e);
      alert('Could not initiate payment.');
    }
  };

  if (cartLoading) return <LoadingSpinner full />;

  if (!items.length) {
    return (
      <AnimatedPage>
        <EmptyState
          title="Your cart is empty"
          description="Browse the shop and add some mango boxes to your cart."
          action={
            <Button as="a" href="/shop">
              Go to shop
            </Button>
          }
        />
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <section className="grid lg:grid-cols-[2fr,1fr] gap-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-black text-slate-900">
            Your Cart
          </h1>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="glass-panel bg-white p-4 flex items-center gap-4 justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-mango-200 to-amber-100 flex items-center justify-center text-3xl">
                    🥭
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-slate-900">
                      {item.product?.name || 'Mango Box'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.product?.description?.slice(0, 60) || ''}
                    </p>
                    <p className="text-xs text-mango-700 mt-1">
                      {formatPrice(item.unit_price || item.price || 0)} each
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateItem(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <span className="min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateItem(item.id, item.quantity + 1)
                      }
                      className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-mango-700">
                    {formatPrice(item.total_price || 0)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[11px] text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="glass-panel bg-white p-5 space-y-3 text-sm">
          <h2 className="font-semibold text-slate-900">
            Order Summary
          </h2>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Items</span>
            <span>{totalCount}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-600">
            <span>Delivery</span>
            <span>Calculated at next step</span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Button
            className="w-full justify-center mt-2"
            onClick={handleCheckout}
          >
            Place Order
          </Button>
          <p className="text-[11px] text-slate-500">
            You will get a call / SMS from our support team for delivery slot
            confirmation.
          </p>
        </aside>
      </section>
    </AnimatedPage>
  );
}
