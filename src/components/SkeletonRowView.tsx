// components/SkeletonRowView.tsx
import React from "react";

const SkeletonRowView = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white rounded-md shadow-sm animate-pulse">
        <thead>
          <tr className="bg-gray-300 text-transparent">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Lesson</th>
            <th className="py-2 px-4">Total Students</th>
            <th className="py-2 px-4 hidden sm:table-cell">Location</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="border-b border-gray-200">
              {Array.from({ length: 6 }).map((_, j) => (
                <td key={j} className="py-3 px-4">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonRowView;
