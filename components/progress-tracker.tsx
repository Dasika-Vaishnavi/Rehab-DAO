"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import {
  Heart,
  Trophy,
  Activity,
  Calendar,
  Download,
  Share,
  QrCode,
  Shield,
  CheckCircle,
  TrendingUp,
  Smartphone,
  Watch,
  Award,
  Target,
} from "lucide-react"
import Link from "next/link"

const mockProgressData = {
  currentStreak: 47,
  totalSessions: 12,
  healthScore: 78,
  sobrietyDate: "2023-12-01",
  milestones: [
    { id: 1, title: "First Week", description: "7 days sober", achieved: true, date: "2023-12-08", points: 100 },
    { id: 2, title: "Two Weeks Strong", description: "14 days sober", achieved: true, date: "2023-12-15", points: 200 },
    {
      id: 3,
      title: "One Month Warrior",
      description: "30 days sober",
      achieved: true,
      date: "2024-01-01",
      points: 500,
    },
    { id: 4, title: "45 Day Champion", description: "45 days sober", achieved: true, date: "2024-01-16", points: 750 },
    { id: 5, title: "Two Month Hero", description: "60 days sober", achieved: false, date: null, points: 1000 },
    { id: 6, title: "90 Day Legend", description: "90 days sober", achieved: false, date: null, points: 1500 },
  ],
  healthMetrics: {
    steps: { current: 8247, goal: 10000, trend: "+12%" },
    sleep: { current: 7.5, goal: 8, trend: "+0.5h" },
    heartRate: { current: 72, goal: 70, trend: "-3 bpm" },
    mood: { current: 8, goal: 7, trend: "+1 point" },
  },
  sessions: [
    { id: 1, date: "2024-01-15", therapist: "Dr. Sarah Chen", completed: true, attested: true },
    { id: 2, date: "2024-01-08", therapist: "Dr. Sarah Chen", completed: true, attested: true },
    { id: 3, date: "2024-01-01", therapist: "Dr. Sarah Chen", completed: true, attested: true },
  ],
  integrations: {
    appleHealth: false,
    googleFit: false,
    fitbit: false,
  },
}

export function ProgressTracker() {
  const [certificateOpen, setCertificateOpen] = useState(false)
  const [healthIntegrations, setHealthIntegrations] = useState(mockProgressData.integrations)

  const calculateDaysSince = (date: string) => {
    const start = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const totalPoints = mockProgressData.milestones.filter((m) => m.achieved).reduce((sum, m) => sum + m.points, 0)

  const nextMilestone = mockProgressData.milestones.find((m) => !m.achieved)

  const handleHealthIntegration = (service: string, enabled: boolean) => {
    setHealthIntegrations((prev) => ({
      ...prev,
      [service]: enabled,
    }))
    // Handle integration logic
    console.log(`${service} integration ${enabled ? "enabled" : "disabled"}`)
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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 font-serif">Your Recovery Progress</h1>
          <p className="text-muted-foreground text-lg">
            Track your journey, celebrate milestones, and generate verified proof of your progress.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">{mockProgressData.currentStreak} days</div>
              <p className="text-sm text-muted-foreground">
                Since {new Date(mockProgressData.sobrietyDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Sessions Complete
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary mb-2">{mockProgressData.totalSessions}</div>
              <p className="text-sm text-muted-foreground">All verified by therapists</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent mb-2">{mockProgressData.healthScore}%</div>
              <Progress value={mockProgressData.healthScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">Based on activity & wellness</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">{totalPoints.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">
                From {mockProgressData.milestones.filter((m) => m.achieved).length} milestones
              </p>
            </CardContent>
          </Card>
        </div>

        {/* NFT Certificate */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Recovery Certificate (NFT)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-4">
                  Generate a blockchain-verified certificate of your recovery progress that you can share with courts,
                  employers, or healthcare providers.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span>Verified by Dr. Sarah Chen</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog open={certificateOpen} onOpenChange={setCertificateOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Shield className="w-4 h-4 mr-2" />
                      View Certificate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Recovery Progress Certificate</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Certificate Design */}
                      <div className="border-2 border-primary/20 rounded-lg p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <h2 className="text-2xl font-bold font-serif mb-2">Recovery Progress Certificate</h2>
                          <p className="text-muted-foreground">Blockchain-Verified Achievement</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">{mockProgressData.currentStreak}</div>
                            <p className="text-sm text-muted-foreground">Days Sober</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-secondary mb-1">
                              {mockProgressData.totalSessions}
                            </div>
                            <p className="text-sm text-muted-foreground">Therapy Sessions</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-accent mb-1">{mockProgressData.healthScore}%</div>
                            <p className="text-sm text-muted-foreground">Health Score</p>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">{totalPoints}</div>
                            <p className="text-sm text-muted-foreground">Achievement Points</p>
                          </div>
                        </div>

                        <div className="border-t pt-4 text-center">
                          <p className="text-sm text-muted-foreground mb-2">Issued to</p>
                          <p className="font-bold text-lg">silver-otter.eth</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Verified by Dr. Sarah Chen • {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-4">
                        <Button>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline">
                          <QrCode className="w-4 h-4 mr-2" />
                          QR Code
                        </Button>
                        <Button variant="outline">
                          <Share className="w-4 h-4 mr-2" />
                          Share Link
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="milestones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="health">Health Metrics</TabsTrigger>
            <TabsTrigger value="sessions">Session History</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="milestones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recovery Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                {nextMilestone && (
                  <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Next Milestone: {nextMilestone.title}</h3>
                      <Badge variant="outline">{nextMilestone.points} points</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{nextMilestone.description}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={(mockProgressData.currentStreak / 60) * 100} className="flex-1" />
                      <span className="text-sm text-muted-foreground">
                        {60 - mockProgressData.currentStreak} days to go
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {mockProgressData.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border ${
                        milestone.achieved ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-muted opacity-60"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          milestone.achieved ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {milestone.achieved ? <CheckCircle className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        {milestone.achieved && milestone.date && (
                          <p className="text-xs text-primary mt-1">
                            Achieved on {new Date(milestone.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge variant={milestone.achieved ? "default" : "outline"} className="mb-1">
                          {milestone.points} pts
                        </Badge>
                        {milestone.achieved && <p className="text-xs text-muted-foreground">Completed</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Daily Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Steps</p>
                      <p className="text-sm text-muted-foreground">
                        {mockProgressData.healthMetrics.steps.current.toLocaleString()} /{" "}
                        {mockProgressData.healthMetrics.steps.goal.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-primary/10 text-primary">{mockProgressData.healthMetrics.steps.trend}</Badge>
                      <Progress
                        value={
                          (mockProgressData.healthMetrics.steps.current / mockProgressData.healthMetrics.steps.goal) *
                          100
                        }
                        className="w-24 mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sleep</p>
                      <p className="text-sm text-muted-foreground">
                        {mockProgressData.healthMetrics.sleep.current}h / {mockProgressData.healthMetrics.sleep.goal}h
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-secondary/10 text-secondary">
                        {mockProgressData.healthMetrics.sleep.trend}
                      </Badge>
                      <Progress
                        value={
                          (mockProgressData.healthMetrics.sleep.current / mockProgressData.healthMetrics.sleep.goal) *
                          100
                        }
                        className="w-24 mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Wellness Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Heart Rate</p>
                      <p className="text-sm text-muted-foreground">
                        {mockProgressData.healthMetrics.heartRate.current} bpm avg
                      </p>
                    </div>
                    <Badge className="bg-accent/10 text-accent">{mockProgressData.healthMetrics.heartRate.trend}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mood Score</p>
                      <p className="text-sm text-muted-foreground">
                        {mockProgressData.healthMetrics.mood.current}/10 today
                      </p>
                    </div>
                    <Badge className="bg-primary/10 text-primary">{mockProgressData.healthMetrics.mood.trend}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Weekly Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Health trend charts would appear here</p>
                    <p className="text-sm">Connect health apps to see detailed analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Therapy Session History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProgressData.sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            session.completed ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium">{session.therapist}</p>
                          <p className="text-sm text-muted-foreground">{new Date(session.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.completed && <Badge className="bg-primary/10 text-primary">Completed</Badge>}
                        {session.attested && (
                          <Badge className="bg-secondary/10 text-secondary">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Health App Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Apple Health</p>
                      <p className="text-sm text-muted-foreground">Sync steps, heart rate, sleep, and activity data</p>
                    </div>
                  </div>
                  <Switch
                    checked={healthIntegrations.appleHealth}
                    onCheckedChange={(checked) => handleHealthIntegration("appleHealth", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">Google Fit</p>
                      <p className="text-sm text-muted-foreground">Track fitness activities and wellness metrics</p>
                    </div>
                  </div>
                  <Switch
                    checked={healthIntegrations.googleFit}
                    onCheckedChange={(checked) => handleHealthIntegration("googleFit", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Watch className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Fitbit</p>
                      <p className="text-sm text-muted-foreground">
                        Connect your Fitbit for comprehensive health tracking
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={healthIntegrations.fitbit}
                    onCheckedChange={(checked) => handleHealthIntegration("fitbit", checked)}
                  />
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Privacy & Security</h3>
                      <p className="text-sm text-muted-foreground">
                        Your health data is encrypted and only used to calculate your wellness scores. You control what
                        information is shared and with whom.
                      </p>
                    </div>
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
