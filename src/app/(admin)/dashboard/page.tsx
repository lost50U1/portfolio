"use client";

import React from "react";
import { Activity, Users, BarChart, Layers, Eye } from "lucide-react";
import { VisitorsChart } from "@/components/dashboard/VisitorsChart";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { fetchSkills } from "@/api/services/skills";
import { getUser } from "@/app/(public)/admin/action";
import { UserResponse } from "@/types";
import { fetchProjects } from "@/api/services/projects";
import { fetchExperiences } from "@/api/services/experience";

export default function Dashboard() {
  const { data } = useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: getUser,
    initialData: { user: null, error: undefined },
  });

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const { data: skills = [] } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });

  const { data: experiences = [] } = useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
  });

  // todo: change this with real data
  const statsData = {
    totalVisitors: "3,721",
    dailyAverage: "148",
    projectViews: "1,254",
    conversionRate: "2.8%",
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back, {data?.user?.email?.split("@")[0] || "Admin"}
        </h1>
        <p className="text-muted-foreground">
          Overview of your portfolio performance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Projects"
          value={projects.length.toString()}
          description="Total portfolio projects"
          icon={<Layers className="h-4 w-4" />}
        />
        <StatsCard
          title="Skills"
          value={skills.length.toString()}
          description="Total skills in your profile"
          icon={<Activity className="h-4 w-4" />}
        />
        <StatsCard
          title="Experience"
          value={experiences.length.toString()}
          description="Work experiences listed"
          icon={<BarChart className="h-4 w-4" />}
        />
        <StatsCard
          title="Featured Projects"
          value={projects.filter((p) => p.featured).length.toString()}
          description="Highlighted on home page"
          icon={<Eye className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Visitors"
          value={statsData.totalVisitors}
          description="All time portfolio visitors"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="12% from last month"
        />
        <StatsCard
          title="Daily Average"
          value={statsData.dailyAverage}
          description="Visitors per day"
          icon={<Activity className="h-4 w-4" />}
        />
        <StatsCard
          title="Project Views"
          value={statsData.projectViews}
          description="Total project page views"
          icon={<BarChart className="h-4 w-4" />}
          trend="up"
          trendValue="8% from last month"
        />
        <StatsCard
          title="Contact Rate"
          value={statsData.conversionRate}
          description="Visitors who contact you"
          trend="neutral"
          trendValue="Same as last month"
        />
      </div>

      <div>
        <VisitorsChart />
      </div>
    </div>
  );
}
