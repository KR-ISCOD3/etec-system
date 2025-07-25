'use client';

import Link from "next/link";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, fetchUser } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/Loading";
import RoutePrefetcher from "@/components/RoutePrefetcher";

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loading = useAppSelector((state) => state.auth.loading);
  const user = useAppSelector((state)=> state.auth.user)

  useEffect(() => {
    if (!user) return;
  
    const redirectByRole = {
      director: "/dashboard/director",
      instructor: "/dashboard/teacher",
      default: "/dashboard",
    };
  
    // Use type assertion here to satisfy TS
    const destination =
      redirectByRole[user.role as keyof typeof redirectByRole] || redirectByRole.default;
  
    router.push(destination);
  }, [user, router]);
  
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!usernameOrEmail.trim() || !password.trim()) {
      toast.error("Both fields are required.", {
        position: "top-right",
        theme: "colored",
      });
      return;
    }
  
    try {

      await dispatch(login({ identifier: usernameOrEmail, password })).unwrap();

      const user = await dispatch(fetchUser()).unwrap();
  
      const redirectByRole = {
        director: "/dashboard/director",
        instructor: "/dashboard/teacher",
        default: "/dashboard",
      } as const;  // readonly keys
      
      type RoleKey = keyof typeof redirectByRole; // 'director' | 'instructor' | 'default'
      
      const role = user?.role as RoleKey;  // assert role type (you can validate)
      
      const destination = redirectByRole[role] ?? redirectByRole.default;
  
      router.replace(destination); // <-- use replace here
  
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message, {
        position: "top-right",
        theme: "colored",
      });
    }
  };
  
  
  return (
    <div>
      <ToastContainer/>
      {loading && <LoadingPage/>}

      <RoutePrefetcher 
        routes={
        ["/dashboard/director", 
        "/dashboard/teacher", 
        "/dashboard"]
      } />

      <main className="w-full h-[100vh] bg-gray-200 grid place-content-center">
        <div className="mx-auto w-[95%] sm:w-[480px] lg:w-[500px] text-center">
          <div className="w-[170px] h-[170px] mx-auto rounded-lg mb-4 overflow-hidden relative">
            <Image
              src="/image/eteclogo.png"
              alt="ETEC Logo"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold">
            Welcome <span className="text-blue-950">Back</span>
          </h1>

          <p className="text-center text-gray-600 mb-6">
            Please enter your username or email, and your password.
          </p>

          <form onSubmit={handleSubmit} className="mt-3 space-y-4">
            <div className="flex items-center bg-white rounded-lg overflow-hidden">
              <div className="p-3">
                <FaUser className="text-2xl text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full outline-0 text-xl h-full px-2"
                placeholder="Email or Username"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>

            <div className="relative flex items-center bg-white rounded-lg overflow-hidden">
              <div className="p-3">
                <FaLock className="text-2xl text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full outline-0 text-xl h-full px-2 pr-10"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-950 mt-5 mb-2 rounded-lg text-white text-xl cursor-pointer 
                         hover:bg-blue-900 transition-all duration-300 
                         active:scale-95 shadow-md hover:shadow-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-xl mt-3">
              Don&apos;t have an account?
              <Link href="/register" prefetch={false} className="text-blue-800 font-bold">
                &ensp;Please Register
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
