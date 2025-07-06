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

        <div className="hidden lg:block w-full">
          <div className="mt-4 overflow-auto h-[550px]">
            <table className="w-[1260px] lg:w-full">
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

        <div className="block lg:hidden w-full">
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3 max-h-[550px] overflow-auto">
            {students.map((v, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow border border-gray-300 flex justify-between">
                <div className="">
                  {/* Name & Reason */}
                  <div className="mb-2">
                    <h2 className="text-xl font-bold text-blue-800">{v.name}</h2>
                    <p className="text-sm text-gray-500">Reason: I have a date</p>
                  </div>

                  {/* Gender */}
                  <div className="mb-2">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-lg ${v.gender === "Male" ? "bg-blue-200 text-blue-600" : "bg-red-200 text-red-600"}`}>
                      {v.gender === "Male" ? <FaMale className="text-2xl" /> : <FaFemale className="text-2xl" />} {v.gender}
                    </span>
                  </div>

                  {/* Attendance */}
                  <div className="mb-2 space-y-1">
                    <div className="flex justify-between items-center my-2">
                      <div className=" w-1/2 ">
                        <span className="px-2 bg-green-200 text-green-600 rounded">
                          Present
                        </span>
                      </div> 
                      <div className="w-1/2">
                        <span className="text-green-600 font-bold">
                          : {v.present}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                      <div className=" w-1/2 ">
                        <span className="px-2  bg-orange-200 text-orange-600 rounded">Permission</span>
                      </div> 
                      <div className="w-1/2">
                        <span className="text-orange-600 font-bold">: {v.permission}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                      <div className=" w-1/2 ">
                        <span className="px-2 bg-red-200 text-red-600 rounded">Absence</span>
                      </div> 
                      <div className="w-1/2">
                        <span className="text-red-600 font-bold">
                          : {v.absence}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between  mt-2 items-end">
                    {/* Attendance Score (fixed) */}
                    <div className="w-[32%]">
                      <label className="block text-sm font-medium text-gray-700">Att Score</label>
                      <div className="text-center text-xl font-bold bg-gray-100 py-2 rounded">30 pt</div>
                    </div>

                    {/* Activity Score */}
                    <div className="w-[32%]">
                      <label className="block text-sm font-medium text-gray-700">Act Score</label>
                      <input type="number" className="w-full text-center py-2 border rounded outline-none" />
                    </div>

                    {/* Final Score */}
                    <div className="w-[32%]">
                      <label className="block text-sm font-medium text-gray-700">Final Score</label>
                      <input type="number" className="w-full text-center py-2 border rounded outline-none" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col justify-start mt-3 flex-wrap pl-3">
                  <button className="text-center my-2 p-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition">
                    <BiTransfer />
                  </button>
                  <button className="text-center my-2 p-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition">
                    <FaEye />
                  </button>
                  <button className="text-center my-2 p-2 bg-blue-950 text-white rounded hover:bg-blue-900 transition">
                    <FaPen />
                  </button>
                  <button className="text-center my-2 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
