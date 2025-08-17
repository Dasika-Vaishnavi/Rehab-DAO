"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Calendar, Trophy, MessageCircle, Heart, X } from "lucide-react"

interface Notification {
  id: number
  type: "appointment" | "milestone" | "message" | "community" | "health"
  title: string
  message: string
  time: string
  read: boolean
  icon: React.ReactNode
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "appointment",
      title: "Upcoming Therapy Session",
      message: "Your session with Dr.TherapyHelper.eth starts in 30 minutes",
      time: "30m ago",
      read: false,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "milestone",
      title: "Milestone Achieved!",
      message: "Congratulations! You've completed 30 days of recovery",
      time: "2h ago",
      read: false,
      icon: <Trophy className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      message: "SupportiveSponsor.eth sent you a message",
      time: "4h ago",
      read: true,
      icon: <MessageCircle className="h-4 w-4" />,
    },
    {
      id: 4,
      type: "community",
      title: "Community Activity",
      message: "RecoveryBuddy.eth shared their progress in #wins",
      time: "6h ago",
      read: true,
      icon: <Heart className="h-4 w-4" />,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </div>
          {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div
                        className={`p-2 rounded-full ${
                          notification.type === "appointment"
                            ? "bg-blue-100 text-blue-600"
                            : notification.type === "milestone"
                              ? "bg-yellow-100 text-yellow-600"
                              : notification.type === "message"
                                ? "bg-green-100 text-green-600"
                                : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs"
                        >
                          Mark read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeNotification(notification.id)}
                        className="h-6 w-6"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
