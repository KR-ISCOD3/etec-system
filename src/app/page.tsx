'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/Loading';
import { fetchUser } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const ROLE_ROUTES: Record<string, string> = {
  director: '/dashboard/director',
  instructor: '/dashboard/teacher',
};

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  // Fetch user info when component mounts
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Redirect based on role or login state
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/login');
      } else if (user.role && ROLE_ROUTES[user.role]) {
        router.replace(ROLE_ROUTES[user.role]);
      } else {
        router.replace('/unauthorized');
      }
    }
  }, [user, loading, router]);

  // While loading user data, show a spinner or loading page
  if (loading) return <LoadingPage />;

  // No UI needed here; redirect will handle everything
  return null;
}
