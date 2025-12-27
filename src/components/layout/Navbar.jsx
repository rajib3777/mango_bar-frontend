import { useState, useMemo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import { useCart } from '@/context/CartContext.jsx';
import Button from '@/components/ui/Button.jsx';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();

  const isAdmin = user?.is_admin || user?.is_staff || user?.is_superuser;

  const displayName = useMemo(() => {
    if (!user) return '';
    return (
      user.full_name ||
      user.name ||
      user.username ||
      (user.email ? user.email.split('@')[0] : '')
    );
  }, [user]);

  const initials = useMemo(() => {
    if (!displayName) return 'MB';
    return displayName
      .split(' ')
      .map((p) => p[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [displayName]);

  const navClass = ({ isActive }) =>
    `relative px-3 py-2 rounded-2xl text-sm font-medium transition-all ${
      isActive
        ? 'text-mango-800'
        : 'text-slate-700 hover:text-mango-700'
    }`;

  const handleNavClick = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-gradient-to-b from-mango-200/90 via-mango-100/80 to-mango-50/70 backdrop-blur-xl border-b border-mango-200/70 shadow-soft">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setOpen(false)}
          >
            <div className="h-10 w-10 rounded-3xl bg-mango-500 flex items-center justify-center text-2xl shadow-soft group-hover:-translate-y-0.5 transition-transform">
              🥭
            </div>
            <div className="leading-tight">
              <p className="font-black text-lg tracking-tight text-slate-900">
                Mango Bar
              </p>
              <p className="text-[10px] uppercase text-mango-700 tracking-[0.25em]">
                Formalin Free · Organic
              </p>
            </div>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1 bg-white/40 rounded-3xl px-2 py-1 shadow-soft">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navClass}>
                {({ isActive }) => (
                  <span className="relative inline-flex items-center">
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 mx-auto h-[3px] w-7 rounded-full bg-mango-500" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={() => {
                navigate('/cart');
                setOpen(false);
              }}
              className="relative inline-flex items-center justify-center h-9 w-9 rounded-2xl bg-white/80 hover:bg-white shadow-soft transition-all hover:-translate-y-0.5"
            >
              <span className="text-lg">🧺</span>
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] text-[10px] rounded-full bg-mango-500 text-white flex items-center justify-center px-1">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Auth (desktop) */}
            <div className="hidden md:flex items-center gap-2 text-xs">
              {user ? (
                <>
                  {/* Small avatar */}
                  <button
                    type="button"
                    onClick={() => navigate('/profile')}
                    className="flex items-center gap-2 px-2 py-1 rounded-2xl bg-white/80 hover:bg-white shadow-soft transition-all hover:-translate-y-0.5"
                  >
                    <div className="h-7 w-7 rounded-full bg-mango-500 text-[11px] font-semibold text-white flex items-center justify-center">
                      {initials}
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[11px] text-slate-500">
                        Signed in
                      </span>
                      <span className="text-[12px] font-semibold text-slate-900">
                        {displayName}
                      </span>
                    </div>
                  </button>

                  {/* Profile */}
                  <Button
                    variant="ghost"
                    className="px-3 py-1.5"
                    onClick={() => navigate('/profile')}
                  >
                    Profile
                  </Button>

                  {/* My Orders */}
                  <Button
                    variant="ghost"
                    className="px-3 py-1.5"
                    onClick={() => navigate('/orders')}
                  >
                    My Orders
                  </Button>

                  {/* Admin dashboard (only for admin/staff users) */}
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      className="px-3 py-1.5"
                      onClick={() => navigate('/admin')}
                    >
                      Dashboard
                    </Button>
                  )}

                  <Button
                    variant="secondary"
                    className="px-3 py-1.5"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="px-3 py-1.5"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    className="px-4 py-1.5"
                    onClick={() => navigate('/register')}
                  >
                    Purchase Now
                  </Button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="inline-flex lg:hidden items-center justify-center h-9 w-9 rounded-2xl bg-white/80 shadow-soft"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="space-y-1.5">
                <span
                  className={`block h-[2px] w-5 rounded-full bg-slate-800 transition-transform ${
                    open ? 'translate-y-[5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-slate-800 transition-opacity ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-slate-800 transition-transform ${
                    open ? '-translate-y-[5px] -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div className="lg:hidden border-t border-mango-200/70 bg-white/95 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-4 py-3 space-y-3">
              {/* Main nav links */}
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className="flex items-center justify-between px-3 py-2 rounded-2xl text-sm text-slate-800 hover:bg-mango-50"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-mango-600">›</span>
                  </button>
                ))}
              </div>

              {/* Auth & shortcuts */}
              <div className="border-t border-slate-100 pt-3 flex flex-col gap-2 text-xs">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="h-8 w-8 rounded-full bg-mango-500 text-[11px] font-semibold text-white flex items-center justify-center">
                        {initials}
                      </div>
                      <div className="leading-tight">
                        <p className="text-[11px] text-slate-500">
                          Logged in as
                        </p>
                        <p className="text-[12px] font-semibold text-slate-900">
                          {displayName}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full py-2"
                      onClick={() => {
                        navigate('/profile');
                        setOpen(false);
                      }}
                    >
                      Profile
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full py-2"
                      onClick={() => {
                        navigate('/orders');
                        setOpen(false);
                      }}
                    >
                      My Orders
                    </Button>

                    {isAdmin && (
                      <Button
                        variant="ghost"
                        className="w-full py-2"
                        onClick={() => {
                          navigate('/admin');
                          setOpen(false);
                        }}
                      >
                        Admin Dashboard
                      </Button>
                    )}

                    <Button
                      variant="secondary"
                      className="w-full py-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full py-2"
                      onClick={() => {
                        navigate('/login');
                        setOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="w-full py-2"
                      onClick={() => {
                        navigate('/register');
                        setOpen(false);
                      }}
                    >
                      Create Account / Purchase
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
