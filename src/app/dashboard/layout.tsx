// File: src/app/dashboard/layout.tsx

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import BottomBar from '@/components/BottomBar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6">{children}</main>
        <BottomBar/>
      </div>
    </div>
  );
}
