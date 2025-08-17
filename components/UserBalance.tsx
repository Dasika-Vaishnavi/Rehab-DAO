"use client";

import { useEvmBalance } from "@coinbase/cdp-hooks";

export default function UserBalance() {
  const { balance, isLoading, error } = useEvmBalance();

  const formatBalance = (balance: bigint | null) => {
    if (!balance) return "0";
    // Convert from wei to ETH (assuming 18 decimals)
    const ethBalance = Number(balance) / 1e18;
    return ethBalance.toFixed(6);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-700 text-sm">
          Error loading balance: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Wallet Balance
      </h2>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">ETH Balance:</span>
          <span className="font-mono font-medium">
            {isLoading ? (
              <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
            ) : (
              `${formatBalance(balance)} ETH`
            )}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Network:</span>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Base Sepolia (Testnet)
          </span>
        </div>
        
        {isLoading && (
          <div className="text-sm text-gray-500 text-center">
            Loading balance...
          </div>
        )}
      </div>
    </div>
  );
}
