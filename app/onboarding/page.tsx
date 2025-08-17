import { Suspense } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingFlow />
    </Suspense>
  )
}
