# ENS Integration for Rehab DAO

This document outlines the Ethereum Name Service (ENS) integration for managing subdomain identities in the Rehab DAO platform.

## Overview

The ENS integration provides a decentralized identity system where:
- **Managers** can assign verified subdomains to users
- **Users** receive human-readable addresses under `rehabdao.eth`
- **Privacy** is maintained while providing verifiable community membership

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Manager       │───▶│  ENS Registry   │───▶│  User Address   │
│   (Assigns)     │    │  (On-chain)     │    │  (Receives)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Subdomain     │    │  Primary Name   │    │  Community      │
│   Assignment    │    │  Setup          │    │  Recognition    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Configuration

### Parent Domain
- **Domain**: `rehabdao.eth`
- **Network**: Ethereum Mainnet
- **Registry**: `0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e`

### Contract Addresses
```typescript
ENS_REGISTRY_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
PUBLIC_RESOLVER_ADDRESS = '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63'
REVERSE_REGISTRAR_ADDRESS = '0x084b1c3C81545d370f3634392De611CaaBFf8148'
```

## Components

### 1. ENS Subdomain Assigner (`components/ens-subdomain-assigner.tsx`)

**Purpose**: Allows managers to assign subdomains to user addresses

**Features**:
- ✅ Subdomain validation (3-63 characters, lowercase, numbers, hyphens)
- ✅ Ethereum address validation
- ✅ Duplicate subdomain checking
- ✅ Network validation (Mainnet only)
- ✅ Transaction status feedback
- ✅ Manager access control

**Usage**:
```typescript
<AssignSubdomain 
  parentDomain="rehabdao.eth"
  isManager={true}
/>
```

### 2. User ENS Info (`components/user-ens-info.tsx`)

**Purpose**: Displays and manages user ENS identities

**Features**:
- ✅ ENS name lookup for addresses
- ✅ Primary name setting
- ✅ Rehab DAO subdomain detection
- ✅ Copy to clipboard functionality
- ✅ External ENS app links
- ✅ Manager mode for address lookup

**Usage**:
```typescript
<UserENSInfo 
  userAddress="0x1234..."
  isManager={false}
/>
```

### 3. ENS Management Page (`app/ens-management/page.tsx`)

**Purpose**: Centralized ENS management interface

**Features**:
- ✅ Tabbed interface (Assign, Identity, Settings)
- ✅ Manager mode toggle (demo)
- ✅ Configuration display
- ✅ Instructions and benefits
- ✅ Demo manager addresses

## Workflow

### Manager Assignment Process

1. **Manager Authentication**
   - Manager connects wallet to Ethereum Mainnet
   - System verifies manager permissions (demo: toggle)

2. **Subdomain Assignment**
   - Manager enters subdomain (e.g., "alice")
   - Manager enters user's Ethereum address
   - System validates inputs and checks availability

3. **On-chain Transaction**
   - Manager approves transaction in wallet
   - ENS Registry creates subdomain ownership
   - Transaction confirmed on Ethereum

4. **User Notification**
   - User receives `alice.rehabdao.eth` subdomain
   - User can set as primary name

### User Setup Process

1. **Receive Subdomain**
   - User gets assigned subdomain from manager
   - Subdomain appears in ENS Identity tab

2. **Set Primary Name**
   - User connects wallet to Mainnet
   - User clicks "Set as Primary Name"
   - Reverse Registrar transaction executed

3. **Verification**
   - Subdomain becomes primary ENS name
   - Reverse resolution enabled
   - Community recognition active

## API Integration

### ENS Registry Contract

```solidity
// Assign subdomain ownership
function setSubnodeOwner(
    bytes32 node,    // Parent domain hash
    bytes32 label,   // Subdomain hash
    address owner    // New owner address
) external returns (bytes32);
```

### Reverse Registrar Contract

```solidity
// Set primary name
function setName(string memory name) external returns (bytes32);
```

## Security Features

### Access Control
- ✅ Manager-only subdomain assignment
- ✅ Network validation (Mainnet only)
- ✅ Duplicate subdomain prevention
- ✅ Input validation and sanitization

### Privacy Protection
- ✅ Anonymous subdomain assignment
- ✅ No PII stored on-chain
- ✅ User-controlled primary name setting
- ✅ Community verification without personal data

### Transaction Safety
- ✅ Gas estimation and validation
- ✅ Transaction confirmation waiting
- ✅ Error handling and user feedback
- ✅ Network compatibility checks

## Usage Examples

### Assigning a Subdomain

```typescript
// Manager assigns subdomain
const subdomain = "alice";
const userAddress = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6";

// Result: alice.rehabdao.eth → 0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
```

### Checking ENS Identity

```typescript
// User checks their ENS name
const address = "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6";
const ensName = await provider.lookupAddress(address);
// Result: "alice.rehabdao.eth"
```

### Setting Primary Name

```typescript
// User sets primary name
const ensName = "alice.rehabdao.eth";
await reverseRegistrar.setName(ensName);
// Result: Reverse resolution enabled
```

## Benefits for Rehab DAO

### Community Verification
- **Trusted Identity**: Subdomains assigned by verified managers
- **Community Recognition**: `.rehabdao.eth` suffix shows membership
- **Anonymity**: No personal information required

### User Experience
- **Human-Readable**: Easy to remember and share
- **Portable**: Works across all Ethereum applications
- **Verifiable**: On-chain proof of community membership

### Privacy Compliance
- **No PII**: Only addresses and subdomains stored
- **User Control**: Users choose when to set primary names
- **Anonymous**: Real identities remain private

## Demo Features

### Manager Mode Toggle
- Enable/disable manager functionality for testing
- Demo manager addresses provided
- Simulated permission checking

### Test Addresses
```typescript
const demoManagerAddresses = [
  '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  '0x1234567890123456789012345678901234567890'
];
```

### Network Validation
- Mainnet-only operations for production
- Testnet support for development
- Network switching detection

## Future Enhancements

### Advanced Features
1. **Bulk Assignment**: Assign multiple subdomains at once
2. **Subdomain Management**: Transfer, revoke, or update subdomains
3. **Integration APIs**: Connect with external ENS tools
4. **Analytics**: Track subdomain usage and community growth

### Security Improvements
1. **Multi-sig Management**: Require multiple manager approvals
2. **Time-locked Operations**: Add delays for critical changes
3. **Audit Logging**: Track all subdomain operations
4. **Recovery Mechanisms**: Handle lost keys and addresses

### User Experience
1. **ENS App Integration**: Direct links to ENS management
2. **Mobile Support**: Optimize for mobile wallets
3. **Notifications**: Alert users of subdomain assignments
4. **Tutorial System**: Guided setup for new users

## Troubleshooting

### Common Issues

1. **"Wallet not found"**
   - Install MetaMask or other wallet extension
   - Ensure wallet is connected to the page

2. **"Wrong network"**
   - Switch to Ethereum Mainnet
   - Add network if not available

3. **"Subdomain already exists"**
   - Choose a different subdomain name
   - Check ENS app for availability

4. **"Insufficient gas"**
   - Add more ETH to wallet
   - Check gas price and limits

### Error Handling

```typescript
try {
  await ens.setSubnodeOwner(parentNode, labelhash, address);
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    // Handle insufficient funds
  } else if (error.code === 'NETWORK_ERROR') {
    // Handle network issues
  } else {
    // Handle other errors
  }
}
```

## Support

For issues with ENS integration:
1. Check the troubleshooting section
2. Review ENS documentation at [ens.domains](https://ens.domains)
3. Contact the development team
4. Create an issue in the repository

## Resources

- [ENS Documentation](https://docs.ens.domains/)
- [ENS App](https://app.ens.domains/)
- [ENS Registry Contract](https://etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e)
- [ENS Developer Guide](https://docs.ens.domains/developers)
