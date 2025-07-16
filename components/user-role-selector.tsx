"use client"

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Settings } from "lucide-react"

interface UserRoleSelectorProps {
  currentRole: "resident" | "validator" | "admin"
  onRoleChange: (role: "resident" | "validator" | "admin") => void
}

export function UserRoleSelector({ currentRole, onRoleChange }: UserRoleSelectorProps) {
  const roleConfig = {
    resident: {
      icon: User,
      label: "Resident",
      gradient: "from-blue-500 to-cyan-500",
      bg: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
    },
    validator: {
      icon: Shield,
      label: "Validator",
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
    },
    admin: {
      icon: Settings,
      label: "Admin",
      gradient: "from-red-500 to-orange-500",
      bg: "bg-gradient-to-r from-red-500/20 to-orange-500/20",
      border: "border-red-500/30",
    },
  }

  const currentConfig = roleConfig[currentRole]
  const Icon = currentConfig.icon

  return (
    <Select value={currentRole} onValueChange={onRoleChange}>
      <SelectTrigger className="w-auto border-gray-600 bg-gray-800/50 backdrop-blur-sm shadow-none">
        <Badge className={`${currentConfig.bg} ${currentConfig.border} border text-white`}>
          <Icon className="h-3 w-3 mr-1" />
          {currentConfig.label}
        </Badge>
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        <SelectItem value="resident" className="text-gray-200 focus:bg-gray-700">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-blue-400" />
            <span>Resident</span>
          </div>
        </SelectItem>
        <SelectItem value="validator" className="text-gray-200 focus:bg-gray-700">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-purple-400" />
            <span>Validator</span>
          </div>
        </SelectItem>
        <SelectItem value="admin" className="text-gray-200 focus:bg-gray-700">
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4 text-red-400" />
            <span>Admin</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
