import { useEffect, useState } from 'react';
import AnimatedPage from '@/components/animations/AnimatedPage';
import { getOrdersApi } from '@/api/orders';
import { getProductsApi } from '@/api/products';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { formatPrice } from '@/utils/format';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [oRes, pRes] = await Promise.all([
        getOrdersApi(),
        getProductsApi(),
      ]);
      setOrders(oRes.data);
      setProducts(pRes.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <LoadingSpinner />;

  const totalRevenue = orders.reduce(
    (acc, o) => acc + (o.total_price || 0),
    0
  );

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const deliveredCount = orders.filter(
    (o) => o.status === 'delivered'
  ).length;

  return (
    <AnimatedPage>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin overview</h2>
          <p className="text-xs text-slate-500">
            Live snapshot of orders, revenue and product performance.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 text-xs">
            <p className="text-slate-500">Total revenue</p>
            <p className="text-xl font-extrabold text-mango-700">
              {formatPrice(totalRevenue)}
            </p>
          </div>
          <div className="glass-panel p-4 text-xs">
            <p className="text-slate-500">Total orders</p>
            <p className="text-xl font-extrabold">{orders.length}</p>
          </div>
          <div className="glass-panel p-4 text-xs">
            <p className="text-slate-500">Pending</p>
            <p className="text-xl font-extrabold text-amber-600">
              {pendingCount}
            </p>
          </div>
          <div className="glass-panel p-4 text-xs">
            <p className="text-slate-500">Delivered</p>
            <p className="text-xl font-extrabold text-emerald-600">
              {deliveredCount}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="glass-panel p-4 text-xs">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">Recent orders</p>
              <p className="text-[10px] text-slate-400">
                Showing latest {Math.min(5, orders.length)}
              </p>
            </div>
            <div className="space-y-2 max-h-64 overflow-auto">
              {orders.slice(0, 5).map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between bg-slate-50 rounded-2xl px-3 py-2"
                >
                  <div>
                    <p className="font-semibold text-[11px]">#{o.id}</p>
                    <p className="text-[10px] text-slate-500">
                      {o.items?.length || 0} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[11px]">
                      {formatPrice(o.total_price)}
                    </p>
                    <p
                      className={`text-[10px] ${
                        o.status === 'delivered'
                          ? 'text-emerald-600'
                          : o.status === 'pending'
                          ? 'text-amber-600'
                          : 'text-slate-500'
                      }`}
                    >
                      {o.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 text-xs">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold">Product catalog</p>
              <p className="text-[10px] text-slate-400">
                {products.length} total
              </p>
            </div>
            <div className="space-y-2 max-h-64 overflow-auto">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between bg-white rounded-2xl px-3 py-2 border border-slate-100"
                >
                  <div>
                    <p className="font-semibold text-[11px]">{p.name}</p>
                    <p className="text-[10px] text-slate-500">
                      {p.category?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[11px]">
                      {formatPrice(p.price)}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Stock: {p.stock ?? 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
