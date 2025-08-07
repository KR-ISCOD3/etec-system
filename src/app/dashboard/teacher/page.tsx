"use client";
import { useEffect, useState } from "react";
import { FaList,FaChevronDown,} from "react-icons/fa";
import { MdWindow } from "react-icons/md";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUser } from "@/store/auth/authSlice";
import { RootState } from "@/store/store";
import { fetchCourses } from "@/store/feature/courseSlice";
import { fetchBranches } from "@/store/feature/branchSlice";
import { fetchRooms } from "@/store/feature/roomSlice";
import { addClass, fetchClassesByUserId, preEndClass, softDeleteClass, updateClass } from "@/store/feature/classSlice";
import timesByTerm from "@/app/data/timeByTerm";
import type { Class } from "@/store/feature/classSlice";
import { toast, ToastContainer } from "react-toastify";
import SkeletonCardView from "@/components/SkeletonCardView";
import SkeletonRowView from "@/components/SkeletonRowView";
import ClassCard from "@/components/ClassCard";
import { useRouter } from "next/navigation";
import DashboardTeacher from "@/components/DashboardTeacher";
import StudentTopScore from "@/components/StudentTopScore";
import ClassRow from "@/components/ClassRow";

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
  total_student?: number | null;
  starting_date?: string;
  isdeleted?: string; 
}

type FormData = ClassFormData | null;
export default function TeacherPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const user = useAppSelector((state: RootState) => state.auth.user);

  const courses = useAppSelector((state: RootState) => state.courses.courses);

  const branches = useAppSelector((state: RootState) => state.branches.branches);
  const rooms = useAppSelector((state: RootState)=> state.rooms.rooms);

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "row">("card");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddStuOpen, setIsModalAddStuOpen] = useState(false);
  const [isTransferModal, setIsTransferModal] = useState(false);
  const [isopenPreEndModal, setIsopenPreEndModal] = useState(false);
  const [isopenEndModal, setIsopenEndModal] = useState(false);

  const [mode, setMode] = useState<"add" | "update">("add");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const classloading = useAppSelector((state)=>state.class.classloading);
  const classes = useAppSelector((state)=>state.class.classes);

  // const [showPreEnded, setShowPreEnded] = useState(false);
  // const [preEndedClasses, setPreEndedClasses] = useState<Class[]>([]);

  useEffect(() => {
    if (user === undefined) return; // or if loading user, wait
  
    if (!user) {
      // No user means not logged in
      router.push("/login");
      return;
    }
  
    const redirectByRole = {
      director: "/dashboard/director",
      instructor: "/dashboard/teacher",
    };
  
    const destination = redirectByRole[user.role as keyof typeof redirectByRole] || "/login";
  
    router.push(destination);
  }, [user, router]);
  

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
    const matchedCourse = courses.find(c => c.name === cls.courses?.name);
    const course_id = matchedCourse ? matchedCourse.id : null;
  
    const branchName = cls.branches?.branch_name ?? "";
    const roomName = cls.rooms?.room_number ?? "";
    
    const matchedBranch = branches.find(b => b.branch_name === branchName);
    const branch_id = matchedBranch ? matchedBranch.id : null;
    
    const matchedRoom = rooms.find(r => r.room_number === roomName && r.branch_id === branch_id);
    const room_id = matchedRoom ? matchedRoom.id : null;
    
    // Prepare form data object
    const formValues: ClassFormData = {
      id: cls.id ?? null,
      teacher_id: cls.teacher_id ?? null,
      course_id,
      branch_id,
      room_id,
      status: cls.status || "",
      class_status: cls.class_status || "",
      term: cls.term || "",
      time: cls.time || "",
      lesson: cls.lesson || "",
      starting_date: ""
    };
  
    setFormData(formValues);
    setIsModalOpen(true);
  };
  
  const openAddStudentModal = () => {
    setIsModalAddStuOpen(true);
  };

  const openTransferModal = () => {
    setIsTransferModal(true);
  };

  const openPreEndModal = (cls: Class) => {
    setSelectedClass(cls); // store the selected class
    setIsopenPreEndModal(true);
  };
  
  const openEndModal = (cls: Class) => {
    setSelectedClass(cls);
    setIsopenEndModal(true);
  };

  // function playClickSound() {
  //   const audio = new Audio("/sound/ILOVEU.mp3"); // path to your audio file
  //   audio.play();
  // }

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

  // Type guard to check if error has a message
  function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    );
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!formData) return;
  
    const submissionData: Omit<Class, "id" | "isdeleted"> = {
      teacher_id: Number(user?.id) ?? 0,
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
  
    try {
      if (mode === "add") {
        await dispatch(addClass(submissionData)).unwrap();
        await dispatch(fetchClassesByUserId(user?.id || 0));
        toast.success("Class added successfully!", {
          position: "bottom-right",
          theme: "colored"
        });
      } else if (formData.id) {
        await dispatch(
          updateClass({
            id: formData.id,
            data: submissionData,
          })
        ).unwrap();
        await dispatch(fetchClassesByUserId(user?.id || 0));
        toast.success("Class updated successfully!", {
          position: "bottom-right",
          theme: "colored"
        });
      }
  
      setIsModalOpen(false);
    } catch (error: unknown) {
      let message = "Something went wrong!";
      if (isErrorWithMessage(error)) {
        message = error.message;
      }
  
      toast.error(message, {
        position: "bottom-right",
      });
    }
  };


  const endClass = async () => {
    
    if (!selectedClass?.id){console.log("No ID"); return};
  
    try {
      await dispatch(softDeleteClass(selectedClass.id)).unwrap();
      await dispatch(fetchClassesByUserId(user?.id || 0));
      toast.success("Class ended successfully!", {
        position: "bottom-right",
        theme: "colored",
      });
      setIsopenEndModal(false);
    } catch (error: unknown) {
      let message = "Failed to end class.";
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
  
  const preEnded = async () => {
    if (!selectedClass?.id) return;
    console.log(selectedClass?.id);
    try {
      await dispatch(preEndClass(selectedClass.id)).unwrap(); // You can also create `fetchPreEndedClasses` thunk
      await dispatch(fetchClassesByUserId(user?.id || 0));
      // const filtered = res.filter((cls: Class) => cls.isdeleted === 'enable' && cls.status === 'pre-end');
      // setPreEndedClasses(filtered);
      // setShowPreEnded(true);
      toast.success("Class pre-end successfully!", {
        position: "bottom-right",
        theme: "colored"
      });
    } catch (err:unknown) {
      let message = "Failed to fetch pre-ended classes";

      if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message?: unknown }).message === "string"
      ) {
        message = (err as { message: string }).message;
      }
    
      toast.error(message);
    }
    setIsopenPreEndModal(false)
  };
  

  const visibleClasses:Class[] = classes.filter(cls => cls.isdeleted !== 'enable');
  
  
  return (
    <>
      <ToastContainer/>
      <div className="pb-15 sm:px-4 sm:pb-0">
        <p className="text-gray-600">Welcome back, {user?.name}.</p>
        <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>

        {/* Summary Cards */}
        <DashboardTeacher/>

        {/* Classes and Top Score */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          
          {/* Left Side: Top Score */}
          <StudentTopScore/>
        

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
            {
              classloading ? (
                viewMode === 'card' ? (
                  <SkeletonCardView />
                ) : (
                  <SkeletonRowView />
                )
              ) : visibleClasses.length === 0 ? (
                <div className="text-center text-gray-500 text-lg py-10">No classes found.</div>
              ) : viewMode === 'card' ? (
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-between">
                  {classes.map((cls, index) => (
                    <ClassCard
                      key={cls.id}
                      cls={cls}
                      index={index}
                      dropdownOpenIndex={dropdownOpenIndex}
                      toggleDropdown={toggleDropdown}
                      openAddStudentModal={openAddStudentModal}
                      openUpdateModal={openUpdateModal}
                      openTransferModal={openTransferModal}
                      openPreEndModal={()=>openPreEndModal(cls)}
                      openEndModal={()=>openEndModal(cls)}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full overflow-x-auto">
                  <table className="min-w-full border border-gray-300 bg-white rounded-md shadow-sm">
                    <thead>
                      <tr className="bg-blue-950 text-white text-left sticky top-0">
                        <th className="py-2 px-4">Title</th>
                        <th className="py-2 px-4">Lesson</th>
                        <th className="py-2 px-4 text-center">Total Students</th>
                        <th className="py-2 px-4 hidden sm:table-cell">Location</th>
                        <th className="py-2 px-4">Status</th>
                        <th className="py-2 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleClasses.map((cls, index) => (
                        <ClassRow
                          key={cls.id}
                          cls={cls}
                          index={index}
                          dropdownOpenIndex={dropdownOpenIndex}
                          toggleDropdown={toggleDropdown}
                          openAddStudentModal={openAddStudentModal}
                          openUpdateModal={openUpdateModal}
                          openTransferModal={openTransferModal}
                          openPreEndModal={()=>openPreEndModal(cls)}
                          openEndModal={()=>openEndModal(cls)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            }
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
                value={formData?.lesson || ""}
                onChange={(e) =>
                  setFormData((prev) => prev && { ...prev, lesson: e.target.value })
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
                // playClickSound();
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
                // playClickSound();
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
              onClick={preEnded}
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
        <form className="space-y-4 mt-2" onSubmit={(e) => e.preventDefault()}>
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
              type="button"
              className="btn btn-md btn-error text-white px-5"
              onClick={endClass}
              disabled={classloading} // disable while loading (optional)
            >
              Yes
            </button>
          </div>
        </form>
      </Modal>

    </>
  );
}
