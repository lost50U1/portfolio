import React from "react";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/Sidebar";
import AdminHeader from "@/components/layout/AdminHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="flex flex-1 flex-col p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
