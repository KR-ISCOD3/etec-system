// app/dashboard/page.tsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.role === "director") {
      router.replace("/dashboard/director");
    } else if (user.role === "teacher") {
      router.replace("/dashboard/teacher");
    } else {
      router.replace("/login"); // or a 403 page
    }
  }, [router]);

  return <p>Redirecting...</p>;
}
