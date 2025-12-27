import { useEffect, useState } from 'react';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import LoadingSpinner from '@/components/common/LoadingSpinner.jsx';
import Button from '@/components/ui/Button.jsx';
import Input from '@/components/ui/Input.jsx';
import {
  getMangoListApi,
} from '@/api/admin.js';
import {
  addProductApi,
  deleteProductApi,
} from '@/api/products.js';

export default function AdminMangos() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: '', price: '' });

  const load = () => {
    setLoading(true);
    getMangoListApi()
      .then((res) => setList(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await addProductApi(form);
      setForm({ name: '', price: '' });
      load();
    } catch (e) {
      console.error(e);
      alert('Could not create product.');
    } finally {
      setCreating(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProductApi(id);
      load();
    } catch (e) {
      console.error(e);
      alert('Could not delete.');
    }
  };

  if (loading) return <LoadingSpinner full />;

  return (
    <AnimatedPage>
      <section className="space-y-5">
        <h1 className="text-2xl font-black text-slate-900">
          Admin · Mango List
        </h1>

        <form
          onSubmit={onCreate}
          className="glass-panel bg-white p-4 grid md:grid-cols-[1.5fr,1fr,auto] gap-3 items-end text-sm"
        >
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />
          <Input
            label="Price"
            name="price"
            value={form.price}
            onChange={onChange}
            required
          />
          <Button
            type="submit"
            disabled={creating}
            className="px-4 py-2 mt-1"
          >
            {creating ? 'Saving...' : 'Add Product'}
          </Button>
        </form>

        <div className="space-y-2 text-xs">
          {list.map((p) => (
            <div
              key={p.id}
              className="glass-panel bg-white p-3 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900">
                  {p.name}
                </p>
                <p className="text-slate-600">
                  Price: {p.price}
                </p>
              </div>
              <button
                onClick={() => onDelete(p.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
}
