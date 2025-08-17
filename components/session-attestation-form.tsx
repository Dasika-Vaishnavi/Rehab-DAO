"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';

interface SessionAttestationFormProps {
  therapistId?: string;
  patientId?: string;
}

export function SessionAttestationForm({ therapistId, patientId }: SessionAttestationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attestationUID, setAttestationUID] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState({
    sessionCompleted: true,
    sessionDate: new Date().toISOString().slice(0, 10),
    therapistInfo: therapistId || '',
    patientInfo: patientId || '',
    sessionDuration: 60,
    sessionType: 'individual'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/attestations/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setAttestationUID(result.attestationUID);
        setIsSuccess(true);
      } else {
        setError(result.error || 'Failed to create attestation');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Attestation Created
          </CardTitle>
          <CardDescription>
            Session attestation has been successfully created on the blockchain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Attestation UID</Label>
              <p className="text-sm text-gray-600 font-mono break-all mt-1">
                {attestationUID}
              </p>
            </div>
            <Button 
              onClick={() => {
                setIsSuccess(false);
                setAttestationUID('');
                setFormData({
                  sessionCompleted: true,
                  sessionDate: new Date().toISOString().slice(0, 10),
                  therapistInfo: therapistId || '',
                  patientInfo: patientId || '',
                  sessionDuration: 60,
                  sessionType: 'individual'
                });
              }}
              className="w-full"
            >
              Create Another Attestation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Session Attestation</CardTitle>
        <CardDescription>
          Create an anonymous attestation for a completed therapy session.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sessionDate">Session Date</Label>
            <Input
              id="sessionDate"
              type="date"
              value={formData.sessionDate}
              onChange={(e) => handleInputChange('sessionDate', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="therapistInfo">Therapist Information</Label>
            <Input
              id="therapistInfo"
              placeholder="Therapist ID or identifier"
              value={formData.therapistInfo}
              onChange={(e) => handleInputChange('therapistInfo', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="patientInfo">Patient Information</Label>
            <Input
              id="patientInfo"
              placeholder="Patient ID or identifier"
              value={formData.patientInfo}
              onChange={(e) => handleInputChange('patientInfo', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionDuration">Session Duration (minutes)</Label>
            <Input
              id="sessionDuration"
              type="number"
              min="15"
              max="180"
              value={formData.sessionDuration}
              onChange={(e) => handleInputChange('sessionDuration', parseInt(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionType">Session Type</Label>
            <Select
              value={formData.sessionType}
              onValueChange={(value) => handleInputChange('sessionType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select session type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Therapy</SelectItem>
                <SelectItem value="group">Group Therapy</SelectItem>
                <SelectItem value="family">Family Therapy</SelectItem>
                <SelectItem value="assessment">Assessment</SelectItem>
                <SelectItem value="followup">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Attestation...
              </>
            ) : (
              'Create Attestation'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
