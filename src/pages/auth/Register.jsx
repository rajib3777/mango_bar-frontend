import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import { registerApi } from '@/api/auth.js';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerApi(form);
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          'Registration failed. Please check your input.'
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
            Create Your Mango Account
          </h1>
          <p className="text-xs text-slate-600">
            Track orders, save addresses and get early access to seasonal boxes.
          </p>

          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />
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
          <Input
            label="Confirm Password"
            name="password2"
            type="password"
            value={form.password2}
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
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>

          <p className="text-[11px] text-slate-500 text-center">
            Already have an account?{' '}
            <button
              type="button"
              className="text-mango-600 font-semibold"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </AnimatedPage>
  );
}
