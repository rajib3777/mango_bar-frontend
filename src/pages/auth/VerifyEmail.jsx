import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AnimatedPage from '@/components/animations/AnimatedPage.jsx';
import { verifyEmailApi } from '@/api/auth.js';
import LoadingSpinner from '@/components/common/LoadingSpinner.jsx';

export default function VerifyEmail() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState('loading'); // loading | success | error

  useEffect(() => {
    verifyEmailApi(uid, token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [uid, token]);

  return (
    <AnimatedPage>
      {status === 'loading' && <LoadingSpinner full />}
      {status === 'success' && (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-3xl">✅</p>
          <h1 className="text-xl font-semibold">Email Verified!</h1>
          <p className="text-sm text-slate-600 max-w-sm">
            Your email has been successfully verified. You can now login and
            start ordering mangoes.
          </p>
          <Link
            to="/login"
            className="mt-2 inline-flex px-4 py-2 rounded-2xl bg-mango-500 text-white text-sm shadow-soft"
          >
            Go to Login
          </Link>
        </div>
      )}
      {status === 'error' && (
        <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-3xl">⚠️</p>
          <h1 className="text-xl font-semibold">Verification Failed</h1>
          <p className="text-sm text-slate-600 max-w-sm">
            This verification link may be invalid or expired. Please request a
            new verification email from your profile.
          </p>
        </div>
      )}
    </AnimatedPage>
  );
}
