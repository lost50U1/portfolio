"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", visitors: 20 },
  { day: "Tue", visitors: 40 },
  { day: "Wed", visitors: 35 },
  { day: "Thu", visitors: 50 },
  { day: "Fri", visitors: 55 },
  { day: "Sat", visitors: 40 },
  { day: "Sun", visitors: 30 },
];

//todo: change this shadcn/ui chart later on

export const VisitorsChart = () => {
  return (
    <div>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Portfolio Visitors (Last 7 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary)/0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
