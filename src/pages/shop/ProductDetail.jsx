import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import LoadingSpinner from '@/components/common/LoadingSpinner.jsx';
import Button from '@/components/ui/Button.jsx';
import { getProductDetailApi } from '@/api/products.js';
import { buyNowApi } from '@/api/orders.js';
import { useCart } from '@/context/CartContext.jsx';
import { formatPrice } from '@/utils/format.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyLoading, setBuyLoading] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    getProductDetailApi(id)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyNow = async () => {
    if (!data) return;
    setBuyLoading(true);
    try {
      await buyNowApi({ product_id: data.id, quantity: 1 });
      // You can redirect to orders page or show toast
      alert('Buy-now order placed (demo). Check orders page.');
    } catch (e) {
      console.error(e);
      alert('Could not place order.');
    } finally {
      setBuyLoading(false);
    }
  };

  if (loading) return <LoadingSpinner full />;

  if (!data) {
    return (
      <AnimatedPage>
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
          <p>No product found.</p>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="glass-panel overflow-hidden">
          <div className="relative h-72 bg-gradient-to-tr from-mango-200 via-amber-100 to-emerald-100 flex items-center justify-center text-7xl">
            🥭
          </div>
        </div>
        <div className="space-y-4 text-sm">
          <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
            Product Detail
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">
            {data.name || data.title || 'Mango Box'}
          </h1>
          <p className="text-slate-700">
            {data.description ||
              'Premium mango box directly from our partner orchards. All mangoes are formalin-free and ripened naturally.'}
          </p>
          <p className="text-xl font-extrabold text-mango-700">
            {data.price ? formatPrice(data.price) : 'Price on call'}
          </p>
          <p className="text-xs text-slate-500">
            Stock: {data.stock ?? '—'}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button onClick={() => addItem(data.id)}>
              Add to cart
            </Button>
            <Button
              variant="secondary"
              onClick={handleBuyNow}
              disabled={buyLoading}
            >
              {buyLoading ? 'Processing...' : 'Buy now'}
            </Button>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
