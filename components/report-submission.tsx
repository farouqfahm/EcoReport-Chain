"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, MapPin, Upload, Zap, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  ecoScore: number
  lga: string
}

interface ReportSubmissionProps {
  user: User
}

export function ReportSubmission({ user }: ReportSubmissionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [description, setDescription] = useState("")
  const [incidentType, setIncidentType] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const incidentTypes = [
    { id: "flood", label: "Flooding", gradient: "from-blue-500 to-cyan-500" },
    { id: "drought", label: "Drought", gradient: "from-yellow-500 to-orange-500" },
    { id: "wind_damage", label: "Wind Damage", gradient: "from-red-500 to-pink-500" },
    { id: "pollution", label: "Pollution", gradient: "from-gray-500 to-slate-600" },
    { id: "deforestation", label: "Deforestation", gradient: "from-green-500 to-emerald-600" },
  ]

  const handleImageCapture = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          toast({
            title: "Location captured",
            description: "GPS coordinates have been recorded",
          })
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please try again.",
            variant: "destructive",
          })
        },
      )
    }
  }

  const simulateAIValidation = async () => {
    const steps = [
      { name: "Image compression", duration: 1000 },
      { name: "AI image analysis", duration: 2000 },
      { name: "Text processing (Afriberta)", duration: 1500 },
      { name: "Geohash indexing", duration: 800 },
      { name: "Blockchain preparation", duration: 1200 },
    ]

    let progress = 0
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.duration))
      progress += 100 / steps.length
      setUploadProgress(Math.round(progress))
    }
  }

  const handleSubmit = async () => {
    if (!selectedImage || !location || !description || !incidentType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      await simulateAIValidation()

      toast({
        title: "Report submitted successfully!",
        description: "Your report is being processed by AI validators",
      })

      setSelectedImage(null)
      setLocation(null)
      setDescription("")
      setIncidentType("")
      setUploadProgress(0)
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* User Info Card */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg text-gray-100">{user.name}</CardTitle>
              <CardDescription className="text-gray-400">
                {user.lga} • {user.ecoScore} EcoScore
              </CardDescription>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300">
              <Zap className="h-3 w-3 mr-1" />
              Active Reporter
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Image Capture */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-100">
            <Camera className="h-5 w-5 text-emerald-400" />
            <span>Capture Evidence</span>
          </CardTitle>
          <CardDescription className="text-gray-400">Take a photo or video of the environmental issue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />

          {selectedImage ? (
            <div className="relative">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Captured evidence"
                className="w-full h-48 object-cover rounded-lg border border-gray-600"
              />
              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Captured
              </Badge>
            </div>
          ) : (
            <div
              onClick={handleImageCapture}
              className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-500 transition-all duration-300 bg-gradient-to-br from-gray-800/30 to-gray-700/30 hover:from-emerald-500/10 hover:to-teal-500/10"
            >
              <Camera className="h-12 w-12 mx-auto text-gray-500 mb-2" />
              <p className="text-gray-300">Tap to capture photo/video</p>
              <p className="text-sm text-gray-500">Auto-compressed to 500KB</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-100">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span>Location</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={getCurrentLocation}
            className={`w-full ${
              location
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            } text-white border-0 shadow-lg`}
          >
            {location ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Location Captured ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Get Current Location
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Incident Type */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-100">Incident Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {incidentTypes.map((type) => (
              <Button
                key={type.id}
                variant={incidentType === type.id ? "default" : "outline"}
                onClick={() => setIncidentType(type.id)}
                className={`justify-start h-12 ${
                  incidentType === type.id
                    ? `bg-gradient-to-r ${type.gradient} text-white border-0 shadow-lg`
                    : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
                }`}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-gray-100">Description</CardTitle>
          <CardDescription className="text-gray-400">Describe the environmental issue in detail</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Describe what you observed... (Supports Hausa, Yoruba, Igbo)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="bg-gray-700/50 border-gray-600 text-gray-200 placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20"
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl">
        <CardContent className="pt-6">
          {isSubmitting && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2 text-gray-300">
                <span>Processing report...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="bg-gray-700" />
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 shadow-lg h-12 text-base font-medium"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Submitting Report...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Submit Report
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 mt-3 text-center">Earn 50 EcoTokens for verified reports</p>
        </CardContent>
      </Card>
    </div>
  )
}
