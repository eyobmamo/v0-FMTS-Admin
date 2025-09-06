"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, TrendingUp, Calendar, Car, Fuel, Clock, DollarSign } from "lucide-react"

const monthlyData = [
  { month: "Jan", revenue: 45000, expenses: 32000, vehicles: 240, distance: 125000 },
  { month: "Feb", revenue: 52000, expenses: 35000, vehicles: 245, distance: 135000 },
  { month: "Mar", revenue: 48000, expenses: 33000, vehicles: 248, distance: 128000 },
  { month: "Apr", revenue: 61000, expenses: 38000, vehicles: 252, distance: 145000 },
  { month: "May", revenue: 55000, expenses: 36000, vehicles: 248, distance: 138000 },
  { month: "Jun", revenue: 67000, expenses: 41000, vehicles: 255, distance: 152000 },
]

const fuelTrends = [
  { month: "Jan", consumption: 8.5, cost: 12500 },
  { month: "Feb", consumption: 8.2, cost: 13200 },
  { month: "Mar", consumption: 8.7, cost: 12800 },
  { month: "Apr", consumption: 8.1, cost: 14100 },
  { month: "May", consumption: 8.4, cost: 13600 },
  { month: "Jun", consumption: 7.9, cost: 15200 },
]

const reportTypes = [
  {
    title: "Fleet Performance Report",
    description: "Comprehensive analysis of fleet efficiency and utilization",
    lastGenerated: "2024-01-20",
    status: "ready",
  },
  {
    title: "Fuel Consumption Analysis",
    description: "Detailed breakdown of fuel usage and costs across vehicles",
    lastGenerated: "2024-01-19",
    status: "ready",
  },
  {
    title: "Maintenance Schedule Report",
    description: "Upcoming and overdue maintenance activities",
    lastGenerated: "2024-01-18",
    status: "ready",
  },
  {
    title: "Customer Activity Summary",
    description: "Customer usage patterns and billing information",
    lastGenerated: "2024-01-17",
    status: "generating",
  },
]

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and view comprehensive fleet reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$328K</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+12% vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Distance</CardTitle>
            <Car className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">823K km</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-blue-600">Across all vehicles</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fuel Costs</CardTitle>
            <Fuel className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$81.4K</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-orange-600">8.2L/100km average</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">96.2%</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-green-600">Fleet availability</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue & Expenses */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
            <CardDescription>Monthly financial performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
                expenses: {
                  label: "Expenses",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-chart-1)" />
                  <Bar dataKey="expenses" fill="var(--color-chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Fuel Trends */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Fuel Consumption Trends</CardTitle>
            <CardDescription>Monthly fuel usage and costs</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                consumption: {
                  label: "Consumption (L/100km)",
                  color: "hsl(var(--chart-3))",
                },
                cost: {
                  label: "Cost ($)",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fuelTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="consumption" stroke="var(--color-chart-3)" strokeWidth={2} />
                  <Line type="monotone" dataKey="cost" stroke="var(--color-chart-4)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Generate and download detailed fleet reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Last generated: {report.lastGenerated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={report.status === "ready" ? "default" : "secondary"} className="text-xs">
                    {report.status}
                  </Badge>
                  <Button size="sm" variant="outline" disabled={report.status === "generating"}>
                    <Download className="h-3 w-3 mr-1" />
                    {report.status === "generating" ? "Generating..." : "Download"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
