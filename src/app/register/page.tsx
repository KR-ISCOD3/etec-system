'use client'; // Next.js directive to mark this as a client component

import { useState } from "react";
import Link from "next/link"; // Next.js Link for client-side navigation
import { FaLock, FaUser, FaChevronDown, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for UI
import { ToastContainer, toast } from "react-toastify"; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles
import Image from "next/image";

export default function Page() {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Centralized state for all form fields
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    phone: '',
    position: '',
    workStatus: '',
    shift: '',
    email: '',
    password: ''
  });

  // Generic input/select change handler updating formData by name
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation: Check if any field is empty
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        if (formData[key as keyof typeof formData] === '') {
          toast.error('Please fill in all fields.', {
            position: 'top-right',
            theme: 'colored',
          });
          return;
        }
      }
    }
    
    

    // Success toast - form passed validation
    toast.success('Form submitted successfully!', { position: 'top-center' });

    // TODO: send formData to backend API or service here
  };

  // Button styling with Tailwind, responsive width on different screens
  const btnstyle = `w-full sm:w-[600px] lg:w-[600px] p-3 bg-blue-950 mt-2 rounded-lg text-white text-xl cursor-pointer 
                    hover:bg-blue-900 transition-all duration-300 
                    active:scale-95 shadow-md hover:shadow-lg`;

  // Common select styling
  const customSelect = "bg-gray-100 rounded-lg pl-3 pr-10 py-2 text-lg outline-none appearance-none w-full";
  const selectWrapper = "relative w-full"; // Wrapper to position dropdown icon absolutely

  return (
    <div className="w-full min-h-screen bg-gray-200 grid place-content-center p-4">
      {/* Toast container needed for react-toastify to display notifications */}
      <ToastContainer />

      {/* Form container with responsive max widths and padding */}
      <div className="w-full sm:w-[800px] lg:w-[1100px] rounded-xl sm:p-6 lg:p-8">
        
        {/* Logo container */}
        <div className="w-[140px] h-[140px] mx-auto rounded-lg mb-4 overflow-hidden">
          <Image
            src="/image/eteclogo.png"
            alt="logo"
            width={140}
            height={140}
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-2">
          Register Your <span className="text-blue-950">Account</span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-6">Please fill out all the fields below.</p>

        {/* Form starts */}
        <form onSubmit={handleSubmit} className="space-y-4 text-center">

          {/* Row 1: Full Name, Gender, Phone */}
          <div className="flex flex-wrap gap-4 sm:gap-2 lg:gap-4">
            
            {/* Full Name input with user icon */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-1/2 md:w-[32.3%]">
              <FaUser className="text-xl mr-2 text-gray-400" />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-lg py-2"
              />
            </div>

            {/* Gender select dropdown with arrow icon */}
            <div className={`${selectWrapper} w-full sm:w-1/2 md:w-[32.3%]`}>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={customSelect}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {/* Chevron icon positioned absolutely */}
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>

            {/* Phone input */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 w-full sm:w-full md:w-[32.3%]">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-lg py-2"
              />
            </div>
          </div>

          {/* Row 2: Position, Work Status, Shift */}
          <div className="flex flex-wrap gap-4 sm:gap-2 lg:gap-4">

            {/* Position select */}
            <div className={`${selectWrapper} w-full sm:w-1/2 md:w-[32.3%]`}>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className={customSelect}
              >
                <option value="">Position</option>
                <option value="Web-Developer">Web Developer</option>
                <option value="Mobile-App">Mobile App</option>
                <option value="Desktop-App">Desktop App</option>
                <option value="Networking">Networking</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Full-Stack">Full Stack</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>

            {/* Work Status select */}
            <div className={`${selectWrapper} w-full sm:w-1/2 md:w-[32.3%]`}>
              <select
                name="workStatus"
                value={formData.workStatus}
                onChange={handleChange}
                className={customSelect}
              >
                <option value="">Work Status</option>
                <option value="Full-Time">Full-Time (Mon–Thu & Sat–Sun)</option>
                <option value="Part-Time">Part-Time (Sat–Sun)</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>

            {/* Shift select */}
            <div className={`${selectWrapper} w-full sm:w-full md:w-[32.3%]`}>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className={customSelect}
              >
                <option value="">Shift</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Both">Morning & Afternoon</option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
            </div>
          </div>

          {/* Row 3: Email and Password */}
          <div className="flex flex-wrap gap-4 sm:gap-2 lg:gap-4">

            {/* Email input */}
            <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden w-full sm:w-full md:w-[49%]">
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-lg py-2 px-3"
              />
            </div>

            {/* Password input with toggle */}
            <div className="relative flex items-center bg-gray-100 rounded-lg ps-3 overflow-hidden w-full sm:w-full md:w-[49%]">
              <FaLock className="text-xl mr-2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-lg py-2 px-3 pr-10"
              />
              {/* Toggle show/hide password */}
              <div
                className="absolute right-3 text-gray-500 cursor-pointer"
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
          </div>

          {/* Submit button */}
          <button type="submit" className={btnstyle}>
            Register
          </button>

          {/* Login redirect */}
          <p className="text-center sm:text-xl mb-5">
            Already have an account?
            <Link href="/login" className="text-blue-800 font-bold">&ensp;Back to Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
