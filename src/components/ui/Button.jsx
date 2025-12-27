export default function Button({
  children,
  className = '',
  variant = 'primary',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-mango-500 text-white shadow-soft hover:bg-mango-600 hover:-translate-y-0.5',
    secondary:
      'bg-white text-slate-900 border border-slate-200 shadow-soft hover:bg-slate-50',
    ghost:
      'bg-transparent text-slate-800 hover:bg-slate-100',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
