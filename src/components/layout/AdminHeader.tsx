import React from "react";
import { ModeToggle } from "../ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function AdminHeader() {
  //   const { user, signOut } = useAuth();

  // Get user initials for avatar fallback
  //   const getUserInitials = () => {
  //     if (!user?.email) return "U";
  //     return user.email.substring(0, 1).toUpperCase();
  //   };

  //   const handleSignOut = () => {
  //     signOut();
  //   };
  return (
    <header className="sticky top-0 z-30 border-b bg-background h-14 flex items-center px-4 md:px-6">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between py-2 px-4">
              <p className="text-sm font-medium">Notifications</p>
              <Button variant="ghost" size="sm" className="text-xs h-auto">
                Mark all as read
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="py-6 text-center text-sm text-muted-foreground">
              No new notifications.
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="User" />
                {/* <AvatarFallback>{getUserInitials()}</AvatarFallback> */}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              disabled
              className="flex flex-col items-start pt-2"
            >
              {/* <p className="font-medium text-sm">{user?.email}</p> */}
              <p className="text-xs text-muted-foreground">Administrator</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
