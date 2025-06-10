"use client";

import React from "react";
import {
  LayoutDashboard,
  Briefcase,
  Award,
  BookOpen,
  User,
  Mail,
  Settings,
  LogOut,
  Home,
} from "lucide-react";

// Import Shadcn UI sidebar components
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  const collapsed = state === "collapsed";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: <Briefcase size={20} />,
      path: "/dashboard/projects",
    },
    {
      name: "Experience",
      icon: <Award size={20} />,
      path: "/dashboard/experience",
    },
    {
      name: "Skills",
      icon: <BookOpen size={20} />,
      path: "/dashboard/skills",
    },
    {
      name: "About",
      icon: <User size={20} />,
      path: "/dashboard/about",
    },
    {
      name: "Messages",
      icon: <Mail size={20} />,
      path: "/dashboard/messages",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/dashboard/settings",
    },
  ];

  return (
    <ShadcnSidebar>
      <SidebarHeader className="flex items-center justify-between border-b">
        {!collapsed && (
          <Link
            href="/dashboard"
            className="text-xl font-heading font-bold truncate px-2"
          >
            Portfolio<span className="text-primary">Admin</span>
          </Link>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                isActive={pathname === item.path}
                asChild
                tooltip={item.name}
              >
                <Link href={item.path}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="View Site">
              <Link href="/">
                <Home size={20} />
                <span>View Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Sign Out"
              onClick={() => {
                // In a real app, this would log out the user
                window.location.href = "/dashboard";
              }}
            >
              <button className="w-full text-left">
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
