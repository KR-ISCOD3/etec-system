'use client';
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaCalendarAlt,
  // FaChartBar,
  // FaUtensils,
  // FaFileAlt,
} from "react-icons/fa";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, href: "/dashboard" },
  { label: "Teachers", icon: <FaChalkboardTeacher />, href: "/dashboard/teacher" },
  { label: "Students", icon: <FaUserGraduate />, href: "/dashboard/students" },
  { label: "Events", icon: <FaCalendarAlt />, href: "/dashboard/events" },
];

export default function BottomBar() {
  return (
    <aside className="w-full lg:hidden bg-blue-950 text-white fixed bottom-0 z-50">
      <nav className="py-2 flex justify-around">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="flex flex-col items-center justify-center px-2 hover:bg-blue-800 py-1 rounded transition">
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm mt-1">{item.label}</p>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
