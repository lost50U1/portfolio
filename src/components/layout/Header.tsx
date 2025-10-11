"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";
import { usePathname } from "next/navigation";
import { navItems } from "@/data";

// todo: add the line animation on the header links get it from the old site
const Header = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 max-sm:px-4 ${
        isScrolled
          ? "bg-background/95 border-border border-b py-3 shadow-md backdrop-blur-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-heading text-foreground text-2xl font-bold"
        >
          Biruk&apos;s<span className="text-primary">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => {
              const hash = `#${item.toLowerCase()}`;
              const href = pathname === "/" ? hash : `/${hash}`;

              return (
                <li key={item}>
                  <Link
                    href={href}
                    className="text-foreground hover:text-primary after:bg-primary relative font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 after:content-[''] hover:after:w-full"
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <ModeToggle />

          {/* Mobile menu button */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="bg-background border-border animate-fadeIn absolute top-full right-0 left-0 border-y px-4 py-4 shadow-lg md:hidden">
          <ul className="container flex flex-col space-y-3">
            {navItems.map((item) => {
              const hash = `#${item.toLowerCase()}`;
              const href = pathname === "/" ? hash : `/${hash}`;

              return (
                <li key={item}>
                  <Link
                    href={href}
                    className="text-foreground hover:text-primary block py-2 font-medium transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
