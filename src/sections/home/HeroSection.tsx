import { Button } from "@/components/ui/button";
import { socialLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      id="home"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-primary/10 absolute top-20 right-10 h-72 w-72 rounded-full blur-3xl filter" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl filter" />
      </div>

      <div className="container mx-auto max-lg:px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <span className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1 text-sm font-medium">
              Frontend Web Developer
            </span>

            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Creating cutting-edge{" "}
              <span className="text-primary">web experiences</span>
            </h1>

            <p className="text-foreground/70 mb-8 max-w-lg text-lg">
              I design and develop modern web applications with a focus on
              performance, accessibility, and user experience.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div>
                <a href="#projects">
                  <Button className="px-8 py-6 text-base">View My Works</Button>
                </a>
              </div>

              <div>
                <a href="#contact">
                  <Button variant="outline" className="px-8 py-6 text-base">
                    Contact Me
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <p className="text-sm font-medium">Connect with me:</p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-foreground/5 hover:bg-primary hover:text-brand flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    aria-label={social.name}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="relative">
              <div className="bg-primary/90 absolute top-4 left-4 -z-10 h-64 w-64 rounded-full md:h-80 md:w-80" />
              <div className="dark:bg-foreground/5 h-64 w-64 overflow-hidden rounded-full bg-white p-2 shadow-lg md:h-80 md:w-80">
                <Image
                  src="/images/profile.png"
                  alt="Developer Profile"
                  className="h-full w-full rounded-full object-cover"
                  width={1024}
                  height={1024}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
