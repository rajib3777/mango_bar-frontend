export default function Input({
  label,
  error,
  className = '',
  ...rest
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        className="w-full px-3 py-2 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-mango-400"
        {...rest}
      />
      {error && (
        <p className="text-[11px] text-red-500">{error}</p>
      )}
    </div>
  );
}