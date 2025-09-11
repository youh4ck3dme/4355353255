'use client';

import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar';
import { AppHeader } from '@/components/header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <AppHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
