"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Star,
  MapPin,
  Clock,
  CalendarIcon,
  MessageCircle,
  Award,
  ArrowLeft,
  CheckCircle,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

interface TherapistProfileProps {
  therapistId: string
}

const mockTherapist = {
  id: "dr-sarah-chen",
  name: "Dr. Sarah Chen",
  pseudonym: "dr-sarah-chen.eth",
  avatar: "🩺",
  rating: 4.9,
  reviewCount: 47,
  specializations: ["Addiction Recovery", "Trauma Therapy", "CBT", "Mindfulness-Based Therapy"],
  languages: ["English", "Mandarin", "Spanish"],
  experience: "8+ years",
  location: "Virtual Sessions",
  verified: true,
  sessionPrice: 120,
  bio: "Dr. Sarah Chen is a licensed clinical psychologist with over 8 years of experience specializing in addiction recovery and trauma therapy. She uses evidence-based approaches including Cognitive Behavioral Therapy and mindfulness techniques to help individuals overcome substance abuse and build lasting recovery habits.",
  education: ["Ph.D. Clinical Psychology - Stanford University", "M.A. Psychology - UC Berkeley"],
  certifications: [
    "Licensed Clinical Psychologist",
    "Certified Addiction Counselor",
    "Trauma-Informed Care Specialist",
  ],
  availableSlots: [
    { date: "2025-01-17", time: "10:00 AM", available: true },
    { date: "2025-01-17", time: "2:00 PM", available: true },
    { date: "2025-01-17", time: "4:00 PM", available: false },
    { date: "2025-01-18", time: "9:00 AM", available: true },
    { date: "2025-01-18", time: "11:00 AM", available: true },
    { date: "2025-01-18", time: "3:00 PM", available: true },
  ],
  reviews: [
    {
      id: 1,
      author: "silver-otter.eth",
      rating: 5,
      date: "2 weeks ago",
      content:
        "Dr. Chen has been incredibly supportive throughout my recovery journey. Her approach is both professional and compassionate, and I always feel heard and understood.",
    },
    {
      id: 2,
      author: "wise-owl.eth",
      rating: 5,
      date: "1 month ago",
      content:
        "The sessions have been life-changing. Dr. Chen creates a safe space where I feel comfortable sharing and working through challenges. Highly recommend!",
    },
    {
      id: 3,
      author: "bright-star.eth",
      rating: 4,
      date: "2 months ago",
      content:
        "Very knowledgeable and patient. The techniques learned in our sessions have been incredibly helpful in my daily life and recovery process.",
    },
  ],
}

export function TherapistProfile({ therapistId }: TherapistProfileProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [bookingOpen, setBookingOpen] = useState(false)
  const [sponsorshipRequested, setSponsorshipRequested] = useState(false)

  const therapist = mockTherapist // In real app, fetch by therapistId

  const availableTimes = therapist.availableSlots
    .filter((slot) => {
      if (!selectedDate) return false
      const slotDate = new Date(slot.date)
      return slotDate.toDateString() === selectedDate.toDateString() && slot.available
    })
    .map((slot) => slot.time)

  const handleBookSession = () => {
    // Handle booking logic
    console.log("Booking session for", selectedDate, "at", selectedTime)
    setBookingOpen(false)
  }

  const handleRequestSponsorship = () => {
    setSponsorshipRequested(true)
    // Handle sponsorship request logic
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
          <Link href="/therapists">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Therapists
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Therapist Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{therapist.avatar}</div>
                  <div>
                    <h1 className="text-3xl font-bold font-serif">{therapist.name}</h1>
                    <p className="text-muted-foreground text-lg">{therapist.pseudonym}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {therapist.verified && <Badge className="bg-primary/10 text-primary">Verified Therapist</Badge>}
                      <Badge className="bg-secondary/10 text-secondary">Licensed</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex-1 md:text-right space-y-2">
                  <div className="flex items-center gap-1 md:justify-end">
                    <Star className="w-5 h-5 fill-accent text-accent" />
                    <span className="font-bold text-xl">{therapist.rating}</span>
                    <span className="text-muted-foreground">({therapist.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-4 md:justify-end text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{therapist.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{therapist.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 md:justify-end">
                    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                      <DialogTrigger asChild>
                        <Button size="lg">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Book Session - ${therapist.sessionPrice}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Book a Session</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Select Date</label>
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="rounded-md border"
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                          {selectedDate && availableTimes.length > 0 && (
                            <div>
                              <label className="text-sm font-medium mb-2 block">Select Time</label>
                              <Select value={selectedTime} onValueChange={setSelectedTime}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableTimes.map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          <div className="border-t pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <span>Session Cost:</span>
                              <span className="font-bold">${therapist.sessionPrice}</span>
                            </div>
                            <div className="space-y-2">
                              <Button onClick={handleBookSession} disabled={!selectedTime} className="w-full">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Confirm Booking
                              </Button>
                              <Button
                                variant="outline"
                                onClick={handleRequestSponsorship}
                                disabled={sponsorshipRequested}
                                className="w-full bg-transparent"
                              >
                                <DollarSign className="w-4 h-4 mr-2" />
                                {sponsorshipRequested ? "Sponsorship Requested" : "Request Sponsorship"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="specializations">Specializations</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Dr. Chen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{therapist.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {therapist.languages.map((language) => (
                      <Badge key={language} variant="outline">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {therapist.education.map((edu, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span className="text-sm">{edu}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {therapist.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="specializations">
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {therapist.specializations.map((specialization) => (
                    <div key={specialization} className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">{specialization}</h3>
                      <p className="text-sm text-muted-foreground">
                        Specialized training and extensive experience in {specialization.toLowerCase()}.
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  Client Reviews ({therapist.reviewCount})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {therapist.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating ? "fill-accent text-accent" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{review.author}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-4">This Week</h3>
                    <div className="space-y-2">
                      {therapist.availableSlots
                        .filter((slot) => slot.available)
                        .slice(0, 6)
                        .map((slot, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{new Date(slot.date).toLocaleDateString()}</p>
                              <p className="text-sm text-muted-foreground">{slot.time}</p>
                            </div>
                            <Button size="sm">Book</Button>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Session Information</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">Session Duration</h4>
                        <p className="text-sm text-muted-foreground">60 minutes</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">Session Format</h4>
                        <p className="text-sm text-muted-foreground">Virtual via secure video call</p>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">Cancellation Policy</h4>
                        <p className="text-sm text-muted-foreground">24-hour notice required</p>
                      </div>
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
