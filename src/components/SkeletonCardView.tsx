// components/SkeletonCardView.tsx
import React from "react";

const SkeletonCardView = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-between">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-full sm:w-[49%] border-2 border-blue-300 rounded-lg p-4 relative bg-white shadow-sm animate-pulse"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <div className="h-5 w-32 bg-gray-300 rounded" />
            </div>
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>

          <table className="w-full text-left border-collapse text-xl">
            <tbody>
              {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-2 pr-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </td>
                  <td className="py-2">
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3 h-10 bg-gray-300 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonCardView;
