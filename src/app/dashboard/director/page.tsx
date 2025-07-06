// app/dashboard/teacher/page.tsx or wherever TeacherPage is located
'use client';

import {
    FaUserGraduate,
    FaUser,
    FaBuilding
  } from "react-icons/fa";
  import { FaBuildingCircleCheck } from "react-icons/fa6";
  import DashboardCard from "@/components/DashboardCard"; // Adjust path as needed
import { useAuthGuard } from "@/hooks/useAuthGuard";
  
  export default function DirectorPage() {
    const { authorized, loading } = useAuthGuard("director");
    
    if (loading) return <p>Checking permission...</p>;
    if (!authorized) return null;

    return (
      <div className="py-1 px-2">
        <p className="text-gray-600">Welcome back, admin.</p>
        <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <DashboardCard
            icon={<FaUser />}
            title="total students"
            value={120}
            change="+10%"
            changeLabel="last-month"
            iconColor="text-blue-800"
            valueColor="text-blue-700"
            changeColor="text-blue-500"
          />
  
          <DashboardCard
            icon={<FaUserGraduate />}
            title="total teachers"
            value={8}
            change="-2%"
            changeLabel="last-month"
            iconColor="text-yellow-800"
            valueColor="text-yellow-700"
            changeColor="text-red-700"
          />
  
          <DashboardCard
            icon={<FaBuilding />}
            title="all classes"
            value={3}
            change="+0.5%"
            changeLabel="last-month"
            iconColor="text-red-800"
            valueColor="text-red-700"
            changeColor="text-blue-500"
          />
  
          <DashboardCard
            icon={<FaBuildingCircleCheck />}
            title="new-classes"
            value={2}
            change="+2%"
            changeLabel="last-month"
            iconColor="text-green-800"
            valueColor="text-green-700"
            changeColor="text-blue-500"
          />
        </div>
      </div>
    );
  }
  