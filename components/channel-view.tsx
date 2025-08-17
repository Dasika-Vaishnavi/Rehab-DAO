"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Hash,
  Pin,
  Settings,
  Send,
  Smile,
  MessageCircle,
  MoreHorizontal,
  Reply,
  Share,
  Flag,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface ChannelViewProps {
  channelId: string
}

const mockMessages = [
  {
    id: 1,
    author: "golden-phoenix.eth",
    avatar: "🌟",
    role: "Moderator",
    content: "Welcome everyone to today's check-in! How are you feeling today?",
    timestamp: "Today at 9:00 AM",
    reactions: [
      { emoji: "👋", count: 8 },
      { emoji: "❤️", count: 5 },
    ],
    replies: [
      {
        id: 11,
        author: "silver-otter.eth",
        avatar: "🦋",
        content: "Feeling grateful and strong today! Day 47 going well.",
        timestamp: "Today at 9:15 AM",
      },
      {
        id: 12,
        author: "wise-owl.eth",
        avatar: "🦉",
        content: "Same here! The community support makes all the difference.",
        timestamp: "Today at 9:20 AM",
      },
    ],
  },
  {
    id: 2,
    author: "silver-otter.eth",
    avatar: "🦋",
    role: "Member",
    content:
      "Just wanted to share that I had my therapy session yesterday and it went really well. We worked on some coping strategies that I'm excited to try.",
    timestamp: "Today at 10:30 AM",
    reactions: [
      { emoji: "🎉", count: 12 },
      { emoji: "💪", count: 7 },
      { emoji: "🙏", count: 4 },
    ],
    replies: [],
  },
  {
    id: 3,
    author: "wise-owl.eth",
    avatar: "🦉",
    role: "Helper",
    content:
      "For anyone struggling today, remember that recovery is not linear. Every day you choose recovery is a victory, no matter how small it might seem. You've got this! 💙",
    timestamp: "Today at 11:45 AM",
    reactions: [
      { emoji: "❤️", count: 15 },
      { emoji: "🤗", count: 8 },
      { emoji: "💙", count: 6 },
    ],
    replies: [
      {
        id: 31,
        author: "bright-star.eth",
        avatar: "⭐",
        content: "Thank you for this reminder. I really needed to hear it today.",
        timestamp: "Today at 12:00 PM",
      },
    ],
  },
]

const channelInfo = {
  "daily-check-ins": {
    name: "daily-check-ins",
    description: "Share your daily progress and check in with the community",
    memberCount: 47,
    category: "Support",
  },
  "celebrate-wins": {
    name: "celebrate-wins",
    description: "Celebrate milestones and victories together",
    memberCount: 89,
    category: "Celebration",
  },
  "support-circle": {
    name: "support-circle",
    description: "Get help and support when you need it most",
    memberCount: 156,
    category: "Support",
  },
}

export function ChannelView({ channelId }: ChannelViewProps) {
  const [newMessage, setNewMessage] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [shareJournalOpen, setShareJournalOpen] = useState(false)

  const channel = channelInfo[channelId as keyof typeof channelInfo] || {
    name: channelId,
    description: "Community discussion channel",
    memberCount: 0,
    category: "General",
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending message:", newMessage)
      setNewMessage("")
      setReplyingTo(null)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Moderator":
        return "text-primary"
      case "Helper":
        return "text-secondary"
      case "Therapist":
        return "text-accent"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/community" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground font-serif">REHAB DAO</span>
            </Link>
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5" />
              <span className="font-medium">{channel.name}</span>
              <Badge variant="outline">{channel.memberCount} members</Badge>
            </div>
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
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Channel Info */}
          <div className="p-6 border-b border-border bg-muted/20">
            <div className="flex items-center gap-3 mb-2">
              <Hash className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold font-serif">{channel.name}</h1>
                <p className="text-muted-foreground">{channel.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Dialog open={shareJournalOpen} onOpenChange={setShareJournalOpen}>
                <DialogTrigger asChild>
                  <Button>Share Journal Entry</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Journal Entry</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Textarea placeholder="Share your thoughts with the community..." rows={4} />
                    <div className="flex items-center gap-2">
                      <Button onClick={() => setShareJournalOpen(false)}>Share</Button>
                      <Button variant="outline" onClick={() => setShareJournalOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline">Create Poll</Button>
              <Button variant="outline">Share Resource</Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {mockMessages.map((message) => (
                <div key={message.id} className="group">
                  <div className="flex gap-3 hover:bg-muted/30 p-3 rounded-lg transition-colors">
                    <div className="text-2xl">{message.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`font-medium ${getRoleColor(message.role)}`}>{message.author}</span>
                        {message.role !== "Member" && (
                          <Badge variant="outline" className="text-xs">
                            {message.role}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-sm mb-3 leading-relaxed">{message.content}</p>
                      <div className="flex items-center gap-2">
                        {message.reactions.map((reaction, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-xs hover:bg-primary/10 bg-transparent"
                          >
                            {reaction.emoji} {reaction.count}
                          </Button>
                        ))}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <Smile className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => setReplyingTo(message.id)}
                          >
                            <Reply className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <Share className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 px-2">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Replies */}
                      {message.replies.length > 0 && (
                        <div className="mt-4 ml-4 border-l-2 border-muted pl-4 space-y-3">
                          {message.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-2">
                              <div className="text-lg">{reply.avatar}</div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-sm">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card/30">
            {replyingTo && (
              <div className="mb-2 p-2 bg-muted/50 rounded-lg text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Replying to {mockMessages.find((m) => m.id === replyingTo)?.author}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                    ×
                  </Button>
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={replyingTo ? "Reply to message..." : `Message #${channel.name}`}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Thread & Details */}
        <div className="w-80 border-l border-border bg-card/30 p-4">
          <div className="space-y-6">
            {/* Channel Stats */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">CHANNEL STATS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Members</span>
                  <span className="font-medium">{channel.memberCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Messages Today</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Now</span>
                  <span className="font-medium">12</span>
                </div>
              </div>
            </div>

            {/* Pinned Messages */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">PINNED MESSAGES</h3>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Pin className="w-3 h-3 text-primary" />
                  <span className="text-xs font-medium">golden-phoenix.eth</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Community Guidelines: Be kind, supportive, and respectful. We're all here to help each other grow.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">QUICK ACTIONS</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Thread
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Share className="w-4 h-4 mr-2" />
                  Share Channel
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Flag className="w-4 h-4 mr-2" />
                  Report Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
