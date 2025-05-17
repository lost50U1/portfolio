import Header from "@/components/common/Header";
// import { FloatingNav } from "@/components/layout/FloatingNavbar";
import React from "react";
// import { navItems } from "@/data";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <FloatingNav navItems={navItems} /> */}
      <main className="flex-grow">{children}</main>
      <footer>footer</footer>
    </div>
  );
}
