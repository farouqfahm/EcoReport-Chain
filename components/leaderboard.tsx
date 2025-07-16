"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, TrendingUp, Users } from "lucide-react"

interface LeaderboardProps {
  userLga: string
}

export function Leaderboard({ userLga }: LeaderboardProps) {
  const [view, setView] = useState<"lga" | "national">("lga")

  const lgaLeaders = [
    { rank: 1, name: "Adebayo M.", score: 2450, reports: 49, badge: "Gold Validator" },
    { rank: 2, name: "Fatima A.", score: 2100, reports: 42, badge: "Silver Validator" },
    { rank: 3, name: "Chidi O.", score: 1890, reports: 38, badge: "Bronze Validator" },
    { rank: 4, name: "You", score: 1250, reports: 15, badge: "Active Reporter" },
    { rank: 5, name: "Kemi S.", score: 980, reports: 12, badge: "Reporter" },
  ]

  const nationalLeaders = [
    { rank: 1, name: "Amina K. (Kano)", score: 4200, reports: 84, badge: "Diamond Validator" },
    { rank: 2, name: "Emeka N. (Enugu)", score: 3800, reports: 76, badge: "Platinum Validator" },
    { rank: 3, name: "Aisha M. (Abuja)", score: 3500, reports: 70, badge: "Gold Validator" },
    { rank: 15, name: "You (Lagos)", score: 1250, reports: 15, badge: "Active Reporter" },
  ]

  const currentLeaders = view === "lga" ? lgaLeaders : nationalLeaders

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>
    }
  }

  const getBadgeColor = (badge: string) => {
    if (badge.includes("Diamond")) return "bg-purple-100 text-purple-800"
    if (badge.includes("Platinum")) return "bg-gray-100 text-gray-800"
    if (badge.includes("Gold")) return "bg-yellow-100 text-yellow-800"
    if (badge.includes("Silver")) return "bg-gray-100 text-gray-600"
    if (badge.includes("Bronze")) return "bg-amber-100 text-amber-800"
    return "bg-blue-100 text-blue-800"
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex space-x-2">
        <Button
          variant={view === "lga" ? "default" : "outline"}
          className={
            view === "lga"
              ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
              : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
          }
          onClick={() => setView("lga")}
          size="sm"
        >
          <Users className="h-4 w-4 mr-2" />
          {userLga}
        </Button>
        <Button
          variant={view === "national" ? "default" : "outline"}
          className={
            view === "national"
              ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
              : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
          }
          onClick={() => setView("national")}
          size="sm"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          National
        </Button>
      </div>

      {/* Leaderboard */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-100">
            <Trophy className="h-5 w-5" />
            <span>{view === "lga" ? userLga : "National"} Leaderboard</span>
          </CardTitle>
          <CardDescription className="text-gray-400">Top environmental reporters and validators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentLeaders.map((leader) => (
              <div
                key={leader.rank}
                className={`flex items-center space-x-4 p-4 rounded-lg ${
                  leader.name === "You" || leader.name.includes("You")
                    ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30"
                    : "bg-gray-700/50 border border-gray-600/50"
                }`}
              >
                <div className="flex-shrink-0 w-8 flex justify-center">{getRankIcon(leader.rank)}</div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-100">{leader.name}</h3>
                    {(leader.name === "You" || leader.name.includes("You")) && (
                      <Badge className="bg-green-100 text-green-800">You</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-400">{leader.reports} reports</span>
                    <Badge className={getBadgeColor(leader.badge)} variant="secondary">
                      {leader.badge}
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{leader.score}</div>
                  <div className="text-xs text-gray-500">EcoScore</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-100">Achievement System</CardTitle>
          <CardDescription className="text-gray-400">
            Unlock badges by contributing to environmental monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg">
              <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <h3 className="font-medium text-gray-100">Validator</h3>
              <p className="text-xs text-gray-500">2000+ EcoScore</p>
            </div>
            <div className="text-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg">
              <Medal className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <h3 className="font-medium text-gray-100">Expert Reporter</h3>
              <p className="text-xs text-gray-500">50+ verified reports</p>
            </div>
            <div className="text-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg">
              <Award className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <h3 className="font-medium text-gray-100">Community Leader</h3>
              <p className="text-xs text-gray-500">Top 10 in LGA</p>
            </div>
            <div className="text-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg opacity-50">
              <Users className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <h3 className="font-medium text-gray-100">Mentor</h3>
              <p className="text-xs text-gray-500">Help 10 new users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
