"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, XCircle, Clock, Eye, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  ecoScore: number
}

interface ValidationDashboardProps {
  user: User
}

export function ValidationDashboard({ user }: ValidationDashboardProps) {
  const [pendingReports] = useState([
    {
      id: "1",
      type: "flood",
      location: "Ikoyi, Lagos",
      description: "Heavy flooding on Bourdillon Road after rainfall",
      reporter: "Anonymous",
      timestamp: "15 minutes ago",
      aiScore: 0.85,
      image: "/placeholder.svg?height=200&width=300",
      validations: 1,
      requiredValidations: 3,
    },
    {
      id: "2",
      type: "pollution",
      location: "Apapa, Lagos",
      description: "Industrial waste being discharged into Lagos Lagoon",
      reporter: "Kemi A.",
      timestamp: "32 minutes ago",
      aiScore: 0.72,
      image: "/placeholder.svg?height=200&width=300",
      validations: 0,
      requiredValidations: 3,
    },
    {
      id: "3",
      type: "deforestation",
      location: "Epe, Lagos",
      description: "Illegal tree cutting in protected forest area",
      reporter: "Biodun O.",
      timestamp: "1 hour ago",
      aiScore: 0.91,
      image: "/placeholder.svg?height=200&width=300",
      validations: 2,
      requiredValidations: 3,
    },
  ])

  const [validationStats] = useState({
    totalValidated: 156,
    accuracyRate: 94,
    tokensEarned: 780,
    rank: 3,
  })

  const { toast } = useToast()

  const validateReport = (reportId: string, isValid: boolean) => {
    toast({
      title: isValid ? "Report validated" : "Report rejected",
      description: `You earned ${isValid ? "10" : "5"} EcoTokens for validation`,
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "flood":
        return "bg-blue-100 text-blue-800"
      case "pollution":
        return "bg-gray-100 text-gray-800"
      case "deforestation":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Validator Status */}
      <Card className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span>Validator Dashboard</span>
          </CardTitle>
          <CardDescription className="text-purple-100">Community Trust Score: 94% • Rank #3</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{validationStats.totalValidated}</div>
              <div className="text-purple-100 text-sm">Validated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{validationStats.accuracyRate}%</div>
              <div className="text-purple-100 text-sm">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{validationStats.tokensEarned}</div>
              <div className="text-purple-100 text-sm">Tokens Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">#{validationStats.rank}</div>
              <div className="text-purple-100 text-sm">Validator Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Validation Queue */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-100">
            <Clock className="h-5 w-5" />
            <span>Pending Validations</span>
          </CardTitle>
          <CardDescription className="text-gray-400">Reports waiting for community validation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pendingReports.map((report) => (
              <div key={report.id} className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 space-y-4">
                {/* Report Header */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={`bg-gradient-to-r ${getTypeColor(report.type)}`}>
                        {report.type.replace("_", " ")}
                      </Badge>
                      <Badge variant="outline">AI: {(report.aiScore * 100).toFixed(0)}%</Badge>
                    </div>
                    <h3 className="font-medium">{report.location}</h3>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div>{report.timestamp}</div>
                    <div>by {report.reporter}</div>
                  </div>
                </div>

                {/* Evidence Image */}
                <div className="relative">
                  <img
                    src={report.image || "/placeholder.svg"}
                    alt="Report evidence"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    Evidence Photo
                  </div>
                </div>

                {/* Validation Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Validation Progress</span>
                    <span>
                      {report.validations}/{report.requiredValidations} validators
                    </span>
                  </div>
                  <Progress className="bg-gray-700" value={(report.validations / report.requiredValidations) * 100} />
                </div>

                {/* AI Analysis */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">AI Pre-screening Results</span>
                  </div>
                  <div className="text-sm text-blue-800 space-y-1">
                    <div>
                      • Image classification: {report.type} ({(report.aiScore * 100).toFixed(0)}% confidence)
                    </div>
                    <div>• Text analysis: Consistent with reported incident type</div>
                    <div>• Location verification: GPS coordinates match description</div>
                  </div>
                </div>

                {/* Validation Actions */}
                <div className="flex space-x-3">
                  <Button
                    onClick={() => validateReport(report.id, true)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    variant="default"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validate (10 tokens)
                  </Button>
                  <Button
                    onClick={() => validateReport(report.id, false)}
                    className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    variant="destructive"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject (5 tokens)
                  </Button>
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Validation Guidelines */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
        <CardHeader>
          <CardTitle className="text-gray-100">Validation Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Verify image matches the reported incident type and location</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Check if the description is accurate and detailed</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
              <span>Consider AI confidence score but use your judgment</span>
            </div>
            <div className="flex items-start space-x-2">
              <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
              <span>Reject reports with fake, misleading, or irrelevant content</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
