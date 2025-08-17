# EAS (Ethereum Attestation Service) Setup Guide

This guide will help you set up the EAS SDK for creating anonymous session attestations in your Rehab DAO project.

## Prerequisites

- Node.js and npm installed
- An Ethereum wallet with some ETH for gas fees
- A QuickNode, Infura, or Alchemy account for RPC endpoint

## Step 1: Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```bash
# EAS (Ethereum Attestation Service) Configuration
NEXT_PUBLIC_QUICKNODE_ENDPOINT=https://your-sepolia-endpoint
WALLET_PRIVATE_KEY=your-wallet-private-key-with-ETH
EAS_SCHEMA_UID=your-attestation-schema-uid
NEXT_PUBLIC_NETWORK=sepolia
```

### Getting Your RPC Endpoint

1. Sign up for [QuickNode](https://quicknode.com/), [Infura](https://infura.io/), or [Alchemy](https://alchemy.com/)
2. Create a new project
3. Copy your Sepolia testnet endpoint URL
4. Replace `https://your-sepolia-endpoint` with your actual endpoint

### Getting Your Wallet Private Key

1. Create a new Ethereum wallet or use an existing one
2. Export the private key (keep this secure!)
3. Make sure the wallet has some Sepolia ETH for gas fees
4. Replace `your-wallet-private-key-with-ETH` with your actual private key

## Step 2: Register a Schema

You need to register a schema for session attestations. You can do this through the EAS UI or programmatically.

### Option A: Using EAS UI (Recommended)

1. Go to [EAS Schema Registry](https://easscan.org/schemas)
2. Click "Register Schema"
3. Use this schema definition:
   ```
   bool sessionCompleted,string sessionDate,bytes32 therapistID,bytes32 patientHash,uint256 sessionDuration,string sessionType
   ```
4. Copy the generated Schema UID
5. Add it to your `.env.local` as `EAS_SCHEMA_UID`

### Option B: Programmatic Registration

You can also register the schema programmatically using the EAS SDK.

## Step 3: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/attestations` to test the attestation form

3. Fill out the form and create a test attestation

## Step 4: Verify Attestations

You can verify attestations using:

- [EAS Explorer](https://easscan.org/) - Search by attestation UID
- Your application's fetch API at `/api/attestations/fetch?uid=<attestation-uid>`

## Security Considerations

### Private Key Security
- Never commit your private key to version control
- Use environment variables for all sensitive data
- Consider using a dedicated wallet for attestations
- Keep your private key secure and backed up

### Data Privacy
- All patient and therapist information is hashed before storage
- No personally identifiable information (PII) is stored in plain text
- Use anonymous recipients (0x0000...0000) for maximum privacy

### Network Selection
- Use Sepolia testnet for development and testing
- Switch to mainnet only for production use
- Ensure your wallet has sufficient ETH for gas fees

## Schema Details

The session attestation schema includes:

- `sessionCompleted`: Boolean indicating if the session was completed
- `sessionDate`: Date of the session (YYYY-MM-DD format)
- `therapistID`: Hashed therapist identifier for anonymity
- `patientHash`: Hashed patient identifier for anonymity
- `sessionDuration`: Duration of the session in minutes
- `sessionType`: Type of therapy session (individual, group, family, etc.)

## API Endpoints

### Create Attestation
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

### Fetch Attestation
```
GET /api/attestations/fetch?uid=<attestation-uid>
```

## Troubleshooting

### Common Issues

1. **"Insufficient funds" error**
   - Ensure your wallet has Sepolia ETH for gas fees
   - Get test ETH from a Sepolia faucet

2. **"Invalid schema" error**
   - Verify your `EAS_SCHEMA_UID` is correct
   - Ensure the schema is registered on the correct network

3. **"RPC endpoint error"**
   - Check your RPC endpoint URL
   - Ensure the endpoint supports the network you're using

4. **"Private key error"**
   - Verify your private key format
   - Ensure the private key corresponds to a wallet with ETH

### Getting Help

- Check the [EAS Documentation](https://docs.attest.sh/)
- Visit the [EAS Discord](https://discord.gg/attest)
- Review the [EAS GitHub](https://github.com/ethereum-attestation-service)

## Production Deployment

When deploying to production:

1. Switch to mainnet configuration
2. Use a production RPC endpoint
3. Ensure your wallet has mainnet ETH
4. Register your schema on mainnet
5. Update environment variables for production
6. Test thoroughly before going live

## Support

For issues specific to this implementation, check the project documentation or create an issue in the repository.
