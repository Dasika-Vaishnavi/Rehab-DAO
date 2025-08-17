"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Hash,
  Plus,
  Crown,
  Shield,
  Stethoscope,
  User,
  Trophy,
  Activity,
  MessageCircle,
  Pin,
  Smile,
  Send,
  Settings,
} from "lucide-react"
import Link from "next/link"

const mockChannels = [
  {
    id: "daily-check-ins",
    name: "daily-check-ins",
    description: "Share your daily progress and check in with the community",
    memberCount: 47,
    category: "Support",
    lastMessage: "2 minutes ago",
    unread: 3,
  },
  {
    id: "celebrate-wins",
    name: "celebrate-wins",
    description: "Celebrate milestones and victories together",
    memberCount: 89,
    category: "Celebration",
    lastMessage: "5 minutes ago",
    unread: 0,
  },
  {
    id: "support-circle",
    name: "support-circle",
    description: "Get help and support when you need it most",
    memberCount: 156,
    category: "Support",
    lastMessage: "12 minutes ago",
    unread: 1,
  },
  {
    id: "wellness-tips",
    name: "wellness-tips",
    description: "Share healthy habits and wellness strategies",
    memberCount: 203,
    category: "Wellness",
    lastMessage: "1 hour ago",
    unread: 0,
  },
  {
    id: "therapy-insights",
    name: "therapy-insights",
    description: "Discuss therapy experiences and insights",
    memberCount: 78,
    category: "Therapy",
    lastMessage: "2 hours ago",
    unread: 0,
  },
  {
    id: "mindfulness",
    name: "mindfulness",
    description: "Meditation, breathing exercises, and mindful practices",
    memberCount: 134,
    category: "Wellness",
    lastMessage: "3 hours ago",
    unread: 0,
  },
]

const mockLeaderboard = [
  {
    pseudonym: "wise-owl.eth",
    avatar: "🦉",
    streak: 89,
    points: 2450,
    role: "Helper",
    healthScore: 92,
  },
  {
    pseudonym: "silver-otter.eth",
    avatar: "🦋",
    streak: 47,
    points: 1890,
    role: "Member",
    healthScore: 78,
  },
  {
    pseudonym: "golden-phoenix.eth",
    avatar: "🌟",
    streak: 102,
    points: 3120,
    role: "Moderator",
    healthScore: 95,
  },
  {
    pseudonym: "bright-star.eth",
    avatar: "⭐",
    streak: 23,
    points: 890,
    role: "Member",
    healthScore: 65,
  },
  {
    pseudonym: "calm-river.eth",
    avatar: "🌊",
    streak: 8,
    points: 340,
    role: "Member",
    healthScore: 58,
  },
]

const mockRecentMessages = [
  {
    id: 1,
    channel: "celebrate-wins",
    author: "golden-phoenix.eth",
    avatar: "🌟",
    content: "Just hit 100 days! Thank you all for the incredible support 🎉",
    timestamp: "2 minutes ago",
    reactions: [
      { emoji: "🎉", count: 12 },
      { emoji: "❤️", count: 8 },
    ],
  },
  {
    id: 2,
    channel: "daily-check-ins",
    author: "silver-otter.eth",
    avatar: "🦋",
    content: "Day 47 - feeling strong and grateful for this community",
    timestamp: "5 minutes ago",
    reactions: [
      { emoji: "💪", count: 6 },
      { emoji: "🙏", count: 4 },
    ],
  },
  {
    id: 3,
    channel: "wellness-tips",
    author: "wise-owl.eth",
    avatar: "🦉",
    content:
      "Morning meditation has been a game-changer for my recovery. Highly recommend starting with just 5 minutes.",
    timestamp: "12 minutes ago",
    reactions: [{ emoji: "🧘", count: 9 }],
  },
]

export function CommunityCenter() {
  const [selectedChannel, setSelectedChannel] = useState("daily-check-ins")
  const [newChannelOpen, setNewChannelOpen] = useState(false)
  const [newChannelName, setNewChannelName] = useState("")
  const [newChannelDescription, setNewChannelDescription] = useState("")

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Moderator":
        return <Crown className="w-4 h-4 text-primary" />
      case "Helper":
        return <Shield className="w-4 h-4 text-secondary" />
      case "Therapist":
        return <Stethoscope className="w-4 h-4 text-accent" />
      default:
        return <User className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-serif">REHAB DAO</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl">🦋</div>
              <span className="font-medium">silver-otter.eth</span>
            </div>
            <Link href="/dashboard/user">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <div className="w-80 border-r border-border bg-card/30 flex flex-col">
          {/* Community Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-serif">Community</h2>
              <Dialog open={newChannelOpen} onOpenChange={setNewChannelOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Channel</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="channel-name">Channel Name</Label>
                      <Input
                        id="channel-name"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                        placeholder="e.g., recovery-stories"
                      />
                    </div>
                    <div>
                      <Label htmlFor="channel-description">Description</Label>
                      <Textarea
                        id="channel-description"
                        value={newChannelDescription}
                        onChange={(e) => setNewChannelDescription(e.target.value)}
                        placeholder="What is this channel about?"
                      />
                    </div>
                    <Button onClick={() => setNewChannelOpen(false)} className="w-full">
                      Create Channel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Leaderboard Preview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mockLeaderboard.slice(0, 3).map((user, index) => (
                  <div key={user.pseudonym} className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-primary">#{index + 1}</span>
                      <div className="text-lg">{user.avatar}</div>
                      {getRoleIcon(user.role)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.pseudonym}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{user.streak}d</span>
                        <Progress value={user.healthScore} className="h-1 flex-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Channel List */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">CHANNELS</h3>
              {mockChannels.map((channel) => (
                <Link key={channel.id} href={`/community/${channel.id}`}>
                  <div
                    className={`flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                      selectedChannel === channel.id ? "bg-primary/10 text-primary" : ""
                    }`}
                    onClick={() => setSelectedChannel(channel.id)}
                  >
                    <Hash className="w-4 h-4" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{channel.name}</span>
                        {channel.unread > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {channel.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{channel.memberCount} members</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Channel Header */}
          <div className="p-4 border-b border-border bg-card/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  {selectedChannel}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {mockChannels.find((c) => c.id === selectedChannel)?.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Pin className="w-4 h-4 mr-2" />
                  Pinned
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockRecentMessages.map((message) => (
                <div key={message.id} className="flex gap-3 hover:bg-muted/30 p-3 rounded-lg transition-colors">
                  <div className="text-2xl">{message.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{message.author}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <p className="text-sm mb-2">{message.content}</p>
                    <div className="flex items-center gap-2">
                      {message.reactions.map((reaction, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs hover:bg-primary/10 bg-transparent"
                        >
                          {reaction.emoji} {reaction.count}
                        </Button>
                      ))}
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Smile className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <MessageCircle className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Welcome Message for New Channels */}
              <div className="text-center py-8 text-muted-foreground">
                <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="font-medium mb-2">Welcome to #{selectedChannel}!</h3>
                <p className="text-sm">
                  This is the beginning of the #{selectedChannel} channel. Share your thoughts and connect with the
                  community.
                </p>
              </div>
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card/30">
            <div className="flex gap-2">
              <Input placeholder={`Message #${selectedChannel}`} className="flex-1" />
              <Button>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Member List & Activity */}
        <div className="w-64 border-l border-border bg-card/30 p-4">
          <div className="space-y-6">
            {/* Online Members */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">ONLINE — 12</h3>
              <div className="space-y-2">
                {mockLeaderboard.slice(0, 5).map((user) => (
                  <div key={user.pseudonym} className="flex items-center gap-2">
                    <div className="relative">
                      <div className="text-lg">{user.avatar}</div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium truncate">{user.pseudonym}</span>
                        {getRoleIcon(user.role)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{user.streak}d streak</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">RECENT ACTIVITY</h3>
              <div className="space-y-3">
                <div className="text-xs">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-sm">🎉</div>
                    <span className="font-medium">golden-phoenix.eth</span>
                  </div>
                  <p className="text-muted-foreground">Reached 100-day milestone</p>
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-sm">📚</div>
                    <span className="font-medium">wise-owl.eth</span>
                  </div>
                  <p className="text-muted-foreground">Shared wellness tip</p>
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="text-sm">💪</div>
                    <span className="font-medium">silver-otter.eth</span>
                  </div>
                  <p className="text-muted-foreground">Completed daily check-in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
