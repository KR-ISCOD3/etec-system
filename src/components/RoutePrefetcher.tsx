"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RoutePrefetcherProps {
  routes: string[];
}

export default function RoutePrefetcher({ routes }: RoutePrefetcherProps) {
  const router = useRouter();

  useEffect(() => {
    routes.forEach((route) => router.prefetch(route));
  }, [router, routes]);

  return null; // no UI needed
}
