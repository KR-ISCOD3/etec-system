// StudentTopScoreCard.tsx
import React from "react";
import { students } from "@/app/data/student"; // adjust the path as needed

const StudentTopScore: React.FC = () => {
  return (
    <div className="lg:w-[35%] bg-white p-4 rounded-lg shadow-sm max-h-auto overflow-y-auto">
    <h2 className="text-xl font-bold mb-3">Top Score Student</h2>
    <div className="max-h-[470px] overflow-y-auto">
      <table className="w-full">
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="px-3 py-3">
                <p className="text-xl font-bold">{student.name}</p>
                <p>
                  Gender:{" "}
                  <span className="text-green-600">{student.gender}</span>
                </p>
              </td>
              <td className="px-3 py-2 hidden md:table-cell">
                <p>
                  Class:{" "}
                  <span className="font-bold">N/A</span>
                </p>
                <p>
                  Time :{" "}
                  <span className="text-red-500">2:00 - 3:15</span>
                </p>
              </td>
              <td>
                Score:{" "}
                <span className="px-3 py-2 font-semibold text-blue-900">
                  {student.finalScore}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default StudentTopScore;
