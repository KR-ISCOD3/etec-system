'use client'; // Marks this as a client-side React component in Next.js

import Link from "next/link"; // Next.js Link for client-side navigation
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for inputs and toggles
import { useState } from "react"; // React state hook
import { ToastContainer, toast } from "react-toastify"; // Toast notifications for feedback

export default function Page() {
  // State for username/email input
  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  // State for password input
  const [password, setPassword] = useState("");

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submit behavior (page reload)

    // Basic validation: ensure both fields are not empty or just spaces
    if (!usernameOrEmail.trim() || !password.trim()) {
      toast.error("Both fields are required.", { 
        position: "top-right",
        theme: "colored"
      });
      return; // Stop submission if validation fails
    }

    // TODO: Replace with your real login logic (API call, authentication, etc.)
    console.log("Form submitted", { usernameOrEmail, password });

    // Example success toast (optional)
    // toast.success("Login successful!", { position: "top-right" });
  };

  return (
    <div>
      {/* Toast container to render toast notifications */}
      <ToastContainer />

      {/* Main layout container - full viewport height, gray background, center content */}
      <main className="w-full h-[100vh] bg-gray-200 grid place-content-center">

        {/* Form wrapper with responsive max widths and centered text */}
        <div className="mx-auto w-[95%] sm:w-[480px] lg:w-[500px] text-center">

          {/* Logo container */}
          <div className="w-[170px] h-[170px] mx-auto rounded-lg mb-4 overflow-hidden">
            {/* Logo image from public folder */}
            <img 
              src="image/eteclogo.png" 
              alt="ETEC Logo" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl font-bold">
            Welcome <span className="text-blue-950">Back</span>
          </h1>

          {/* Subheading instructions */}
          <p className="text-center text-gray-600 mb-6">
            Please enter your username or email, and your password.
          </p>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="mt-3 space-y-4">

            {/* Username or Email input with user icon */}
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

            {/* Password input with lock icon and toggle visibility button */}
            <div className="relative flex items-center bg-white rounded-lg overflow-hidden">
              <div className="p-3">
                <FaLock className="text-2xl text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"} // Toggle type text/password based on showPassword state
                className="w-full outline-0 text-xl h-full px-2 pr-10"
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Toggle button to show/hide password */}
              <div
                className="absolute right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Submit button with styling */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-950 mt-5 mb-2 rounded-lg text-white text-xl cursor-pointer 
                         hover:bg-blue-900 transition-all duration-300 
                         active:scale-95 shadow-md hover:shadow-lg"
            >
              Login
            </button>

            {/* Redirect to registration page link */}
            <p className="text-center text-xl mt-3">
              Don't have an account?
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
