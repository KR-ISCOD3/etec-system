// components/DashboardClassCard.tsx
import { ReactNode } from "react";

interface DashboardClassCardProps {
  icon?: ReactNode;
  value?: number | string;
  title?: string;
  valueColor?: string;
  iconColor?: string;
  textsize?: string; // optional background for icon circle
}

export default function DashboardClassCard({
  icon,
  value,
  title,
  valueColor = "text-gray-800",
  iconColor = "text-white",
  textsize = "text-3xl"
}: DashboardClassCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md px-6 py-5 flex justify-between items-center ">
      <div className="flex flex-col">
        <p className={`text-sm uppercase font-medium text-gray-500`}>{title}</p>
        <h2 className={`${textsize} font-bold mt-1 ${valueColor}`}>{value}</h2>
      </div>
      <div className={`${iconColor} text-6xl opacity-70`}>
        {icon}
      </div>
    </div>
  );
}
