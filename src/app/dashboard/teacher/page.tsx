"use client";

import { use, useEffect, useState } from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaList,
  FaChevronDown,
} from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa6";
import { MdWindow } from "react-icons/md";
import { IoClose, IoHome } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";

import DashboardCard from "@/components/DashboardCard";
import { classData, ClassItem } from "@/app/data/classes";
import { topStudents } from "@/app/data/topstudents";
// import LoadingPage from "@/components/Loading";
import Modal from "@/components/Modal";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { RootState } from "@/store/store";
import { fetchUser } from "@/store/auth/authSlice";
import { RootState } from "@/store/store";
import { fetchCourses } from "@/store/feature/courseSlice";
import { fetchBranches } from "@/store/feature/branchSlice";
import { fetchRooms } from "@/store/feature/roomSlice";
import { addClass, fetchClassesByUserId, updateClass } from "@/store/feature/classSlice";
import timesByTerm from "@/app/data/timeByTerm";
import type { Class } from "@/store/feature/classSlice";
import { toast, ToastContainer } from "react-toastify";

// ✅ Replace with this:
interface ClassFormData {
  id:number | null,
  teacher_id?: number | null
  branch_id: number | null;
  room_id: number | null;
  course_id: number | null;
  status: string | null;
  class_status: string;
  lesson: string;
  term: string;
  time: string;
}

type FormData = ClassFormData | null;

export default function TeacherPage() {
  const dispatch = useAppDispatch();
  // const loading = useAppSelector((state: RootState) => state.auth.loading);
  const user = useAppSelector((state: RootState) => state.auth.user);

  const courses = useAppSelector((state: RootState) => state.courses.courses);
  // const coursesLoading = useAppSelector((state: RootState) => state.courses.loading);
  // const coursesError = useAppSelector((state: RootState) => state.courses.error);

  const branches = useAppSelector((state: RootState) => state.branches.branches);
  const rooms = useAppSelector((state: RootState)=> state.rooms.rooms);

  // const [selectedTerm, setSelectedTerm] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);


  const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"card" | "row">("card");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "update">("add");

  const [formData, setFormData] = useState<FormData | null>(null);

  const [isModalAddStuOpen, setIsModalAddStuOpen] = useState(false);
  const [isTransferModal, setIsTransferModal] = useState(false);
  const [isopenPreEndModal, setIsopenPreEndModal] = useState(false);
  const [isopenEndModal, setIsopenEndModal] = useState(false);
  const classloading = useAppSelector((state)=>state.class.classloading);
  const classes = useAppSelector((state)=>state.class.classes);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id !== undefined && user?.id !== null) {
      dispatch(fetchClassesByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  const toggleDropdown = (index: number) => {
    setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
  };
  
  const openAddModal = (): void => {
    setMode("add");
    setFormData({
      id:null,
      course_id: null,
      branch_id: null,
      room_id: null,
      class_status: "",
      status:"",
      term: "",
      time: "",
      lesson: "",
    });
    setIsModalOpen(true);
  };

  const openUpdateModal = (cls: Class) => {

    setMode("update");
  
    // Find course by title to get course_id (number)
    const matchedCourse = courses.find(c => c.name === cls.title);
    const course_id = matchedCourse ? matchedCourse.id : null;
  
    // Parse location into branch name and room number
    const [branchName = "", roomNumber = ""] = cls.location.split(" - ");
  
    // Find branch by name to get branch_id (number)
    const matchedBranch = branches.find(b => b.branch_name === branchName);
    const branch_id = matchedBranch ? matchedBranch.id : null;
  
    // Find room by room_number and branch_id to get room_id (number)
    const matchedRoom = rooms.find(r => r.room_number === roomNumber && r.branch_id === branch_id);
    const room_id = matchedRoom ? matchedRoom.id : null;
  
    // Now prepare form data with numbers
    // const formValues: ClassFormData = {
    //   id: cls.id ?? 0,
    //   course_id: course_id ?? 0,
    //   class_status: cls.status || "",
    //   branch_id: branch_id ?? 0,
    //   room_id: room_id ?? null,
    //   term: "",  // fill if you have value
    //   time: "",  // fill if you have value
    //   lesson: cls.lesson || "",
    // };
  
    // setFormData(formValues);
    setIsModalOpen(true);
  };
  

  const openAddStudentModal = () => {
    setIsModalAddStuOpen(true);
  };

  const openTransferModal = () => {
    setIsTransferModal(true);
  };

  const openPreEndModal = () => {
    setIsopenPreEndModal(true);
  };

  const openEndModal = () => {
    setIsopenEndModal(true);
  };

  function playClickSound() {
    const audio = new Audio("/sound/ILOVEU.mp3"); // path to your audio file
    audio.play();
  }
  const filteredRooms = rooms.filter(
    (room) => room.branch_id === Number(formData?.branch_id)
  );

  useEffect(() => {
    if (formData?.term && timesByTerm[formData.term]) {
      setAvailableTimes(timesByTerm[formData.term]);
    } else {
      setAvailableTimes([]);
    }
  }, [formData?.term]);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData) return;
  
    const submissionData: Omit<Class, "id" | "isdeleted"> = {
      teacher_id: Number(user?.id) || 1,
      room_id:
        formData.class_status === "Online"
          ? null
          : Number(formData.room_id),
      branch_id: Number(formData.branch_id),
      course_id: Number(formData.course_id),
      lesson: formData.lesson?.trim() || "Introduction",
      total_student: 0,
      status: formData.status || "progress",
      class_status: formData.class_status || "",
      term: formData.term || "",
      time: formData.time || "",
    };
  
    console.log("submissionData details:", submissionData);
  
    try {
      if (mode === "add") {
        await dispatch(addClass(submissionData)).unwrap();
        toast.success("Class added successfully!", {
          position: "bottom-right",
        });
      } else if (formData.id) {
        await dispatch(updateClass({
          id: formData.id,
          data: submissionData,
        })).unwrap();
        toast.success("Class updated successfully!", {
          position: "bottom-right",
        });
      }
  
      setIsModalOpen(false);
    } catch (error: unknown) {
      // Type-safe way to access error.message
      let message = "Something went wrong!";
      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as any).message === "string"
      ) {
        message = (error as any).message;
      }
  
      toast.error(message, {
        position: "bottom-right",
      });
    }
  };

  console.table(classes);
  
  return (
    <>
      <ToastContainer/>
      <div className="pb-15 sm:px-4 sm:pb-0">
        <p className="text-gray-600">Welcome back, {user?.name}.</p>
        <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            icon={<FaChalkboardTeacher />}
            title="total classes"
            value={6}
            change="+1"
            changeLabel="this month"
            iconColor="text-blue-800"
            valueColor="text-blue-700"
            changeColor="text-green-500"
          />
          <DashboardCard
            icon={<FaUsers />}
            title="total students"
            value={135}
            change="+5"
            changeLabel="this month"
            iconColor="text-teal-800"
            valueColor="text-teal-700"
            changeColor="text-blue-500"
          />
          <DashboardCard
            icon={<FaHourglassHalf />}
            title="progress classes"
            value={4}
            change="+1"
            changeLabel="this week"
            iconColor="text-yellow-700"
            valueColor="text-yellow-600"
            changeColor="text-orange-500"
          />
          <DashboardCard
            icon={<FaCheckCircle />}
            title="end classes"
            value={2}
            change="0"
            changeLabel="this week"
            iconColor="text-green-800"
            valueColor="text-green-700"
            changeColor="text-gray-500"
          />
        </div>

        {/* Classes and Top Score */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          {/* Left Side: Top Score */}
          <div className="lg:w-[35%] bg-white p-4 rounded-lg shadow-sm max-h-auto overflow-y-auto">
            <h2 className="text-xl font-bold mb-3">Top Score Student</h2>
            <div className="max-h-[470px] overflow-y-auto">
              <table className="w-full">
                <tbody>
                  {topStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-3 py-3">
                        <p className="text-xl font-bold">{student.name}</p>
                        <p>
                          tel:{" "}
                          <span className="text-green-600">{student.tel}</span>
                        </p>
                      </td>
                      <td className="px-3 py-2 hidden md:table-cell">
                        <p>
                          Class:{" "}
                          <span className="font-bold">{student.course}</span>
                        </p>
                        <p>
                          Time :{" "}
                          <span className="text-red-500">2:00 - 3:15</span>
                        </p>
                      </td>
                      <td>
                        Score:{" "}
                        <span className="px-3 py-2 font-semibold text-blue-900">
                          {student.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side: Class List */}
          <div className="lg:w-[65%] bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h2 className="text-xl font-bold">Your Classes</h2>
              <div className="flex gap-2 ">
                <button
                  onClick={() => setViewMode("card")}
                  title="View as card"
                  className={`hidden cursor-pointer lg:block ${
                    viewMode == "card" ? "bg-blue-950" : "bg-gray-500"
                  } text-white px-3 py-2 rounded hover:bg-gray-600 transition`}
                >
                  <MdWindow className="text-xl" />
                </button>
                <button
                  onClick={() => setViewMode("row")}
                  title="View as row"
                  className={`hidden cursor-pointer lg:block ${
                    viewMode == "row" ? "bg-blue-950" : "bg-gray-500"
                  } text-white px-3 py-2 rounded hover:bg-gray-600 transition`}
                >
                  <FaList className="text-xl" />
                </button>
                <button
                  onClick={openAddModal}
                  className="bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 transition text-sm cursor-pointer"
                >
                  Add Class +
                </button>
              </div>
            </div>

            
            <div className="max-h-[470px] overflow-y-auto">
              {viewMode === 'card' ? (
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-between">
                  {classes.map((cls, index) => (
                    <div
                      key={cls.id}
                      className="w-full sm:w-[49%] border-2 border-blue-500 rounded-lg p-4 relative bg-white shadow-sm"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <IoHome className="text-3xl text-blue-950" />
                          <p className="font-bold text-lg">{cls.courses?.name /* or cls.title if you have it */}</p>
                        </div>

                        {/* Dropdown */}
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(index)}
                            className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer overflow-hidden"
                          >
                            {dropdownOpenIndex === index ? <IoClose /> : <BsThreeDots />}
                          </button>
                          {dropdownOpenIndex === index && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                              <ul className="text-lg text-gray-700">
                                <li
                                  onClick={openAddStudentModal}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  Add Student
                                </li>
                                <li
                                  onClick={() => openUpdateModal(cls)}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  Edit Class
                                </li>
                                <li
                                  onClick={openTransferModal}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  Transfer
                                </li>
                                <li
                                  onClick={openPreEndModal}
                                  className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 cursor-pointer"
                                >
                                  Pre-End
                                </li>
                                <li
                                  onClick={openEndModal}
                                  className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 cursor-pointer"
                                >
                                  End Class
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Class details */}
                      <table className="w-full text-left border-collapse text-xl">
                        <tbody>
                          <tr className="border-b border-gray-300 ">
                            <td className="text-lg sm:text-xl font-semibold w-1/2 py-2 text-gray-700">
                              Lesson:
                            </td>
                            <td className=" text-gray-800 py-2 line-clamp-1">
                              <div className="line-clamp-1 max-w-xs break-words">{cls.lesson}</div>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-300">
                            <td className="text-lg sm:text-xl font-semibold py-2 text-gray-700">
                              Total Students:
                            </td>
                            <td className=" text-blue-900 py-2 font-bold">{cls.total_student}</td>
                          </tr>
                          <tr className="border-b border-gray-300">
                            <td className="text-lg sm:text-xl font-semibold py-2 text-gray-700">
                              Location:
                            </td>
                            <td className=" text-gray-800 py-2">
                              {cls.branches?.branch_name ?? 'N/A'}
                              &emsp;
                              <span className="text-amber-600 font-bold">{cls.rooms?.room_number ?? 'N/A'}</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-lg sm:text-xl font-semibold py-2 text-gray-700">
                              Status:
                            </td>
                            <td className="py-2">{cls.class_status}</td>
                          </tr>
                        </tbody>
                      </table>

                      <Link href="/dashboard/teacher/viewclass" prefetch={false}>
                        <button className="w-full mt-3 p-2 bg-blue-950 text-white rounded-md text-lg hover:bg-blue-900 cursor-pointer">
                          View Class
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                  <table className="min-w-full border border-gray-300 bg-white rounded-md shadow-sm">
                    <thead>
                      <tr className="bg-blue-950 text-white text-left sticky top-0">
                        <th className="py-2 px-4">Title</th>
                        <th className="py-2 px-4">Lesson</th>
                        <th className="py-2 px-4">Total Students</th>
                        <th className="py-2 px-4 hidden sm:table-cell">Location</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.map((cls, index) => (
                        <tr
                          key={cls.id}
                          className="border-b border-gray-300 hover:bg-gray-100"
                        >
                          <td className="py-3 px-4 flex items-center gap-2 font-bold text-blue-950">
                            <IoHome className="text-2xl" />
                            {cls.courses?.name /* or cls.title */}
                          </td>
                          <td className="py-3 px-4">{cls.lesson}</td>
                          <td className="py-3 px-4 font-bold text-blue-900">
                            {cls.total_student}
                          </td>
                          <td className="py-3 px-4 hidden sm:table-cell">
                            {cls.branches?.branch_name ?? 'N/A'}
                            &emsp;
                            <span className="text-amber-600 font-bold">{cls.rooms?.room_number ?? 'N/A'}</span>
                          </td>
                          <td className="py-3 px-4">{cls.class_status}</td>
                          <td className="py-3 px-4 relative">
                            <button
                              onClick={() => toggleDropdown(index)}
                              className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer overflow-hidden"
                            >
                              {dropdownOpenIndex === index ? <IoClose /> : <BsThreeDots />}
                            </button>
                            {dropdownOpenIndex === index && (
                              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                <ul className="text-lg text-gray-700">
                                  <li
                                    onClick={openAddStudentModal}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  >
                                    Add Student
                                  </li>
                                  <li
                                    onClick={() => openUpdateModal(cls)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  >
                                    Edit Class
                                  </li>
                                  <li
                                    onClick={openTransferModal}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  >
                                    Transfer
                                  </li>
                                  <li
                                    onClick={openPreEndModal}
                                    className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 cursor-pointer"
                                  >
                                    Pre-End
                                  </li>
                                  <li
                                    onClick={openEndModal}
                                    className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 cursor-pointer"
                                  >
                                    End Class
                                  </li>
                                </ul>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
                       
          </div>
        </div>
      </div>

      {/* add and update class modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={mode === "add" ? "Add New Class" : "Update Class"}
      >
        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          {/* Courses and Status */}
          <div className="flex flex-wrap justify-between gap-3">
            <div className="w-full sm:w-[49%] relative">
              <label className="block mb-1 font-medium text-gray-700">
                Courses
              </label>
              <select
                value={formData?.course_id || ""}
                onChange={(e) =>
                  setFormData(
                    (prev) => prev && { ...prev, course_id: Number(e.target.value) }
                  )
                }
                className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              >
                <option value="">Select Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-[60%] transform text-gray-600" />
            </div>

            <div className="w-full sm:w-[49%] relative">
              <label className="block mb-1 font-medium text-gray-700">
                Status Classes
              </label>
              <select
                value={formData?.class_status || ""}
                onChange={(e) =>
                  setFormData(
                    (prev) => prev && { ...prev, class_status: e.target.value }
                  )
                }
                className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              >
                <option value="">Select Status</option>
                <option value="Online">Online</option>
                <option value="Physical">Physical</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Class-Free" className="text-green-600">
                  Class-Free
                </option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-[60%] transform text-gray-600" />
            </div>
          </div>

          {/* Branch and Room */}
          <div className="flex flex-wrap justify-between gap-3">

            <div className="w-full sm:w-[49%] relative">
              <label className="block mb-1 font-medium text-gray-700">
                Branch (សាខា)
              </label>
              <select
                value={formData?.branch_id || ""}
                onChange={(e) =>
                  setFormData(
                    (prev) =>
                      prev && {
                        ...prev,
                        branch_id: Number(e.target.value),
                        room_id: 0, // or null if you prefer
                      }
                  )
                }
                className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              >
                <option value="">Select Branches</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branch_name}
                  </option>
                ))}
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-[60%] transform text-gray-600" />
            </div>


            <div className="w-full sm:w-[49%] relative">
              <label className="block mb-1 font-medium text-gray-700">Room</label>
              <select
                value={formData?.room_id || ""}
                onChange={(e) =>
                  setFormData((prev) => prev && { ...prev, room_id: Number(e.target.value) })
                }
                disabled={!formData?.branch_id || formData?.class_status === "Online"}
                className={`w-full appearance-none border rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0
                  ${!formData?.branch_id || formData?.class_status === "Online"
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300'}
                `}
              >
                <option value="">Select Room</option>

                {filteredRooms.map((room) => (
                  <option key={room.id} value={room.id} >
                    {room.room_number}
                  </option>
                ))}

              </select>

              <FaChevronDown className="pointer-events-none absolute right-3 top-[60%] transform text-gray-600" />
            </div>


          </div>

          {/* Term and Time */}
          <div className="flex flex-wrap justify-between gap-3">


            <div className="w-full sm:w-[49%] relative">
              <label className="block mb-1 font-medium text-gray-700">Term</label>
              <select
                value={formData?.term || ""}
                onChange={(e) =>
                  setFormData(
                    (prev) => prev && { ...prev, term: e.target.value as string }
                  )
                }
                className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              >
                <option value="">Select Term</option>
                <option value="Mon-Thu">Mon-Thu</option>
                <option value="Sat-Sun">Sat-Sun</option>
                <option
                  value="Friday"
                  disabled={formData?.class_status !== "Class-Free"}
                >
                  Friday
                </option>
                <option
                  value="Mon-Wed"
                  disabled={formData?.class_status !== "Class-Free"}
                >
                  Mon-Wed
                </option>
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-[60%] transform text-gray-600" />
            </div>



            <div className="w-full sm:w-[49%] relative">
              <label className="block mb-1 font-medium text-gray-700">
                Time
              </label>
              <select
                value={formData?.time || ""}
                onChange={(e) =>
                  setFormData((prev) => prev && { ...prev, time: e.target.value })
                }
                disabled={!formData?.term}
                className={`w-full appearance-none border rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0
                  ${!formData?.term ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-gray-300'}
                `}
              >
                <option value="">Select Time</option>
                {(availableTimes || []).map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <FaChevronDown className="pointer-events-none absolute right-3 top-[60%] transform text-gray-600" />
            </div>

          </div>

          {/* Lesson */}
          <div className="flex flex-wrap justify-between gap-3">
            <div className="w-full">
              <label className="block mb-1 font-medium text-gray-700">
                Course Lesson
              </label>
              <input
                type="text"
                value={formData?.lesson || "Introduction"}
                onChange={(e) =>
                  setFormData(
                    (prev) => prev && { ...prev, lesson: e.target.value }
                  )
                }
                placeholder="Lesson"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              />

            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-action pt-4 flex justify-end gap-2 border-t border-gray-300">
            <button
              type="button"
              className="btn bg-default"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              disabled={classloading}
              type="submit"
              className="btn btn-md bg-blue-950 text-white px-10"
            >
              {
                classloading
                ? (mode === "update" ? "Saving Change..." : "Saving...")
                : (mode === "update" ? "Save Change" : "Save")
              }
            </button>
          </div>
        </form>
      </Modal>

      {/* modal Add student */}
      <Modal
        isOpen={isModalAddStuOpen}
        onClose={() => setIsModalAddStuOpen(false)}
        title="Add New Student"
      >
        <form className="space-y-4 mt-2">
          {/* your data */}
          <div className="flex flex-wrap justify-between gap-3">
            <div className="w-full sm:w-[38%] relative">
              <label
                htmlFor="building1"
                className="block mb-1 font-medium text-gray-700"
              >
                Select Tittle
              </label>

              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Full Name"
                className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="w-full sm:w-[20%] relative">
              <label
                htmlFor="building1"
                className="block mb-1 font-medium text-gray-700"
              >
                Select Tittle
              </label>

              <select
                name="building1"
                id="building1"
                className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              >
                <option value="">Gender</option>
                <option value="">Male</option>
                <option value="">Female</option>
                {/* Add options here */}
              </select>

              <FaChevronDown className="pointer-events-none absolute right-3 top-[60%] transform  text-gray-600" />
            </div>

            <div className="w-full sm:w-[38%] relative">
              <label
                htmlFor="building1"
                className="block mb-1 font-medium text-gray-700"
              >
                Select Tittle
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter TeL"
                className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="modal-action pt-4 flex justify-end gap-2 border-t border-gray-300">
            <button
              type="button"
              className="btn bg-default"
              onClick={() => setIsModalAddStuOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                playClickSound();
                // your save logic here, e.g. form submit or state update
              }}
              type="button"
              className="btn btn-md bg-blue-950 text-white px-10"
            >
              {mode == "update" ? "Save Change" : "Add Student"}
            </button>
          </div>
        </form>
      </Modal>

      {/* modal transfer class */}
      <Modal
        isOpen={isTransferModal}
        onClose={() => setIsTransferModal(false)}
        title="Transfer Class"
      >
        <form className="space-y-4 mt-2">
          {/* your data */}
          <div className="flex flex-wrap justify-between gap-3">
            <div className="w-full relative sm:flex mt-3">
              <label
                htmlFor="building1"
                className="block mb-1 font-medium text-gray-700 sm:w-2/3 sm:mr-3"
              >
                Please enter the <b>ID of the instructor</b> you want to
                transfer.
              </label>

              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Instrutor's ID"
                className="w-full appearance-none border border-gray-300 rounded px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-0"
              />
            </div>
          </div>

          <div className="modal-action pt-4 flex justify-end gap-2 border-t border-gray-300">
            <button
              type="button"
              className="btn bg-default"
              onClick={() => setIsTransferModal(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                playClickSound();
                // your save logic here, e.g. form submit or state update
              }}
              type="button"
              className="btn btn-md bg-blue-950 text-white px-10"
            >
              Transfer
            </button>
          </div>
        </form>
      </Modal>

      {/* pre end class */}
      <Modal
        isOpen={isopenPreEndModal}
        onClose={() => setIsopenPreEndModal(false)}
        title="Pre-End Class"
      >
        <form className="space-y-4 mt-2">
          {/* your data */}
          <p className="text-lg text-center">
            This class is nearing its end. Are you sure you want to{" "}
            <b>pre-end it now</b>?
          </p>

          <div className="modal-action pt-4 flex justify-center gap-2 border-t border-gray-300">
            <button
              type="button"
              className="btn bg-default px-5"
              onClick={() => setIsopenPreEndModal(false)}
            >
              No
            </button>
            <button
              onClick={() => {
                playClickSound();
                // your save logic here, e.g. form submit or state update
              }}
              type="button"
              className="btn btn-md btn-error text-white px-5"
            >
              Yes
            </button>
          </div>
        </form>
      </Modal>

      {/* end class */}
      <Modal
        isOpen={isopenEndModal}
        onClose={() => setIsopenEndModal(false)}
        title="End Class"
      >
        <form className="space-y-4 mt-2">
          {/* your data */}
          <p className="text-lg text-center">
            The session has been completed. Do you wish to{" "}
            <b>end the class now</b>?
          </p>

          <div className="modal-action pt-4 flex justify-center gap-2 border-t border-gray-300">
            <button
              type="button"
              className="btn bg-default px-5"
              onClick={() => setIsopenEndModal(false)}
            >
              No
            </button>
            <button
              onClick={() => {
                playClickSound();
                // your save logic here, e.g. form submit or state update
              }}
              type="button"
              className="btn btn-md btn-error text-white px-5"
            >
              Yes
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
