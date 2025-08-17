"use client";

import { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle, User, Hash } from 'lucide-react';
import { ENS_CONFIG, ENS_REGISTRY_ABI, ENS_UTILS } from '@/lib/ens-config';

interface AssignSubdomainProps {
  parentDomain?: string;
  isManager?: boolean;
}

export default function AssignSubdomain({ 
  parentDomain = ENS_CONFIG.parentDomain,
  isManager = false 
}: AssignSubdomainProps) {
  const [subdomain, setSubdomain] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Validate Ethereum address
  const isValidAddress = (addr: string): boolean => {
    return ethers.isAddress(addr);
  };

  // Validate subdomain format
  const isValidSubdomain = (sub: string): boolean => {
    const subdomainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
    return subdomainRegex.test(sub) && sub.length >= 3 && sub.length <= 63;
  };

  async function assignSubdomain() {
    if (!window.ethereum) {
      setStatus('error');
      setMessage('MetaMask or other wallet not found. Please install a wallet extension.');
      return;
    }

    if (!isValidSubdomain(subdomain)) {
      setStatus('error');
      setMessage('Invalid subdomain format. Use 3-63 characters, lowercase letters, numbers, and hyphens only.');
      return;
    }

    if (!isValidAddress(address)) {
      setStatus('error');
      setMessage('Invalid Ethereum address format.');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Check if user is connected to the right network
      const network = await provider.getNetwork();
      if (network.chainId !== BigInt(1)) { // Mainnet
        setStatus('error');
        setMessage('Please connect to Ethereum Mainnet to manage ENS domains.');
        return;
      }

      // Create ENS contract instance
      const ens = new ethers.Contract(
        ENS_CONFIG.ensRegistryAddress,
        ENS_REGISTRY_ABI,
        signer
      );

      // Hash parent and subdomain
      const parentNode = ENS_UTILS.namehash(parentDomain);
      const labelhash = ENS_UTILS.labelhash(subdomain);

      // Check if subdomain already exists
      try {
        const currentOwner = await ens.owner(ENS_UTILS.namehash(`${subdomain}.${parentDomain}`));
        if (currentOwner !== ethers.ZeroAddress) {
          setStatus('error');
          setMessage('This subdomain already exists and is owned by another address.');
          return;
        }
      } catch (error) {
        // Subdomain doesn't exist, which is what we want
      }

      // Assign ownership of subdomain to user's address
      const tx = await ens.setSubnodeOwner(parentNode, labelhash, address);
      
      setMessage(`Transaction submitted! Hash: ${tx.hash}`);
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      
      setStatus('success');
      setMessage(`Subdomain ${subdomain}.${parentDomain} successfully assigned to ${address}!`);
      
      // Clear form
      setSubdomain('');
      setAddress('');
      
    } catch (error: any) {
      console.error('Error assigning subdomain:', error);
      setStatus('error');
      setMessage(error.message || 'Failed to assign subdomain. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!isManager) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            ENS Subdomain Management
          </CardTitle>
          <CardDescription>
            Manager access required to assign ENS subdomains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Only authorized managers can assign ENS subdomains to users.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5" />
          Assign ENS Subdomain
        </CardTitle>
        <CardDescription>
          Create and assign a subdomain under {parentDomain} to a user's address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subdomain Input */}
        <div className="space-y-2">
          <Label htmlFor="subdomain">Subdomain</Label>
          <div className="flex items-center gap-2">
            <Input
              id="subdomain"
              placeholder="e.g., alice"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
              className="flex-1"
            />
            <Badge variant="outline" className="text-sm">
              .{parentDomain}
            </Badge>
          </div>
          {subdomain && !isValidSubdomain(subdomain) && (
            <p className="text-sm text-red-600">
              Invalid subdomain format. Use 3-63 characters, lowercase letters, numbers, and hyphens only.
            </p>
          )}
        </div>

        {/* Address Input */}
        <div className="space-y-2">
          <Label htmlFor="address">User's Ethereum Address</Label>
          <Input
            id="address"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {address && !isValidAddress(address) && (
            <p className="text-sm text-red-600">
              Invalid Ethereum address format.
            </p>
          )}
        </div>

        {/* Preview */}
        {subdomain && address && isValidSubdomain(subdomain) && isValidAddress(address) && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="space-y-1 text-sm">
              <div><strong>Subdomain:</strong> {subdomain}.{parentDomain}</div>
              <div><strong>Owner:</strong> {address}</div>
              <div><strong>Network:</strong> Ethereum Mainnet</div>
            </div>
          </div>
        )}

        {/* Status Message */}
        {message && (
          <div className={`p-4 rounded-lg ${
            status === 'success' ? 'bg-green-50 border border-green-200' :
            status === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-center gap-2">
              {status === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
              {status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
              <p className={`text-sm ${
                status === 'success' ? 'text-green-700' :
                status === 'error' ? 'text-red-700' :
                'text-blue-700'
              }`}>
                {message}
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={assignSubdomain}
          disabled={isLoading || !subdomain || !address || !isValidSubdomain(subdomain) || !isValidAddress(address)}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Assigning Subdomain...
            </>
          ) : (
            <>
              <User className="w-4 h-4 mr-2" />
              Assign Subdomain
            </>
          )}
        </Button>

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-2">
          <p><strong>Instructions:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Connect your wallet to Ethereum Mainnet</li>
            <li>Ensure you have sufficient ETH for gas fees</li>
            <li>User must set the subdomain as their primary name via ENS app</li>
            <li>Subdomain will be permanently assigned to the specified address</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
