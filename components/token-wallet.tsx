"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wallet, Coins, Gift, TrendingUp, ExternalLink, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  name: string
  ecoScore: number
  walletAddress: string
}

interface TokenWalletProps {
  user: User
}

export function TokenWallet({ user }: TokenWalletProps) {
  const [transactions] = useState([
    {
      id: "1",
      type: "earned",
      amount: 50,
      description: "Flood report verified",
      timestamp: "2 hours ago",
      txHash: "tx_abc123...",
    },
    {
      id: "2",
      type: "earned",
      amount: 50,
      description: "Pollution report verified",
      timestamp: "1 day ago",
      txHash: "tx_def456...",
    },
    {
      id: "3",
      type: "redeemed",
      amount: -25,
      description: "Mobile data bundle",
      timestamp: "3 days ago",
      txHash: "tx_ghi789...",
    },
  ])

  const [rewardOffers] = useState([
    { id: "1", title: "Mobile Data 1GB", cost: 25, provider: "MTN", available: true },
    { id: "2", title: "Airtime ₦500", cost: 30, provider: "Airtel", available: true },
    { id: "3", title: "Tree Planting Kit", cost: 100, provider: "EcoPartner", available: true },
    { id: "4", title: "Solar Lamp", cost: 200, provider: "GreenTech", available: false },
  ])

  const { toast } = useToast()

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(user.walletAddress)
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const redeemReward = (offer: any) => {
    if (user.ecoScore < offer.cost) {
      toast({
        title: "Insufficient tokens",
        description: `You need ${offer.cost - user.ecoScore} more EcoTokens`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Reward redeemed!",
      description: `${offer.title} will be delivered shortly`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Wallet Overview */}
      <Card className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-6 w-6" />
            <span>EcoToken Wallet</span>
          </CardTitle>
          <CardDescription className="text-green-100">Cardano Testnet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{user.ecoScore}</div>
            <div className="text-green-100">EcoTokens Available</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Wallet Address:</span>
              <Button variant="ghost" size="sm" onClick={copyWalletAddress} className="text-white hover:bg-white/10">
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-xs font-mono break-all mt-1">{user.walletAddress}</div>
          </div>
        </CardContent>
      </Card>

      {/* Earning Progress */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Earning Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Next Validator Status</span>
              <span>{user.ecoScore}/2000 tokens</span>
            </div>
            <Progress className="bg-gray-700" value={(user.ecoScore / 2000) * 100} />
            <p className="text-xs text-gray-500 mt-1">Earn {2000 - user.ecoScore} more tokens to become a validator</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-transparent bg-clip-text">
                15
              </div>
              <div className="text-xs text-gray-500">Reports Submitted</div>
            </div>
            <div>
              <div className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                12
              </div>
              <div className="text-xs text-gray-500">Verified</div>
            </div>
            <div>
              <div className="text-lg font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                80%
              </div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span>Recent Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg border border-gray-600/50"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={
                        tx.type === "earned"
                          ? "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300"
                          : "bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 text-red-300"
                      }
                    >
                      {tx.type === "earned" ? "+" : ""}
                      {tx.amount}
                    </Badge>
                    <span className="text-sm font-medium">{tx.description}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {tx.timestamp} • {tx.txHash}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Redemption Marketplace */}
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-2xl text-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5" />
            <span>Redemption Marketplace</span>
          </CardTitle>
          <CardDescription className="text-gray-400">Exchange your EcoTokens for rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {rewardOffers.map((offer) => (
              <div
                key={offer.id}
                className="flex justify-between items-center p-4 bg-gray-700/50 border border-gray-600 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{offer.title}</h3>
                  <p className="text-sm text-gray-500">{offer.provider}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">{offer.cost} tokens</Badge>
                    {!offer.available && <Badge variant="secondary">Out of Stock</Badge>}
                  </div>
                </div>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={() => redeemReward(offer)}
                  disabled={!offer.available || user.ecoScore < offer.cost}
                  size="sm"
                >
                  Redeem
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
