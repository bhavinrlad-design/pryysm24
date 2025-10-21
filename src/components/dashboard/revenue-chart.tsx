
"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import {
  Chart,
  ChartPie,
  ChartPieChart,
  ChartTooltip,
  ChartLegend
} from "@/components/ui/chart"
import { useWorkspace } from "@/hooks/workspace"
// Define PrinterTechnology type inline since import is failing
type PrinterTechnology = 'FDM' | 'SLA' | 'SLS' | 'DLP' | 'MJF' | 'EBM' | 'DMLS';

const techColors = {
  FDM: "hsl(var(--chart-1))",
  SLA: "hsl(var(--chart-2))",
  SLS: "hsl(var(--chart-3))",
  MJF: "hsl(var(--chart-4))",
  DLP: "hsl(var(--chart-5))",
  EBM: "hsl(var(--chart-1))",
  DMLS: "hsl(var(--chart-2))",
  Other: "hsl(var(--chart-5))",
};


export function RevenueChart() {
  const { schedule, printers } = useWorkspace() as any;

  const chartData = useMemo(() => {
    if (!schedule || !printers || schedule.length === 0 || printers.length === 0) {
      return [];
    }
  
    const revenueByTech: { [key in PrinterTechnology]?: number } = {};
  
    schedule.forEach((s: any) => {
      const printer = printers.find((p: any) => p.id === s.printerId);
      if (printer && s.jobs) {
        const tech = printer.technology as PrinterTechnology;
        const jobsValue = s.jobs.reduce((sum: number, job: any) => {
          // Placeholder revenue calculation: 50 currency units per hour of job duration
          const jobRevenue = (job.duration || 0) * 50;
          return sum + jobRevenue;
        }, 0);

        if (tech) {
          revenueByTech[tech] = (revenueByTech[tech] || 0) + jobsValue;
        }
      }
    });
  
    return Object.entries(revenueByTech).map(([name, revenue]) => ({
      name,
      revenue,
      fill: techColors[name as keyof typeof techColors] || "hsl(var(--chart-5))",
    }));
  
  }, [schedule, printers]);

  return (
    <Card className="transition-shadow duration-300 hover:shadow-lg flex flex-col">
      <CardHeader>
        <CardTitle>Revenue by Technology</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square h-full">
          <Chart>
            <ChartPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <ChartTooltip />
              <ChartPie
                data={chartData}
                dataKey="revenue"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
              />
              <ChartLegend />
            </ChartPieChart>
          </Chart>
        </div>
      </CardContent>
    </Card>
  )
}


