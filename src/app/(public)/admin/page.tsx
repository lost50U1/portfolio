"use client";

import React from "react";

// import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./action";

export default function LoginPage() {
  // const router = useRouter();
  //   const { toast } = useToast();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [isLoading, setIsLoading] = useState(false);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     // In a real app, this would be replaced with a Supabase authentication call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     // For demo purposes, we'll just check if the email is "admin@example.com" and password is "password"
  //     if (
  //       formData.email === "admin@example.com" &&
  //       formData.password === "password"
  //     ) {
  //       // toast({
  //       //   title: "Login successful",
  //       //   description: "Welcome to the admin dashboard!",
  //       // });
  //       router.push("/dashboard");
  //     } else {
  //       // toast({
  //       //   title: "Login failed",
  //       //   description:
  //       //     "Invalid email or password. For demo, use admin@example.com / password",
  //       //   variant: "destructive",
  //       // });
  //     }
  //   } catch (error) {
  //     //   toast({
  //     //     title: "Login failed",
  //     //     description: "An error occurred during login.",
  //     //     variant: "destructive",
  //     //   });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="py-4">
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-background dark:bg-card rounded-xl shadow-lg border border-border">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-2xl font-heading font-bold text-foreground inline-block"
            >
              Dev<span className="text-primary">Portfolio</span>
            </Link>
            <h1 className="text-2xl font-bold mt-6 text-foreground">
              Admin Login
            </h1>
            <p className="text-foreground/70 mt-2">
              Sign in to access your admin dashboard
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
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
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
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

            <Button formAction={login} type="submit" className="w-full">
              Sign in
            </Button>
            {/* 
            <div className="mt-4 text-center text-sm text-foreground/70">
              <p>
                Demo credentials: <br />
                <span className="text-primary font-medium">
                  admin@example.com
                </span>{" "}
                /<span className="text-primary font-medium"> password</span>
              </p>
            </div> */}
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-foreground/70">
            <Link href="/" className="text-primary hover:underline">
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
