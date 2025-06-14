"use client";

import React, { useTransition } from "react";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { loginSchema } from "@/schemas/auth/login.schema";
import { z } from "zod";
import { login } from "@/app/(public)/admin/action";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" })
    .min(11),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/\d/, { message: "Password must include at least one number" }),
});

export const LoginSection = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async () => {
      const response = await login(values);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push(redirectTo);
      toast.success("Welcome Back!");
    });
  }

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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="admin@example.com"
                      type="email"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-1">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="border-border text-foreground/70 mt-8 border-t pt-6 text-center text-sm">
        <Link href="/" className="text-primary hover:underline">
          Return to homepage
        </Link>
      </div>
    </div>
  );
};
