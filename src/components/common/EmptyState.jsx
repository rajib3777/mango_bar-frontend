export default function EmptyState({ title, description, action }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-center gap-3">
      <p className="text-2xl">🥭</p>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {description && (
        <p className="text-sm text-slate-600 max-w-sm">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}
