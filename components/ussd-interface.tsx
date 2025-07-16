"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Phone, X } from "lucide-react"

export function USSDInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentScreen, setCurrentScreen] = useState("main")
  const [input, setInput] = useState("")

  const screens = {
    main: {
      title: "*310*123# - EcoReport USSD",
      content: ["1. Submit Report", "2. Check Balance", "3. Redeem Tokens", "4. Help", "0. Exit"],
      prompt: "Enter your choice:",
    },
    submit: {
      title: "Submit Report",
      content: ["1. Flood", "2. Pollution", "3. Wind Damage", "4. Drought", "0. Back"],
      prompt: "Select incident type:",
    },
    balance: {
      title: "Your Balance",
      content: ["EcoTokens: 1,250", "Reports: 15 submitted", "Verified: 12 reports", "Rank: #4 in Lagos Island"],
      prompt: "Press 0 to go back",
    },
    redeem: {
      title: "Redeem Tokens",
      content: ["1. Mobile Data 1GB (25 tokens)", "2. Airtime ₦500 (30 tokens)", "3. Tree Kit (100 tokens)", "0. Back"],
      prompt: "Select reward:",
    },
    help: {
      title: "Help & Support",
      content: ["Call: 0800-ECO-HELP", "SMS: Send HELP to 310", "Web: ecoreport.ng/help", "Office: Lagos Island LGA"],
      prompt: "Press 0 to go back",
    },
  }

  const handleInput = (value: string) => {
    setInput(value)

    if (currentScreen === "main") {
      switch (value) {
        case "1":
          setCurrentScreen("submit")
          break
        case "2":
          setCurrentScreen("balance")
          break
        case "3":
          setCurrentScreen("redeem")
          break
        case "4":
          setCurrentScreen("help")
          break
        case "0":
          setIsOpen(false)
          break
      }
    } else if (value === "0") {
      setCurrentScreen("main")
    }

    setInput("")
  }

  const currentScreenData = screens[currentScreen as keyof typeof screens]

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="rounded-full w-14 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-2xl"
      >
        <Phone className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="w-80 shadow-xl border-2 bg-gray-800/90 backdrop-blur-xl border-gray-700/50 shadow-2xl">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">USSD Interface</CardTitle>
            <CardDescription className="text-green-100">Africa's Talking Gateway</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-green-700">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="bg-gray-900 border border-gray-700 text-emerald-400 font-mono text-sm p-3 rounded mb-4 min-h-[200px]">
          <div className="mb-2 font-bold">{currentScreenData.title}</div>
          <div className="mb-4">
            {currentScreenData.content.map((line, index) => (
              <div key={index} className="mb-1">
                {line}
              </div>
            ))}
          </div>
          <div className="text-yellow-400">{currentScreenData.prompt}</div>
        </div>

        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter choice..."
            className="flex-1 bg-gray-700 border-gray-600 text-gray-200"
            maxLength={1}
          />
          <Button onClick={() => handleInput(input)} disabled={!input}>
            Send
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
            <Button
              key={key}
              variant="outline"
              size="sm"
              onClick={() => handleInput(key)}
              className="h-8 bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50"
            >
              {key}
            </Button>
          ))}
        </div>

        <div className="mt-3 text-center">
          <Badge variant="secondary" className="text-xs">
            Offline Access Available
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
