"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchUser } from "@/store/auth/authSlice";

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return <>{children}</>;
}
