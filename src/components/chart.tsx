import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Area,
  AreaChart,
  Label,
  Pie,
  PieChart,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#d82f5c",
  },
  mobile: {
    label: "Mobile",
    color: "#ff9f9f",
  },
} satisfies ChartConfig;

type chartProps = {
  type: "Bar" | "Pie" | "Area" | "-Bar";
};
export function Chart({ type }: chartProps) {
  const totalVisitors = chartData.reduce(
    (sum, data) => sum + data.desktop + data.mobile,
    0
  );

  return (
    <Card className="bg-third">
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          {(() => {
            switch (type) {
              case "Bar":
                return (
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="desktop"
                      fill="var(--color-desktop)"
                      radius={4}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="var(--color-mobile)"
                      radius={4}
                    />
                  </BarChart>
                );
              case "Area":
                return (
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      accessibilityLayer
                      data={chartData}
                      margin={{
                        left: 12,
                        right: 12,
                      }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="dot" />}
                      />
                      <Area
                        dataKey="mobile"
                        type="natural"
                        fill="var(--color-mobile)"
                        fillOpacity={0.4}
                        stroke="var(--color-mobile)"
                        stackId="a"
                      />
                      <Area
                        dataKey="desktop"
                        type="natural"
                        fill="var(--color-desktop)"
                        fillOpacity={0.4}
                        stroke="var(--color-desktop)"
                        stackId="a"
                      />
                    </AreaChart>
                  </ChartContainer>
                );
              case "Pie":
                return (
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="desktop"
                      nameKey="month"
                      innerRadius={60}
                      strokeWidth={5}
                      fill="#ff9f9f"
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="text-3xl font-bold"
                                  fill="#d82f5c"
                                >
                                  {totalVisitors.toLocaleString()}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className="fill-muted-foreground"
                                >
                                  Visitors
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                );
              default:
                return (
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="desktop" fill="#d82f5c" radius={4} />
                    <Bar dataKey="mobile" fill="#ff9f9f" radius={4} />
                  </BarChart>
                );
            }
          })()}
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
