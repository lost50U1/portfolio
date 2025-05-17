import { Button } from "@/components/ui/button";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="bg-accent py-20" id="about">
      <div className="container mx-auto max-lg:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="w-full h-[400px] md:h-[500px] bg-white p-3 rounded-xl shadow-lg relative z-10">
              {/* <Image
                src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Developer Working"
                className="w-full h-full object-cover rounded-lg"
                width={500}
                height={500}
              /> */}
            </div>
            <div className="absolute bottom-4 right-4 w-36 h-36 bg-primary rounded-lg -z-10"></div>
            <div className="absolute top-4 left-4 w-36 h-36 bg-foreground/10 rounded-lg -z-10"></div>
          </div>
          <div className="animate-slideUp">
            <h2 className="section-title">About Me</h2>
            <p className="mb-6 text-lg">
              I&apos;m a passionate Full Stack Web Developer with over 5 years
              of experience in creating modern, responsive, and user-friendly
              web applications.
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
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-bold text-primary">Education</h3>
                <p>
                  B.S. Computer Science
                  <br />
                  Stanford University
                </p>
              </div>
              <div>
                <h3 className="font-bold text-primary">Location</h3>
                <p>
                  San Francisco, CA
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
