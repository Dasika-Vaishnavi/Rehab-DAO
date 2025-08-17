"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInScreen() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Rehab-DAO
          </h1>
          <p className="text-gray-600">
            Your decentralized rehabilitation community with DeFi integration
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-700 mb-6">
            Sign in to access the community and DeFi features.
          </p>
          
          <div className="flex justify-center">
            <Link href="/onboarding">
              <Button size="lg">
                Get Started
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </main>
  );
}
