// hooks/useAuthGuard.ts
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard(allowedRole: string) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    const user = {role:"teacher"};

    if (user.role === allowedRole) {
      setAuthorized(true);
    } else {
      router.replace("/unauthorized");
    }

    setLoading(false);
  }, [router, allowedRole]);

  return { authorized, loading };
}
