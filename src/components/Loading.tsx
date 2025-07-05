"use client";

export default function LoadingPage() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white opacity-90">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinning circle */}
        <div
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="Loading spinner"
        ></div>

        {/* Message */}
        <p className="text-gray-600 text-lg font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
