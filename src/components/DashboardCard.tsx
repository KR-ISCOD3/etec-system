// components/DashboardCard.tsx
import { ReactNode } from "react";

interface DashboardCardProps {
  icon?: ReactNode;
  title?: string;
  value?: string | number;
  change?: string;
  changeLabel?: string;
  iconColor?: string;
  valueColor?: string;
  changeColor?: string;
}

export default function DashboardCard({
  icon,
  title,
  value,
  change,
  changeLabel,
  iconColor,
  valueColor,
  changeColor,
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center hover:shadow-lg transition-shadow cursor-pointer">
      <div>
        <p className={`text-4xl font-extrabold ${valueColor}`}>{value}</p>
        <h2 className="font-semibold capitalize">{title}</h2>
        <p className={`${changeColor}`}>
          {change} <span className="text-gray-500">{changeLabel}</span>
        </p>
      </div>
      <div className={`${iconColor} text-6xl opacity-70`}>
        {icon}
      </div>
    </div>
  );
}
