"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { ModeToggle } from "../ModeToggle";
import { usePathname } from "next/navigation";

const navItems = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Contact",
];

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-sm:px-4 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-heading font-bold text-foreground"
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
                    className="text-foreground hover:text-primary font-medium transition-colors"
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
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
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
                className="w-6 h-6"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-y border-border shadow-lg py-4 animate-fadeIn px-4">
          <ul className="flex flex-col space-y-3 container">
            {navItems.map((item) => {
              const hash = `#${item.toLowerCase()}`;
              const href = pathname === "/" ? hash : `/${hash}`;

              return (
                <li key={item}>
                  <Link
                    href={href}
                    className="text-foreground hover:text-primary font-medium transition-colors block py-2"
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
