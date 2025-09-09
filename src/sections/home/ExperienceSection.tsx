import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Experience } from "@/api/services/experience";

const ExperienceSection = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <section className="py-20" id="experience">
      <div className="container mx-auto max-lg:px-4">
        <div className="mb-12 text-center">
          <h2 className="section-title">Work Experience</h2>
          <p className="text-foreground/70 mx-auto max-w-3xl text-lg">
            My professional journey in the web development industry. I&apos;ve
            had the opportunity to work with various technologies and teams.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="bg-primary/30 absolute top-0 bottom-0 left-4 hidden w-0.5 md:block"></div>

            {/* Experience cards */}
            <div className="space-y-12">
              {experiences.length === 0 ? (
                <div className="text-foreground/70 py-20 text-center">
                  <p className="mb-2 text-xl font-medium">
                    No work experiences added yet.
                  </p>
                  <p className="text-lg">
                    I&apos;m currently building my professional journey, but
                    feel free to check back soon for updates!
                  </p>
                </div>
              ) : (
                experiences.map((exp, index) => (
                  <div key={index} className="relative">
                    <div className="bg-primary absolute top-6 left-0 z-10 hidden h-8 w-8 rounded-full md:block"></div>
                    <div className="md:ml-16">
                      <Card className="card-hover">
                        <CardHeader>
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <CardTitle className="mb-1 text-xl">
                                {exp.title}
                              </CardTitle>
                              <CardDescription className="text-primary text-lg font-medium">
                                {exp.company}
                              </CardDescription>
                            </div>
                            <div className="bg-primary/10 text-primary inline-block rounded-full px-4 py-1 text-sm font-medium">
                              {exp.period}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">{exp.description}</p>
                          <div>
                            <h4 className="mb-2 font-medium">
                              Key Responsibilities:
                            </h4>
                            <ul className="text-foreground/80 list-disc space-y-1 pl-5">
                              {/* {exp.responsibilities.map((resp, i) => (
                              <li key={i}>{resp}</li>
                            ))} */}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
