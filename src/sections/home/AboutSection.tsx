import { Button } from "@/components/ui/button";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="py-20" id="about">
      <div className="container mx-auto max-lg:px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <div className="relative z-10 h-[400px] w-full rounded-xl shadow-lg md:h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Developer Working"
                className="h-full w-full rounded-lg object-cover"
                width={500}
                height={500}
              />
            </div>
            <div className="bg-primary absolute right-4 bottom-4 -z-10 h-36 w-36 rounded-lg"></div>
            <div className="bg-foreground/10 absolute top-4 left-4 -z-10 h-36 w-36 rounded-lg"></div>
          </div>
          <div className="animate-slideUp">
            <h2 className="section-title">About Me</h2>
            <p className="mb-6 text-lg">
              Hi, I&apos;m Biruk a passionate Frontend Web Developer with over 2
              years of experience in creating modern, responsive, and
              user-friendly web applications.
            </p>
            <p className="mb-6">
              My journey in web development started with front-end technologies
              like HTML, CSS, and JavaScript. Over time, I expanded my skills to
              include React, TypeScript, Node.js, and various database
              solutions. I&apos;m particularly interested in creating
              applications that not only look good but also deliver exceptional
              user experiences.
            </p>
            <p className="mb-8">
              When I&apos;m not coding, you can find me exploring new
              technologies, contributing to open source projects, or sharing my
              knowledge through technical articles and mentoring.
            </p>
            <div className="mb-8 grid grid-cols-2 gap-4">
              {/* <div>
                <h3 className="font-bold text-primary">Education</h3>
                <p>
                  B.S. Architecture and Urban Planning
                  <br />
                  Unity University
                </p>
              </div> */}
              <div>
                <h3 className="text-primary font-bold">Location</h3>
                <p>
                  Addis Ababa, Ethiopia
                  <br />
                  Available for remote work
                </p>
              </div>
            </div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Button>Download Resume</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
