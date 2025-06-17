import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
}: StatsCardProps) => {
  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && (
            <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
              {icon}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {(description || trend) && (
            <div className="text-muted-foreground mt-1 flex items-center text-xs">
              {trend && (
                <span
                  className={`mr-1 ${
                    trend === "up"
                      ? "text-green-500"
                      : trend === "down"
                        ? "text-red-500"
                        : ""
                  }`}
                >
                  {trend === "up" ? "↑" : trend === "down" ? "↓" : "•"}{" "}
                  {trendValue}
                </span>
              )}
              {description && <span>{description}</span>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
