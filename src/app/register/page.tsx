'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register, fetchUser } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/Loading";
import RoutePrefetcher from "@/components/RoutePrefetcher";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.auth.user);

  const [showPassword, setShowPassword] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    fullname_en: '',
    password: ''
  });

  // Redirect logged in user immediately with replace (no back to register)
  useEffect(() => {
    if (!user) return;

    const redirectByRole = {
      director: "/dashboard/director",
      instructor: "/dashboard/teacher",
      default: "/dashboard"
    };
    
    const destination = redirectByRole[user.role as keyof typeof redirectByRole] || redirectByRole.default;    

    router.replace(destination);
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.fullname_en || !formData.password) {
      toast.error('Please fill in all fields.', {
        position: 'top-right',
        theme: 'colored',
      });
      return;
    }

    try {
      // Dispatch registration
      await dispatch(register(formData)).unwrap();

      // Fetch user after successful registration
      const user = await dispatch(fetchUser()).unwrap();

      const redirectByRole = {
        director: "/dashboard/director",
        instructor: "/dashboard/teacher",
        default: "/dashboard"
      };
      
      const destination = redirectByRole[user.role as keyof typeof redirectByRole] || redirectByRole.default;      

      setIsNavigating(true);
      await router.push(destination);  // wait for navigation to complete
      setIsNavigating(false);
    } catch (err) {
      setIsNavigating(false);
      const message = err instanceof Error ? err.message : 'Registration failed';
      toast.error(message, {
        position: 'top-right',
        theme: 'colored',
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 grid place-content-center p-4">
      {(loading || isNavigating) && <LoadingPage />}
      <RoutePrefetcher routes={["/dashboard/director", "/dashboard/teacher", "/dashboard"]} />
      <ToastContainer />
      <div className="w-full sm:w-[800px] lg:w-[600px] rounded-xl p-8">
        <div className="w-[140px] h-[140px] mx-auto mb-4 overflow-hidden">
          <Image
            src="/image/eteclogo.png"
            alt="logo"
            width={140}
            height={140}
            style={{ objectFit: "cover" }}
          />
        </div>

        <h1 className="text-4xl font-bold text-center mb-2">
          Register Your <span className="text-blue-950">Account</span>
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please fill out all the fields below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <div className="p-3">
              <FaUser className="text-2xl text-gray-400" />
            </div>
            <input
              type="text"
              name="fullname_en"
              className="w-full outline-0 text-xl px-2 py-3"
              placeholder="Full Name"
              value={formData.fullname_en}
              onChange={handleChange}
              autoComplete="name"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <div className="p-3">
              <FaUser className="text-2xl text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              className="w-full outline-0 text-xl px-2 py-3"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="relative flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <div className="p-3">
              <FaLock className="text-2xl text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full outline-0 text-xl px-2 pr-10 py-3"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
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
            disabled={loading || isNavigating}
            type="submit"
            className="cursor-pointer w-full p-3 bg-blue-950 mt-2 rounded-lg text-white text-xl hover:bg-blue-900 transition duration-300 active:scale-95 shadow-md hover:shadow-lg"
          >
            {(loading || isNavigating) ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-lg mt-3">
            Already have an account?
            <Link href="/login" prefetch={false} className="text-blue-800 font-bold ml-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
