# Coinbase CDP Integration for Attestations

This document outlines the integration of Coinbase CDP (Customer Data Platform) for storing and managing session attestations in the Rehab DAO application.

## Overview

The CDP integration provides a centralized data storage solution for attestations, complementing the blockchain-based EAS attestations. This dual approach ensures:

1. **Blockchain Verification**: Immutable attestations on Ethereum via EAS
2. **Data Analytics**: Queryable attestation data in CDP for analytics and reporting
3. **Privacy Protection**: Anonymized data storage in both systems

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Form     │───▶│  EAS Blockchain │───▶│  CDP Database   │
│                 │    │   (Immutable)   │    │  (Queryable)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## API Credentials

**API Key**: `7ed7d7ae-e5ff-469f-bc70-aee1bd4f58d0`  
**API Secret**: `7TeCbYqm+SIph1O+SAnueim/JsOeRQ2w/ySSVA8fO1khlBHwnWQATH3AVLdRgUkzF5eonl02JbwjO2gMYkLMdQ==`

## Environment Variables

Add these to your `.env.local`:

```bash
# CDP Configuration
CDP_API_KEY_ID=7ed7d7ae-e5ff-469f-bc70-aee1bd4f58d0
CDP_API_KEY_SECRET=7TeCbYqm+SIph1O+SAnueim/JsOeRQ2w/ySSVA8fO1khlBHwnWQATH3AVLdRgUkzF5eonl02JbwjO2gMYkLMdQ==
CDP_WALLET_SECRET=your_wallet_secret_here

# EAS Configuration (for blockchain attestations)
NEXT_PUBLIC_QUICKNODE_ENDPOINT=https://your-sepolia-endpoint
WALLET_PRIVATE_KEY=your-wallet-private-key-with-ETH
EAS_SCHEMA_UID=your-attestation-schema-uid
NEXT_PUBLIC_NETWORK=sepolia
```

## Data Schema

### Attestation Payload Structure

```typescript
interface AttestationPayload {
  attestationUid: string;        // EAS attestation UID
  sessionCompleted: boolean;     // Session completion status
  sessionDate: string;           // Date of session (YYYY-MM-DD)
  therapistId: string;           // Hashed therapist identifier
  patientHash: string;           // Hashed patient identifier
  sessionDuration: number;       // Duration in minutes
  sessionType: string;           // Type of therapy session
  createdAt: string;             // ISO timestamp
  network: string;               // Blockchain network
  schemaUid: string;             // EAS schema UID
}
```

### CDP Collection: `session_attestations`

The attestations are stored in a custom collection called `session_attestations` in CDP.

## API Endpoints

### Create Attestation (EAS + CDP)
```
POST /api/attestations/create
Content-Type: application/json

{
  "sessionCompleted": true,
  "sessionDate": "2024-01-15",
  "therapistInfo": "therapist-identifier",
  "patientInfo": "patient-identifier",
  "sessionDuration": 60,
  "sessionType": "individual"
}
```

**Response:**
```json
{
  "success": true,
  "attestationUID": "0x...",
  "cdpStorage": true,
  "message": "Session attestation created successfully and stored in CDP"
}
```

### Fetch Attestations from CDP
```
GET /api/attestations/cdp?uid=<attestation-uid>
GET /api/attestations/cdp?therapistId=<therapist-id>
GET /api/attestations/cdp
```

### Update Attestation in CDP
```
POST /api/attestations/cdp
Content-Type: application/json

{
  "attestationUid": "0x...",
  "updates": {
    "sessionCompleted": false
  }
}
```

## Components

### 1. CDP Data Service (`lib/cdp-data-service.ts`)

Handles all CDP operations:
- `storeAttestation()` - Store new attestation
- `getAttestations()` - Retrieve attestations with filters
- `getAttestationByUid()` - Get specific attestation
- `updateAttestation()` - Update existing attestation

### 2. CDP Attestations Viewer (`components/cdp-attestations-viewer.tsx`)

React component for viewing and searching attestations:
- Search by attestation UID
- Search by therapist ID
- Display attestation details
- Real-time status updates

### 3. Session Attestation Form (`components/session-attestation-form.tsx`)

Enhanced form that shows CDP storage status:
- Creates EAS attestation
- Stores data in CDP
- Shows storage status
- Displays attestation UID

## Usage Examples

### Creating an Attestation

```typescript
const response = await fetch('/api/attestations/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sessionCompleted: true,
    sessionDate: '2024-01-15',
    therapistInfo: 'dr-smith-123',
    patientInfo: 'patient-456',
    sessionDuration: 60,
    sessionType: 'individual'
  })
});

const result = await response.json();
console.log('Attestation UID:', result.attestationUID);
console.log('CDP Storage:', result.cdpStorage);
```

### Querying Attestations

```typescript
// Get all attestations
const response = await fetch('/api/attestations/cdp');
const result = await response.json();

// Get specific attestation
const response = await fetch('/api/attestations/cdp?uid=0x123...');
const result = await response.json();

// Get attestations by therapist
const response = await fetch('/api/attestations/cdp?therapistId=dr-smith-123');
const result = await response.json();
```

## Privacy and Security

### Data Anonymization
- Patient information is hashed before storage
- Therapist information is hashed before storage
- No PII stored in plain text
- Anonymous recipients in EAS attestations

### Access Control
- Server-side only CDP operations
- Environment variable protection
- API key rotation capability
- Audit logging for data access

## Error Handling

### Common Error Scenarios

1. **CDP Client Not Available**
   - Error: "CDP client not available on client side"
   - Solution: Ensure CDP operations run server-side only

2. **Authentication Failure**
   - Error: "Failed to authenticate with CDP"
   - Solution: Verify API credentials in environment variables

3. **Collection Not Found**
   - Error: "Collection 'session_attestations' not found"
   - Solution: Create collection in CDP playground

4. **Network Issues**
   - Error: "Network error occurred"
   - Solution: Check internet connection and CDP service status

## Monitoring and Analytics

### CDP Playground
- Access: [CDP Playground](https://playground.cdp.coinbase.com/)
- Query attestations: `SELECT * FROM session_attestations`
- Filter by date: `SELECT * FROM session_attestations WHERE sessionDate >= '2024-01-01'`
- Count by type: `SELECT sessionType, COUNT(*) FROM session_attestations GROUP BY sessionType`

### Metrics Available
- Total attestations created
- Attestations by session type
- Attestations by therapist
- Session duration statistics
- Completion rates
- Network distribution

## Troubleshooting

### Setup Issues

1. **Environment Variables Not Loading**
   ```bash
   # Verify .env.local exists and has correct format
   cat .env.local
   ```

2. **CDP SDK Import Errors**
   ```bash
   # Reinstall dependencies
   npm install @coinbase/cdp-sdk
   ```

3. **API Authentication Errors**
   - Verify API key and secret are correct
   - Check for extra spaces or characters
   - Ensure wallet secret is provided

### Runtime Issues

1. **Attestation Creation Fails**
   - Check EAS schema registration
   - Verify wallet has sufficient ETH
   - Check CDP collection exists

2. **CDP Storage Fails**
   - Verify CDP credentials
   - Check collection permissions
   - Review error logs

## Best Practices

1. **Data Validation**
   - Validate all input data before processing
   - Ensure date formats are consistent
   - Check for required fields

2. **Error Handling**
   - Implement comprehensive error handling
   - Log errors for debugging
   - Provide user-friendly error messages

3. **Performance**
   - Use batch operations for multiple attestations
   - Implement caching for frequently accessed data
   - Monitor API rate limits

4. **Security**
   - Rotate API keys regularly
   - Use environment variables for secrets
   - Implement proper access controls

## Future Enhancements

1. **Real-time Updates**
   - WebSocket integration for live updates
   - Push notifications for new attestations

2. **Advanced Analytics**
   - Custom dashboards
   - Trend analysis
   - Predictive insights

3. **Integration Features**
   - Export functionality
   - Third-party integrations
   - API webhooks

4. **Enhanced Privacy**
   - Zero-knowledge proofs
   - Advanced encryption
   - Privacy-preserving analytics

## Support

For issues with this implementation:
1. Check the troubleshooting section
2. Review CDP documentation
3. Contact the development team
4. Create an issue in the repository
