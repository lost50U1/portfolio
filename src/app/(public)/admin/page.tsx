import React from "react";
import { LoginSection } from "@/sections/auth/LoginSection";

export default function LoginPage() {
  return (
    <div className="py-4">
      <div className="flex min-h-screen items-center justify-center">
        <LoginSection />
      </div>
    </div>
  );
}
