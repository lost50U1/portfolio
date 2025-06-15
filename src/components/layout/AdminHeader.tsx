"use client";

import React from "react";
import { ModeToggle } from "../ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Bell, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { useRouter } from "next/navigation";
import { logout, getUser } from "@/app/(public)/admin/action";
import { toast } from "sonner";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { UserResponse } from "@/types";

export default function AdminHeader() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: getUser,
    initialData: { user: null, error: undefined },
  });

  const getUserInitials = () => {
    if (!data?.user?.email) return "U";
    return data.user.email.substring(0, 1).toUpperCase();
  };

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
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end" forceMount>
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">New message received</p>
                <p className="text-muted-foreground text-xs">2 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Project updated</p>
                <p className="text-muted-foreground text-xs">1 hour ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">New skill added</p>
                <p className="text-muted-foreground text-xs">3 hours ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center">
              <span className="text-muted-foreground text-sm">
                View all notifications
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback>{getUserInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              disabled
              className="flex flex-col items-start pt-2"
            >
              <p className="text-sm font-medium">
                {data?.user?.email || "Guest"}
              </p>
              <p className="text-muted-foreground text-xs">Administrator</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
