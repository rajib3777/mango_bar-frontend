import { useEffect, useState } from 'react';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import LoadingSpinner from '@/components/common/LoadingSpinner.jsx';
import EmptyState from '@/components/common/EmptyState.jsx';
import Button from '@/components/ui/Button.jsx';
import Card from '@/components/ui/Card.jsx';
import Input from '@/components/ui/Input.jsx';
import { getProductsApi, searchProductsApi, getCategoriesApi } from '@/api/products.js';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '@/utils/format.js';
import { useCart } from '@/context/CartContext.jsx';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsApi();
      setProducts(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategoriesApi();
      setCategories(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) {
      loadProducts();
      return;
    }
    setFilterLoading(true);
    try {
      const res = await searchProductsApi(search.trim());
      setProducts(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setFilterLoading(false);
    }
  };

  const filtered =
    categoryFilter && products.length
      ? products.filter((p) => String(p.category) === String(categoryFilter))
      : products;

  if (loading) return <LoadingSpinner full />;

  if (!filtered.length && !search && !categoryFilter) {
    return (
      <AnimatedPage>
        <EmptyState
          title="No mangoes yet!"
          description="Once admin adds products from the backend, they will appear here automatically."
          action={
            <Button onClick={loadProducts}>Refresh list</Button>
          }
        />
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <section className="space-y-5">
        <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-mango-600">
              Shop
            </p>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">
              Explore Our Mango Bar Collection
            </h1>
            <p className="text-xs text-slate-600 max-w-xl">
              All items come directly from partner orchards. Prices and stocks
              update in real-time from your backend.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2 items-stretch"
          >
            <Input
              placeholder="Search e.g. Himshagor"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-64"
            />
            <Button type="submit" disabled={filterLoading}>
              {filterLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </div>

        <div className="flex flex-wrap gap-2 items-center text-xs">
          <button
            onClick={() => setCategoryFilter('')}
            className={`px-3 py-1.5 rounded-2xl border ${
              !categoryFilter
                ? 'bg-mango-500 text-white border-mango-500'
                : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id || c.slug || c.name}
              onClick={() =>
                setCategoryFilter(c.id || c.slug || c.name)
              }
              className={`px-3 py-1.5 rounded-2xl border ${
                String(categoryFilter) ===
                String(c.id || c.slug || c.name)
                  ? 'bg-mango-500 text-white border-mango-500'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {c.name || c.title || 'Category'}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <Card
              key={p.id}
              className="overflow-hidden flex flex-col hover:-translate-y-1 transition-transform"
            >
              <div className="h-40 bg-gradient-to-tr from-mango-200 via-amber-100 to-emerald-100 flex items-center justify-center text-5xl">
                🥭
              </div>
              <div className="p-4 flex flex-col gap-2 text-sm">
                <h2 className="font-semibold text-slate-900">
                  {p.name || p.title || 'Mango'}
                </h2>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {p.description || 'Premium seasonal mango box.'}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-bold text-mango-700">
                    {p.price ? formatPrice(p.price) : 'Price on call'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Stock: {p.stock ?? '—'}
                  </p>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    className="flex-1 justify-center"
                    onClick={() => navigate(`/products/${p.id}`)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 justify-center"
                    onClick={() => addItem(p.id)}
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
}
