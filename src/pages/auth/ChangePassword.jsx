import { useState } from 'react';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import Input from '@/components/ui/Input.jsx';
import Button from '@/components/ui/Button.jsx';
import { changePasswordApi } from '@/api/auth.js';

export default function ChangePassword() {
  const [form, setForm] = useState({
    old_password: '',
    new_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await changePasswordApi(form);
      setMsg('Password changed successfully.');
      setForm({ old_password: '', new_password: '' });
    } catch (err) {
      console.error(err);
      setMsg('Could not change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedPage>
      <div className="max-w-lg mx-auto">
        <form
          onSubmit={onSubmit}
          className="glass-panel bg-white p-6 space-y-4"
        >
          <h1 className="text-2xl font-black text-slate-900">
            Change Password
          </h1>
          <Input
            label="Current Password"
            name="old_password"
            type="password"
            value={form.old_password}
            onChange={onChange}
            required
          />
          <Input
            label="New Password"
            name="new_password"
            type="password"
            value={form.new_password}
            onChange={onChange}
            required
          />
          <Button
            type="submit"
            className="w-full justify-center"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
          {msg && (
            <p className="text-xs text-center text-emerald-600">
              {msg}
            </p>
          )}
        </form>
      </div>
    </AnimatedPage>
  );
}
