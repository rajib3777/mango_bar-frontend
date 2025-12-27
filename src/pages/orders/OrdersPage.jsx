import { useEffect, useState } from 'react';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import LoadingSpinner from '@/components/common/LoadingSpinner.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import { getOrdersApi } from '@/api/orders.js';
import { formatPrice } from '@/utils/format.js';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersApi()
      .then((res) => setOrders(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner full />;

  if (!orders.length) {
    return (
      <AnimatedPage>
        <EmptyState
          title="No orders yet"
          description="Place your first order and track it here in real-time."
        />
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <section className="space-y-4">
        <h1 className="text-2xl font-black text-slate-900">
          Your Orders
        </h1>
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="glass-panel bg-white p-4 text-sm flex flex-col gap-2"
            >
              <div className="flex justify-between">
                <p className="font-semibold">
                  Order #{order.id}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(order.created_at || order.date || '').toLocaleString() ||
                    ''}
                </p>
              </div>
              <p className="text-xs text-slate-600">
                Status:{' '}
                <span className="font-semibold text-mango-700">
                  {order.status || 'Pending'}
                </span>
              </p>
              <p className="text-xs text-slate-600">
                Total:{' '}
                <span className="font-semibold">
                  {formatPrice(order.total || order.total_amount || 0)}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
}
