"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  Award,
  BookOpen,
  User,
  Mail,
  Settings,
  Home,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/app/(public)/admin/action";
import { toast } from "sonner";

export const menuItems = [
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    const response = await logout();

    if (!response.success) {
      toast.error(response.error || "An error occurred during sign out.");
      return;
    }

    // Reset the user query to its initial state
    queryClient.setQueryData(["user"], { user: null, error: undefined });

    router.push("/admin");
    toast.success("Signed out successfully!");
  }
  return (
    <Sidebar variant="inset" {...props} className="border-border border-r">
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="font-heading text-foreground p-2 text-xl font-bold"
        >
          Biruk&apos;s<span className="text-primary">Portfolio</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
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
          </SidebarGroupContent>
        </SidebarGroup>
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
              onClick={handleSignOut}
            >
              <button className="w-full text-left">
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
