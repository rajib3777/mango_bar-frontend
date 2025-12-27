import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AppRouter from './router';

export default function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <div key={location.pathname}>
          <AppRouter />
        </div>
      </AnimatePresence>
    </Layout>
  );
}

