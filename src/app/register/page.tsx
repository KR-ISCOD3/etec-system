'use client';

import { useState } from "react";
import Link from "next/link";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register, fetchUser } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/Loading";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullname_en: '',
    password: ''
  });

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
      await dispatch(register(formData)).unwrap();

      // Fetch user after successful registration
      const user = await dispatch(fetchUser()).unwrap();

      // Redirect based on role
      if (user.role === "instructor") {
        router.push("/dashboard/teacher");
      } else if (user.role === "director") {
        router.push("/dashboard/director");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      toast.error(message, {
        position: 'top-right',
        theme: 'colored',
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 grid place-content-center p-4">
      {loading && <LoadingPage/>}
      <ToastContainer />
      <div className="w-full sm:w-[800px] lg:w-[600px] rounded-xl p-8 ">
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
            className="cursor-pointer w-full p-3 bg-blue-950 mt-2 rounded-lg text-white text-xl hover:bg-blue-900 transition duration-300 active:scale-95 shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-lg mt-3">
            Already have an account?
            <Link href="/login" className="text-blue-800 font-bold ml-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
