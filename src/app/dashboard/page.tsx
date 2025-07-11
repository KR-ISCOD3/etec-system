'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/Loading";
import { fetchUser } from "@/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUser());  // No TS error now
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role === "director") {
        router.replace("/dashboard/director");
      } else if (user.role === "instructor") {
        router.replace("/dashboard/teacher");
      } else {
        router.replace("/unauthorized");
      }
    }
  }, [user, loading, router]);

  if (loading) return <LoadingPage />;

  return null;
}
