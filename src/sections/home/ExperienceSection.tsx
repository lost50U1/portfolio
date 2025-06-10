import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockExperiencesData } from "@/data/user/mockExperiencesData";

const ExperienceSection = () => {
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
              {mockExperiencesData.map((exp, index) => (
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
