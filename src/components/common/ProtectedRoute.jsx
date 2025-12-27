import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, authLoading } = useAuth();

  if (authLoading) return <LoadingSpinner full />;

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && !user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
