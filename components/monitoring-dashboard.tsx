"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  MapPin,
  Car,
  AlertTriangle,
  Activity,
  Fuel,
  TrendingUp,
  Navigation,
  Zap,
  Shield,
  RefreshCw,
} from "lucide-react"

// Mock real-time data
const vehicleLocations = [
  { id: "VH-001", name: "Ford Transit", lat: 40.7128, lng: -74.006, status: "active", speed: 45, fuel: 85 },
  { id: "VH-002", name: "Mercedes Sprinter", lat: 40.7589, lng: -73.9851, status: "active", speed: 32, fuel: 67 },
  { id: "VH-003", name: "Iveco Daily", lat: 40.7505, lng: -73.9934, status: "maintenance", speed: 0, fuel: 45 },
  { id: "VH-004", name: "VW Crafter", lat: 40.7282, lng: -73.7949, status: "active", speed: 28, fuel: 92 },
  { id: "VH-005", name: "Renault Master", lat: 40.6892, lng: -74.0445, status: "active", speed: 55, fuel: 78 },
]

const performanceData = [
  { time: "00:00", activeVehicles: 45, fuelConsumption: 120, distance: 2400 },
  { time: "04:00", activeVehicles: 38, fuelConsumption: 95, distance: 1950 },
  { time: "08:00", activeVehicles: 52, fuelConsumption: 145, distance: 2800 },
  { time: "12:00", activeVehicles: 48, fuelConsumption: 135, distance: 2650 },
  { time: "16:00", activeVehicles: 55, fuelConsumption: 155, distance: 3100 },
  { time: "20:00", activeVehicles: 42, fuelConsumption: 118, distance: 2300 },
]

const fuelData = [
  { vehicle: "Ford Transit", consumption: 8.5, efficiency: 92 },
  { vehicle: "Mercedes Sprinter", consumption: 9.2, efficiency: 88 },
  { vehicle: "Iveco Daily", consumption: 7.8, efficiency: 95 },
  { vehicle: "VW Crafter", consumption: 8.9, efficiency: 90 },
  { vehicle: "Renault Master", consumption: 8.1, efficiency: 93 },
]

const statusDistribution = [
  { name: "Active", value: 234, color: "#22c55e" },
  { name: "Maintenance", value: 12, color: "#f59e0b" },
  { name: "Inactive", value: 8, color: "#6b7280" },
]

const alerts = [
  {
    id: 1,
    type: "maintenance",
    message: "VH-003 requires scheduled maintenance",
    time: "5 min ago",
    severity: "medium",
  },
  { id: 2, type: "fuel", message: "VH-007 fuel level below 20%", time: "12 min ago", severity: "high" },
  { id: 3, type: "speed", message: "VH-012 exceeding speed limit", time: "18 min ago", severity: "high" },
  { id: 4, type: "location", message: "VH-025 entered restricted zone", time: "25 min ago", severity: "medium" },
]

export function MonitoringDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Real-Time Monitoring</h1>
          <p className="text-muted-foreground">Live fleet tracking and analytics dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">Last updated: {currentTime.toLocaleTimeString()}</div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vehicles Online</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">234</div>
            <div className="flex items-center gap-1 text-xs">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-600">94.4% uptime</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{alerts.length}</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-red-600">{alerts.filter((a) => a.severity === "high").length} high priority</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Speed</CardTitle>
            <Navigation className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">42 km/h</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+5% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fuel Efficiency</CardTitle>
            <Fuel className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8.4L</div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-green-600">per 100km average</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live Map */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Live Vehicle Tracking
            </CardTitle>
            <CardDescription>Real-time vehicle locations and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-96 bg-muted/20 rounded-lg overflow-hidden">
              {/* Simulated Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>

              {/* Vehicle Markers */}
              {vehicleLocations.map((vehicle, index) => (
                <div
                  key={vehicle.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${20 + (index * 15) + Math.sin(index) * 10}%`,
                    top: `${30 + (index * 12) + Math.cos(index) * 8}%`,
                  }}
                >
                  <div
                    className={`relative p-2 rounded-full shadow-lg transition-all group-hover:scale-110 ${
                      vehicle.status === "active"
                        ? "bg-green-500"
                        : vehicle.status === "maintenance"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  >
                    <Car className="h-3 w-3 text-white" />
                    {vehicle.status === "active" && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-ping" />
                    )}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <div className="font-medium">{vehicle.name}</div>
                    <div>Speed: {vehicle.speed} km/h</div>
                    <div>Fuel: {vehicle.fuel}%</div>
                  </div>
                </div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Zap className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Shield className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Map Legend */}
            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Active ({vehicleLocations.filter((v) => v.status === "active").length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span>Maintenance ({vehicleLocations.filter((v) => v.status === "maintenance").length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-500" />
                <span>Inactive ({vehicleLocations.filter((v) => v.status === "inactive").length})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Panel */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Active Alerts
            </CardTitle>
            <CardDescription>Recent system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${
                      alert.severity === "high"
                        ? "bg-red-500"
                        : alert.severity === "medium"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                      <Badge variant={alert.severity === "high" ? "destructive" : "secondary"} className="text-xs">
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Fleet Performance</CardTitle>
            <CardDescription>24-hour activity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                activeVehicles: {
                  label: "Active Vehicles",
                  color: "hsl(var(--chart-1))",
                },
                distance: {
                  label: "Distance (km)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="activeVehicles"
                    stroke="var(--color-chart-1)"
                    fill="var(--color-chart-1)"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="distance"
                    stroke="var(--color-chart-2)"
                    fill="var(--color-chart-2)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Fuel Efficiency Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Fuel Efficiency</CardTitle>
            <CardDescription>Vehicle consumption comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                consumption: {
                  label: "Consumption (L/100km)",
                  color: "hsl(var(--chart-3))",
                },
                efficiency: {
                  label: "Efficiency %",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fuelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="vehicle" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="consumption" fill="var(--color-chart-3)" />
                  <Bar dataKey="efficiency" fill="var(--color-chart-4)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status Distribution */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Fleet Status Distribution</CardTitle>
          <CardDescription>Current vehicle status breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ChartContainer
              config={{
                active: { label: "Active", color: "#22c55e" },
                maintenance: { label: "Maintenance", color: "#f59e0b" },
                inactive: { label: "Inactive", color: "#6b7280" },
              }}
              className="h-[300px] w-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
