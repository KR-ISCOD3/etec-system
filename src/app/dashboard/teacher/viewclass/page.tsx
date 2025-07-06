"use client";
import {
  FaBuilding,
  FaHome,
  FaUsers,
  FaUserCheck,
  FaFileExcel,
  FaPen,
  FaTrash,
  FaCheck,
  FaEye,
  FaMale,
  FaFemale,
} from "react-icons/fa";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import LoadingPage from "@/components/Loading";
import DashboardClassCard from "@/components/DashboardClassCard";
import { LuComputer } from "react-icons/lu";
import { BiTransfer } from "react-icons/bi";
import { students } from "@/app/data/student";

export default function TeacherPage() {
  const { authorized, loading } = useAuthGuard("teacher");

  if (loading) return <LoadingPage />;
  if (!authorized) return null;

  return (
    <>
      <div className="pb-15 sm:px-4 sm:pb-0">
        <p className="text-gray-600">Welcome to, your class.</p>
        <h1 className="text-3xl font-bold mb-4">View Classes</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardClassCard icon={<FaUsers />} iconColor="text-blue-700" title={"Total Students"} value={6} />
          <DashboardClassCard icon={<LuComputer />} iconColor="text-green-700" title={"Class Course"} value={"PHP + Laravel"} textsize="text-lg" valueColor="text-red-700" />
          <DashboardClassCard icon={<FaBuilding />} iconColor="text-amber-700" title={"Class Location"} value={"ETEC 2"} textsize="text-lg" valueColor="text-blue-700" />
          <DashboardClassCard icon={<FaHome />} iconColor="text-pink-700" title={"ROOM"} value={"ETEC 123"} textsize="text-lg" valueColor="text-pink-700" />
        </div>

        {/* Header + Action Buttons */}
        <div className="mt-5">
          <div className="flex flex-wrap justify-between items-center">

            <h1 className="text-xl font-bold text-gray-500">Your Classes</h1>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded cursor-pointer">
                <FaFileExcel />
                Report Excel
              </button>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded cursor-pointer">
                <FaUserCheck />
                Track Attendance
              </button>    
              <button className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white font-semibold px-4 py-2 rounded cursor-pointer">
                <FaCheck />
                Save Score
              </button>
            </div>
          </div>
        </div>

        <div className="w-85 md:w-full">
          <div className="mt-4 overflow-auto h-[550px]">
            <table className="w-[1200px] md:w-full">
              <thead>
                <tr className="">
                  <th className="py-2 text-left px-1 text-gray-500 border border-gray-400 w-[300px]">Full Name</th>
                  <th className="py-2 px-1 text-gray-500 border border-gray-400 w-[120px]">Gender</th>
                  <th className="py-2 text-left px-1 text-gray-500 border border-gray-400 w-50">Attendence</th>
                  <th className="py-2 px-1 text-gray-500 border border-gray-400 w-[180px]">Attendence Score</th>
                  <th className="py-2 px-1 text-gray-500 border border-gray-400 w-[120px]">Activity Score</th>
                  <th className="py-2 px-1 text-gray-500 border border-gray-400 w-[120px]">Final Score</th>
                  <th className="py-2 px-1 text-gray-500 border border-gray-400 w-[220px] text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  students.map((v,i)=>{
                    return(
                      <tr key={i} className="">
                        <td className="px-1 py-2 font-bold border border-gray-400 text-2xl text-blue-800">
                          {v.name}
                          <p className="text-lg text-gray-400 font-medium">
                            Reason cause i have a date
                          </p>
                        </td>
                        <td className="px-1 py-2 border border-gray-400 text-center">
                          <button className={`p-2 rounded-lg ${v.gender === "Male" ? "bg-blue-200 text-blue-600 " : "bg-red-200 text-red-600"}`}>
                            {v.gender === "Male" ? <FaMale className="w-full text-2xl"/> :  <FaFemale className="w-full text-2xl"/> }
                          </button>
                        </td>
                       
                        <td className="px-1 py-2 border border-gray-400 space-y-1 w-ful pr-25">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 bg-green-200 text-green-600 rounded-lg">Present</span>
                            <span className="text-green-600 font-bold">: {v.present}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 bg-orange-200 text-orange-600 rounded-lg">Permission</span>
                            <span className="text-orange-600 font-bold">: {v.permission}</span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 bg-red-200 text-red-600 rounded-lg">Absence</span>
                            <span className="text-red-600 font-bold">: {v.absence}</span>
                          </div>
                        </td>
                   
                        <td className="px-1 py-2 border border-gray-400 text-center font-bold text-xl">30 pt</td>
                        <td className="px-1 py-2 border border-gray-400">
                          <input type="number" name="" id=""  className="bg-white w-full py-2 outline-0 text-xl text-center"/>
                        </td>
                        <td className="px-1 py-2 border border-gray-400">
                          <input type="number" name="" id=""  className="bg-white w-full py-2 outline-0 text-xl text-center"/>
                        </td>
                        <td className="px-1 py-2 border border-gray-400 text-center">                  
                          <button className="p-3 bg-blue-950 rounded-lg text-white cursor-pointer hover:bg-blue-900 transition ">
                            <BiTransfer/>
                          </button>
                          <button className="p-3 bg-blue-950 rounded-lg text-white cursor-pointer hover:bg-blue-900 transition mx-3">
                            <FaEye/>
                          </button>
                          <button className="p-3 bg-blue-950 rounded-lg text-white cursor-pointer hover:bg-blue-900 transition mr-3">
                            <FaPen/>
                          </button>
                          <button className="p-3 bg-red-600 rounded-lg text-white cursor-pointer hover:bg-red-700 transition ">
                            <FaTrash/>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
