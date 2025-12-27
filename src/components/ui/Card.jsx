export default function Card({ children, className = '' }) {
  return (
    <div className={`glass-panel bg-white ${className}`}>
      {children}
    </div>
  );
}
