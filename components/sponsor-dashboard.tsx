"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  HandHeart,
  DollarSign,
  Users,
  TrendingUp,
  Award,
  Settings,
  MessageCircle,
  Plus,
  Download,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export function SponsorDashboard() {
  const [totalDonated, setTotalDonated] = useState(2450)
  const [sessionsFunded, setSessionsFunded] = useState(18)
  const [peopleHelped, setPeopleHelped] = useState(7)

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
              <div className="text-2xl">💎</div>
              <div className="text-right">
                <div className="font-medium">generous-heart.eth</div>
                <div className="text-sm text-muted-foreground">Gold Sponsor</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Impact Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 font-serif">Your Impact Dashboard</h1>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Total Donated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">${totalDonated}</div>
                <p className="text-sm text-muted-foreground">This year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  Sessions Funded
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">{sessionsFunded}</div>
                <p className="text-sm text-muted-foreground">Across all sponsees</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  People Helped
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-2">{peopleHelped}</div>
                <p className="text-sm text-muted-foreground">Active sponsorships</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Impact Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">94%</div>
                <Badge className="bg-primary/10 text-primary">Gold Sponsor</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Button className="h-20 flex-col gap-2">
              <Plus className="w-6 h-6" />
              <span>Sponsor Someone</span>
            </Button>
            <Button variant="secondary" className="h-20 flex-col gap-2">
              <DollarSign className="w-6 h-6" />
              <span>Donate to Pool</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <MessageCircle className="w-6 h-6" />
              <span>Message Sponsees</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Download className="w-6 h-6" />
              <span>Tax Documents</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="sponsorships" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sponsorships">My Sponsorships</TabsTrigger>
            <TabsTrigger value="impact">Impact Timeline</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="sponsorships" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HandHeart className="w-5 h-5" />
                  Active Sponsorships
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🦋</div>
                    <div>
                      <h3 className="font-medium">silver-otter.eth</h3>
                      <p className="text-sm text-muted-foreground">47-day streak • 5 sessions funded</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={78} className="w-24" />
                        <span className="text-xs text-muted-foreground">78% to next milestone</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm">Fund Session</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🌟</div>
                    <div>
                      <h3 className="font-medium">bright-star.eth</h3>
                      <p className="text-sm text-muted-foreground">23-day streak • 3 sessions funded</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={45} className="w-24" />
                        <span className="text-xs text-muted-foreground">45% to next milestone</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm">Fund Session</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🦉</div>
                    <div>
                      <h3 className="font-medium">wise-owl.eth</h3>
                      <p className="text-sm text-muted-foreground">89-day streak • 10 sessions funded</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={92} className="w-24" />
                        <span className="text-xs text-muted-foreground">92% to next milestone</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm">Fund Session</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pool Contributions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Community Pool Contributions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                  <div>
                    <h3 className="font-medium">General Recovery Fund</h3>
                    <p className="text-sm text-muted-foreground">$500 contributed • Helped 12 people</p>
                  </div>
                  <Button variant="outline">Add More</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Your Impact Over Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">silver-otter.eth reached 45 days!</h3>
                    <span className="text-sm text-muted-foreground">3 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Your sponsorship helped them reach this milestone</p>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Funded therapy session for bright-star.eth</h3>
                    <span className="text-sm text-muted-foreground">1 week ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Session completed successfully</p>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">wise-owl.eth completed 20 sessions</h3>
                    <span className="text-sm text-muted-foreground">2 weeks ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Major milestone achieved with your support</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Community pool helped 3 new members</h3>
                    <span className="text-sm text-muted-foreground">3 weeks ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Your contribution made this possible</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discover">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  People Seeking Sponsorship
                </CardTitle>
                <CardDescription>Anonymous profiles of individuals who could benefit from your support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🌸</div>
                    <div>
                      <h3 className="font-medium">gentle-deer.eth</h3>
                      <p className="text-sm text-muted-foreground">12-day streak • Seeking therapy support</p>
                      <Badge variant="outline" className="mt-1">
                        New to recovery
                      </Badge>
                    </div>
                  </div>
                  <Button>Sponsor</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🍀</div>
                    <div>
                      <h3 className="font-medium">lucky-clover.eth</h3>
                      <p className="text-sm text-muted-foreground">34-day streak • Needs session funding</p>
                      <Badge variant="outline" className="mt-1">
                        Making progress
                      </Badge>
                    </div>
                  </div>
                  <Button>Sponsor</Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🌊</div>
                    <div>
                      <h3 className="font-medium">calm-river.eth</h3>
                      <p className="text-sm text-muted-foreground">8-day streak • Starting recovery journey</p>
                      <Badge variant="outline" className="mt-1">
                        Needs support
                      </Badge>
                    </div>
                  </div>
                  <Button>Sponsor</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Your Sponsor Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">🥇</div>
                    <h3 className="font-medium">Gold Sponsor</h3>
                    <p className="text-sm text-muted-foreground">$2000+ donated</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">🤝</div>
                    <h3 className="font-medium">Community Builder</h3>
                    <p className="text-sm text-muted-foreground">Helped 5+ people</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">⭐</div>
                    <h3 className="font-medium">Milestone Maker</h3>
                    <p className="text-sm text-muted-foreground">Sponsored 10+ milestones</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">💎</div>
                    <h3 className="font-medium">Consistent Supporter</h3>
                    <p className="text-sm text-muted-foreground">6 months active</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-4xl mb-2">🎯</div>
                    <h3 className="font-medium">Impact Champion</h3>
                    <p className="text-sm text-muted-foreground">High success rate</p>
                  </div>

                  <div className="text-center p-4 border rounded-lg opacity-50">
                    <div className="text-4xl mb-2">🏆</div>
                    <h3 className="font-medium">Platinum Sponsor</h3>
                    <p className="text-sm text-muted-foreground">$5000+ donated</p>
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
