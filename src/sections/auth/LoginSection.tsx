"use client";

import React, { useTransition } from "react";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth/login.schema";
import { z } from "zod";
import { login } from "@/app/(public)/admin/action";
import { toast } from "sonner";

export const LoginSection = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const response = await login(values);

      if (response.error) {
        toast.error("Something went wrong with your creditials!");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard");
      toast.success("Welcome Back!");
    });
  };

  return (
    <div className="bg-background dark:bg-card border-border w-full max-w-md rounded-xl border p-8 shadow-lg">
      <div className="mb-8 text-center">
        <Link
          href="/"
          className="font-heading text-foreground inline-block text-2xl font-bold"
        >
          Biruk's<span className="text-primary">Portfolio</span>
        </Link>
        <h1 className="text-foreground mt-6 text-2xl font-bold">Admin Login</h1>
        <p className="text-foreground/70 mt-2">
          Sign in to access your admin dashboard
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-foreground text-sm font-medium"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="admin@example.com"
            className="text-foreground bg-background border-input"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-foreground text-sm font-medium"
            >
              Password
            </label>
            <a href="#" className="text-primary text-sm hover:underline">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            className="text-foreground bg-background border-input"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>

      <div className="border-border text-foreground/70 mt-8 border-t pt-6 text-center text-sm">
        <Link href="/" className="text-primary hover:underline">
          Return to homepage
        </Link>
      </div>
    </div>
  );
};
