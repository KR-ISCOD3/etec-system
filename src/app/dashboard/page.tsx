"use client"; // Enables client-side behavior in Next.js App Router

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Client-side navigation
import LoadingPage from "@/components/Loading";

// Main Dashboard entry page
export default function DashboardPage() {
  const router = useRouter(); // Hook to programmatically navigate

  useEffect(() => {
    // Get the 'user' object from localStorage
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    // const user = {role:"teacher"}; // test

    // If no user or role found, redirect to login page
    if (!user?.role) {
      router.replace("/login");
    }
    // Redirect based on user role
    else if (user.role === "teacher") {
      router.replace("/dashboard/teacher");
    } else if (user.role === "director") {
      router.replace("/dashboard/director");
    } else if (user.role === "assistant") {
      router.replace("/dashboard/assistant");
    }
    // If role is not recognized, go to unauthorized page
    else {
      router.replace("/unauthorized");
    }
  }, [router]); // Dependency: run effect when router is available

  // Show simple message while redirecting
  return <LoadingPage/>;
}
