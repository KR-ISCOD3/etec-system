const DashboardCardSkeleton: React.FC = () => {
    return (
      <div className="flex items-center p-5 bg-white rounded-2xl shadow-md animate-pulse">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
        <div className="flex flex-col space-y-2">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-16 h-6 bg-gray-300 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default DashboardCardSkeleton;
  