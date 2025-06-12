"use client";

import React from "react";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./action";

export default function LoginPage() {


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
