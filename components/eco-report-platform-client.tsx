"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, MapPin, Award, TrendingUp, Shield } from "lucide-react"
import { ReportSubmission } from "@/components/report-submission"
import { LiveMap } from "@/components/live-map"
import { TokenWallet } from "@/components/token-wallet"
import { Leaderboard } from "@/components/leaderboard"
import { ValidationDashboard } from "@/components/validation-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { USSDInterface } from "@/components/ussd-interface"
import { UserRoleSelector } from "@/components/user-role-selector"

export default function EcoReportPlatformClient() {
  const [userRole, setUserRole] = useState<"resident" | "validator" | "admin">("resident")
  const [user, setUser] = useState({
    id: "1",
    name: "John Doe",
    phone: "+234-801-234-5678",
    ecoScore: 1250,
    walletAddress: "addr_test1qz...",
    lga: "Lagos Island",
    reportsSubmitted: 15,
    reportsValidated: 8,
    isValidator: false,
  })

  const [stats, setStats] = useState({
    totalReports: 2847,
    verifiedReports: 2156,
    activeValidators: 45,
    tokensDistributed: 107800,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalReports: prev.totalReports + Math.floor(Math.random() * 3),
        tokensDistributed: prev.tokensDistributed + Math.floor(Math.random() * 50),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const renderContent = () => {
    switch (userRole) {
      case "resident":
        return (
          <Tabs defaultValue="submit" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
              <TabsTrigger
                value="submit"
                className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white"
              >
                <Camera className="h-4 w-4" />
                <span className="hidden sm:inline">Submit</span>
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Map</span>
              </TabsTrigger>
              <TabsTrigger
                value="wallet"
                className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <Award className="h-4 w-4" />
                <span className="hidden sm:inline">Wallet</span>
              </TabsTrigger>
              <TabsTrigger
                value="leaderboard"
                className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Ranks</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="submit" className="mt-6">
              <ReportSubmission user={user} />
            </TabsContent>
            <TabsContent value="map" className="mt-6">
              <LiveMap />
            </TabsContent>
            <TabsContent value="wallet" className="mt-6">
              <TokenWallet user={user} />
            </TabsContent>
            <TabsContent value="leaderboard" className="mt-6">
              <Leaderboard userLga={user.lga} />
            </TabsContent>
          </Tabs>
        )

      case "validator":
        return <ValidationDashboard user={user} />
      case "admin":
        return <AdminDashboard stats={stats} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  EcoReport
                </h1>
                <p className="text-xs text-gray-400">Environmental Monitoring</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <UserRoleSelector currentRole={userRole} onRoleChange={setUserRole} />
              <Badge className="hidden sm:flex bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 border-gray-600">
                {user.lga}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="relative bg-gray-800/60 backdrop-blur-sm border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <div className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {stats.totalReports.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Total Reports</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stats.verifiedReports.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">Verified</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stats.activeValidators}
              </div>
              <div className="text-xs text-gray-400">Validators</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <div className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                {stats.tokensDistributed.toLocaleString()}
              </div>
              <div className="text-xs text-gray-400">EcoTokens</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</main>

      {/* USSD Quick Access */}
      <div className="fixed bottom-6 right-6 z-50">
        <USSDInterface />
      </div>
    </div>
  )
}
