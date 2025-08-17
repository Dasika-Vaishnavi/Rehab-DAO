"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Shield,
  Wallet,
  User,
  Stethoscope,
  HandHeart,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

type UserType = "user" | "therapist" | "sponsor" | null
type OnboardingStep = "user-type" | "wallet-connect" | "pseudonym" | "avatar" | "welcome" | "complete"

const avatarOptions = ["🦋", "🌟", "🌙", "🌸", "🍀", "🌊", "🔥", "⭐", "🌈", "🦉", "🐝", "🌺"]

const pseudonymSuggestions = [
  "silver-otter",
  "golden-phoenix",
  "wise-owl",
  "brave-lion",
  "gentle-deer",
  "strong-oak",
  "bright-star",
  "calm-river",
  "free-bird",
  "peaceful-moon",
]

export function OnboardingFlow() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("user-type")
  const [userType, setUserType] = useState<UserType>(null)
  const [pseudonym, setPseudonym] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)

  useEffect(() => {
    const typeParam = searchParams.get("type") as UserType
    if (typeParam && ["user", "therapist", "sponsor"].includes(typeParam)) {
      setUserType(typeParam)
      setCurrentStep("wallet-connect")
    }
  }, [searchParams])

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type)
    setCurrentStep("wallet-connect")
  }

  const handleWalletConnect = () => {
    // Simulate wallet connection
    setWalletConnected(true)
    setCurrentStep("pseudonym")
  }

  const generateRandomPseudonym = () => {
    const randomIndex = Math.floor(Math.random() * pseudonymSuggestions.length)
    setPseudonym(pseudonymSuggestions[randomIndex] + ".eth")
  }

  const handlePseudonymNext = () => {
    if (pseudonym) {
      setCurrentStep("avatar")
    }
  }

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar)
    setCurrentStep("welcome")
  }

  const getUserTypeInfo = (type: UserType) => {
    switch (type) {
      case "user":
        return {
          icon: User,
          title: "Recovering User",
          description: "Get support, track progress, and connect with therapists and sponsors",
          color: "text-primary",
        }
      case "therapist":
        return {
          icon: Stethoscope,
          title: "Therapist",
          description: "Provide professional support and verify recovery milestones",
          color: "text-secondary",
        }
      case "sponsor":
        return {
          icon: HandHeart,
          title: "Sponsor",
          description: "Support others' recovery journeys through funding and encouragement",
          color: "text-accent",
        }
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-serif">REHAB DAO</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            Step{" "}
            {currentStep === "user-type"
              ? 1
              : currentStep === "wallet-connect"
                ? 2
                : currentStep === "pseudonym"
                  ? 3
                  : currentStep === "avatar"
                    ? 4
                    : 5}{" "}
            of 5
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* User Type Selection */}
        {currentStep === "user-type" && (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 font-serif">Welcome to REHAB DAO</h1>
            <p className="text-muted-foreground mb-12 text-lg">
              Choose your role to get started with your personalized experience
            </p>

            <div className="grid gap-6">
              <Card
                className="cursor-pointer hover:border-primary/50 transition-colors border-2"
                onClick={() => handleUserTypeSelect("user")}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif">Get Help</CardTitle>
                  <CardDescription className="text-base">
                    For people in recovery seeking support, progress tracking, and community connection
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card
                className="cursor-pointer hover:border-secondary/50 transition-colors border-2"
                onClick={() => handleUserTypeSelect("therapist")}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="w-8 h-8 text-secondary" />
                  </div>
                  <CardTitle className="text-xl font-serif">I'm a Therapist</CardTitle>
                  <CardDescription className="text-base">
                    Provide professional support and verify recovery milestones for your clients
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card
                className="cursor-pointer hover:border-accent/50 transition-colors border-2"
                onClick={() => handleUserTypeSelect("sponsor")}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HandHeart className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-serif">Become a Sponsor</CardTitle>
                  <CardDescription className="text-base">
                    Support others' recovery journeys through funding and encouragement
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {/* Wallet Connection */}
        {currentStep === "wallet-connect" && userType && (
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Wallet className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4 font-serif">Connect Your Wallet</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Your wallet ensures privacy and security. We'll never store your personal information.
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground mb-4">
                  Wallet connection has been bypassed for this demo. Click continue to proceed.
                </p>
                <Button size="lg" className="w-full text-lg py-6" onClick={handleWalletConnect}>
                  <CheckCircle className="mr-2 w-5 h-5" />
                  Continue Without Wallet
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Your privacy is protected by blockchain technology</span>
            </div>
          </div>
        )}

        {/* Pseudonym Selection */}
        {currentStep === "pseudonym" && (
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <User className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="text-3xl font-bold mb-4 font-serif">Choose Your Identity</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Pick a pseudonym that represents you. This keeps your real identity private.
            </p>

            <div className="space-y-6">
              <div>
                <Label htmlFor="pseudonym" className="text-base font-medium">
                  Your Pseudonym
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="pseudonym"
                    value={pseudonym}
                    onChange={(e) => setPseudonym(e.target.value)}
                    placeholder="Enter your pseudonym"
                    className="text-lg py-6"
                  />
                  <Button variant="outline" onClick={generateRandomPseudonym} className="px-6 py-6 bg-transparent">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">Or choose from suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {pseudonymSuggestions.slice(0, 6).map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary/10 px-3 py-1"
                      onClick={() => setPseudonym(suggestion + ".eth")}
                    >
                      {suggestion}.eth
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button variant="outline" onClick={() => setCurrentStep("wallet-connect")} className="flex-1">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handlePseudonymNext} disabled={!pseudonym} className="flex-1">
                  Next
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Avatar Selection */}
        {currentStep === "avatar" && (
          <div className="text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl font-bold mb-4 font-serif">Pick Your Avatar</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              Choose a symbol that represents your journey and personality.
            </p>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {avatarOptions.map((avatar) => (
                <Card
                  key={avatar}
                  className={`cursor-pointer hover:border-primary/50 transition-colors border-2 ${
                    selectedAvatar === avatar ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{avatar}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setCurrentStep("pseudonym")} className="flex-1">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Welcome Screen */}
        {currentStep === "welcome" && userType && (
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="text-4xl">{selectedAvatar}</div>
            </div>
            <h1 className="text-3xl font-bold mb-4 font-serif">Welcome, {pseudonym}!</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              You're all set up as a {getUserTypeInfo(userType)?.title}. Let's get you started on your journey.
            </p>

            <Card className="text-left mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Getting Started Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userType === "user" && (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Explore Your Dashboard</h3>
                        <p className="text-sm text-muted-foreground">
                          Track your progress and see your recovery journey
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Find a Therapist</h3>
                        <p className="text-sm text-muted-foreground">
                          Browse verified therapists and book your first session
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Join the Community</h3>
                        <p className="text-sm text-muted-foreground">Connect with others on similar journeys</p>
                      </div>
                    </div>
                  </>
                )}
                {userType === "therapist" && (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-secondary">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Set Up Your Profile</h3>
                        <p className="text-sm text-muted-foreground">Add your specializations and availability</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-secondary">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Connect Your Calendar</h3>
                        <p className="text-sm text-muted-foreground">
                          Sync with Google Calendar or Calendly for bookings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-secondary">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Start Helping</h3>
                        <p className="text-sm text-muted-foreground">
                          Begin accepting appointments and supporting recovery
                        </p>
                      </div>
                    </div>
                  </>
                )}
                {userType === "sponsor" && (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-accent">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Fund Your Impact</h3>
                        <p className="text-sm text-muted-foreground">Add funds to sponsor therapy sessions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-accent">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Choose Who to Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Browse anonymous profiles and sponsor individuals
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-accent">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Track Your Impact</h3>
                        <p className="text-sm text-muted-foreground">See the progress of those you're supporting</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Link href={`/dashboard/${userType}`}>
              <Button size="lg" className="text-lg px-8 py-6">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
