"use client";

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Hash, 
  User, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { ENS_CONFIG, ENS_UTILS, REVERSE_REGISTRAR_ABI } from '@/lib/ens-config';

interface UserENSInfoProps {
  userAddress?: string;
  isManager?: boolean;
}

export function UserENSInfo({ userAddress, isManager = false }: UserENSInfoProps) {
  const [address, setAddress] = useState(userAddress || '');
  const [ensName, setEnsName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingPrimary, setIsSettingPrimary] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Check if ENS name is a subdomain of our parent domain
  const isRehabDAOSubdomain = ensName ? ENS_UTILS.isSubdomain(ensName) : false;
  const subdomain = ensName ? ENS_UTILS.getSubdomain(ensName) : null;

  // Fetch ENS name for an address
  const fetchENSName = async (addr: string) => {
    if (!addr || !ethers.isAddress(addr)) return;
    
    setIsLoading(true);
    try {
      const provider = new ethers.JsonRpcProvider('https://mainnet.infura.io/v3/your-project-id');
      const ensName = await provider.lookupAddress(addr);
      setEnsName(ensName);
    } catch (error) {
      console.error('Error fetching ENS name:', error);
      setEnsName(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Set ENS name as primary
  const setAsPrimaryName = async () => {
    if (!ensName || !window.ethereum) return;

    setIsSettingPrimary(true);
    setStatus('idle');
    setMessage('');

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Check if user is connected to the right network
      const network = await provider.getNetwork();
      if (network.chainId !== BigInt(1)) { // Mainnet
        setStatus('error');
        setMessage('Please connect to Ethereum Mainnet to set primary name.');
        return;
      }

      // Create Reverse Registrar contract instance
      const reverseRegistrar = new ethers.Contract(
        ENS_CONFIG.reverseRegistrarAddress,
        REVERSE_REGISTRAR_ABI,
        signer
      );

      // Set the ENS name as primary
      const tx = await reverseRegistrar.setName(ensName);
      
      setMessage(`Transaction submitted! Hash: ${tx.hash}`);
      
      // Wait for transaction confirmation
      const receipt = await tx.wait();
      
      setStatus('success');
      setMessage(`${ensName} has been set as your primary ENS name!`);
      
    } catch (error: any) {
      console.error('Error setting primary name:', error);
      setStatus('error');
      setMessage(error.message || 'Failed to set primary name. Please try again.');
    } finally {
      setIsSettingPrimary(false);
    }
  };

  // Copy address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Handle address input change
  const handleAddressChange = (newAddress: string) => {
    setAddress(newAddress);
    if (newAddress && ethers.isAddress(newAddress)) {
      fetchENSName(newAddress);
    } else {
      setEnsName(null);
    }
  };

  // Auto-fetch ENS name when component mounts with address
  useEffect(() => {
    if (address && ethers.isAddress(address)) {
      fetchENSName(address);
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5" />
          ENS Identity
        </CardTitle>
        <CardDescription>
          View and manage your Ethereum Name Service (ENS) identity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Address Input (for managers) */}
        {isManager && (
          <div className="space-y-2">
            <Label htmlFor="ens-address">Ethereum Address</Label>
            <div className="flex gap-2">
              <Input
                id="ens-address"
                placeholder="0x..."
                value={address}
                onChange={(e) => handleAddressChange(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => address && fetchENSName(address)}
                disabled={isLoading || !address}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Address Display */}
        {address && (
          <div className="space-y-2">
            <Label>Ethereum Address</Label>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <code className="text-sm flex-1 break-all">{address}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(address)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ENS Name Display */}
        {ensName ? (
          <div className="space-y-2">
            <Label>ENS Primary Name</Label>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 flex-1">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono">{ensName}</span>
                {isRehabDAOSubdomain && (
                  <Badge variant="secondary" className="text-xs">
                    Rehab DAO
                  </Badge>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(ensName)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://app.ens.domains/name/${ensName}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : address ? (
          <div className="text-center py-4">
            <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              No ENS primary name found for this address
            </p>
          </div>
        ) : null}

        {/* Rehab DAO Subdomain Info */}
        {isRehabDAOSubdomain && subdomain && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <h4 className="font-medium text-green-800">Rehab DAO Subdomain</h4>
            </div>
            <p className="text-sm text-green-700 mb-3">
              You have a verified subdomain: <strong>{subdomain}.{ENS_CONFIG.parentDomain}</strong>
            </p>
            <div className="text-xs text-green-600 space-y-1">
              <p>• This subdomain was assigned by a Rehab DAO manager</p>
              <p>• It provides verified identity within the community</p>
              <p>• Use this for secure, anonymous interactions</p>
            </div>
          </div>
        )}

        {/* Set Primary Name Button */}
        {ensName && !isManager && (
          <div className="space-y-2">
            <Button
              onClick={setAsPrimaryName}
              disabled={isSettingPrimary}
              className="w-full"
            >
              {isSettingPrimary ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Setting Primary Name...
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Set as Primary Name
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              This will set {ensName} as your primary ENS name for reverse resolution
            </p>
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

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-2">
          <p><strong>About ENS:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>ENS names provide human-readable addresses on Ethereum</li>
            <li>Rehab DAO subdomains are verified by community managers</li>
            <li>Setting a primary name enables reverse resolution</li>
            <li>Visit <a href="https://app.ens.domains" target="_blank" rel="noopener noreferrer" className="underline">ENS App</a> to manage your domains</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
