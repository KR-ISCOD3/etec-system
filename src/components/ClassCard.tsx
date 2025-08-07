"use client";
import { IoHome, IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { Class } from "@/store/feature/classSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ClassCardProps {
  cls: Class;
  index: number;
  dropdownOpenIndex: number | null;
  toggleDropdown: (index: number) => void;
  openAddStudentModal: () => void;
  openUpdateModal: (cls: Class) => void;
  openTransferModal: () => void;
  openPreEndModal: () => void;
  openEndModal: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  cls,
  index,
  dropdownOpenIndex,
  toggleDropdown,
  openAddStudentModal,
  openUpdateModal,
  openTransferModal,
  openPreEndModal,
  openEndModal,
}) => {
  return (
    <div
        className={`w-full sm:w-[49%] border-2 rounded-lg p-4 relative shadow-sm  ${
          cls.status === 'pre-end' ? 'bg-gray-100 border-gray-400' : 'border-blue-500'
        }`}
      >

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <IoHome className="text-3xl text-blue-950" />
          <p className="font-bold text-lg">{cls.courses?.name}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => toggleDropdown(index)}
            className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
          >
            {dropdownOpenIndex === index ? <IoClose /> : <BsThreeDots />}
          </button>
          {dropdownOpenIndex === index && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="text-lg text-gray-700">
                <li onClick={openAddStudentModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add Student</li>
                <li onClick={() => openUpdateModal(cls)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Class</li>
                <li onClick={openTransferModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Transfer</li>
                <li onClick={openPreEndModal} className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 cursor-pointer">Pre-End</li>
                <li onClick={openEndModal} className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 cursor-pointer">End Class</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <table className="w-full text-left border-collapse text-xl">
        <tbody>

          <tr className="border-b border-gray-300">
            <td className="text-lg font-semibold py-2 text-gray-700">
                Term:
            </td>
            <td className="py-2">
                <span className="text-green-500 font-bold">{cls.term}</span>
            </td>
          </tr> 

          <tr className="border-b border-gray-300">
            <td className="text-lg font-semibold py-2 text-gray-700">
                Time:
            </td>
            <td className="py-2">
                <span>{cls.time}</span>
            </td>
          </tr>   

          <tr className="border-b border-gray-300">
            <td className="text-lg font-semibold w-[40%] py-2 text-gray-700">Lesson:</td>
            <td className="text-gray-800 py-2">
              <div className="line-clamp-1 max-w-xs break-words  font-bold ">{cls.lesson}</div>
            </td>
          </tr>
          
          <tr className="border-b border-gray-300">
            <td className="text-lg font-semibold py-2 text-gray-700">Status:</td>
            <td className="py-2">{cls.class_status}</td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="text-lg font-semibold py-2 text-gray-700">Location:</td>
            <td className="text-gray-800 py-2">
              {cls.branches?.branch_name ?? 'N/A'} &emsp;
              <span className="text-amber-600 font-bold">R-({cls.rooms?.room_number ?? 'N/A'})</span>
            </td>
          </tr>
          
          <tr className="border-b border-gray-300">
            <td className="text-lg font-semibold py-2 text-gray-700">Total Students:</td>
            <td className="text-blue-900 py-2 font-bold">{cls.total_student}</td>
          </tr>
              
        </tbody>
      </table>

      <Link href="/dashboard/teacher/viewclass">
        <button className="w-full mt-3 p-2 bg-blue-950 text-white rounded-md text-lg hover:bg-blue-900 cursor-pointer">
          View Class
        </button>
      </Link>
    </div>
  );
};

export default ClassCard;
