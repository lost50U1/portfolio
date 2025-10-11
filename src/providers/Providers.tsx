"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactQueryClientProvider>
        {children}
        <Toaster richColors position="top-right" />
      </ReactQueryClientProvider>
    </ThemeProvider>
  );
};

export { Providers };
