import { useEffect, useState } from 'react';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import LoadingSpinner from '@/components/common/LoadingSpinner.jsx';
import { getAdminOrderListApi } from '@/api/admin.js';
import { updateOrderStatusApi } from '@/api/orders.js';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAdminOrderListApi()
      .then((res) => setOrders(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await updateOrderStatusApi(orderId, status);
      load();
    } catch (e) {
      console.error(e);
      alert('Could not update status.');
    }
  };

  if (loading) return <LoadingSpinner full />;

  return (
    <AnimatedPage>
      <section className="space-y-4">
        <h1 className="text-2xl font-black text-slate-900">
          Admin · Orders
        </h1>
        <div className="space-y-3 text-xs">
          {orders.map((o) => (
            <div
              key={o.id}
              className="glass-panel bg-white p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  #{o.id} · {o.customer_name || 'Customer'}
                </p>
                <p className="text-slate-600">
                  Status: {o.status || 'Pending'}
                </p>
              </div>
              <div className="flex gap-2">
                {['pending', 'processing', 'shipped', 'delivered'].map(
                  (s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(o.id, s)}
                      className={`px-3 py-1 rounded-2xl border ${
                        o.status === s
                          ? 'bg-mango-500 text-white border-mango-500'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
}
