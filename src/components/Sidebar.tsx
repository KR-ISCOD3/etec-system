'use client';

import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCalendarAlt,
  FaChartBar,
  FaUtensils,
  FaFileAlt,
} from 'react-icons/fa';
import { IoLogOut, IoPeople, IoSettings } from 'react-icons/io5';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/auth/authSlice';

// Define the menu items per role
const roleBasedMenu = {
  director: [
    { label: 'Home', icon: <FaTachometerAlt />, href: '/dashboard' },
    { label: 'Teachers', icon: <FaChalkboardTeacher />, href: '/dashboard/teacher' },
    { label: 'Students', icon: <FaUserGraduate />, href: '/dashboard/students' },
    { label: 'Events', icon: <FaCalendarAlt />, href: '/dashboard/events' },
    { label: 'Finance', icon: <FaChartBar />, href: '/dashboard/finance' },
    { label: 'Food', icon: <FaUtensils />, href: '/dashboard/food' },
    { label: 'Report', icon: <FaFileAlt />, href: '/dashboard/report' },
  ],
  assistant: [
    { label: 'Home', icon: <FaTachometerAlt />, href: '/dashboard' },
    { label: 'Certificates', icon: <FaFileAlt />, href: '/dashboard/certificates' },
    { label: 'Attendance', icon: <FaCalendarAlt />, href: '/dashboard/attendance' },
  ],
  instructor: [
    { label: 'Home', icon: <FaTachometerAlt />, href: '/dashboard/teacher' },
    { label: 'Student', icon: <IoPeople />, href: '/dashboard/teacher/classes' },
    { label: 'Setting', icon: <IoSettings />, href: '/dashboard/teacher/attendance' },
  ],
};

export default function Sidebar() {
  // const [role, setRole] = useState('teacher');
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const loading = useAppSelector((state)=>state.auth.loading)
  const roleUser = useAppSelector((state)=>state.auth.user); 

  const menuItems = roleBasedMenu[roleUser?.role as keyof typeof roleBasedMenu] || [];

  // useEffect(() => {
  //   const userStr = localStorage.getItem('user');
  //   const user = userStr ? JSON.parse(userStr) : null;
  //   if (user?.role) {
  //     setRole(user.role);
  //   }
  // }, []);

  
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap(); // call the logout thunk
      router.push("/login"); // redirect after successful logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };


  return (
    <>
      <aside className="hidden lg:w-[250px] h-screen bg-blue-950 text-white lg:flex flex-col justify-between sticky top-0">
        {/* Logo */}
        <div>
          <div className="text-center py-6 text-xl font-bold border-b border-blue-900">
            <div className="relative w-[60px] h-[60px] mx-auto rounded-lg mb-4 overflow-hidden">
              <Image 
                src="/image/eteclogo.png" 
                alt="ETEC Logo" 
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <p className="text-white">ETEC CENTER</p>
          </div>

          {/* Dynamic Menu Items */}
          <nav className="mt-6">
            {loading ? (
              <div className="space-y-3 px-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-300 rounded-md animate-pulse"
                  />
                ))}
              </div>
            ) : (
              menuItems.map((item, index) => (
                <Link key={index} href={item.href} className="block">
                  <div className="flex items-center px-6 py-3 hover:bg-blue-800 cursor-pointer transition">
                    <span className="text-xl mr-4">{item.icon}</span>
                    <span className="text-md">{item.label}</span>
                  </div>
                </Link>
              ))
            )}
          </nav>

        </div>

        {/* Logout Section */}
        <div className="bg-red-500 m-4 p-4 rounded-lg text-sm text-white text-center shadow-md">
          <p className="font-semibold mb-2">Ready to leave?</p>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center mx-auto cursor-pointer bg-white text-red-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
          >
            <IoLogOut className="text-xl me-2" />
            Logout
          </button>
        </div>

      
      </aside>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Logout"
      >
      <p className='text-blue-950 text-center text-2xl'>Are you sure you want to <span className='font-bold'>logout</span>?</p>
      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={() => setModalOpen(false)}
          className="btn btn-default"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={handleLogout}
          className="btn btn-error text-white"
        >
          {loading ? "Loading...":"Logout"}
        </button>
      </div>
      </Modal>
    </>
  );
}
