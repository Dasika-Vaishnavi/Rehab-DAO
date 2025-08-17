import { createCDPClient, CDP_CONFIG } from './cdp-config';

export interface AttestationPayload {
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

export class CDPDataService {
  private client: any;

  constructor() {
    this.client = createCDPClient();
    // Initialize with project ID and API key
    if (this.client && CDP_CONFIG.projectId) {
      console.log('CDP Client initialized with project ID:', CDP_CONFIG.projectId);
      console.log('CDP Client using API Key:', CDP_CONFIG.apiKeyName);
    }
  }

  /**
   * Store attestation data in CDP
   */
  async storeAttestation(attestationPayload: AttestationPayload) {
    try {
      if (!this.client) {
        throw new Error('CDP client not available on client side');
      }

      // Store in custom collection for attestations
      const response = await this.client.data.upsert({
        collection: 'session_attestations',
        records: [attestationPayload],
      });

      if (response.success) {
        console.log('Attestation stored in CDP:', response.result);
        return {
          success: true,
          data: response.result,
          message: 'Attestation stored successfully in CDP'
        };
      } else {
        console.error('CDP storage error:', response.error);
        return {
          success: false,
          error: response.error,
          message: 'Failed to store attestation in CDP'
        };
      }
    } catch (error) {
      console.error('CDP Data Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to store attestation in CDP'
      };
    }
  }

  /**
   * Retrieve attestations from CDP
   */
  async getAttestations(filters?: any) {
    try {
      if (!this.client) {
        throw new Error('CDP client not available on client side');
      }

      const query = {
        collection: 'session_attestations',
        ...filters
      };

      const response = await this.client.data.query(query);

      if (response.success) {
        return {
          success: true,
          data: response.result,
          message: 'Attestations retrieved successfully'
        };
      } else {
        console.error('CDP query error:', response.error);
        return {
          success: false,
          error: response.error,
          message: 'Failed to retrieve attestations from CDP'
        };
      }
    } catch (error) {
      console.error('CDP Data Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to retrieve attestations from CDP'
      };
    }
  }

  /**
   * Get attestation by UID
   */
  async getAttestationByUid(attestationUid: string) {
    try {
      if (!this.client) {
        throw new Error('CDP client not available on client side');
      }

      const response = await this.client.data.query({
        collection: 'session_attestations',
        filter: {
          attestationUid: attestationUid
        }
      });

      if (response.success && response.result.length > 0) {
        return {
          success: true,
          data: response.result[0],
          message: 'Attestation retrieved successfully'
        };
      } else {
        return {
          success: false,
          error: 'Attestation not found',
          message: 'Attestation not found in CDP'
        };
      }
    } catch (error) {
      console.error('CDP Data Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to retrieve attestation from CDP'
      };
    }
  }

  /**
   * Update attestation in CDP
   */
  async updateAttestation(attestationUid: string, updates: Partial<AttestationPayload>) {
    try {
      if (!this.client) {
        throw new Error('CDP client not available on client side');
      }

      const response = await this.client.data.update({
        collection: 'session_attestations',
        filter: {
          attestationUid: attestationUid
        },
        updates: updates
      });

      if (response.success) {
        return {
          success: true,
          data: response.result,
          message: 'Attestation updated successfully in CDP'
        };
      } else {
        console.error('CDP update error:', response.error);
        return {
          success: false,
          error: response.error,
          message: 'Failed to update attestation in CDP'
        };
      }
    } catch (error) {
      console.error('CDP Data Service Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to update attestation in CDP'
      };
    }
  }
}

// Export singleton instance
export const cdpDataService = new CDPDataService();
