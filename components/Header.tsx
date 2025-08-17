"use client";

import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">Rehab-DAO</h1>
          <div className="text-sm text-gray-600">
            Welcome to Rehab-DAO
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="secondary" 
            className="text-gray-600 hover:text-gray-700"
          >
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
