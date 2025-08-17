"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Hash, Settings } from 'lucide-react';
import AssignSubdomain from '@/components/ens-subdomain-assigner';
import { UserENSInfo } from '@/components/user-ens-info';
import { ENS_CONFIG } from '@/lib/ens-config';

export default function ENSManagementPage() {
  const [isManager, setIsManager] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  // Demo manager addresses (in production, this would be checked against a database)
  const demoManagerAddresses = [
    '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    '0x1234567890123456789012345678901234567890'
  ];

  // Check if current user is a manager (demo implementation)
  const checkManagerStatus = () => {
    // In a real app, this would check against your backend
    // For demo purposes, we'll use a simple toggle
    return isManager;
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">ENS Management</h1>
          <p className="text-xl text-muted-foreground">
            Manage Ethereum Name Service (ENS) identities for Rehab DAO
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="outline" className="text-sm">
              Parent Domain: {ENS_CONFIG.parentDomain}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              Ethereum Mainnet
            </Badge>
          </div>
        </div>

        {/* Manager Toggle (Demo) */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Manager Access
            </CardTitle>
            <CardDescription>
              Toggle manager mode for demo purposes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isManager}
                  onChange={(e) => setIsManager(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Enable Manager Mode</span>
              </label>
              {isManager && (
                <Badge variant="default" className="text-xs">
                  Manager Access Enabled
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              In production, manager status would be verified on-chain or through your backend.
            </p>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="assign" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="assign" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Assign Subdomains
            </TabsTrigger>
            <TabsTrigger value="identity" className="flex items-center gap-2">
              <Hash className="w-4 h-4" />
              ENS Identity
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Assign Subdomains Tab */}
          <TabsContent value="assign" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Manager Assignment Tool */}
              <AssignSubdomain isManager={checkManagerStatus()} />
              
              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>
                    Understanding ENS subdomain assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-primary">1</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Manager Assignment</h3>
                        <p className="text-sm text-muted-foreground">
                          Authorized managers can assign subdomains to user addresses
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-primary">2</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">User Verification</h3>
                        <p className="text-sm text-muted-foreground">
                          Users receive a verified subdomain under rehabdao.eth
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-primary">3</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">Primary Name Setup</h3>
                        <p className="text-sm text-muted-foreground">
                          Users set their subdomain as primary name for reverse resolution
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Example</h4>
                    <p className="text-sm text-blue-700">
                      Manager assigns <code>alice.rehabdao.eth</code> to address <code>0x1234...</code>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ENS Identity Tab */}
          <TabsContent value="identity" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* User ENS Info */}
              <UserENSInfo 
                userAddress={userAddress} 
                isManager={checkManagerStatus()} 
              />
              
              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>ENS Identity Benefits</CardTitle>
                  <CardDescription>
                    Why ENS subdomains matter for Rehab DAO
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Verified Identity</h3>
                        <p className="text-sm text-muted-foreground">
                          Subdomains are assigned by trusted managers, providing verification
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Community Recognition</h3>
                        <p className="text-sm text-muted-foreground">
                          .rehabdao.eth suffix shows membership in the community
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                        <Hash className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Human-Readable Addresses</h3>
                        <p className="text-sm text-muted-foreground">
                          Easy to remember and share instead of long hex addresses
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Privacy First</h4>
                    <p className="text-sm text-green-700">
                      ENS names provide anonymity while maintaining verifiable identity within the community
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>ENS Configuration</CardTitle>
                  <CardDescription>
                    Current ENS settings and network information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Parent Domain</span>
                      <Badge variant="outline">{ENS_CONFIG.parentDomain}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Network</span>
                      <Badge variant="secondary">Ethereum Mainnet</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">ENS Registry</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {ENS_CONFIG.ensRegistryAddress.slice(0, 10)}...
                      </code>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Reverse Registrar</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {ENS_CONFIG.reverseRegistrarAddress.slice(0, 10)}...
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Demo Manager Addresses */}
              <Card>
                <CardHeader>
                  <CardTitle>Demo Manager Addresses</CardTitle>
                  <CardDescription>
                    Example addresses for testing manager functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {demoManagerAddresses.map((address, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded flex-1">
                          {address}
                        </code>
                        <Badge variant="outline" className="text-xs">
                          Demo
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    These are example addresses for demonstration purposes only.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
