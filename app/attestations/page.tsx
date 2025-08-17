"use client";

import { SessionAttestationForm } from '@/components/session-attestation-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export default function AttestationsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Session Attestations</h1>
          <p className="text-xl text-muted-foreground">
            Create anonymous, blockchain-verified attestations for therapy sessions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Attestation Form */}
          <div>
            <SessionAttestationForm />
          </div>

          {/* Features */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Privacy-First Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All sensitive information is hashed and anonymized before being stored on the blockchain. 
                  No personally identifiable information (PII) is ever stored in plain text.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  Immutable Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Once created, attestations are permanently stored on the Ethereum blockchain. 
                  They cannot be altered or deleted, ensuring the integrity of session records.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  Verifiable Proof
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Each attestation has a unique identifier that can be verified by courts, 
                  employers, or healthcare providers while maintaining patient privacy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Compliance Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Meets regulatory requirements for session documentation while providing 
                  the privacy protections required for addiction recovery treatment.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How Session Attestations Work</CardTitle>
            <CardDescription>
              A step-by-step guide to creating anonymous session attestations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Session Completion</h3>
                <p className="text-sm text-muted-foreground">
                  After a therapy session is completed, the therapist or system administrator 
                  fills out the attestation form with session details.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Data Anonymization</h3>
                <p className="text-sm text-muted-foreground">
                  Patient and therapist information is hashed to create anonymous identifiers. 
                  No personal data is stored in plain text on the blockchain.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Blockchain Verification</h3>
                <p className="text-sm text-muted-foreground">
                  The attestation is submitted to the Ethereum blockchain via the EAS protocol, 
                  creating an immutable, verifiable record of the session.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <Card>
          <CardHeader>
            <CardTitle>Use Cases for Session Attestations</CardTitle>
            <CardDescription>
              How anonymous attestations benefit the recovery community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Court Documentation</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Provide verifiable proof of treatment compliance for legal proceedings 
                  without exposing sensitive personal information.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Insurance Claims</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit anonymous attestations to support insurance claims while 
                  maintaining patient confidentiality.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Employment Verification</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Demonstrate treatment progress to employers or licensing boards 
                  without revealing personal health information.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Research & Analytics</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enable anonymous research on treatment effectiveness while 
                  protecting individual privacy rights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
