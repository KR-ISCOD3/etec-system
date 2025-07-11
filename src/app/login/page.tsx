'use client';

import Link from "next/link";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { login, fetchUser } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/Loading";

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
  
      await dispatch(login({ identifier: usernameOrEmail, password })).unwrap();
  
      const user = await dispatch(fetchUser()).unwrap();
  
      if (user?.role === "director") {
        router.replace("/dashboard/director");
      } else if (user?.role === "instructor") {
        router.replace("/dashboard/teacher");
      } else {
        router.replace("/dashboard");
      }
    } catch (err: any) {
      toast.error(err || "Login failed", {
        position: "top-right",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <ToastContainer/>
      <main className="w-full h-[100vh] bg-gray-200 grid place-content-center">
        {loading && <LoadingPage/>}
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
              <Link href="/register" className="text-blue-800 font-bold">
                &ensp;Please Register
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
