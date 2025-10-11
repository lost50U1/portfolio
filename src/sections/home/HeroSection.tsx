import * as motion from "motion/react-client";
import Image from "next/image";
// import Link from "next/link";

import { socialLinks } from "@/constants";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      id="home"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
          className="bg-primary/10 absolute top-20 right-10 h-72 w-72 rounded-full blur-3xl filter"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl filter"
        />
      </motion.div>

      <div className="container mx-auto max-lg:px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-2 md:order-1"
          >
            <motion.span
              variants={item}
              className="bg-primary/10 text-primary mb-6 inline-block rounded-full px-4 py-1 text-sm font-medium"
            >
              Frontend Web Developer
            </motion.span>

            <motion.h1
              variants={item}
              className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl"
            >
              Creating cutting-edge{" "}
              <span className="text-primary">web experiences</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-foreground/70 mb-8 max-w-lg text-lg"
            >
              I design and develop modern web applications with a focus on
              performance, accessibility, and user experience.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#projects">
                  <Button className="px-8 py-6 text-base">View My Works</Button>
                </a>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#contact">
                  <Button variant="outline" className="px-8 py-6 text-base">
                    Contact Me
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-12 flex items-center gap-6"
            >
              <p className="text-sm font-medium">Connect with me:</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-foreground/5 hover:bg-primary hover:text-brand flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    aria-label={social.name}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 flex justify-center md:order-2 md:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
                className="bg-primary/90 absolute top-4 left-4 -z-10 h-64 w-64 rounded-full md:h-80 md:w-80"
              />
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="dark:bg-foreground/5 h-64 w-64 overflow-hidden rounded-full bg-white p-2 md:h-80 md:w-80"
              >
                <Image
                  src="/images/profile.png"
                  alt="Developer Profile"
                  className="h-full w-full rounded-full object-cover"
                  width={1024}
                  height={1024}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
