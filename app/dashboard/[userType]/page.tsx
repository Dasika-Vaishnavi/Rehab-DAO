import { UserDashboard } from "@/components/user-dashboard"
import { TherapistDashboard } from "@/components/therapist-dashboard"
import { SponsorDashboard } from "@/components/sponsor-dashboard"
import { notFound } from "next/navigation"

interface DashboardPageProps {
  params: {
    userType: string
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { userType } = params

  if (userType === "user") {
    return <UserDashboard />
  }

  if (userType === "therapist") {
    return <TherapistDashboard />
  }

  if (userType === "sponsor") {
    return <SponsorDashboard />
  }

  return notFound()
}
