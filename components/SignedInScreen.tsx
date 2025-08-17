"use client";

import Transaction from "./Transaction";
import UserBalance from "./UserBalance";
import Header from "./Header";

export default function SignedInScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Rehab-DAO
          </h1>
          <p className="text-gray-600">
            Manage your wallet, send transactions, and explore DeFi features.
          </p>
        </div>
        
        <div className="grid gap-6">
          <UserBalance />
          <Transaction />
        </div>
        
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🚀 What's Next?
          </h3>
          <div className="text-blue-800 space-y-2">
            <p>• Connect with the rehabilitation community</p>
            <p>• Access DeFi lending and borrowing features</p>
            <p>• Earn rewards for community participation</p>
            <p>• Manage your recovery journey with blockchain technology</p>
          </div>
        </div>
      </main>
    </div>
  );
}
