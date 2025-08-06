// components/ClassRow.tsx
import React from "react";
import { IoHome, IoClose } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface ClassRowProps {
  cls: any;
  index: number;
  dropdownOpenIndex: number | null;
  toggleDropdown: (index: number) => void;
  openAddStudentModal: () => void;
  openUpdateModal: (cls: any) => void;
  openTransferModal: () => void;
  openPreEndModal: () => void;
  openEndModal: () => void;
}

const ClassRow: React.FC<ClassRowProps> = ({
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

  const router = useRouter();

  return (
    
      <tr
        onClick={() => router.push("/dashboard/teacher/viewclass")}
        className="border-b border-gray-300 hover:bg-gray-100">
        <td className="py-3 px-4 flex items-center gap-2 font-bold text-blue-950">
          <IoHome className="text-2xl" />
          {cls.courses?.name}
        </td>
        <td className="py-3 px-4">{cls.lesson}</td>
        <td className="py-3 px-4 font-bold text-blue-900 text-center">{cls.total_student}</td>
        <td className="py-3 px-4 hidden sm:table-cell">
          {cls.branches?.branch_name ?? "N/A"} &emsp;
          <span className="text-amber-600 font-bold">{cls.rooms?.room_number ?? "N/A"}</span>
        </td>
        <td className="py-3 px-4">{cls.class_status}</td>
        <td className="py-3 px-4 relative">
          <button
            onClick={() => toggleDropdown(index)}
            className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
          >
            {dropdownOpenIndex === index ? <IoClose /> : <BsThreeDots />}
          </button>
          {dropdownOpenIndex === index && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <ul className="text-lg text-gray-700">
                <li onClick={openAddStudentModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Add Student
                </li>
                <li onClick={() => openUpdateModal(cls)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Edit Class
                </li>
                <li onClick={openTransferModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Transfer
                </li>
                <li onClick={openPreEndModal} className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 cursor-pointer">
                  Pre-End
                </li>
                <li onClick={openEndModal} className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 cursor-pointer">
                  End Class
                </li>
              </ul>
            </div>
          )}
        </td>
      </tr>
  
  );
};

export default ClassRow;
