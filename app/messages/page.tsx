"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Send, Search, MoreVertical } from "lucide-react"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [newMessage, setNewMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "SupportiveSponsor.eth",
      avatar: "🌟",
      lastMessage: "How are you feeling today?",
      time: "2m ago",
      unread: 2,
      type: "sponsor",
    },
    {
      id: 2,
      name: "Dr.TherapyHelper.eth",
      avatar: "🩺",
      lastMessage: "Great progress in our last session!",
      time: "1h ago",
      unread: 0,
      type: "therapist",
    },
    {
      id: 3,
      name: "RecoveryBuddy.eth",
      avatar: "🤝",
      lastMessage: "Want to join the group session?",
      time: "3h ago",
      unread: 1,
      type: "peer",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "SupportiveSponsor.eth",
      content:
        "Hi there! I wanted to check in and see how you're doing today. Remember, every day is a new opportunity for growth.",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content:
        "Thank you for checking in! I'm feeling good today. Had my therapy session and completed my morning routine.",
      time: "10:45 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "SupportiveSponsor.eth",
      content:
        "That's wonderful to hear! Consistency in routines is so important. How are you feeling about your progress this week?",
      time: "11:00 AM",
      isOwn: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Conversations
                <Badge variant="secondary">{conversations.filter((c) => c.unread > 0).length}</Badge>
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                {conversations.map((conversation, index) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === index ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                    }`}
                    onClick={() => setSelectedConversation(index)}
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-lg">{conversation.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">{conversation.name}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                            {conversation.unread > 0 && (
                              <Badge
                                variant="destructive"
                                className="h-5 w-5 p-0 flex items-center justify-center text-xs"
                              >
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {conversation.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card className="lg:col-span-2">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-lg">{conversations[selectedConversation]?.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{conversations[selectedConversation]?.name}</h3>
                    <p className="text-sm text-gray-500">{conversations[selectedConversation]?.type} • Online</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        // Handle send message
                        setNewMessage("")
                      }
                    }}
                  />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Messages are encrypted and anonymous. Only pseudonyms are shared.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
