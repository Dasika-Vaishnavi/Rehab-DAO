"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Calendar, User, Clock, FileText } from 'lucide-react';

interface Attestation {
  attestationUid: string;
  sessionCompleted: boolean;
  sessionDate: string;
  therapistId: string;
  patientHash: string;
  sessionDuration: number;
  sessionType: string;
  createdAt: string;
  network: string;
  schemaUid: string;
}

export function CDPAttestationsViewer() {
  const [attestations, setAttestations] = useState<Attestation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [searchUid, setSearchUid] = useState('');
  const [searchTherapistId, setSearchTherapistId] = useState('');

  const fetchAttestations = async (filters?: { uid?: string; therapistId?: string }) => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams();
      if (filters?.uid) params.append('uid', filters.uid);
      if (filters?.therapistId) params.append('therapistId', filters.therapistId);

      const response = await fetch(`/api/attestations/cdp?${params.toString()}`);
      const result = await response.json();

      if (result.success) {
        setAttestations(Array.isArray(result.attestations) ? result.attestations : [result.attestation]);
      } else {
        setError(result.error || 'Failed to fetch attestations');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttestations();
  }, []);

  const handleSearch = () => {
    const filters: any = {};
    if (searchUid) filters.uid = searchUid;
    if (searchTherapistId) filters.therapistId = searchTherapistId;
    fetchAttestations(filters);
  };

  const handleClearSearch = () => {
    setSearchUid('');
    setSearchTherapistId('');
    fetchAttestations();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSessionTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      individual: 'bg-blue-100 text-blue-800',
      group: 'bg-green-100 text-green-800',
      family: 'bg-purple-100 text-purple-800',
      assessment: 'bg-orange-100 text-orange-800',
      followup: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          CDP Attestations Viewer
        </CardTitle>
        <CardDescription>
          View and search attestations stored in Coinbase CDP
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="searchUid">Attestation UID</Label>
            <Input
              id="searchUid"
              placeholder="Search by attestation UID"
              value={searchUid}
              onChange={(e) => setSearchUid(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="searchTherapistId">Therapist ID</Label>
            <Input
              id="searchTherapistId"
              placeholder="Search by therapist ID"
              value={searchTherapistId}
              onChange={(e) => setSearchTherapistId(e.target.value)}
            />
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
              Search
            </Button>
            <Button variant="outline" onClick={handleClearSearch}>
              Clear
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span>Loading attestations...</span>
          </div>
        )}

        {/* Attestations List */}
        {!loading && attestations.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            No attestations found. Create some attestations first.
          </div>
        )}

        {!loading && attestations.length > 0 && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Found {attestations.length} attestation(s)
            </div>
            
            {attestations.map((attestation) => (
              <Card key={attestation.attestationUid} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm font-mono">
                        {attestation.attestationUid.slice(0, 20)}...
                      </h3>
                      <p className="text-xs text-gray-500">UID</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={attestation.sessionCompleted ? "default" : "secondary"}>
                        {attestation.sessionCompleted ? "Completed" : "Incomplete"}
                      </Badge>
                      <Badge className={getSessionTypeColor(attestation.sessionType)}>
                        {attestation.sessionType}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">{attestation.sessionDate}</p>
                        <p className="text-xs text-gray-500">Session Date</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium">{attestation.sessionDuration} min</p>
                        <p className="text-xs text-gray-500">Duration</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium font-mono text-xs">
                          {attestation.therapistId.slice(0, 10)}...
                        </p>
                        <p className="text-xs text-gray-500">Therapist ID</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium font-mono text-xs">
                          {attestation.patientHash.slice(0, 10)}...
                        </p>
                        <p className="text-xs text-gray-500">Patient Hash</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Created: {formatDate(attestation.createdAt)}</span>
                      <span>Network: {attestation.network}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
