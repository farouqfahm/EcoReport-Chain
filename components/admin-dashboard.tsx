"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, BarChart3, Users, AlertTriangle, Database, Zap } from "lucide-react"

interface AdminDashboardProps {
  stats: {
    totalReports: number
    verifiedReports: number
    activeValidators: number
    tokensDistributed: number
  }
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
  const [systemHealth] = useState({
    aiService: "operational",
    blockchain: "operational",
    database: "operational",
    ussdGateway: "degraded",
  })

  const [recentActivity] = useState([
    {
      id: "1",
      type: "report",
      message: "New flood report from Victoria Island",
      timestamp: "2 min ago",
      severity: "info",
    },
    {
      id: "2",
      type: "validation",
      message: "Report #1234 validated by 3 validators",
      timestamp: "5 min ago",
      severity: "success",
    },
    {
      id: "3",
      type: "token",
      message: "50 EcoTokens minted for user addr_test1qz...",
      timestamp: "8 min ago",
      severity: "info",
    },
    {
      id: "4",
      type: "alert",
      message: "USSD gateway response time degraded",
      timestamp: "15 min ago",
      severity: "warning",
    },
    {
      id: "5",
      type: "user",
      message: "New validator promoted: Adebayo M.",
      timestamp: "1 hour ago",
      severity: "success",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300"
      case "degraded":
        return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-300"
      case "down":
        return "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-red-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="bg-gradient-to-br from-red-600 via-pink-600 to-orange-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-6 w-6" />
            <span>System Administration</span>
          </CardTitle>
          <CardDescription className="text-red-100">Monitor platform health and user activity</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
                    {stats.totalReports.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Total Reports</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
                    {stats.verifiedReports.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Verified</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
                    {stats.activeValidators}
                  </div>
                  <div className="text-sm text-gray-400">Active Validators</div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                    {stats.tokensDistributed.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Tokens Distributed</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>System Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg">
                  <span className="font-medium">AI Validation Service</span>
                  <Badge className={getStatusColor(systemHealth.aiService)}>{systemHealth.aiService}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg">
                  <span className="font-medium">Blockchain Network</span>
                  <Badge className={getStatusColor(systemHealth.blockchain)}>{systemHealth.blockchain}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg">
                  <span className="font-medium">Database</span>
                  <Badge className={getStatusColor(systemHealth.database)}>{systemHealth.database}</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 border border-gray-600/50 rounded-lg">
                  <span className="font-medium">USSD Gateway</span>
                  <Badge className={getStatusColor(systemHealth.ussdGateway)}>{systemHealth.ussdGateway}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600/50"
                  >
                    <Badge className={getSeverityColor(activity.severity)} variant="secondary">
                      {activity.type}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-sm">{activity.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Report Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">76%</div>
                    <div className="text-sm text-blue-800">Verification Rate</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2.3 hrs</div>
                    <div className="text-sm text-green-800">Avg. Validation Time</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Reports by Type</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Flooding</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pollution</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-600 h-2 rounded-full" style={{ width: "28%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">28%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Wind Damage</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: "18%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">18%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "9%" }}></div>
                        </div>
                        <span className="text-sm text-gray-600">9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-blue-800">Total Users</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">45</div>
                  <div className="text-sm text-purple-800">Validators</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">892</div>
                  <div className="text-sm text-green-800">Active This Week</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Top Contributors</h4>
                <div className="space-y-2">
                  {["Adebayo M. - 2,450 EcoScore", "Fatima A. - 2,100 EcoScore", "Chidi O. - 1,890 EcoScore"].map(
                    (user, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">{user}</span>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  AI Model Settings
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Database className="h-4 w-4 mr-2" />
                  Database Maintenance
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Zap className="h-4 w-4 mr-2" />
                  Blockchain Config
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Alert Settings
                </Button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">System Alerts</span>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• USSD gateway response time is above normal (avg: 3.2s)</li>
                  <li>• Blockchain transaction fees have increased by 15%</li>
                  <li>• AI validation queue has 23 pending reports</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
