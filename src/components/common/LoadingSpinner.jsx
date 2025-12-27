export default function LoadingSpinner({ full = false }) {
  const inner = (
    <div className="flex items-center justify-center py-10">
      <div className="h-10 w-10 rounded-full border-4 border-mango-400 border-t-transparent animate-spin" />
    </div>
  );
  if (full) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
        {inner}
      </div>
    );
  }
  return inner;
}
