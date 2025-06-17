"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);

  // Mock about data - will be replaced with Supabase integration later
  const [aboutData, setAboutData] = useState({
    name: "John Doe",
    title: "Full Stack Web Developer",
    bio: "I'm a passionate Full Stack Web Developer with over 5 years of experience in creating modern, responsive, and user-friendly web applications. My journey in web development started with front-end technologies like HTML, CSS, and JavaScript. Over time, I expanded my skills to include React, TypeScript, Node.js, and various database solutions.",
    location: "San Francisco, CA",
    email: "john.doe@example.com",
    education: "B.S. Computer Science, Stanford University",
    availableForWork: true,
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Supabase save functionality
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      toast("Success", {
        description: "About information has been saved successfully.",
      });
    } catch (error) {
      toast.error("Failed to save about information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">About Me</h1>
        <p className="text-muted-foreground">
          Edit your personal information and profile details
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-secondary h-32 w-32 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Upload Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={aboutData.name}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Professional Title
                </label>
                <Input
                  id="title"
                  value={aboutData.title}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  value={aboutData.location}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, location: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={aboutData.email}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="education" className="text-sm font-medium">
                  Education
                </label>
                <Input
                  id="education"
                  value={aboutData.education}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, education: e.target.value })
                  }
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Bio</CardTitle>
            <Button size="sm" onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[200px]"
              value={aboutData.bio}
              onChange={(e) =>
                setAboutData({ ...aboutData, bio: e.target.value })
              }
              placeholder="Write something about yourself..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
