// "use client";

// import { useSendEvmTransaction, useEvmAddress } from "@coinbase/cdp-hooks";
// import { Button } from "@coinbase/cdp-react/components/Button";
// import { useCallback, useState } from "react";

// export default function Transaction() {
//   const { sendEvmTransaction } = useSendEvmTransaction();
//   const { evmAddress } = useEvmAddress();
//   const [isPending, setIsPending] = useState(false);
//   const [transactionHash, setTransactionHash] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSendTransaction = useCallback(async () => {
//     if (!evmAddress) {
//       setError("No wallet address available");
//       return;
//     }

//     setIsPending(true);
//     setError(null);
//     setTransactionHash(null);

//     try {
//       // Sending a small test transaction to your own wallet address
//       const { transactionHash } = await sendEvmTransaction({
//         transaction: {
//           to: evmAddress,
//           value: BigInt(1e12), // 0.000001 ETH in wei
//           gas: BigInt(21000),
//           chainId: 84532, // Base Sepolia testnet
//           type: "eip1559",
//         },
//         evmAccount: evmAddress,
//         network: "base-sepolia",
//       });

//       setTransactionHash(transactionHash || null);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Transaction failed");
//     } finally {
//       setIsPending(false);
//     }
//   }, [evmAddress, sendEvmTransaction]);

//   const resetTransaction = () => {
//     setTransactionHash(null);
//     setError(null);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-6">
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">
//         Send Test Transaction
//       </h2>
      
//       <div className="space-y-4">
//         <p className="text-gray-600 text-sm">
//           Send a small test transaction to your own wallet address to verify the setup.
//         </p>
        
//         <div className="flex space-x-3">
//           <Button 
//             onClick={handleSendTransaction} 
//             isPending={isPending}
//             disabled={!evmAddress || isPending}
//             className="bg-blue-600 hover:bg-blue-700"
//           >
//             {isPending ? "Sending..." : "Send Test Transaction"}
//           </Button>
          
//           {transactionHash && (
//             <Button 
//               onClick={resetTransaction}
//               variant="secondary"
//               className="text-gray-600"
//             >
//               Reset
//             </Button>
//           )}
//         </div>
        
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//             <p className="text-red-700 text-sm">
//               Error: {error}
//             </p>
//           </div>
//         )}
        
//         {transactionHash && (
//           <div className="bg-green-50 border border-green-200 rounded-lg p-3">
//             <p className="text-green-700 text-sm font-medium">
//               Transaction Sent Successfully!
//             </p>
//             <p className="text-green-600 text-xs mt-1 font-mono break-all">
//               Hash: {transactionHash}
//             </p>
//             <a 
//               href={`https://sepolia.basescan.org/tx/${transactionHash}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-green-600 text-xs hover:underline mt-2 inline-block"
//             >
//               View on BaseScan →
//             </a>
//           </div>
//         )}
        
//         <div className="text-xs text-gray-500">
//           <p>• Transaction amount: 0.000001 ETH</p>
//           <p>• Network: Base Sepolia Testnet</p>
//           <p>• Gas limit: 21,000 wei</p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Transaction() {
  const [isPending, setIsPending] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendTransaction = useCallback(async () => {
    setIsPending(true);
    setError(null);
    setTransactionHash(null);

    try {
      // Mock transaction for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTransactionHash("0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setIsPending(false);
    }
  }, []);

  const resetTransaction = () => {
    setTransactionHash(null);
    setError(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Send Test Transaction
      </h2>
      
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">
          Send a small test transaction to your own wallet address to verify the setup.
        </p>
        
        <div className="flex space-x-3">
          <Button 
            onClick={handleSendTransaction} 
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? "Sending..." : "Send Test Transaction"}
          </Button>
          
          {transactionHash && (
            <Button 
              onClick={resetTransaction}
              variant="outline"
              className="text-gray-600"
            >
              Reset
            </Button>
          )}
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm">
              Error: {error}
            </p>
          </div>
        )}
        
        {transactionHash && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 text-sm font-medium">
              Transaction Sent Successfully!
            </p>
            <p className="text-green-600 text-xs mt-1 font-mono break-all">
              Hash: {transactionHash}
            </p>
            <a 
              href={`https://sepolia.basescan.org/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 text-xs hover:underline mt-2 inline-block"
            >
              View on BaseScan →
            </a>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>• Transaction amount: 0.000001 ETH</p>
          <p>• Network: Base Sepolia Testnet</p>
          <p>• Gas limit: 21,000 wei</p>
        </div>
      </div>
    </div>
  );
}