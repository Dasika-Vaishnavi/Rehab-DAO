"use client";

import { useState } from "react";
import SignInScreen from "./SignInScreen";
import SignedInScreen from "./SignedInScreen";

export default function ClientApp() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Rehab-DAO...</p>
        </div>
      </div>
    );
  }

  return isSignedIn ? <SignedInScreen /> : <SignInScreen />;
}
