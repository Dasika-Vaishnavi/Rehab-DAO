"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star, MapPin, Clock, Filter, Search, Stethoscope } from "lucide-react"
import Link from "next/link"

const mockTherapists = [
  {
    id: "dr-sarah-chen",
    name: "Dr. Sarah Chen",
    pseudonym: "dr-sarah-chen.eth",
    avatar: "🩺",
    rating: 4.9,
    reviewCount: 47,
    specializations: ["Addiction Recovery", "Trauma Therapy", "CBT"],
    languages: ["English", "Mandarin", "Spanish"],
    experience: "8+ years",
    location: "Virtual Sessions",
    verified: true,
    availability: "Available Today",
    sessionPrice: 120,
    bio: "Specialized in addiction recovery with evidence-based approaches.",
  },
  {
    id: "dr-michael-rodriguez",
    name: "Dr. Michael Rodriguez",
    pseudonym: "dr-michael-rodriguez.eth",
    avatar: "🧠",
    rating: 4.8,
    reviewCount: 32,
    specializations: ["Substance Abuse", "Family Therapy", "Mindfulness"],
    languages: ["English", "Spanish"],
    experience: "12+ years",
    location: "Virtual Sessions",
    verified: true,
    availability: "Available Tomorrow",
    sessionPrice: 150,
    bio: "Helping individuals and families overcome addiction challenges.",
  },
  {
    id: "dr-emily-johnson",
    name: "Dr. Emily Johnson",
    pseudonym: "dr-emily-johnson.eth",
    avatar: "💚",
    rating: 4.7,
    reviewCount: 28,
    specializations: ["Recovery Coaching", "PTSD", "Group Therapy"],
    languages: ["English", "French"],
    experience: "6+ years",
    location: "Virtual Sessions",
    verified: true,
    availability: "Available This Week",
    sessionPrice: 100,
    bio: "Compassionate approach to recovery and mental wellness.",
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    pseudonym: "dr-james-wilson.eth",
    avatar: "🌟",
    rating: 4.9,
    reviewCount: 56,
    specializations: ["Addiction Medicine", "Dual Diagnosis", "Relapse Prevention"],
    languages: ["English"],
    experience: "15+ years",
    location: "Virtual Sessions",
    verified: true,
    availability: "Available Next Week",
    sessionPrice: 180,
    bio: "Expert in complex addiction cases and dual diagnosis treatment.",
  },
]

export function TherapistBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const specialties = [
    "Addiction Recovery",
    "Trauma Therapy",
    "CBT",
    "Substance Abuse",
    "Family Therapy",
    "Mindfulness",
    "Recovery Coaching",
    "PTSD",
    "Group Therapy",
    "Addiction Medicine",
    "Dual Diagnosis",
    "Relapse Prevention",
  ]

  const languages = ["English", "Spanish", "Mandarin", "French"]

  const filteredTherapists = mockTherapists.filter((therapist) => {
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      therapist.specializations.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSpecialty = selectedSpecialty === "all" || therapist.specializations.includes(selectedSpecialty)

    const matchesLanguage = selectedLanguage === "all" || therapist.languages.includes(selectedLanguage)

    return matchesSearch && matchesSpecialty && matchesLanguage
  })

  const sortedTherapists = [...filteredTherapists].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "experience":
        return Number.parseInt(b.experience) - Number.parseInt(a.experience)
      case "price-low":
        return a.sessionPrice - b.sessionPrice
      case "price-high":
        return b.sessionPrice - a.sessionPrice
      default:
        return 0
    }
  })

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
          <Link href="/dashboard/user">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 font-serif">Find Your Therapist</h1>
          <p className="text-muted-foreground text-lg">
            Connect with verified therapists who specialize in addiction recovery and mental health support.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="experience">Most Experience</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-muted-foreground flex items-center">
              {sortedTherapists.length} therapists found
            </div>
          </div>
        </div>

        {/* Therapist Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTherapists.map((therapist) => (
            <Card key={therapist.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{therapist.avatar}</div>
                    <div>
                      <CardTitle className="text-lg">{therapist.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{therapist.pseudonym}</p>
                      {therapist.verified && <Badge className="mt-1 bg-primary/10 text-primary">Verified</Badge>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{therapist.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">({therapist.reviewCount} reviews)</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{therapist.bio}</p>

                <div>
                  <h4 className="font-medium text-sm mb-2">Specializations</h4>
                  <div className="flex flex-wrap gap-1">
                    {therapist.specializations.slice(0, 3).map((spec) => (
                      <Badge key={spec} variant="outline" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                    {therapist.specializations.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{therapist.specializations.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{therapist.experience}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{therapist.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Languages: {therapist.languages.join(", ")}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Session</p>
                    <p className="font-semibold">${therapist.sessionPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary font-medium">{therapist.availability}</p>
                    <Link href={`/therapists/${therapist.id}`}>
                      <Button size="sm" className="mt-1">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedTherapists.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No therapists found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
