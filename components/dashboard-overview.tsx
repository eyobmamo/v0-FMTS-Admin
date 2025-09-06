"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Users, MapPin, AlertTriangle, TrendingUp, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Vehicles",
    value: "248",
    change: "+12%",
    changeType: "positive" as const,
    icon: Car,
  },
  {
    title: "Active Customers",
    value: "1,429",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Vehicles Online",
    value: "234",
    change: "94.4%",
    changeType: "neutral" as const,
    icon: MapPin,
  },
  {
    title: "Alerts",
    value: "12",
    change: "-23%",
    changeType: "positive" as const,
    icon: AlertTriangle,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "Vehicle Added",
    description: "New vehicle VH-2024-001 added to fleet",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "Maintenance Alert",
    description: "Vehicle VH-2023-045 requires scheduled maintenance",
    time: "15 minutes ago",
    status: "warning",
  },
  {
    id: 3,
    type: "Customer Registered",
    description: "New customer John Smith registered",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    type: "Route Completed",
    description: "Vehicle VH-2023-012 completed delivery route",
    time: "2 hours ago",
    status: "neutral",
  },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your fleet.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                        ? "text-red-600"
                        : "text-muted-foreground"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your fleet management system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-500"
                        : activity.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{activity.type}</p>
                      <Badge
                        variant={
                          activity.status === "success"
                            ? "default"
                            : activity.status === "warning"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="flex items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted/50">
                <Car className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Add New Vehicle</p>
                  <p className="text-xs text-muted-foreground">Register a new vehicle to your fleet</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted/50">
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Add Customer</p>
                  <p className="text-xs text-muted-foreground">Register a new customer account</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted/50">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">View Live Map</p>
                  <p className="text-xs text-muted-foreground">Monitor vehicle locations in real-time</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
