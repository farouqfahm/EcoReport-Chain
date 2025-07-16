"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Eye, Clock, CheckCircle } from "lucide-react"

interface Report {
  id: string
  type: string
  location: { lat: number; lng: number }
  address: string
  status: "pending" | "verified" | "rejected"
  timestamp: string
  description: string
  reporter: string
  validationScore: number
}

export function LiveMap() {
  const [reports, setReports] = useState<Report[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [filter, setFilter] = useState<"all" | "verified" | "pending">("all")

  useEffect(() => {
    // Simulate real-time reports
    const mockReports: Report[] = [
      {
        id: "1",
        type: "flood",
        location: { lat: 6.5244, lng: 3.3792 },
        address: "Victoria Island, Lagos",
        status: "verified",
        timestamp: "2 hours ago",
        description: "Severe flooding on Ahmadu Bello Way",
        reporter: "Adebayo M.",
        validationScore: 0.92,
      },
      {
        id: "2",
        type: "pollution",
        location: { lat: 6.4281, lng: 3.4219 },
        address: "Surulere, Lagos",
        status: "pending",
        timestamp: "45 minutes ago",
        description: "Industrial waste discharge into canal",
        reporter: "Fatima A.",
        validationScore: 0.78,
      },
      {
        id: "3",
        type: "wind_damage",
        location: { lat: 6.6018, lng: 3.3515 },
        address: "Ikeja, Lagos",
        status: "verified",
        timestamp: "1 hour ago",
        description: "Trees fallen due to strong winds",
        reporter: "Chidi O.",
        validationScore: 0.95,
      },
    ]
    setReports(mockReports)
  }, [])

  const filteredReports = reports.filter((report) => filter === "all" || report.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300"
      case "pending":
        return "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-yellow-300"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "flood":
        return "bg-blue-100 text-blue-800"
      case "pollution":
        return "bg-gray-100 text-gray-800"
      case "wind_damage":
        return "bg-red-100 text-red-800"
      case "drought":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-100">
            <MapPin className="h-5 w-5" />
            <span>Live Environmental Map</span>
          </CardTitle>
          <CardDescription className="text-gray-400">Real-time verified environmental incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 h-64 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Simulated map with pins */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=256&width=400')] bg-cover bg-center opacity-20"></div>

            {/* Map pins */}
            {filteredReports.map((report, index) => (
              <div
                key={report.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                  index === 0 ? "top-1/3 left-1/2" : index === 1 ? "top-2/3 left-1/3" : "top-1/2 right-1/3"
                }`}
                onClick={() => setSelectedReport(report)}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg ${
                    report.status === "verified" ? "bg-green-500" : "bg-yellow-500"
                  } animate-pulse`}
                >
                  <div className="w-full h-full rounded-full bg-white opacity-30"></div>
                </div>
              </div>
            ))}

            <div className="text-center z-10">
              <MapPin className="h-12 w-12 mx-auto text-green-600 mb-2" />
              <p className="text-gray-100 font-medium">Interactive Map</p>
              <p className="text-sm text-gray-400">Powered by Mapbox SDK</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex space-x-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          className={
            filter === "all"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
              : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
          }
          onClick={() => setFilter("all")}
          size="sm"
        >
          All Reports
        </Button>
        <Button
          variant={filter === "verified" ? "default" : "outline"}
          className={
            filter === "verified"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
              : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
          }
          onClick={() => setFilter("verified")}
          size="sm"
        >
          Verified
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          className={
            filter === "pending"
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
              : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
          }
          onClick={() => setFilter("pending")}
          size="sm"
        >
          Pending
        </Button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card
            key={report.id}
            className={`cursor-pointer transition-all bg-gray-800/50 backdrop-blur-sm border-gray-700/50 ${
              selectedReport?.id === report.id ? "ring-2 ring-emerald-500/50" : ""
            }`}
            onClick={() => setSelectedReport(report)}
          >
            <CardContent className="pt-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex space-x-2">
                  <Badge className={getTypeColor(report.type)}>{report.type.replace("_", " ")}</Badge>
                  <Badge className={getStatusColor(report.status)}>
                    {report.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                    {report.status}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {report.timestamp}
                </div>
              </div>

              <h3 className="font-medium mb-1 text-gray-200">{report.address}</h3>
              <p className="text-sm text-gray-400 mb-2">{report.description}</p>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Reported by {report.reporter}</span>
                <span>AI Score: {(report.validationScore * 100).toFixed(0)}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Report Details */}
      {selectedReport && (
        <Card className="border-green-200 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-100">
              <Eye className="h-5 w-5" />
              <span>Report Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-200">
              <div>
                <span className="font-medium">Location:</span>
                <p>{selectedReport.address}</p>
              </div>
              <div>
                <span className="font-medium">Coordinates:</span>
                <p>
                  {selectedReport.location.lat.toFixed(4)}, {selectedReport.location.lng.toFixed(4)}
                </p>
              </div>
              <div>
                <span className="font-medium">Reporter:</span>
                <p>{selectedReport.reporter}</p>
              </div>
              <div>
                <span className="font-medium">AI Confidence:</span>
                <p>{(selectedReport.validationScore * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div>
              <span className="font-medium text-sm">Description:</span>
              <p className="text-sm text-gray-400 mt-1">{selectedReport.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
