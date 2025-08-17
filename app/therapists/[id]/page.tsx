import { TherapistProfile } from "@/components/therapist-profile"

interface TherapistProfilePageProps {
  params: {
    id: string
  }
}

export default function TherapistProfilePage({ params }: TherapistProfilePageProps) {
  return <TherapistProfile therapistId={params.id} />
}
