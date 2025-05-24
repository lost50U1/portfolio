import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ExperienceSection = () => {
  const experiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      period: "Jan 2021 - Present",
      description:
        "Lead developer for high-traffic e-commerce platform. Improved website performance by 40% and implemented new features that increased user engagement by 25%.",
      responsibilities: [
        "Architected and implemented scalable solutions using React, TypeScript, and Node.js",
        "Led a team of 5 developers and mentored junior developers",
        "Collaborated with product managers to define features and technical specifications",
        "Implemented CI/CD pipelines and modern DevOps practices",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Web Solutions Ltd.",
      period: "Mar 2019 - Dec 2020",
      description:
        "Developed and maintained various client projects using React, Node.js, and MongoDB. Created responsive and accessible web applications for clients across different industries.",
      responsibilities: [
        "Built and deployed full-stack applications from concept to production",
        "Developed RESTful APIs and integrated third-party services",
        "Implemented responsive designs with focus on performance and accessibility",
        "Participated in code reviews and improved team coding standards",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Co.",
      period: "Jun 2017 - Feb 2019",
      description:
        "Created interactive user interfaces for client websites. Worked closely with designers to implement pixel-perfect layouts and smooth animations.",
      responsibilities: [
        "Developed responsive websites using HTML, CSS, and JavaScript",
        "Collaborated with designers to implement UI/UX designs",
        "Optimized websites for maximum speed and scalability",
        "Maintained and updated existing client websites",
      ],
    },
  ];

  return (
    <section className="py-20" id="experience">
      <div className="container mx-auto max-lg:px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Work Experience</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            My professional journey in the web development industry. I&apos;ve
            had the opportunity to work with various technologies and teams.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>

            {/* Experience cards */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="hidden md:block absolute left-0 top-6 w-8 h-8 bg-primary rounded-full z-10"></div>
                  <div className="md:ml-16">
                    <Card className="card-hover">
                      <CardHeader>
                        <div className="flex flex-wrap gap-3 justify-between items-start">
                          <div>
                            <CardTitle className="text-xl mb-1">
                              {exp.title}
                            </CardTitle>
                            <CardDescription className="text-lg font-medium text-primary">
                              {exp.company}
                            </CardDescription>
                          </div>
                          <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
                            {exp.period}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{exp.description}</p>
                        <div>
                          <h4 className="font-medium mb-2">
                            Key Responsibilities:
                          </h4>
                          <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
