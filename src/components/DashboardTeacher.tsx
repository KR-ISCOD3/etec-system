import { FaCheckCircle, FaUsers, FaChalkboardTeacher, FaHourglassHalf } from "react-icons/fa";
import DashboardCard from "./DashboardCard";
import DashboardCardSkeleton from "./DashboardCardSkeleton";

const isLoading = false; // Toggle this to test the skeleton

const DashboardTeacher = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {isLoading ? (
        <>
          <DashboardCardSkeleton />
          <DashboardCardSkeleton />
          <DashboardCardSkeleton />
          <DashboardCardSkeleton />
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default DashboardTeacher;
