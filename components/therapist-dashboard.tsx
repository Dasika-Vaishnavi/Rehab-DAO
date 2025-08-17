"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Calendar,
  CheckCircle,
  Star,
  Users,
  Clock,
  Award,
  Settings,
  MessageCircle,
  FileText,
} from "lucide-react"
import Link from "next/link"

export function TherapistDashboard() {
  const [todaysSessions, setTodaysSessions] = useState(3)
  const [totalSessions, setTotalSessions] = useState(127)
  const [rating, setRating] = useState(4.9)

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
              <div className="text-2xl">🩺</div>
              <div className="text-right">
                <div className="font-medium">dr-sarah-chen.eth</div>
                <div className="text-sm text-muted-foreground">Verified Therapist</div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 font-serif">Good morning, Dr. Chen!</h1>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Today's Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">{todaysSessions}</div>
                <p className="text-sm text-muted-foreground">Next: 10:00 AM</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-secondary" />
                  Total Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-secondary mb-2">{totalSessions}</div>
                <p className="text-sm text-muted-foreground">This month: 23</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-2">{rating}</div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Trust Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <Badge className="bg-primary/10 text-primary">Trusted Therapist</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <div className="grid gap-6">
              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🦋</div>
                      <div>
                        <h3 className="font-medium">silver-otter.eth</h3>
                        <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
                        <Badge variant="outline">Session 13</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Notes
                      </Button>
                      <Button>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🌟</div>
                      <div>
                        <h3 className="font-medium">bright-star.eth</h3>
                        <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                        <Badge variant="outline">Session 7</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Notes
                      </Button>
                      <Button>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🦉</div>
                      <div>
                        <h3 className="font-medium">wise-owl.eth</h3>
                        <p className="text-sm text-muted-foreground">4:00 PM - 5:00 PM</p>
                        <Badge variant="outline">Session 21</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Notes
                      </Button>
                      <Button>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming This Week */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Upcoming This Week
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">Tomorrow - 3 appointments</p>
                        <p className="text-sm text-muted-foreground">10:00 AM, 2:00 PM, 4:00 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">Wednesday - 4 appointments</p>
                        <p className="text-sm text-muted-foreground">9:00 AM, 11:00 AM, 1:00 PM, 3:00 PM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Active Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🦋</div>
                      <div>
                        <h3 className="font-medium">silver-otter.eth</h3>
                        <p className="text-sm text-muted-foreground">47-day streak • 13 sessions</p>
                        <Badge className="bg-primary/10 text-primary">Excellent Progress</Badge>
                      </div>
                    </div>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Progress
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🌟</div>
                      <div>
                        <h3 className="font-medium">bright-star.eth</h3>
                        <p className="text-sm text-muted-foreground">23-day streak • 7 sessions</p>
                        <Badge className="bg-secondary/10 text-secondary">Good Progress</Badge>
                      </div>
                    </div>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Progress
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🦉</div>
                      <div>
                        <h3 className="font-medium">wise-owl.eth</h3>
                        <p className="text-sm text-muted-foreground">89-day streak • 21 sessions</p>
                        <Badge className="bg-accent/10 text-accent">Outstanding</Badge>
                      </div>
                    </div>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Progress
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Professional Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">🩺</div>
                  <div>
                    <h2 className="text-2xl font-bold">Dr. Sarah Chen</h2>
                    <p className="text-muted-foreground">Licensed Clinical Psychologist</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-primary/10 text-primary">Verified</Badge>
                      <Badge className="bg-secondary/10 text-secondary">Trusted Therapist</Badge>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Specializations</h3>
                    <div className="space-y-2">
                      <Badge variant="outline">Addiction Recovery</Badge>
                      <Badge variant="outline">Trauma Therapy</Badge>
                      <Badge variant="outline">Cognitive Behavioral Therapy</Badge>
                      <Badge variant="outline">Mindfulness-Based Therapy</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Languages</h3>
                    <div className="space-y-2">
                      <Badge variant="outline">English</Badge>
                      <Badge variant="outline">Mandarin</Badge>
                      <Badge variant="outline">Spanish</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Experience</h3>
                  <p className="text-muted-foreground">
                    8+ years of experience in addiction recovery and mental health therapy. Specialized in helping
                    individuals overcome substance abuse through evidence-based therapeutic approaches.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Client Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">silver-otter.eth</span>
                  </div>
                  <p className="text-sm">
                    "Dr. Chen has been incredibly supportive throughout my recovery journey. Her approach is both
                    professional and compassionate."
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">wise-owl.eth</span>
                  </div>
                  <p className="text-sm">
                    "The sessions have been life-changing. Dr. Chen creates a safe space where I feel comfortable
                    sharing and working through challenges."
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                      <Star className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">bright-star.eth</span>
                  </div>
                  <p className="text-sm">
                    "Very knowledgeable and patient. The techniques learned in our sessions have been incredibly helpful
                    in my daily life."
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
