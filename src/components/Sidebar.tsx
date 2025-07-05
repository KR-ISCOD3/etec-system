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
import { useEffect, useState } from 'react';

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
  teacher: [
    { label: 'Home', icon: <FaTachometerAlt />, href: '/dashboard/teacher' },
    { label: 'Student', icon: <IoPeople />, href: '/dashboard/teacher/classes' },
    { label: 'Setting', icon: <IoSettings />, href: '/dashboard/teacher/attendance' },
  ],
};

export default function Sidebar() {
  const [role, setRole] = useState('teacher');

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    if (user?.role) {
      setRole(user.role);
    }
  }, []);

  const menuItems = roleBasedMenu[role as keyof typeof roleBasedMenu] || [];

  return (
    <aside className="hidden lg:w-[250px] h-screen bg-blue-950 text-white lg:flex flex-col justify-between sticky top-0">
      {/* Logo */}
      <div>
        <div className="flex items-center text-left py-6 text-xl font-bold border-b border-blue-900">
          <div className="w-[60px] h-[60px] overflow-hidden ms-4 me-1">
            <img src="/image/eteclogo.png" alt="ETEC Logo" />
          </div>
          <span className="text-white">ETEC CENTER</span>
        </div>

        {/* Dynamic Menu Items */}
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="flex items-center px-6 py-3 hover:bg-blue-800 cursor-pointer transition">
                <span className="text-xl mr-4">{item.icon}</span>
                <span className="text-md">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Section */}
      <div className="bg-red-500 m-4 p-4 rounded-lg text-sm text-white text-center shadow-md">
        <p className="font-semibold mb-2">Ready to leave?</p>
        <button
          onClick={() => {
            localStorage.removeItem('user'); // Clear session
            window.location.href = '/login'; // Redirect to login
          }}
          className="flex items-center mx-auto cursor-pointer bg-white text-red-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
        >
          <IoLogOut className="text-xl me-2" />
          Logout
        </button>
      </div>
    </aside>
  );
}
