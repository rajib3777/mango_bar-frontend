import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import { useAuth } from '@/context/AuthContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="flex justify-center items-center">
        <form
          onSubmit={onSubmit}
          className="glass-panel bg-white max-w-md w-full p-6 space-y-4"
        >
          <h1 className="text-2xl font-black text-slate-900">
            Welcome back to Mango Bar
          </h1>
          <p className="text-xs text-slate-600">
            Login to manage your mango boxes, track deliveries and more.
          </p>

          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full justify-center py-2.5"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>

          <p className="text-[11px] text-slate-500 text-center">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="text-mango-600 font-semibold"
              onClick={() => navigate('/register')}
            >
              Create one
            </button>
          </p>
        </form>
      </div>
    </AnimatedPage>
  );
}
