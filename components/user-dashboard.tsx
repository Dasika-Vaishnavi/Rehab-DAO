"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Calendar,
  BookOpen,
  Users,
  HandHeart,
  FileText,
  Trophy,
  Activity,
  Star,
  MessageCircle,
  Settings,
  Plus,
} from "lucide-react"
import Link from "next/link"

export function UserDashboard() {
  const [currentStreak, setCurrentStreak] = useState(47)
  const [totalSessions, setTotalSessions] = useState(12)
  const [healthScore, setHealthScore] = useState(78)

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
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 font-serif">Welcome back, silver-otter!</h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Recovery Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{currentStreak} days</div>
                <Progress value={85} className="mb-2" />
                <p className="text-sm text-muted-foreground">Next milestone: 60 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary" />
                  Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">{healthScore}%</div>
                <Progress value={healthScore} className="mb-2" />
                <p className="text-sm text-muted-foreground">Based on activity & wellness</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  Sessions Complete
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-2">{totalSessions}</div>
                <p className="text-sm text-muted-foreground">Next: Tomorrow 2:00 PM</p>
                <Button size="sm" className="mt-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Next
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Button className="h-20 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span>Book Therapy</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col gap-2">
              <BookOpen className="w-6 h-6" />
              <span>Journal</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Users className="w-6 h-6" />
              <span>Community</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <HandHeart className="w-6 h-6" />
              <span>Sponsors</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <FileText className="w-6 h-6" />
              <span>Proof NFT</span>
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="appointments">Sessions</TabsTrigger>
            <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Small Wins Wall */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Recent Wins
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <Trophy className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">45 Day Milestone!</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-medium">Attended 10th Session</p>
                      <p className="text-sm text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                    <Heart className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium">Helped Community Member</p>
                      <p className="text-sm text-muted-foreground">2 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Today's Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-secondary" />
                    Today's Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Steps Taken</span>
                    <Badge variant="secondary">8,247</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sleep Quality</span>
                    <Badge variant="outline">Good</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mood Check-in</span>
                    <Badge className="bg-primary/10 text-primary">Positive</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Journal Entry</span>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Community Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Community Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <p className="font-medium">golden-phoenix.eth reached 100 days!</p>
                  <p className="text-sm text-muted-foreground">Celebrate this amazing milestone 🎉</p>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <p className="font-medium">New journal prompt: "What gives you strength?"</p>
                  <p className="text-sm text-muted-foreground">Share your thoughts with the community</p>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <p className="font-medium">wise-owl.eth shared a recovery tip</p>
                  <p className="text-sm text-muted-foreground">"Take it one day at a time, you've got this!"</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    My Journal
                  </span>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Entry
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Feeling Strong Today</h3>
                      <span className="text-sm text-muted-foreground">Today</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Had a great therapy session and feeling motivated to continue...
                    </p>
                    <Badge variant="outline" className="mr-2">
                      Private
                    </Badge>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Gratitude Practice</h3>
                      <span className="text-sm text-muted-foreground">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Three things I'm grateful for today: my support system, my progress...
                    </p>
                    <Badge className="mr-2 bg-primary/10 text-primary">Shared</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  My Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Dr. Sarah Chen</h3>
                      <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM - 3:00 PM</p>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                    <Button variant="outline">Join Session</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Dr. Michael Rodriguez</h3>
                      <p className="text-sm text-muted-foreground">Last week, completed</p>
                      <Badge className="bg-primary/10 text-primary">Completed</Badge>
                    </div>
                    <Button variant="outline">View Notes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sponsors">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandHeart className="w-5 h-5" />
                  My Sponsors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🌟</div>
                      <div>
                        <h3 className="font-medium">bright-star.eth</h3>
                        <p className="text-sm text-muted-foreground">Supporting since Day 1</p>
                      </div>
                    </div>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🦉</div>
                      <div>
                        <h3 className="font-medium">wise-mentor.eth</h3>
                        <p className="text-sm text-muted-foreground">Funded 5 sessions</p>
                      </div>
                    </div>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <h3 className="font-medium mb-2">#daily-check-ins</h3>
                    <p className="text-sm text-muted-foreground">Share your daily progress</p>
                    <Badge variant="outline" className="mt-2">
                      47 members
                    </Badge>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <h3 className="font-medium mb-2">#celebrate-wins</h3>
                    <p className="text-sm text-muted-foreground">Celebrate milestones together</p>
                    <Badge variant="outline" className="mt-2">
                      89 members
                    </Badge>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <h3 className="font-medium mb-2">#support-circle</h3>
                    <p className="text-sm text-muted-foreground">Get help when you need it</p>
                    <Badge variant="outline" className="mt-2">
                      156 members
                    </Badge>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <h3 className="font-medium mb-2">#wellness-tips</h3>
                    <p className="text-sm text-muted-foreground">Share healthy habits</p>
                    <Badge variant="outline" className="mt-2">
                      203 members
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  My Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">🏆</div>
                    <h3 className="font-medium">30 Day Warrior</h3>
                    <p className="text-sm text-muted-foreground">Completed 30 days</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">📚</div>
                    <h3 className="font-medium">Journal Master</h3>
                    <p className="text-sm text-muted-foreground">50 journal entries</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">🤝</div>
                    <h3 className="font-medium">Community Helper</h3>
                    <p className="text-sm text-muted-foreground">Helped 10 members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
